import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/authenticate';
import { AuthRequest } from '../types';
import prisma from '../prisma/client';
import axios from 'axios';

const router = express.Router();

interface RocketReachCompany {
  id: number;
  name: string;
  domain: string;
  industry: string;
  size: string;
  country: string;
  state: string;
  city: string;
  founded_year: number;
  description: string;
  phone: string;
  revenue: string;
  employees: number;
  linkedin_url: string;
  twitter_url: string;
  facebook_url: string;
}

interface SearchFilters {
  industry?: string;
  country?: string;
  state?: string;
  size?: string;
  revenue?: string;
}

// Enhanced company search combining database + RocketReach
router.get('/search', authenticate, async (req: Request, res: Response) => {
  try {
    const { 
      query = '', 
      industry, 
      country, 
      state, 
      size, 
      revenue,
      page = 1,
      limit = 20 
    } = req.query;

    const searchQuery = query as string;
    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);

    // 1. Search from local database first
    const dbCompanies = await prisma.company.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { industry: { contains: searchQuery, mode: 'insensitive' } },
          { location: { contains: searchQuery, mode: 'insensitive' } }
        ],
        ...(industry && { industry: { contains: industry as string, mode: 'insensitive' } })
      },
      include: {
        _count: {
          select: { complaints: true }
        }
      },
      take: 10
    });

    // 2. Search from RocketReach API
    let rocketReachCompanies: any[] = [];
    
     try {
      const rocketReachFilters: any = {};
      
      if (searchQuery) rocketReachFilters.name = searchQuery;
      if (industry) rocketReachFilters.industry = industry;
      if (country) rocketReachFilters.country = country;
      if (state) rocketReachFilters.state = state;
      if (size) rocketReachFilters.size = size;
      if (revenue) rocketReachFilters.revenue = revenue;

      const response = await axios.get('https://api.rocketreach.co/v2/api/companies/search', {
        headers: {
          'Authorization': `Bearer ${process.env.ROCKETREACH_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          ...rocketReachFilters,
          start: (currentPage - 1) * pageLimit,
          size: pageLimit
        }
      });

      rocketReachCompanies = response.data.companies || [];
    } catch (rocketError) {
      if (rocketError instanceof Error) {
        console.error('RocketReach API error:', rocketError.message);
      } else {
        console.error('RocketReach API error:', rocketError);
      }
      // Continue without RocketReach data if API fails
    }

    // 3. Format and combine results
    const formattedDbCompanies = dbCompanies.map(company => ({
      id: `db_${company.company_id}`,
      name: company.name,
      industry: company.industry,
      location: company.location,
      contact_email: company.contact_email,
      complaint_count: company._count.complaints,
      source: 'database',
      verified: true
    }));

    const formattedRocketReachCompanies = rocketReachCompanies.map((company: RocketReachCompany) => ({
      id: `rr_${company.id}`,
      name: company.name,
      domain: company.domain,
      industry: company.industry,
      location: `${company.city}, ${company.state}, ${company.country}`,
      size: company.size,
      revenue: company.revenue,
      employees: company.employees,
      founded_year: company.founded_year,
      description: company.description,
      phone: company.phone,
      linkedin_url: company.linkedin_url,
      twitter_url: company.twitter_url,
      facebook_url: company.facebook_url,
      source: 'rocketreach',
      verified: false
    }));

    // 4. Combine and return results
    const allCompanies = [...formattedDbCompanies, ...formattedRocketReachCompanies];

    res.json({
      companies: allCompanies,
      total: allCompanies.length,
      page: currentPage,
      limit: pageLimit,
      database_results: formattedDbCompanies.length,
      rocketreach_results: formattedRocketReachCompanies.length
    });

  } catch (error) {
    console.error('Company search error:', error);
    res.status(500).json({ message: 'Failed to search companies' });
  }
});

// Get industry suggestions for filters
router.get('/industries', authenticate, async (req: Request, res: Response) => {
  try {
    // Get industries from database
    const dbIndustries = await prisma.company.findMany({
      select: { industry: true },
      distinct: ['industry']
    });

    // Common industries for RocketReach
    const commonIndustries = [
      'Technology', 'Healthcare', 'Financial Services', 'Retail', 'Manufacturing',
      'Education', 'Real Estate', 'Media & Entertainment', 'Transportation',
      'Energy', 'Food & Beverage', 'Automotive', 'Aerospace', 'Pharmaceuticals',
      'Telecommunications', 'Construction', 'Hospitality', 'Insurance',
      'Software', 'E-commerce', 'Consulting', 'Banking', 'Government'
    ];

    const allIndustries = [
      ...dbIndustries.map(d => d.industry),
      ...commonIndustries
    ];

    const uniqueIndustries = [...new Set(allIndustries)].filter(Boolean).sort();

    res.json({ industries: uniqueIndustries });
  } catch (error) {
    console.error('Industries fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch industries' });
  }
});

// Get countries for filters
router.get('/countries', authenticate, async (req: Request, res: Response) => {
  try {
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
      'Australia', 'Japan', 'India', 'China', 'Brazil', 'Mexico',
      'Netherlands', 'Sweden', 'Switzerland', 'Singapore', 'South Korea'
    ];

    res.json({ countries });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch countries' });
  }
});

// Get company sizes for filters
router.get('/sizes', authenticate, async (req: Request, res: Response) => {
  try {
    const sizes = [
      '1-10 employees',
      '11-50 employees', 
      '51-200 employees',
      '201-500 employees',
      '501-1000 employees',
      '1001-5000 employees',
      '5001-10000 employees',
      '10000+ employees'
    ];

    res.json({ sizes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sizes' });
  }
});

// Create/save company from RocketReach to database
router.post('/save', authenticate, async (req: Request, res: Response) => {
  try {
    const { name, industry, location, domain, phone, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Company name is required' });
    }

    // Check if company already exists
    const existingCompany = await prisma.company.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    });

    if (existingCompany) {
      return res.json({ 
        company: existingCompany, 
        message: 'Company already exists in database',
        existing: true 
      });
    }

    // Create new company
    const newCompany = await prisma.company.create({
      data: {
        name,
        industry: industry || 'Unknown',
        location: location || 'Unknown',
        contact_email: domain ? `info@${domain}` : 'unknown@company.com'
      }
    });

    res.status(201).json({ 
      company: newCompany, 
      message: 'Company saved successfully',
      existing: false 
    });

  } catch (error) {
    console.error('Company save error:', error);
    res.status(500).json({ message: 'Failed to save company' });
  }
});

export default router;

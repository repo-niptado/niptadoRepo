import { Router, Request, Response } from 'express';
import prisma from '../prisma/client';

const router = Router();

interface ContactInput {
  name: string;
  email: string;
  designation: string;
}

interface MediaContactInput {
  name: string;
  email: string;
  organization: string;
  designation: string;
  category: "PRESS" | "TV" | "ONLINE" | "OTHER";
}

interface CompanyRequestBody {
  name: string;
  industry: string;
  location: string;
  contact_email: string;
  contacts?: ContactInput[];
  media_contacts?: MediaContactInput[];
}

// GET all companies
router.get('/', async (_, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
    contacts: true,
    media_contacts: true, // Ensure this line is added
  },
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Failed to fetch companies' });
  }
});

// GET a specific company
router.get('/:companyId', async (req: Request, res: Response) => {
  const { companyId } = req.params;
  try {
    const company = await prisma.company.findUnique({
      where: { company_id: parseInt(companyId) },
      include: { contacts: true },
    });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Failed to fetch company' });
  }
});

// CREATE company

router.post('/', async (req: Request<{}, {}, CompanyRequestBody>, res: Response) => {
  const { name, industry, location, contact_email, contacts, media_contacts } = req.body;

  try {
    // Step 1: Create the company with contacts
    const company = await prisma.company.create({
      data: {
        name,
        industry,
        location,
        contact_email,
        contacts: contacts?.length
          ? {
              create: contacts.map((c) => ({
                name: c.name,
                email: c.email,
                designation: c.designation,
              })),
            }
          : undefined,
      },
      include: { contacts: true },
    });

    // Step 2: Create media contacts and associate with company
    if (media_contacts?.length) {
      await prisma.mediaContact.createMany({
        data: media_contacts.map((m) => ({
          name: m.name,
          email: m.email,
          organization: m.organization,
          designation: m.designation,
          category: m.category,
          company_id: company.company_id,
        })),
      });
    }

    // Step 3: Fetch media contacts linked to the company
    const mediaContacts = await prisma.mediaContact.findMany({
      where: {
        company_id: company.company_id,
      },
    });

    // Step 4: Return everything
    res.status(201).json({ message: 'Company created successfully', company, media_contacts: mediaContacts });
  } catch (error) {
    console.error('Error creating company and media contacts:', error);
    res.status(500).json({ message: 'Failed to create company' });
  }
});


// UPDATE company
router.put('/:companyId', async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const { name, industry, location, contact_email } = req.body;

  try {
    const updated = await prisma.company.update({
      where: { company_id: parseInt(companyId) },
      data: { name, industry, location, contact_email },
    });
    res.json(updated);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Failed to update company' });
  }
});

// DELETE company and all related records
router.delete('/:companyId', async (req: Request, res: Response) => {
  const { companyId } = req.params;

  try {
    const id = parseInt(companyId);

    await prisma.complaintMediaContact.deleteMany({
      where: {
        complaint: {
          company_id: id,
        },
      },
    });

    await prisma.complaintContact.deleteMany({
      where: {
        complaint: {
          company_id: id,
        },
      },
    });

    await prisma.communication.deleteMany({
      where: {
        complaint: {
          company_id: id,
        },
      },
    });

    await prisma.escalation.deleteMany({
      where: {
        complaint: {
          company_id: id,
        },
      },
    });

    await prisma.settlement.deleteMany({
      where: {
        complaint: {
          company_id: id,
        },
      },
    });

    await prisma.document.deleteMany({
      where: {
        complaint: {
          company_id: id,
        },
      },
    });

    await prisma.complaint.deleteMany({
      where: {
        company_id: id,
      },
    });

    await prisma.companyContact.deleteMany({
      where: {
        company_id: id,
      },
    });

    await prisma.mediaContact.deleteMany({
      where: {
        company_id: id,
      },
    });

    await prisma.scorecard.deleteMany({
      where: {
        company_id: id,
      },
    });

    await prisma.company.delete({
      where: {
        company_id: id,
      },
    });

    res.json({ message: 'Company and related data deleted successfully' });
  } catch (error) {
    console.error('Error deleting company and related records:', error);
    res.status(500).json({ message: 'Failed to delete company' });
  }
});

export default router;

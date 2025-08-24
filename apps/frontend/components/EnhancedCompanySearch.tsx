'use client';

import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  domain?: string;
  size?: string;
  revenue?: string;
  employees?: number;
  founded_year?: number;
  description?: string;
  phone?: string;
  contact_email?: string;
  complaint_count?: number;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  source: 'database' | 'rocketreach';
  verified: boolean;
}

interface SearchFilters {
  industry: string;
  country: string;
  size: string;
}

interface EnhancedCompanySearchProps {
  onSelectCompany: (company: Company) => void;
  selectedCompany?: Company | null;
  placeholder?: string;
}

export default function EnhancedCompanySearch({ 
  onSelectCompany, 
  selectedCompany, 
  placeholder = "Search for a company..." 
}: EnhancedCompanySearchProps) {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    industry: '',
    country: '',
    size: ''
  });

  // Filter options
  const [industries, setIndustries] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  // Load filter options
  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const [industriesRes, countriesRes, sizesRes] = await Promise.all([
        fetch('http://localhost:3001/api/company-search/industries', { credentials: 'include' }),
        fetch('http://localhost:3001/api/company-search/countries', { credentials: 'include' }),
        fetch('http://localhost:3001/api/company-search/sizes', { credentials: 'include' })
      ]);

      const [industriesData, countriesData, sizesData] = await Promise.all([
        industriesRes.json(),
        countriesRes.json(),
        sizesRes.json()
      ]);

      setIndustries(industriesData.industries || []);
      setCountries(countriesData.countries || []);
      setSizes(sizesData.sizes || []);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, searchFilters: SearchFilters) => {
      if (!searchQuery.trim() && !searchFilters.industry && !searchFilters.country && !searchFilters.size) {
        setCompanies([]);
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams({
          query: searchQuery,
          ...(searchFilters.industry && { industry: searchFilters.industry }),
          ...(searchFilters.country && { country: searchFilters.country }),
          ...(searchFilters.size && { size: searchFilters.size }),
          limit: '20'
        });

        const response = await fetch(`http://localhost:3001/api/company-search/search?${params}`, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCompanies(data.companies || []);
        } else {
          setCompanies([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // Trigger search when query or filters change
  useEffect(() => {
    setLoading(true);
    debouncedSearch(query, filters);
  }, [query, filters, debouncedSearch]);

  const handleSelectCompany = async (company: Company) => {
    // If it's from RocketReach, save it to database first
    if (company.source === 'rocketreach') {
      try {
        const response = await fetch('http://localhost:3001/api/company-search/save', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: company.name,
            industry: company.industry,
            location: company.location,
            domain: company.domain,
            phone: company.phone,
            description: company.description
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Use the saved company data
          onSelectCompany({
            ...company,
            ...data.company,
            id: `db_${data.company.company_id}`,
            source: 'database',
            verified: true
          });
        } else {
          onSelectCompany(company);
        }
      } catch (error) {
        console.error('Failed to save company:', error);
        onSelectCompany(company);
      }
    } else {
      onSelectCompany(company);
    }

    setQuery(company.name);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters({ industry: '', country: '', size: '' });
  };

  const hasActiveFilters = filters.industry || filters.country || filters.size;

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={selectedCompany ? selectedCompany.name : query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        {/* Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-3 p-1 rounded-md transition-colors ${
            hasActiveFilters 
              ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Industry Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Industry</label>
              <select
                value={filters.industry}
                onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company Size</label>
              <select
                value={filters.size}
                onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Sizes</option>
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {isOpen && (query || hasActiveFilters) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
              Searching companies...
            </div>
          ) : companies.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No companies found. Try adjusting your search or filters.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {companies.map((company) => (
                <div
                  key={company.id}
                  onClick={() => handleSelectCompany(company)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{company.name}</h3>
                        
                        {/* Source Badge */}
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          company.source === 'database' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {company.source === 'database' ? 'In Database' : 'RocketReach'}
                        </span>

                        {/* Verified Badge */}
                        {company.verified && (
                          <span className="text-green-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-4">
                          <span>🏭 {company.industry}</span>
                          <span>📍 {company.location}</span>
                        </div>

                        {company.size && (
                          <div>👥 {company.size}</div>
                        )}

                        {company.employees && (
                          <div>👥 {company.employees.toLocaleString()} employees</div>
                        )}

                        {company.revenue && (
                          <div>💰 {company.revenue}</div>
                        )}

                        {company.complaint_count !== undefined && (
                          <div className="text-orange-600">
                            ⚠️ {company.complaint_count} complaint(s) filed
                          </div>
                        )}

                        {company.description && (
                          <div className="text-xs text-gray-500 mt-2 line-clamp-2">
                            {company.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* External Links */}
                    {(company.linkedin_url || company.twitter_url || company.domain) && (
                      <div className="flex gap-2 ml-4">
                        {company.domain && (
                          <a
                            href={`https://${company.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            🌐
                          </a>
                        )}
                        {company.linkedin_url && (
                          <a
                            href={company.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            💼
                          </a>
                        )}
                        {company.twitter_url && (
                          <a
                            href={company.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            🐦
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

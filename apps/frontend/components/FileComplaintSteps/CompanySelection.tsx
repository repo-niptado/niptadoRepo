// steps/CompanySelection.tsx

import React, { useState, useEffect } from "react";
import { AlertTriangle, Star, Search } from "lucide-react";
import EnhancedCompanySearch from '../EnhancedCompanySearch';

interface Company {
  company_id: number;
  name: string;
  industry?: string;
  location?: string;
}

interface CompanySelectionProps {
  companies: Company[];
  selectedCompanyId: string;
  onCompanyChange: (companyId: string) => void;
}

const CompanySelection: React.FC<CompanySelectionProps> = ({
  companies,
  selectedCompanyId,
  onCompanyChange,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Find selected company from companies list
  useEffect(() => {
    if (selectedCompanyId) {
      const company = companies.find(c => c.company_id.toString() === selectedCompanyId);
      if (company) {
        setSelectedCompany({
          id: `db_${company.company_id}`,
          name: company.name,
          industry: company.industry || 'Unknown',
          location: company.location || 'Unknown',
          source: 'database',
          verified: true
        });
      }
    }
  }, [selectedCompanyId, companies]);

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company);
    setShowGrid(false);
    
    // Extract company ID from the enhanced search result
    let companyId;
    if (company.source === 'database' && company.id.startsWith('db_')) {
      companyId = company.id.replace('db_', '');
    } else if (company.company_id) {
      companyId = company.company_id.toString();
    } else {
      // If it's a new company from RocketReach, we'll need to handle this
      console.log('New company selected from RocketReach:', company);
      companyId = 'new_' + company.name; // Temporary ID
    }
    
    onCompanyChange(companyId);
  };

  return (
    <>
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Who Would You Like to
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Contact?
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Select a company to file your complaint against. We'll help you
              get the resolution you deserve.
            </p>
          </div>

          {/* Enhanced Company Search */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-2xl mx-auto">
              <EnhancedCompanySearch
                onSelectCompany={handleCompanySelect}
                selectedCompany={selectedCompany}
                placeholder="Search companies from our database and RocketReach..."
              />
            </div>
            
            {/* Selected Company Display */}
            {selectedCompany && (
              <div className="mt-6 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md border border-green-400/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-300 font-bold">
                        {selectedCompany.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{selectedCompany.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>🏭 {selectedCompany.industry}</span>
                        <span>📍 {selectedCompany.location}</span>
                        {selectedCompany.source === 'rocketreach' && (
                          <span className="text-blue-300">✨ From RocketReach</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCompany(null);
                        setShowGrid(true);
                        onCompanyChange('');
                      }}
                      className="text-white/50 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Toggle to show/hide grid */}
            {!selectedCompany && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="text-white/70 hover:text-white text-sm underline"
                >
                  {showGrid ? 'Hide' : 'Show'} popular companies
                </button>
              </div>
            )}
          </div>

          {/* Company Grid */}
          {showGrid && (
            <div
              className={`transition-all duration-1000 delay-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Popular Companies</h2>
                <p className="text-white/60">Quick selection from our database</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {companies.slice(0, 8).map((company, index) => {
                  const isSelected =
                    selectedCompanyId === company.company_id.toString();

                  const getInitials = (name: string) =>
                    name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2);

                  return (
                    <div
                      key={company.company_id}
                      className={`group bg-white/10 backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-xl ${
                        isSelected
                          ? "border-red-500 bg-white/20"
                          : "border-white/20 hover:border-white/30 hover:bg-white/15"
                      } opacity-100`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "forwards",
                      }}
                      onClick={() => {
                        const companyData = {
                          id: `db_${company.company_id}`,
                          name: company.name,
                          industry: company.industry || 'Unknown',
                          location: company.location || 'Unknown',
                          source: 'database',
                          verified: true
                        };
                        handleCompanySelect(companyData);
                      }}
                    >
                      {/* Company Initials */}
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-gray-800 font-bold text-lg">
                            {getInitials(company.name)}
                          </span>
                        </div>
                      </div>

                      {/* Company Name */}
                      <h3 className="text-white font-semibold text-lg text-center mb-2">
                        {company.name}
                      </h3>

                      {/* Industry Category */}
                      <div className="flex justify-center mb-3">
                        <span className="bg-red-500/20 text-red-300 text-xs px-3 py-1 rounded-full border border-red-500/30">
                          {company.industry || 'General'}
                        </span>
                      </div>

                      {/* Dummy Rating & Complaints */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">4.2</span>
                        </div>
                        <div className="flex items-center space-x-1 text-white/60">
                          <AlertTriangle className="w-4 h-4" />
                          <span>34</span>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="mt-4">
                          <div className="w-full h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Help Section */}
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-white text-xl font-semibold mb-3">
                Don't see your company?
              </h3>
              <p className="text-white/70 mb-4">
                We're constantly adding new companies. You can still file a
                complaint against any company.
              </p>
              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                Add New Company
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Company
      </label>
      <div className="space-y-2">
        {companies.map((company) => (
          <label
            key={company.company_id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="selectedCompany"
              value={company.company_id}
              checked={selectedCompanyId === company.company_id.toString()}
              onChange={(e) => onCompanyChange(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span>{company.name}</span>
          </label>
        ))}
      </div> */}
    </>
  );
};

export default CompanySelection;

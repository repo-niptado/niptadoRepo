// steps/CompanySelection.tsx

import React, { useState, useEffect } from "react";
import { AlertTriangle, Star, Search } from "lucide-react";

interface Company {
  company_id: number;
  name: string;
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies =
    searchTerm.length >= 3
      ? companies.filter((company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : companies;

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

          {/* Search and Filter Section */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                placeholder="Search for a company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {/* {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))} */}
            </div>
          </div>

          {/* Company Grid */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-4 gap-6">
              {filteredCompanies.map((company, index) => {
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
                    } opacity-100`} // <-- changed from opacity-0 animate-fade-in-up to opacity-100
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                    onClick={() =>
                      onCompanyChange(company.company_id.toString())
                    }
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

                    {/* Dummy Category */}
                    <div className="flex justify-center mb-3">
                      <span className="bg-red-500/20 text-red-300 text-xs px-3 py-1 rounded-full border border-red-500/30">
                        General
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

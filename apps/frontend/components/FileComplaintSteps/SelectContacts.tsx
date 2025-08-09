import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, Crown, Check, Lock, Star, Building, Users, Target, MessageSquare, ArrowRight, Zap } from 'lucide-react';

interface Contact {
  contact_id: number;
  name: string;
  email: string;
  designation: string;
}

interface SelectContactsProps {
  contacts: Contact[];
  selectedContactIds: string[];
  onContactSelection: (id: string) => void;
  companyName?: string;
}

interface ContactCardProps {
  contact: Contact;
  index: number;
  isSelected: boolean;
  onToggle: (contactId: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, index, isSelected, onToggle }) => {
  return (
    <div
      className={`relative bg-white/10 w-[100%] backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl transition-all duration-300  animate-fade-in-up cursor-pointer ${
        isSelected 
          ? 'border-green-500/50 bg-green-500/10' 
          : 'hover:border-white/40 hover:bg-white/15'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
      onClick={() => onToggle(contact.contact_id.toString())}
    >
      {/* Selection Indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
          isSelected 
            ? 'bg-green-500 border-green-500' 
            : 'border-white/40 bg-white/10'
        }`}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg mb-1">{contact.name}</h3>
        <p className="text-white/80 text-sm mb-1">{contact.designation}</p>
        <p className="text-white/60 text-xs">{contact.email}</p>
      </div>

      {/* Contact Methods */}
      <div className="flex items-center space-x-4 mb-4">
        <div className={`flex items-center space-x-1 text-xs ${
          isSelected ? 'text-green-300' : 'text-white/80'
        }`}>
          <Mail className="w-3 h-3" />
          <span>Email Available</span>
        </div>
      </div>

      {/* Contact ID for reference */}
      <div className="bg-white/10 rounded-lg p-2 text-center mb-3">
        <div className="text-white font-semibold text-sm">ID: {contact.contact_id}</div>
        <div className="text-white/60 text-xs">Contact Reference</div>
      </div>

      {/* Selection Status */}
      <div className={`mt-3 text-center text-xs font-medium ${
        isSelected ? 'text-green-300' : 'text-white/60'
      }`}>
        {isSelected ? '✓ Contact Selected' : 'Click to Select'}
      </div>
    </div>
  );
};

const SelectContacts: React.FC<SelectContactsProps> = ({
  contacts,
  selectedContactIds,
  onContactSelection,
  companyName = "Company"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (contacts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">No contacts available for this company.</p>
      </div>
    );
  }

  const selectedCount = selectedContactIds.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {companyName}
              </span>
              {' '}Contact Discovery
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Our AI has discovered key contacts at {companyName}. We'll send your complaint to multiple decision-makers for maximum impact.
            </p>
            
            {/* Summary Stats */}
            <div className="flex items-center justify-center space-x-8 text-white/70">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>{selectedCount} of {contacts.length} contacts selected</span>
              </div>
            </div>
          </div>

          {/* Contact Grid */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : ' translate-y-8'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                <Target className="w-6 h-6 mr-2 text-green-400" />
                Available Contacts
                <span className="ml-3 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                  Select to Notify
                </span>
              </h2>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {contacts.map((contact, index) => (
                <ContactCard 
                  key={contact.contact_id} 
                  contact={contact} 
                  index={index}
                  isSelected={selectedContactIds.includes(contact.contact_id.toString())}
                  onToggle={onContactSelection}
                />
              ))}
            </div>
          </div>

          {/* Selection Summary & Continue */}
          <div className={`mt-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : ' translate-y-8'}`}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Send Your Complaint</h3>
                <p className="text-white/80 leading-relaxed">
                  Your complaint will be sent to {selectedCount} selected contact{selectedCount !== 1 ? 's' : ''}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{selectedCount}</div>
                  <div className="text-white/60 text-sm">Contacts Selected</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">{contacts.length}</div>
                  <div className="text-white/60 text-sm">Total Available</div>
                </div>
              </div>

              {/* Selected Contacts List */}
              {selectedCount > 0 && (
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4 text-center">Selected Contacts:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {contacts
                      .filter(contact => selectedContactIds.includes(contact.contact_id.toString()))
                      .map(contact => (
                        <div key={contact.contact_id} className="bg-white/5 rounded-lg p-3 text-sm">
                          <div className="text-white font-medium">{contact.name}</div>
                          <div className="text-white/70">{contact.designation}</div>
                          <div className="text-white/50 text-xs">{contact.email}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center justify-center ${
                    selectedCount > 0 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={selectedCount === 0}
                >
                  <Zap className="mr-2 w-5 h-5" />
                  Send Complaint Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center mt-6 space-x-6 text-white/60 text-sm">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Real-time tracking
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Automated follow-ups
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Success guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default SelectContacts;
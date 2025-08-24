// steps/ConfirmDetails.tsx
import React, { useState } from "react";
import { FormData } from "@/app/dashboard/FileComplaint/page"; // Using dashboard version for compatibility
import { Bold } from "lucide-react";

interface Company {
  company_id: number;
  name: string;
}

interface Contact {
  contact_id: number;
  name: string;
  email: string;
  designation: string;
}

interface MediaContact {
  media_contact_id: number;
  name: string;
  email: string;
  designation: string;
  organization: string;
  category: string;
}

interface ConfirmDetailsProps {
  companies: Company[];
  selectedCompanyId: string;
  formData: FormData;
  contacts: Contact[];
  selectedContactIds: string[];
  mediaContacts: MediaContact[];
  selectedMediaContactIds: string[];
}

const ConfirmDetails: React.FC<ConfirmDetailsProps> = ({
  companies,
  selectedCompanyId,
  formData,
  contacts,
  selectedContactIds,
  mediaContacts,
  selectedMediaContactIds,
}) => {
  const selectedCompany = companies.find(
    (c) => c.company_id.toString() === selectedCompanyId
  );

  const selectedContacts = contacts.filter((c) =>
    selectedContactIds.includes(c.contact_id.toString())
  );

  const selectedMediaContacts = mediaContacts.filter((m) =>
    selectedMediaContactIds.includes(m.media_contact_id.toString())
  );

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-1 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Confirm{" "}
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Details
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Review your {selectedCompany?.name || "N/A"} complaint.
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Complaint Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Complaint Title
                </h4>
                <p className="text-gray-700">{formData.title}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Description
                </h4>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.description}
                </p>
              </div>

              {formData.issue_summary && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Issue Summary
                  </h4>
                  <p className="text-gray-700">{formData.issue_summary}</p>
                </div>
              )}

              {formData.impact && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Impact</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {formData.impact}
                  </p>
                </div>
              )}

              {formData.prior_attempts && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Prior Attempts
                  </h4>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {formData.prior_attempts}
                  </p>
                </div>
              )}

              {formData.requested_action && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Requested Action
                  </h4>
                  <p className="text-gray-700">{formData.requested_action}</p>
                </div>
              )}
            </div>

            {/* Contacts Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Selected Contacts
                </h4>
                {selectedContacts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedContacts.map((contact) => (
                      <div
                        key={contact.contact_id}
                        className="bg-gray-50 p-3 rounded border"
                      >
                        <p className="font-medium text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-600">
                          {contact.designation}
                        </p>
                        <p className="text-xs text-blue-600">{contact.email}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">None selected</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Selected Media Contacts
                </h4>
                {selectedMediaContacts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedMediaContacts.map((media) => (
                      <div
                        key={media.media_contact_id}
                        className="bg-gray-50 p-3 rounded border"
                      >
                        <p className="font-medium text-sm">{media.name}</p>
                        <p className="text-xs text-gray-600">
                          {media.designation}, {media.organization}
                        </p>
                        <p className="text-xs text-blue-600">{media.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {media.category}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">None selected</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-10">
            {/* Complaint Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Generated Email
                </h4>

                {formData.formattedEmail && (
                  <div>
                    <h4 className="font-medium text-gray-900"></h4>
                    <div className="bg-white p-3 rounded border max-h-60 overflow-y-auto mt-2">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                        {formData.formattedEmail}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Review Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-yellow-800">
                  Review Before Submitting
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Please review all the details above carefully. Once submitted,
                  your complaint will be sent to the selected contacts and media
                  personnel.
                </p>
              </div>
            </div>
          </div>
        </div>

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
        `}</style>
      </main>
    </>
  );
};

export default ConfirmDetails;

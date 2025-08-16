import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FormData } from "@/app/dashboard/FileComplaint/page"; // Using dashboard version for compatibility
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  Bell,
  Crown,
  Users,
  Target,
  Clock,
  Zap,
  Star,
  Shield,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

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

const ComplaintSuccess: React.FC<ConfirmDetailsProps> = ({
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

  return (
    <>
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Success Message */}
          <div
            className={`text-center mb-8 transition-all duration-1000 opacity-1 translate-y-8'`}
          >
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md border border-green-500/30 rounded-3xl p-8 max-w-3xl mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Complaint Has Been
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  {" "}
                  Successfully Sent!
                </span>
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                We've delivered your professionally crafted complaint to at{" "}
                {selectedCompany?.name || "N/A"}.
              </p>
            </div>

            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default ComplaintSuccess;

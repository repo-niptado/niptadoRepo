"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getSession } from "next-auth/react";
import Topbar from "@/components/HomeComponent/Topbar/page";
import Footer from "@/components/Footer/page";

// Import step components
import CompanySelection from "@/components/FileComplaintSteps/CompanySelection";
import ComplaintDetails from "@/components/FileComplaintSteps/ComplaintDetails";
import FormatComplaint from "@/components/FileComplaintSteps/FormatComplaint";
import SelectContacts from "@/components/FileComplaintSteps/SelectContacts";
import SelectMediaContacts from "@/components/FileComplaintSteps/SelectMediaContacts";
import ConfirmDetails from "@/components/FileComplaintSteps/ConfirmDetails";

import Header from "@/components/Header";

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

export interface FormData {
  companyId: string;
  title: string;
  description: string;
  formattedEmail: string;
  issue_summary: string;
  impact: string;
  prior_attempts: string;
  requested_action: string;
  selectedMediaContactIds: string[];
}

const FileComplaint = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [selectedMediaContactIds, setSelectedMediaContactIds] = useState<string[]>([]);
  const [mediaContacts, setMediaContacts] = useState<MediaContact[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    companyId: "",
    title: "",
    description: "",
    formattedEmail: "",
    issue_summary: "",
    impact: "",
    prior_attempts: "",
    requested_action: "",
    selectedMediaContactIds: [],
  });

  // 🔐 Fetch token on mount
  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      const jwt = (session?.user as any)?.backendToken;
      if (jwt) setToken(jwt);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/companies", {
          withCredentials: true,
        });
        setCompanies(res.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!selectedCompanyId) return;
      try {
        const res = await axios.get("http://localhost:3001/api/companies", {
          withCredentials: true,
        });
        const selected = res.data.find(
          (c: any) => c.company_id.toString() === selectedCompanyId
        );
        setContacts(selected?.contacts || []);
        setMediaContacts(selected?.media_contacts || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, [selectedCompanyId]);

  const handleContactSelection = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleMediaContactSelection = (id: string) => {
    setSelectedMediaContactIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setContacts([]);
    setSelectedContactIds([]);
    setSelectedMediaContactIds([]);
    setMediaContacts([]);

    // Reset complaint fields and step if already filled
    setFormData({
      companyId: companyId,
      title: "",
      description: "",
      formattedEmail: "",
      selectedMediaContactIds: [],
      issue_summary: "",
      impact: "",
      prior_attempts: "",
      requested_action: "",
    });

    if (step > 1) {
      setStep(1); // Go back to step 1 if user has progressed
    }
  };

  const generateFormattedEmail = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/claude/generate-formatted-email",
        {
          companyId: formData.companyId,
          title: formData.title,
          userName: user?.name || "Customer",
          level1_issue_summary: formData.title,
          level1_impact: formData.description,
          level1_prior_attempts: formData.prior_attempts,
          level1_requested_action: formData.requested_action,
          level1_generated_email: formData.formattedEmail,
        }
      );
      setFormData((prev) => ({
        ...prev,
        formattedEmail: res.data.formattedEmail,
      }));
    } catch (error) {
      alert("Failed to generate formatted complaint.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedCompany = companies.find(
        (c) => c.company_id.toString() === selectedCompanyId
      );
      if (!selectedCompany) return alert("Selected company not found.");

      await axios.post(
        "http://localhost:3001/api/complaints",
        {
          title: formData.title,
          description: formData.description,
          companyName: selectedCompany.name,
          category: formData.title,
          subcategory: "General",
          status: "Pending",
          disputed_value: 0,
          desired_resolution: "Not specified",
          contactIds: selectedContactIds.map((id) => parseInt(id)),
          mediaContactIds: selectedMediaContactIds.map((id) => parseInt(id)),
          level1_issue_summary: formData.title,
          level1_impact: formData.description,
          level1_prior_attempts: formData.prior_attempts,
          level1_requested_action: formData.requested_action,
          level1_generated_email: formData.formattedEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("Complaint submitted successfully");
      router.push("/");
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Failed to submit complaint");
    }
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 1:
        return selectedCompanyId !== "";
      case 2:
        return formData.title.trim() !== "";
      case 3:
        return formData.description.trim() !== "";
      default:
        return true;
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <CompanySelection
            companies={companies}
            selectedCompanyId={selectedCompanyId}
            onCompanyChange={handleCompanyChange}
          />
        );
      case 2:
        return (
          <ComplaintDetails
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <FormatComplaint
            formData={formData}
            setFormData={setFormData}
            isGenerating={isGenerating}
            onGenerateEmail={generateFormattedEmail}
            user={user}
          />
        );
      case 4:
        return (
          <SelectContacts
            contacts={contacts}
            selectedContactIds={selectedContactIds}
            onContactSelection={handleContactSelection}
          />
        );
      case 5:
        return (
          <SelectMediaContacts
            mediaContacts={mediaContacts}
            selectedMediaContactIds={selectedMediaContactIds}
            onMediaContactSelection={handleMediaContactSelection}
          />
        );
      case 6:
        return (
          <ConfirmDetails
            companies={companies}
            selectedCompanyId={selectedCompanyId}
            formData={formData}
            contacts={contacts}
            selectedContactIds={selectedContactIds}
            mediaContacts={mediaContacts}
            selectedMediaContactIds={selectedMediaContactIds}
          />
        );
      default:
        return null;
    }
  };

  if (loading || user === null) return <div>Loading...</div>;

  return (
    <>
     
   <Header setSidebarOpen={() => {}} />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          File a Complaint
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          We'll help you create an effective complaint and send it to the right
          people.
        </p>

        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-500">
              Step {step} of 6
            </span>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={step === 1 ? "text-blue-600 font-semibold" : ""}>
              Company
            </span>
            <span className={step === 2 ? "text-blue-600 font-semibold" : ""}>
              Complaint
            </span>
            <span className={step === 3 ? "text-blue-600 font-semibold" : ""}>
              Format
            </span>
            <span className={step === 4 ? "text-blue-600 font-semibold" : ""}>
              Executives
            </span>
            <span className={step === 5 ? "text-blue-600 font-semibold" : ""}>
              Media & Gov
            </span>
            <span className={step === 6 ? "text-blue-600 font-semibold" : ""}>
              Confirm
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderCurrentStep()}

          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 text-gray-700 border rounded"
              >
                Back
              </button>
            )}
            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={!canProceedToNextStep()}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </main>
      <Footer />
   </>
  );
};

export default FileComplaint;
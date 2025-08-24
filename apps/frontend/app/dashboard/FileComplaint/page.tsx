"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CompanySelection from "@/components/FileComplaintSteps/CompanySelection";
import ComplaintDetails from "@/components/FileComplaintSteps/ComplaintDetails";
import FormatComplaint from "@/components/FileComplaintSteps/FormatComplaint";
import SelectContacts from "@/components/FileComplaintSteps/SelectContacts";
import SelectMediaContacts from "@/components/FileComplaintSteps/SelectMediaContacts";
import ConfirmDetails from "@/components/FileComplaintSteps/ConfirmDetails";
import Step2Loading from "@/components/FileComplaintSteps/step2Loading";
import ComplaintSuccess from "@/components/FileComplaintSteps/ComplaintSuccess";

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
  uploadedFiles: UploadedFile[];
  // New fields for proper complaint handling
  incident_date: string;
  incident_time: string;
  order_id: string;
  incident_datetime: string;
}

export interface UploadedFile {
  file_name: string;
  file_path: string;
  file_type: string;
  temp_id?: string;
  size?: number;
}

const FileComplaint = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [selectedMediaContactIds, setSelectedMediaContactIds] = useState<
    string[]
  >([]);
  const [mediaContacts, setMediaContacts] = useState<MediaContact[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStep2Loading, setShowStep2Loading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    uploadedFiles: [],
    incident_date: "",
    incident_time: "",
    order_id: "",
    incident_datetime: "",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 🔐 Keep token in sync with NextAuth session
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      // const jwt = (session?.user as any)?.backendToken;
      const jwt = session?.user?.backendToken;
      if (jwt) {
        setToken(jwt);
      } else {
        console.warn("No backend token found in session (authenticated state)");
      }
    }
  }, [session, status]);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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
      uploadedFiles: [],
      incident_date: "",
      incident_time: "",
      order_id: "",
      incident_datetime: "",
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
          description: formData.description,
          userName: user?.name || "Customer",
          incident_date: formData.incident_date,
          incident_time: formData.incident_time,
          order_id: formData.order_id,
          level1_issue_summary: formData.issue_summary,
          level1_impact: formData.impact,
          level1_prior_attempts: formData.prior_attempts,
          level1_requested_action: formData.requested_action,
          level1_generated_email: formData.formattedEmail,
          uploadedFiles: formData.uploadedFiles,
        }
      );
      setFormData((prev) => ({
        ...prev,
        formattedEmail: res.data.formattedEmail,
      }));
    } catch (error: any) {
      console.error('Email generation error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      
      const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred";
      alert(`Failed to generate formatted complaint: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return; // prevent double submits
    setIsSubmitting(true);
    
    // Try to get token one more time if it's missing
    let currentToken = token;
    if (!currentToken) {
      console.log("Token missing, attempting to fetch fresh token...");
      try {
        const session = await getSession();
        currentToken = (session?.user as any)?.backendToken;
        if (!currentToken) {
          // fallback to API endpoint that issues a token from server session
          const tRes = await fetch('/api/auth/backend-token');
          if (tRes.ok) {
            const data = await tRes.json();
            currentToken = data.backendToken;
          }
        }
        if (currentToken) {
          setToken(currentToken);
          console.log("Fresh token obtained successfully");
        }
      } catch (error) {
        console.error("Failed to fetch fresh token:", error);
      }
    }
    
    console.log("Starting submission with data:", {
      formData,
      selectedCompanyId,
      selectedContactIds,
      selectedMediaContactIds,
      token: currentToken ? "present" : "missing"
    });
    
    try {
      const selectedCompany = companies.find(
        (c) => c.company_id.toString() === selectedCompanyId
      );
      if (!selectedCompany) {
        console.error("No company selected");
        return alert("Selected company not found.");
      }

      // If we still don't have a Bearer token, proceed using backend cookie auth

      // Validate required fields
      if (!formData.issue_summary || !formData.incident_date) {
        console.error("Missing required fields:", {
          issue_summary: formData.issue_summary,
          incident_date: formData.incident_date
        });
        return alert("Please fill in all required fields (Issue Summary and Incident Date).");
      }

      const submissionData = {
        title: formData.title || formData.issue_summary,
        description: formData.description || formData.impact || formData.issue_summary,
        companyName: selectedCompany.name,
        category: formData.issue_summary || "General",
        subcategory: "General",
        status: "Pending",
        disputed_value: 0,
        desired_resolution: "Not specified",
        contactIds: selectedContactIds.map((id) => parseInt(id)),
        mediaContactIds: selectedMediaContactIds.map((id) => parseInt(id)),
        // New fields
        incident_date: formData.incident_date,
        incident_time: formData.incident_time,
        order_id: formData.order_id,
        incident_datetime: formData.incident_datetime,
        level1_issue_summary: formData.issue_summary,
        level1_impact: formData.impact,
        level1_prior_attempts: formData.prior_attempts,
        level1_requested_action: formData.requested_action,
        level1_generated_email: formData.formattedEmail,
        tempDocuments: formData.uploadedFiles,
      };

      console.log("Submitting data:", submissionData);

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (currentToken) {
        headers.Authorization = `Bearer ${currentToken}`;
      }

      const response = await axios.post(
        "http://localhost:3001/api/complaints",
        submissionData,
        {
          headers,
          withCredentials: true,
        }
      );

      console.log("Submission successful:", response.data);
      setSubmissionSuccess(true);
    } catch (err: any) {
      console.error("Error submitting complaint:", {
        error: err,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      const errorMessage = err.response?.data?.message || err.message || "Unknown error occurred";
      alert(`Failed to submit complaint: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <ComplaintSuccess
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        formData={formData}
        contacts={contacts}
        selectedContactIds={selectedContactIds}
        mediaContacts={mediaContacts}
        selectedMediaContactIds={selectedMediaContactIds}
      />
    );
  }

  const canProceedToNextStep = () => {
    switch (step) {
      case 1:
        return selectedCompanyId !== "";
      case 2:
        // Check if at least incident date and issue summary are filled
        return (
          formData.incident_date.trim() !== "" && 
          formData.issue_summary.trim() !== ""
        );
      case 3:
        return formData.formattedEmail.trim() !== "";
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (step === 2) {
      setShowStep2Loading(true);
      setTimeout(() => {
        setShowStep2Loading(false);
        setStep((prev) => prev + 1);
      }, 1000);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const renderCurrentStep = () => {
    if (showStep2Loading) {
      return <Step2Loading />;
    }

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
          <ComplaintDetails formData={formData} setFormData={setFormData} />
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
      <main className="max-w-6xl mx-auto p-6">
        
        {/* Step Indicator */}
        {/* <div className="mb-6">
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
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderCurrentStep()}

          <div
            className={`flex justify-between items-center mt-8 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center"
                disabled={showStep2Loading}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
            )}
            {step < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className={`font-semibold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center ${
                  canProceedToNextStep()
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-red-500/25 hover:scale-105"
                    : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!canProceedToNextStep() || showStep2Loading}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : step === 6 ? (
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                disabled={showStep2Loading || isSubmitting}
                title={isSubmitting ? "Submitting..." : undefined}
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : null}
          </div>
        </form>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default FileComplaint;

import React, { useEffect, useRef } from "react";
import { FormData } from "@/app/dashboard/FileComplaint/page"; // Using dashboard version for compatibility
import { FileText } from "lucide-react";

interface User {
  name?: string;
}

interface FormatComplaintProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isGenerating: boolean;
  onGenerateEmail: () => void;
  user: User | null;
}

const FormatComplaint: React.FC<FormatComplaintProps> = ({
  formData,
  setFormData,
  isGenerating,
  onGenerateEmail,
  user,
}) => {
  // Automatically generate formatted email when required fields are filled
  useEffect(() => {
    if (
      formData.incident_date.trim() !== "" &&
      formData.issue_summary.trim() !== "" &&
      !formData.formattedEmail &&
      !isGenerating
    ) {
      onGenerateEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.incident_date, formData.issue_summary]);

  // Ref for textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [formData.formattedEmail]);

  return (
    <main className="relative z-10 px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        {formData.formattedEmail && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Formatted Complaint Email
                </h2>
                <p className="text-white/60 text-sm">
                  Provided a clear description of what went wrong
                </p>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={formData.formattedEmail}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  formattedEmail: e.target.value,
                }))
              }
              className="w-full min-h-[8rem] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white placeholder-white/50 resize-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 text-lg leading-relaxed"
              style={{ overflow: "hidden" }}
            />
          </div>
        )}
        {isGenerating && (
          <div className="text-blue-500 text-sm">
            Generating complaint email...
          </div>
        )}
      </div>
    </main>
  );
};

export default FormatComplaint;
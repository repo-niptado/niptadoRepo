// steps/ComplaintDetails.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FormData as ComplaintFormData } from "@/app/dashboard/FileComplaint/page";
import axios from "axios";
import { getSession } from "next-auth/react";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Hash,
  Upload,
  FileText,
  Camera,
  Mail,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Plus,
} from "lucide-react";

interface ComplaintDetailsProps {
  formData: ComplaintFormData;
  setFormData: React.Dispatch<React.SetStateAction<ComplaintFormData>>;
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({
  formData,
  setFormData,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 🔐 Fetch token on mount
  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      const jwt = (session?.user as any)?.backendToken;
      if (jwt) setToken(jwt);
    };
    fetchToken();
  }, []);

  const evidenceDisclaimer = [
    "Upload all relevant documentation to strengthen your complaint",
    "Include timestamps, reference numbers, and communication records",
    "Screenshots of error messages or service failures are highly valuable",
    "Original receipts and invoices help establish financial impact",
    "The more evidence provided, the stronger your case becomes",
  ];

  // File upload handler
  const handleFileUpload = async (files: FileList) => {
    setUploadingFiles(true);
    const formData = new FormData();
    
    // Add all files to FormData
    Array.from(files).forEach((file) => {
      formData.append('documents', file);
    });

    try {
      const response = await axios.post(
        'http://localhost:3001/api/documents/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` })
          },
          withCredentials: true,
        }
      );

      // Add uploaded files to form state
      const newFiles = response.data.documents;
      setFormData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...newFiles]
      }));
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploadingFiles(false);
    }
  };

  // Remove file handler
  const removeFile = (index: number) => {
    const updatedFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, uploadedFiles: updatedFiles }));
  };

  // File input change handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
    // Reset input value to allow same file to be uploaded again if needed
    e.target.value = '';
  };

  // Get file size in readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Issue Details &
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Evidence
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Help us build a stronger case by providing specific details and
              supporting evidence.
            </p>
          </div>

          {/* Main Form Card */}
          <div
            className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Section 1: When Did This Issue Occur */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    When Did This Issue Occur?
                  </h2>
                  <p className="text-white/60 text-sm">
                    Provide the exact date and time if possible
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Input */}
                <div className="relative">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.incident_date}
                      onChange={(e) =>
                        setFormData({ ...formData, incident_date: e.target.value })
                      }
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                    />
                    <Calendar className="absolute right-4 top-4 w-5 h-5 text-white/50 pointer-events-none" />
                  </div>
                </div>

                {/* Time Input */}
                <div className="relative">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Time (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={formData.incident_time}
                      onChange={(e) =>
                        setFormData({ ...formData, incident_time: e.target.value })
                      }
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                    />
                    <Clock className="absolute right-4 top-4 w-5 h-5 text-white/50 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Order/Transaction ID */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Hash className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Order ID / Transaction Number
                  </h2>
                  <p className="text-white/60 text-sm">
                    Any reference number that helps identify your transaction
                  </p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., ORDER-123456, TXN-ABC789, REF-XYZ123"
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 text-lg"
                  value={formData.order_id}
                  onChange={(e) =>
                    setFormData({ ...formData, order_id: e.target.value })
                  }
                />

                {/* Validation Indicator */}
                <div className="absolute top-4 right-4">
                  {formData.order_id.length >= 3 ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : formData.order_id.length > 0 ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  ) : null}
                </div>
              </div>

              <div className="mt-3 text-white/60 text-sm">
                <Info className="w-4 h-4 inline mr-1" />
                Can't find it? Check your email confirmation, receipt, or
                account history.
              </div>
            </div>

            {/* Section 3: Describe Your Issue */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Describe Your Issue
                  </h2>
                  <p className="text-white/60 text-sm">
                    Provide a clear description of what went wrong
                  </p>
                </div>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Describe the issue you experienced. Include what happened, when it occurred, and how it affected you..."
                  className="w-full h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white placeholder-white/50 resize-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 text-lg leading-relaxed"
                  maxLength={1000}
                  value={formData.issue_summary || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, issue_summary: e.target.value })
                  }
                />

                {/* Character Count */}
                <div className="absolute bottom-4 right-4 text-white/50 text-sm">
                  {(formData.issue_summary || "").length}/1000
                </div>
              </div>
            </div>

            {/* Section 4: Attach Evidence */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Attach Evidence
                  </h2>
                  <p className="text-white/60 text-sm">
                    Supporting documents strengthen your complaint significantly
                  </p>
                </div>
              </div>

              {/* File Upload Area */}
              <div className="mb-6">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={uploadingFiles}
                />
                <label
                  htmlFor="file-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                    uploadingFiles ? 'opacity-50 cursor-not-allowed' : 'hover:border-red-400/50'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadingFiles ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
                        <p className="text-sm text-white/70">Uploading files...</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2 text-white/60" />
                        <p className="mb-2 text-sm text-white/80">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-white/60">
                          PDF, JPG, PNG, DOC up to 10MB each (Max 10 files)
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {/* Uploaded Files */}
              {formData.uploadedFiles.length > 0 && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Uploaded Evidence ({formData.uploadedFiles.length})
                  </h3>
                  <div className="space-y-2">
                    {formData.uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-green-400" />
                          <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">{file.file_name}</span>
                            {file.size && (
                              <span className="text-white/50 text-xs">{formatFileSize(file.size)}</span>
                            )}
                          </div>
                          <span className="text-green-400 text-xs bg-green-400/20 px-2 py-1 rounded-full">
                            ✓ Uploaded
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-400 hover:text-red-300 p-1 hover:bg-red-400/20 rounded transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Guidelines */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-blue-300 font-semibold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Evidence Guidelines - Maximize Your Success
                </h3>
                <ul className="space-y-2">
                  {evidenceDisclaimer.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-blue-200/90 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form Validation Message */}
            {/* {!isValid && Object.values(formData).some(val => val && val.length > 0) && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Please complete required fields</span>
                </div>
                <p className="text-yellow-300/80 text-sm mt-1">
                  Date and Order ID are required to proceed.
                </p>
              </div>
            )} */}
          </div>

          {/* Navigation Buttons */}
          {/* <div className={`flex justify-between items-center mt-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            
            <button 
              className={`font-semibold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center ${
                isValid 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-red-500/25 hover:scale-105' 
                  : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isValid}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div> */}
        </div>
      </main>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Complaint Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Delayed Refund for Cancelled Order"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Complaint Description
        </label>
        <textarea
          rows={5}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Explain the issue in detail..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Issue Summary
        </label>
        <input
          type="text"
          value={formData.issue_summary || ""}
          onChange={(e) =>
            setFormData({ ...formData, issue_summary: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Refund not received for returned product"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Impact on You
        </label>
        <textarea
          rows={3}
          value={formData.impact || ""}
          onChange={(e) =>
            setFormData({ ...formData, impact: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Explain how this issue affected you..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Previous Attempts to Resolve
        </label>
        <textarea
          rows={3}
          value={formData.prior_attempts || ""}
          onChange={(e) =>
            setFormData({ ...formData, prior_attempts: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Mention if you contacted support or anyone else..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requested Resolution
        </label>
        <input
          type="text"
          value={formData.requested_action || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              requested_action: e.target.value,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Full refund of ₹999"
        />
      </div> */}

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Transaction ID
        </label>
        <input
          type="text"
          value={formData.transaction_id}
          onChange={(e) =>
            setFormData({ ...formData, transaction_id: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., #TXN123456789"
        />
      </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        Date and Time of Incident
      </label>
      <input
        type="datetime-local"
        value={formData.incident_datetime || ""}
        onChange={(e) =>
        setFormData({ ...formData, incident_datetime: e.target.value })
        }
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Attach Evidence (optional)
        </label>
        <input
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFormData({
                ...formData,
                evidence_files: Array.from(e.target.files),
              });
            }
          }}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
        {formData.evidence_files.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
            {formData.evidence_files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default ComplaintDetails;

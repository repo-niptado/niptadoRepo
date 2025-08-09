import { FileText, Mail, DollarSign, User } from "lucide-react";
export default function AutomatedPlatform() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How Our Automated Platform Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            We simplify the complaint process with powerful tools and features.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <FileText size={18} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Smart Complaint Filing
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Our AI helps you write effective, professional complaints that
                get results.
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center p-6 text-white group-hover:flex">
                <div>
                  <h3 className="text-lg font-medium">AI-Powered Assistance</h3>
                  <p className="mt-2 text-sm">
                    Get real-time suggestions to improve your complaint's tone,
                    clarity, and effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Executive Contact
              </h3>
              <p className="mt-2 text-base text-gray-500">
                We find the right executives to contact for faster resolution.
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center p-6 text-white group-hover:flex">
                <div>
                  <h3 className="text-lg font-medium">Skip the Gatekeepers</h3>
                  <p className="mt-2 text-sm">
                    Our database contains contact information for
                    decision-makers who can actually solve your problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <DollarSign size={18} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Money Recovery
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Track financial recoveries from your successful complaints.
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center p-6 text-white group-hover:flex">
                <div>
                  <h3 className="text-lg font-medium">Get What You Deserve</h3>
                  <p className="mt-2 text-sm">
                    Our users have recovered millions in refunds, compensation,
                    and settlements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

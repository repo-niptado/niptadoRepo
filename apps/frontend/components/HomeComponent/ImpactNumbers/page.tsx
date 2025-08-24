import { FileText, DollarSign, User } from "lucide-react";

export default function ImpactNumbers() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Impact in Numbers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            See the difference we've made for consumers across the country.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <FileText size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">15,782</h3>
            <p className="mt-2 text-lg text-gray-600">Complaints Submitted</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <DollarSign size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">$4.2M</h3>
            <p className="mt-2 text-lg text-gray-600">Money Recovered</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
              <User size={28} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">9,845</h3>
            <p className="mt-2 text-lg text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

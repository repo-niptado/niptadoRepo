
export default function CustomerSuccess() {
  return (
    <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Customer Success Stories
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          See how real users resolved issues with our platform.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl font-bold">J</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Jamie S.</h4>
                <p className="text-sm text-gray-500">Recovered $1,250</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 mb-4">
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
            </div>
            <p className="text-gray-600 italic">
              "After months of trying to get a refund from an airline, I filed a
              complaint through Niptado. Within a week, I received a full
              refund and an apology from the CEO."
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl font-bold">M</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Michael T.</h4>
                <p className="text-sm text-gray-500">Recovered $3,700</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 mb-4">
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
            </div>
            <p className="text-gray-600 italic">
              "When my insurance company denied my claim, I thought I was out of
              options. Niptado connected me directly with executives who
              reviewed my case and approved the full amount."
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <span className="text-purple-600 text-xl font-bold">S</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Sarah K.</h4>
                <p className="text-sm text-gray-500">Recovered $890</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 mb-4">
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
              <div className="text-yellow-400">★</div>
            </div>
            <p className="text-gray-600 italic">
              "The AI-powered complaint writer helped me phrase my issue
              perfectly. My tech company responded within 48 hours and sent a
              replacement device plus a discount on my next purchase."
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

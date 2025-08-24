import React from 'react';

const AutomatedPlatform = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-center md:text-left">
            <div className="text-sm text-gray-500">© {currentYear} Niptado</div>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Privacy
            </a>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-center md:text-left">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              FAQs
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Legal Resources
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AutomatedPlatform;

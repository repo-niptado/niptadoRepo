"use client";

import { useState } from "react";
import { Menu, X, Home, LayoutDashboard, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import SignInModal from "@/components/HomeComponent/Modal/SignInModal";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-blue-600"><a href="/">Niptado</a></span>
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Home size={18} /> Home
                </Link>

                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hidden md:inline-block bg-transparent text-white rounded hover:bg-transparent transition"
                  >
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </button>
                )}

                {user ? (
                  <>
                    <Link
                      href="/FileComplaint"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                      <FileText size={18} /> File Complaint
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hidden md:inline-block bg-transparent text-white rounded hover:bg-transparent transition"
                  >
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                      <FileText size={18} /> File Complaint
                    </Link>
                  </button>
                )}
              </nav>
            </div>

            {/* Sign In + Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="mr-4">Welcome, {user.name}</span>
                  <button onClick={logout} className="text-sm text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Sign In
                </button>
              )}

              <button
                className="md:hidden text-gray-600"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-3">
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                <Home size={18} /> Home
              </Link>
              <Link
                href="/DashboardLayout"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                <FileText size={18} /> File Complaint
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sign In Modal */}
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Topbar;

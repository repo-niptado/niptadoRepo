"use client";

import { useState } from "react";
import { ChevronDown, Bell, LogOut, Menu, User, ArrowLeft} from "lucide-react";
import Link from "next/link";
import { useAuth } from "context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // <-- get current path
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hideBackButton =
    pathname === "/" ||
    pathname === "/dashboard";
  return (
    <>
      <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {!hideBackButton && (
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="p-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center mr-2"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                )}

              <button
  type="button"
  onClick={() => router.push("/")}
  className="flex items-center space-x-3 focus:outline-none"
>
  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
    <span className="text-white font-bold text-lg">N</span>
  </div>
  <span className="text-2xl font-bold text-white tracking-tight">
    Niptado
  </span>
</button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <button className="relative p-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                
                </span>
             
              </button> */}

              {pathname !== "/dashboard/FileComplaint" && (
                <button
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={() => router.push("/dashboard/FileComplaint")}
                >
                  New Complaint
                </button>
              )}

              <button className="p-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* <header className="w-full bg-blue-800 shadow sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center space-x-4">
            <button
              className="text-white md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold text-white">
              <Link href="/">Niptado</Link>
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={`http://localhost:3000${
                  (user as any)?.profileImage || "/default.png"
                }`}
              />
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded z-20">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    // handle logout
                  }}
                  className="w-full flex items-center gap-2 text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header> */}
    </>
  );
}

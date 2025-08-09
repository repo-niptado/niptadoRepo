"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  X,
  User,
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `group flex items-center gap-2 px-4 py-2 rounded transition ${
      isActive(path)
        ? "bg-blue-100 text-blue-800 font-semibold border-l-4 border-blue-500"
        : "text-gray-700 hover:bg-blue-50"
    }`;

  return (
    <aside
      className={`fixed md:static rounded-xl  top-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } z-30 md:z-3 md:translate-x-0 flex flex-col overflow-y-auto`}
    >
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden border-b">
        <span className="font-bold text-xl">Menu</span>
        <button onClick={() => setSidebarOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className="px-4 py-3 border-b">
        <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
        <p className="text-xs text-gray-500">{user?.role}</p>
      </div>

      <nav className="p-4 space-y-1 text-sm flex-1 overflow-y-auto">
        {/* Dashboard */}
        <Link
          href="/dashboard"
          onClick={handleLinkClick}
          className={linkClass("/dashboard")}
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        {/* Complaint Toggle */}
        <button
          onClick={() => setComplaintOpen(!complaintOpen)}
          className="flex w-full items-center justify-between px-4 py-2 text-gray-700 rounded hover:bg-blue-50"
        >
          <span className="flex items-center gap-2">
            <FileText size={18} />
            Complaint
          </span>
          {complaintOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Submenu */}
        {complaintOpen && (
          <div className="ml-8 mt-1 space-y-1">
            <Link
              href="/dashboard/file-complaint"
              onClick={handleLinkClick}
              className={linkClass("/dashboard/file-complaint")}
            >
              <PlusCircle size={16} /> New Complaint
            </Link>
            <Link
              href="/dashboard/my-complaints"
              onClick={handleLinkClick}
              className={linkClass("/dashboard/my-complaints")}
            >
              <FileText size={16} /> List Complaint
            </Link>
          </div>
        )}

        {/* Superadmin Only */}
        {user?.role === "SUPERADMIN" && (
          <Link
            href="/dashboard/company-list"
            onClick={handleLinkClick}
            className={linkClass("/dashboard/company-list")}
          >
            <Building2 size={18} /> Company List
          </Link>
        )}

        {/* Future: Settings */}
        {/* <Link href="/dashboard/settings" onClick={handleLinkClick} className={linkClass("/dashboard/settings")}>
          <Settings size={18} /> Settings
        </Link> */}

        {/* Profile */}
        <Link
          href="/dashboard/profile"
          onClick={handleLinkClick}
          className={linkClass("/dashboard/profile")}
        >
          <User size={18} /> Profile
        </Link>
      </nav>

      {/* Optional Footer */}
      <div className="p-4 text-xs text-gray-400 border-t text-center">
        © 2025 Niptado
      </div>
    </aside>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  MessageSquare,
  Shield,
  TrendingUp,
  Zap,
  Star,
  CheckCircle,
  ArrowLeft,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import SignInModal from "@/components/HomeComponent/Modal/SignInModal";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
const NiptadoHomepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { icon: MessageSquare, value: "50K+", label: "Complaints Filed" },
    { icon: TrendingUp, value: "$2.4M", label: "Money Recovered" },
    { icon: Shield, value: "89%", label: "Success Rate" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");

  // Back button (hide on home page)
  const showBackButton = pathname !== "/";

  // File Complaint button handler
  const handleFileComplaint = () => {
    if (user) {
      router.push("/dashboard/FileComplaint");
    } else {
      setAuthTab("signin");
      setIsModalOpen(true);
    }
  };

  // Dashboard handler
  const handleDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Dynamic background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                type="button"
                onClick={() => router.back()}
                className="p-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors mr-2 flex items-center justify-center"
                aria-label="Go Back"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Logo clickable: always goes home */}
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

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-white/80 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-white/80 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-white/80 hover:text-white transition-colors"
            >
              Pricing
            </a>

            {/* <Link
              href="/signUpPage"
              className="text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </Link> */}

            {/* {complaintOpen && (
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
        )} */}

            {/* <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              Sign In
            </button> */}

            {user ? (
              <>
                <span className="text-white/80 hover:text-white transition-colors">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              // <button
              //   onClick={() => setIsModalOpen(true)}
              //   className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
              // >
              //   Sign In
              // </button>
              // <button
              //   onClick={() => {
              //     setAuthTab("signin");
              //     setIsModalOpen(true);
              //   }}
              //   className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
              // >
              //   Sign In
              // </button>

              <Link
                href="/signUpPage"
                className="text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            )}

            {user && (
              <button
                onClick={handleDashboard}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Dashboard
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 text-white/90 text-sm">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              AI-Powered Complaint Resolution
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get Your
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Voice Heard
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your frustration into results. Our AI-powered platform
              helps you file effective complaints, track progress, and recover
              what you deserve from companies with poor service.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {user ? (
                <button
                  className="group bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center"
                  onClick={() => router.push("/dashboard/FileComplaint")}
                >
                  File Your First Complaint
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <Link
                  href="/signUpPage"
                  className="group bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center"
                >
                  File Your First Complaint
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-red-400" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get the Resolution You Deserve?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of consumers who've successfully resolved their
              complaints and recovered their money.
            </p>
            {/* <button
              onClick={handleFileComplaint}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 inline-flex items-center"
            >
              Start Your Complaint Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button> */}

            {user ? (
              <button
                onClick={() => router.push("/dashboard/FileComplaint")}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                Start Your Complaint Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            ) : (
              <Link
                href="/signUpPage"
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                Start Your Complaint Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}

            <div className="flex items-center justify-center mt-6 space-x-6 text-white/60 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                No upfront costs
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                AI-powered assistance
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Track everything
              </div>
            </div>
          </div>
        </div>
      </section>

      {pathname === "/" && (
        <footer className="w-full py-6 flex justify-center items-center bg-white/10 backdrop-blur-md border-t border-white/20 mt-6 px-6">
          <div className="flex flex-col md:flex-row items-center gap-3 text-center">
            <span className="text-white/60 text-xs md:text-sm">
              &copy; {new Date().getFullYear()} Niptado. All rights reserved.
            </span>
            <Link
              href="/privacy-policy"
              className="text-white/80 hover:text-white font-semibold rounded-lg px-3 py-1 transition-all duration-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white shadow-sm"
              style={{ textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      )}

      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default NiptadoHomepage;

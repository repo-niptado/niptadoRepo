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
  LayoutDashboard,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Phone,
  Search,
  UserCheck,
  Plane,
  CreditCard,
  Mail,
  Stethoscope,
  Briefcase,
  ShoppingCart,
  Home,
  Building,
  Smartphone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Brain,
  Target,
  AlertTriangle,
  FileText,
  BarChart3,
  Eye,
  Scale,
  Database,
  Send,
  Menu,
  X,
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [currentPainIndex, setCurrentPainIndex] = useState(0);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentDigitalIndex, setCurrentDigitalIndex] = useState(0);
  const [currentPressIndex, setCurrentPressIndex] = useState(0);

  const problemStats = [
    {
      value: "15 Billion",
      label: "Hours Wasted in 2024",
      sublabel: "by Indian consumers waiting to resolve complaints",
    },
    {
      value: "5.41 Lakh",
      label: "Complaints in 2025",
      sublabel: "received by National Consumer Helpline alone",
    },
    {
      value: "70%",
      label: "Growth in Complaints",
      sublabel: "over just two years with broken infrastructure",
    },
    {
      value: "89%",
      label: "Ready to Switch",
      sublabel: "consumers willing to change brands due to poor service",
    },
    {
      value: "48 Days",
      label: "Average Resolution Time",
      sublabel: "even with AI-enabled government systems",
    },
    {
      value: "84%",
      label: "Leave Negative Reviews",
      sublabel: "after poor service experiences damaging brands",
    },
    {
      value: "66%",
      label: "Unresolved Cases",
      sublabel: "complaints that never reach satisfactory resolution",
    },
    {
      value: "₹2.1 Trillion",
      label: "Economic Impact",
      sublabel: "annual loss due to poor customer service in India",
    },
    {
      value: "45 Minutes",
      label: "Average Wait Time",
      sublabel: "consumers spend on hold before reaching support",
    },
    {
      value: "73%",
      label: "Repeat Complaints",
      sublabel: "same issues filed multiple times due to poor resolution",
    },
  ];

  const painPoints = [
    {
      icon: AlertTriangle,
      text: "39% kept on hold indefinitely during complaint calls",
    },
    {
      icon: Phone,
      text: "36% repeatedly transferred between departments without resolution",
    },
    {
      icon: Users,
      text: "34% believe companies deliberately complicate the complaint process",
    },
    {
      icon: Clock,
      text: "Average 48 days resolution time even with AI-enabled systems",
    },
    {
      icon: FileText,
      text: "52% of complaints require multiple submissions to get acknowledgment",
    },
    {
      icon: Target,
      text: "67% receive generic responses that don't address specific issues",
    },
    {
      icon: AlertTriangle,
      text: "41% never receive any follow-up communication after filing",
    },
    {
      icon: Users,
      text: "58% feel companies ignore individual complaints systematically",
    },
    {
      icon: Phone,
      text: "43% experience disconnected calls during complaint processes",
    },
    {
      icon: Clock,
      text: "71% waste entire work days trying to resolve simple service issues",
    },
    {
      icon: FileText,
      text: "49% have to explain the same issue to multiple representatives",
    },
    {
      icon: Target,
      text: "38% receive no compensation despite valid complaints",
    },
  ];

  const coreFeatures = [
    {
      icon: Brain,
      title: "AI Complaint Engine",
      description:
        "NLP-powered drafting with legal optimization and sentiment analysis",
    },
    {
      icon: Database,
      title: "Premium Contact Database",
      description:
        "Executive-level contacts unavailable to individual consumers",
    },
    {
      icon: Send,
      title: "Multi-Channel Delivery",
      description:
        "Automated email, social media, and corporate portal delivery",
    },
    {
      icon: Scale,
      title: "Class Action Aggregator",
      description: "Pattern recognition identifying group action opportunities",
    },
    {
      icon: BarChart3,
      title: "Corporate Accountability",
      description: "Public-facing ratings system driving transparency",
    },
    {
      icon: Target,
      title: "Dynamic Compensation",
      description:
        "Algorithm-based fair settlement suggestions using benchmarks",
    },
    {
      icon: Eye,
      title: "Real-Time Tracking",
      description:
        "Complete visibility into complaint journey and resolution metrics",
    },
    {
      icon: Shield,
      title: "Evidence Management",
      description:
        "Secure document handling with blockchain-verified timestamps",
    },
    {
      icon: Users,
      title: "Expert Escalation",
      description:
        "Intelligent workflows that automatically escalate based on patterns",
    },
  ];

  const revolutionaryFeatures = [
    { icon: Eye, title: "Real-Time Tracking" },
    { icon: TrendingUp, title: "Smart Escalation" },
    { icon: Shield, title: "Secure Evidence" },
    { icon: Users, title: "Corporate Access" },
    { icon: Brain, title: "AI Optimization" },
    { icon: BarChart3, title: "Accountability Scoring" },
    { icon: Target, title: "Dynamic Compensation" },
    { icon: Database, title: "Premium Contacts" },
  ];

  const whyChooseDigital = [
    {
      icon: Clock,
      title: "Instant Filing",
      description:
        "File complaints 24/7 without waiting in queues or phone holds",
    },
    {
      icon: Target,
      title: "Higher Success Rate",
      description:
        "AI-optimized complaints with legal backing increase resolution chances",
    },
    {
      icon: BarChart3,
      title: "Complete Transparency",
      description: "Track every step of your complaint with real-time updates",
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "No lawyer fees, court costs, or time off work required",
    },
  ];

  const pressMentions = [
    {
      outlet: "ZeeNews",
      title: "The Small Town Entrepreneur Behind Online Legal India's Success",
      logo: "ZN",
    },
    {
      outlet: "TEDx",
      title: "From Rs. 2000 Salary to Multi-Crore Turnover Company",
      logo: "TX",
    },
    {
      outlet: "Forbes India",
      title: "Featured in Forbes India Magazine Showstoppers 2022-23",
      logo: "FI",
    },
    {
      outlet: "Asia One",
      title: "Movie-like Success Story of Legal Tech Innovation",
      logo: "A1",
    },
  ];

  const complaintCategories = [
    { icon: Plane, title: "Airlines", color: "text-blue-400" },
    { icon: CreditCard, title: "Banking", color: "text-green-400" },
    { icon: ShoppingCart, title: "E-commerce", color: "text-purple-400" },
    { icon: Smartphone, title: "Telecom", color: "text-red-400" },
    { icon: Building, title: "Insurance", color: "text-yellow-400" },
    { icon: Home, title: "Real Estate", color: "text-pink-400" },
    { icon: Stethoscope, title: "Healthcare", color: "text-cyan-400" },
    { icon: Briefcase, title: "Services", color: "text-orange-400" },
  ];

  const workProcess = [
    {
      step: "01",
      title: "AI Analysis",
      description:
        "Our AI analyzes your issue and drafts an optimized complaint",
    },
    {
      step: "02",
      title: "Multi-Channel Delivery",
      description:
        "Complaint sent via email, social media, and executive contacts",
    },
    {
      step: "03",
      title: "Real-Time Tracking",
      description:
        "Monitor response times and escalation triggers automatically",
    },
    {
      step: "04",
      title: "Resolution & Follow-up",
      description: "Get your resolution with full accountability tracking",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-scroll effect for problem stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % (problemStats.length * 2)); // Double length for infinite scroll
    }, 4000);
    return () => clearInterval(interval);
  }, [problemStats.length]);

  // Auto-scroll effect for pain points
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPainIndex((prev) => (prev + 1) % (painPoints.length * 2)); // Double length for infinite scroll
    }, 3500);
    return () => clearInterval(interval);
  }, [painPoints.length]);

  // Auto-scroll effect for core features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % (coreFeatures.length * 2)); // Double length for infinite scroll
    }, 4500);
    return () => clearInterval(interval);
  }, [coreFeatures.length]);

  // Auto-scroll effect for why choose digital
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDigitalIndex(
        (prev) => (prev + 1) % (whyChooseDigital.length * 2)
      ); // Double length for infinite scroll
    }, 5000);
    return () => clearInterval(interval);
  }, [whyChooseDigital.length]);

  // Auto-scroll effect for press mentions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPressIndex((prev) => (prev + 1) % (pressMentions.length * 2)); // Double length for infinite scroll
    }, 6000); // 6 seconds to give time to read the press mentions
    return () => clearInterval(interval);
  }, [pressMentions.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Dynamic background */}

      {/* {pathname === "/" && (
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
      )} */}

      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        {/* Mobile-First Header */}
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-white">Niptado</span>
              </div>

              <div className="flex items-center space-x-3">
                {/* Mobile Sign In Button */}
                <button className="md:hidden bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300">
                  Sign In
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-white p-2"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="#how-it-works"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  How It Works
                </a>
                <a
                  href="#company-directory"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Company Directory
                </a>
                <a
                  href="#premium"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Premium
                </a>
                <a
                  href="#reviews"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Reviews
                </a>
                {/* <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
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

                  <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    <Link
                      href="/signUpPage"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                  </button>
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
              </nav>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
                <nav className="flex flex-col space-y-4">
                  <a
                    href="#how-it-works"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                  <a
                    href="#company-directory"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Company Directory
                  </a>
                  <a
                    href="#premium"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Premium
                  </a>
                  <a
                    href="#reviews"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Reviews
                  </a>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section - Mobile First */}
        <section className="px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-full px-3 py-1 mb-6 text-red-300 text-xs md:text-sm">
                <Zap className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                AI-Powered Consumer Advocacy
              </div>

              <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Indian's Waste
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  15 Billion Hours
                </span>
                <br className="md:hidden" />
                <span className="block md:inline">
                  {" "}
                  a Year on Consumer Complaints
                </span>
              </h1>

              <p className="text-base md:text-xl text-white/80 mb-8 leading-relaxed px-2">
                Our AI platform gets you a resolution, fast.
              </p>

              {/* Mobile-First CTA Buttons */}
              <div className="flex justify-center items-center mb-12">
                {user ? (
                  <button
                    className="group bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center whitespace-nowrap"
                    onClick={() => router.push("/dashboard/FileComplaint")}
                  >
                    File Your First Complaint
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <Link
                    href="/signUpPage"
                    //  className="group bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center"
                  >
                    <button className="group bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center whitespace-nowrap">
                      File AI-Powered Complaint
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section - Mobile Optimized */}
        <section className="px-4 py-12 md:py-20 bg-red-500/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                India's Consumer Complaint System is
                <span className="text-red-400"> Fundamentally Broken</span>
              </h2>
              <p className="text-white/80 text-sm md:text-base px-2">
                Research shows the devastating impact on 1.4 billion Indian
                consumers
              </p>
            </div>

            {/* Problem Stats - Auto-Scrolling with Infinite Loop */}
            <div className="relative overflow-hidden mb-8 md:mb-12">
              <div
                className="flex space-x-4 md:space-x-6 transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentStatIndex % problemStats.length) * (300 + 16)
                  }px)`,
                  width: `${problemStats.length * 2 * (300 + 16)}px`,
                }}
              >
                {[...problemStats, ...problemStats].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 text-center min-w-[280px] md:min-w-[300px] flex-shrink-0"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-red-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white font-medium text-sm md:text-base mb-1">
                      {stat.label}
                    </div>
                    <div className="text-white/60 text-xs md:text-sm">
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {problemStats.slice(0, 6).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === (currentStatIndex % problemStats.length) % 6
                        ? "bg-red-400"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pain Points - Auto-Scrolling with Infinite Loop */}
            <div className="relative overflow-hidden">
              <div
                className="flex space-x-4 transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentPainIndex % painPoints.length) * (320 + 16)
                  }px)`,
                  width: `${painPoints.length * 2 * (320 + 16)}px`,
                }}
              >
                {[...painPoints, ...painPoints].map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[300px] md:min-w-[320px] flex-shrink-0"
                  >
                    <point.icon className="w-5 h-5 md:w-6 md:h-6 text-red-400 flex-shrink-0" />
                    <span className="text-white text-sm md:text-base">
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {painPoints.slice(0, 8).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === (currentPainIndex % painPoints.length) % 8
                        ? "bg-red-400"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Niptado:
                <span className="text-green-400">
                  {" "}
                  AI-Powered Consumer Advocacy
                </span>
              </h2>
              <p className="text-white/80 text-sm md:text-lg max-w-3xl mx-auto px-2">
                A comprehensive ecosystem that transforms how consumers file,
                track, and resolve complaints while holding corporations
                accountable through transparency.
              </p>
            </div>

            {/* Core Features - Auto-Scrolling with Infinite Loop */}
            <div className="relative overflow-hidden mb-8 md:mb-12">
              <div
                className="flex space-x-4 md:space-x-6 transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentFeatureIndex % coreFeatures.length) * (300 + 16)
                  }px)`,
                  width: `${coreFeatures.length * 2 * (300 + 16)}px`,
                }}
              >
                {[...coreFeatures, ...coreFeatures].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300 min-w-[280px] md:min-w-[300px] flex-shrink-0"
                  >
                    <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-green-400 mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {coreFeatures.slice(0, 6).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === (currentFeatureIndex % coreFeatures.length) % 6
                        ? "bg-green-400"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Revolutionary Features */}
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center">
                Revolutionary Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {revolutionaryFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
                    <span className="text-white/90 text-sm md:text-base font-medium text-center leading-tight">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Digital Complaints */}
        <section className="px-4 py-12 md:py-20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Why Choose
                <span className="text-blue-400"> Digital Complaints?</span>
              </h2>
              <p className="text-white/80 text-sm md:text-lg max-w-3xl mx-auto px-2">
                Transform the traditional complaint process with modern
                technology and AI-powered solutions.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex space-x-4 md:space-x-6 transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentDigitalIndex % whyChooseDigital.length) * (320 + 16)
                  }px)`,
                  width: `${whyChooseDigital.length * 2 * (320 + 16)}px`,
                }}
              >
                {[...whyChooseDigital, ...whyChooseDigital].map(
                  (benefit, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 text-center min-w-[300px] md:min-w-[320px] flex-shrink-0"
                    >
                      <benefit.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-blue-400" />
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {whyChooseDigital.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentDigitalIndex % whyChooseDigital.length
                        ? "bg-blue-400"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Press Mentions */}
        <section className="px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Featured In
                <span className="text-purple-400"> Leading Media</span>
              </h2>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex space-x-4 md:space-x-6 transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentPressIndex % pressMentions.length) * (340 + 16)
                  }px)`,
                  width: `${pressMentions.length * 2 * (340 + 16)}px`,
                }}
              >
                {[...pressMentions, ...pressMentions].map((mention, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 min-w-[320px] md:min-w-[340px] flex-shrink-0 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">
                          {mention.logo}
                        </span>
                      </div>
                      <div className="text-purple-400 font-bold text-lg">
                        {mention.outlet}
                      </div>
                    </div>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      {mention.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {pressMentions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPressIndex % pressMentions.length
                        ? "bg-purple-400"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Complaint Categories */}
        <section className="px-4 py-12 md:py-20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Complaint
                <span className="text-green-400"> Categories</span>
              </h2>
              <p className="text-white/80 text-sm md:text-lg max-w-3xl mx-auto px-2">
                We handle complaints across all major industries with
                specialized expertise.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
              {complaintCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <category.icon
                    className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 ${category.color}`}
                  />
                  <h3 className="text-white font-medium text-sm md:text-base">
                    {category.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section id="how-it-works" className="px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                How We
                <span className="text-red-400"> Work</span>
              </h2>
              <p className="text-white/80 text-sm md:text-lg max-w-3xl mx-auto px-2">
                Our streamlined process ensures your complaint gets the
                attention it deserves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {workProcess.map((process, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-md border border-red-500/20 rounded-xl p-6 text-center hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 mt-2">
                    {process.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {process.description}
                  </p>

                  {/* Connection Line (except for last item) */}
                  {index < workProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-red-500/50 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Mobile Optimized */}
        <section className="px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Complaints into Results?
              </h2>
              <p className="text-white/80 text-sm md:text-lg mb-6 md:mb-8 px-2">
                Join the revolution in consumer advocacy. Let AI draft your
                complaint, deliver it through premium channels, and track
                resolution until corporations are held accountable.
              </p>

              {user ? (
                <button
                  className="w-full md:w-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 md:px-10 py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center mb-6"
                  onClick={() => router.push("/dashboard/FileComplaint")}
                >
                  Start AI-Powered Complaint
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <Link
                  href="/signUpPage"
                //  className="group bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center"
                >
                  <button className="w-full md:w-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 md:px-10 py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center mb-6">
                    Start AI-Powered Complaint
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </Link>
              )}

              <div className="overflow-x-auto">
                <div className="flex space-x-6 pb-4 min-w-max md:justify-center text-white/60 text-xs md:text-sm">
                  <div className="flex items-center min-w-[200px] flex-shrink-0">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    AI-optimized legal drafting
                  </div>
                  <div className="flex items-center min-w-[200px] flex-shrink-0">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Premium executive contacts
                  </div>
                  <div className="flex items-center min-w-[220px] flex-shrink-0">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Corporate accountability tracking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Footer - Mobile Optimized */}
        <footer className="bg-slate-900/80 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-8 md:py-16">
            <div className="max-w-7xl mx-auto">
              {/* Company Info - Mobile First */}
              <div className="text-center md:text-left mb-8 md:mb-12">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="text-xl font-bold text-white">Niptado</span>
                </div>
                <p className="text-white/70 text-sm md:text-base max-w-md mx-auto md:mx-0 mb-4">
                  AI-powered consumer advocacy platform transforming complaints
                  into corporate accountability.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <Facebook className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                  <Youtube className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Footer Links - Horizontal Scroll */}
              <div className="overflow-x-auto mb-8">
                <div className="flex space-x-8 pb-4 min-w-max md:justify-center">
                  {/* Services */}
                  <div className="min-w-[200px] flex-shrink-0">
                    <h3 className="text-white font-semibold text-base mb-4">
                      Services
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          How It Works
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Company Directory
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Reviews and Testimonials
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Premium
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Enterprise
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div className="min-w-[200px] flex-shrink-0">
                    <h3 className="text-white font-semibold text-base mb-4">
                      Resources
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Consumer Right Guide
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Platform Updates
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Compliance
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Accessibility
                        </a>
                      </li>
                      <li>
                        <a
                           href="/about-us"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          About Us
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Legal */}
                  <div className="min-w-[200px] flex-shrink-0">
                    <h3 className="text-white font-semibold text-base mb-4">
                      Legal
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="/privacy-policy"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Terms of Service
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Disclaimers
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          Cookies
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="min-w-[200px] flex-shrink-0">
                    <h3 className="text-white font-semibold text-base mb-4">
                      Contact
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="text-white/70 text-sm">
                          Building India's first AI-powered consumer advocacy
                          platform
                        </span>
                      </li>
                      <li>
                        <a
                          href="mailto:hello@niptado.com"
                          className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                          hello@niptado.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 text-center">
                <p className="text-white/60 text-xs md:text-sm">
                  © 2025 Niptado. All rights reserved. | Transforming consumer
                  complaints into corporate accountability through AI.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NiptadoHomepage;

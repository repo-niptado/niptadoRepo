"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Star,
  CheckCircle,
  Zap,
  Users,
  DollarSign,
  FileText,
  Chrome,
  Facebook,
  Github,
  Apple,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUpPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const socialLogins = [
    { icon: Chrome, name: "Google", color: "from-red-500 to-orange-500" },
    { icon: Facebook, name: "Facebook", color: "from-blue-600 to-blue-700" },
    { icon: Apple, name: "Apple", color: "from-gray-800 to-black" },
    { icon: Github, name: "GitHub", color: "from-gray-700 to-gray-900" },
  ];

  const features = [
    {
      icon: FileText,
      title: "50K+ Complaints Filed",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: DollarSign,
      title: "$2.4M+ Money Recovered",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "89% Success Rate",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Star,
      title: "4.9/5 User Rating",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/login",
        formData,
        { withCredentials: true }
      );

      setUser({
        user_id: res.data.user_id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        profileImage: res.data.profileImage || null,
      });

      router.push("/dashboard");
    } catch (err: any) {
  console.error("Login failed:", err);
  if (err.response) {
    console.error("Response data:", err.response.data);
    console.error("Response status:", err.response.status);
  }
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
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
          <div className="flex items-center space-x-4">
            <button
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <button
                type="button"
                className="text-2xl font-bold text-white tracking-tight hover:underline focus:outline-none"
                onClick={() => router.push("/")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                  textDecoration: "none",
                  marginLeft: "0.5rem",
                }}
              >
                Niptado
              </button>
            </div>
          </div>
          <div className="text-white/60 text-sm">
            Don't have an account?{" "}
            <span className="text-red-400 cursor-pointer hover:underline">
              <Link
                href="/signInPage"
                // className="text-white/80 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Sign In Form */}
            <div
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-auto lg:max-w-none">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-2xl">N</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-3">
                    Welcome Back
                  </h1>
                  <p className="text-white/70 text-lg">
                    Sign in to continue your consumer advocacy journey
                  </p>
                </div>

                {/* Sign In Form */}
                <form className="space-y-4" onSubmit={handleSignIn}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-3">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-3">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 bg-white/20 border border-white/30 rounded peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 peer-checked:border-red-500/50 transition-all duration-300 flex items-center justify-center">
                          {formData.rememberMe && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="ml-3 text-white/80 text-sm">
                          Remember me
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <Zap className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="my-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white/60">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  {socialLogins.slice(0, 2).map((social, index) => (
                    <button
                      key={index}
                      onClick={() => signIn(social.name.toLowerCase())}
                      className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="font-medium">{social.name}</span>
                    </button>
                  ))}
                </div>

                {/* Security Note */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="text-blue-300 font-medium text-sm mb-1">
                        Secure Login
                      </h3>
                      <p className="text-blue-200/80 text-xs leading-relaxed">
                        Your login is protected with bank-level encryption and
                        multi-factor authentication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Features & Benefits */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Get Your Voice
                  <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                    {" "}
                    Heard
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                  Join thousands of consumers who've successfully resolved their
                  complaints and recovered their money with our AI-powered
                  platform.
                </p>

                {/* Feature Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-sm">
                        {feature.title}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center space-x-1 mb-4 justify-center lg:justify-start">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 italic mb-4">
                    "Niptado helped me get a full refund from my airline in just
                    3 days. The AI-powered complaint was professional and
                    effective. Highly recommended!"
                  </p>
                  <div className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium text-sm">Sarah M.</p>
                      <p className="text-white/60 text-xs">Recovered $1,250</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center lg:text-left">
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white/90">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Free to start, results guaranteed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");
        * {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;

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
  User,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    agreeToTerms: false,
    marketingEmails: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Check password strength
    if (field === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (
      password.length < 10 &&
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    ) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  // Simulate email login
  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms & Privacy Policy");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // On success, redirect to dashboard
      router.push("/Dashboard");
    }, 2000);
  };

  // Simulate Google login
  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
  await signIn(provider, {
    callbackUrl: "/", // or "/dashboard" if you have it
  });
    setTimeout(() => {
      setIsLoading(false);
      // On success, redirect to dashboard
      router.push("/Dashboard");
    }, 1500);
  };

  const socialLogins = [
    {
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      name: "Google",
      bgColor: "bg-white hover:bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-200 hover:border-gray-300",
    },
  ];

  const benefits = [
    {
      icon: FileText,
      title: "AI-Powered Complaints",
      description: "Professional letters that get results",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Executive Access",
      description: "Reach decision-makers directly",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: DollarSign,
      title: "Money Recovery",
      description: "Get compensation you deserve",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Globe,
      title: "Real-Time Tracking",
      description: "Monitor progress live",
      color: "from-red-500 to-red-600",
    },
  ];

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPasswordStrengthWidth = () => {
    switch (passwordStrength) {
      case "weak":
        return "w-1/3";
      case "medium":
        return "w-2/3";
      case "strong":
        return "w-full";
      default:
        return "w-0";
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
            Already have an account?{" "}
            <span className="text-red-400 cursor-pointer hover:underline">
              <Link
                href="/signUpPage"
                // className="text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Sign Up Form */}
            <div
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-auto lg:max-w-none">
                {/* ...welcome section... */}

                {/* Social Login Section */}
                <div className="mb-8">
                  <div className="space-y-3">
                    {socialLogins.map((social, index) => (
                      <button
                        key={index}
                        onClick={() => handleSocialLogin(social.name)}
                        className={`w-full ${social.bgColor} ${social.textColor} py-3.5 rounded-xl font-medium text-base transition-all duration-300 shadow-lg flex items-center justify-center border ${social.borderColor} group hover:shadow-xl hover:scale-[1.02] transform`}
                        disabled={isLoading}
                      >
                        <div className="flex items-center">
                          {React.createElement(social.icon, {
                            className: "w-5 h-5 mr-3",
                          })}
                          <span>Continue with {social.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* ...divider... */}
                </div>

                {/* ...Sign In / Sign Up Toggle... */}

                {/* Sign Up Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
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
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                        placeholder="Create a strong password"
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
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/60 text-xs">
                            Password strength
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              passwordStrength === "weak"
                                ? "text-red-400"
                                : passwordStrength === "medium"
                                ? "text-yellow-400"
                                : passwordStrength === "strong"
                                ? "text-green-400"
                                : "text-white/60"
                            }`}
                          >
                            {passwordStrength.charAt(0).toUpperCase() +
                              passwordStrength.slice(1)}
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()} ${getPasswordStrengthWidth()}`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                        placeholder="Enter your city or country"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) =>
                          handleInputChange("agreeToTerms", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 bg-white/20 border border-white/30 rounded peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 peer-checked:border-red-500/50 transition-all duration-300 flex items-center justify-center mt-0.5">
                        {formData.agreeToTerms && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="ml-3 text-white/80 text-sm leading-relaxed">
                        I agree to the{" "}
                        <span className="text-red-400 hover:underline cursor-pointer">
                          Terms & Privacy Policy
                        </span>
                      </span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.marketingEmails}
                        onChange={(e) =>
                          handleInputChange("marketingEmails", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 bg-white/20 border border-white/30 rounded peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 peer-checked:border-red-500/50 transition-all duration-300 flex items-center justify-center mt-0.5">
                        {formData.marketingEmails && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="ml-3 text-white/80 text-sm leading-relaxed">
                        Send me updates about new features and success stories
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.agreeToTerms}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                        Creating account...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <Zap className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Security Note */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="text-blue-300 font-medium text-sm mb-1">
                        Secure & Private
                      </h3>
                      <p className="text-blue-200/80 text-xs leading-relaxed">
                        Your data is encrypted and protected. We never share
                        your information with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Benefits & Social Proof */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Your Voice
                  <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                    {" "}
                    Matters
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                  Join thousands of consumers who are taking control and getting
                  the resolution they deserve. No more being ignored by
                  companies.
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Success Stats */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
                  <h3 className="text-white font-bold text-xl mb-6 text-center lg:text-left">
                    By the Numbers
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        50K+
                      </div>
                      <p className="text-white/60 text-sm">Complaints Filed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        $2.4M
                      </div>
                      <p className="text-white/60 text-sm">Money Recovered</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">
                        89%
                      </div>
                      <p className="text-white/60 text-sm">Success Rate</p>
                    </div>
                  </div>
                </div>

                {/* Featured Testimonial */}
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center space-x-1 mb-4 justify-center lg:justify-start">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 italic mb-4 text-lg">
                    "I was skeptical at first, but Niptado helped me recover
                    $3,700 from my insurance company. The AI-powered complaint
                    was incredibly professional and effective."
                  </p>
                  <div className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Michael T.</p>
                      <p className="text-white/60 text-sm">
                        Insurance Claim • Recovered $3,700
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 text-center lg:text-left">
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white/90">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Free to start • No credit card required
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

export default SignInPage;

"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Users,
  Target,
  Shield,
  Zap,
  TrendingUp,
  Award,
  Heart,
  Brain,
  MessageSquare,
  DollarSign,
  Star,
  CheckCircle,
  Globe,
  Eye,
  Rocket
} from "lucide-react";

// ---------------- Types ----------------
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

// ---------------- Component ----------------
const AboutUsPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    // Auto-advance timeline
    const timelineInterval = setInterval(() => {
      setActiveTimelineItem((prev) => (prev + 1) % timelineData.length);
    }, 4000);

    return () => clearInterval(timelineInterval);
  }, []);

  const companyStats = [
    { icon: MessageSquare, value: "50K+", label: "Complaints Filed", color: "from-blue-500 to-blue-600" },
    { icon: DollarSign, value: "$2.4M", label: "Money Recovered", color: "from-green-500 to-green-600" },
    { icon: Shield, value: "89%", label: "Success Rate", color: "from-purple-500 to-purple-600" },
    { icon: Star, value: "4.9/5", label: "User Rating", color: "from-yellow-500 to-yellow-600" },
    { icon: Users, value: "100+", label: "Companies Tracked", color: "from-red-500 to-red-600" },
    { icon: Globe, value: "25+", label: "Countries Served", color: "from-indigo-500 to-indigo-600" },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former consumer rights attorney with 15+ years fighting for fair treatment. Harvard Law graduate.",
      image: "SC",
      expertise: ["Consumer Law", "AI Strategy", "Leadership"],
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer specializing in NLP and ML. Built the AI engine that powers our complaint platform.",
      image: "MR",
      expertise: ["AI/ML", "Natural Language Processing", "System Architecture"],
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "PhD in Computer Science from MIT. Published researcher in automated text generation and sentiment analysis.",
      image: "EW",
      expertise: ["Machine Learning", "Research", "Text Generation"],
    },
    {
      name: "David Kim",
      role: "Head of Customer Success",
      bio: "Former customer service director at Fortune 500 companies. Understands corporate complaint resolution.",
      image: "DK",
      expertise: ["Customer Experience", "Business Relations", "Process Optimization"],
    },
    {
      name: "Lisa Thompson",
      role: "Head of Legal Affairs",
      bio: "Regulatory compliance expert ensuring our platform meets all consumer protection standards.",
      image: "LT",
      expertise: ["Regulatory Compliance", "Consumer Protection", "Legal Strategy"],
    },
    {
      name: "James Park",
      role: "Head of Product",
      bio: "Product strategist focused on creating intuitive experiences for complex complaint processes.",
      image: "JP",
      expertise: ["Product Strategy", "UX Design", "User Research"],
    },
  ];

  const coreValues = [
    { icon: Heart, title: "Consumer First", description: "Every decision we make prioritizes the consumer's right to fair treatment and resolution." },
    { icon: Brain, title: "AI-Powered Excellence", description: "We leverage cutting-edge AI to level the playing field between consumers and corporations." },
    { icon: Shield, title: "Trust & Transparency", description: "Complete transparency in our process, pricing, and results. Your trust is our foundation." },
    { icon: Zap, title: "Rapid Innovation", description: "Continuously evolving our platform to stay ahead of corporate tactics and regulations." },
    { icon: Target, title: "Results-Driven", description: "Success is measured by your satisfaction and the resolution of your complaints." },
    { icon: Globe, title: "Global Impact", description: "Building a worldwide movement of empowered consumers who demand better service." },
  ];

  const timelineData = [
    { year: "2022", title: "Company Founded", description: "Sarah and Marcus launch Niptado with a vision to democratize complaint resolution using AI.", icon: Rocket, stats: "First 100 complaints filed" },
    { year: "2023", title: "AI Engine Launch", description: "Deployed our proprietary AI system capable of generating highly effective, personalized complaints.", icon: Brain, stats: "10,000+ complaints processed" },
    { year: "2024", title: "Major Milestone", description: "Reached $1M in money recovered for consumers and expanded to serve 15 countries.", icon: Award, stats: "$1M+ recovered, 15 countries" },
    { year: "2025", title: "Platform Revolution", description: "Launched advanced contact discovery and real-time tracking features with 89% success rate.", icon: TrendingUp, stats: "$2.4M+ recovered, 50K+ users" },
  ];

  const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => (
    <div
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 opacity-0 animate-fade-in-up`}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
    >
      <div className="text-center mb-4">
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white font-bold text-xl">{member.image}</span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
        <p className="text-red-300 font-medium text-sm mb-3">{member.role}</p>
      </div>

      <p className="text-white/80 text-sm mb-4 text-center leading-relaxed">{member.bio}</p>

      <div className="flex flex-wrap gap-2 justify-center">
        {member.expertise.map((skill: string, skillIndex: number) => (
          <span
            key={skillIndex}
            className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs border border-white/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

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
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Niptado</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              About
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {' '}Niptado
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              We're democratizing consumer advocacy through AI-powered complaint resolution, 
              helping everyday consumers get the fair treatment they deserve from corporations.
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white/90">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Empowering 50,000+ consumers worldwide
            </div>
          </div>

          {/* Mission Statement */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-white/90 text-lg leading-relaxed mb-6">
                    Every day, millions of consumers face unfair treatment from corporations—hidden fees, 
                    poor service, broken promises. The traditional complaint process is designed to exhaust you, 
                    not help you.
                  </p>
                  <p className="text-white/90 text-lg leading-relaxed">
                    We believe every consumer deserves a voice that's heard. Our AI-powered platform levels 
                    the playing field, giving you the tools and expertise that were once only available to 
                    large law firms and corporate advocacy groups.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-xl mb-4">Our Vision</h3>
                  <p className="text-white/80 leading-relaxed">
                    A world where every consumer complaint gets the attention it deserves, 
                    where corporations are held accountable, and where fair treatment isn't 
                    a luxury—it's the standard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Statistics */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Impact by Numbers</h2>
              <p className="text-white/70 text-lg">Real results for real people</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {companyStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 shadow-xl"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className={`mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-white/70 text-lg">The principles that guide everything we do</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {coreValues.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Timeline */}
          <div className={`mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
              <p className="text-white/70 text-lg">Key milestones in building the future of consumer advocacy</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {timelineData.map((item, index) => (
                  <div 
                    key={index}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      activeTimelineItem === index ? 'transform scale-105' : ''
                    }`}
                    onClick={() => setActiveTimelineItem(index)}
                  >
                    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      activeTimelineItem === index 
                        ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/50' 
                        : 'bg-white/5 border-white/20 hover:border-white/40'
                    }`}>
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                          activeTimelineItem === index 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                            : 'bg-white/20'
                        }`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`text-lg font-bold mb-2 transition-all duration-300 ${
                          activeTimelineItem === index ? 'text-red-300' : 'text-white/80'
                        }`}>
                          {item.year}
                        </div>
                        <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                        <p className="text-white/70 text-sm mb-3">{item.description}</p>
                        <div className="text-red-300 text-xs font-medium">{item.stats}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meet Our Team */}
          <div className={`mb-16 transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
              <p className="text-white/70 text-lg">The experts fighting for your consumer rights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <TeamCard key={index} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center transition-all duration-1000 delay-1300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get the Resolution You Deserve?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of consumers who've successfully resolved their complaints and recovered their money with Niptado's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  Start Your Complaint Now
                  <Target className="ml-2 w-5 h-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                  Learn How It Works
                </button>
              </div>
              <div className="flex items-center justify-center mt-6 space-x-6 text-white/60 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  No upfront costs
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  89% success rate
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Money-back guarantee
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;


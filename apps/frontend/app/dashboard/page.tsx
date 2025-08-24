"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Bell,
  User,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  ExternalLink,
  Award,
  Newspaper,
  Target,
  Star,
  Shield,
  MessageSquare,
  Calendar,
  Filter,
  Eye,
  MoreVertical,
} from "lucide-react";
import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const PrimaryDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [notificationCount, setNotificationCount] = useState(3);

  const { user, loading } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const resolved = complaints.filter(
    (c: any) => c.status === "Resolved"
  ).length;
  const pending = complaints.filter((c: any) => c.status === "Pending").length;
  const recoveredAmount = complaints.reduce(
    (sum: number, c: any) => sum + (c.compensation_amount || 0),
    0
  );

  useEffect(() => {
    setIsLoaded(true);

    const fetchComplaints = async () => {
      const session = await getSession();
      const token = (session?.user as any)?.backendToken;
      try {
        const res = await axios.get("http://localhost:3001/api/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    if (!loading && user) {
      fetchComplaints();
    }
  }, [loading, user]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock user data - would come from API
  const userStats = {
    totalComplaints: 12,
    resolvedComplaints: 8,
    moneyRecovered: 15750,
    averageResolutionTime: "4.2 days",
    successRate: 67,
  };

  // const complaints = [
  //   {
  //     id: 1,
  //     company: 'Comcast',
  //     title: 'Billing Error & Service Disruption',
  //     status: 'In Progress',
  //     amount: 2500,
  //     submittedDate: '2025-07-15',
  //     lastUpdate: '2 hours ago',
  //     progress: 75,
  //     emailsSent: 7,
  //     responses: 2,
  //     nextAction: 'Awaiting executive response',
  //     details: {
  //       description: 'Overcharged for services not received, internet outage for 5 days',
  //       contacts: ['Customer Service', 'Regional Manager', 'Billing Dept'],
  //       timeline: [
  //         { date: '2025-07-15', action: 'Complaint submitted', status: 'completed' },
  //         { date: '2025-07-16', action: 'Emails sent to 7 contacts', status: 'completed' },
  //         { date: '2025-07-17', action: 'First response received', status: 'completed' },
  //         { date: '2025-07-18', action: 'Escalation to management', status: 'active' }
  //       ]
  //     }
  //   },
  //   {
  //     id: 2,
  //     company: 'Wells Fargo',
  //     title: 'Unauthorized Account Fees',
  //     status: 'Resolved',
  //     amount: 450,
  //     submittedDate: '2025-07-10',
  //     lastUpdate: '3 days ago',
  //     progress: 100,
  //     emailsSent: 5,
  //     responses: 3,
  //     nextAction: 'Case closed - $450 refunded',
  //     details: {
  //       description: 'Multiple unauthorized overdraft fees charged incorrectly',
  //       contacts: ['Customer Service', 'Branch Manager', 'Compliance'],
  //       timeline: [
  //         { date: '2025-07-10', action: 'Complaint submitted', status: 'completed' },
  //         { date: '2025-07-11', action: 'Response from branch manager', status: 'completed' },
  //         { date: '2025-07-12', action: 'Fees reversed and refunded', status: 'completed' }
  //       ]
  //     }
  //   },
  //   {
  //     id: 3,
  //     company: 'United Airlines',
  //     title: 'Flight Cancellation Compensation',
  //     status: 'Pending',
  //     amount: 1200,
  //     submittedDate: '2025-07-18',
  //     lastUpdate: '6 hours ago',
  //     progress: 25,
  //     emailsSent: 4,
  //     responses: 0,
  //     nextAction: 'Initial emails sent, monitoring responses',
  //     details: {
  //       description: 'Flight cancelled with no rebooking assistance, missed connection',
  //       contacts: ['Customer Relations', 'Operations Manager'],
  //       timeline: [
  //         { date: '2025-07-18', action: 'Complaint submitted', status: 'completed' },
  //         { date: '2025-07-18', action: 'Emails sent to contacts', status: 'active' }
  //       ]
  //     }
  //   }
  // ];

  const recentActivity = [
    {
      id: 1,
      type: "response",
      message: "Comcast executive responded to your complaint",
      time: "2 hours ago",
      company: "Comcast",
    },
    {
      id: 2,
      type: "update",
      message: "Wells Fargo case marked as resolved - $450 refunded",
      time: "3 days ago",
      company: "Wells Fargo",
    },
    {
      id: 3,
      type: "sent",
      message: "Complaint sent to United Airlines management",
      time: "6 hours ago",
      company: "United Airlines",
    },
    {
      id: 4,
      type: "milestone",
      message: "You've recovered over $15,000 total!",
      time: "1 week ago",
      company: null,
    },
  ];

  const bestCompanies = [
    { name: "Amazon", rating: 4.8, responseTime: "1.2 days", logo: "A" },
    { name: "Apple", rating: 4.7, responseTime: "1.5 days", logo: "A" },
    { name: "Netflix", rating: 4.5, responseTime: "2.1 days", logo: "N" },
    { name: "Google", rating: 4.4, responseTime: "2.3 days", logo: "G" },
  ];

  const complaintsNews = [
    {
      title: "New Consumer Protection Laws Take Effect",
      summary: "Enhanced rights for digital service complaints now in force...",
      time: "2 hours ago",
      category: "Regulatory",
    },
    {
      title: "Major Telecom Company Settles Class Action for $50M",
      summary:
        "Settlement includes automatic refunds for affected customers...",
      time: "1 day ago",
      category: "Settlement",
    },
    {
      title: "AI-Powered Complaint Resolution Shows 300% Success Rate Increase",
      summary: "Study shows AI-crafted complaints get faster responses...",
      time: "3 days ago",
      category: "Industry",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "from-green-500 to-green-600";
      case "In Progress":
        return "from-blue-500 to-blue-600";
      case "Pending":
        return "from-yellow-500 to-yellow-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "response":
        return <Mail className="w-4 h-4" />;
      case "update":
        return <CheckCircle className="w-4 h-4" />;
      case "sent":
        return <Target className="w-4 h-4" />;
      case "milestone":
        return <Award className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  // Uncomment ComplaintCard component (move it above return):
const ComplaintCard = ({ complaint, expandedComplaint, setExpandedComplaint, getStatusColor }: { complaint: any, expandedComplaint: number | null, setExpandedComplaint: Function, getStatusColor: Function }) => {
  const isExpanded = expandedComplaint === complaint.complaint_id;
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:bg-white/15 transition-all duration-300">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpandedComplaint(isExpanded ? null : complaint.complaint_id)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {complaint.company?.name
                  ?.split(" ")
                  .map((w: string) => w[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">
                {complaint.company?.name}
              </h3>
              <p className="text-white/70 text-sm">{complaint.level1_subject}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(
                complaint.status
              )} text-white`}
            >
              {complaint.status}
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-white/60" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/60" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-white/60 text-xs mb-1">Disputed Value</p>
            <p className="text-white font-semibold">
              ₹{complaint.disputed_value?.toLocaleString?.() ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Created At</p>
            <p className="text-white font-semibold">
              {complaint.created_at
                ? new Date(complaint.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Status</p>
            <p className="text-white/80 text-xs">
              {complaint.status ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Resolution</p>
            <p className="text-white/80 text-xs">
              {complaint.desired_resolution ?? "-"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white/80 text-sm">
            {complaint.level1_issue_summary ?? ""}
          </p>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-white/20 p-6 bg-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Impact</h4>
              <p className="text-white/80 text-sm mb-4">
                {complaint.level1_impact}
              </p>
              <h4 className="text-white font-semibold mb-3">
                Prior Attempts
              </h4>
              <div className="space-y-2">
                <span className="text-white/80 text-sm">{complaint.level1_prior_attempts}</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Requested Action</h4>
              <div className="space-y-3">
                <span className="text-white/80 text-sm">{complaint.level1_requested_action}</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                  View Details
                </button>
                <button className="bg-white/10 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">
                  Send Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome, {user?.name || "User"}! 👋
          </h1>
          <p className="text-white/70 text-lg">
            Here's an overview of your complaint activity and latest updates.
          </p>
        </div>

        {/* Stats Overview */}
        <div
          className={`grid grid-cols-2 md:grid-cols-5 gap-6 mb-8 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {complaints.length}
            </div>
            <div className="text-white/60 text-sm">Total Complaints</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{resolved}</div>
            <div className="text-white/60 text-sm">Resolved</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              ₹{recoveredAmount.toLocaleString()}
            </div>
            <div className="text-white/60 text-sm">Recovered</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {userStats.averageResolutionTime}
            </div>
            <div className="text-white/60 text-sm">Avg Resolution</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {complaints.length > 0
                ? Math.round((resolved / complaints.length) * 100)
                : 0}
              %
            </div>
            <div className="text-white/60 text-sm">Success Rate</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Complaints */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Complaints */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Your Complaints
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-white/60" />
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:ring-2 focus:ring-red-500/50"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

<div className="space-y-4">
  {complaints
    .filter(
      (complaint: any) =>
        activeFilter === "All" ||
        complaint.status === activeFilter
    )
    .map((complaint: any) => (
      <ComplaintCard
        key={complaint.complaint_id}
        complaint={complaint}
        expandedComplaint={expandedComplaint}
        setExpandedComplaint={setExpandedComplaint}
        getStatusColor={getStatusColor}
      />
    ))}
</div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activity.type === "response"
                          ? "bg-blue-500/20 text-blue-300"
                          : activity.type === "update"
                          ? "bg-green-500/20 text-green-300"
                          : activity.type === "sent"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {/* {getActivityIcon(activity.type)} */}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 text-sm">
                        {activity.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-white/60 text-xs">{activity.time}</p>
                        {activity.company && (
                          <span className="text-white/80 text-xs font-medium">
                            {activity.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* This Week's Best Companies */}
            <div
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-600 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-yellow-400 mr-2" />
                <h3 className="text-xl font-bold text-white">
                  This Week's Best Companies
                </h3>
              </div>
              <div className="space-y-3">
                {bestCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {company.logo}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          {company.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-white/70 text-xs">
                            {company.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs">
                        {company.responseTime}
                      </p>
                      <p className="text-white/60 text-xs">avg response</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complaints News */}
            <div
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center mb-4">
                <Newspaper className="w-6 h-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-white">
                  Complaints News
                </h3>
              </div>
              <div className="space-y-4">
                {complaintsNews.map((news, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <h4 className="text-white font-medium text-sm mb-2">
                      {news.title}
                    </h4>
                    <p className="text-white/70 text-xs mb-2">{news.summary}</p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          news.category === "Regulatory"
                            ? "bg-blue-500/20 text-blue-300"
                            : news.category === "Settlement"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {news.category}
                      </span>
                      <span className="text-white/60 text-xs">{news.time}</span>
                    </div>
                  </div>
                ))}
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

export default PrimaryDashboard;

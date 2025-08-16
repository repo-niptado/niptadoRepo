'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Complaint {
  complaint_id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  current_escalation_level: number;
  escalation_status: string;
  last_escalation_triggered: string | null;
  company: {
    name: string;
  };
  category: string;
  disputed_value: number;
  level1_issue_summary?: string;
  level2_generated_email?: string;
  level3_generated_email?: string;
  level4_generated_email?: string;
  level5_generated_email?: string;
  level6_generated_email?: string;
  level6_social_summary?: string;
}

interface FollowUpModalProps {
  complaint: Complaint | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  generatedEmail: string;
  isLoading: boolean;
}

function FollowUpModal({ complaint, isOpen, onClose, onConfirm, generatedEmail, isLoading }: FollowUpModalProps) {
  if (!isOpen || !complaint) return null;

  const nextLevel = complaint.current_escalation_level + 1;
  const levelTitles: { [key: number]: string } = {
    3: 'Final Executive Escalation',
    4: 'Media Relations & PR Escalation',
    5: 'Legal Action Escalation', 
    6: 'Social Media Public Escalation'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {levelTitles[nextLevel] || `Level ${nextLevel} Escalation`}
              </h2>
              <p className="text-gray-600 mt-1">
                Complaint #{complaint.complaint_id} - {complaint.company.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Follow-up Email:
            </label>
            <textarea
              readOnly
              value={generatedEmail}
              className="w-full h-96 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
              placeholder={isLoading ? "Generating email content..." : "Email content will appear here"}
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This will escalate your complaint to Level {nextLevel} and generate 
              the appropriate escalation email. The email content above will be saved to your complaint record.
            </p>
          </div>
        </div>
        
        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedEmail);
              alert('Email content copied to clipboard!');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading || !generatedEmail}
          >
            Copy Email
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            disabled={isLoading || !generatedEmail}
          >
            {isLoading ? 'Processing...' : `Escalate to Level ${nextLevel}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function EscalationBadge({ level, status }: { level: number; status: string }) {
  const colors: { [key: number]: string } = {
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-yellow-100 text-yellow-800', 
    3: 'bg-orange-100 text-orange-800',
    4: 'bg-red-100 text-red-800',
    5: 'bg-purple-100 text-purple-800',
    6: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      colors[level] || 'bg-gray-100 text-gray-800'
    }`}>
      Level {level} - {status}
    </span>
  );
}

function ComplaintCard({ complaint, onFollowUp }: { complaint: Complaint; onFollowUp: (complaint: Complaint) => void }) {
  const canFollowUp = complaint.current_escalation_level >= 2 && complaint.current_escalation_level < 6;
  const daysSinceCreated = Math.floor(
    (new Date().getTime() - new Date(complaint.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysSinceLastEscalation = complaint.last_escalation_triggered
    ? Math.floor(
        (new Date().getTime() - new Date(complaint.last_escalation_triggered).getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            #{complaint.complaint_id} - {complaint.title || complaint.level1_issue_summary || 'Untitled'}
          </h3>
          <p className="text-gray-600">{complaint.company.name}</p>
        </div>
        <div className="text-right">
          <EscalationBadge level={complaint.current_escalation_level} status={complaint.escalation_status || 'Pending'} />
          <p className="text-sm text-gray-500 mt-1">
            Filed {daysSinceCreated} days ago
          </p>
        </div>
      </div>
      
      <div className="text-gray-700 text-sm mb-4 line-clamp-3">
        {complaint.level1_issue_summary || complaint.description}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="font-medium text-gray-600">Category:</span>
          <p>{complaint.category}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Disputed Value:</span>
          <p>${complaint.disputed_value.toLocaleString()}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Status:</span>
          <p className={`inline-flex px-2 py-1 text-xs rounded-full ${
            complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
            complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {complaint.status}
          </p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Last Escalation:</span>
          <p>{daysSinceLastEscalation ? `${daysSinceLastEscalation} days ago` : 'Never'}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {complaint.current_escalation_level === 1 && 'Waiting for automatic escalation'}
          {complaint.current_escalation_level === 6 && 'Maximum escalation level reached'}
          {complaint.current_escalation_level > 1 && complaint.current_escalation_level < 6 && 'Ready for manual follow-up'}
        </div>
        
        {canFollowUp && (
          <button
            onClick={() => onFollowUp(complaint)}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Follow Up → Level {complaint.current_escalation_level + 1}
          </button>
        )}
        
        {!canFollowUp && complaint.current_escalation_level === 1 && (
          <span className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
            Awaiting Auto-Escalation
          </span>
        )}
        
        {complaint.current_escalation_level === 6 && (
          <span className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
            Max Level Reached
          </span>
        )}
      </div>
    </div>
  );
}

export default function MyComplaintsPage() {
  const { data: session } = useSession();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/complaints/my', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowFollowUpModal(true);
    setGeneratedEmail('');
    setIsGeneratingEmail(true);

    try {
      const response = await fetch(`http://localhost:3001/api/complaints/${complaint.complaint_id}/follow-up`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate follow-up email');
      }

      const data = await response.json();
      setGeneratedEmail(data.generated_email || data.complaint?.level3_generated_email || 
                       data.complaint?.level4_generated_email || 
                       data.complaint?.level5_generated_email || 
                       data.complaint?.level6_generated_email || 
                       'Email content generated successfully');
      
      // Update the complaint in our local state
      setComplaints(complaints.map(c => 
        c.complaint_id === complaint.complaint_id 
          ? { ...c, ...data.complaint }
          : c
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate follow-up');
      setShowFollowUpModal(false);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const handleConfirmFollowUp = () => {
    setShowFollowUpModal(false);
    setNotification({
      type: 'success',
      message: `Complaint #${selectedComplaint?.complaint_id} has been escalated successfully!`
    });
    
    // Clear notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  const handleCloseModal = () => {
    setShowFollowUpModal(false);
    setSelectedComplaint(null);
    setGeneratedEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Complaints</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchComplaints}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your complaint escalations. Follow up on complaints that have progressed past Level 2.
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-md border ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? '✅' : '❌'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-gray-900">{complaints.length}</div>
            <div className="text-sm text-gray-600">Total Complaints</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-yellow-600">
              {complaints.filter(c => c.status === 'Pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-red-600">
              {complaints.filter(c => c.current_escalation_level >= 2 && c.current_escalation_level < 6).length}
            </div>
            <div className="text-sm text-gray-600">Can Follow Up</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-green-600">
              {complaints.filter(c => c.status === 'Resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
        </div>

        {/* Complaints Grid */}
        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Complaints Filed</h3>
            <p className="text-gray-600">You haven't filed any complaints yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complaints.map((complaint) => (
              <ComplaintCard 
                key={complaint.complaint_id} 
                complaint={complaint} 
                onFollowUp={handleFollowUp}
              />
            ))}
          </div>
        )}
      </div>

      {/* Follow-up Modal */}
      <FollowUpModal
        complaint={selectedComplaint}
        isOpen={showFollowUpModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmFollowUp}
        generatedEmail={generatedEmail}
        isLoading={isGeneratingEmail}
      />
    </div>
  );
}

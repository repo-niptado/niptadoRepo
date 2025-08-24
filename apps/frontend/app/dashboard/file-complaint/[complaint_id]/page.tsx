"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";

export default function ComplaintDetailPage() {
  const params = useParams();
  const complaintId = Array.isArray(params.complaint_id)
    ? params.complaint_id[0]
    : params.complaint_id;

  const [complaint, setComplaint] = useState<any>(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      const session = await getSession();
      const token = (session?.user as any)?.backendToken;
      try {
        const res = await axios.get(
          `http://localhost:3001/api/complaints/${complaintId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComplaint(res.data);
      } catch (err) {
        console.error("Error fetching complaint:", err);
      }
    };

    if (complaintId) {
      fetchComplaint();
    }
  }, [complaintId]);

  if (!complaint) return <div className="p-4">Loading complaint...</div>;

  const levels = [
    {
      level: 1,
      title: "Original Complaint",
      content: complaint.level1_issue_summary,
    },
    {
      level: 2,
      title: "Escalation Email (Level 2)",
      content: complaint.level2_generated_email,
    },
    {
      level: 3,
      title: "Escalation Email (Level 3)",
      content: complaint.level3_generated_email,
    },
    {
      level: 4,
      title: "Escalation Email (Level 4)",
      content: complaint.level4_generated_email,
    },
    {
      level: 5,
      title: "Escalation Email (Level 5)",
      content: complaint.level5_generated_email,
    },
    {
      level: 6,
      title: "Social Post Summary (Level 6)",
      content: complaint.level6_social_summary,
    },
  ];

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Complaint #{complaint.complaint_id} - {complaint.company?.name}
      </h1>

      <div className="border rounded-xl shadow p-4 bg-white">
        {levels.map(({ level, title, content }) =>
          content ? (
            <details key={level} className="mb-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">
                {title}
              </summary>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-800">
                {content}
              </div>
            </details>
          ) : null
        )}
      </div>
    </main>
  );
}

// File: /cron/escalateLevel1ToLevel2.ts

import prisma from "../prisma/client";
import axios from "axios";

async function escalateLevel1ToLevel2() {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const complaints = await prisma.complaint.findMany({
    where: {
      current_escalation_level: 1,
      escalation_status: "Waiting",
      created_at: { lte: sevenDaysAgo },
    },
    include: { user: true, company: true, documents: true },
  });

  for (const complaint of complaints) {
    const { user, company } = complaint;

    // Format incident date for display if available
    const incidentInfo = complaint.incident_date ? 
      `${new Date(complaint.incident_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}${complaint.incident_time ? ` at ${complaint.incident_time}` : ''}` : 'Not specified';

    const prompt = `
Subject: ESCALATED COMPLAINT - Ref: ${complaint.complaint_id} - Urgent Management Attention Required

Dear ${company.name} Management,

This letter serves as formal escalation of my unresolved complaint originally submitted on ${complaint.created_at.toDateString()} regarding "${complaint.level1_issue_summary || complaint.title}". Despite 7 business days passing, I have received no satisfactory response from your customer service team.

Original Complaint Details:
- Initial submission date: ${complaint.created_at.toDateString()}
- Incident date and time: ${incidentInfo}
${complaint.order_id ? `- Order/Transaction ID: ${complaint.order_id}` : ''}
- Reference number: ${complaint.complaint_id}
- Nature of complaint: ${complaint.level1_issue_summary || complaint.description}
- Impact: ${complaint.level1_impact || 'Significant inconvenience caused'}
- Previous attempts: ${complaint.level1_prior_attempts || 'Initial complaint submission'}
- Requested resolution: ${complaint.level1_requested_action || 'Prompt resolution required'}
${complaint.documents?.length ? `- Supporting evidence: ${complaint.documents.length} document(s) provided` : ''}

Reason for Escalation:
Your team has failed to respond adequately within the standard 7-day timeframe, and I am forced to escalate due to lack of resolution.

Escalated Request:
I now request enhanced compensation for the delay, poor service, and inconvenience caused by your company's failure to address this matter promptly.

Consumer Rights Notice:
As a consumer, I expect timely resolution of legitimate complaints. I am providing ${company.name} one final opportunity to resolve this before I escalate to the Ministry of Consumer Affairs, consumer forums, and media outlets.

Sincerely,  
${user.name}  
Phone: ${user.phone || "N/A"}  
Email: ${user.email}  
Date: ${new Date().toDateString()}
`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        temperature: 0.6,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
      }
    );

    const formattedEmail =
      response.data?.content?.[0]?.text || prompt;

    await prisma.complaint.update({
      where: { complaint_id: complaint.complaint_id },
      data: {
        current_escalation_level: 2,
        escalation_status: "Escalated",
        last_escalation_triggered: new Date(),
        level2_generated_email: formattedEmail,
      },
    });

    console.log(`Escalated complaint ${complaint.complaint_id} to Level 2.`);
  }
}

export default escalateLevel1ToLevel2;
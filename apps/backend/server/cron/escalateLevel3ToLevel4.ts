// /cron/escalateLevel3ToLevel4.ts

import prisma from "../prisma/client";
import axios from "axios";

async function escalateLevel3ToLevel4() {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  const complaints = await prisma.complaint.findMany({
    where: {
      current_escalation_level: 3,
      escalation_status: "Waiting",
      last_escalation_triggered: { lte: threeDaysAgo },
    },
    include: {
      user: true,
      company: true,
      documents: true,
    },
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
Subject: Consumer Alert: ${company.name} Customer Service Failure - Potential Story Opportunity

Dear Journalist/News Desk,

I am reaching out regarding a significant consumer protection issue involving ${company.name} that may be of interest to your audience.

Story Overview:
Despite multiple attempts over the last few weeks, ${company.name} has failed to address a legitimate customer complaint regarding "${complaint.level1_issue_summary || complaint.title}". This case highlights concerning patterns in corporate customer service and consumer rights.

Incident Details:
- Original incident date: ${incidentInfo}
${complaint.order_id ? `- Transaction/Order ID: ${complaint.order_id}` : ''}
- Complaint reference: ${complaint.complaint_id}
- Nature of issue: ${complaint.level1_issue_summary || complaint.description}
- Customer impact: ${complaint.level1_impact || 'Significant inconvenience and financial impact'}
${complaint.documents?.length ? `- Supporting evidence: ${complaint.documents.length} document(s) available` : ''}

Key Story Elements:
- Clear corporate responsibility for customer service failure
- Documented pattern of ignoring legitimate customer complaints
- Consumer left without recourse through normal channels
- Potential impact on other customers facing similar issues
- Timeline spanning over 3 weeks without resolution

Escalation Timeline:
- Initial complaint filed: ${new Date(complaint.created_at).toDateString()}
- Level 1 escalation: 7 days after initial filing
- Level 2 escalation: 12 days after initial filing
- Level 3 executive escalation: 15+ days after initial filing
- Current: Media escalation due to complete corporate failure

Why This Story Matters:
This case illustrates broader issues in consumer protection and the systematic lack of corporate accountability in customer service. It demonstrates how companies can completely ignore legitimate customer complaints without consequence.

Requested Resolution (Still Ignored):
${complaint.level1_requested_action || 'Fair resolution and appropriate compensation for the extended delay and poor service.'}

Documentation Available:
- Complete correspondence and complaint logs
- Evidence of customer impact and damages
- Failed response history from ${company.name}
- Timeline showing systematic neglect of customer rights
- Supporting evidence and documentation

I am available for interview and can provide all supporting documentation. This story deserves public attention to protect other consumers.

Best regards,  
${user.name}  
Email: ${user.email}  
Phone: ${user.phone || "N/A"}  
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
        current_escalation_level: 4,
        escalation_status: "Escalated",
        last_escalation_triggered: new Date(),
        level4_generated_email: formattedEmail,
      },
    });

    console.log(`Complaint ${complaint.complaint_id} escalated to Level 4.`);
  }
}

export default escalateLevel3ToLevel4;

import prisma from "../prisma/client";
import axios from "axios";

async function escalateLevel2ToLevel3() {
  const today = new Date();
  const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);

  const complaints = await prisma.complaint.findMany({
    where: {
      current_escalation_level: 2,
      escalation_status: "Waiting",
      last_escalation_triggered: { lte: fiveDaysAgo },
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
Subject: FINAL ESCALATION - Executive Intervention Required - ${complaint.level1_issue_summary || complaint.title} - External Action Pending

Dear ${company.name} Executive Team,

This communication serves as my final attempt to resolve a significant complaint through internal channels before pursuing external remedies under consumer protection laws.

Original Incident Details:
- Incident date and time: ${incidentInfo}
${complaint.order_id ? `- Order/Transaction ID: ${complaint.order_id}` : ''}
- Complaint reference: ${complaint.complaint_id}
- Issue: ${complaint.level1_issue_summary || complaint.description}
${complaint.documents?.length ? `- Supporting evidence: ${complaint.documents.length} document(s) provided` : ''}

Escalation History:
- Original complaint filed: ${complaint.created_at.toDateString()} - No adequate response
- First escalation to middle management: ${complaint.last_escalation_triggered?.toDateString() || "N/A"} - No resolution
- Total time seeking resolution: 12+ days

Failed Internal Process:
Your organization has failed to:
- Provide timely responses to legitimate customer concerns
- Offer reasonable solutions despite clear fault
- Demonstrate commitment to customer satisfaction
- Follow basic customer service standards

Customer Impact:
${complaint.level1_impact || 'This ongoing issue has caused significant inconvenience and financial impact.'}

Previous Resolution Attempts:
${complaint.level1_prior_attempts || 'Multiple attempts made through normal customer service channels.'}

Final Resolution Demand:
I request immediate executive intervention to resolve this issue, including:
${complaint.level1_requested_action || 'Immediate resolution and appropriate compensation for the extended delay.'}

Deadline for Response:
Respond within 3 business days or I will escalate externally via:
- Government regulators and consumer protection agencies
- Consumer protection groups and advocacy organizations
- Legal remedies under consumer protection laws
- Public media and social media reviews

Documentation:
I have retained complete records of this issue and your organization's inadequate handling.

I trust your executive office will resolve this matter responsibly and promptly.

Sincerely,  
${user.name}  
${user.email}  
${user.phone || "Phone N/A"}  
${new Date().toDateString()}
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

    const formattedEmail = response.data?.content?.[0]?.text || prompt;

    await prisma.complaint.update({
      where: { complaint_id: complaint.complaint_id },
      data: {
        current_escalation_level: 3,
        escalation_status: "Escalated",
        last_escalation_triggered: new Date(),
        level3_generated_email: formattedEmail,
      },
    });

    console.log(
      `✅ Escalated complaint ${complaint.complaint_id} to Level 3.`
    );
  }
}

export default escalateLevel2ToLevel3;

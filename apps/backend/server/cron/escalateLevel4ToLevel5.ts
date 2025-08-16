import prisma from "../prisma/client";
import axios from "axios";

async function escalateLevel4ToLevel5() {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  const complaints = await prisma.complaint.findMany({
    where: {
      current_escalation_level: 4,
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
Subject: NOTICE: External Escalation Initiated - ${company.name} Customer Service Matter

Dear CEO/Executive Team,

This letter serves as formal notification that due to ${company.name}'s failure to resolve my complaint through internal channels, I have initiated external escalation procedures.

Original Complaint Summary:
- Incident date: ${incidentInfo}
${complaint.order_id ? `- Transaction/Order ID: ${complaint.order_id}` : ''}
- Complaint reference: ${complaint.complaint_id}
- Issue: ${complaint.level1_issue_summary || complaint.description}
- Impact: ${complaint.level1_impact || 'Significant customer impact and inconvenience'}
- Requested resolution: ${complaint.level1_requested_action || 'Fair resolution and compensation'}
${complaint.documents?.length ? `- Evidence provided: ${complaint.documents.length} supporting document(s)` : ''}

Escalation Timeline:
- Initial complaint: ${new Date(complaint.created_at).toDateString()}
- Internal escalations: Multiple attempts over 3+ weeks
- Media contact: Journalists engaged regarding corporate accountability
- External escalation: Consumer protection agencies notified

Actions Taken (as of ${new Date().toDateString()}):
- Contacted media outlets and journalists regarding corporate responsibility
- Filed formal complaints with relevant regulatory agencies
- Engaged consumer protection organizations
- Documented pattern of corporate unresponsiveness
- Shared case details with advocacy groups

Media Interest:
Journalists have expressed significant interest in covering this story. Focus areas include:
- Corporate responsiveness to legitimate customer complaints
- Consumer rights and protection in the digital age
- Industry standards and corporate accountability
- Systemic issues in customer service practices

Regulatory Attention:
Relevant consumer protection agencies are now aware of this matter and may include it in their oversight of ${company.name}'s customer service practices and compliance with consumer protection laws.

Legal Considerations:
This matter may also involve consultation with legal counsel regarding consumer rights violations and potential damages from the extended delay and poor service.

Opportunity for Corporate Response:
Although external processes are now underway, ${company.name} still has the opportunity to demonstrate corporate responsibility. Resolving this matter promptly and fairly could:
- Prevent negative media exposure and reputational damage
- Demonstrate genuine commitment to customer satisfaction
- Protect company reputation and brand integrity
- Show leadership in corporate accountability

Contact Information:
I remain available at ${user.email || "user contact"} for immediate resolution. Any solution must now address not only the original issue but also the extended delays, poor service experience, and reputational harm caused by the company's failure to respond appropriately.

Complete Documentation:
All external parties (media, regulators, advocacy groups) have received complete documentation of this case, including:
- Original complaint details and evidence
- Timeline of failed internal escalations
- Pattern of corporate unresponsiveness
- Customer impact and damages

I sincerely hope ${company.name} will use this situation as an opportunity to improve service processes and accountability for all consumers.

Sincerely,  
${user.name}  
Email: ${user.email}  
Phone: ${user.phone || "N/A"}  
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

    const finalEmail = response.data?.content?.[0]?.text || prompt;

    await prisma.complaint.update({
      where: { complaint_id: complaint.complaint_id },
      data: {
        current_escalation_level: 5,
        escalation_status: "Escalated",
        last_escalation_triggered: new Date(),
        level5_generated_email: finalEmail,
      },
    });

    console.log(
      `Complaint ${complaint.complaint_id} escalated to Level 5 (external escalation).`
    );
  }
}

export default escalateLevel4ToLevel5;

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
    },
  });

  for (const complaint of complaints) {
    const { user, company } = complaint;

    const prompt = `
Subject: NOTICE: External Escalation Initiated - ${company.name} Customer Service Matter

Dear CEO/Executive Team,

This letter serves as formal notification that due to ${company.name}'s failure to resolve my complaint through internal channels, I have initiated external escalation procedures.

Actions Taken (as of ${new Date().toDateString()}):
- Contacted media outlets and journalists
- Filed complaints with relevant regulatory agencies
- Engaged consumer protection organizations
- [Other specific actions taken]

Media Interest:
Journalists have expressed interest in covering this story. Focus may include:
- Corporate responsiveness to customer complaints
- Consumer rights and protection
- Industry standards and trust

Regulatory Attention:
Relevant consumer protection agencies are now aware of this matter and may include it in their oversight of ${company.name}'s customer service practices.

Opportunity for Response:
Although external processes are now underway, ${company.name} still has the opportunity to demonstrate corporate responsibility. Resolving this matter now could:
- Prevent negative media exposure
- Show a commitment to customers
- Protect company reputation

Contact Info:
I remain available at ${user.email || "user contact"} for resolution. Any solution must now address delays and reputational harm.

Documentation:
All external parties have received complete documentation of this case.

I hope ${company.name} uses this situation to improve service processes for all consumers.

Sincerely,  
${user.name}  
Email: ${user.email}  
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

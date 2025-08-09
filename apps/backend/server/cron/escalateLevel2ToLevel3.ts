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
    include: { user: true, company: true },
  });

  for (const complaint of complaints) {
    const { user, company } = complaint;

    const prompt = `
Subject: FINAL ESCALATION - Executive Intervention Required - ${complaint.level1_subject} - External Action Pending

Dear ${company.name} Executive Team,

This communication serves as my final attempt to resolve a significant complaint through internal channels before pursuing external remedies under consumer protection laws.

Escalation History:
- Original complaint filed: ${complaint.created_at.toDateString()} - No adequate response
- First escalation to middle management: ${complaint.last_escalation_triggered?.toDateString() || "N/A"} - No resolution
- Total time seeking resolution: 12+ days

The Issue: ${complaint.level1_issue_summary}

Failed Internal Process:
Your organization has failed to:
- Provide timely responses to legitimate customer concerns
- Offer reasonable solutions despite clear fault
- Demonstrate commitment to customer satisfaction
- Follow basic customer service standards

Final Resolution Demand:
I request immediate executive intervention to resolve this issue, including:
${complaint.level1_requested_action}

Deadline for Response:
Respond within 3 business days or I will escalate externally via:
- Government regulators
- Consumer protection groups
- Legal remedies
- Public media and social reviews

Documentation:
I have retained complete records of this issue and your organization's inadequate handling.

I trust your office will resolve this matter responsibly.

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

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
    },
  });

  for (const complaint of complaints) {
    const { user, company } = complaint;

    const prompt = `
Subject: Consumer Alert: ${company.name} Customer Service Failure - Potential Story Opportunity

Dear Journalist/News Desk,

I am reaching out regarding a significant consumer protection issue involving ${company.name} that may be of interest to your audience.

Story Overview:
Despite multiple attempts over the last few weeks, ${company.name} has failed to address a legitimate customer complaint regarding "${complaint.level1_subject}". This case highlights concerning patterns in corporate customer service and consumer rights.

Key Story Elements:
- Clear corporate responsibility for: ${complaint.level1_issue_summary}
- Documented pattern of ignoring customer complaints
- Consumer left without recourse through normal channels
- Potential impact on other customers

Timeline of Events:
- Complaint filed: ${new Date(complaint.created_at).toDateString()}
- Level 1 escalation
- Level 2 escalation
- Level 3 escalation (executive)

Why This Matters:
This case illustrates broader issues in consumer protection and the lack of corporate accountability.

Documentation Available:
- Full correspondence and complaint logs
- Evidence of impact on consumer
- Failed response history from ${company.name}

I am available for interview and can provide all supporting documentation. This story deserves attention.

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

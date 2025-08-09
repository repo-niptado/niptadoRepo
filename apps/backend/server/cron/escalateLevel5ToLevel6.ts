import { PrismaClient } from "@prisma/client";
import generateWithClaude from "../utils/claude";
const prisma = new PrismaClient();

export default async function escalateLevel5ToLevel6() {
  console.log("📣 Starting Level 5 ➝ Level 6 escalation");

  const now = new Date();

  const complaints = await prisma.complaint.findMany({
    where: {
      current_escalation_level: 5,
      status: "Pending",
      next_escalation_due_at: {
        lte: now,
      },
    },
    include: {
      company: true,
      user: true,
    },
  });

  for (const complaint of complaints) {
    const prompt = `
A consumer has escalated a complaint to Level 6 (social awareness).
Company: ${complaint.company.name}
Issue: ${complaint.level1_issue_summary}
Timeline: ${complaint.created_at.toDateString()} to ${now.toDateString()}
User Name: ${complaint.user.name}
Generate the following 4 types of messages (text only):
- Twitter/X format (max 280 chars)
- LinkedIn professional post
- Facebook community post
- Instagram story summary (5 slides style)
Do NOT use markdown. Return all 4 parts clearly labelled.
`;

    try {
      const result = await generateWithClaude(prompt); // <- your Claude API wrapper

      await prisma.complaint.update({
        where: { complaint_id: complaint.complaint_id },
        data: {
          current_escalation_level: 6,
          escalation_status: "Escalated",
          last_escalation_triggered: now,
          level6_social_summary: result,
          next_escalation_due_at: null, // End of escalation
        },
      });

      console.log(`✅ Escalated complaint #${complaint.complaint_id} to Level 6`);
    } catch (error) {
      console.error(`❌ Failed Level 6 escalation for complaint #${complaint.complaint_id}`, error);
    }
  }

  await prisma.$disconnect();
}

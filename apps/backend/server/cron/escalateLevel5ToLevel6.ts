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
      documents: true,
    },
  });

  for (const complaint of complaints) {
    // Format incident date for display if available
    const incidentInfo = complaint.incident_date ? 
      `${new Date(complaint.incident_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}${complaint.incident_time ? ` at ${complaint.incident_time}` : ''}` : 'Date not specified';

    const prompt = `
A consumer has escalated a complaint to Level 6 (social media awareness) after all other escalation attempts failed.

Complaint Details:
- Company: ${complaint.company.name}
- Issue: ${complaint.level1_issue_summary || complaint.description}
- Incident Date: ${incidentInfo}
${complaint.order_id ? `- Order/Transaction ID: ${complaint.order_id}` : ''}
- Customer Impact: ${complaint.level1_impact || 'Significant inconvenience and poor service'}
- Timeline: Original complaint ${complaint.created_at.toDateString()}, escalated multiple times, now ${now.toDateString()}
- User Name: ${complaint.user.name}
- Complaint Reference: ${complaint.complaint_id}
${complaint.documents?.length ? `- Evidence: ${complaint.documents.length} supporting document(s)` : ''}

Context: Customer tried internal escalation for weeks with no response from ${complaint.company.name}. This is about corporate accountability and consumer rights.

Generate the following 4 types of social media messages (text only):
1. Twitter/X format (max 280 chars) - Focus on corporate accountability
2. LinkedIn professional post - Professional tone about consumer rights 
3. Facebook community post - Community-focused, seeking others with similar experiences
4. Instagram story summary (5 slides style) - Visual storytelling format

Do NOT use markdown. Return all 4 parts clearly labelled. Keep tone professional but firm about consumer rights.
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

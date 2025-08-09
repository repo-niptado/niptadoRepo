import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import prisma from "../prisma/client"; // adjust to your DB client import

dotenv.config();
const router = express.Router();

interface ClaudeRequestBody {
  companyId: string;
  title: string;
  description: string;
  userName: string;
  level1_issue_summary: string;
  level1_impact: string;
  level1_prior_attempts: string;
  level1_requested_action: string;
}


router.post(
  "/generate-formatted-email",
  async (req: Request<{}, {}, ClaudeRequestBody>, res: Response) => {
    const {
      companyId,
      title,
      userName,
      level1_issue_summary,
      level1_impact,
      level1_prior_attempts,
      level1_requested_action,
    } = req.body;

    try {
      const company = await prisma.company.findUnique({
        where: { company_id: parseInt(companyId) },
        select: { name: true },
      });

      const companyName = company?.name || "Company";

      const today = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

      const prompt = `
Compose a professional consumer complaint email in the following format and tone:

---
Subject: Complaint Regarding ${title} - Customer ${userName} - Immediate Resolution Required

Dear Customer Service Team,

I am writing to formally document a complaint regarding "${title}" that requires your immediate attention and resolution.

Issue Summary: ${level1_issue_summary}

Impact on Consumer: ${level1_impact}

Previous Attempts to Resolve: ${level1_prior_attempts}

Requested Resolution: ${level1_requested_action}

Supporting Documentation: [User may attach supporting files separately.]

I trust ${companyName} values its customers and will address this matter promptly. I look forward to your response within 7 business days with a satisfactory resolution.

Thank you for your attention to this matter.

Sincerely,  
${userName}  
[Contact Info]  
Date: ${today}
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
        response.data?.content?.[0]?.text || "No content received.";
      res.json({ formattedEmail });
    } catch (error: any) {
      console.error("Claude Error:", error?.response?.data || error.message);
      res.status(500).json({ error: "Claude formatting failed" });
    }
  }
);


export default router;

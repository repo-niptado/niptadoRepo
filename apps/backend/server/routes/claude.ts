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
  incident_date: string;
  incident_time: string;
  order_id: string;
  level1_issue_summary: string;
  level1_impact: string;
  level1_prior_attempts: string;
  level1_requested_action: string;
  uploadedFiles?: any[];
}


router.post(
  "/generate-formatted-email",
  async (req: Request<{}, {}, ClaudeRequestBody>, res: Response) => {
    const {
      companyId,
      title,
      description,
      userName,
      incident_date,
      incident_time,
      order_id,
      level1_issue_summary,
      level1_impact,
      level1_prior_attempts,
      level1_requested_action,
      uploadedFiles,
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

      // Format incident date and time for display
      const incidentDateTime = incident_date ? 
        `${new Date(incident_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}${incident_time ? ` at ${incident_time}` : ''}` : 'Not specified';

      const prompt = `
Compose a professional consumer complaint email in the following format and tone:

---
Subject: Complaint Regarding ${level1_issue_summary || title} - Customer ${userName} - Immediate Resolution Required

Dear Customer Service Team,

I am writing to formally document a complaint regarding "${level1_issue_summary || title}" that requires your immediate attention and resolution.

Incident Details:
- Date and Time: ${incidentDateTime}
${order_id ? `- Order/Transaction ID: ${order_id}` : ''}

Issue Summary: ${level1_issue_summary || description}

Impact on Consumer: ${level1_impact || 'This issue has caused significant inconvenience and requires immediate resolution.'}

Previous Attempts to Resolve: ${level1_prior_attempts || 'This is my first formal complaint regarding this matter.'}

Requested Resolution: ${level1_requested_action || 'I request a prompt and satisfactory resolution to this matter.'}

Supporting Documentation: ${uploadedFiles && uploadedFiles.length > 0 ? `I have attached ${uploadedFiles.length} supporting document(s) as evidence.` : '[User may attach supporting files separately.]'}

I trust ${companyName} values its customers and will address this matter promptly. I look forward to your response within 7 business days with a satisfactory resolution.

Thank you for your attention to this matter.

Sincerely,  
${userName}  
[Contact Info]  
Date: ${today}
`;

      // Using Anthropic API with the new working key
      console.log('🔄 Attempting Anthropic API call...');
      console.log('API Key available:', !!process.env.ANTHROPIC_API_KEY);
      
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

      console.log('✅ Anthropic email formatting successful');
      const formattedEmail = response.data?.content?.[0]?.text || prompt;
      res.json({ formattedEmail });
    } catch (error: any) {
      console.error("❌ Claude API Error:", error?.response?.data || error.message);
      console.log('🔄 Using fallback template instead...');
      
      // Instead of failing, use the structured prompt as fallback
      const fallbackEmail = `Subject: Complaint Regarding ${level1_issue_summary || title} - Customer ${userName} - Immediate Resolution Required

Dear Customer Service Team,

I am writing to formally document a complaint regarding "${level1_issue_summary || title}" that requires your immediate attention and resolution.

Incident Details:
- Date and Time: ${incident_date ? new Date(incident_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) + (incident_time ? ` at ${incident_time}` : '') : 'Not specified'}
${order_id ? `- Order/Transaction ID: ${order_id}` : ''}

Issue Summary: ${level1_issue_summary || description}

Impact on Consumer: ${level1_impact || 'This issue has caused significant inconvenience and requires immediate resolution.'}

Previous Attempts to Resolve: ${level1_prior_attempts || 'This is my first formal complaint regarding this matter.'}

Requested Resolution: ${level1_requested_action || 'I request a prompt and satisfactory resolution to this matter.'}

Supporting Documentation: ${uploadedFiles && uploadedFiles.length > 0 ? `I have attached ${uploadedFiles.length} supporting document(s) as evidence.` : '[User may attach supporting files separately.]'}

I trust your company values its customers and will address this matter promptly. I look forward to your response within 7 business days with a satisfactory resolution.

Thank you for your attention to this matter.

Sincerely,  
${userName}  
[Contact Info]  
Date: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;
      
      res.json({ formattedEmail: fallbackEmail });
    }
  }
);


// Test endpoint to verify API is working
router.get("/test", async (req: Request, res: Response) => {
  try {
    console.log('🧠 Testing Anthropic API...');
    console.log('API Key available:', !!process.env.ANTHROPIC_API_KEY);
    
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 50,
        temperature: 0.5,
        messages: [{ role: "user", content: "Respond with: API test successful" }],
      },
      {
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
      }
    );
    
    res.json({ 
      success: true, 
      message: "Anthropic API is working",
      response: response.data?.content?.[0]?.text || "No response",
      usage: response.data?.usage
    });
  } catch (error: any) {
    console.error('❌ API test failed:', error?.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: error?.response?.data || error.message,
      message: "Anthropic API test failed"
    });
  }
});

export default router;

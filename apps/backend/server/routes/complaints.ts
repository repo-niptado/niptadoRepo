import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/authenticate';
import { AuthRequest } from '../types';
import fs from 'fs';
import prisma from '../prisma/client';

const router = express.Router();

// Submit a complaint (POST /api/complaints)

router.post('/', authenticate, async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;
  const userId = user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const {
    title,
    description,
    companyName,
    category = "General",
    subcategory = "General",
    status = "Pending",
    disputed_value = 0,
    desired_resolution = "Not specified",
    contactIds = [],
    mediaContactIds = [],
    level1_issue_summary,
    level1_impact,
    level1_prior_attempts,
    level1_requested_action,
    level1_generated_email,
    tempDocuments = [],
    // New complaint details fields
    incident_date,
    incident_time,
    order_id,
    incident_datetime
  } = req.body;

  if (!companyName || !title) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // Allow description to be optional if level1_issue_summary is provided
  const effectiveDescription = description || level1_issue_summary || "";
  if (!effectiveDescription) {
    return res.status(400).json({ message: 'Missing description or issue summary' });
  }

  try {
    // Get or create company
    const company = await prisma.company.upsert({
      where: { name: companyName },
      update: {},
      create: {
        name: companyName,
        industry: 'Unknown',
        location: 'Unknown',
        contact_email: 'unknown@company.com',
      },
    });

    // Create the complaint with Level 1 details
    const complaint = await prisma.complaint.create({
      data: {
        user: { connect: { id: userId } },
        company: { connect: { company_id: company.company_id } },
        category,
        subcategory,
        description: effectiveDescription,
        status,
        disputed_value,
        desired_resolution,
        current_escalation_level: 1,
        escalation_status: "Waiting",

        // New complaint details fields
        title,
        incident_date,
        incident_time,
        order_id,
        incident_datetime: incident_datetime ? new Date(incident_datetime) : null,

        level1_subject: title,
        level1_issue_summary,
        level1_impact,
        level1_prior_attempts,
        level1_requested_action,
        level1_generated_email,
      },
    });

    // Associate company contacts
    if (Array.isArray(contactIds) && contactIds.length > 0) {
      const complaintContactsData = contactIds.map((id: number) => ({
        complaint_id: complaint.complaint_id,
        contact_id: id,
        response_status: "Pending",
      }));

      await prisma.complaintContact.createMany({
        data: complaintContactsData,
        skipDuplicates: true,
      });
    }

    // Associate media contacts
    if (Array.isArray(mediaContactIds) && mediaContactIds.length > 0) {
      const complaintMediaData = mediaContactIds.map((id: number) => ({
        complaint_id: complaint.complaint_id,
        media_contact_id: id,
        response_status: "Pending",
      }));

      await prisma.complaintMediaContact.createMany({
        data: complaintMediaData,
        skipDuplicates: true,
      });
    }

    // Handle uploaded documents
    if (Array.isArray(tempDocuments) && tempDocuments.length > 0) {
      const documentPromises = tempDocuments.map(async (doc: any) => {
        // Verify file exists at temp location
        if (fs.existsSync(doc.file_path)) {
          return prisma.document.create({
            data: {
              complaint_id: complaint.complaint_id,
              file_name: doc.file_name,
              file_path: doc.file_path,
              file_type: doc.file_type,
              uploaded_at: new Date(),
            },
          });
        }
        return null;
      });

      await Promise.all(documentPromises.filter(promise => promise !== null));
    }

    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (err) {
    console.error('Error creating complaint:', err);
    res.status(500).json({ message: 'Failed to submit complaint' });
  }
});


// Fetch complaints by current user (GET /api/complaints/my)
router.get('/my', authenticate, async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;
  const userId = user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const complaints = await prisma.complaint.findMany({
      where: { user_id: userId },
      include: { 
        company: true,
        escalations: {
          select: {
            level: true,
            triggered_at: true,
            status: true
          },
          orderBy: { triggered_at: 'desc' },
          take: 3 // Only get latest 3 escalations for performance
        }
      },
      orderBy: { created_at: 'desc' },
    });

    res.status(200).json(complaints);
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
});

router.get("/level6/:id", authenticate, async (req, res) => {
  const complaint = await prisma.complaint.findUnique({
    where: { complaint_id: Number(req.params.id) },
    select: {
      level6_social_summary: true,
      current_escalation_level: true,
      level6_generated_email: true,
    },
  });

  if (!complaint) return res.status(404).json({ message: "Not found" });

  res.json(complaint);
});


// GET /api/complaints/:id
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid ID" });

  try {
    const complaint = await prisma.complaint.findUnique({
      where: { complaint_id: id },
      include: { company: true },
    });

    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (error) {
    console.error("Error fetching complaint by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/complaints/:id/follow-up -> trigger next escalation email and update complaint
// GET /api/complaints/:id/escalations - Get escalation history
router.get('/:id/escalations', authenticate, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'Invalid ID' });

  try {
    const { user } = req as AuthRequest;
    
    // First verify the complaint exists and user has access
    const complaint = await prisma.complaint.findUnique({
      where: { complaint_id: id },
      select: { user_id: true, complaint_id: true }
    });

    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    if (complaint.user_id !== user?.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get escalation history
    const escalations = await prisma.escalation.findMany({
      where: { complaint_id: id },
      orderBy: { triggered_at: 'desc' }
    });

    res.json({ escalations });
  } catch (error) {
    console.error('Error fetching escalation history:', error);
    res.status(500).json({ message: 'Failed to fetch escalation history' });
  }
});

// POST /api/complaints/:id/follow-up -> trigger next escalation email and update complaint
router.post('/:id/follow-up', authenticate, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'Invalid ID' });

  try {
    const complaint = await prisma.complaint.findUnique({
      where: { complaint_id: id },
      include: { user: true, company: true, documents: true },
    });

    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    // Verify user owns this complaint
    const { user } = req as AuthRequest;
    if (complaint.user_id !== user?.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Determine next escalation level
    const current = complaint.current_escalation_level || 1;
    let nextLevel = current;
    let promptTitle = '';

    if (current === 2) {
      nextLevel = 3;
      promptTitle = 'FINAL ESCALATION - Executive Intervention Required';
    } else if (current === 3) {
      nextLevel = 4;
      promptTitle = 'Escalation to Media Relations and PR';
    } else if (current === 4) {
      nextLevel = 5;
      promptTitle = 'Legal Escalation Notice';
    } else if (current === 5) {
      nextLevel = 6;
      promptTitle = 'Public Social Media Escalation Summary';
    } else {
      // If still at level 1, ask user to wait for initial escalation
      return res.status(400).json({ message: 'Follow-up available after first escalation (Level >= 2).' });
    }

    if (nextLevel > 6) {
      return res.status(400).json({ message: 'Maximum escalation level already reached.' });
    }

    const incidentInfo = complaint.incident_date ?
      `${new Date(complaint.incident_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}${complaint.incident_time ? ` at ${complaint.incident_time}` : ''}` : 'Not specified';

    const baseSummary = complaint.level1_issue_summary || complaint.title || complaint.description;

    const prompt = `
Subject: ${promptTitle} - Ref: ${complaint.complaint_id} - ${baseSummary}

Dear ${complaint.company.name} Executive Team,

This is a formal follow-up to my unresolved complaint and prior escalation(s).

Original Incident Details:
- Incident date and time: ${incidentInfo}
${complaint.order_id ? `- Order/Transaction ID: ${complaint.order_id}` : ''}
- Complaint reference: ${complaint.complaint_id}
- Issue: ${baseSummary}
${complaint.documents?.length ? `- Supporting evidence: ${complaint.documents.length} document(s) provided` : ''}

Escalation History:
- Current level: ${current}
- Last escalation date: ${complaint.last_escalation_triggered?.toDateString() || 'N/A'}

Customer Impact:
${complaint.level1_impact || 'Significant inconvenience and/or financial impact persists.'}

Requested Resolution:
${complaint.level1_requested_action || 'Immediate resolution and appropriate compensation.'}

Please respond within 3 business days. Failing which, I will proceed to the next stage of escalation appropriate to this level.

Sincerely,
${complaint.user.name}  
${complaint.user.email}  
${complaint.user.phone || 'Phone N/A'}  
${new Date().toDateString()}
`;

    // Generate email via Anthropic (fallback to prompt if API fails)
    let generatedText = prompt;
    try {
      const ax = await import('axios');
      const axios = ax.default;
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-haiku-20240307',
          max_tokens: 1000,
          temperature: 0.6,
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY || '',
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
          },
        }
      );
      generatedText = (response.data?.content?.[0]?.text as string) || prompt;
      console.log('✅ Anthropic email generation successful');
    } catch (err) {
      console.error('❌ Anthropic generation failed, using prompt as fallback:', err);
      generatedText = prompt; // Use the structured prompt as the email content
    }

    // Create escalation record for history tracking
    await prisma.escalation.create({
      data: {
        complaint_id: id,
        level: nextLevel,
        triggered_at: new Date(),
        details: `Manual follow-up escalation from Level ${current} to Level ${nextLevel}`,
        status: 'Active',
      },
    });

    // Persist update for next level
    const dataUpdate: any = {
      current_escalation_level: nextLevel,
      escalation_status: 'Escalated',
      last_escalation_triggered: new Date(),
    };

    if (nextLevel === 3) dataUpdate.level3_generated_email = generatedText;
    if (nextLevel === 4) dataUpdate.level4_generated_email = generatedText;
    if (nextLevel === 5) dataUpdate.level5_generated_email = generatedText;
    if (nextLevel === 6) {
      dataUpdate.level6_generated_email = generatedText;
      dataUpdate.level6_social_summary = generatedText;
    }

    const updated = await prisma.complaint.update({
      where: { complaint_id: id },
      data: dataUpdate,
      include: { 
        company: true, 
        escalations: {
          orderBy: { triggered_at: 'desc' }
        }
      },
    });

    res.json({ 
      message: 'Follow-up escalation generated successfully', 
      complaint: updated,
      generated_email: generatedText
    });
  } catch (error) {
    console.error('Error processing follow-up:', error);
    res.status(500).json({ message: 'Failed to process follow-up' });
  }
});

export default router;

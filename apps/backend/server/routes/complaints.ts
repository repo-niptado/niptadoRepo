import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/authenticate';
import { AuthRequest } from '../types';

const router = express.Router();
const prisma = new PrismaClient();

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
    level1_generated_email
  } = req.body;

  if (!companyName || !description || !title) {
    return res.status(400).json({ message: 'Missing required fields' });
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
        description,
        status,
        disputed_value,
        desired_resolution,
        current_escalation_level: 1,
        escalation_status: "Waiting",

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
      include: { company: true },
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


export default router;
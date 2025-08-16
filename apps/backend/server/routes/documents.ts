// routes/documents.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { upload } from '../middleware/uploadMiddleware';
import { authenticate } from '../middleware/authenticate';
import { AuthRequest } from '../types';
import fs from 'fs';
import path from 'path';

const router = Router();
const prisma = new PrismaClient();

// Upload documents for a complaint (during complaint creation or later)
router.post('/upload', authenticate, upload.array('documents', 10), async (req: AuthRequest, res) => {
  try {
    const { complaint_id } = req.body;
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // If complaint_id is provided, verify it exists and belongs to the user
    if (complaint_id) {
      const complaint = await prisma.complaint.findFirst({
        where: {
          complaint_id: parseInt(complaint_id),
          user_id: req.user!.id
        }
      });

      if (!complaint) {
        // Clean up uploaded files if complaint doesn't exist
        files.forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
        return res.status(404).json({ message: 'Complaint not found' });
      }
    }

    // Save file information to database (if complaint_id provided)
    const savedDocuments = [];
    
    for (const file of files) {
      const documentData = {
        file_name: file.originalname,
        file_path: file.path,
        file_type: file.mimetype,
        uploaded_at: new Date(),
        ...(complaint_id && { complaint_id: parseInt(complaint_id) })
      };

      if (complaint_id) {
        const document = await prisma.document.create({
          data: documentData
        });
        savedDocuments.push(document);
      } else {
        // Return file info for temporary storage (during complaint creation)
        savedDocuments.push({
          file_name: file.originalname,
          file_path: file.path,
          file_type: file.mimetype,
          temp_id: `temp_${Date.now()}_${Math.random()}`
        });
      }
    }

    res.status(200).json({
      message: 'Files uploaded successfully',
      documents: savedDocuments
    });

  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({ message: 'Failed to upload documents' });
  }
});

// Get documents for a complaint
router.get('/complaint/:complaint_id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { complaint_id } = req.params;

    // Verify complaint belongs to user
    const complaint = await prisma.complaint.findFirst({
      where: {
        complaint_id: parseInt(complaint_id),
        user_id: req.user!.id
      }
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const documents = await prisma.document.findMany({
      where: {
        complaint_id: parseInt(complaint_id)
      },
      orderBy: {
        uploaded_at: 'desc'
      }
    });

    res.status(200).json(documents);

  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});

// Delete a document
router.delete('/:document_id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { document_id } = req.params;

    // Find document and verify ownership through complaint
    const document = await prisma.document.findFirst({
      where: {
        document_id: parseInt(document_id)
      },
      include: {
        complaint: true
      }
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.complaint.user_id !== req.user!.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete file from filesystem
    if (fs.existsSync(document.file_path)) {
      fs.unlinkSync(document.file_path);
    }

    // Delete from database
    await prisma.document.delete({
      where: {
        document_id: parseInt(document_id)
      }
    });

    res.status(200).json({ message: 'Document deleted successfully' });

  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ message: 'Failed to delete document' });
  }
});

// Serve uploaded files (with authentication)
router.get('/file/:document_id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { document_id } = req.params;

    // Find document and verify ownership
    const document = await prisma.document.findFirst({
      where: {
        document_id: parseInt(document_id)
      },
      include: {
        complaint: true
      }
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.complaint.user_id !== req.user!.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Check if file exists
    if (!fs.existsSync(document.file_path)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    // Set appropriate headers
    res.setHeader('Content-Type', document.file_type);
    res.setHeader('Content-Disposition', `inline; filename="${document.file_name}"`);

    // Send file
    res.sendFile(path.resolve(document.file_path));

  } catch (error) {
    console.error('Error serving document:', error);
    res.status(500).json({ message: 'Failed to serve document' });
  }
});

export default router;

import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authenticate";
import { authorizeRole } from "../middleware/authorizeRole";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Create Admin (SUPERADMIN only)
router.post('/create', authenticate, authorizeRole(['SUPERADMIN']), async (req, res) => {
  try {
    const { name, email, phone, location, password, role } = req.body;

    if (role === 'SUPERADMIN') {
      return res.status(403).json({ message: 'Cannot create superadmin' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.user.create({
      data: { name, email, phone, location, password: hashedPassword, role },
    });

    res.status(201).json({ message: 'Admin created', admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating admin' });
  }
});

// ✅ List All Users (ADMIN or SUPERADMIN)
router.get('/users', authenticate, authorizeRole(['ADMIN', 'SUPERADMIN']), async (_req, res) => {
  const users = await prisma.user.findMany({
    where: { role: 'USER' },
    select: { id: true, name: true, email: true, location: true, phone: true }
  });
  res.json(users);
});

// ✅ Update User (ADMIN or SUPERADMIN)
router.put('/users/:id', authenticate, authorizeRole(['ADMIN', 'SUPERADMIN']), async (req, res) => {
  const { id } = req.params;
  const { name, phone, location } = req.body;

  const updatedUser = await prisma.user.update({
   where: { id: String(id) },
    data: { name, phone, location },
  });

  res.json({ message: 'User updated', user: updatedUser });
});

// ✅ Reset User Password (ADMIN or SUPERADMIN)
router.put('/users/:id/reset-password', authenticate, authorizeRole(['ADMIN', 'SUPERADMIN']), async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: String(id) },
    data: { password: hashedPassword },
  });

  res.json({ message: 'Password reset successfully' });
});

// ✅ List All Admins (SUPERADMIN only)
router.get('/admins', authenticate, authorizeRole(['SUPERADMIN']), async (_req, res) => {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { id: true, name: true, email: true, location: true, phone: true }
  });
  res.json(admins);
});

// ✅ Update Admin Details (SUPERADMIN only)
router.put('/admins/:id', authenticate, authorizeRole(['SUPERADMIN']), async (req, res) => {
  const { id } = req.params;
  const { name, phone, location } = req.body;

  const updatedAdmin = await prisma.user.update({
    where: { id },
    data: { name, phone, location },
  });

  res.json({ message: 'Admin updated', admin: updatedAdmin });
});

// ✅ Demote Admin to User (SUPERADMIN only)
router.put('/admins/:id/demote', authenticate, authorizeRole(['SUPERADMIN']), async (req, res) => {
  const { id } = req.params;

  const updated = await prisma.user.update({
    where: { id },
    data: { role: 'USER' },
  });

  res.json({ message: `Admin demoted to user`, user: updated });
});

export default router;

// routes/auth.ts
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

const router = Router();
const AUTH_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'defaultsecret';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

if (!user.password) {
  return res.status(403).json({
    message: "This account was created using Google. Please sign in with Google.",
  });
}

const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({  id: user.id }, AUTH_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful', name: user.name });
  
});

export default router;

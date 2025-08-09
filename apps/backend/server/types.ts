// server/types.ts
import { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  profileImage?: string | null;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

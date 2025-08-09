// types/user.ts (frontend folder)
export type Role = 'USER' | 'ADMIN' | 'SUPERADMIN';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  profileImage?: string | null;
}
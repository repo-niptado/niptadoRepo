// components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser(); // ensure latest user info
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push('/'); // redirect to home or login
    }
  }, [user]);

  if (user === null) {
    return <div className="text-center mt-10">Checking login...</div>;
  }

  return <>{children}</>;
}

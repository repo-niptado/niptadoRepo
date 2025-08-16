"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useAuthRedirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

//   useEffect(() => {
//   if (status !== "authenticated") return;

//   const currentPath = window.location.pathname;
//   if (!currentPath.startsWith('/dashboard') && currentPath !== '/') {
//     router.push('/');
//   }
// }, [status]);

  useEffect(() => {
    // If user just logged in with Google, ensure they're on the home page
    if (status === 'authenticated' && session?.user && window.location.pathname !== '/') {
      // Only redirect if we're not already on the home page or dashboard
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith('/dashboard') && currentPath !== '/') {
        router.push('/');
        router.refresh(); // Force a refresh to update the UI
      }
    }
  }, [session, status, router]);

  return { session, status };
};

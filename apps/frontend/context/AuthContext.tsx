"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface User {
  user_id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  profileImage?: string | null;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession(); // 👈 use NextAuth
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (session?.user?.email) {
      setUser({
        user_id: -1, // dummy since it's not from DB
        name: session.user.name || "Google User",
        email: session.user.email,
        role: "USER",
        profileImage: session.user.image || null,
      });
      setLoading(false); // ✅ important to stop loading state
      return;
    }

    try {
      const res = await axios.get("http://localhost:3001/api/users/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (status === "loading") return;

  if (status === "authenticated" && !user) {
    fetchUser();
  } else if (status === "unauthenticated") {
    setUser(null);
    setLoading(false);
  }
}, [status]);

  // useEffect(() => {
  //   if (status === "loading") {
  //     setLoading(true);
  //     return;
  //   }
    
  //   fetchUser();
  // }, [session, status]); // rerun when Google session or status changes

  const logout = async () => {
    try {
      // Call your backend logout if needed
      await axios.post(
        "http://localhost:3001/api/users/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Backend logout error:", err);
    } finally {
      setUser(null);
      await signOut({ callbackUrl: "/" }); // 👈 this logs out of NextAuth session
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

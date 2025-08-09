// lib/auth.config.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database", // or "jwt" if you're using token-based sessions
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      // You may need to cast user to `any` or extend the type
      session.user.id = (user as any).id;
      session.user.role = (user as any).role;
      return session;
    },
  },
};

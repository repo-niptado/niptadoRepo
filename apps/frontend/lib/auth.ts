import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@lib/prisma";
import { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken"; 

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/", // Redirect to home page for sign in
  },
  callbacks: {
    async jwt({ token, user }) {
      // When signing in, enrich the token with user info and a backend token
      if (user) {
        // Ensure we always have a stable id on the token
        token.id = (user as any).id || (token as any).sub;
        token.email = user.email ?? token.email;
        token.name = user.name ?? token.name;
        token.picture = (user as any).image ?? token.picture;

        const idForSign = (token.id as string) || ((token as any).sub as string);
        const emailForSign = (token.email as string) || undefined;
        const backendToken = jwt.sign(
          { id: idForSign, email: emailForSign },
          JWT_SECRET,
          { expiresIn: "7d" }
        );
        (token as any).backendToken = backendToken;
      }

      // Backfill backendToken for existing sessions where it might be missing
      if (!(token as any).backendToken) {
        try {
          const idForSign = (token.id as string) || ((token as any).sub as string);
          const emailForSign = (token.email as string) || undefined;
          if (idForSign) {
            (token as any).backendToken = jwt.sign(
              { id: idForSign, email: emailForSign },
              JWT_SECRET,
              { expiresIn: "7d" }
            );
          }
        } catch (e) {
          console.error("Failed to backfill backendToken:", e);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const idFromToken = (token as any).id || (token as any).sub;
        (session.user as any).id = idFromToken as string;
        (session.user as any).email = (token as any).email as string;
        (session.user as any).name = (token as any).name as string;
        (session.user as any).image = (token as any).picture as string;

        // Add backend token to session shape for client access
        (session.user as any).backendToken = (token as any).backendToken;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect callback:', { url, baseUrl });
      
      // Handle Google OAuth callback - always redirect to home page
      if (url.includes('/api/auth/callback/google') || url.includes('google')) {
        console.log('Google OAuth detected, redirecting to home page');
        return baseUrl + '/';
      }
      
      // If a callbackUrl was specified and it's the home page, use it
      if (url === baseUrl + '/' || url === baseUrl) {
        console.log('Home page callback detected');
        return baseUrl + '/';
      }
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      // Allows callback URLs on the same origin
      if (url.startsWith(baseUrl)) return url;
      
      // Default to home page for any other case
      console.log('Defaulting to home page redirect');
      return baseUrl + '/';
    },
  },
};

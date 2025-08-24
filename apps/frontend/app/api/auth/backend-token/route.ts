import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";
import { authOptions } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // If NextAuth already set backendToken, return it
  const existing = (session.user as any).backendToken as string | undefined;
  if (existing) {
    return NextResponse.json({ backendToken: existing });
  }

  // Otherwise, sign a fresh one based on session identity
  const id = (session.user as any).id || (session as any).sub;
  const email = session.user.email as string | undefined;
  if (!id) {
    return NextResponse.json({ message: "No user id in session" }, { status: 400 });
  }
  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "7d" });
  return NextResponse.json({ backendToken: token });
}


import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";
import prisma from "../prisma/client";

// Use the same secret as NextAuth if JWT_SECRET isn't set
const AUTH_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "defaultsecret";

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
  const token = req.cookies?.token || bearerToken;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, AUTH_SECRET) as { id: string | number };

    const user = await prisma.user.findUnique({
      where: { id: String(decoded.id) },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.id,
      email: user.email ?? "",
      name: user.name ?? "",
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

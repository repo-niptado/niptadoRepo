import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authenticate";
import { AuthRequest } from "../types";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

// Register
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      location,
      age,
      country,
      state_or_region,
    } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        location,
        age,
        country,
        state_or_region,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 🛑 Handle OAuth users who don't have passwords
    if (!user.password) {
      return res.status(403).json({
        message:
          "This account was registered with Google. Please use Google Sign-In.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

// Get current user
router.get("/me", authenticate, async (req: AuthRequest, res) => {
  const userId = req.user?.id;

  if (!userId)
    return res.status(400).json({ message: "User ID missing from request" });

  const user = await prisma.user.findUnique({ where: { id: String(userId) } });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    role: user.role,
    profileImage: user.image || "/uploads/default.png", // Note: user.image comes from Prisma
    age: user.age,
    country: user.country,
    state_or_region: user.state_or_region,
  });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.post("/reset-password", authenticate, async (req, res) => {
  const { user_id, newPassword } = req.body;
  const requestingUser = (req as any).user.id;

  const targetUser = await prisma.user.findUnique({ where: { id: user_id } });
  if (!targetUser) return res.status(404).json({ message: "User not found" });

  if (requestingUser.role === "ADMIN" && targetUser.role !== "USER") {
    return res
      .status(403)
      .json({ message: "Admins can only reset USER passwords." });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user_id },
    data: { password: hashed },
  });

  res.json({ message: "Password reset successful." });
});

// Update user profile

router.put("/update-profile", authenticate, async (req: AuthRequest, res) => {
  try {
    const { id: userId } = req.user!;
    const {
      name,
      email,
      phone,
      location,
      password,
      age,
      country,
      state_or_region,
      profileImage,
    } = req.body;

    const updateData: any = {
      name,
      phone,
      location,
      age, // now a string
      country,
      state_or_region,
    };

    if (email) updateData.email = email;
    if (profileImage) updateData.image = profileImage;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: String(userId) },
      data: updateData,
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Failed to update profile", error: err });
  }
});


// 1. Setup Multer for file upload
const uploadPath = path.join(__dirname, "../../uploads");

// Ensure the folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// 2. Create upload-image endpoint

router.put(
  "/upload-image",
  authenticate,
  upload.single("file"), // expecting field named 'file'
  async (req: AuthRequest, res) => {
    try {
      const userId = req.user!.id;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await prisma.user.findUnique({
        where: { id: String(userId) },
      });

      // Delete old image if it exists
      if (user?.image && !user.image.includes("default.png")) {
        const oldImagePath = path.join(uploadPath, path.basename(user.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const imagePath = `/uploads/${req.file.filename}`;

      const updatedUser = await prisma.user.update({
        where: { id: String(userId) },
        data: { image: imagePath },
      });

      res.json({
        message: "Profile image uploaded successfully",
        imagePath,
        user: updatedUser,
      });
    } catch (err) {
      console.error("Upload image error:", err);
      res.status(500).json({ message: "Image upload failed", error: err });
    }
  }
);


export default router;

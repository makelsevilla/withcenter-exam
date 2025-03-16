import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "@/lib/prisma-client";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Register User
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.validated;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    //   const newUser = { id: users.length + 1, username: email, password: hashedPassword };

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong." });
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong." });
  }
};

// Get Profile
export const getProfile = (req: Request, res: Response) => {
  res.json(req.user);
};

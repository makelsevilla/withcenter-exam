import { prisma } from "@/lib/prisma-client";
import { z } from "zod";

// Function to check if email is unique
const isEmailUnique = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  return !existingUser; // true if unique, false if exists
};

export const UserRequest = z.object({
  email: z
    .string()
    .email()
    .refine(async (email) => await isEmailUnique(email), {
      message: "Email is already taken",
    }),
  name: z.string(),
  password: z.string(),
});

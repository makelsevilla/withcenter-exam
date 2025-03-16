import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "@/lib/prisma-client";
import { z } from "zod";
import { PostRequest } from "@/validators/post";
import { validate } from "@/lib/util";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// get all posts
export const allPost = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();

  res.json({ posts });
};

export const getPost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);

  const post = await prisma.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    res.status(404).json({ message: "Post not found." });
  }

  res.json({ post });
};

export const createPost = async (req: Request, res: Response) => {
  const validated: Required<z.infer<typeof PostRequest>> = req.validated;

  const newPost = await prisma.post.create({
    data: { ...validated, authorId: req.user.id },
  });

  //   delete (newPost as any).authorId;

  res.status(201).json({ post: newPost });
};

export const updatePost = async (req: Request, res: Response) => {
  const validated: Required<z.infer<typeof PostRequest>> = req.validated;

  const postId = parseInt(req.params.postId, 10);

  const post = await prisma.post.findFirst({ where: { id: postId } });

  if (!post) {
    res.status(404).json({ message: "Post not found." });
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { ...validated },
  });

  res.json({ post: updatedPost, message: "Post updated successfully" });
};

export const deletePost = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId, 10);
  
    const post = await prisma.post.findFirst({ where: { id: postId } });
    const deletedPost = await prisma.post.delete({ where: { id: postId } });

    if (!deletePost) {
        res.status(404).json({message: "Post not found."})
    }
  
    res.json({ message: "Post deleted successfully" });
  };
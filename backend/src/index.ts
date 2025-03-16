import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import md5 from "md5";
import { UserRequest } from "./validators/user";
import { PostRequest } from "./validators/post";
import cors from "cors";
import validateMiddleware from "./middlewares/validateMiddleware";

import authRoutes from "@/routes/authRoutes"
import postRoutes from "@/routes/postRoutes"
import authMiddleware from "./middlewares/authMiddleware";

dotenv.config();

const app = express();
const port = process.env.PORT;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app.use("/api/auth", authRoutes)

// auth routes
app.use("/api", authMiddleware, postRoutes)

/* End Routes */

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server \nHello HAHAHAHA");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

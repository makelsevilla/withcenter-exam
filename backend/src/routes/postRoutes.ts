import express from "express";
import validateMiddleware from "@/middlewares/validateMiddleware";
import { allPost, createPost, deletePost, getPost, updatePost } from "@/controllers/postController";
import { PostRequest } from "@/validators/post";

const router = express.Router();

// middleware


router.get("/posts", allPost);

router.get("/posts/:postId", getPost)

router.post("/posts", validateMiddleware(PostRequest), createPost)

router.put("/posts/:postId", validateMiddleware(PostRequest), updatePost)

router.delete("/posts/:postId", deletePost)


export default router;

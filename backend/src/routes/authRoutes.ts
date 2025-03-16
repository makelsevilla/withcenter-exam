import express from "express";
import authMiddleware from "@/middlewares/authMiddleware";
import { getProfile, login, register } from "@/controllers/authController";
import validateMiddleware from "@/middlewares/validateMiddleware";
import { UserRequest } from "@/validators/user";

const router = express.Router();

router.post("/register", validateMiddleware(UserRequest), register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

export default router;

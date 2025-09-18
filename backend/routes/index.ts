import { Router } from "express";
import authRoutes from "./auth.routes";
import messageRoutes from "./message.routes";
import authMiddleware from "../middlewares/auth.middleware";
import ConversationRouter from "./conversation.routes";

const router = Router();

// gắn prefix /auth, /conversations, /messages
router.use("/auth", authRoutes);
router.use("/conversations", authMiddleware, ConversationRouter);
router.use("/messages", authMiddleware, messageRoutes);

export default router;

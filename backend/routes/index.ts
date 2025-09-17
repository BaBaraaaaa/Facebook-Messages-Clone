import { Router } from "express";
import authRoutes from "./auth.routes";
import conversationRoutes from "./conversation.routes";
import messageRoutes from "./message.routes";

const router = Router();

// gắn prefix /auth, /conversations, /messages
router.use("/auth", authRoutes);
router.use("/conversations", conversationRoutes);
router.use("/messages", messageRoutes);

export default router;

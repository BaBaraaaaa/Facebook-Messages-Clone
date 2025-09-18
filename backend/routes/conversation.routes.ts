import { Router } from "express";
import { createConversation, getUserConversations } from "../controllers/conversation.controller";

const router = Router();

router.post("/", createConversation);
router.get("/:userId", getUserConversations);

export default router;

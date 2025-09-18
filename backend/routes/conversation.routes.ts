import { Router } from "express";
import { createConversation, getUserConversations, markAsRead } from "../controllers/conversation.controller";

const ConversationRouter = Router();

ConversationRouter.post("/", createConversation);
ConversationRouter.get("/:userId", getUserConversations);
ConversationRouter.post("/:id/read", markAsRead);
export default ConversationRouter;

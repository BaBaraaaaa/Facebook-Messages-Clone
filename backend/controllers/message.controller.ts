import { Request, Response } from "express";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";

// Gửi tin nhắn
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, text, attachments } = req.body;
    const msg = new Message({
      conversation: conversationId,
      sender: senderId,
      text,
      attachments,
    });
    await msg.save();
    const conversation = await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: { text, sender: senderId, createdAt: new Date() },
      $inc: { [`unreadCounts.${senderId}`]: 0 },
    });
    conversation?.save();
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// Lấy tin nhắn trong cuộc trò chuyện
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "name email avatarUrl")
      .sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

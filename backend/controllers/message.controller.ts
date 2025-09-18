import { Request, Response } from "express";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, text, attachments } = req.body;

    // Tạo message mới
    const msg = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
      attachments,
    });

    // Lấy conversation để biết danh sách thành viên
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Tăng unread cho tất cả thành viên trừ người gửi
    const updateInc: Record<string, number> = {};
    conversation.members.forEach((memberId) => {
      if (memberId.toString() !== senderId) {
        updateInc[`unreadCounts.${memberId}`] = 1;
      }
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: { text, sender: senderId, createdAt: new Date() },
      $inc: updateInc,
    });

    res.status(201).json(msg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "name email avatarUrl")
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

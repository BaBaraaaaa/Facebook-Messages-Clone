import { Request, Response } from "express";
import Conversation from "../models/conversation.model";

// Tạo cuộc trò chuyện mới
export const createConversation = async (req: Request, res: Response) => {
  try {
    const { isGroup, name, members } = req.body;
    if (!Array.isArray(members) || members.length < 2) {
      return res
        .status(400)
        .json({ message: "A conversation must have at least 2 members" });
    }
    const isExxisting = await Conversation.findOne({
      isGroup: false,
      members: { $all: members, $size: members.length },
    });
    if (isExxisting) {
      return res.status(400).json({ message: "Conversation already exists" });
    }
    
    const conv = new Conversation({ isGroup, name, members });
    await conv.save();
    res.status(201).json(conv);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// Lấy danh sách conversation của 1 user
export const getUserConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const convs = await Conversation.find({ members: userId })
      .populate("members", "name email avatarUrl")
      .sort({ updatedAt: -1 });

    res.json(convs);
  } catch (err) {
    res.status(500).json({ message: "Get conversations failed", error: err });
  }
};

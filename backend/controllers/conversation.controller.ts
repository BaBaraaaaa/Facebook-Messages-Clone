import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import { AuthRequest } from "../middlewares/auth.middleware";
import User, { IUser } from "../models/user.model";
import mongoose from "mongoose";

// Tạo cuộc trò chuyện mới
export const createConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { isGroup = false, name = "", members = [] } = req.body;
    const currentUserId = req.user?.id;
    console.log(currentUserId);

    // --- 1. Kiểm tra mảng email ---
    if (!Array.isArray(members) || members.length < 1) {
      return res
        .status(400)
        .json({ message: "Bạn phải cung cấp ít nhất 1 email thành viên." });
    }

    // Regex email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = members.filter(
      (email: string) => !emailRegex.test(email)
    );
    if (invalidEmails.length > 0) {
      return res.status(400).json({
        message: `Các email không hợp lệ: ${invalidEmails.join(", ")}`,
      });
    }

    // --- 2. Lấy user theo email ---
    const users = await User.find({ email: { $in: members } }).select("_id email");
    if (users.length !== members.length) {
      return res.status(404).json({
        message: "Có email không tồn tại trong hệ thống.",
      });
    }

    // Thêm current user nếu chưa có
    const memberIds = users.map((u: IUser) => u._id);
    if (!memberIds.includes(currentUserId)) {
      memberIds.push(currentUserId);
    }

    if (memberIds.length < 2) {
      return res.status(400).json({
        message: "Một cuộc trò chuyện cần ít nhất 2 thành viên.",
      });
    }

    // --- 3. Kiểm tra trùng (chat riêng) ---
    if (!isGroup && memberIds.length === 2) {
      const existing = await Conversation.findOne({
        isGroup: false,
        members: { $all: memberIds, $size: 2 },
      });
      if (existing) return res.status(200).json(existing);
    }

    // --- 4. Tạo conversation ---
    const conv = await Conversation.create({
      isGroup,
      name,
      members: memberIds,
    });

    const populated = await conv.populate("members", "name email avatarUrl");
    return res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
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
// Đánh dấu cuộc trò chuyện đã đọc
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const conversationId = req.params.id;
    console.log("conversationId: ", conversationId);
    const userId = req.user; // từ middleware auth
    console.log("userId: ", userId);

    await Conversation.findByIdAndUpdate(conversationId, {
      $set: { [`unreadCounts.${userId}`]: 0 },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

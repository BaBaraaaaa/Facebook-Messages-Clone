// src/services/conversationService.ts
import axiosClient from "./axiosClient";
import {type IConversation } from "../types/conversation";

export const conversationService = {
  //lấy tất cả cuộc trò chuyện
  getAll: () => axiosClient.get<IConversation[]>("/conversations"),
  // Lấy conversations theo userId
  getByUserId: (userId: string) =>
    axiosClient.get<IConversation[]>(`/conversations/${userId}`),
  // Đánh dấu cuộc trò chuyện đã đọc
  markAsRead: (conversationId: string) =>
    axiosClient.post(`/conversations/${conversationId}/read`),
  // Tạo cuộc trò chuyện mới
  create: (payload: { name?: string; members: string[] }) =>
    axiosClient.post<IConversation>("/conversations", payload),
};

// src/services/conversationService.ts
import axiosClient from "./axiosClient";
import {type IConversation } from "../types/conversation";

export const conversationService = {
  getAll: () => axiosClient.get<IConversation[]>("/conversations"),
  getByUserId: (userId: string) =>
    axiosClient.get<IConversation[]>(`/conversations/${userId}`),
  create: (payload: { name?: string; memberIds: string[] }) =>
    axiosClient.post<IConversation>("/conversations", payload),
};

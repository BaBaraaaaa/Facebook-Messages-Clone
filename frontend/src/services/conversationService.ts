// src/services/conversationService.ts
import axiosClient from "./axiosClient";
import {type IConversation } from "../types/conversation";

export const conversationService = {
  getAll: () => axiosClient.get<IConversation[]>("/conversations"),
  getById: (id: string) =>
    axiosClient.get<IConversation>(`/conversations/${id}`),
  create: (payload: { name?: string; memberIds: string[] }) =>
    axiosClient.post<IConversation>("/conversations", payload),
};

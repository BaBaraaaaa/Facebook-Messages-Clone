// src/services/messageService.ts
import axiosClient from './axiosClient';
import { type IMessage } from '../types/message';

export const messageService = {
  getMessages: (conversationId: string) =>
    axiosClient.get<IMessage[]>(`/messages/${conversationId}`),

  sendMessage: (payload: { conversationId: string; text: string }) =>
    axiosClient.post<IMessage>('/messages', payload),
};

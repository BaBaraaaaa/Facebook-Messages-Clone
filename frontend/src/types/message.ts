import { type IUser } from './user';

export interface IMessage {
  _id: string;
  conversation: string; // hoặc IConversation nếu populate
  sender: IUser | string;
  text: string;
  attachments?: {
    url: string;
    mimeType: string;
  }[];
  statuses: Record<
    string,
    {
      deliveredAt?: string;
      readAt?: string;
    }
  >;
  createdAt: string;
  updatedAt: string;
}

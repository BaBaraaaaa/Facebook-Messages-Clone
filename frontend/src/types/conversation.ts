import { type IUser } from './user';

export interface IConversation {
  _id: string;
  isGroup: boolean;
  name?: string;                       // nếu là group
  members: IUser[];                    // populated user (hoặc chỉ ID tuỳ API)
  lastMessage?: {
    text: string;
    sender: IUser | string;            // tùy API có populate hay không
    createdAt: string;
  };
  unreadCounts: Record<string, number>; // { userId: count }
  createdAt: string;
  updatedAt: string;
}

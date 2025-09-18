export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  online: boolean;
  lastSeen: string;        // ISO string từ backend
  createdAt: string;
  updatedAt: string;
}

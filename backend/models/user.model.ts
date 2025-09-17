import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  online: boolean;
  lastSeen?: Date;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    avatarUrl: String,
    online: { type: Boolean, default: false },
    lastSeen: Date,
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

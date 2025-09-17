import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  isGroup: boolean;
  name?: string;
  members: mongoose.Types.ObjectId[];
  lastMessage?: {
    text: string;
    sender: mongoose.Types.ObjectId;
    createdAt: Date;
  };
  unreadCounts: { [userId: string]: number };
}

const ConversationSchema = new Schema<IConversation>(
  {
    isGroup: { type: Boolean, default: false },
    name: String,
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: {
      text: String,
      sender: { type: Schema.Types.ObjectId, ref: "User" },
      createdAt: Date,
    },
    unreadCounts: { type: Map, of: Number, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IConversation>("Conversation", ConversationSchema);

//💡 Lưu ý thiết kế:
// unreadCounts lưu từng userId kèm số tin chưa đọc – giúp lấy nhanh badge “unread”.

// lastMessage giúp list conversation hiển thị tin cuối mà không cần query Message.
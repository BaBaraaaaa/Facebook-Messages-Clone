import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text: string;
  attachments: { url: string; mimeType: string }[];
  statuses: {
    [userId: string]: { deliveredAt?: Date; readAt?: Date };
  };
}

const MessageSchema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, default: "" },
    attachments: [
      {
        url: String,
        mimeType: String,
      },
    ],
    statuses: {
      type: Map,
      of: new Schema({
        deliveredAt: Date,
        readAt: Date,
      }),
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);

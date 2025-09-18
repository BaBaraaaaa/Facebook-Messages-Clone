import { NextFunction } from "express";
import { Server, Socket } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.middleware";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import User from "../models/user.model";
interface ServerToClientEvents {
  "message:new": (msg: any) => void;
  "user:typing": (data: { conversationId: string; userId: string }) => void;
  "message:read": (data: { conversationId: string; userId: string }) => void;
  "user:online": (userId: string) => void;
  "user:offline": (userId: string) => void;
}

interface ClientToServerEvents {
  "join:conversation": (conversationId: string) => void;
  "message:send": (data: {
    conversationId: string;
    senderId: string;
    text: string;
    attachments?: { url: string; mimeType: string }[];
  }) => void;
  "user:typing": (data: { conversationId: string; userId: string }) => void;
  "message:read": (data: { conversationId: string; userId: string }) => void;
}

export function initSocket(httpServer: any) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(
    httpServer,
    {
      cors: { origin: "*" },
    }
  );
  // Middleware xác thực Socket.IO
  io.use((socket, next) => socketAuthMiddleware(socket, next as NextFunction));

  io.on("connection", (socket: Socket) => {
    const userId = (socket as any).user.id;
    console.log(`User connected: ${userId}`);
    io.emit("user:online", userId);

    //tham gia vào phòng conversation
    socket.on("join:conversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`User ${userId} joined conversation ${conversationId}`);
    });

    // Gửi tin nhắn
    socket.on("message:send", (data) => {
      const { conversationId, senderId, text, attachments } = data;
      const msg = new Message({
        conversation: conversationId,
        sender: senderId,
        text,
        attachments,
      });
      msg
        .save()
        .then(() => {
          const conv = Conversation.findOneAndUpdate(conversationId, {
            lastMessage: { text, sender: senderId, createdAt: new Date() },
          });
        })
        .finally(() => {
          io.to(conversationId).emit("message:new", msg);
        })
        .catch((err) => {
          console.error("Error saving message:", err);
        });
    });

    // Thông báo User đang gõ
    socket.on("user:typing", (data) => {
      io.to(data.conversationId).emit("user:typing", data);
    });

    // Đánh dấu tin nhắn đã đọc
    socket.on("message:read", async (data) => {
      const { conversationId, userId } = data;
      await Message.updateMany(
        {
          conversation: conversationId,
          [`statuses.${userId}.readAt`]: { $exists: false },
        },
        { $set: { [`statuses.${userId}.readAt`]: new Date() } }
      )
        .then(() => {
          io.to(conversationId).emit("message:read", data);
        })
        .catch((err) => {
          console.error("Error updating message read status:", err);
        });
    });
    // Ngắt kết nối
    socket.on("disconnect", async () => {
      await User.findByIdAndUpdate(userId, {
        online: false,
        lastSeen: new Date(),
      });
      io.emit("user:offline", userId);
      console.log("User disconnected:", userId);
    });
  });
}

import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { NextFunction } from "express";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET;
// Middleware kiểm tra xác thực cho socket
export async function socketAuthMiddleware(socket: Socket, next: NextFunction) {
  const token =
    socket.handshake.auth?.token || socket.handshake.headers["authorization"];

  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET!) as { id: string };
    (socket as any).user = payload; // Gán thông tin user vào socket
    await User.findByIdAndUpdate(payload.id, { isOnline: true });
    return next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }

}

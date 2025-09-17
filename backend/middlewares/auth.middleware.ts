import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request { user?: any }

export default function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
const authHeader = req.headers.authorization?.split(" ")[1];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(authHeader, process.env.JWT_SECRET as string);
    req.user = payload;
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }

    next();
  };


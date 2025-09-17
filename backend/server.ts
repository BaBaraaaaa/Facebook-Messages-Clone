import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import rootRouter from "./routes/index";
import { connectdb } from "./config/db";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// (tạm) test route
app.get("/", (_req, res) => res.send("API is running"));

// Socket.IO + HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected", socket.id));
});
// Connect to MongoDB
connectdb();

// prefix chung /api
app.use("/api", rootRouter);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

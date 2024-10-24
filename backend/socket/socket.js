import { Server } from "socket.io";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

const userSocketMap = {}; // userId: socketId

// Función para inicializar socket.io
export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Configurar eventos de socket
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
      try {
        await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
        await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
        io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      if (userId) {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
};

export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};

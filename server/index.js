import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/index.js";
import { userRouter } from "./routes/user.route.js";
import { chatRouter } from "./routes/chat.route.js";
import { messageRouter } from "./routes/message.route.js";
import { Server } from "socket.io";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
// app.use(express.static());

connectDB()
  .then(() => {
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/chat", chatRouter);
    app.use("/api/v1/chat/message", messageRouter);

    app.on("error", (error) => {
      console.log("✘ ERROR:- ", error);
    });

    app.get("/", (req, res) => {
      res.send("API is running");
    });

    const PORT = process.env.PORT || 8000;
    const server = app.listen(PORT, () => {
      console.log("❁ server is running at PORT:" + PORT);
    });

    const io = new Server(server, {
      cors: {
        origin: "*",
      },
      pingTimeout: 60000, // Increase timeout
      // pingInterval: 25000, // Increase ping interval
    });

    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      socket.on("setup", (user) => {
        console.log(`User ${user.data.user._id} connected`);
        socket.join(user.data.user._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        console.log(`User joined chat room: ${room}`);
        socket.join(room);
      });

      socket.on("new message", (newMessageStatus) => {
        let chat = newMessageStatus.chat;
        if (!chat.users) {
          return console.log("chat.users not defined");
        }
        console.log(newMessageStatus);
        // chat.users.forEach((user) => {
        // if (user._id === newMessageStatus.sender._id) return;
        socket.broadcast.emit("message received", newMessageStatus);
        // });
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
    });
  })
  .catch((err) => {
    console.log("✘ MONGO db connection failed!!! ", err);
  });

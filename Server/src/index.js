const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./Routes/index.route");
const ConnectDB = require("./config/db.config");
const { Server } = require("socket.io");
const port = process.env.PORT || 3002;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
route(app);
// const ConnectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat',
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             });
//         console.log("MongoDB Connected.")
//     }
//     catch (error) {
//         console.log(error)
//     }
// }
// ConnectDB();
ConnectDB();
const server = app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
let onlineUsers = [];
io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("Online user", onlineUsers);

    io.emit("getonlineUsers", onlineUsers);
  });
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        group_id: message.group_id,
        user_id: message.user_id,
        isRead: false,
        date: new Date(),
      });
    }
  });
  socket.on("sendMessageBox", (message) => {
    const members = message.members;
    const newMessage = message.newMessage;
    for (const member of members) {
      if (member !== newMessage.user_id) {
        const user = onlineUsers.find((user) => user.userId === member);

        if (user) {
          io.to(user.socketId).emit("getMessage", message.newMessage);
          io.to(user.socketId).emit("getNotification", {
            group_id: newMessage.group_id,
            user_id: newMessage.user_id,
            isRead: false,
            date: new Date(),
          });
        }
      }
    }
  });
  socket.on("createChat", (messages) => {
    console.log(messages);
    const message = messages.newChatBox;

    const user = messages.user;
    const members = message.members;

    for (const member of members) {
      if (user._id !== member) {
        const use = onlineUsers.find((u) => u.userId === member);
        if (use) {
          io.to(use.socketId).emit("newBoxChat", message);
        }
      }
    }
  });
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", socket.id);
    console.log("Online users after disconnect", onlineUsers);
    io.emit("getonlineUsers", onlineUsers);
  });
});
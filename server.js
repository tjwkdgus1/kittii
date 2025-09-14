const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// 클라이언트 폴더 정적 파일 서빙
app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// 메모리 메시지 저장
let messages = [];

io.on("connection", (socket) => {
  console.log("✅ connected:", socket.id);

  // 새 연결 클라이언트에게 채팅 기록 전달
  socket.emit("chat history", messages);

  // 메시지 수신
  socket.on("chat message", (msg) => {
    const sanitized = {
      name: String(msg.name).slice(0,50),
      message: String(msg.message).slice(0,1000)
    };
    messages.push(sanitized);
    if (messages.length > 500) messages.shift();
    io.emit("chat message", sanitized);
  });

  socket.on("disconnect", () => {
    console.log("⛔ disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

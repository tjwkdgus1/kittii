import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('client')); // client 폴더 전체 서빙

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', ({name, message}) => {
    io.emit('chat message', {name, message}); // 모든 클라이언트에 브로드캐스트
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// IMPORTANT: Replace 'YOUR_GITHUB_PAGES_URL' with your actual GitHub Pages URL
// e.g., 'https://yourusername.github.io'
const clientOrigin = 'https://YOUR_GITHUB_PAGES_URL'; 

const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat message', (msg) => {
    // 클라이언트에서 보낸 메시지(이름과 텍스트를 담은 객체)를 받습니다.
    const { name, text } = msg;
    console.log(`Received message from ${name}: ${text}`);
    // 연결된 모든 클라이언트에게 메시지를 다시 전송합니다.
    io.emit('chat message', { name, text });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

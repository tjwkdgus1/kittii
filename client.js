// IMPORTANT: Replace 'YOUR_RENDER_URL' with the URL of your deployed Render service.
const SERVER_URL = 'https://chat-app-server-a447.onrender.com'; 

// Socket.IO 클라이언트 연결 설정
const socket = io(SERVER_URL, {
  transports: ['websocket', 'polling']
});

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name-input');
    const messageInput = document.getElementById('input');
    const messages = document.getElementById('messages');

    // 서버에 연결되었을 때
    socket.on('connect', () => {
        console.log('Connected to server!');
    });

    // 서버 연결 오류 발생 시
    socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
    });

    // 서버로부터 메시지를 받았을 때
    socket.on('chat message', (msg) => {
        // 서버에서 보낸 메시지 객체(name, text)를 사용합니다.
        const li = document.createElement('li');
        li.innerHTML = `<span class="text-cyan-400 font-medium">${msg.name}:</span> <span class="text-white">${msg.text}</span>`;
        messages.appendChild(li);
        messages.scrollTop = messages.scrollHeight;
    });

    // 폼 제출 이벤트
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const text = messageInput.value.trim();

        if (name && text) {
            // 이름과 메시지 텍스트를 객체로 만들어 서버에 전송합니다.
            socket.emit('chat message', { name, text });
            messageInput.value = '';
        }
    });
});

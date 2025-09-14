<script src="/socket.io/socket.io.js"></script>
<script>
    lucide.createIcons();

    const socket = io("https://chat-app-server-a447.onrender.com"); // Render 서버 URL

    const form = document.getElementById('form');
    const nameInput = document.getElementById('name-input');
    const messageInput = document.getElementById('input');
    const messages = document.getElementById('messages');

    // 초기 채팅 기록
    socket.on("chat history", (history) => {
        messages.innerHTML = "";
        history.forEach(msg => addMessage(msg));
    });

    // 새로운 메시지 수신
    socket.on("chat message", (msg) => addMessage(msg));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (nameInput.value && messageInput.value) {
            socket.emit("chat message", { name: nameInput.value, message: messageInput.value });
            messageInput.value = '';
        }
    });

    function addMessage(msg) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="text-cyan-400 font-medium">${msg.name}:</span> <span class="text-white">${msg.message}</span>`;
        messages.appendChild(li);
        messages.scrollTop = messages.scrollHeight;
    }
</script>

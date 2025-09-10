// WebSocket 서버 주소 설정 (Render, Railway 등에서 배포한 서버 주소 입력)
const socket = io("http://localhost:3000"); // 나중에 서버 배포 시 URL 변경

const chatBox = document.getElementById("chat-box");
const nicknameInput = document.getElementById("nickname");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

// 메시지 전송 함수
function sendMessage() {
  const nickname = nicknameInput.value.trim();
  const message = messageInput.value.trim();

  if (!nickname || !message) return;

  // 서버로 메시지 전송
  socket.emit("chatMessage", { nickname, message });
  messageInput.value = "";
}

// 전송 버튼 클릭 시
sendBtn.addEventListener("click", sendMessage);

// Enter 키로 전송
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// 서버에서 메시지 받기
socket.on("chatMessage", (data) => {
  const msg = document.createElement("div");
  msg.classList.add("chat-message");

  if (data.nickname === nicknameInput.value.trim()) {
    msg.classList.add("self");
  } else {
    msg.classList.add("other");
  }

  msg.textContent = `${data.nickname}: ${data.message}`;
  chatBox.appendChild(msg);

  // 자동 스크롤
  chatBox.scrollTop = chatBox.scrollHeight;
});
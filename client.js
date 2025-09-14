const SERVER_URL = "https://chat-app-server-a447.onrender.com";
const socket = io(SERVER_URL, { transports: ['websocket', 'polling'] });

const form = document.getElementById("form");
const nameInput = document.getElementById("name-input");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

socket.on("connect", () => console.log("socket connected:", socket.id));
socket.on("connect_error", (err) => console.error("connect_error:", err));

socket.on("chat history", (history) => history.forEach(addMessage));
socket.on("chat message", (msg) => addMessage(msg));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = input.value.trim();
  const name = nameInput.value.trim();
  if (!val || !name) return;
  socket.emit("chat message", { name, message: val });
  input.value = "";
});

function addMessage(msg) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="text-cyan-400 font-medium">${msg.name}:</span> <span class="text-white">${msg.message}</span>`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
}

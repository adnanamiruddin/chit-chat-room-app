const socketio = io();

const messages = document.getElementById("messages");

const createMessage = (name, msg) => {
  const content = `
    <div class="flex flex-row justify-between items-center px-2 pt-4 overflow-hidden text-sm md:px-6">
      <div class="w-4/6  break-words md:w-9/12">
        <div class="text-sm">
          <strong>${name}</strong>
        </div>
        <div class="text-lg">
          ${msg}
        </div>
      </div>
      <span class="text-xs text-gray-500 w-1/6 text-end">
        ${new Date().toLocaleString()}
      </span>
    </div>
  `;
  messages.innerHTML += content;
  scrollToBottom();
};

socketio.on("message", (data) => {
  createMessage(data.name, data.message);
});

const sendMessage = (e) => {
  e.preventDefault();
  const message = document.getElementById("message");
  if (message.value === "" || message.value === " ") return;
  socketio.emit("message", { data: message.value });
  message.value = "";
  setTimeout(scrollToBottom, 100); // Delay to ensure message is rendered before scrolling
};

const scrollToBottom = () => {
  messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
};

window.addEventListener("load", scrollToBottom);

// messages.addEventListener("scroll", () => {
//   const scrollOffset = messages.scrollHeight - messages.scrollTop;
//   const containerHeight = messages.clientHeight;
//   const scrollDifference = scrollOffset - containerHeight;
//   if (scrollDifference < 5) {
//     scrollToBottom();
//   }
// });

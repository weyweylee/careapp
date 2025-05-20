const form = document.getElementById("form-step4");
const messageInput = document.getElementById("message");
const messageList = document.getElementById("messageList");

// Create the <ul> only once and reuse it
const ul = document.createElement("ul");
ul.style.listStyleType = "none"; // Remove bullet points if you want
ul.style.padding = "0";
messageList.appendChild(ul);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  const timestamp = new Date().toLocaleString();

  // Each message will go in a <li>
  const li = document.createElement("li");
  li.className = "message-entry";
  li.style.border = "1px solid #ccc";
  li.style.padding = "10px";
  li.style.marginBottom = "10px";
  li.style.borderRadius = "6px";

  const textPara = document.createElement("p");
  textPara.className = "message-text";
  textPara.textContent = message;

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = "Last updated: " + timestamp;

  const actions = document.createElement("div");
  actions.className = "action-buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit your message:", textPara.textContent);
    if (newText !== null) {
      textPara.textContent = newText;
      meta.textContent = "Last updated: " + new Date().toLocaleString();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    ul.removeChild(li);
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(textPara);
  li.appendChild(meta);
  li.appendChild(actions);

  ul.appendChild(li);

  messageInput.value = "";
});
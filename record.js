 const form = document.getElementById("form-step4");
  const messageInput = document.getElementById("message");
  const messageList = document.getElementById("messageList");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    const timestamp = new Date().toLocaleString();

    const entry = document.createElement("div");
    entry.className = "message-entry";

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
      messageList.removeChild(entry);
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    entry.appendChild(textPara);
    entry.appendChild(meta);
    entry.appendChild(actions);

    messageList.appendChild(entry);

    messageInput.value = "";
  });

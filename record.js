document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-step4");
  const messageInput = document.getElementById("message");
  const messageList = document.getElementById("messageList");

  // Create the <ul> only once and reuse it
  const ul = document.createElement("ul");
  ul.style.listStyleType = "none";
  ul.style.padding = "0";
  messageList.appendChild(ul);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    const timestamp = new Date().toLocaleString();

    // Each message goes into an <li>
    const li = document.createElement("li");
    li.className = "message-entry";
    li.style.border = "1px solid #ccc";
    li.style.padding = "10px";
    li.style.marginBottom = "10px";
    li.style.borderRadius = "6px";
    li.style.backgroundColor = "#f9f9f9";

    const textPara = document.createElement("p");
    textPara.className = "message-text";
    textPara.textContent = message;

    const meta = document.createElement("div");
    meta.className = "message-meta";
    meta.textContent = "Last updated: " + timestamp;
    meta.style.fontSize = "12px";
    meta.style.color = "#666";

    li.appendChild(textPara);
    li.appendChild(meta);
    ul.appendChild(li);

    messageInput.value = "";
  });
});

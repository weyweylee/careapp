document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-step4");
  const messageInput = document.getElementById("message");
  const messageTable = document.getElementById("messageList");
  const tbody = messageTable.querySelector("tbody");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    // Show the table when first message is added
    if (messageTable.style.display === "none") {
      messageTable.style.display = "table";
    }

    // Create a new table row with 1 column for the message
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = message;
    row.appendChild(cell);
    tbody.appendChild(row);

    // Clear input after adding
    messageInput.value = "";
  });
});
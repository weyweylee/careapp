document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-link[data-tab]');
  const tabSections = document.querySelectorAll('.tab-content');

  // Handle tab clicks
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabSections.forEach(section => section.classList.remove('active'));

      button.classList.add('active');
      const target = document.getElementById(button.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Navigate between steps
  const formStep1 = document.getElementById('form-step1');
  if (formStep1) {
    formStep1.addEventListener('submit', (event) => {
      event.preventDefault();
      const step2Tab = document.querySelector('.tab-link[data-tab="step2"]');
      if (step2Tab) step2Tab.click();
    });
  }

  const formStep2 = document.getElementById('form-step2');
  if (formStep2) {
    formStep2.addEventListener('submit', (event) => {
      event.preventDefault();
      const step3Tab = document.querySelector('.tab-link[data-tab="step3"]');
      if (step3Tab) step3Tab.click();
    });
  }

  // Relationship "Other" logic
  const relationshipSelect = document.getElementById("relationship");
  const customContainer = document.getElementById("customRelationshipContainer");
  const customInput = document.getElementById("customRelationship");

  if (relationshipSelect) {
    relationshipSelect.addEventListener("change", function () {
      if (this.value === "Other") {
        customContainer.style.display = "block";
        customInput.required = true;
      } else {
        customContainer.style.display = "none";
        customInput.value = "";
        customInput.required = false;
      }
    });
  }

  // Add Contact logic
  const addButton = document.querySelector(".btn-add");
  if (addButton) {
    addButton.addEventListener("click", function () {
      const name = document.getElementById("contactName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const relationship = relationshipSelect.value === "Other"
        ? customInput.value.trim()
        : relationshipSelect.value;

      if (!name || !relationship || !phone) {
        alert("Please fill in all fields before adding.");
        return;
      }

      // Add contact to list
      const li = document.createElement("li");
      li.textContent = `${name} (${relationship}) - ${phone}`;
      document.getElementById("contactList").appendChild(li);

      // Clear form
      document.getElementById("contactName").value = "";
      document.getElementById("relationship").value = "";
      document.getElementById("phone").value = "";
      customInput.value = "";
      customContainer.style.display = "none";
      customInput.required = false;
    });
  }
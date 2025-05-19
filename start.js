document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-link').forEach(button => {
      button.addEventListener('click', () => {
        // Remove 'active' from all buttons
        document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));

        // Add 'active' to the clicked one
        button.classList.add('active');

        // Get the associated tab content ID
        const tabId = button.getAttribute('data-tab');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));

        // Show the selected content
        const targetSection = document.getElementById(tabId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    });
  });
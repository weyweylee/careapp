document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-link[data-tab]');
  const tabSections = document.querySelectorAll('.tab-content');

  // Handle tab clicks
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and sections
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabSections.forEach(section => section.classList.remove('active'));

      // Add active class to the clicked button and matching section
      button.classList.add('active');
      const target = document.getElementById(button.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Handle form submit and move to step2
  const formStep1 = document.getElementById('form-step1');
  formStep1.addEventListener('submit', (event) => {
    event.preventDefault();
});

// Handle form submit and move to step3
  const formStep2 = document.getElementById('form-step2');
  formStep2.addEventListener('submit', (event) => {
    event.preventDefault();

    // Optional: Validate form fields here

    // Simulate click on step3 tab
    const step3Tab = document.querySelector('.tab-link[data-tab="step3"]');
    if (step3Tab) step3Tab.click();
  });

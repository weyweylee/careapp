document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-link[data-tab]');
  const tabSections = document.querySelectorAll('.tab-content');

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
});
    
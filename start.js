
document.addEventListener('DOMContentLoaded', () => {
  // --- Tab Switching ---
  const tabButtons = document.querySelectorAll('.tab-link[data-tab]');
  const tabSections = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabSections.forEach(section => section.classList.remove('active'));
      button.classList.add('active');
      const target = document.getElementById(button.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // --- Step Navigation ---
  const formStep1 = document.getElementById('form-step1');
  const formStep2 = document.getElementById('form-step2');
  const formStep3 = document.getElementById('form-step3');

  formStep1?.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.tab-link[data-tab="step2"]')?.click();
  });

  formStep2?.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.tab-link[data-tab="step3"]')?.click();
  });

  formStep3?.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.tab-link[data-tab="step4"]')?.click();
  });

  document.getElementById("submitBtn")?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('contactTable').style.display = "block";

const tbodyRef = document.getElementById('contactTable').getElementsByTagName('tbody')[0];

  // Insert a row at the end of table
  const newRow = tbodyRef.insertRow();
  let name = newRow.insertCell();
  let newText = document.createTextNode(document.getElementById("contactName").value);
  name.appendChild(newText);

  let relationship = newRow.insertCell();
let newText1;

  if(document.getElementById("relationship").value != "Other"){
    newText1 = document.createTextNode(document.getElementById("relationship").value);
  }else{
    newText1 = document.createTextNode(document.getElementById("customRelationship").value);
  }

  relationship.appendChild(newText1);

    let phone = newRow.insertCell();
  let newText2 = document.createTextNode(document.getElementById("phone").value);
  phone.appendChild(newText2);

  });

  // --- Relationship Dropdown ---
  const relationshipSelect = document.getElementById('relationship');
  const customContainer = document.getElementById('customRelationshipContainer');
  const customInput = document.getElementById('customRelationship');

  relationshipSelect?.addEventListener('change', () => {
    if (relationshipSelect.value === 'Other') {
      customContainer.style.display = 'block';
      customInput.required = true;
    } else {
      customContainer.style.display = 'none';
      customInput.value = '';
      customInput.required = false;
    }
  });

  // --- Language Selection ---
  const preferredLanguageSelect = document.getElementById('preferred-language');
  const otherLanguageBox = document.getElementById('other-language-box');
  const otherLanguageInput = document.getElementById('other-language');

  preferredLanguageSelect?.addEventListener('change', () => {
    if (preferredLanguageSelect.value === 'other') {
      otherLanguageBox.style.display = 'block';
      otherLanguageInput.required = true;
    } else {
      otherLanguageBox.style.display = 'none';
      otherLanguageInput.value = '';
      otherLanguageInput.required = false;
    }
  });

  // --- Allergy Section ---
  const allergyYesRadio = document.getElementById('allergies-yes');
  const allergyNoRadio = document.getElementById('allergies-no');
  const allergyDetailsDiv = document.getElementById('allergyDetails');
  const allergyTextInput = document.getElementById('allergy-text');

  function toggleAllergyDetails(show) {
    allergyDetailsDiv.style.display = show ? 'block' : 'none';
    allergyTextInput.required = show;
    if (!show) allergyTextInput.value = '';
  }

  allergyYesRadio?.addEventListener('change', () => toggleAllergyDetails(true));
  allergyNoRadio?.addEventListener('change', () => toggleAllergyDetails(false));

  // Initialize allergy and language sections on page load
  if (preferredLanguageSelect?.value === 'other') {
    otherLanguageBox.style.display = 'block';
    otherLanguageInput.required = true;
  }

  if (allergyYesRadio?.checked) {
    toggleAllergyDetails(true);
  }

  // --- Add New Record with File Upload ---
  const addRecordBtn = document.querySelector('.btn-add');
  const recordsList = document.getElementById('records-list');

  addRecordBtn?.addEventListener('click', () => {
    const recordDiv = document.createElement('div');
    recordDiv.style.border = '1px solid #ccc';
    recordDiv.style.padding = '10px';
    recordDiv.style.marginBottom = '10px';

    // Title input
    recordDiv.innerHTML += `
      <label>Title: <input type="text" required></label><br>
      <label style="display:block;">Message:</label>
      <textarea rows="3" style="width:100%;"></textarea>
      <label style="display:block;">Upload Document/Video/Voice:</label>
      <input type="file" accept=".pdf,.doc,.docx,.txt,video/*,audio/*">
      <label style="display:block;">Date of Upload:</label>
      <input type="text" readonly value="${new Date().toLocaleString()}">
    `;
  });
})

document.querySelector('.btn-save').addEventListener('click', function (e) {
  e.preventDefault(); // prevent actual form submission
  alert('Submission successful!');
});

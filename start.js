
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

  formStep1?.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.tab-link[data-tab="step2"]')?.click();
  });

  formStep2?.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.tab-link[data-tab="step3"]')?.click();
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

  // --- Add Contact to List ---
  document.querySelector('.btn-add')?.addEventListener('click', () => {
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const relationship = relationshipSelect.value === 'Other'
      ? customInput.value.trim()
      : relationshipSelect.value;

    if (!name || !relationship || !phone) {
      alert('Please fill in all fields before adding.');
      return;
    }

    const li = document.createElement('li');
    li.textContent = `${name} (${relationship}) - ${phone}`;
    document.getElementById('contactList').appendChild(li);

    // Reset fields
    document.getElementById('contactName').value = '';
    document.getElementById('relationship').value = '';
    document.getElementById('phone').value = '';
    customInput.value = '';
    customContainer.style.display = 'none';
    customInput.required = false;
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

    recordsList.appendChild(recordDiv);
  });

  // --- Simple File Upload Display List ---
  const fileInput = document.getElementById('fileInput');
  const fileList = document.getElementById('fileList');

  fileInput?.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;

    const listItem = document.createElement('div');
    listItem.className = 'file-item';

    const blobUrl = URL.createObjectURL(file);
    const now = new Date().toLocaleString();

    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';
    fileInfo.innerHTML = `<strong>${file.name}</strong><br><small>Uploaded: ${now}</small>`;

    const actions = document.createElement('div');
    actions.className = 'file-actions';

    const downloadBtn = document.createElement('a');
    downloadBtn.href = blobUrl;
    downloadBtn.download = file.name;
    downloadBtn.innerHTML = '<button>Download</button>';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      URL.revokeObjectURL(blobUrl);
      fileList.removeChild(listItem);
    });

    actions.appendChild(downloadBtn);
    actions.appendChild(deleteBtn);

    listItem.appendChild(fileInfo);
    listItem.appendChild(actions);
    fileList.appendChild(listItem);

    fileInput.value = ''; // Reset input
  });
});


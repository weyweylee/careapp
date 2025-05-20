document.addEventListener('DOMContentLoaded', () => {
  const showBtn = document.getElementById('showContactFormBtn');
  const formContainer = document.getElementById('contactFormContainer');
  const form = document.getElementById('contactForm');
  const relationshipSelect = document.getElementById('relationship');
  const customContainer = document.getElementById('customRelationshipContainer');
  const customInput = document.getElementById('customRelationship');
  const table = document.getElementById('contactTable');
  const tbody = table.querySelector('tbody');
  const editingIndexInput = document.getElementById('editingIndex');
  const submitBtn = document.getElementById('submitBtn');

  // Show/hide custom relationship field
  relationshipSelect.addEventListener('change', () => {
    if (relationshipSelect.value === 'Other') {
      customContainer.style.display = 'block';
      customInput.required = true;
    } else {
      customContainer.style.display = 'none';
      customInput.value = '';
      customInput.required = false;
    }
  });

  // Show form when Add Contact is clicked
  showBtn.addEventListener('click', () => {
    form.reset();
    editingIndexInput.value = '';
    submitBtn.textContent = 'Add';
    customContainer.style.display = 'none';
    formContainer.style.display = 'block';
  });

  // Handle form submission (add or update)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const relationship = relationshipSelect.value === 'Other'
      ? customInput.value.trim()
      : relationshipSelect.value;

    const index = editingIndexInput.value;

    if (index === '') {
      // Add new contact
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${name}</td>
        <td>${relationship}</td>
        <td>${phone}</td>
        <td>
          <button type="button" class="edit-btn">Edit</button>
          <button type="button" class="delete-btn">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    } else {
      // Update existing contact
      const row = tbody.children[index];
      row.children[0].textContent = name;
      row.children[1].textContent = relationship;
      row.children[2].textContent = phone;
    }

    form.reset();
    editingIndexInput.value = '';
    customContainer.style.display = 'none';
    formContainer.style.display = 'none';
    submitBtn.textContent = 'Add';
    table.style.display = 'table';
  });

  // Event delegation for Edit/Delete buttons
  tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const row = e.target.closest('tr');
      row.remove();
      if (tbody.children.length === 0) {
        table.style.display = 'none';
      }
    }

    if (e.target.classList.contains('edit-btn')) {
      const row = e.target.closest('tr');
      const index = [...tbody.children].indexOf(row);
      const name = row.children[0].textContent;
      const relationship = row.children[1].textContent;
      const phone = row.children[2].textContent;

      document.getElementById('contactName').value = name;
      document.getElementById('phone').value = phone;
      editingIndexInput.value = index;
      submitBtn.textContent = 'Update';

      // Check if relationship is in select options
      const relationshipOptions = Array.from(relationshipSelect.options).map(opt => opt.value);
      if (relationshipOptions.includes(relationship)) {
        relationshipSelect.value = relationship;
        customInput.value = '';
        customContainer.style.display = 'none';
        customInput.required = false;
      } else {
        relationshipSelect.value = 'Other';
        customInput.value = relationship;
        customContainer.style.display = 'block';
        customInput.required = true;
      }

      formContainer.style.display = 'block';
    }
  });
});
// Navigation event listeners
const info = document.querySelector('#info');
info.addEventListener("click", () => {
  window.location.href = 'main_page.html';
});

const cash = document.querySelector('#cash');
cash.addEventListener("click", () => {
  window.location.href = 'total_cash.html';
});

const distribution = document.querySelector('#distribution');
distribution.addEventListener("click", () => {
  window.location.href = 'cash_dish.html';
});

// Floating button and modal elements
const floatingButton = document.querySelector('.floating-button');
const modal = document.getElementById('popup-modal');
const submitTenantBtn = document.getElementById('submit-tenant-btn');
const tenantContainer = document.querySelector('.tenant-container');

modal.style.display = 'none';

// Event listener for the floating button to show the modal
floatingButton.addEventListener('click', () => {
  console.log('Floating button clicked');
  modal.style.display = 'block';
});

// Function to create and append a tenant div
function createTenantDiv(tenant) {
  const newTenantDiv = document.createElement('div');
  newTenantDiv.classList.add('tenant-info');
  newTenantDiv.innerHTML = `
    <h3>${tenant.tenantName}</h3>
    <ul>
      <li><i class="fas fa-money-bill-wave"></i> <span class="label">Monthly Rent:</span> <span class="value">${tenant.monthlyRent}</span></li>
      <li><i class="fas fa-piggy-bank"></i> <span class="label">Advance Money:</span> <span class="value">${tenant.advanceMoney}</span></li>
      <li><i class="fas fa-calendar-alt"></i> <span class="label">Contract Deadline:</span> <span class="value">${tenant.contractDeadline}</span></li>
      <li><i class="fas fa-hand-holding-usd"></i> <span class="label">Deductible Rent:</span> <span class="value">${tenant.deductibleRent}</span></li>
      <li><i class="fas fa-calendar-day"></i> <span class="label">Month Name:</span> <span class="value">${tenant.monthName}</span></li>
      <li><i class="fas fa-calendar"></i> <span class="label">Year of Payment:</span> <span class="value">${tenant.yearOfPayment}</span></li>
    </ul>
    <button class="delete-btn">Delete</button>
  `;
  tenantContainer.appendChild(newTenantDiv);
}

// Function to check if all input fields are filled
function checkInputFields() {
  const tenantName = document.getElementById('tenant-name-input').value;
  const monthlyRent = document.getElementById('monthly-rent').value;
  const advanceMoney = document.getElementById('advance-money').value;
  const contractDeadline = document.getElementById('contract-deadline').value;
  const deductibleRent = document.getElementById('deductible-rent').value;
  const monthName = document.getElementById('month-name').value;
  const yearOfPayment = document.getElementById('year-of-payment').value;

  // Disable the submit button if any field is empty
  submitTenantBtn.disabled = !tenantName || !monthlyRent || !advanceMoney || !contractDeadline || !deductibleRent || !monthName || !yearOfPayment;
}

// Event listener for the submit button to add tenant info and hide the modal
submitTenantBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission
  console.log('Submit button clicked');

  // Extract values from the form
  const tenantName = document.getElementById('tenant-name-input').value;
  const monthlyRent = document.getElementById('monthly-rent').value;
  const advanceMoney = document.getElementById('advance-money').value;
  const contractDeadline = document.getElementById('contract-deadline').value;
  const deductibleRent = document.getElementById('deductible-rent').value;
  const monthName = document.getElementById('month-name').value;
  const yearOfPayment = document.getElementById('year-of-payment').value;

  // Debugging logs
  console.log('Tenant Name:', tenantName);
  console.log('Monthly Rent:', monthlyRent);
  console.log('Advance Money:', advanceMoney);
  console.log('Contract Deadline:', contractDeadline);
  console.log('Deductible Rent:', deductibleRent);
  console.log('Month Name:', monthName);
  console.log('Year of Payment:', yearOfPayment);

  // Check if any fields are empty
  if (tenantName === '' || monthlyRent === '' || advanceMoney === '' || contractDeadline === '' || deductibleRent === '' || monthName === '' || yearOfPayment === '') {
    alert('Please fill out all fields');
    return;
  }

  // Create a new tenant object
  const newTenant = {
    tenantName,
    monthlyRent,
    advanceMoney,
    contractDeadline,
    deductibleRent,
    monthName,
    yearOfPayment
  };

  console.log('New Tenant Object:', newTenant);

  // Get existing tenants from local storage or initialize an empty array
  let tenants = JSON.parse(localStorage.getItem('tenants')) || [];
  console.log('Existing Tenants:', tenants);

  // Add the new tenant to the array
  tenants.push(newTenant);
  console.log('Updated Tenants:', tenants);

  // Save the updated tenants array back to local storage
  localStorage.setItem('tenants', JSON.stringify(tenants));
  console.log('Tenants saved to localStorage:', localStorage.getItem('tenants'));

  // Create a new tenant div with the entered details
  createTenantDiv(newTenant);

  // Hide the modal
  modal.style.display = 'none';
});

// Event listener for page load to display stored tenants
document.addEventListener('DOMContentLoaded', () => {
  let tenants = JSON.parse(localStorage.getItem('tenants')) || [];
  console.log('Tenants loaded from localStorage on page load:', tenants);
  tenants.forEach(createTenantDiv);
  checkInputFields(); // Call to check inputs initially

  // Add event listeners to each input field
  document.getElementById('tenant-name-input').addEventListener('input', checkInputFields);
  document.getElementById('monthly-rent').addEventListener('input', checkInputFields);
  document.getElementById('advance-money').addEventListener('input', checkInputFields);
  document.getElementById('contract-deadline').addEventListener('input', checkInputFields);
  document.getElementById('deductible-rent').addEventListener('input', checkInputFields);
  document.getElementById('month-name').addEventListener('input', checkInputFields);
  document.getElementById('year-of-payment').addEventListener('input', checkInputFields);
});

// Event listener for delete buttons
tenantContainer.addEventListener('click', (event) => {
  const target = event.target;

  // Handle click on the "Delete" button
  if (target.classList.contains('delete-btn')) {
    const tenantDiv = target.closest('.tenant-info');
    if (confirm('Are you sure you want to delete this tenant?')) {
      const tenantName = tenantDiv.querySelector('h3').textContent;
      tenantDiv.remove();

      // Update local storage after deletion
      let tenants = JSON.parse(localStorage.getItem('tenants')) || [];
      tenants = tenants.filter(t => t.tenantName !== tenantName);
      localStorage.setItem('tenants', JSON.stringify(tenants));
      console.log('Tenant removed. Updated tenants:', tenants);
    }
  }
});

// Additional functionality for processing tenant data
function processTenantData(month, year, rent) {
  // Example calculation: Store or update the total cash for the given month and year
  const key = `${month}-${year}`;
  const totalCashByMonthYear = JSON.parse(localStorage.getItem('totalCashByMonthYear')) || {};
  if (totalCashByMonthYear[key]) {
    totalCashByMonthYear[key] += rent;
  } else {
    totalCashByMonthYear[key] = rent;
  }

  // Save the updated data back to localStorage
  localStorage.setItem('totalCashByMonthYear', JSON.stringify(totalCashByMonthYear));

  console.log(`Updated Total Cash for ${month} ${year}: ${totalCashByMonthYear[key]}`);
}

// Example event listener for calculating total cash by month and year
document.addEventListener('DOMContentLoaded', function() {
  const submitBtn = document.getElementById('submit-tenant-btn');
  submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract values from the form
    const tenantName = document.getElementById('tenant-name-input').value;
    const monthlyRent = parseFloat(document.getElementById('monthly-rent').value);
    const monthName = document.getElementById('month-name').value;
    const yearOfPayment = parseInt(document.getElementById('year-of-payment').value);

    console.log(`Tenant Name: ${tenantName}`);
    console.log(`Monthly Rent: ${monthlyRent}`);
    console.log(`Month Name: ${monthName}`);
    console.log(`Year of Payment: ${yearOfPayment}`);

    // Perform calculations or further processing
    processTenantData(monthName, yearOfPayment, monthlyRent);
  });
});

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

// Retrieve the total cash data from localStorage
let totalCashByMonthYear = JSON.parse(localStorage.getItem('totalCashByMonthYear')) || {};

// Log the total cash data to ensure it's being retrieved correctly
console.log('Total Cash by Month and Year:', totalCashByMonthYear);
// Function to display total cash on the webpage
function displayTotalCash() {
  const totalCashContainer = document.getElementById('total-cash-container');
  totalCashContainer.innerHTML = ''; // Clear previous entries
  const storedData = localStorage.getItem('totalCashByMonthYear');
  const totalCashByMonthYear = storedData ? JSON.parse(storedData) : {};

  for (const monthYear in totalCashByMonthYear) {
      const totalCash = totalCashByMonthYear[monthYear];
      const [month, year] = monthYear.split('-');
      const totalCashEntry = document.createElement('div');
      totalCashEntry.classList.add('total-cash-entry');
      totalCashEntry.innerHTML = `Total cash for ${month} ${year}: ${totalCash} taka <button class="delete-cash-btn">Delete</button>`;
      totalCashContainer.appendChild(totalCashEntry);
  }
}


document.getElementById('total-cash-container').addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-cash-btn')) {
      const totalCashEntry = event.target.parentElement;
      const textContent = totalCashEntry.textContent;
      const regex = /Total cash for (.*):/;
      const match = textContent.match(regex);

      if (match) {
          let monthYear = match[1].trim(); // Ensure we trim any extra whitespace
          monthYear = monthYear.replace(' ', '-'); // Replace space with hyphen to match stored key format

          console.log('Attempting to delete key:', monthYear);
          console.log('Current keys in storage:', Object.keys(totalCashByMonthYear));

          // Check if the key exists before attempting to delete
          if (totalCashByMonthYear.hasOwnProperty(monthYear)) {
              // Remove the entry from the DOM
              totalCashEntry.remove();

              // Remove the entry from localStorage
              delete totalCashByMonthYear[monthYear];
              localStorage.setItem('totalCashByMonthYear', JSON.stringify(totalCashByMonthYear));
              console.log('Updated Total Cash by Month and Year:', totalCashByMonthYear);
          } else {
              console.error('Failed to delete from localStorage: Key does not exist', monthYear);
          }
      }
  }
});


document.addEventListener('DOMContentLoaded', displayTotalCash);
// Event listener for the clear all data button
if (document.getElementById('clear-all-data-btn')) {
  console.log('Button is found');
} else {
  console.log('Button is not found');
}
document.getElementById('clear-all-data-btn').addEventListener('click', () => {
  console.log('Clear button clicked'); // Check if this logs when the button is clicked

  // Clear all data from localStorage
  localStorage.clear();
  
  // Clear the object without reassigning
  for (const key in totalCashByMonthYear) {
    delete totalCashByMonthYear[key];
  }

  // Update the display to reflect the cleared data
  displayTotalCash();

  console.log('All data cleared from localStorage and UI updated.');
});

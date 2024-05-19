const info=document.querySelector('#info');
info.addEventListener("click",()=>{
  window.location.href = 'main_page.html';
});


const cash=document.querySelector('#cash');
cash.addEventListener("click",()=>{
  window.location.href = 'total_cash.html';
});


const distribution=document.querySelector('#distribution');
distribution.addEventListener("click",()=>{
  window.location.href = 'cash_dish.html';
});


// Get the modal element
const modal = document.getElementById('cash-distribution-modal');

// Get the button that opens the modal
const distributeCashBtn = document.getElementById('distribute-cash-btn');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
distributeCashBtn.onclick = function() {
  modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Function to create name input fields dynamically
function createNameInputs(numPeople) {
    const container = document.getElementById('nameInputs');
    container.innerHTML = ''; // Clear existing inputs if any

    for (let i = 0; i < numPeople; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Name of person ${i + 1}`;
        input.id = `person${i + 1}`;
        container.appendChild(input);
    }
}

// Event listener for a button to set the number of people
document.addEventListener('DOMContentLoaded', function() {
    const setPeopleBtn = document.getElementById('setPeopleBtn');
    if (setPeopleBtn) {
        setPeopleBtn.addEventListener('click', () => {
            const numPeople = parseInt(document.getElementById('numPeople').value);
            createNameInputs(numPeople);
        });
    } else {
        console.error('The element #setPeopleBtn does not exist.');
    }
});

document.getElementById('submitDistributionBtn').addEventListener('click', function() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const totalCashByMonthYear = JSON.parse(localStorage.getItem('totalCashByMonthYear')) || {};
    const totalCash = totalCashByMonthYear[`${month}-${year}`] || 0;
    const cashPerPerson = totalCash / numPeople;

    const names = [];
    for (let i = 0; i < numPeople; i++) {
        const name = document.getElementById(`person${i + 1}`).value;
        if (name) {
            names.push({ name: name, cash: cashPerPerson });
        }
    }

    // Store the names and cash distribution in localStorage
    const key = `${month}-${year}`;
    const existingData = JSON.parse(localStorage.getItem('namesData')) || {};
    existingData[key] = names;
    // Ensure data is being updated correctly in localStorage
    console.log("Saving data for", key, ":", names);
    localStorage.setItem('namesData', JSON.stringify(existingData));

    console.log(`Data for ${month}-${year}:`, names);
});

function displayNamesAndCash(month, year) {
    const key = `${month}-${year}`;
    const data = JSON.parse(localStorage.getItem('namesData'))[key] || [];

    console.log(`Retrieved data for display: ${month}-${year}`, data);

    const displayContainer = document.getElementById('displayContainer');
    displayContainer.innerHTML = ''; // Clear previous contents

    if (data.length === 0) {
        displayContainer.innerHTML = '<p>No data available.</p>';
        return;
    }

    data.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person-entry');
        personDiv.innerHTML = `<strong>Name:</strong> ${person.name}, <strong>Cash:</strong> $${person.cash.toFixed(2)}`;
        displayContainer.appendChild(personDiv);
    });
}

document.getElementById('displayDataBtn').addEventListener('click', function() {
    const month = document.getElementById('inputMonth').value;
    const year = document.getElementById('inputYear').value;

    if (month && year) {
        displayNamesAndCash(month, year);
    } else {
        console.error('Please enter both month and year.');
    }
});

function distributeCash(month, year) {
    const key = `${month}-${year}`;
    const data = JSON.parse(localStorage.getItem('totalCashByMonthYear')) || {};
    console.log(`Distributing cash for ${key}:`, data[key]);

    if (!data[key]) {
        console.error(`No data available for ${key}`);
        return;
    }

    // Continue with distribution logic
}

function saveCashData(month, year, cashData) {
    const key = `${month}-${year}`;
    localStorage.setItem(key, JSON.stringify(cashData));
}


// Retrieve the tenant data from localStorage
const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
console.log('Tenants data:', tenants);
// Further processing of tenants data for the specific page functionality


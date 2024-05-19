const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Save user data on sign up
signUpForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const username = signUpForm.querySelector('input[type="text"]').value;
  const password = signUpForm.querySelector('input[type="password"]').value;
  const email = signUpForm.querySelector('input[type="email"]').value;

  // Save credentials in local storage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  localStorage.setItem('email', email);

  // Redirect to main page
  window.location.href = 'main_page.html';
});

// Check user data on sign in
signInForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const username = signInForm.querySelector('input[type="text"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;

  // Retrieve credentials from local storage
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Validate credentials
  if(username === storedUsername && password === storedPassword) {
    // Redirect to main page
    window.location.href = 'main_page.html';
  } else {
    alert('Incorrect username or password!');
  }
});
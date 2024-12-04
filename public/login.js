let users = []; // To store fetched users

async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3000/users.json"); // Adjust the URL if needed
    if (!response.ok) throw new Error("Failed to load user data.");
    users = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

function saveEmployeeNumber(empNumber) {
  localStorage.setItem("empNumber", empNumber);
}

function clearEmployeeNumber() {
  localStorage.removeItem("empNumber");
  document.getElementById("number").value = "";
}

function populateEmployeeNumber() {
  const storedEmpNumber = localStorage.getItem("empNumber");
  if (storedEmpNumber) {
    document.getElementById("number").value = storedEmpNumber;
  }
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
}

async function OnSubmit(event) {
  event.preventDefault(); // Prevent form submission
  const empNumber = document.getElementById("number").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("errorMessage");

  errorDiv.innerHTML = ""; // Clear previous errors

  if (empNumber.length !== 9 || isNaN(empNumber)) {
      errorDiv.innerHTML += "<br/>Employee number must be a 9-digit number.";
      clearEmployeeNumber();
      return;
  }

  if (!password) {
      errorDiv.innerHTML += "<br/>Password cannot be empty.";
      return;
  }

  const passwordHash = await hashPassword(password);

  // Validate user credentials
  const user = users.find(u => u.userID === empNumber);
  if (!user) {
    errorDiv.innerHTML += "<br/>Invalid employee number.";
    clearEmployeeNumber();
    return;
  }

  const storedPasswordHash = await hashPassword(user.password); // Hash the stored password
  if (passwordHash !== storedPasswordHash) {
    errorDiv.innerHTML += "<br/>Invalid password.";
    clearEmployeeNumber();
    return;
  }

  // Save employee number for stickiness
  saveEmployeeNumber(empNumber);

  // Redirect on successful login
  alert("Login successful!");
  window.location.href = "employee.html"; // Replace with actual dashboard URL
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchUsers();
  populateEmployeeNumber();
});
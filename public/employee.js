// employee.js
async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/users.json'); // Adjust the URL if needed
    if (!response.ok) throw new Error('Failed to load user data.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

function getLoggedInAdminID() {
  return localStorage.getItem('empNumber'); // Assume the admin's ID is stored during login
}

function findRelatedEmployees(users, adminID) {
  return users.filter(user => user.adminID === adminID);
}

function displayEmployees(employees) {
  const container = document.getElementById('employeeContainer');
  container.innerHTML = ''; // Clear any existing content

  employees.forEach(employee => {
    const cardHTML = `
      <div class="col">
        <div class="card h-100">
          <img src="${employee.imagePath || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${employee.fullName}">
          <div class="card-body">
            <h5 class="card-title">${employee.fullName}</h5>
          </div>
        </div>
      </div>`;
    container.innerHTML += cardHTML;
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchUsers();
  const adminID = getLoggedInAdminID();

  if (!adminID) {
    alert('No admin is logged in.');
    return;
  }

  const employees = findRelatedEmployees(users, adminID);
  displayEmployees(employees);
});

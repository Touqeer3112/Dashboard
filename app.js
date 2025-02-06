function signup() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  if (name && email && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

    
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('login-form').style.display = 'block';
  } else {
      alert("Please fill in all fields");
  }
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userFound = users.find(user => user.email === email && user.password === password);

  if (userFound) {
      
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';

    
      loadUserData();
  } else {
      alert("Invalid credentials, please try again.");
  }
}


function loadUserData() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userTableBody = document.getElementById("user-table-body");

  userTableBody.innerHTML = '';
  const recentUsers = users.slice(-5); 

  recentUsers.forEach((user, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
          <td>${users.length - recentUsers.length + index + 1}</td> <!-- Display serial number -->
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>*****</td> <!-- Masked password -->
      `;
      userTableBody.appendChild(row);
  });
}

function clearUserData() {
    if (confirm("Are you sure you want to clear all user data?")) {
        localStorage.removeItem("users"); 
        loadUserData(); 
    }
}
if (window.location.pathname === "/dashboard.html") {
  loadUserData();
}






document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const passwordForm = document.getElementById('passwordForm');
  const passwordManager = document.getElementById('passwordManager');
  const passwordList = document.getElementById('passwordList');

  registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;

      const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          alert('Registration successful!');
      } else {
          alert('Registration failed!');
      }
  });

  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          alert('Login successful!');
          showPasswordManager();
          loadPasswords();
      } else {
          alert('Login failed!');
      }
  });

  passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const website = document.getElementById('website').value;
      const password = document.getElementById('password').value;
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/api/passwords', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
          },
          body: JSON.stringify({ website, password })
      });

      if (response.ok) {
          loadPasswords();
      } else {
          alert('Failed to add password!');
      }
  });

  function showPasswordManager() {
      document.getElementById('register').classList.add('hidden');
      document.getElementById('login').classList.add('hidden');
      passwordManager.classList.remove('hidden');
  }

  async function loadPasswords() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/passwords', {
          headers: { 'x-auth-token': token }
      });

      if (response.ok) {
          const passwords = await response.json();
          passwordList.innerHTML = '';
          passwords.forEach(pw => {
              const li = document.createElement('li');
              li.textContent = `${pw.website}: ${pw.password}`;
              passwordList.appendChild(li);
          });
      } else {
          alert('Failed to load passwords!');
      }
  }
});

function renderLogin(app) {
  app.innerHTML = `
    <div class="container">
      <h2>Вход</h2>
      <input id="username" placeholder="Имя пользователя">
      <button onclick="login()">Войти</button>
    </div>
  `;
}

function login() {
  const name = document.getElementById('username').value.trim();
  if (!name) return alert('Введите имя');
  db.currentUser = name;
  if (!db.users.includes(name)) db.users.push(name);
  utils.save();
  location.hash = '/';
}

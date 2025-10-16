function render() {
  const { path } = utils.parseHash();
  const app = document.getElementById('app');
  document.getElementById('user').innerText = db.currentUser ? `👤 ${db.currentUser}` : '';

  if (path === '/' || path === '') renderHome(app);
  else if (path === '/login') renderLogin(app);
  else if (path === '/create') renderCreate(app);
  else if (path.startsWith('/take')) renderTake(app);
  else if (path === '/stats') renderStats(app);
  else app.innerHTML = `<div class="container"><h2>404</h2></div>`;
}

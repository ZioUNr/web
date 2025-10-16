const db = {
  users: [],
  surveys: [],
  results: [],
  currentUser: null,
};

const utils = {
  uid: () => Math.random().toString(36).substr(2, 9),
  parseHash: () => {
    const [path, query] = location.hash.slice(1).split('?');
    const params = new URLSearchParams(query);
    return { path, params };
  },
  save: () => localStorage.setItem("spa-survey", JSON.stringify(db)),
  load: () => Object.assign(db, JSON.parse(localStorage.getItem("spa-survey") || "{}")),
};

function render() {
  const { path } = utils.parseHash();
  const app = document.getElementById('app');
  document.getElementById('user').innerText = db.currentUser ? `👤 ${db.currentUser}` : '';

  if (path === '/' || path === '') renderHome(app);
  else if (path === '/login') renderLogin(app);
  else if (path === '/create') renderCreate(app);
  else if (path.startsWith('/take')) renderTake(app);
  else app.innerHTML = `<div class="container"><h2>404</h2></div>`;
}

function renderHome(app) {
  app.innerHTML = `<div class="container"><h2>Опросы</h2>${db.surveys.map(s =>
    `<div><a href="#/take?id=${s.id}">${s.title}</a></div>`).join('') || '<p>Пока нет опросов</p>'}</div>`;
}

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

function renderCreate(app) {
  if (!db.currentUser) return location.hash = '/login';
  app.innerHTML = `
    <div class="container">
      <h2>Создать опрос</h2>
      <input id="title" placeholder="Название опроса">
      <textarea id="options" placeholder="Варианты (по одному в строке)"></textarea>
      <button onclick="createSurvey()">Создать</button>
    </div>
  `;
}

function createSurvey() {
  const title = document.getElementById('title').value.trim();
  const options = document.getElementById('options').value.trim().split('\n').filter(x => x);
  if (!title || options.length < 2) return alert('Введите заголовок и хотя бы 2 варианта!');
  db.surveys.push({ id: utils.uid(), title, options });
  utils.save();
  location.hash = '/';
}

function renderTake(app) {
  const id = utils.parseHash().params.get('id');
  const s = db.surveys.find(x => x.id === id);
  if (!s) return app.innerHTML = '<div class="container">Опрос не найден</div>';
  app.innerHTML = `
    <div class="container">
      <h2>${s.title}</h2>
      ${s.options.map(o => `<button onclick="vote('${id}','${o}')">${o}</button>`).join('')}
    </div>
  `;
}

function vote(id, option) {
  const user = db.currentUser;
  if (!user) return location.hash = '/login';
  const existing = db.results.find(r => r.user === user && r.id === id);
  if (existing) return alert('Вы уже голосовали!');
  db.results.push({ id, user, option });
  utils.save();
  alert('Ваш голос засчитан!');
  location.hash = '/';
}

window.addEventListener('hashchange', render);
window.addEventListener('load', () => {
  utils.load();
  render();
});

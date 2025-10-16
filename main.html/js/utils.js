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

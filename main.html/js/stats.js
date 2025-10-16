function renderStats(app) {
  app.innerHTML = `
    <div class="container">
      <h2>Статистика</h2>
      ${db.surveys.map(s => {
        const votes = db.results.filter(r => r.id === s.id);
        const counts = s.options.map(o => ({
          option: o,
          votes: votes.filter(v => v.option === o).length,
        }));
        return `
          <div style="margin-bottom:20px">
            <h3>${s.title}</h3>
            <ul>
              ${counts.map(c => `<li>${c.option}: ${c.votes}</li>`).join('')}
            </ul>
          </div>
        `;
      }).join('') || '<p>Пока нет опросов</p>'}
    </div>
  `;
}

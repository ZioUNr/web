const categories = [
  {
    name: "🎨 Цвета и фрукты",
    quizzes: [
      {
        title: "🌈 Предпочтения цветов",
        questions: [
          { text: "Какой твой любимый цвет? 🎨", options: ["Красный ❤️", "Синий 💙", "Зелёный 💚"] },
          { text: "Какой твой любимый фрукт? 🍎", options: ["Яблоко 🍏", "Банан 🍌", "Апельсин 🍊"] },
          { text: "Какой вид отдыха предпочитаешь? 🏖️", options: ["Активный 🏃‍♂️", "Пасивный 🛋️", "Смешанный 🌤️"] }
        ]
      }
    ]
  },
  {
    name: "🎬 Досуг",
    quizzes: [
      {
        title: "🎥 Фильмы и развлечения",
        questions: [
          { text: "Любимый жанр фильма? 🎞️", options: ["Боевик 🔫", "Комедия 😂", "Драма 😢"] },
          { text: "Где предпочитаешь проводить время? 🌍", options: ["На улице 🌳", "Дома 🏠", "В путешествиях ✈️"] },
          { text: "Любимый напиток? 🥤", options: ["Кофе ☕", "Чай 🍵", "Сок 🧃"] }
        ]
      }
    ]
  }
];

// Секции
const categoriesSection = document.getElementById("categoriesSection");
const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");
const profileSection = document.getElementById("profileSection");
const statsSection = document.getElementById("statsSection");

function hideAllSections() {
  categoriesSection.style.display = "none";
  quizSection.style.display = "none";
  resultSection.style.display = "none";
  profileSection.style.display = "none";
  statsSection.style.display = "none";
}

// Показ категорий
function showCategories() {
  hideAllSections();
  categoriesSection.style.display = "flex";
  let html = "<h2>📂 Выберите категорию</h2><div class='flex-grid'>";
  categories.forEach((cat,i)=>{
    html += `<div class='category-card' data-cat='${i}'>${cat.name}</div>`;
  });
  html += "</div>";
  categoriesSection.innerHTML = html;

  document.querySelectorAll(".category-card").forEach(card=>{
    card.addEventListener("click",()=>{
      const idx = card.getAttribute("data-cat");
      showQuizzes(idx);
    });
  });
}

// Показ опросов в категории
function showQuizzes(catIndex) {
  hideAllSections();
  categoriesSection.style.display = "flex";
  const cat = categories[catIndex];
  let html = `<h2>📝 ${cat.name}</h2><div class='flex-grid'>`;
  cat.quizzes.forEach((quiz,i)=>{
    html += `<div class='category-card' data-quiz='${i}' data-cat='${catIndex}'>${quiz.title}</div>`;
  });
  html += "</div>";
  categoriesSection.innerHTML = html;

  document.querySelectorAll(".category-card").forEach(card=>{
    card.addEventListener("click",()=>{
      const qIdx = card.getAttribute("data-quiz");
      const cIdx = card.getAttribute("data-cat");
      showQuiz(categories[cIdx].quizzes[qIdx]);
    });
  });
}

// Показ опроса
function showQuiz(quiz) {
  hideAllSections();
  quizSection.style.display = "flex";
  let html = `<h2>${quiz.title}</h2><form id='quizForm'>`;
  quiz.questions.forEach((q,i)=>{
    html += `<div class='question-card'><p>${q.text}</p>`;
    q.options.forEach(opt=>{
      html += `<label><input type='radio' name='q${i}' value='${opt}'> ${opt}</label>`;
    });
    html += "</div>";
  });
  html += `<button type='button' id='submitQuiz'>✅ Отправить</button></form>`;
  quizSection.innerHTML = html;

  document.getElementById("submitQuiz").onclick = ()=>{
    const form = document.getElementById("quizForm");
    const results = {};
    quiz.questions.forEach((q,i)=>{
      results[q.text] = form[`q${i}`].value || "Не выбран";
    });
    showResults(results);
  }
}

// Показ результатов
function showResults(results){
  hideAllSections();
  resultSection.style.display = "flex";
  let html = "<h2>📊 Ваши ответы:</h2><ul>";
  for(const q in results){
    html += `<li><strong>${q}</strong>: ${results[q]}</li>`;
  }
  html += "<button id='backBtn'>🔙 Вернуться к категориям</button></ul>";
  resultSection.innerHTML = html;

  document.getElementById("backBtn").onclick = showCategories;
}

// Главное меню
document.getElementById("menuCategories").onclick = showCategories;
document.getElementById("menuProfile").onclick = ()=>{
  hideAllSections();
  profileSection.style.display = "flex";
  profileSection.innerHTML = "<h2>👤 Профиль пользователя</h2><p>Пользователь по умолчанию</p>";
}
document.getElementById("menuStats").onclick = ()=>{
  hideAllSections();
  statsSection.style.display = "flex";
  statsSection.innerHTML = "<h2>📊 Статистика</h2><p>Пока нет данных для статистики</p>";
}

// Инициализация
showCategories();

// Простая логика мультишаговой формы + localStorage + Chart.js
steps.forEach(s=> s.classList.add('hidden'));
steps[i].classList.remove('hidden');
prevBtn.style.display = i===0? 'none':'inline-block';
nextBtn.classList.toggle('hidden', i===steps.length-1);
submitBtn.classList.toggle('hidden', i!==steps.length-1);
}
showStep(current);
prevBtn.addEventListener('click', ()=>{ if(current>0){current--; showStep(current);} });
nextBtn.addEventListener('click', ()=>{ if(current<steps.length-1){current++; showStep(current);} });

form.addEventListener('submit', e =>{
e.preventDefault();
// Валидация: первый вопрос обязателен
const like = form.elements['like'].value;
const errLike = document.querySelector('.error[data-for="like"]');
errLike.textContent = '';
if(!like){ errLike.textContent = 'Пожалуйста, выберите вариант.'; current=0; showStep(0); return; }

const data = {
like: +like,
improve: form.elements['improve'].value.trim(),
email: form.elements['email'].value.trim(),
ts: Date.now()
};

// Сохраняем локально (можно заменить на fetch POST API)
const all = JSON.parse(localStorage.getItem('survey_data')||'[]');
all.push(data);
localStorage.setItem('survey_data', JSON.stringify(all));

// Показать результаты
showResults(all);
});

function showResults(all){
surveyCard.classList.add('hidden');
resultCard.classList.remove('hidden');
// Подготовим агрегацию по оценкам 1-5
const counts = [0,0,0,0,0];
all.forEach(a=>{ if(a.like>=1 && a.like<=5) counts[a.like-1]++; });
const ctx = document.getElementById('resultsChart').getContext('2d');
// Уничтожить старую диаграмму, если есть
if(window._surveyChart) window._surveyChart.destroy();
window._surveyChart = new Chart(ctx, {
type: 'bar',
data: {
labels: ['1','2','3','4','5'],
datasets: [{ label: 'Кол-во голосов', data: counts }]
},
options: { responsive:true, maintainAspectRatio:false }
});
}

// Сброс
document.getElementById('resetBtn').addEventListener('click', ()=>{
if(confirm('Сбросить все результаты?')){ localStorage.removeItem('survey_data'); alert('Результаты удалены'); location.reload(); }
});

// Пройти ещё раз
document.getElementById('backToSurvey').addEventListener('click', ()=>{ resultCard.classList.add('hidden'); surveyCard.classList.remove('hidden'); current=0; showStep(current); });

// Если есть уже данные — автоматически показать результаты
const existing = JSON.parse(localStorage.getItem('survey_data')||'[]');
if(existing.length>0){ showResults(existing); }
//Голова
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
  });
  //Конец головы
  
  //Кпонка расчитать
  function scrollToSection() {
      document.getElementById('about-us').scrollIntoView({ 
          behavior: 'smooth' // Плавная прокрутка
      });
  }
  //Конец кнопки расчитать
  
  
  //Всплывающее окно
  const overlay = document.getElementById('popup-overlay');
  const closeBtn = document.getElementById('close-popup-btn');
  const openBtn = document.getElementById('open-popup-btn');
  const form = document.getElementById('popup-form');
  
  // Открыть окно
  function openPopup() {
    overlay.style.display = 'flex';
  }
  
  // Закрыть окно
  function closePopup() {
    overlay.style.display = 'none';
  }
  
  // Открытие по кнопке
  if (openBtn) {
    openBtn.addEventListener('click', openPopup);
  }
  
  // Закрытие по крестику
  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }
  
  // Закрытие при клике вне окна
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup();
    }
  });
  
 // Автооткрытие через 3 секунды (только если заявка ещё не отправлена)
setTimeout(() => {
  if (!localStorage.getItem('coffeemath_form_submitted')) {
    openPopup();
  }
}, 3000);
  
  
  const openButtons = document.querySelectorAll('.trigger-btn'); // класс, общий для обеих кнопок
  
  openButtons.forEach(btn => {
    btn.addEventListener('click', openPopup);
  });
  
  //Конец всплывающего окна
  
  
  //Кнопки
  const buttons = document.querySelectorAll('.course-btn');
  
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const contentBlock = document.getElementById(targetId);
            
            // Переключаем классы
            this.classList.toggle('active');
            contentBlock.classList.toggle('show');
            
            // Если хотите, чтобы открывался только один блок за раз (гармошка),
            // раскомментируйте код ниже:
            
            buttons.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                    const otherTarget = otherBtn.getAttribute('data-target');
                    document.getElementById(otherTarget).classList.remove('show');
                }
            });
            
        });
    });
  //Конец кнопок
  
  //Калькулятор
  function calculatePriceCustom() {
    // Получаем значения из кастомных селектов
    const frequencyEl = document.querySelector('.custom-select[data-select="frequency"] .select-selected');
    const durationEl = document.querySelector('.custom-select[data-select="duration"] .select-selected');
    const courseEl = document.querySelector('.custom-select[data-select="course"] .select-selected');

    // Определяем выбранные значения
    const frequencyText = frequencyEl.textContent.trim();
    const durationText = durationEl.textContent.trim();
    const courseText = courseEl.textContent.trim();

    // Преобразуем в числа
    let frequency = 2; // по умолчанию
    if (frequencyText.includes('1')) frequency = 1;
    else if (frequencyText.includes('2')) frequency = 2;
    else if (frequencyText.includes('3')) frequency = 3;

    let durationMonths = 12; // по умолчанию
    const match = durationText.match(/(\d+)/);
    if (match) durationMonths = parseInt(match[1]);

    let pricePerLesson = 900; // по умолчанию
    if (courseText.includes('ОГЭ')) pricePerLesson = 1000;
    else if (courseText.includes('ЕГЭ (Базовый)')) pricePerLesson = 1200;
    else if (courseText.includes('ЕГЭ (Профельный)')) pricePerLesson = 1500;
    else if (courseText.includes('Высшая')) pricePerLesson = 1500;
    else if (courseText.includes('6') || courseText.includes('7') || courseText.includes('8')) pricePerLesson = 900;
    // для 5 класса тоже 900

    const weeksInMonth = 4.33;
    const totalLessons = Math.round(frequency * durationMonths * weeksInMonth);
    const totalPrice = totalLessons * pricePerLesson;

    const formattedPrice = new Intl.NumberFormat('ru-RU').format(totalPrice);
    const formattedLessonPrice = new Intl.NumberFormat('ru-RU').format(pricePerLesson);

    document.getElementById('total-price').innerText = `${formattedPrice} ₽`;
    document.getElementById('details').innerText =
        `${formattedLessonPrice} ₽ за занятие × ${totalLessons} занятий (${durationMonths} мес., ${frequency} раз/нед.)`;
}
// Кастомные селекты: открытие/закрытие
document.querySelectorAll('.custom-select').forEach(sel => {
  const selected = sel.querySelector('.select-selected');
  const items = sel.querySelector('.select-items');

  selected.addEventListener('click', function(e) {
      e.stopPropagation();
      // Закрываем все другие открытые
      document.querySelectorAll('.custom-select.active').forEach(s => {
          if (s !== sel) s.classList.remove('active');
      });
      sel.classList.toggle('active');
  });

  // Выбор пункта
  items.querySelectorAll('div').forEach(opt => {
      opt.addEventListener('click', function(e) {
          e.stopPropagation();
          // Обновляем текст выбранного
          selected.textContent = this.textContent.trim();
          // Убираем класс selected у всех опций
          items.querySelectorAll('div').forEach(el => el.classList.remove('selected'));
          this.classList.add('selected');
          // Закрываем список
          sel.classList.remove('active');
          // Автоматически пересчитываем стоимость (опционально)
          if (typeof calculatePriceCustom === 'function') {
              calculatePriceCustom();
          }
      });
  });
});

// Закрытие при клике вне селекта
document.addEventListener('click', function() {
  document.querySelectorAll('.custom-select.active').forEach(sel => {
      sel.classList.remove('active');
  });
});
  //Конец калькулятора
  
  //Блок с вопросами
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Переключаем класс active у кнопки
            this.classList.toggle('active');
            
            // Находим соседний блок с ответом
            const panel = this.nextElementSibling;
            
            // Переключаем класс show у панели
            if (panel.classList.contains('show')) {
                panel.classList.remove('show');
            } else {
                panel.classList.add('show');
            }
        });
    });
  //Конец блока с вопросами

// Гугл таблица

// === НАСТРОЙКИ GOOGLE TABLES ===
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyDCS67hhYCEZwyYfvYWHu0q7BCurjdg_bOVbp92qn-UovvvL90LY9QqxVyZpT57fJILQ/exec';

// === ФУНКЦИЯ ОТПРАВКИ ===
async function sendToGoogleSheets(name, phone) {
  const response = await fetch(GOOGLE_SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors', // Важно для обхода CORS
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone })
  });
  // При mode: 'no-cors' мы не можем прочитать ответ, поэтому просто возвращаем успех
  return { ok: true };
}

// === ОБРАБОТЧИК ФОРМЫ (используем существующую переменную form) ===
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.textContent = 'Отправка...';
  submitBtn.disabled = true;

  const name = form.querySelector('input[name="name"]').value.trim();
  const phone = form.querySelector('input[name="phone"]').value.trim();

  if (!name || !phone) {
    alert('Заполните все поля!');
    submitBtn.textContent = 'Отправить заявку';
    submitBtn.disabled = false;
    return;
  }

  try {
    await sendToGoogleSheets(name, phone);
    localStorage.setItem('coffeemath_form_submitted', 'true');
    // ✅ Вместо alert показываем красивое окно
    openSuccessPopup();
    form.reset();
    closePopup(); // закрываем основное окно
  } catch (error) {
    alert('❌ Не удалось отправить заявку. Попробуйте позвонить нам по телефону.');
    console.error(error);
  }
   finally {
    submitBtn.textContent = 'Отправить заявку';
    submitBtn.disabled = false;
  }
});

// === ОКНО УСПЕШНОЙ ОТПРАВКИ ===
const successOverlay = document.getElementById('popup-success');
const closeSuccessBtn = document.getElementById('close-success-btn');

function openSuccessPopup() {
    successOverlay.style.display = 'flex';
    // Автоматически закрыть через 4 секунды
    setTimeout(closeSuccessPopup, 4000);
}

function closeSuccessPopup() {
    successOverlay.style.display = 'none';
}

// Закрытие по кнопке
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeSuccessPopup);
}

// Закрытие по клику вне окна
successOverlay.addEventListener('click', (e) => {
    if (e.target === successOverlay) {
        closeSuccessPopup();
    }
});
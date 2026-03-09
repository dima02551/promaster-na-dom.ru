/* ============================================================
   МАСТЕР НА ДОМ — JavaScript (script.js)
   ============================================================ */

// ---- 1. БУРГЕР-МЕНЮ (мобильная кнопка «три полоски») ----
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', function () {
  mobileNav.classList.toggle('open');
});

function closeMenu() {
  mobileNav.classList.remove('open');
}

// Закрываем меню при клике вне него
document.addEventListener('click', function (e) {
  if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('open');
  }
});


// ---- 2. ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ ПРИ СКРОЛЛЕ ----
// Когда пользователь прокручивает страницу вниз — блоки плавно появляются
const fadeElements = document.querySelectorAll(
  '.service-card, .why-card, .how-step, .contact__item, .hero__badges .badge'
);

fadeElements.forEach(function (el) {
  el.classList.add('fade-in');
});

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

fadeElements.forEach(function (el) {
  observer.observe(el);
});


// ---- 3. ФОРМА ЗАЯВКИ ----
function sendForm(event) {
  // Останавливаем стандартную отправку формы (без этого страница перезагрузится)
  event.preventDefault();

  var name = document.getElementById('name').value.trim();
  var phone = document.getElementById('phone').value.trim();

  // Проверяем, что поля заполнены
  if (name === '' || phone === '') {
    alert('Пожалуйста, заполните имя и телефон.');
    return;
  }

  // Показываем всплывающее окно с благодарностью
  showPopup();

  // Очищаем форму
  document.getElementById('contactForm').reset();

  // ПРИМЕЧАНИЕ ДЛЯ РАЗРАБОТЧИКА:
  // Здесь можно добавить отправку данных на почту через сервис Formspree.io
  // или любой другой сервис. Инструкции будут в следующем этапе.
}


// ---- 4. ВСПЛЫВАЮЩЕЕ ОКНО ----
function showPopup() {
  document.getElementById('popup').classList.add('active');
  // Блокируем скролл фона пока открыто окно
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
  document.body.style.overflow = '';
}

// Закрываем окно при клике на фон (вне белого блока)
document.getElementById('popup').addEventListener('click', function (e) {
  if (e.target === this) {
    closePopup();
  }
});

// Закрываем окно клавишей Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});


// ---- 5. МАСКА ТЕЛЕФОНА В ФОРМЕ ----
// Автоматически форматирует номер телефона при вводе
var phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function () {
  var digits = this.value.replace(/\D/g, ''); // оставляем только цифры

  if (digits.length === 0) {
    this.value = '';
    return;
  }

  // Если начинается с 8 или 7 — заменяем на +7
  if (digits[0] === '8' || digits[0] === '7') {
    digits = '7' + digits.slice(1);
  } else {
    digits = '7' + digits;
  }

  // Форматируем: +7-XXX-XXX-XX-XX
  var formatted = '+7';
  if (digits.length > 1) formatted += '-' + digits.slice(1, 4);
  if (digits.length > 4) formatted += '-' + digits.slice(4, 7);
  if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
  if (digits.length > 9) formatted += '-' + digits.slice(9, 11);

  this.value = formatted;
});


// ---- 6. ТЕКУЩИЙ ГОД В ПОДВАЛЕ ----
// Автоматически обновляет год в копирайте
var yearEl = document.querySelector('.footer__copy');
if (yearEl) {
  var currentYear = new Date().getFullYear();
  yearEl.textContent = '© ' + currentYear + ' Мастер на дом. Все права защищены.';
}

import * as transFn from './translate.js';

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const menuWrap = document.querySelector('.menu-wrap');
const menuWrapNoscroll = document.querySelector('.menu-wrap-noscroll');
const navLinks = document.querySelectorAll('.nav-link');
const languagesBlock = document.querySelector('.languages');

const portfolioList = document.querySelector('.portfolio-nav-list');
const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioBtns = document.querySelectorAll('.portfolio-nav-button');

const translateBtn = document.querySelectorAll('.language');

const themeChangeList = document.querySelectorAll('.dark-theme');
const btnsChangeList = document.querySelectorAll('.button-dark-theme');
const titlesChangeList = document.querySelectorAll('.title-dark-theme');
const changeThemeBtn = document.querySelector('.themes-button');
const closeIconLines = document.querySelectorAll('.line');
const background = document.querySelector('.background');
const btnEn = document.querySelector('.language-en');
const btnRu = document.querySelector('.language-ru');

let lang = "en";
let theme = "dark";

window.addEventListener('load', getLocalStorage);

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    checkTheme();
    localStorage.setItem('theme', theme);
}

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
      transFn.getTranslate(lang);
      translateBtn.forEach(function(item) {
          item.classList.remove("language-active");
      })
      if (lang == "en") {
        btnEn.classList.add("language-active");
      } else if (lang == "ru") {
        btnRu.classList.add("language-active");
      }
    }
    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
        if (theme == "dark" && background.classList.contains('background-light')) {
            changeTheme();
        } else if (theme == "light" && !(background.classList.contains('background-light'))) {
            changeTheme();
        }
    }
}

function checkTheme() {
    if (background.classList.contains('background-light')) {
        theme = "light";
    } else {
        theme = "dark";
    }
}

function checkLanguage() {
    if (background.classList.contains('background-light')) {
        theme = "light";
    } else {
        theme = "dark";
    }
}

changeThemeBtn.addEventListener('click', changeTheme);

function changeTheme() {
    themeChangeList.forEach(function(item) {
        item.classList.toggle('light-theme');
    });
    btnsChangeList.forEach(function(item) {
        item.classList.toggle('button-light-theme');
    });
    titlesChangeList.forEach(function(item) {
        item.classList.toggle('title-light-theme');
    });
    changeThemeBtn.classList.toggle('themes-button-dark');
    nav.classList.toggle('nav-light-theme');
    navLinks.forEach(function(item) {
        item.classList.toggle('nav-light-theme');
    });
    closeIconLines.forEach(function(item) {
        item.classList.toggle('line-light-theme');
    });
    background.classList.toggle('background-light');
    setLocalStorage();
}

translateBtn.forEach(function(item) {
    item.addEventListener('click', function(event) {
        translateBtn.forEach((item) => item.classList.remove('language-active'));
        event.target.classList.add('language-active');
        transFn.getTranslate(`${item.innerHTML}`);
        lang = item.innerHTML;
        setLocalStorage();
    });
})

portfolioBtns.forEach((item) => item.addEventListener('click', changePortfolioBtnActive));

function changePortfolioBtnActive(event) {
    portfolioBtns.forEach((item) => item.classList.remove('portfolio-nav-button-active'));
    event.target.classList.add('portfolio-nav-button-active');
}

preloadImages();

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    seasons.forEach(function(season) {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`;
        }
    })
}

portfolioList.addEventListener('click', changeImage);

function changeImage(event) {
    if(event.target.classList.contains('button')) {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
}

hamburger.addEventListener('click', toggleMenu);
navLinks.forEach((el) => el.addEventListener('click', closeMenu));

function toggleMenu() {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    menuWrap.classList.toggle('open');
    menuWrapNoscroll.classList.toggle('open');
    languagesBlock.classList.toggle('open');
    changeThemeBtn.classList.toggle('open');
}

function closeMenu() {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    menuWrap.classList.remove('open');
    menuWrapNoscroll.classList.remove('open');
    languagesBlock.classList.remove('open');
    changeThemeBtn.classList.remove('open');
}


console.log(`
1) Смена изображений в секции portfolio +25
Изображения разных времён года получаем из папок с соответствующими названиями
Изображения можно заменить на другие с целью улучшения качества созданного приложения
при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5

2) Перевод страницы на два языка +25
Для перевода можно воспользоваться файлом translate.js
Содержание файла можно редактировать или полностью изменить с целью улучшения качества созданного приложения
при клике по надписи ru англоязычная страница переводится на русский язык +10
при клике по надписи en русскоязычная страница переводится на английский язык +10
надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5

3) Переключение светлой и тёмной темы +25
Внешний вид тёмной темы соответствует макету, который верстали в предыдущих частях задания, внешний вид светлой темы соответствует одному из двух вариантов макетов на выбор. Баллы за оба варианта одинаковые, выбирайте тот, который больше нравится.
Вариант первый. Блоки и секции header, hero, contacts, footer остались без изменений, в оставшихся секциях цвет фона и шрифта поменялись местами: фон стал белым, шрифт черным Макет в figma - светлая тема - 1
Вариант второй. Изменения затронули все блоки и секции, в том числе поменялись фоновые изображения и есть два варианта меню на выбор Макет в figma - светлая тема - 2
На страницу добавлен переключатель при клике по которому:
тёмная тема приложения сменяется светлой +10
светлая тема приложения сменяется тёмной +10
после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5

4) Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5

5) Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5
Для получения максимального балла за пункт требований достаточно добавить кнопкам только один эффект.

Моя оценка: 85 баллов
`);
import {ecosystem} from "./ecosystem.js";

ecosystem();

const html = document.documentElement;
const menuBtn = document.querySelector('.menu-btn');
const headerNav = document.querySelector('.header__nav.mobile');
const anchors = document.querySelectorAll('a.header__link.mobile');

menuBtn.addEventListener('click', () => {
  menuBtn.blur();
  html.classList.toggle('active');
  menuBtn.classList.toggle('active');
  headerNav.classList.toggle('active');
});

function scrollToTarget(targetId) {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    html.classList.remove('active');
    headerNav.classList.remove('active');
    menuBtn.classList.remove('active');
    setTimeout(() => {
      const targetOffset = targetSection.offsetTop - 80;
      window.scrollTo({top: targetOffset, behavior: 'smooth'});
    }, 400);
  }
}

function handleAnchorClick(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const hrefParts = href.split('#');
  if (hrefParts.length === 2) {
    const targetId = '#' + hrefParts[1];
    scrollToTarget(targetId);
  }
}

for (const anchor of anchors) {
  anchor.addEventListener('click', handleAnchorClick);
  anchor.addEventListener('touchstart', handleAnchorClick, {passive: true});
}

document.querySelectorAll(".desktop").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Отключаем стандартный якорный переход

    const targetId = link.getAttribute("href").slice(1); // Получаем ID целевой секции
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 40; // Вычисляем позицию с отступом

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth" // Плавный скролл
      });
    }
  });
});
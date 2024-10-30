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

document.addEventListener('DOMContentLoaded', function () {
  const faqButtons = document.querySelectorAll('[data-faq-btn]');
  const faqBodies = document.querySelectorAll('.faq__body');

  if (faqBodies.length === 0) {
    console.error("Error: The expected '.faq__body' element was not found.");
    return;
  }

  faqBodies.forEach(faqBody => {
    if (faqBody.classList.contains('faq__body--active')) {
      updateTabIndexes(faqBody, false);
      faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
    } else {
      updateTabIndexes(faqBody, true);
    }
  });

  faqButtons.forEach(button => {
    button.addEventListener('click', function () {
      const faqItem = button.closest('.faq__item');
      const faqBody = faqItem.querySelector('.faq__body');
      const faqBtn = faqItem.querySelector('.faq__btn');

      faqBodies.forEach((body, index) => {
        const otherButton = faqButtons[index];

        if (body !== faqBody) {
          body.style.maxHeight = '0px';
          body.classList.remove('faq__body--active');
          otherButton.classList.remove('active');
          updateTabIndexes(body, true);
        }
      });

      if (faqBody.classList.contains('faq__body--active')) {
        faqBody.style.maxHeight = '0px';
        faqBody.classList.remove('faq__body--active');
        faqBtn.classList.remove('active');
        updateTabIndexes(faqBody, true);
      } else {
        faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
        faqBody.classList.add('faq__body--active');
        faqBtn.classList.add('active');
        updateTabIndexes(faqBody, false);
      }
    });
  });

  function updateTabIndexes(container, isHidden) {
    const focusableElements = container.querySelectorAll('a, button, input, [tabindex]');
    focusableElements.forEach(el => {
      if (isHidden) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
});
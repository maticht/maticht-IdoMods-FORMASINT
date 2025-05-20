import { EXTRA_SCROLL_VALUE } from "./constants.js";

document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href^="#"]');
  if (link && !link.hasAttribute('download') && link.getAttribute('href') !== '#') {
    const targetId = link.getAttribute('href').slice(1);
    const targetEl =
      document.getElementById(targetId) ||
      document.querySelector(targetId) ||
      document.querySelector(`[name='${targetId}']`);

    if (targetEl) {
      e.preventDefault();
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: rect.top + scrollTop - EXTRA_SCROLL_VALUE,
        behavior: 'smooth'
      });
    }
  }
});
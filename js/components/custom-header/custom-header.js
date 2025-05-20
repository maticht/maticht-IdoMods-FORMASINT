import { ICONS, SELECTORS, SCROLL_OFFSET } from './constants.js';
import { getHeaderTemplate } from './header-template.js';

class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = getHeaderTemplate();

    const burger = this.querySelector(SELECTORS.BURGER);
    const sideMenu = this.querySelector(SELECTORS.SIDE_MENU);
    const backdrop = this.querySelector(SELECTORS.BACKDROP);
    const burgerIcon = burger.querySelector(SELECTORS.BURGER_ICON);
    const burgerText = burger.querySelector(SELECTORS.BURGER_TEXT);
    let menuOpened = false;

    if (burger && sideMenu && backdrop) {
      burger.addEventListener('click', () => {
        menuOpened = !menuOpened;
        if (menuOpened) {
          sideMenu.classList.add('active');
          backdrop.classList.add('active');
          burgerIcon.src = ICONS.CLOSE;
          burgerText.textContent = 'CLOSE';
        } else {
          closeMenu();
        }
      });

      backdrop.addEventListener('click', closeMenu);

      sideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeMenu();
          setTimeout(() => scrollToTarget(link), 100);
        });
      });

      function closeMenu() {
        sideMenu.classList.remove('active');
        backdrop.classList.remove('active');
        burgerIcon.src = ICONS.BURGER;
        burgerText.textContent = 'MENU';
        menuOpened = false;
      }
      function scrollToTarget(link) {
        const targetId = link.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId) ||
          document.querySelector(targetId) ||
          document.querySelector(`[name='${targetId}']`);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({
            top: rect.top + scrollTop - SCROLL_OFFSET,
            behavior: 'smooth'
          });
        }
      }
    }

    const icon = this.querySelector('.forma-icon');
    if (icon) {
      icon.addEventListener('mouseenter', () => (icon.src = ICONS.LOGO_HOVER));
      icon.addEventListener('mouseleave', () => (icon.src = ICONS.LOGO));
    }

    document.addEventListener('click', function (e) {
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
            top: rect.top + scrollTop - SCROLL_OFFSET,
            behavior: 'smooth'
          });
        }
      }
    });
  }
}

customElements.define('custom-header', CustomHeader);
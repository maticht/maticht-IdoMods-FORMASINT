import {
  ICONS,
  NAV_LINKS,
  BRAND
} from './constants.js';

export function getHeaderTemplate() {
  return `
    <header class="sticky-header">
      <nav aria-label="Main menu" class="custom-header">
        <div class="header-section left">
          <a href="#" class="logo" aria-label="Go to the main page">
            <img 
            class="forma-icon" 
            src="${ICONS.LOGO}" 
            loading="lazy" 
            width="24" 
            height="24" 
            alt="FORMA’SINT — ski jackets" 
            />
            <span class="brand-title">${BRAND.TITLE}</span>
          </a>
          <span class="brand-name">${BRAND.NAME}</span>
        </div>
        <ul class="header-section center" role="menubar">
          ${NAV_LINKS.map(link => 
            `<li><a href="${link.href}" role="menuitem">${link.text}</a></li>`).join('')
          }
        </ul>
        <div class="header-section right">
          <img 
          src="${ICONS.USER}" 
          loading="lazy" 
          width="24" 
          height="24" 
          alt="user" 
          class="header-logo" 
          />
          <span class="brand-role">${BRAND.ROLE}</span>
        </div>
        <button class="burger" aria-label="Open menu">
          <img 
          class="forma-icon" 
          src="${ICONS.BURGER}" 
          loading="lazy" 
          width="24" 
          height="24" 
          alt="menu" 
          />
          <span class="brand-title">MENU</span>
        </button>
        <div class="side-menu">
          <a href="#" class="logo" aria-label="Go to the main page">
            <img 
            class="forma-icon" 
            src="${ICONS.LOGO}" 
            loading="lazy" 
            width="24" 
            height="24" 
            alt="FORMA’SINT — ski jackets" 
            />
          </a>
          <ul>
            ${NAV_LINKS.map(link => 
              `<li><a href="${link.href}">${link.text}</a></li>`).join('')
            }
          </ul>
        </div>
        <div class="side-menu-backdrop"></div>
      </nav>
    </header>
  `;
}
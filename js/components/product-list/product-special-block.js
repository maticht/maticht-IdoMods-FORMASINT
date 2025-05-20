import { ICONS } from './constants.js';

export function renderSpecialBlock() {
  return `
    <aside class="product-special-block">
      <div class="special-text">
        <p>Forma’sint.</p>
        <h3>You'll look and feel like the champion.</h3>
      </div>
      <button class="special-btn">
        Check this out
        <img class="special-btn-img" src="${ICONS.CHEVRON_DOWN}" loading="lazy" alt=">">
      </button>
    </aside>
  `;
}
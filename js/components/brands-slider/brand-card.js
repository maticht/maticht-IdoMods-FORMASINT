import { BRAND_TITLE, ICONS, BRAND_PRICE } from './constants.js';

export function createBrandCard(brand, isFavorite, onFavToggle) {
  const slideEl = document.createElement('div');
  const favIconSrc = !isFavorite ? ICONS.FAV_DEFAULT : ICONS.FAV_FILL;
  slideEl.className = 'swiper-slide';

  slideEl.innerHTML = `
    <article class="brand-card">
      <div>
        <div class="brand-card-image-block">
          <img
            class="brand-card-image"
            src="${brand.image.replace('.png', '.webp')}"
            srcset="${brand.image.replace('.png', '.webp')} 1x, ${brand.image} 2x"
            loading="lazy"
            alt="${brand.text || `Logo of ${brand.title}`}"
          >
        </div>
        <div class="brand-badge ${brand.badge === "Limited edition" ? 'limited' : brand.badge === "Bestseller" ? 'bestseller' : ''}">
          ${brand.badge ? `<span class="badge">${brand.badge}</span>` : ''}
        </div>
        <button class="fav-btn" aria-label="Add to Favorites" title="Add to Favorites">
          <img class="fav-icon" src="${favIconSrc}" alt="Favorite">
        </button>
        <div class="brand-card-info">
          <b>${brand.title || BRAND_TITLE}</b>
          <p>€${brand.price || BRAND_PRICE},00 EUR</p>
        </div>
      </div>
    </article>
  `;

  slideEl.querySelector('.fav-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    onFavToggle(brand.id);
  });

  return slideEl;
}
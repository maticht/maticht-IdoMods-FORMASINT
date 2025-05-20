import { ICONS } from './constants.js';

export function renderProductModal(product) {
  return `
    <div class="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal">
      <button class="product-modal-close" aria-label="Close">
        <img src="${ICONS.CLOSE}" alt="X"/>
        <p>CLOSE</p>
      </button>
      <h4 class="product-modal-info">
          ID: ${product.id ?? ''}
      </h4>
      <img 
      class="product-modal-img" 
      src="${product.image ? product.image.replace('.png', '.webp') : ''}"
      srcset="${product.image ? product.image.replace('.png', '.webp') : ''} 1x, ${product.image || ''} 2x" 
      alt="${product.id}"
      >
    </div>
  `;
}
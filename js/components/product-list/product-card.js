export function renderProductCard(product) {
  return `
    <article class="product-card" style="cursor:pointer;" data-product-id="${product.id}">
      <div class="product-card-image-block">
        <img
          class="product-card-image"
          src="${product.image ? product.image.replace('.png', '.webp') : ''}"
          srcset="${product.image ? product.image.replace('.png', '.webp') : ''} 1x, ${product.image || ''} 2x"
          loading="lazy"
          alt="${product.text || `Logo of ${product.text}`}">
      </div>
      <div class="brand-id">ID: ${product.id ?? ''}</div>
    </article>`;
}
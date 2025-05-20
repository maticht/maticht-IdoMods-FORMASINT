import { ICONS, PAGE_SIZE_OPTIONS } from './constants.js';

export function renderPageSizeSelector(currentPageSize, onChange) {
  const pageSizes = [
    currentPageSize,
    ...PAGE_SIZE_OPTIONS.filter(size => size !== currentPageSize),
  ];

  return `
    <div class="page-size-selector">
      <label id="product-list" for="page-size" class="page-size-text">Number of products per page</label>
      <div id="page-size" class="custom-select" tabindex="0">
        <div class="custom-select__selected">
          ${currentPageSize}
          <img src="${ICONS.CHEVRON_DOWN}" loading="lazy" alt=">">
        </div>
        <div class="custom-select__options">
          ${pageSizes.map(size =>
            `<div class="custom-select__option${size === currentPageSize ? ' selected' : ''}" data-value="${size}">
              ${size}
              ${size === currentPageSize ? 
                `<img class="list-chevron-up" src="${ICONS.CHEVRON_DOWN}" loading="lazy" alt=">">` : ''
              }
            </div>`
          ).join('')}
        </div>
      </div>
    </div>
  `;
}
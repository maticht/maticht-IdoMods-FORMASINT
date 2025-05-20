import { fetchBrands } from '../../api.js';
import {
  PAGE_SIZE_OPTIONS,
  DEFAULT_PAGE_SIZE,
  SPECIAL_BLOCK_INDEX_DESKTOP,
  SPECIAL_BLOCK_INDEX_MOBILE,
  DESKTOP_WIDTH_THRESHOLD
} from './constants.js';
import { renderProductModal } from './product-modal.js';
import { renderPageSizeSelector } from "./page-size-selector.js";
import { renderSpecialBlock } from "./product-special-block.js";
import { renderProductCard } from "./product-card.js";
import { ERROR_MSG } from "../../constants.js";

class ProductList extends HTMLElement {
  constructor() {
    super();
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
    this.pageSize = DEFAULT_PAGE_SIZE;
    this.products = [];
    this.dropdownOpen = false;
    this.currentModalProduct = null;
  }

  connectedCallback() {
    this.renderBase();
    this.fetchData();
  }

  async fetchData() {
    try {
      this.products = await fetchBrands(this.pageSize, 1);
      this.renderProducts();
    } catch (error) {
      console.error('Failed to fetch products:', error);
      this.innerHTML = `<div class="error-loading-data">${ERROR_MSG}</div>`;
    }
  }

  showProductModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'product-modal-overlay';
    overlay.innerHTML = renderProductModal(product);

    overlay.querySelector('.product-modal-close').onclick = () => this.hideProductModal();
    overlay.onclick = (e) => {
      if (e.target === overlay) this.hideProductModal();
    };
    document.addEventListener('keydown', this._escListener = (e) => {
      if (e.key === 'Escape') this.hideProductModal();
    });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    this.currentModalProduct = overlay;
  }

  hideProductModal() {
    if (this.currentModalProduct) {
      document.body.removeChild(this.currentModalProduct);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', this._escListener);
      this.currentModalProduct = null;
    }
  }

  renderBase() {
    const pageSizes = [
      this.pageSize,
      ...this.pageSizeOptions.filter(size => size !== this.pageSize)
    ];
    this.innerHTML = `
      <div class="product-list-container">
        ${renderPageSizeSelector(this.pageSize)}
        <div class="product-list"></div>
      </div>
    `;
    const select = this.querySelector('.custom-select');
    const selected = this.querySelector('.custom-select__selected');
    const options = this.querySelector('.custom-select__options');

    selected.addEventListener('click', (e) => {
      this.dropdownOpen = !this.dropdownOpen;
      select.classList.toggle('open', this.dropdownOpen);
    });

    document.addEventListener('click', this._closeDropdown = (e) => {
      if (!select.contains(e.target)) {
        this.dropdownOpen = false;
        select.classList.remove('open');
      }
    });

    options.querySelectorAll('.custom-select__option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        this.pageSize = parseInt(opt.getAttribute('data-value'));
        this.dropdownOpen = false;
        this.renderBase();
        this.fetchData();
      });
    });

    this.querySelector('#page-size').addEventListener('change', (event) => {
      this.pageSize = parseInt(event.target.value);
      this.fetchData();
    });
  }
  disconnectedCallback() {
    document.removeEventListener('click', this._closeDropdown);
  }

  renderProducts() {
    const productListDiv = this.querySelector('.product-list');
    if (!productListDiv) return;

    if (!Array.isArray(this.products) || this.products.length === 0) {
      productListDiv.innerHTML = `<div class="error-loading-data">${ERROR_MSG}</div>`;
      return;
    }

    const productCards = this.products.map(product => renderProductCard(product));

    let specialBlockIndex = SPECIAL_BLOCK_INDEX_DESKTOP;
    if (window.innerWidth <= DESKTOP_WIDTH_THRESHOLD) {
      specialBlockIndex = SPECIAL_BLOCK_INDEX_MOBILE;
    }
    if (productCards.length >= specialBlockIndex) {
      productCards.splice(specialBlockIndex, 0, `
      ${renderSpecialBlock()}
    `);
    }

    productListDiv.innerHTML = productCards.join('');
    productListDiv.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const productId = card.getAttribute('data-product-id');
        const product = this.products.find(p => String(p.id) === String(productId));
        if (product) this.showProductModal(product);
      });
    });
  }
}

customElements.define('product-list', ProductList);
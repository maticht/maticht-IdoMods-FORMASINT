import { fetchBrands } from '../../api.js';
import { createBrandCard } from './brand-card.js';
import {
  DEFAULT_ITEM_COUNT,
  BRAND_BADGES,
  BRAND_TITLE,
  BRAND_PRICE,
  SWIPER_SPACE_BETWEEN,
  ICONS,
  SLIDER_BREAKPOINTS,
} from './constants.js';
import { ERROR_MSG } from "../../constants.js";

class BrandsSlider extends HTMLElement {
  constructor() {
    super();
    this.itemCount = DEFAULT_ITEM_COUNT;
    this.favorites = new Set();
    this.brands = [];
    this.swiper = null;
  }

  connectedCallback() {
    this.render();
    this.loadBrands();
  }

  async loadBrands() {
    try {
      const rawBrands = await fetchBrands(this.itemCount, 1);

      this.brands = rawBrands.map(brand => ({
        ...brand,
        price: BRAND_PRICE,
        title: BRAND_TITLE,
        badge: BRAND_BADGES[Math.floor(Math.random() * BRAND_BADGES.length)]
      }));

      this.renderBrands();
      this.initSwiper();
    } catch (e) {
      console.error('[brands-slider] Request error:', e);
      this.querySelector('.swiper-wrapper').innerHTML =
        `<div class="error-loading-data">"${ERROR_MSG}"</div>`;
    }
  }

  toggleFavorite(id) {
    const prevIndex = this.swiper ? this.swiper.activeIndex : 0;
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
    this.renderBrands();
    this.initSwiper(prevIndex);
  }

  render() {
    this.innerHTML = `
      <link rel="stylesheet" href="/css/brands-slider.css">
      <link rel="stylesheet" href="/css/index.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      <section id="brands">
        <h4>Featured products</h4>
        <h2 class="slider-title">Browse featured</h2>
        <div class="slider-container">
          <button class="slider-btn prev" aria-label="prev">
            <img src="${ICONS.CHEVRON}" alt="<"/>
          </button>
          <div class="swiper brands-swiper">
            <div class="swiper-wrapper"></div>
          </div>
          <button class="slider-btn next" aria-label="next">
            <img src="${ICONS.CHEVRON}" alt=">"/>
          </button>
          <div class="slider-bar">
            <div class="slider-bar-progress"></div>
          </div>
        </div>
      </section>
    `;
  }

  renderBrands() {
    const wrapper = this.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    this.brands.forEach(brand => {
      const isFavorite = this.favorites.has(brand.id);
      const slideEl = createBrandCard(brand, isFavorite, this.toggleFavorite.bind(this));
      wrapper.appendChild(slideEl);
    });
  }

  updateSliderBar() {
    const sliderBar = this.querySelector('.slider-bar');
    const progressBar = this.querySelector('.slider-bar-progress');
    if (!sliderBar || !progressBar || !this.swiper) return;
    const sliderBarWidth = sliderBar.offsetWidth;
    const progressBarWidth = progressBar.offsetWidth;
    const slidesCount = this.swiper.slides.length - this.swiper.params.slidesPerView + 1;
    const progress = (this.swiper.activeIndex) / Math.max(1, (slidesCount - 1));
    const maxOffset = sliderBarWidth - progressBarWidth;
    const left = progress * maxOffset;
    progressBar.style.left = left + 'px';
  }

  initSwiper(initialSlide = 0) {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }

    let slidesPerView = 4;
    if (window.innerWidth <= 400) {
      slidesPerView = 1;
    } else if (window.innerWidth <= 700) {
      slidesPerView = 1;
    } else if (window.innerWidth <= 1000) {
      slidesPerView = 2;
    } else if (window.innerWidth <= 1300) {
      slidesPerView = 3;
    }

    this.swiper = new window.Swiper(this.querySelector('.brands-swiper'), {
      slidesPerView,
      spaceBetween: SWIPER_SPACE_BETWEEN,
      slidesPerGroup: slidesPerView,
      loop: false,
      initialSlide,
      navigation: {
        nextEl: this.querySelector('.slider-btn.next'),
        prevEl: this.querySelector('.slider-btn.prev'),
      },
      breakpoints: SLIDER_BREAKPOINTS,
      watchOverflow: true,
      on: {
        slideChange: () => this.updateSliderBar(),
        afterInit: () => this.updateSliderBar(),
      }
    });
  }
}

customElements.define('brands-slider', BrandsSlider);
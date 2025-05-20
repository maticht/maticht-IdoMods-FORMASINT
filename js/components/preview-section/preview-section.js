import {
  ICONS,
  DEFAULT_TITLE_HEIGHT_OFFSET,
  DEFAULT_WINDOW_HEIGHT_OFFSET
} from './constants.js';

class PreviewSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="preview-section">
        <h1 id="home">
          <img src="${ICONS.LOGO}" alt="FORMA’SINT — ski jackets" class="preview-title" />
        </h1>
        <img src="${ICONS.PREVIEW_BG}" alt="FORMA’SINT" class="preview-img" />
      </section>
    `;
    setTimeout(() => this.updatePreviewImgHeight(), 0);
    window.addEventListener('resize', () => this.updatePreviewImgHeight());
  }

  updatePreviewImgHeight() {
    const title = this.querySelector('.preview-title');
    const img = this.querySelector('.preview-img');
    if (!title || !img) return;
    const titleHeight = title.getBoundingClientRect().height + DEFAULT_TITLE_HEIGHT_OFFSET;
    const available = window.innerHeight - DEFAULT_WINDOW_HEIGHT_OFFSET - titleHeight;
    img.style.height = (available > 0 ? available : 0) + 'px';
  }
}

customElements.define('preview-section', PreviewSection);
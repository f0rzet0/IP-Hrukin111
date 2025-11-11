class TopBar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .top-bar {
          background-color: #f8f8f8;
          border-bottom: 1px solid #e5e7eb;
          padding: 0.5rem 0;
          font-size: 0.875rem;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .links {
          display: flex;
          gap: 1.5rem;
        }
        a {
          color: #4b5563;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.2s;
        }
        a:hover {
          color: #1f2937;
        }
        i {
          width: 1rem;
          height: 1rem;
        }
      </style>
      <div class="top-bar">
        <div class="container">
          <div class="links">
              <a href="tel:+79191137776">
              <i data-feather="phone"></i>
              +7 (919) 113-77-76
</a>
              <a href="tel:+79514772648">
              <i data-feather="phone"></i>
              +7 (951) 477-26-48
</a>
</div>
          <div class="links">
            <a href="about.html">
              <i data-feather="info"></i>
              О компании
            </a>
            <a href="contacts.html">
              <i data-feather="map-pin"></i>
              Контакты
            </a>
          </div>
        </div>
      </div>
    `;

    // Initialize Feather icons in shadow DOM
    const initFeatherIcons = () => {
      if (typeof feather !== 'undefined') {
        feather.replace({}, this.shadowRoot);
      }
    };

    // Try to initialize immediately
    initFeatherIcons();

    // Also try after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFeatherIcons);
    }

    // And after everything is loaded
    window.addEventListener('load', initFeatherIcons);

    // Use a small delay as fallback
    setTimeout(initFeatherIcons, 100);
  }
}

customElements.define('top-bar', TopBar);
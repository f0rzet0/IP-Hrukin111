class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 3rem 0 1.5rem;
          margin-top: 4rem;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .footer-section h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #f59e0b;
        }
        .footer-section p,
        .footer-section a {
          color: #d1d5db;
          text-decoration: none;
          line-height: 1.8;
          display: block;
          margin-bottom: 0.5rem;
        }
        .footer-section a:hover {
          color: #f59e0b;
        }
        .footer-section .contact-item {
          display: flex;
          align-items: start;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .footer-section .contact-item i {
          width: 18px;
          height: 18px;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }
        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 1.5rem;
          text-align: center;
          color: #9ca3af;
          font-size: 0.875rem;
        }
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-links a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #374151;
          border-radius: 50%;
          transition: background-color 0.3s;
        }
        .social-links a:hover {
          background-color: #f59e0b;
        }
        .social-links i {
          width: 20px;
          height: 20px;
        }
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <footer>
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>MetalCraft Pro</h3>
              <p>Профессиональное производство металлоконструкций любой сложности. Качество и надежность с 2010 года.</p>
            </div>
            <div class="footer-section">
              <h3>Навигация</h3>
              <a href="index.html">Главная</a>
              <a href="catalog.html">Каталог</a>
              <a href="about.html">О компании</a>
              <a href="contacts.html">Контакты</a>
            </div>
            <div class="footer-section">
              <h3>Контакты</h3>
              <div class="contact-item">
                <i data-feather="map-pin"></i>
                <span>г. Челябинск, ул. Автодорожная, 5Бк1, 454008</span>
              </div>
              <div class="contact-item">
                <i data-feather="phone"></i>
                <a href="tel:+79191137776">+7 (919) 113-77-76</a>
              </div>
              <div class="contact-item">
                <i data-feather="phone"></i>
                <a href="tel:+79514772648">+7 (951) 477-26-48</a>
              </div>
              <div class="contact-item">
                <i data-feather="mail"></i>
                <a href="mailto:050174050@mail.ru">050174050@mail.ru</a>
              </div>
            </div>
            <div class="footer-section">
              <h3>Режим работы</h3>
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб-Вс: выходные</p>
              <div class="social-links">
                <a href="#" aria-label="ВКонтакте">
                  <i data-feather="facebook"></i>
                </a>
                <a href="#" aria-label="Telegram">
                  <i data-feather="send"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ИП Хрюкин Е.А. Все права защищены.</p>
          </div>
        </div>
      </footer>
    `;

    // Initialize Feather icons
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

customElements.define('custom-footer', CustomFooter);


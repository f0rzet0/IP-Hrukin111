class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background-color: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .logo:hover {
          color: #f59e0b;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
          transition: color 0.3s;
        }
        .nav-links a:hover {
          color: #f59e0b;
        }
        .nav-links a.active {
          color: #f59e0b;
        }
        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #f59e0b;
        }
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }
        .mobile-menu-toggle i {
          width: 24px;
          height: 24px;
          color: #1f2937;
        }
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #ffffff;
            flex-direction: column;
            gap: 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }
          .nav-links.open {
            max-height: 400px;
          }
          .nav-links a {
            width: 100%;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
          }
        }
      </style>
      <nav>
        <div class="navbar-container">
          <a href="index.html" class="logo">
            <i data-feather="layers"></i>
            MetalCraft Pro
          </a>
          <button class="mobile-menu-toggle" id="mobileMenuToggle">
            <i data-feather="menu"></i>
          </button>
          <ul class="nav-links" id="navLinks">
            <li><a href="index.html">Главная</a></li>
            <li><a href="catalog.html">Каталог</a></li>
            <li><a href="about.html">О компании</a></li>
            <li><a href="contacts.html">Контакты</a></li>
          </ul>
        </div>
      </nav>
    `;

    // Initialize mobile menu
    const mobileMenuToggle = this.shadowRoot.getElementById('mobileMenuToggle');
    const navLinks = this.shadowRoot.getElementById('navLinks');
    
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Set active link based on current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const links = this.shadowRoot.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      // Remove active class first
      link.classList.remove('active');
      
      // Check if this link matches current page
      if (href === currentPage || 
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html') ||
          (currentPath.endsWith('/') && href === 'index.html')) {
        link.classList.add('active');
      }
    });

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

customElements.define('custom-navbar', CustomNavbar);


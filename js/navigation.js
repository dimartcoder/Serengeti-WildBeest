/**
 * Serengeti Wildebeest Camps - Navigation & Global UI Interactivity
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initActiveNav();
  initFooterYear();
});

/**
 * Handle Header Scroll State (shrinks padding when scrolled > 40px)
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Mobile Navigation Menu (Hamburger toggle & ESC handler)
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-navigation');
  if (!toggleBtn || !mobileNav) return;

  const toggle = (force) => {
    const isOpen = typeof force === 'boolean' ? force : !mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    
    // Toggle SVG icon between Hamburger and X
    const iconMenu = toggleBtn.querySelector('.icon-menu');
    const iconClose = toggleBtn.querySelector('.icon-close');
    if (iconMenu && iconClose) {
      iconMenu.style.display = isOpen ? 'none' : 'block';
      iconClose.style.display = isOpen ? 'block' : 'none';
    }
  };

  toggleBtn.addEventListener('click', () => toggle());

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggle(false);
    }
  });

  // Close when clicking any nav link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });
}

/**
 * Detect Current Page & Highlight Active Navigation Links
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop() || 'index.html';

    const isMatch =
      linkPath === currentPath ||
      (currentPath === '' && (linkPath === 'index.html' || linkPath === '/')) ||
      (currentPath === 'index.html' && (linkPath === 'index.html' || linkPath === './'));

    if (isMatch) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Footer Year
 */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const collapsed = navLinks.classList.toggle('collapsed');
        navLinks.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        navToggle.textContent = collapsed ? '☰' : '✕';
      });
    }

    const updateActiveLink = () => {
      const hash = location.hash || '#/dashboard';
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
    };
    window.addEventListener('hashchange', updateActiveLink);
    updateActiveLink();
  });
})();

(() => {
  'use strict';
  const { $, $$, esc, storage, uid, nowIso, today, route } = window.DW;

  const init = () => {
    const installBtn = $('#installBtn');
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      installBtn.style.display = 'inline-flex';
    });
    installBtn.addEventListener('click', async () => {
      if (!window.__deferredPrompt) return;
      window.__deferredPrompt.prompt();
      const { outcome } = await window.__deferredPrompt.userChoice;
      if (outcome === 'accepted') installBtn.style.display = 'none';
      window.__deferredPrompt = null;
    });

    const setActiveNav = () => {
      const hash = location.hash || '#/dashboard';
      $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
    };
    window.addEventListener('hashchange', setActiveNav);
    setActiveNav();
  };

  document.addEventListener('DOMContentLoaded', init);
})();

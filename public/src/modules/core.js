(() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const storage = {
    get(key) { try { return JSON.parse(localStorage.getItem('dw_' + key)) ?? null; } catch { return null; } },
    set(key, value) { localStorage.setItem('dw_' + key, JSON.stringify(value)); },
    remove(key) { localStorage.removeItem('dw_' + key); }
  };

  const uid = () => Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
  const esc = (s) => { const d = document.createElement('div'); d.textContent = String(s ?? ''); return d.innerHTML; };
  const nowIso = () => new Date().toISOString();
  const today = () => new Date().toISOString().slice(0, 10);

  const route = (() => {
    const routes = {};
    const add = (hash, handler) => { routes[hash] = handler; };
    const navigate = () => {
      const hash = location.hash || '#/dashboard';
      const handler = routes[hash] || routes['#/dashboard'];
      const app = $('#app');
      app.innerHTML = '';
      const section = document.createElement('section');
      section.className = 'page active';
      const view = document.createElement('div');
      view.id = 'view';
      section.appendChild(view);
      app.appendChild(section);
      try { handler({ view, app }); } catch (e) { view.innerHTML = `<div class="empty">Error: ${esc(e?.message || e)}</div>`; }
    };
    window.addEventListener('hashchange', navigate);
    document.addEventListener('DOMContentLoaded', navigate);
    return { add, navigate };
  })();

  window.DW = { $, $$, storage, uid, esc, nowIso, today, route };
})();

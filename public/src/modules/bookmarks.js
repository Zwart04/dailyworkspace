(() => {
  'use strict';
  const { storage, esc, uid, nowIso } = window.DW;

  const renderBookmarks = (view) => {
    const items = (storage.get('bookmarks') || []).slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    const list = items.map(b => `<div class="card"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div><a class="link" href="${esc(b.url)}" target="_blank" rel="noreferrer">${esc(b.title || b.url)}</a><div style="font-size:12px;color:var(--ink-weak)">${esc(b.url)}</div></div><button class="btn danger sm" data-del="${esc(b.id)}">Hapus</button></div></div>`).join('') || '<div class="empty">Belum ada bookmark.</div>';

    view.innerHTML = `
      <div class="hero"><h1>Bookmarks</h1><p>Kumpulkan link penting yang sering dipakai.</p></div>
      <div class="card" style="margin-bottom:14px">
        <form id="bmForm" class="fields">
          <div class="field"><label>URL</label><input class="input" id="b_url" required placeholder="https://..."></div>
          <div class="field"><label>Judul</label><input class="input" id="b_title" placeholder="Nama situs/artikel"></div>
          <div class="field"><label></label><button class="btn" type="submit">Tambah bookmark</button></div>
        </form>
      </div>
      <div class="grid grid-3">${list}</div>
    `;

    document.getElementById('bmForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const items = storage.get('bookmarks') || [];
      items.unshift({ id: 'B-' + uid().toUpperCase(), url: document.getElementById('b_url').value.trim(), title: document.getElementById('b_title').value.trim(), createdAt: nowIso() });
      storage.set('bookmarks', items);
      window.DW.route.navigate();
    });

    document.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', () => {
      const items = (storage.get('bookmarks') || []).filter(b => b.id !== btn.dataset.del);
      storage.set('bookmarks', items);
      window.DW.route.navigate();
    }));
  };

  window.DW.route.add('#/bookmarks', renderBookmarks);
})();

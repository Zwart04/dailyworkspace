(() => {
  const { $, esc, uid, nowIso } = window.DW;
  const renderBookmarks = ({ view }) => {
    const items = (window.DW.storage.get('bookmarks') || []).slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    const list = items.map(b => `<div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div><a class="link" href="${esc(b.url)}" target="_blank" rel="noreferrer">${esc(b.title || b.url)}</a><div style="font-size:12px;color:var(--ink-weak)">${esc(b.url)}</div></div><button class="btn danger sm" data-del="${esc(b.id)}">Hapus</button></div>`).join('') || '<div class="empty">Belum ada bookmark.</div>';

    view.innerHTML = `
      <div class="hero"><h1>Bookmarks</h1><p>Kumpulkan link penting yang sering dipakai.</p></div>
      <div class="card" style="margin-bottom:14px">
        <form id="bmForm" class="fields">
          <div class="grid grid-3">
            <div class="field"><label>URL</label><input class="input" id="b_url" required placeholder="https://..."></div>
            <div class="field"><label>Judul</label><input class="input" id="b_title" placeholder="Nama situs/artikel"></div>
            <div class="field"><label></label><button class="btn" type="submit">Tambah bookmark</button></div>
          </div>
        </form>
      </div>
      <div class="grid grid-3">${list}</div>
    `;

    $('#bmForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const items = window.DW.storage.get('bookmarks') || [];
      items.unshift({ id: 'B-' + uid().toUpperCase(), url: $('#b_url').value.trim(), title: $('#b_title').value.trim(), createdAt: nowIso() });
      window.DW.storage.set('bookmarks', items);
      window.DW.route.navigate();
    });

    $$('[data-del]').forEach(btn => btn.addEventListener('click', () => {
      const items = (window.DW.storage.get('bookmarks') || []).filter(b => b.id !== btn.dataset.del);
      window.DW.storage.set('bookmarks', items);
      window.DW.route.navigate();
    }));
  };
  window.DW.route.add('#/bookmarks', renderBookmarks);
})();

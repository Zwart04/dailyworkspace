(() => {
  'use strict';
  const { storage, esc, uid, nowIso, today } = window.DW;

  const renderNotes = (view) => {
    const notes = (storage.get('notes') || []).slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    const list = notes.map(n => `<div class="card"><div style="display:flex;justify-content:space-between;gap:10px"><div><strong>${esc(n.title || 'Tanpa judul')}</strong><div style="font-size:12px;color:var(--ink-weak)">${esc(n.createdAt || '-')}</div><div style="margin-top:6px">${esc(n.body || '')}</div></div><div style="display:flex;gap:6px"><button class="btn secondary sm" data-edit="${esc(n.id)}">Edit</button><button class="btn danger sm" data-del="${esc(n.id)}">Hapus</button></div></div></div>`).join('') || '<div class="empty">Belum ada catatan.</div>';

    view.innerHTML = `
      <div class="hero"><h1>Notes</h1><p>Catatan cepat harian, tersimpan lokal.</p></div>
      <div class="card" style="margin-bottom:14px">
        <form id="noteForm" class="fields">
          <div class="field"><label>Judul</label><input class="input" id="n_title" required placeholder="Contoh: Ide proyek"></div>
          <div class="field"><label>Isi</label><textarea class="input" id="n_body" rows="3" placeholder="Tulis catatan..."></textarea></div>
          <button class="btn" type="submit">Simpan catatan</button>
        </form>
      </div>
      <div class="grid grid-3">${list}</div>
    `;

    document.getElementById('noteForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const notes = storage.get('notes') || [];
      notes.unshift({ id: 'N-' + uid().toUpperCase(), title: document.getElementById('n_title').value.trim(), body: document.getElementById('n_body').value.trim(), createdAt: nowIso() });
      storage.set('notes', notes);
      window.DW.route.navigate();
    });

    document.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', () => {
      const notes = (storage.get('notes') || []).filter((n) => n.id !== btn.dataset.del);
      storage.set('notes', notes);
      window.DW.route.navigate();
    }));
  };

  window.DW.route.add('#/notes', renderNotes);
})();

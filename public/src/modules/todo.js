(() => {
  const { $, esc, uid, nowIso } = window.DW;
  const renderTodo = ({ view }) => {
    const todos = window.DW.storage.get('todos') || [];
    const list = todos.map(t => `<div class="card"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div><strong>${esc(t.text)}</strong><span class="badge" style="margin-left:8px">${esc(t.priority)}</span><div style="font-size:12px;color:var(--ink-weak)">${esc(t.done ? 'Selesai' : 'Aktif')}</div></div><div style="display:flex;gap:6px"><button class="btn secondary sm" data-toggle="${esc(t.id)}">${t.done ? 'Undo' : 'Selesai'}</button><button class="btn danger sm" data-del="${esc(t.id)}">Hapus</button></div></div></div>`).join('') || '<div class="empty">Belum ada todo.</div>';

    view.innerHTML = `
      <div class="hero"><h1>Todo</h1><p>Kelola daftar tugas harian.</p></div>
      <div class="card" style="margin-bottom:14px">
        <form id="todoForm" class="fields">
          <div class="field"><label>Tugas</label><input class="input" id="t_text" required placeholder="Contoh: Kirim invoice"></div>
          <div class="field"><label>Prioritas</label><select class="input" id="t_priority"><option value="high">Tinggi</option><option value="medium" selected>Sedang</option><option value="low">Rendah</option></select></div>
          <button class="btn" type="submit">Tambah todo</button>
        </form>
      </div>
      <div class="grid grid-3">${list}</div>
    `;

    $('#todoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const todos = window.DW.storage.get('todos') || [];
      todos.push({ id: 'T-' + uid().toUpperCase(), text: $('#t_text').value.trim(), priority: $('#t_priority').value, done: false, createdAt: nowIso() });
      window.DW.storage.set('todos', todos);
      window.DW.route.navigate();
    });

    $$('[data-toggle]').forEach(btn => btn.addEventListener('click', () => {
      const todos = window.DW.storage.get('todos') || [];
      const target = todos.find(t => t.id === btn.dataset.toggle);
      if (target) { target.done = !target.done; target.doneAt = target.done ? nowIso() : null; }
      window.DW.storage.set('todos', todos);
      window.DW.route.navigate();
    }));

    $$('[data-del]').forEach(btn => btn.addEventListener('click', () => {
      const todos = (window.DW.storage.get('todos') || []).filter(t => t.id !== btn.dataset.del);
      window.DW.storage.set('todos', todos);
      window.DW.route.navigate();
    }));
  };
  window.DW.route.add('#/todo', renderTodo);
})();

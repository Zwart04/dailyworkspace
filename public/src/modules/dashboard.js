(() => {
  'use strict';
  const { storage, esc, uid, nowIso, today } = window.DW;

  const renderDashboard = (view) => {
    const notes = (storage.get('notes') || []).filter((n) => (n.createdAt || '').startsWith(today()));
    const todos = storage.get('todos') || [];
    const expenses = storage.get('tracker_expenses') || [];
    const todayTodos = todos.filter((t) => (t.createdAt || '').startsWith(today()));
    const doneToday = todos.filter((t) => t.done && t.doneAt && t.doneAt.startsWith(today())).length;
    const todayExp = expenses.filter((e) => e.date === today()).reduce((a, b) => a + Number(b.amount || 0), 0);
    const budgetTarget = Number((storage.get('tracker_settings') || {}).budgetTarget || 0);
    const remaining = Math.max(0, budgetTarget - todayExp);

    view.innerHTML = `
      <div class="hero"><h1>Dashboard</h1><p>Ringkasan aktivitas hari ini</p></div>
      <div class="grid grid-3">
        <div class="card"><div class="badge">Notes</div><div style="font-weight:700;font-size:24px">${notes.length}</div></div>
        <div class="card"><div class="badge">Todo selesai</div><div style="font-weight:700;font-size:24px">${doneToday}/${todayTodos.length}</div></div>
        <div class="card"><div class="badge">Sisa anggaran</div><div style="font-weight:700;font-size:24px">Rp ${Math.round(remaining).toLocaleString('id-ID')}</div></div>
      </div>`;
  };

  window.DW.route.add('#/dashboard', renderDashboard);
})();

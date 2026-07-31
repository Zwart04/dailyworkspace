(() => {
  const { $, today } = window.DW;
  const renderDashboard = ({ view }) => {
    const notes = window.DW.storage.get('notes') || [];
    const todos = window.DW.storage.get('todos') || [];
    const sessions = window.DW.storage.get('pomo_sessions') || [];
    const expenses = window.DW.storage.get('tracker_expenses') || [];

    const todayNotes = notes.filter(n => (n.createdAt || '').startsWith(today())).length;
    const todayTodos = todos.filter(t => (t.createdAt || '').startsWith(today())).length;
    const doneToday = todos.filter(t => t.done && t.doneAt && t.doneAt.startsWith(today())).length;
    const todayExp = expenses.filter(e => e.date === today()).reduce((acc, e) => acc + Number(e.amount || 0), 0);
    const expTarget = Number(window.DW.storage.get('tracker_settings')?.budgetTarget || 0);
    const expRemaining = Math.max(0, expTarget - todayExp);

    const cards = [
      `<div class="card"><div class="hero"><h1>Dashboard</h1><p>Ringkasan aktivitas hari ini</p></div><div class="grid grid-3">
        <div class="card"><div class="badge">Notes</div><div style="font-weight:700;font-size:22px">${todayNotes}</div></div>
        <div class="card"><div class="badge">Todo selesai</div><div style="font-weight:700;font-size:22px">${doneToday}/${todayTodos}</div></div>
        <div class="card"><div class="badge">Sisa anggaran</div><div style="font-weight:700;font-size:22px">$${Math.round(expRemaining).toLocaleString('id-ID')}</div></div>
      </div></div>`
    ].join('');

    view.innerHTML = cards;
  };

  window.DW.route.add('#/dashboard', renderDashboard);
})();

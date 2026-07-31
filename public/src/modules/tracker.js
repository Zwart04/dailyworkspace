(() => {
  const { $, esc, uid, nowIso } = window.DW;
  const rp = (n) => Number(n || 0).toLocaleString('id-ID');
  const monthRange = () => {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
    return { from, to };
  };

  const renderTracker = ({ view }) => {
    const tracker = window.DW.storage.get('tracker') || { workTarget: 8, budgetTarget: 50000 };
    const expenses = window.DW.storage.get('tracker_expenses') || [];
    const income = window.DW.storage.get('tracker_income') || [];
    const work = window.DW.storage.get('tracker_work') || { workMinutes: 0 };

    const todayExp = expenses.filter(e => e.date === today()).reduce((a, b) => a + Number(b.amount || 0), 0);
    const monthExp = expenses.filter(e => e.date >= monthRange().from && e.date <= monthRange().to).reduce((a, b) => a + Number(b.amount || 0), 0);
    const monthIncome = income.filter(e => e.date >= monthRange().from && e.date <= monthRange().to).reduce((a, b) => a + Number(b.amount || 0), 0);
    const monthly = monthIncome - monthExp;

    const rows = expenses.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 20).map(e => `<tr><td>${esc(e.note || '-')}</td><td>${esc(e.date)}</td><td style="text-align:right;color:var(--danger)">-${rp(e.amount)}</td></tr>`).join('');
    const inRows = income.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 20).map(e => `<tr><td>${esc(e.note || '-')}</td><td>${esc(e.date)}</td><td style="text-align:right;color:var(--success)">+${rp(e.amount)}</td></tr>`).join('');

    view.innerHTML = `
      <div class="hero"><h1>Tracker</h1><p>Monitoring pengeluaran, pemasukan, dan jam kerja.</p></div>
      <div class="grid grid-3" style="margin-bottom:14px">
        <div class="card"><div class="badge">Pemasukan bulan ini</div><div style="font-weight:700;font-size:22px;color:var(--success)">${rp(monthIncome)}</div></div>
        <div class="card"><div class="badge">Pengeluaran bulan ini</div><div style="font-weight:700;font-size:22px;color:var(--danger)">${rp(monthExp)}</div></div>
        <div class="card"><div class="badge">Sisa bulan ini</div><div style="font-weight:700;font-size:22px">${rp(monthly)}</div></div>
      </div>

      <div class="grid grid-2" style="margin-bottom:14px">
        <form id="expForm" class="card">
          <h3 style="margin:0 0 10px">Tambah pengeluaran</h3>
          <div class="fields">
            <div class="field"><label>Nominal</label><input class="input" id="e_amount" type="number" inputmode="numeric" required></div>
            <div class="field"><label>Catatan</label><input class="input" id="e_note" placeholder="Kopi, transport..."></div>
            <button class="btn" type="submit">Tambah pengeluaran</button>
          </div>
        </form>
        <form id="incForm" class="card">
          <h3 style="margin:0 0 10px">Tambah pemasukan</h3>
          <div class="fields">
            <div class="field"><label>Nominal</label><input class="input" id="i_amount" type="number" inputmode="numeric" required></div>
            <div class="field"><label>Catatan</label><input class="input" id="i_note" placeholder="Client A, jasa ..."></div>
            <button class="btn" type="submit">Tambah pemasukan</button>
          </div>
        </form>
      </div>

      <div class="card">
        <h3 style="margin:0 0 10px">Riwayat transaksi</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Catatan</th><th>Tanggal</th><th style="text-align:right">Nominal</th></tr></thead>
            <tbody>${rows || inRows || '<tr><td colspan=3><div class="empty">Belum ada transaksi.</div></td></tr>'}</tbody>
          </table>
        </div>
      </div>
    `;

    $('#expForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const list = window.DW.storage.get('tracker_expenses') || [];
      list.push({ id: 'E-' + uid().toUpperCase(), amount: Number($('#e_amount').value || 0), note: $('#e_note').value.trim(), date: today(), createdAt: nowIso() });
      window.DW.storage.set('tracker_expenses', list);
      window.DW.route.navigate();
    });

    $('#incForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const list = window.DW.storage.get('tracker_income') || [];
      list.push({ id: 'I-' + uid().toUpperCase(), amount: Number($('#i_amount').value || 0), note: $('#i_note').value.trim(), date: today(), createdAt: nowIso() });
      window.DW.storage.set('tracker_income', list);
      window.DW.route.navigate();
    });
  };
  window.DW.route.add('#/tracker', renderTracker);
})();

(() => {
  'use strict';
  const { storage, esc, uid, nowIso } = window.DW;
  const today = () => new Date().toISOString().slice(0, 10);
  const monthRange = () => {
    const d = new Date();
    const from = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
    const to = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().slice(0, 10);
    return { from, to };
  };
  const fmt = (n) => Number(n || 0).toLocaleString('id-ID');

  const renderTracker = (view) => {
    const expenses = storage.get('tracker_expenses') || [];
    const income = storage.get('tracker_income') || [];
    const budgetTarget = Number((storage.get('tracker_settings') || {}).budgetTarget || 0);
    const { from, to } = monthRange();
    const monthExp = expenses.filter(e => e.date >= from && e.date <= to).reduce((a, b) => a + Number(b.amount || 0), 0);
    const monthIncome = income.filter(e => e.date >= from && e.date <= to).reduce((a, b) => a + Number(b.amount || 0), 0);
    const remainingMonth = Math.max(0, budgetTarget - monthExp);

    const rows = expenses.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 20).map(e => `<tr><td>${esc(e.note || '-')}</td><td>${esc(e.date)}</td><td style="text-align:right;color:var(--danger)">-Rp ${fmt(e.amount)}</td></tr>`).join('');
    const inRows = income.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 20).map(e => `<tr><td>${esc(e.note || '-')}</td><td>${esc(e.date)}</td><td style="text-align:right;color:var(--success)">+Rp ${fmt(e.amount)}</td></tr>`).join('');

    view.innerHTML =`
      <div class="hero"><h1>Tracker</h1><p>Monitoring pengeluaran, pemasukan, dan anggaran bulanan.</p></div>
      <div class="grid grid-3" style="margin-bottom:14px">
        <div class="card"><div class="badge">Pemasukan bulan ini</div><div style="font-weight:700;font-size:22px;color:var(--success)">Rp ${fmt(monthIncome)}</div></div>
        <div class="card"><div class="badge">Pengeluaran bulan ini</div><div style="font-weight:700;font-size:22px;color:var(--danger)">Rp ${fmt(monthExp)}</div></div>
        <div class="card"><div class="badge">Sisa anggaran bulan ini</div><div style="font-weight:700;font-size:22px">Rp ${fmt(remainingMonth)}</div></div>
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
      </div>`;

    document.getElementById('expForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const list = storage.get('tracker_expenses') || [];
      list.push({ id: 'E-' + uid().toUpperCase(), amount: Number(document.getElementById('e_amount').value || 0), note: document.getElementById('e_note').value.trim(), date: today(), createdAt: nowIso() });
      storage.set('tracker_expenses', list);
      window.DW.route.navigate();
    });

    document.getElementById('incForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const list = storage.get('tracker_income') || [];
      list.push({ id: 'I-' + uid().toUpperCase(), amount: Number(document.getElementById('i_amount').value || 0), note: document.getElementById('i_note').value.trim(), date: today(), createdAt: nowIso() });
      storage.set('tracker_income', list);
      window.DW.route.navigate();
    });
  };

  window.DW.route.add('#/tracker', renderTracker);
})();

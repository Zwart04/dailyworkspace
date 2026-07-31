(() => {
  'use strict';
  const { esc } = window.DW;

  const renderAbout = (view) => {
    view.innerHTML = `
      <div class="hero"><h1>About</h1><p>Informasi singkat DailyWorkspace.</p></div>
      <div class="card">
        <h2 style="margin:0 0 6px;font-size:1.05rem">DailyWorkspace</h2>
        <div class="badge" style="margin-bottom:8px">v1.0.0</div>
        <p style="color:var(--ink-weak);margin:0 0 10px">Workspace harian modular untuk produktivitas pribadi. Semua data tersimpan lokal di browser, tanpa login, tanpa server.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <span class="badge">Productivity</span>
          <span class="badge">Local-first</span>
          <span class="badge">Privacy-friendly</span>
        </div>
        <h3 style="margin:10px 0 6px;font-size:.95rem">Module</h3>
        <ul style="padding-left:18px;color:var(--ink-weak);line-height:1.7">
          <li><strong>Dashboard</strong> — Ringkasan harian</li>
          <li><strong>Notes</strong> — Catatan cepat</li>
          <li><strong>Todo</strong> — Manajemen tugas</li>
          <li><strong>Bookmarks</strong> — Link penting</li>
          <li><strong>Tracker</strong> — Pengeluaran/pemasukan</li>
          <li><strong>Settings</strong> — Preferensi</li>
        </ul>
        <h3 style="margin:10px 0 6px;font-size:.95rem">Teknis</h3>
        <p style="color:var(--ink-weak);margin:0">Pure HTML/CSS/JS, localStorage, Cloudflare Pages.</p>
      </div>
    `;
  };

  window.DW.route.add('#/about', renderAbout);
})();

(() => {
  'use strict';
  const { $ } = window.DW;

  const renderSettings = (view) => {
    const settings = { theme: 'dark', defaultPriority: 'medium', currency: 'IDR', ...($('#s') || {}) };

    view.innerHTML = `
      <div class="hero"><h1>Settings</h1><p>Prefensi aplikasi.</p></div>
      <div class="card">
        <form id="settingsForm" class="fields">
          <div class="field"><label>Tema</label><select class="input" id="s_theme"><option value="dark">Gelap</option><option value="light">Terang</option></select></div>
          <div class="field"><label>Prioritas default</label><select class="input" id="s_priority"><option value="high">Tinggi</option><option value="medium" selected>Sedang</option><option value="low">Rendah</option></select></div>
          <div class="field"><label>Mata uang</label><input class="input" id="s_currency" value="${settings.currency || 'IDR'}"></div>
          <div class="actions"><button class="btn" type="submit">Simpan</button><button class="btn secondary" id="s_export" type="button">Export JSON</button><button class="btn danger" id="s_reset" type="button">Reset semua data</button></div>
        </form>
      </div>
    `;

    document.getElementById('s_theme').value = settings.theme || 'dark';
    document.getElementById('s_priority').value = settings.defaultPriority || 'medium';
    document.getElementById('s_currency').value = settings.currency || 'IDR';

    document.getElementById('settingsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      window.DW.storage.set('settings', { theme: document.getElementById('s_theme').value, defaultPriority: document.getElementById('s_priority').value, currency: document.getElementById('s_currency').value.trim() || 'IDR' });
      alert('Settings saved');
    });

    document.getElementById('s_export').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(window.DW.storage, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'dw-backup-' + window.DW.today() + '.json'; a.click();
    });

    document.getElementById('s_reset').addEventListener('click', () => {
      if (!confirm('Reset semua data?')) return;
      localStorage.clear();
      location.hash = '#/dashboard';
    });
  };

  window.DW.route.add('#/settings', renderSettings);
})();

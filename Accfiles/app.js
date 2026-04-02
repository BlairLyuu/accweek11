// app.js — Navigation, UI, localStorage

// ─── Navigation ──────────────────────────────────────────────────────

function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

function goToScreen(screenId) {
  document.querySelectorAll('.result-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

// ─── LocalStorage ────────────────────────────────────────────────────

function saveResult(data) {
  localStorage.setItem('ming_result', JSON.stringify(data));
}

function loadResult() {
  const raw = localStorage.getItem('ming_result');
  return raw ? JSON.parse(raw) : null;
}

function saveResonance(value) {
  localStorage.setItem('ming_resonance', value);
  // Visual feedback
  document.querySelectorAll('.resonance-btns button').forEach(b => b.classList.remove('active'));
  const map = { yes: 'res-yes', somewhat: 'res-somewhat', no: 'res-no' };
  document.getElementById(map[value]).classList.add('active');
}

// ─── Calculate ───────────────────────────────────────────────────────

function calculate() {
  const year  = parseInt(document.getElementById('birth-year').value);
  const month = parseInt(document.getElementById('birth-month').value);
  const day   = parseInt(document.getElementById('birth-day').value);
  const hour  = document.getElementById('birth-hour').value;

  // Basic validation
  if (!year || !month || !day) {
    alert('Please enter your full birth date.');
    return;
  }
  if (year < 1924 || year > 2006) {
    alert('Please enter a year between 1924 and 2006.');
    return;
  }

  // Show loading
  goTo('page-loading');

  // Small delay for loading feel
  setTimeout(() => {
    try {
      const result = getStemIndex(year, month, day);
      if (!result) throw new Error('Calculation failed');

      const { dayStem, bazi } = result;
      const dayMaster = DAY_MASTERS[dayStem];
      const elementCounts = getElementDistribution(bazi);
      const missing = getMissingElements(elementCounts);

      const data = { dayStem, dayMaster, elementCounts, missing, year, month, day, hour };
      saveResult(data);
      renderResult(data);
      goTo('page-result');
      goToScreen('screen-daymaster');

    } catch(e) {
      console.error(e);
      alert('Something went wrong. Please check your birth date and try again.');
      goTo('page-input');
    }
  }, 1800);
}

// ─── Render Result ───────────────────────────────────────────────────

function renderResult(data) {
  const { dayStem, dayMaster, elementCounts, missing } = data;
  const colors = ELEMENT_COLORS[dayMaster.element];

  // Apply element theme to body
  document.body.setAttribute('data-element', dayMaster.element.toLowerCase());

  // Screen 1 — Day Master
  document.getElementById('result-char').textContent  = dayStem;
  document.getElementById('result-label').textContent = `${dayMaster.pinyin} ${dayMaster.element}`;
  document.getElementById('result-tagline').textContent = dayMaster.tagline;
  document.getElementById('result-copy').innerHTML    = dayMaster.copy;

  // Screen 2 — Elements chart
  renderElementsChart(elementCounts, missing);

  // Screen 3 — 2026
  document.getElementById('liunian-copy').innerHTML = LIUNIAN_2026.copy;

  // Share card
  document.getElementById('card-char').textContent    = dayStem;
  document.getElementById('card-name').textContent    = `${dayMaster.pinyin} ${dayMaster.element}`;
  document.getElementById('card-tagline').textContent = dayMaster.tagline;
  document.getElementById('card-line').textContent    = dayMaster.taglineShort;
}

function renderElementsChart(counts, missing) {
  const container = document.getElementById('elements-chart');
  const elements = [
    { name: 'Wood',  char: '木', color: '#4a7c4a' },
    { name: 'Fire',  char: '火', color: '#c45c1a' },
    { name: 'Earth', char: '土', color: '#8a7040' },
    { name: 'Metal', char: '金', color: '#8090b0' },
    { name: 'Water', char: '水', color: '#2060a0' },
  ];

  const max = Math.max(...Object.values(counts), 1);

  container.innerHTML = elements.map(el => {
    const count = counts[el.name] || 0;
    const pct   = Math.round((count / max) * 100);
    const isEmpty = count === 0;
    return `
      <div class="element-row ${isEmpty ? 'empty' : ''}">
        <span class="el-char" style="color:${el.color}">${el.char}</span>
        <span class="el-name">${el.name}</span>
        <div class="el-bar-track">
          <div class="el-bar" style="width:${isEmpty ? 4 : pct}%; background:${el.color}; opacity:${isEmpty ? 0.2 : 1}"></div>
        </div>
        <span class="el-count">${count}</span>
      </div>`;
  }).join('');

  // Note about missing elements
  const note = document.getElementById('elements-note');
  if (missing.length > 0) {
    note.innerHTML = `<em>Missing: ${missing.join(', ')}</em> — not a flaw. The elements you lack are the ones you spend your life seeking out.`;
  } else {
    note.innerHTML = `Your chart is unusually balanced. You carry all five elements — a rare kind of wholeness that comes with its own kind of restlessness.`;
  }
}

// ─── Init: check for saved result ────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  const saved = loadResult();
  if (saved) {
    // Show returning user message on landing
    const eyebrow = document.querySelector('.eyebrow');
    if (eyebrow && saved.dayMaster) {
      eyebrow.textContent = `Welcome back · ${saved.dayStem} ${saved.dayMaster.element}`;
    }
    // Add a "See my result" button
    const landingContent = document.querySelector('.landing-content');
    const returnBtn = document.createElement('button');
    returnBtn.className = 'btn-ghost';
    returnBtn.textContent = `← See my ${saved.dayMaster.element} reading`;
    returnBtn.onclick = () => {
      renderResult(saved);
      goTo('page-result');
      goToScreen('screen-daymaster');
    };
    landingContent.appendChild(returnBtn);
  }
});

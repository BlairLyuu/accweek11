// app.js

const PAGE_ORDER = ['p-landing','p-input','p-loading','p-result','p-resonance','p-more'];

function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
  // Update progress bar
  const idx = PAGE_ORDER.indexOf(pageId);
  const pct = idx < 0 ? 0 : Math.round(((idx + 1) / PAGE_ORDER.length) * 100);
  document.getElementById('page-indicator').style.setProperty('--progress', pct + '%');
}

function calculate() {
  const year  = parseInt(document.getElementById('birth-year').value);
  const month = parseInt(document.getElementById('birth-month').value);
  const day   = parseInt(document.getElementById('birth-day').value);

  if (!year || !month || !day) { alert('Please enter your full birth date.'); return; }
  if (year < 1924 || year > 2006) { alert('Please enter a year between 1924 and 2006.'); return; }

  goTo('p-loading');

  setTimeout(() => {
    try {
      const solar   = Solar.fromYmd(year, month, day);
      const bazi    = solar.getLunar().getEightChar();
      const dayStem = bazi.getDayGan();
      const dm      = DAY_MASTERS[dayStem];
      if (!dm) throw new Error('Unknown stem: ' + dayStem);

      localStorage.setItem('ming_result', JSON.stringify({ dayStem, dayMaster: dm }));
      renderResult(dayStem, dm);
      goTo('p-result');
    } catch(e) {
      console.error(e);
      alert('Something went wrong. Please check your birth date and try again.');
      goTo('p-input');
    }
  }, 1500);
}

function renderResult(dayStem, dm) {
  // Apply 10-colour theme
  document.body.setAttribute('data-stem', dayStem);

  document.getElementById('result-char').textContent    = dayStem;
  document.getElementById('result-label').textContent   = dm.pinyin + ' · ' + dm.element;
  document.getElementById('result-tagline').textContent = dm.tagline;
  document.getElementById('result-copy').innerHTML      = dm.copy;
  document.getElementById('liunian-note').innerHTML     =
    '<span class="liunian-label">丙午年 2026 · </span>' + LIUNIAN_2026.oneliner[dm.element];
}

function selectResonance(value) {
  localStorage.setItem('ming_resonance', value);

  // Visual state
  document.querySelectorAll('.res-btn').forEach(b => b.classList.remove('selected'));
  const ids = { yes: 'res-yes', somewhat: 'res-somewhat', no: 'res-no' };
  document.getElementById(ids[value]).classList.add('selected');

  // Contextual note
  const notes = {
    yes:      'That recognition is part of what BaZi is for. The Day Master is the element you return to.',
    somewhat: 'BaZi works best read alongside your full chart — the Day Master is one of eight characters.',
    no:       'Your Day Master is a starting point. The full chart includes seven more characters that shape it.'
  };
  const noteEl = document.getElementById('res-note');
  noteEl.textContent = notes[value];
  noteEl.style.display = 'block';

  // Show next button
  document.getElementById('btn-next-res').style.display = 'inline-block';
}

function restart() {
  document.body.removeAttribute('data-stem');
  localStorage.removeItem('ming_result');
  localStorage.removeItem('ming_resonance');
  goTo('p-input');
}

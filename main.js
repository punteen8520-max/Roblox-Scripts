/* ─── Copy Script to Clipboard ─── */
function copyScript(id, btn) {
  const text = document.getElementById(id).textContent.trim();

  const doSuccess = () => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => {
      btn.innerHTML = '📋 Copy Script';
      btn.classList.remove('copied');
    }, 2000);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(doSuccess).catch(() => {
      fallbackCopy(text);
      doSuccess();
    });
  } else {
    fallbackCopy(text);
    doSuccess();
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

/* ─── Toast Notification ─── */
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* ─── Tab Filter ─── */
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const game = tab.dataset.game;
    const query = document.getElementById('searchInput').value;
    filterCards(game, query);
  });
});

/* ─── Search Filter ─── */
document.getElementById('searchInput').addEventListener('input', function () {
  const activeGame = document.querySelector('.tab.active').dataset.game;
  filterCards(activeGame, this.value);
});

/* ─── Filter Logic ─── */
function filterCards(game, query) {
  const cards = document.querySelectorAll('.card');
  const q = query.toLowerCase().trim();

  cards.forEach(card => {
    const matchGame  = game === 'all' || card.dataset.game === game;
    const matchQuery = !q
      || card.dataset.name.toLowerCase().includes(q)
      || card.dataset.game.toLowerCase().includes(q);

    card.classList.toggle('hidden', !(matchGame && matchQuery));
  });
}

/* ─── Stagger card animation on load ─── */
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.animationDelay = (i * 0.06) + 's';
});
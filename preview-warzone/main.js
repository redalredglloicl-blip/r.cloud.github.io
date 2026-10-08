/**
 * main.js — Entry point
 * Initializes loading sequence then starts the game.
 */

window.addEventListener('DOMContentLoaded', () => {
  const loadBar  = document.getElementById('load-bar');
  const loadText = document.getElementById('load-text');
  const loadScreen = document.getElementById('loading-screen');
  const mainMenu   = document.getElementById('main-menu');

  const steps = [
    [10,  'Loading engine…'],
    [30,  'Building map geometry…'],
    [55,  'Spawning enemies…'],
    [75,  'Preparing weapons…'],
    [90,  'Calibrating physics…'],
    [100, 'Ready to deploy.'],
  ];

  let i = 0;
  function nextStep() {
    if (i >= steps.length) {
      setTimeout(() => {
        loadScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        setupMenu();
      }, 400);
      return;
    }
    const [pct, msg] = steps[i++];
    loadBar.style.width = pct + '%';
    loadText.textContent = msg;
    setTimeout(nextStep, 300 + Math.random() * 250);
  }
  setTimeout(nextStep, 200);
});

/* ---- Menu wiring ---- */
function setupMenu() {
  const mainMenu      = document.getElementById('main-menu');
  const settingsPanel = document.getElementById('settings-panel');
  const btnPlay       = document.getElementById('btn-play');
  const btnSettings   = document.getElementById('btn-settings');
  const btnClose      = document.getElementById('btn-settings-close');
  const sensSlider    = document.getElementById('sens-slider');
  const sensVal       = document.getElementById('sens-val');
  const volSlider     = document.getElementById('vol-slider');
  const volVal        = document.getElementById('vol-val');
  const fpsToggle     = document.getElementById('fps-toggle');

  btnPlay.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    startGame();
  });

  btnSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('hidden');
  });

  btnClose.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
  });

  sensSlider.addEventListener('input', () => {
    const v = parseFloat(sensSlider.value).toFixed(1);
    sensVal.textContent = v;
    if (window.gameInstance) window.gameInstance.setSensitivity(parseFloat(v));
  });

  volSlider.addEventListener('input', () => {
    const v = Math.round(volSlider.value * 100);
    volVal.textContent = v + '%';
    if (window.gameInstance) window.gameInstance.setVolume(parseFloat(volSlider.value));
  });

  fpsToggle.addEventListener('change', () => {
    const el = document.getElementById('fps-counter');
    el.style.display = fpsToggle.checked ? 'block' : 'none';
  });
}

function startGame() {
  if (window.gameInstance) {
    window.gameInstance.destroy();
  }
  window.gameInstance = new Game();
  window.gameInstance.init();
}

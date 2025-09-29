// js/modules/theme-toggle.js
(function (global) {
  function initThemeToggle(selector = '.theme-toggle', storageKey = 'theme') {
    const root = document.documentElement;
    const toggle = document.querySelector(selector);

    // initial aus localStorage (default: light)
    const saved = localStorage.getItem(storageKey);
    const initial = saved || 'light';
    root.setAttribute('data-theme', initial);
    if (toggle) toggle.checked = (initial === 'dark');

    if (toggle) {
      // erste Klick-Animation erlauben
      toggle.addEventListener('click', () => {
        toggle.classList.remove('pristine');
      }, { once: true });

      // Wechsel Light/Dark
      toggle.addEventListener('change', () => {
        const next = toggle.checked ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem(storageKey, next);
      });
    }
  }

  global.initThemeToggle = initThemeToggle;
})(window);

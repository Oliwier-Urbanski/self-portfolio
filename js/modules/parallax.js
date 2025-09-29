// js/modules/parallax.js
(function (global) {
  function initParallax(selector = '.parallax-min .layer.fg', defaultSpeed = 0.18) {
    const fg = document.querySelector(selector);
    if (!fg) return;

    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = parseFloat(fg.dataset.speed || defaultSpeed);
    let ticking = false;

    function apply() {
      const y = window.scrollY || 0;
      fg.style.willChange = 'transform';
      fg.style.transform = prefersReduced
        ? 'translate3d(0,0,0)'
        : `translate3d(0, ${y * speed}px, 0)`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    }

    apply();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', apply);
  }

  global.initParallax = initParallax;
})(window);

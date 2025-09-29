// js/modules/nav.js
(function (global) {
  function setHeaderHeight() {
    const header = document.querySelector('header');
    const h = header?.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }

  function initSmoothScroll() {
    const header = document.querySelector('header');
    function scrollWithOffset(target) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return;
      const headerH = header?.offsetHeight || 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        scrollWithOffset(target);
      });
    });
  }

  function initActiveNav() {
    const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    if (!links.length) return;
    const map = new Map(); // sectionEl -> linkEl
    links.forEach(link => {
      const id = link.getAttribute('href');
      const sec = id ? document.querySelector(id) : null;
      if (sec) map.set(sec, link);
    });
    function setActive(link) {
      links.forEach(l => l.classList.toggle('active', l === link));
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = map.get(entry.target);
          if (link) setActive(link);
        }
      });
    }, { root: null, threshold: 0.35, rootMargin: '-15% 0px -50% 0px' });
    map.forEach((_, sec) => io.observe(sec));
  }

  function initNavShadow() {
    const navWrap = document.querySelector('.nav-wrap') || document.querySelector('header');
    if (!navWrap) return;
    function onScroll() {
      const add = window.scrollY > 20;
      navWrap.classList.toggle('shadow-lg', add);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  global.setHeaderHeight = setHeaderHeight;
  global.initSmoothScroll = initSmoothScroll;
  global.initActiveNav  = initActiveNav;
  global.initNavShadow  = initNavShadow;
})(window);

<<<<<<< HEAD
// script.js — Core Interactions
// - Footer year
// - Dark/Light toggle (via .sun)
// - Smooth scroll with header offset
// - Active nav state on scroll
// - Reveal-on-Scroll
// - Navbar shadow on scroll
// - Keyboard-only focus ring helper

(function(){
  // ===== Helpers =====
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // ===== Footer year =====
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Header height as CSS var (for scroll offset, if your CSS uses it) =====
  const header = $('header');
  function setHeaderHeight(){
    const h = header?.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  // ===== Theme toggle (single dark option) =====
  (function themeToggle(){
    const root = document.documentElement;
    const key = 'theme';

    // initial: default to light unless user saved dark
    const saved = localStorage.getItem(key);
    const initial = saved || 'light';
    root.setAttribute('data-theme', initial);

    const sun = $('.sun');
    if (sun) {
      sun.setAttribute('title','Toggle Dark/Light');
      sun.style.cursor = 'pointer';
      sun.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem(key, next);
      });
    }
  })();

  // ===== Smooth scroll (accounts for fixed header) =====
  function scrollWithOffset(target){
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    const headerH = header?.offsetHeight || 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      scrollWithOffset(target);
    });
  });

  // ===== Active nav state on scroll =====
  (function activeNav(){
    const links = $$('nav a[href^="#"]');
    if (!links.length) return;
    const map = new Map(); // sectionEl -> linkEl
    links.forEach(link => {
      const id = link.getAttribute('href');
      const sec = id ? $(id) : null;
      if (sec) map.set(sec, link);
    });

    function setActive(link){
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
  })();

  // ===== Reveal-on-Scroll =====
  (function reveal(){
    const els = $$('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
  })();

  // ===== Navbar shadow on scroll =====
  (function navShadow(){
    const navWrap = $('.nav-wrap') || $('header');
    if (!navWrap) return;
    function onScroll(){
      const add = window.scrollY > 20;
      navWrap.classList.toggle('shadow-lg', add);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  // ===== Keyboard-only focus ring helper =====
  (function keyboardOnlyFocus(){
    function onFirstTab(e){
      if (e.key === 'Tab'){
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', onFirstTab);
      }
    }
    window.addEventListener('keydown', onFirstTab);
  })();
=======
// Dateiname: script.js

// Dynamisches Jahr im Footer
document.getElementById('year').textContent = new Date().getFullYear();

// IntersectionObserver für Reveal-on-Scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Smooth Scrolling für interne Links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Dark/Light Mode Toggle (Tailwind-like)
const toggleThemeBtn = document.createElement('button');
toggleThemeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h1M2 12H1m16.95 7.95l.71.71M4.05 4.05l.71.71M12 5a7 7 0 100 14a7 7 0 000-14z"/></svg>`;
toggleThemeBtn.className = 'fixed bottom-4 right-4 p-3 rounded-full shadow-lg bg-gray-800 text-white hover:scale-110 transition-transform duration-200';
document.body.appendChild(toggleThemeBtn);

// Toggle Funktion mit localStorage-Persistenz
const root = document.documentElement;
const theme = localStorage.getItem('theme');
if (theme === 'light') {
  root.classList.add('light');
}

toggleThemeBtn.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Sticky Navbar Shadow on Scroll
const navWrap = document.querySelector('.nav-wrap');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navWrap.classList.add('shadow-lg');
  } else {
    navWrap.classList.remove('shadow-lg');
  }
});

// Kleine Focus-Ring-Optimierung für Tastatur-User
(function keyboardOnlyFocus() {
  function onFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', onFirstTab);
    }
  }
  window.addEventListener('keydown', onFirstTab);
>>>>>>> origin/main
})();

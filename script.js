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

// ===== Theme Toggle (Next-themes-like) =====
(function(){
  const KEY = 'theme';
  const root = document.documentElement;
  const btn  = document.getElementById('modeToggle'); // kommt aus Schritt 2 (Button in der Navbar)
  if(!btn) return; // solange kein Button existiert, sauber aussteigen

  // resolvedTheme: user saved OR system
  function resolvedTheme(){
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // initial sync (falls Pre-Paint-Script mal fehlt)
  root.setAttribute('data-theme', resolvedTheme());

  // click → toggle light/dark
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
  });

  // system changes übernehmen, wenn User nichts gewählt hat
  try{
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', () => {
      if(!localStorage.getItem(KEY)){
        root.setAttribute('data-theme', mq.matches ? 'dark' : 'light');
      }
    });
  }catch(_){}
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
})();


// === Minimaler Parallax für EIN Vordergrund-Layer (.parallax-min .layer.fg)
(() => {
  const fg = document.querySelector('.parallax-min .layer.fg');
  if (!fg) return;

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speed = parseFloat(fg.dataset.speed || '0.18');

  let ticking = false;
  function apply(){
    const y = window.scrollY || 0;
    fg.style.transform = prefersReduced ? 'translate3d(0,0,0)' : `translate3d(0, ${y * speed}px, 0)`;
    ticking = false;
  }
  function onScroll(){
    if (!ticking){ requestAnimationFrame(apply); ticking = true; }
  }

  apply();
  addEventListener('scroll', onScroll, { passive:true });
  addEventListener('resize', apply);
})();


;document.addEventListener('DOMContentLoaded', function(){
  const root = document.getElementById('jobs-list');
  if(!root) return;

  // === Deine Jobs: hier pflegst du Inhalte ===
  const JOBS = [
    {
      title: "Application Developer Apprentice — STRATO / IONOS",
      logo: "./assets/company/strato.png",         
      website: "https://www.strato.de/",
      date: "2024 - present",
      detail: "Test Automation (Python, Selenium, Appium), Clean QA Flows, Early Frontend Development",
      achievements: [
        "Designed and executed Selenium-based test automation for mail archiving.",
        "Built and stabilized Appium test flows for the HiDrive Next macOS client.",
        "Streamlined Git workflows and enhanced overall project structure."
      ]
    },
    {
      title: "Volunteer Developer — Ulifyi",
      logo: "./assets/company/uli.png",        
      logoDark: "./assets/company/uli-white.png", 
      website: "https://www.uli.fyi/",
      date: "2025 - present",
      detail: "Contributed to frontend improvements and feature updates.",
      achievements: [
        " Implemented website changes using JavaScript to enhance user experience.",
        " Supported iterative design adjustments and bug fixes across the platform. "

      ]
    }
  ];

  const EDU = [
  {
    title: "STRATO / IONOS · Apprenticeship (practical training)",
    logo: "./assets/company/strato.png",   
    website: "https://www.ionos.de/",
    date: "2024 – present",
    detail: "Company-based apprenticeship",
    achievements: [
      "Hands-on QA automation (Selenium/Appium).",
      "Daily use of Git, CI/CD, and clean code practices."
    ]
  },
  {
    title: "OSZ Information and Medical Technology · Apprenticeship school (theoretical training)",
    logo: "./assets/company/osz-imt.png",     
    website: "https://www.oszimt.de/",
    date: "2024 – present",
    detail: "Databases & SQL basics.",
    achievements: [
      "Java fundamentals & OOP.",
      "Databases & SQL basics."
    ]
  }
];


  function jobCard(job){
    const el = document.createElement('article');
    el.className = 'job';
    el.innerHTML = `
      <div class="job-head">
        <div class="job-title">
${job.logoDark
  ? `
     <img class="logo light" src="${job.logo}" alt="${job.title} Logo">
     <img class="logo dark"  src="${job.logoDark}" alt="${job.title} Dark Logo">
    `
  : (job.logo
      ? `<img class="logo" src="${job.logo}" alt="${job.title} Logo">`
      : `<span class="logo" aria-hidden="true"></span>`
    )
}

          <span>${job.title}</span>
        </div>
        <div class="job-meta">
          ${job.website ? `<a href="${job.website}" target="_blank" rel="noopener">Website</a> · ` : ``}
          ${job.date || ``}
        </div>
      </div>
      ${job.detail ? `<p style="margin-top:.5rem">${job.detail}</p>` : ``}
      <div class="job-detail">
        ${Array.isArray(job.achievements) && job.achievements.length
          ? `<ul>${job.achievements.map(a => `<li>${a}</li>`).join('')}</ul>` : ``}
      </div>
    `;
    el.addEventListener('click', () => el.classList.toggle('open'));
    return el;
  }

  JOBS.forEach(j => root.appendChild(jobCard(j)));
  // === Educations rendern (gleiche Card-Logik)
const eduRoot = document.getElementById('edu-list');
if (eduRoot) {
  EDU.forEach(e => eduRoot.appendChild(jobCard(e)));
}

});

function showPopup(message, title = 'Alles klar!') {
  const root = document.getElementById('popup');
  if (!root) return;
  root.querySelector('#popup-title').textContent = title;
  root.querySelector('#popup-msg').textContent = message;
  root.classList.add('is-open');

  // ESC schließt
  const onKey = (e) => { if (e.key === 'Escape') hidePopup(); };
  document.addEventListener('keydown', onKey, { once: true });

  // Auto-Dismiss nach 3.2s
  root._autoTimer && clearTimeout(root._autoTimer);
  root._autoTimer = setTimeout(hidePopup, 3200);
}

function hidePopup() {
  const root = document.getElementById('popup');
  if (!root) return;
  root.classList.remove('is-open');
}

(() => {
  const root = document.getElementById('popup');
  if (!root) return;
  root.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]') || e.target.closest('[data-close]')) hidePopup();
  });
})();

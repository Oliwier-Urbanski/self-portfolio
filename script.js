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


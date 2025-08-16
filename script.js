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
})();

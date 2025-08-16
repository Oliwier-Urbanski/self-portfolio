/*!
 * reveal.js — v2.2 (Pop + Grid‑safe)
 *
 * Ziele
 *  - About‑Tools: ALLE Icons gleichzeitig, kräftiger "Pop" von unten
 *  - Wiederholt bei hoch/runter scrollen (once=false)
 *  - Grid bleibt stabil wie am Anfang (Grid‑Fix wird injiziert)
 *
 * Nutzung
 *  1) Diese Datei als reveal.js einbinden (vor </body>): <script src="reveal.js" defer></script>
 *  2) In HTML reicht: <ul id="about-tools" class="techGrid"> … <li class="tech">…</li></ul>
 *     (IDs/Klassen kannst du anpassen – unten im CONFIG ändern)
 */
(function(){
    const CONFIG = {
      // Container + Kinder für About‑Tools (alles auf einmal)
      about: { container: '#about .techGrid', children: '.tech, li, svg, img' },
      // Zusätzliche Einzel-Selektoren, die separat poppen dürfen (optional)
      items: ['#services .svcCard', '#projects .projCard'],
  
      // Sichtbarkeit / Trigger
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px',
      once: false,  // false = beim Verlassen zurücksetzen → beim Zurückscrollen erneut animieren
  
      // Pop-Animation (Keyframes)
      duration: 900, // ms
      ease: 'cubic-bezier(.2,.7,.2,1)',
      distance: 48,  // px Start-Versatz nach unten
      startScale: 0.82,
      blur:2
    };
  
    // ————————————————————————————————————————————————
    // CSS: Startzustand + Keyframes + Grid-Fix injizieren
    // ————————————————————————————————————————————————
    function injectCSS(){
      if (document.getElementById('reveal-v22-style')) return;
      const css = document.createElement('style');
      css.id = 'reveal-v22-style';
      css.textContent = `
        @media (prefers-reduced-motion: no-preference) {
          .sr-prep{ opacity:0; transform: translate3d(0, var(--sr-distance, ${CONFIG.distance}px), 0) scale(var(--sr-scale, ${CONFIG.startScale})); filter: blur(var(--sr-blur, ${CONFIG.blur}px)); will-change: opacity, transform, filter; backface-visibility: hidden; }
          .sr-pop{ opacity:1; animation: sr-pop-up var(--sr-dur, ${CONFIG.duration}ms) var(--sr-ease, ${CONFIG.ease}) both; }
          @keyframes sr-pop-up {
            0%   { opacity:0; transform: translate3d(0, ${CONFIG.distance}px, 0) scale(${CONFIG.startScale}); filter: blur(${CONFIG.blur}px); }
            55%  { opacity:1; transform: translate3d(0, -8px, 0) scale(1.06); filter: blur(2px); }
            72%  { transform: translate3d(0, 4px, 0) scale(.985); }
            100% { transform: translate3d(0, 0, 0) scale(1); filter: none; }
          }
        }
        @media (prefers-reduced-motion: reduce){
          .sr-prep{ opacity:1 !important; transform:none !important; filter:none !important; }
          .sr-pop{ animation: none !important; }
        }
  
        /* GRID-FIX: sorgt dafür, dass die Tools im Raster bleiben (falls irgendwas CSS überlagert) */
        ${CONFIG.about.container}{
          display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:18px; list-style:none; padding:0; margin:22px 0 0; align-items:stretch; justify-items:stretch;
        }
        ${CONFIG.about.container} > .tech, ${CONFIG.about.container} > li{ display:flex; align-items:center; gap:12px; }
      `;
      document.head.appendChild(css);
    }
  
    // ————————————————————————————————————————————————
    // Observer: Gruppe (alle Kinder gleichzeitig) & einzelne Items
    // ————————————————————————————————————————————————
    function prep(el){ el.classList.add('sr-prep'); el.classList.remove('sr-pop'); }
    function play(el){ el.classList.remove('sr-prep'); el.classList.add('sr-pop'); }
  
    function primeAboutGroup(){
      const c = document.querySelector(CONFIG.about.container);
      if (!c) return;
      const kids = Array.from(c.querySelectorAll(CONFIG.about.children)).filter(n => n instanceof HTMLElement);
      kids.forEach(prep);
  
      const groupIO = new IntersectionObserver((entries)=>{
        entries.forEach(en => {
          if (en.isIntersecting && en.intersectionRatio >= CONFIG.threshold){
            kids.forEach(play);  // ALLE gleichzeitig
            if (CONFIG.once) groupIO.unobserve(c);
          } else if (!CONFIG.once){
            kids.forEach(prep);
          }
        });
      }, { threshold: CONFIG.threshold, rootMargin: CONFIG.rootMargin });
  
      groupIO.observe(c);
    }
  
    function primeItems(){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(en => {
          const el = en.target;
          if (en.isIntersecting && en.intersectionRatio >= CONFIG.threshold){
            play(el);
            if (CONFIG.once) io.unobserve(el);
          } else if (!CONFIG.once){
            prep(el);
          }
        });
      }, { threshold: CONFIG.threshold, rootMargin: CONFIG.rootMargin });
  
      CONFIG.items.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => { prep(el); io.observe(el); });
      });
    }
  
    // ————————————————————————————————————————————————
    // Boot
    // ————————————————————————————————————————————————
    function boot(){
      injectCSS();
      primeAboutGroup();
      primeItems();
    }
  
    if (document.readyState !== 'loading') boot();
    else document.addEventListener('DOMContentLoaded', boot);
  })();
  
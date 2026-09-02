/* ============================================================
   DATA
   ============================================================ */

const ICONS = {
  mic:   `<path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z"/><path d="M19 11a7 7 0 01-14 0M12 18v3"/>`,
  camera:`<rect x="3" y="7" width="18" height="12" rx="1"/><circle cx="12" cy="13" r="3.2"/><path d="M8 7l1.6-2.5h4.8L16 7"/>`,
  spark: `<path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/>`,
  glass: `<path d="M8 21h8M12 21V13M6 3h12l-1.5 6a4.5 4.5 0 01-9 0z"/><path d="M6 5H3a4 4 0 004 4M18 5h3a4 4 0 01-4 4"/>`,
  seats: `<path d="M4 19V9l8-5 8 5v10"/><path d="M9 19v-6h6v6"/>`,
  trophy:`<path d="M8 21h8M12 21v-6M7 4h10v4a5 5 0 01-10 0z"/><path d="M7 6H4a4 4 0 004 4M17 6h3a4 4 0 01-4 4"/>`,
  booth: `<path d="M3 20h18M5 20V9l4-3 4 3v11M13 20v-6h4v6"/>`,
  balloon:`<path d="M12 15a5 5 0 100-10 5 5 0 000 10z"/><path d="M12 15l-1 6 2 0-1-6z"/>`,
  ring:  `<circle cx="9" cy="15" r="4"/><circle cx="16" cy="12" r="3"/>`,
  network:`<circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20c0-3 2.5-5 5-5s5 2 5 5M12 20c0-3 2.5-5 5-5s5 2 5 5"/>`,
  curtain:`<path d="M4 4v16M20 4v16M4 4c4 3 4 7 0 10M20 4c-4 3-4 7 0 10"/>`,
  heart: `<path d="M12 21s-7-4.35-9.5-8.3C.9 9.2 2.4 5.7 6 5.1 8.2 4.7 10.3 5.8 12 8c1.7-2.2 3.8-3.3 6-2.9 3.6.6 5.1 4.1 3.5 7.6C19 16.65 12 21 12 21z"/>`,
  pool:  `<path d="M2 17c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0"/><path d="M6 13V6a2 2 0 012-2h3l5 5v4"/>`,
  candle:`<path d="M9 21h6M12 21V9M9 9h6l-1-3h-4z"/><path d="M12 6c-1-1.4-1-2.6 0-4 1 1.4 1 2.6 0 4z"/>`,
  lights:`<path d="M3 5c4 3 14 3 18 0"/><circle cx="6" cy="10" r="1.4"/><circle cx="11" cy="12" r="1.4"/><circle cx="16" cy="10" r="1.4"/><circle cx="20" cy="8" r="1.4"/>`
};
function frameIconHTML(name, opts=''){
  return `<div class="frame-icon" style="left:22px; bottom:22px; width:30px; height:30px; ${opts}"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.3">${ICONS[name]}</svg></div>`;
}
function frame(tone, icon, cap, small, imgUrl){
  const imgTag = imgUrl ? `<img src="${imgUrl}" alt="${cap||''}">` : '';
  const iconTag = imgUrl ? '' : frameIconHTML(icon);
  return `<div class="frame tone-${tone}">${imgTag}${iconTag}${cap?`<div class="frame-cap">${small?`<small>${small}</small>`:''}${cap}</div>`:''}</div>`;
}

const TONES = ['a','b','c','d','e','f'];

/* ============================================================
   HERO — floating bokeh particles
   ============================================================ */
(function(){
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual) return;
  const wrap = document.createElement('div');
  wrap.className = 'hero-particles';
  heroVisual.appendChild(wrap);

  const COUNT = 50;
  for (let i = 0; i < COUNT; i++){
    const p = document.createElement('span');
    p.className = 'hero-particle';
    const size = Math.random() * 7 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 16 + 14;
    const delay = -Math.random() * duration;
    const drift = (Math.random() * 160 - 80).toFixed(0) + 'px';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = left + '%';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    p.style.setProperty('--drift', drift);
    wrap.appendChild(p);
  }
})();

/* ============================================================
   HERO — typewriter effect (paragraph only, headline untouched)
   ============================================================ */
(function(){
  const el = document.querySelector('.hero-desc');
  if (!el) return;
  const fullText = el.textContent.trim();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    return;
  }

  el.textContent = '';
  el.classList.add('typing-cursor');

  let i = 0;
  const speed = 8;

  function typeStep(){
    if (i <= fullText.length){
      el.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeStep, speed);
    }
  }

  setTimeout(typeStep, 900);
})();

/* ============================================================
   BOKEH PARTICLES — reusable, for any dark/ink section
   ============================================================ */
function addBokehParticles(target, {count=20, zIndex=-1, colorRGB='220,184,104'} = {}){
  if (!target) return;
  const wrap = document.createElement('div');
  wrap.className = 'bokeh-particles';
  wrap.style.zIndex = zIndex;
  target.appendChild(wrap);

  for (let i = 0; i < count; i++){
    const p = document.createElement('span');
    p.className = 'hero-particle';
    const size = Math.random() * 7 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 16 + 14;
    const delay = -Math.random() * duration;
    const drift = (Math.random() * 160 - 80).toFixed(0) + 'px';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = left + '%';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    p.style.setProperty('--drift', drift);
    p.style.background = `radial-gradient(circle, rgba(${colorRGB},.9), rgba(${colorRGB},0) 70%)`;
    wrap.appendChild(p);
  }
}

addBokehParticles(document.querySelector('.services'),  {zIndex:-1, count:22});
addBokehParticles(document.querySelector('.featured'),  {zIndex:-1, count:20});
addBokehParticles(document.querySelector('.why'),       {zIndex:-1, count:18});
addBokehParticles(document.querySelector('.cta-band'),  {zIndex:1,  count:16});

const GALLERY_ITEMS = [
  {icon:'curtain'},
  {icon:'seats'},
  {icon:'glass'},
  {icon:'pool'},
  {icon:'candle'},
  {icon:'lights'},
  {icon:'booth'},
  {icon:'mic'},
  {icon:'trophy'},
  {icon:'camera'}
];

/* ============================================================
   NAV — scroll state + mobile menu
   ============================================================ */
const nav = document.getElementById('nav');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', ()=>{
  nav.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('show', window.scrollY > 700);
}, {passive:true});

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', ()=>{
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
  burger.classList.remove('open'); mobileMenu.classList.remove('open');
}));

/* Back to top */
backTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ============================================================
   NAV — Events submenu (mobile accordion toggle)
   ============================================================ */
document.querySelectorAll('.mobile-dropdown-btn').forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.stopPropagation();
    btn.closest('.mobile-nav-item').classList.toggle('open');
  });
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .tl-item');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, {threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* ============================================================
   BUILD: EVENTS SLIDER
   ============================================================ */
function buildCarousel(container, items, slideClass, big){
  const track = container.querySelector('[data-track]');
  track.innerHTML = items.map((it,i)=>`
    <div class="${slideClass}">
      ${frame(TONES[i % TONES.length], it.icon, it.cap, big?'':null, it.img)}
      ${slideClass==='ev-slide' ? `<h4>${it.cap}</h4><p>${it.desc}</p>` : ''}
    </div>
  `).join('');
}

/* AUTO-SCROLL — "Events we create" slider only (runs once, before the loop below) */
const eventsCarousel = document.querySelector('.events-slider-wrap [data-carousel]');
if (eventsCarousel) {
  const track = eventsCarousel.querySelector('[data-track]');
  let autoRun = true;
  let lastTime = null;
  const SPEED = 60;
  track.style.scrollSnapType = 'none';

  function autoScrollStep(timestamp){
    if (lastTime === null) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (autoRun) {
      track.scrollLeft += SPEED * delta;
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
        track.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScrollStep);
  }
  requestAnimationFrame(autoScrollStep);

  eventsCarousel.addEventListener('mouseenter', ()=> autoRun = false);
  eventsCarousel.addEventListener('mouseleave', ()=> autoRun = true);
  eventsCarousel.addEventListener('touchstart', ()=> autoRun = false, {passive:true});
  eventsCarousel.addEventListener('touchend', ()=> setTimeout(()=> autoRun = true, 2500));

  const eventsSection = document.querySelector('.events-slider-wrap');
  const eventsResetIO = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        track.scrollLeft = 0;
      }
    });
  }, {threshold:0.3});
  eventsResetIO.observe(eventsSection);
}

document.querySelectorAll('[data-carousel]').forEach((carousel, idx)=>{
  const isGallery = carousel.closest('.gallery') !== null;
  const items = isGallery ? GALLERY_ITEMS : (typeof EVENT_TYPES !== 'undefined' ? EVENT_TYPES : []);
  const slideClass = isGallery ? 'gal-slide' : 'ev-slide';
  buildCarousel(carousel, items, slideClass, isGallery);

  const track = carousel.querySelector('[data-track]');
  const dotsWrap = carousel.querySelector('[data-dots]');
  if (!dotsWrap) return;
  const slides = track.children;
  dotsWrap.innerHTML = Array.from(slides).map((_,i)=>`<button data-dot="${i}" class="${i===0?'active':''}"></button>`).join('');
  const dots = dotsWrap.querySelectorAll('button');

  function updateDots(){
    const scrollLeft = track.scrollLeft;
    const slideW = slides[0].getBoundingClientRect().width + 22;
    const active = Math.round(scrollLeft / slideW);
    dots.forEach((d,i)=> d.classList.toggle('active', i===active));
  }
  track.addEventListener('scroll', ()=> requestAnimationFrame(updateDots), {passive:true});

  dots.forEach(d=> d.addEventListener('click', ()=>{
    const i = +d.dataset.dot;
    const slideW = slides[0].getBoundingClientRect().width + 22;
    track.scrollTo({left:i*slideW, behavior:'smooth'});
  }));

  const prevBtn = carousel.querySelector('[data-prev]');
  const nextBtn = carousel.querySelector('[data-next]');
  if (prevBtn) prevBtn.addEventListener('click', ()=>{
    track.scrollBy({left:-(slides[0].getBoundingClientRect().width+22), behavior:'smooth'});
  });
  if (nextBtn) nextBtn.addEventListener('click', ()=>{
    track.scrollBy({left:(slides[0].getBoundingClientRect().width+22), behavior:'smooth'});
  });

  /* drag to scroll */
  let isDown=false, startX, scrollStart;
  track.addEventListener('mousedown', e=>{ isDown=true; startX=e.pageX; scrollStart=track.scrollLeft; track.style.scrollSnapType='none'; });
  window.addEventListener('mouseup', ()=>{ isDown=false; track.style.scrollSnapType='x mandatory'; });
  window.addEventListener('mousemove', e=>{
    if(!isDown) return;
    track.scrollLeft = scrollStart - (e.pageX - startX);
  });
});

/* ============================================================
   FEATURED PROJECT — LIGHTBOX
   ============================================================ */
const galleryFrames = document.querySelectorAll('[data-lightbox-item]');
const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightboxFrame');
let lbIndex = 0;

function openLightbox(i){
  lbIndex = i;
  const src = galleryFrames[i];
  const tone = Array.from(src.classList).find(c=>c.startsWith('tone-'));
  lightboxFrame.className = 'frame ' + tone;
  const img = src.querySelector('img');
  lightboxFrame.innerHTML = img ? `<img src="${img.src}" alt="${img.alt||''}">` : '';
  lightbox.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox(){ lightbox.classList.remove('open'); document.body.style.overflow=''; }
galleryFrames.forEach((el,i)=> el.addEventListener('click', ()=> openLightbox(i)));
document.querySelector('[data-lb-close]').addEventListener('click', closeLightbox);
document.querySelector('[data-lb-prev]').addEventListener('click', ()=> openLightbox((lbIndex-1+galleryFrames.length)%galleryFrames.length));
document.querySelector('[data-lb-next]').addEventListener('click', ()=> openLightbox((lbIndex+1)%galleryFrames.length));
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener('keydown', e=>{
  if(!lightbox.classList.contains('open')) return;
  if(e.key==='Escape') closeLightbox();
  if(e.key==='ArrowLeft') openLightbox((lbIndex-1+galleryFrames.length)%galleryFrames.length);
  if(e.key==='ArrowRight') openLightbox((lbIndex+1)%galleryFrames.length);
});

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */
document.querySelectorAll('[data-counter]').forEach(el=>{
  const target = +el.dataset.counter;
  const suffix = el.dataset.suffix || '';
  const counterIO = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        let cur = 0;
        const step = Math.max(1, Math.round(target/60));
        const t = setInterval(()=>{
          cur += step;
          if(cur >= target){ cur = target; clearInterval(t); }
          el.textContent = cur.toLocaleString() + (cur === target ? suffix : '');
        }, 20);
        counterIO.unobserve(el);
      }
    });
  }, {threshold:0.5});
  counterIO.observe(el);
});

/* ============================================================
   CLIENTS LOGO MARQUEE — duplicate track for seamless loop
   ============================================================ */
const logoTrack = document.getElementById('logoTrack');
logoTrack.innerHTML += logoTrack.innerHTML;

/* ============================================================
   CONTACT FORM (mock submit)
   ============================================================ */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', e=>{
  e.preventDefault();
  formNote.classList.add('show');
  form.reset();
  setTimeout(()=> formNote.classList.remove('show'), 5000);
});

/* ============================================================
   NEXT PROJECTS — lightweight "X days to go" badge (no ticking clock)
   ============================================================ */
document.querySelectorAll('[data-countdown-badge]').forEach(badge=>{
  const target = new Date(badge.dataset.target).getTime();
  function update(){
    const diff = target - Date.now();
    if (diff <= 0){ badge.textContent = 'Happening now'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    badge.textContent = `${d}d ${h}h ${m}m to go`;
  }
  update();
  setInterval(update, 60000);
});

document.querySelectorAll('[data-add-ics]').forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.preventDefault();
    const fmt = s => new Date(s).toISOString().replace(/[-:]|\.\d{3}/g,'');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${btn.dataset.title}
DTSTART:${fmt(btn.dataset.start)}
DTEND:${fmt(btn.dataset.end)}
LOCATION:${btn.dataset.location}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], {type:'text/calendar'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${btn.dataset.title}.ics`;
    link.click();
  });
});

/* ============================================================
   NEXT PROJECTS — coverflow-style dimming on scroll
   ============================================================ */
(function(){
  const track = document.querySelector('.next-grid');
  if (!track) return;
  const cards = track.querySelectorAll('.next-card');

  function updateCoverflow(){
    const trackRect = track.getBoundingClientRect();
    cards.forEach(card=>{
      const r = card.getBoundingClientRect();
      const visLeft = Math.max(r.left, trackRect.left);
      const visRight = Math.min(r.right, trackRect.right);
      const visWidth = Math.max(0, visRight - visLeft);
      const ratio = Math.min(1, visWidth / r.width);
      const opacity = 0.32 + ratio * 0.68;
      const scale = 0.9 + ratio * 0.1;
      card.style.opacity = opacity.toFixed(2);
      card.style.transform = `scale(${scale.toFixed(3)})`;
    });
  }

  updateCoverflow();
  track.addEventListener('scroll', ()=> requestAnimationFrame(updateCoverflow), {passive:true});
  window.addEventListener('resize', updateCoverflow);
})();

/* ============================================================
   NEXT PROJECTS — arrow scroll (unlimited, works alongside drag/swipe)
   ============================================================ */
(function(){
  const track = document.querySelector('.next-grid');
  const prevBtn = document.querySelector('[data-next-prev]');
  const nextBtn = document.querySelector('[data-next-next]');
  if (!track || !prevBtn || !nextBtn) return;

  function scrollAmount(){
    const card = track.querySelector('.next-card');
    return card ? card.getBoundingClientRect().width + 28 : 380;
  }

  function atStart(){ return track.scrollLeft <= 2; }
  function atEnd(){ return track.scrollLeft >= track.scrollWidth - track.clientWidth - 2; }

  prevBtn.addEventListener('click', ()=>{
    if (atStart()){
      track.scrollTo({left: track.scrollWidth, behavior:'smooth'});
    } else {
      track.scrollBy({left:-scrollAmount(), behavior:'smooth'});
    }
  });

  nextBtn.addEventListener('click', ()=>{
    if (atEnd()){
      track.scrollTo({left:0, behavior:'smooth'});
    } else {
      track.scrollBy({left:scrollAmount(), behavior:'smooth'});
    }
  });
})();

/* ============================================================
   EVENT SHOWCASE — data, build, autoscroll, lightbox with thumbnails
   ============================================================ */
const SHOWCASE_IMAGES = [
  {img:'images/IMROS-0100.jpg'},
  {img:'images/IMROS-1163.jpg'},
  {img:'images/IMROS-00497.jpg'},
  {img:'images/IMROS-00274.jpg'},
  {img:'images/IMROS-00453.jpg'},
  {img:'images/IMROS-1086.jpg'},
  {img:'images/_SRT0723.jpg'}
];

const egTrack = document.querySelector('[data-eg-track]');
if (egTrack){
  egTrack.innerHTML = SHOWCASE_IMAGES.map((it,i)=>`
  <div class="eg-slide" data-eg-item data-index="${i}">
    <div class="frame tone-${TONES[i % TONES.length]}">
      <img src="${it.img}">
    </div>
  </div>
`).join('');
}

(function(){
  const wrap = document.querySelector('.event-showcase [data-eg-carousel]');
  if (!wrap) return;
  const track = wrap.querySelector('[data-eg-track]');
  let autoRun = true;
  let lastTime = null;
  const SPEED = 50;

  function step(timestamp){
    if (lastTime === null) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    if (autoRun){
      track.scrollLeft += SPEED * delta;
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1){
        track.scrollLeft = 0;
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  wrap.addEventListener('mouseenter', ()=> autoRun = false);
  wrap.addEventListener('mouseleave', ()=> autoRun = true);
  wrap.addEventListener('touchstart', ()=> autoRun = false, {passive:true});
  wrap.addEventListener('touchend', ()=> setTimeout(()=> autoRun = true, 2500));

  const showcaseSection = document.querySelector('.event-showcase');
  const egIO = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if (e.isIntersecting) track.scrollLeft = 0; });
  }, {threshold:0.25});
  if (showcaseSection) egIO.observe(showcaseSection);

  let isDown=false, startX, scrollStart;
  track.addEventListener('mousedown', e=>{ isDown=true; startX=e.pageX; scrollStart=track.scrollLeft; });
  window.addEventListener('mouseup', ()=> isDown=false);
  window.addEventListener('mousemove', e=>{
    if(!isDown) return;
    track.scrollLeft = scrollStart - (e.pageX - startX);
  });
})();

(function(){
  const lightbox = document.getElementById('egLightbox');
  const imgEl = document.getElementById('egLightboxImg');
  const thumbsWrap = document.getElementById('egLightboxThumbs');
  if (!lightbox || !imgEl || !thumbsWrap) return;

  thumbsWrap.innerHTML = SHOWCASE_IMAGES.map((it,i)=>`
    <div class="eg-thumb" data-eg-thumb="${i}"><img src="${it.img}" alt="${it.cap||''}"></div>
  `).join('');
  const thumbs = thumbsWrap.querySelectorAll('[data-eg-thumb]');

  let current = 0;
  function open(i){
    current = i;
    imgEl.src = SHOWCASE_IMAGES[i].img;
    imgEl.alt = SHOWCASE_IMAGES[i].cap || '';
    thumbs.forEach((t,ti)=> t.classList.toggle('active', ti===i));
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-eg-item]').forEach(el=>{
    el.addEventListener('click', ()=> open(+el.dataset.index));
  });
  thumbs.forEach(t=> t.addEventListener('click', ()=> open(+t.dataset.egThumb)));
  document.querySelector('[data-eg-close]').addEventListener('click', close);
  document.querySelector('[data-eg-prev]').addEventListener('click', ()=> open((current-1+SHOWCASE_IMAGES.length)%SHOWCASE_IMAGES.length));
  document.querySelector('[data-eg-next]').addEventListener('click', ()=> open((current+1)%SHOWCASE_IMAGES.length));
  lightbox.addEventListener('click', e=>{ if (e.target===lightbox) close(); });
  document.addEventListener('keydown', e=>{
    if (!lightbox.classList.contains('open')) return;
    if (e.key==='Escape') close();
    if (e.key==='ArrowLeft') open((current-1+SHOWCASE_IMAGES.length)%SHOWCASE_IMAGES.length);
    if (e.key==='ArrowRight') open((current+1)%SHOWCASE_IMAGES.length);
  });
})();

// ---------- SCROLL REVEAL ----------
(function(){
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if(!('IntersectionObserver' in window) || !targets.length){
    targets.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => io.observe(el));
})();

// ---------- NAV SHADOW ON SCROLL ----------
(function(){
  const nav = document.querySelector('nav.site-nav');
  if(!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
})();

// ---------- MUSIC PLAYER ----------
(function(){
  const player = document.getElementById('player');
  if(!player) return;
  const audio = document.getElementById('theme-audio');
  const btn = document.getElementById('player-toggle');
  const icon = document.getElementById('player-icon');

  function setPlaying(isPlaying){
    player.classList.toggle('playing', isPlaying);
    icon.textContent = isPlaying ? '❚❚' : '▶';
  }

  btn.addEventListener('click', () => {
    if(audio.paused){
      audio.play().then(()=>setPlaying(true)).catch(()=>{});
    } else {
      audio.pause();
      setPlaying(false);
    }
  });
  audio.addEventListener('ended', ()=> setPlaying(false));

  document.querySelectorAll('[data-play-theme]').forEach(el=>{
    el.addEventListener('click', ()=>{
      if(audio.paused){
        audio.play().then(()=>setPlaying(true)).catch(()=>{});
      } else {
        audio.pause();
        setPlaying(false);
      }
    });
  });
})();

// ---------- PRICE REVEAL ----------
document.querySelectorAll('.reveal-btn').forEach(btn=>{
  btn.addEventListener('click', () => {
    const card = btn.closest('.tier-card') || btn.parentElement;
    const priceEl = card.querySelector('.price-value');
    if(priceEl){
      priceEl.classList.add('shown');
      btn.classList.add('used');
    }
  });
});

// ---------- RATE CARD GATE ----------
document.querySelectorAll('.gate-btn').forEach(btn=>{
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.gate);
    if(!target) return;
    const open = target.hasAttribute('hidden');
    if(open){ target.removeAttribute('hidden'); } else { target.setAttribute('hidden',''); }
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Hide placement rates & bundles' : 'View placement rates & bundles';
  });
});

// ---------- MOBILE NAV ----------
document.querySelectorAll('.menu-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const nav = btn.closest('nav');
    const list = nav.querySelector('ul');
    const open = list.style.display === 'flex';
    list.style.display = open ? 'none' : 'flex';
    list.style.flexDirection = 'column';
    list.style.position = 'fixed';
    list.style.top = '68px';
    list.style.right = '20px';
    list.style.background = '#fff';
    list.style.boxShadow = '0 20px 50px -12px rgba(23,22,15,0.18)';
    list.style.borderRadius = '14px';
    list.style.padding = '18px 24px';
    list.style.gap = '16px';
    list.style.zIndex = '200';
  });
});

// ---------- PARTNER FORM — wired to the live Worker on api.bossomovie.com ----------
// Falls back to a mailto: draft if the API isn't reachable yet (e.g. before the
// Worker is deployed, or the visitor is offline) so no inquiry is ever silently lost.
const API_BASE = "https://api.bossomovie.com";

function handleForm(formId, statusId, endpoint, successMsg, subjectLine){
  const form = document.getElementById(formId);
  if(!form) return;
  const status = document.getElementById(statusId);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    const data = Object.fromEntries(new FormData(form).entries());
    try{
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
      });
      if(!res.ok) throw new Error('Request failed');
      status.textContent = successMsg;
      form.reset();
    }catch(err){
      status.textContent = 'Opening email fallback…';
      const subject = encodeURIComponent(subjectLine);
      const body = encodeURIComponent(JSON.stringify(data, null, 2));
      window.location.href = `mailto:partnerships@bossomovie.com?subject=${subject}&body=${body}`;
    }
  });
}

handleForm('partner-form','partner-status','/api/public/partner-lead','Thanks — we\'ll be in touch soon.','Partnership Inquiry');

// ---------- WALL OF BOSSO — public contributor wall (names only, never amounts) ----------
(function(){
  const grid = document.getElementById('wall-grid');
  if(!grid) return;

  const TIER_LABELS = {
    amahlolanyama: 'Supporter',
    ezikabosso: 'Bosso Believer',
    asisozasala: 'Legacy Backer',
    siyinqaba: 'Black & White Founder',
    boardroom: 'The Boardroom',
    diaspora_solo: 'Diaspora Supporter',
    diaspora_host: 'Diaspora Founder',
  };
  function tierLabel(tier){
    if(!tier) return '';
    return TIER_LABELS[tier] || tier.replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  fetch(`${API_BASE}/api/public/wall`)
    .then(res => { if(!res.ok) throw new Error('bad response'); return res.json(); })
    .then(rows => {
      if(!Array.isArray(rows) || rows.length === 0){
        grid.innerHTML = '<p class="wall-state">Be the first name on the wall — join in below.</p>';
        return;
      }
      grid.innerHTML = rows.map(r => `
        <div class="wall-chip">
          <span class="wname">${escapeHtml(r.contributor_name || 'Anonymous')}</span>
          ${r.tier ? `<span class="wtier">${escapeHtml(tierLabel(r.tier))}</span>` : ''}
          ${r.city ? `<span class="wcity">${escapeHtml(r.city)}</span>` : ''}
        </div>
      `).join('');
    })
    .catch(() => {
      grid.innerHTML = '<p class="wall-state">The wall is loading slowly right now — check back shortly, or be the first name on it below.</p>';
    });

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
})();

// ---------- LIGHTBOX (any element with data-lightbox="group-name") ----------
// Image comes from the element's <img>; caption from data-caption, else the
// nearest card's heading, else the image alt text. Arrow keys / swipe to move, Esc to close.
(function(){
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  if(!triggers.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-label','Image viewer');
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">✕</button>
    <button class="lb-prev" aria-label="Previous image">←</button>
    <figure><img alt=""><figcaption><span class="lb-cap"></span><span class="lb-count"></span></figcaption></figure>
    <button class="lb-next" aria-label="Next image">→</button>`;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('img');
  const capEl = lb.querySelector('.lb-cap');
  const cntEl = lb.querySelector('.lb-count');
  let group = [], idx = 0, lastFocus = null;

  function captionFor(el){
    if(el.dataset.caption) return el.dataset.caption;
    const card = el.closest('.popup-card');
    if(card){
      const h = card.querySelector('h3'), loc = card.querySelector('.loc');
      return [h && h.textContent.trim(), loc && loc.textContent.trim()].filter(Boolean).join(' — ');
    }
    const im = el.querySelector('img');
    return im ? im.alt : '';
  }
  function show(i){
    idx = (i + group.length) % group.length;
    const el = group[idx], im = el.querySelector('img');
    imgEl.src = el.dataset.full || im.currentSrc || im.src;
    imgEl.alt = im ? im.alt : '';
    capEl.textContent = captionFor(el);
    cntEl.textContent = group.length > 1 ? `${idx+1} / ${group.length}` : '';
  }
  function open(el){
    group = triggers.filter(t => t.dataset.lightbox === el.dataset.lightbox);
    lastFocus = document.activeElement;
    lb.classList.toggle('single', group.length < 2);
    show(group.indexOf(el));
    lb.classList.add('open');
    document.body.classList.add('lb-lock');
    lb.querySelector('.lb-close').focus();
  }
  function close(){
    lb.classList.remove('open');
    document.body.classList.remove('lb-lock');
    imgEl.removeAttribute('src');
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  triggers.forEach(el => {
    if(!el.hasAttribute('tabindex')) el.setAttribute('tabindex','0');
    if(!el.hasAttribute('role')) el.setAttribute('role','button');
    if(!el.hasAttribute('aria-label')){
      const c = captionFor(el);
      el.setAttribute('aria-label', c ? 'Enlarge photo: ' + c : 'Enlarge photo');
    }
    el.addEventListener('click', () => open(el));
    el.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(el); }
    });
  });

  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx-1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx+1));
  lb.addEventListener('click', e => { if(e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    else if(e.key === 'ArrowLeft' && group.length > 1) show(idx-1);
    else if(e.key === 'ArrowRight' && group.length > 1) show(idx+1);
    else if(e.key === 'Tab'){
      const f = Array.from(lb.querySelectorAll('button')).filter(b => b.offsetParent !== null);
      if(!f.length) return;
      const first = f[0], last = f[f.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });
  let sx = null;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive:true });
  lb.addEventListener('touchend', e => {
    if(sx === null || group.length < 2) return;
    const dx = e.changedTouches[0].clientX - sx;
    if(Math.abs(dx) > 50) show(dx < 0 ? idx+1 : idx-1);
    sx = null;
  });
})();

// ---------- CAROUSEL (scroll-snap based: native swipe on touch, buttons + dots on desktop) ----------
document.querySelectorAll('[data-carousel]').forEach(root => {
  const vp = root.querySelector('.carousel-viewport');
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  const dotsWrap = root.querySelector('.carousel-dots');
  const prev = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');
  const count = root.querySelector('.count');
  if(!vp || slides.length < 2) return;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to slide ${i+1}`);
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
    return b;
  });
  function current(){ return Math.round(vp.scrollLeft / vp.clientWidth); }
  function go(i){
    const n = (i + slides.length) % slides.length;
    vp.scrollTo({ left: n * vp.clientWidth, behavior: 'smooth' });
  }
  function sync(){
    const c = Math.max(0, Math.min(slides.length-1, current()));
    dots.forEach((d, i) => d.setAttribute('aria-current', i === c ? 'true' : 'false'));
    if(count) count.textContent = `${c+1} / ${slides.length}`;
  }
  prev.addEventListener('click', () => go(current()-1));
  next.addEventListener('click', () => go(current()+1));
  vp.addEventListener('scroll', () => window.requestAnimationFrame(sync), { passive:true });
  window.addEventListener('resize', sync);
  root.addEventListener('keydown', e => {
    if(e.target.closest('.lightbox')) return;
    if(e.key === 'ArrowLeft'){ go(current()-1); }
    if(e.key === 'ArrowRight'){ go(current()+1); }
  });
  sync();
});

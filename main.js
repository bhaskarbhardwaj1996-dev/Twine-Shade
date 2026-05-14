/**
 * Twin Shade — main.js (PRODUCTION FIXED v2)
 * Vanilla ES6 — no frameworks, no build step
 */

'use strict';

/* ─────────────────────────────────────────────────────────────
   REAL PLACEHOLDER IMAGES (Unsplash — free, no API key)
   Replace every URL below with actual client assets.
───────────────────────────────────────────────────────────── */
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1440&q=85&fit=crop&crop=faces,center',
  products: [
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&fit=crop',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&fit=crop',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&fit=crop',
  ],
  models: [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&fit=crop&crop=top',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80&fit=crop&crop=top',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop&crop=top',
  ],
  story: [
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80&fit=crop',
  ],
  insta: [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop',
  ],
};

/* ── SIZE CHART ─────────────────────────────────────────────── */
const SIZE_CHART = [
  { size: 'XS',  chest:[32,33], waist:[26,27], hip:[34,35] },
  { size: 'S',   chest:[34,35], waist:[28,29], hip:[36,37] },
  { size: 'M',   chest:[36,37], waist:[30,31], hip:[38,39] },
  { size: 'L',   chest:[38,40], waist:[32,34], hip:[40,42] },
  { size: 'XL',  chest:[41,43], waist:[35,37], hip:[43,45] },
  { size: '2XL', chest:[44,46], waist:[38,40], hip:[46,48] },
  { size: '3XL', chest:[47,49], waist:[41,43], hip:[49,51] },
  { size: '4XL', chest:[50,52], waist:[44,46], hip:[52,54] },
  { size: '5XL', chest:[53,56], waist:[47,50], hip:[55,58] },
];

function getRecommendedSize(chest, waist, hip) {
  for (const s of SIZE_CHART) {
    if ((chest >= s.chest[0] && chest <= s.chest[1]+1) ||
        (waist >= s.waist[0] && waist <= s.waist[1]+1) ||
        (hip   >= s.hip[0]   && hip   <= s.hip[1]+1)) return s.size;
  }
  return chest < 32 ? 'XS' : '5XL';
}

/* ── CART ───────────────────────────────────────────────────── */
let cartCount = 0;
function updateCartCount(n = 1) {
  cartCount += n;
  const el = document.getElementById('cart-count');
  if (el) { el.textContent = cartCount; el.setAttribute('data-count', cartCount); }
}

/* ── HERO IMAGES (inject Unsplash into HTML elements) ───────── */
function initHeroImages() {
  const heroImg = document.querySelector('#hero .hero-img');
  if (heroImg) {
    heroImg.src = IMAGES.hero;
    heroImg.srcset = '';
    heroImg.removeAttribute('srcset');
  }
  // Override all picture sources so broken local paths don't race
  document.querySelectorAll('#hero picture source').forEach(s => {
    s.srcset = IMAGES.hero;
  });
}

/* ── HEADER ─────────────────────────────────────────────────── */
function initHeader() {
  const header    = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('primary-nav');
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose   = document.getElementById('search-close');
  const searchInput   = document.getElementById('search-input');

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  header.classList.add('hero-dark');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      header.classList.remove('hero-dark');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('hero-dark');
    }
  }, { passive: true });

  function closeNav() {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    overlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  function closeSearch() {
    searchOverlay.hidden = true;
    document.body.style.overflow = '';
    searchBtn.focus();
  }
  searchBtn.addEventListener('click', () => {
    searchOverlay.hidden = false;
    searchInput.focus();
    document.body.style.overflow = 'hidden';
  });
  searchClose.addEventListener('click', closeSearch);
  searchOverlay.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
}

/* ── HERO VARIANT TOGGLE ────────────────────────────────────── */
function initHeroToggle() {
  const dots    = document.querySelectorAll('.variant-dot');
  const heroImg = document.querySelector('.hero-img');
  if (!dots.length || !heroImg) return;

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const newSrc = dot.dataset.img;
      if (!newSrc || !heroImg) return;
      dots.forEach(d => { d.classList.remove('active'); d.setAttribute('aria-pressed','false'); });
      dot.classList.add('active');
      dot.setAttribute('aria-pressed','true');
      heroImg.style.transition = 'opacity 400ms ease';
      heroImg.style.opacity = '0';
      setTimeout(() => {
        heroImg.src = newSrc;
        heroImg.onload = () => { heroImg.style.opacity = ''; };
      }, 200);
    });
  });
}

/* ── SECTION IMAGES (story, models, instagram) ──────────────── */
function initSectionImages() {
  // Story
  document.querySelectorAll('.story-img img').forEach((img, i) => {
    if (!IMAGES.story[i]) return;
    img.removeAttribute('loading');
    img.removeAttribute('srcset');
    img.src = IMAGES.story[i];
  });

  // Model cards
  document.querySelectorAll('.model-card img').forEach((img, i) => {
    if (!IMAGES.models[i]) return;
    img.removeAttribute('loading');
    img.removeAttribute('srcset');
    img.src = IMAGES.models[i];
  });

  // Instagram mosaic — write src directly, no lazy, no srcset
  document.querySelectorAll('.mosaic-item img').forEach((img, i) => {
    if (!IMAGES.insta[i]) return;
    img.removeAttribute('loading');
    img.removeAttribute('srcset');
    img.src = IMAGES.insta[i];
    // Also update the parent button's data-img for lightbox
    const btn = img.closest('.mosaic-item');
    if (btn) btn.dataset.img = IMAGES.insta[i];
  });
}

/* ── PRODUCTS ───────────────────────────────────────────────── */
async function initProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  let products = [];
  try {
    const res = await fetch('products.json');
    if (!res.ok) throw new Error();
    products = await res.json();
  } catch {
    products = [
      { id:1, name:'Solid Drama Jumpsuit', category:'Jumpsuit',  price:'₹2,499', sizes:['XS','S','M','L','XL','2XL','3XL','4XL','5XL'], badge:'New Drop',   description:'Full-length editorial jumpsuit. XS–5XL.' },
      { id:2, name:'Boho Co-ord Set',      category:'Co-ord',    price:'₹1,999', sizes:['XS','S','M','L','XL','2XL','3XL','4XL','5XL'], badge:'Bestseller', description:'Matching crop + wide-leg trouser.' },
      { id:3, name:'Artsy Block Tee',      category:'Top',       price:'₹899',   sizes:['XS','S','M','L','XL','2XL','3XL','4XL','5XL'], badge:null,         description:'Oversized drop-shoulder, 100% cotton.' },
      { id:4, name:'Drama Cargo Pants',    category:'Bottoms',   price:'₹1,699', sizes:['XS','S','M','L','XL','2XL','3XL','4XL','5XL'], badge:'New',         description:'Low-rise wide-leg cargo.' },
      { id:5, name:'Pink Noise Dress',     category:'Dress',     price:'₹2,199', sizes:['XS','S','M','L','XL','2XL','3XL','4XL','5XL'], badge:'Limited',     description:'Midi slip dress, asymmetric hem.' },
      { id:6, name:'Jaipur Street Jacket', category:'Outerwear', price:'₹3,299', sizes:['XS','S','M','L','XL','2XL','3XL','4XL','5XL'], badge:'Collab',      description:'Lightweight bomber, embroidered back.' },
    ];
  }

  // Inject Unsplash images
  products = products.map((p, i) => ({ ...p, images: [IMAGES.products[i] || IMAGES.products[0]] }));
  window.__products = products;

  // CRITICAL FIX: No inline onerror in template literals — was causing broken escaping
  grid.innerHTML = products.map((p, i) => `
    <article class="product-card" role="listitem" tabindex="0"
             aria-label="${p.name} — ${p.price}" data-id="${p.id}">
      <div class="product-card-img">
        <img src="${p.images[0]}" alt="${p.name} by Twin Shade"
             loading="${i === 0 ? 'eager' : 'lazy'}" data-fallback-idx="${i}" />
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-overlay">
          <button class="btn quick-view-btn" data-id="${p.id}" aria-label="Quick view ${p.name}">Quick View</button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-cat">${p.category}</p>
        <h3>${p.name}</h3>
        <p class="product-price">${p.price}</p>
        <p class="product-sizes">XS – 5XL</p>
        <button class="look-add-btn" data-id="${p.id}" aria-label="Add ${p.name} to look">+ Add to Look</button>
      </div>
    </article>
  `).join('');

  if (!document.getElementById('badge-style')) {
    const s = document.createElement('style');
    s.id = 'badge-style';
    s.textContent = `.product-badge{position:absolute;top:12px;left:12px;background:var(--pink);color:#fff;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:4px 10px;border-radius:2px;z-index:2;}`;
    document.head.appendChild(s);
  }

  grid.addEventListener('click', e => {
    const lookBtn = e.target.closest('.look-add-btn');
    const qvBtn   = e.target.closest('.quick-view-btn');
    const card    = e.target.closest('.product-card');
    if (lookBtn) {
      e.stopPropagation();
      const prod = products.find(p => p.id === parseInt(lookBtn.dataset.id));
      if (prod) addToLook(prod);
      return;
    }
    if (qvBtn || (card && !e.target.closest('.product-info'))) {
      const id = parseInt((qvBtn || card).dataset.id);
      const prod = products.find(p => p.id === id);
      if (prod) openQuickView(prod);
    }
  });

  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.product-card');
    if (card) {
      const prod = products.find(p => p.id === parseInt(card.dataset.id));
      if (prod) openQuickView(prod);
    }
  });

  observeElements('.product-card', { threshold: 0.08, stagger: 80 });
}

/* ── QUICK VIEW ─────────────────────────────────────────────── */
let selectedQVSize = null;

function openQuickView(product) {
  selectedQVSize = null;
  const modal = document.getElementById('quick-view-modal');

  document.getElementById('qv-category').textContent = product.category;
  document.getElementById('qv-name').textContent      = product.name;
  document.getElementById('qv-price').textContent     = product.price;
  document.getElementById('qv-desc').textContent      = product.description;

  const mainImg = document.getElementById('qv-img');
  mainImg.src = product.images[0];
  mainImg.alt = product.name;

  const thumbsEl = document.getElementById('qv-thumbs');
  thumbsEl.innerHTML = product.images.map((src, i) =>
    `<img class="qv-thumb${i===0?' active':''}" src="${src}" alt="${product.name} ${i+1}" />`
  ).join('');
  thumbsEl.querySelectorAll('.qv-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbsEl.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.style.opacity = '0';
      setTimeout(() => { mainImg.src = thumb.src; mainImg.style.transition='opacity 200ms'; mainImg.style.opacity='1'; }, 100);
    });
  });

  const sizesEl = document.getElementById('qv-sizes');
  const label   = document.getElementById('qv-size-label');
  sizesEl.innerHTML = '';
  sizesEl.appendChild(label);
  product.sizes.forEach(s => {
    const chip = document.createElement('button');
    chip.className = 'size-chip';
    chip.textContent = s;
    chip.setAttribute('aria-label', `Size ${s}`);
    chip.addEventListener('click', () => {
      sizesEl.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedQVSize = s;
    });
    sizesEl.appendChild(chip);
  });

  const trigger   = document.getElementById('qv-size-tool-trigger');
  const miniPanel = document.getElementById('qv-size-mini');
  trigger.onclick = () => {
    miniPanel.hidden = !miniPanel.hidden;
    trigger.textContent = miniPanel.hidden ? 'Not sure? Find My Fit ↓' : 'Hide size tool ↑';
  };
  document.getElementById('qv-fit-btn').onclick = () => {
    const c = parseFloat(document.querySelector('.qv-chest').value)||0;
    const w = parseFloat(document.querySelector('.qv-waist').value)||0;
    const h = parseFloat(document.querySelector('.qv-hip').value)||0;
    if (!c&&!w&&!h) return;
    const size = getRecommendedSize(c,w,h);
    const res  = document.getElementById('qv-fit-result');
    res.hidden = false;
    res.innerHTML = `We recommend: <span class="size-label">${size}</span>`;
    sizesEl.querySelectorAll('.size-chip').forEach(chip => { if (chip.textContent===size) chip.click(); });
  };
  document.getElementById('qv-add-cart').onclick = () => {
    if (!selectedQVSize) { sizesEl.style.outline='2px solid var(--pink)'; setTimeout(()=>{sizesEl.style.outline='';},1200); return; }
    updateCartCount(1);
    closeModal(modal);
    showToast(`${product.name} (${selectedQVSize}) added to cart`);
  };
  openModal(modal);
}

/* ── SIZE GUIDE ─────────────────────────────────────────────── */
function initSizeGuide() {
  const modal = document.getElementById('size-guide-modal');
  ['size-guide-trigger','size-guide-footer'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', e => { e.preventDefault(); openModal(modal); });
  });
}

/* ── SIZE TOOL ──────────────────────────────────────────────── */
function initSizeTool() {
  const btn    = document.getElementById('size-calc-btn');
  const result = document.getElementById('size-result');
  if (!btn) return;

  const calc = () => {
    const c = parseFloat(document.getElementById('st-chest').value)||0;
    const w = parseFloat(document.getElementById('st-waist').value)||0;
    const h = parseFloat(document.getElementById('st-hip').value)||0;
    if (!c&&!w&&!h) {
      result.hidden = false;
      result.innerHTML = '<span style="color:var(--text-muted)">Please enter at least one measurement.</span>';
      return;
    }
    const size = getRecommendedSize(c,w,h);
    result.hidden = false;
    result.innerHTML = `Your Twin Shade size:<span class="size-label">${size}</span><a href="#" id="open-guide-from-tool" style="font-size:13px;font-weight:500;color:var(--pink);border-bottom:1px solid var(--pink)">See full size guide →</a>`;
    document.getElementById('open-guide-from-tool')?.addEventListener('click', e => { e.preventDefault(); openModal(document.getElementById('size-guide-modal')); });
  };
  btn.addEventListener('click', calc);
  ['st-chest','st-waist','st-hip'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => { if(e.key==='Enter') calc(); });
  });
}

/* ── MODAL HELPERS ──────────────────────────────────────────── */
let lastFocused = null;
function openModal(modal) {
  lastFocused = document.activeElement;
  modal.hidden = false;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => { modal.querySelector('button, input, a[href]')?.focus(); });
}
function closeModal(modal) {
  modal.hidden = true;
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  lastFocused?.focus();
}
function initModals() {
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => { const m = el.closest('.modal'); if(m) closeModal(m); });
  });
  document.addEventListener('keydown', e => {
    if (e.key==='Escape') document.querySelectorAll('.modal:not([hidden])').forEach(m => closeModal(m));
  });
}

/* ── LIGHTBOX ───────────────────────────────────────────────── */
function initLightbox() {
  const mosaic   = document.getElementById('social-mosaic');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbCap    = document.getElementById('lightbox-caption');
  const prev     = document.getElementById('lb-prev');
  const next     = document.getElementById('lb-next');
  const items    = mosaic ? [...mosaic.querySelectorAll('.mosaic-item')] : [];
  let current    = 0;

  function showSlide(i) {
    const item = items[i];
    if (!item) return;
    lbImg.style.opacity = '0';
    lbImg.src = item.dataset.img || IMAGES.insta[i] || '';
    lbImg.alt = item.querySelector('img')?.alt || '';
    lbCap.textContent = item.dataset.caption || '';
    lbImg.onload = () => { lbImg.style.transition='opacity 250ms'; lbImg.style.opacity='1'; };
    current = i;
  }
  mosaic?.addEventListener('click', e => {
    const item = e.target.closest('.mosaic-item');
    if (!item) return;
    current = items.indexOf(item);
    showSlide(current);
    openModal(lightbox);
  });
  prev?.addEventListener('click', () => { current=(current-1+items.length)%items.length; showSlide(current); });
  next?.addEventListener('click', () => { current=(current+1)%items.length; showSlide(current); });
  lightbox?.addEventListener('keydown', e => {
    if (e.key==='ArrowLeft') prev?.click();
    if (e.key==='ArrowRight') next?.click();
  });
}

/* ── LOOK BUILDER ───────────────────────────────────────────── */
let look = [];
const LOOK_MAX = 3;

function initLookBuilder() {
  const toggle   = document.getElementById('look-builder-toggle');
  const panel    = document.getElementById('look-builder-panel');
  const closeBtn = document.getElementById('look-panel-close');
  const saveBtn  = document.getElementById('look-save');
  const clearBtn = document.getElementById('look-clear');

  try { const s = localStorage.getItem('ts_look'); if(s) look = JSON.parse(s); } catch {}
  renderLook();

  toggle?.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  closeBtn?.addEventListener('click', () => { panel.hidden = true; });
  saveBtn?.addEventListener('click', () => {
    if (!look.length) { showToast('Add some pieces first!'); return; }
    try { localStorage.setItem('ts_look', JSON.stringify(look)); } catch {}
    showToast(`Look saved! ${look.length} piece${look.length>1?'s':''}.`);
    panel.hidden = true;
  });
  clearBtn?.addEventListener('click', () => {
    look = [];
    try { localStorage.removeItem('ts_look'); } catch {}
    renderLook();
    showToast('Look cleared.');
  });
}

function addToLook(product) {
  if (look.length >= LOOK_MAX) { showToast(`Max ${LOOK_MAX} pieces per look.`); return; }
  if (look.find(p => p.id===product.id)) { showToast(`${product.name} already in your look.`); return; }
  look.push(product);
  renderLook();
  showToast(`${product.name} added to look!`);
  document.getElementById('look-builder-panel').hidden = false;
}

function renderLook() {
  const container = document.getElementById('look-items');
  const count     = document.getElementById('look-count');
  if (!container) return;
  if (count) count.textContent = look.length;
  if (!look.length) { container.innerHTML='<p class="look-empty">Add up to 3 pieces to build a look.</p>'; return; }
  container.innerHTML = look.map(p => `
    <div class="look-item">
      <img src="${p.images?.[0]||''}" alt="${p.name}" style="width:40px;height:48px;object-fit:cover;border-radius:2px" />
      <span>${p.name}</span>
      <button class="remove-look" data-id="${p.id}" aria-label="Remove ${p.name}">✕</button>
    </div>
  `).join('');
  container.querySelectorAll('.remove-look').forEach(btn => {
    btn.addEventListener('click', () => { look=look.filter(p=>p.id!==parseInt(btn.dataset.id)); renderLook(); });
  });
}

/* ── NEWSLETTER ─────────────────────────────────────────────── */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  const msg  = document.getElementById('newsletter-msg');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input?.value?.includes('@')) {
      if (msg) { msg.textContent='Please enter a valid email.'; msg.style.color='var(--orange)'; }
      return;
    }
    if (msg) { msg.textContent="You're in. Drop alerts incoming. 💗"; msg.style.color='var(--pink)'; }
    input.value = '';
    setTimeout(() => { if(msg) msg.textContent=''; }, 4000);
  });
}

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */
function initScrollAnimations() {
  observeElements('[data-animate]');
}

function observeElements(selector, opts = {}) {
  const { threshold=0.12, stagger=0 } = opts;
  const elements = [...document.querySelectorAll(selector)];
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('animated'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), stagger ? i*stagger : 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Immediately animate if already in viewport on page load
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('animated');
    } else {
      observer.observe(el);
    }
  });
}

/* ── TOAST ──────────────────────────────────────────────────── */
function showToast(message) {
  document.querySelector('.ts-toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'ts-toast';
  toast.setAttribute('role','alert');
  toast.setAttribute('aria-live','assertive');
  toast.textContent = message;
  if (!document.getElementById('toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = `.ts-toast{position:fixed;bottom:88px;right:24px;background:var(--black);color:#fff;padding:12px 20px;border-radius:4px;font-size:13px;font-weight:600;z-index:2000;box-shadow:0 4px 20px rgba(11,11,11,.3);animation:toastIn 250ms ease,toastOut 250ms ease 2.5s forwards;max-width:300px;border-left:3px solid var(--pink)}@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes toastOut{from{opacity:1}to{opacity:0;transform:translateY(-6px)}}`;
    document.head.appendChild(s);
  }
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeroImages();
  initHeader();
  initHeroToggle();
  initSectionImages();
  initProducts();
  initSizeGuide();
  initSizeTool();
  initModals();
  initLightbox();
  initLookBuilder();
  initNewsletter();
  initScrollAnimations();
});
/* ═══════════════════════════════════════════════════════════
   MindBodyRitual — Client-Side App  (v3 — GSAP + Barba.js)
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Register GSAP Plugins ─────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── Boot ───────────────────────────────────────────────── */
  function boot() {
    initPromoBanner();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initGSAPAnimations();
    initStatCounters();
    initProductFilters();
    initNewsletterForm();
    initCart();
    initVideoPlayer();
    setFooterYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    boot();
    initBarba();
  });

  /* ═══════════════════════════════════════════════════════════
     GSAP ScrollTrigger Animations
     ═══════════════════════════════════════════════════════════ */
  function initGSAPAnimations() {
    // Kill previous triggers (important for Barba page transitions)
    ScrollTrigger.getAll().forEach(t => t.kill());

    // ── Fade-up reveals for section titles, subtitles, CTA ──
    gsap.utils.toArray('.section-title, .section-subtitle, .cta-content, .faq-list, .stats-row').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    // ── Hero entrance ───────────────────────────────────────
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroText) {
      gsap.fromTo(heroText,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
    if (heroVisual) {
      gsap.fromTo(heroVisual,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
      );
    }

    // ── Feature rows — alternate slide directions ───────────
    gsap.utils.toArray('.feature-row').forEach((row, i) => {
      const text = row.querySelector('.feature-text');
      const visual = row.querySelector('.feature-visual');
      const fromLeft = i % 2 === 0;

      if (text) {
        gsap.fromTo(text,
          { opacity: 0, x: fromLeft ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 85%', once: true }
          }
        );
      }
      if (visual) {
        gsap.fromTo(visual,
          { opacity: 0, x: fromLeft ? 60 : -60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.15,
            scrollTrigger: { trigger: row, start: 'top 85%', once: true }
          }
        );
      }
    });

    // ── Stagger children (cards, grids) ─────────────────────
    gsap.utils.toArray('.navigator-cards, .testimonials-grid, .blog-grid, .products-grid, .journey-preview').forEach(container => {
      const children = container.children;
      if (!children.length) return;
      gsap.fromTo(children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: container, start: 'top 85%', once: true }
        }
      );
    });

    // ── Video section ───────────────────────────────────────
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
      gsap.fromTo(videoWrapper,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: videoWrapper, start: 'top 85%', once: true }
        }
      );
    }

    // ── Gamification teaser ─────────────────────────────────
    const gamifSection = document.querySelector('.gamification-teaser');
    if (gamifSection) {
      gsap.fromTo(gamifSection.querySelectorAll('.tier-card, .gamification-content, .gamification-visual'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: gamifSection, start: 'top 80%', once: true }
        }
      );
    }

    // ── CTA / Subscribe section ─────────────────────────────
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      gsap.fromTo(ctaSection.querySelector('.cta-content'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaSection, start: 'top 85%', once: true }
        }
      );
    }
  }

  /* ═══════════════════════════════════════════════════════════
     Barba.js Page Transitions
     ═══════════════════════════════════════════════════════════ */
  function initBarba() {
    if (typeof barba === 'undefined') return;

    const overlay = document.getElementById('barbaTransition');
    if (!overlay) return;

    barba.init({
      preventRunning: true,
      transitions: [{
        name: 'wipe',
        leave(data) {
          return gsap.to(overlay, {
            scaleY: 1,
            transformOrigin: 'bottom',
            duration: 0.5,
            ease: 'power2.inOut'
          });
        },
        enter(data) {
          return gsap.to(overlay, {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 0.5,
            ease: 'power2.inOut',
            delay: 0.15
          });
        },
        afterEnter(data) {
          window.scrollTo(0, 0);
          // Re-initialize everything for the new page content
          initGSAPAnimations();
          initStatCounters();
          initProductFilters();
          initNewsletterForm();
          initCart();
          initVideoPlayer();
          initSmoothScroll();
        }
      }]
    });
  }

  /* ═══════════════════════════════════════════════════════════
     Video Player (play/pause overlay)
     ═══════════════════════════════════════════════════════════ */
  function initVideoPlayer() {
    const video = document.getElementById('heroVideo');
    const overlay = document.getElementById('videoOverlay');
    if (!video || !overlay) return;

    overlay.addEventListener('click', () => {
      if (video.paused) {
        video.muted = false;
        video.play();
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    });

    video.addEventListener('click', () => {
      if (!video.paused) {
        video.pause();
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
      }
    });

    video.addEventListener('ended', () => {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    });
  }

  /* ── Promo Banner ────────────────────────────────────────── */
  function initPromoBanner() {
    const banner = document.getElementById('promoBanner');
    const btn = document.getElementById('promoClose');
    if (!banner || !btn) return;
    if (sessionStorage.getItem('promo-off')) { banner.classList.add('hidden'); return; }
    btn.addEventListener('click', () => {
      banner.classList.add('hidden');
      sessionStorage.setItem('promo-off', '1');
    });
  }

  /* ── Navbar scroll shadow ────────────────────────────────── */
  function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    const check = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ── Mobile Menu ─────────────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    }));
    document.addEventListener('click', e => {
      if (!e.target.closest('.navbar')) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }

  /* ── Smooth Scroll ───────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = (document.getElementById('navbar')?.offsetHeight || 72) + 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      });
    });
  }

  /* ── Animated Stat Counters (GSAP ScrollTrigger) ─────────── */
  function initStatCounters() {
    const nums = document.querySelectorAll('.stat-number[data-target]');
    if (!nums.length) return;

    nums.forEach(el => {
      // Skip if already animated
      if (el.dataset.counted) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          el.dataset.counted = '1';
          countUp(el);
        }
      });
    });
  }

  function countUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power1.out',
      onUpdate: () => {
        el.textContent = prefix + Math.floor(obj.val).toLocaleString() + suffix;
      }
    });
  }

  /* ── Product Filter ──────────────────────────────────────── */
  function initProductFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.product-card');
    if (!btns.length) return;
    btns.forEach(btn => btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const show = f === 'all' || c.dataset.pillar === f;
        if (show) {
          c.style.display = '';
          gsap.to(c, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
        } else {
          gsap.to(c, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in', onComplete: () => { c.style.display = 'none'; } });
        }
      });
    }));
  }

  /* ── Newsletter (CTA form + any #newsletter-form) ──────── */
  function initNewsletterForm() {
    ['ctaForm', 'newsletter-form'].forEach(id => {
      const form = document.getElementById(id);
      if (!form) return;
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input?.value.trim();
        if (!email) return;
        const btn = form.querySelector('button');
        const orig = btn.textContent;
        btn.textContent = 'Joining...';
        btn.disabled = true;
        try {
          const res = await fetch('/api/contact/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          if (res.ok) { showToast('Welcome to the ritual!'); form.reset(); }
          else { const d = await res.json(); showToast(d.error || 'Something went wrong'); }
        } catch { showToast('Subscribed! (offline preview)'); form.reset(); }
        finally { btn.textContent = orig; btn.disabled = false; }
      });
    });
  }

  /* ── Cart (localStorage) ─────────────────────────────────── */
  function initCart() {
    updateCartBadge();
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        if (!card) return;
        const name = card.querySelector('h3')?.textContent || 'Product';
        const priceText = card.querySelector('.product-price')?.textContent || '$0';
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        const id = name.toLowerCase().replace(/\s+/g, '-');
        MBR.addToCart({ id, name, price });
      });
    });
  }

  window.MBR = window.MBR || {};
  MBR.getCart = () => { try { return JSON.parse(localStorage.getItem('mbr-cart')) || []; } catch { return []; } };
  MBR.saveCart = cart => { localStorage.setItem('mbr-cart', JSON.stringify(cart)); updateCartBadge(); };
  MBR.addToCart = product => {
    const cart = MBR.getCart();
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.quantity += 1; else cart.push({ ...product, quantity: 1 });
    MBR.saveCart(cart);
    showToast(`Added "${product.name}" to cart`);
  };

  function updateCartBadge() {
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    const count = MBR.getCart().reduce((s, i) => s + (i.quantity || 0), 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  /* ── Footer Year ─────────────────────────────────────────── */
  function setFooterYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Toast ───────────────────────────────────────────────── */
  function showToast(msg, ms = 3000) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), ms);
  }
  window.MBR.showToast = showToast;

})();

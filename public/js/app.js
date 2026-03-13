/* ═══════════════════════════════════════════════════════════
   MindBodyRitual — Client-Side App  (v4 — Dynamic Animations)
   GSAP + ScrollTrigger + Barba.js + Parallax + Text Reveals
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
    initTextSplitting();       // NEW — split headings into words/chars
    initParallaxHero();        // NEW — parallax background layers
    initGSAPAnimations();
    initPinnedFeatures();      // NEW — pin feature showcase
    initTextReveals();         // NEW — char/word reveal animations
    initScrollStorytelling();  // NEW — scroll-driven narrative timelines
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
     TEXT SPLITTING UTILITY (lightweight SplitText alternative)
     ═══════════════════════════════════════════════════════════ */
  function splitTextIntoSpans(el, type) {
    // type: 'words', 'chars', or 'both'
    if (el.dataset.split) return; // already split
    const text = el.textContent;
    el.dataset.split = type;
    el.setAttribute('aria-label', text);

    if (type === 'words' || type === 'both') {
      const words = text.split(/\s+/);
      el.innerHTML = words.map((word, i) => {
        if (type === 'both') {
          const chars = word.split('').map((ch, j) =>
            `<span class="char" style="display:inline-block">${ch}</span>`
          ).join('');
          return `<span class="word" style="display:inline-block;white-space:nowrap">${chars}</span>`;
        }
        return `<span class="word" style="display:inline-block">${word}</span>`;
      }).join(' ');
    } else if (type === 'chars') {
      el.innerHTML = text.split('').map(ch =>
        ch === ' '
          ? ' '
          : `<span class="char" style="display:inline-block">${ch}</span>`
      ).join('');
    }
  }

  function initTextSplitting() {
    // Split hero title into words for reveal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) splitTextIntoSpans(heroTitle, 'words');

    // Split section titles into words for scroll reveals
    document.querySelectorAll('.section-title').forEach(el => {
      splitTextIntoSpans(el, 'words');
    });

    // Split feature headings into chars for typewriter effect
    document.querySelectorAll('.feature-text h3').forEach(el => {
      splitTextIntoSpans(el, 'chars');
    });
  }

  /* ═══════════════════════════════════════════════════════════
     PARALLAX HERO + BACKGROUND LAYERS
     ═══════════════════════════════════════════════════════════ */
  function initParallaxHero() {
    const heroBg = document.querySelector('.hero-bg');
    const heroVisual = document.querySelector('.hero-visual');
    const heroText = document.querySelector('.hero-text');

    // Parallax on the background decorative elements
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Hero visual moves slower (depth effect)
    if (heroVisual) {
      gsap.to(heroVisual, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Hero text fades and shifts up as you scroll past
    if (heroText) {
      gsap.to(heroText, {
        yPercent: -10,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Proof ticker parallax (subtle)
    const ticker = document.querySelector('.proof-ticker');
    if (ticker) {
      gsap.to(ticker, {
        backgroundPosition: '200% 0',
        ease: 'none',
        scrollTrigger: {
          trigger: ticker,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     GSAP ScrollTrigger Animations (base — preserved from v3)
     ═══════════════════════════════════════════════════════════ */
  function initGSAPAnimations() {
    // Kill previous triggers (important for Barba page transitions)
    ScrollTrigger.getAll().forEach(t => t.kill());

    // ── Hero entrance — word-by-word stagger ──────────────
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const words = heroTitle.querySelectorAll('.word');
      if (words.length) {
        gsap.fromTo(words,
          { opacity: 0, y: 30, rotateX: -40 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7, ease: 'power3.out',
            stagger: 0.08, delay: 0.3
          }
        );
      } else {
        // Fallback if text splitting didn't run
        gsap.fromTo(heroTitle,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
      }
    }

    // ── Hero subtitle + features — slide up ───────────────
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      gsap.fromTo(heroSubtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 }
      );
    }

    const heroFeatures = document.querySelector('.hero-features');
    if (heroFeatures) {
      gsap.fromTo(heroFeatures.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 1.1 }
      );
    }

    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
      gsap.fromTo(heroActions,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.5 }
      );
    }

    // ── Hero visual entrance ──────────────────────────────
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      gsap.fromTo(heroVisual,
        { opacity: 0, scale: 0.9, rotateY: 8 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      );
    }

    // ── Section title word reveals (scroll-triggered) ─────
    document.querySelectorAll('.section-title').forEach(el => {
      const words = el.querySelectorAll('.word');
      if (words.length) {
        gsap.fromTo(words,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      } else {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      }
    });

    // ── Subtitles + CTA + FAQ — fade up ───────────────────
    gsap.utils.toArray('.section-subtitle, .cta-content, .faq-list, .stats-row').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
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
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: videoWrapper, start: 'top 85%', once: true }
        }
      );
    }

    // ── Gamification teaser ─────────────────────────────────
    const gamifSection = document.querySelector('.gamification-teaser');
    if (gamifSection) {
      gsap.fromTo(gamifSection.querySelectorAll('.journey-step'),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: gamifSection, start: 'top 80%', once: true }
        }
      );
    }
  }

  /* ═══════════════════════════════════════════════════════════
     PINNED FEATURE SECTIONS (scroll-through while pinned)
     ═══════════════════════════════════════════════════════════ */
  function initPinnedFeatures() {
    const featureSection = document.querySelector('.features');
    const featureRows = document.querySelectorAll('.feature-row');
    if (!featureSection || featureRows.length < 2) {
      // Fallback to basic slide animations if not enough rows
      initBasicFeatureAnimations();
      return;
    }

    // Only pin on desktop (>768px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      featureRows.forEach((row, i) => {
        const text = row.querySelector('.feature-text');
        const visual = row.querySelector('.feature-visual');
        const chars = row.querySelectorAll('.feature-text h3 .char');

        // Create a timeline for each feature row
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.8,
            toggleActions: 'play none none reverse'
          }
        });

        // Slide in from alternating sides
        const fromLeft = i % 2 === 0;
        if (text) {
          tl.fromTo(text,
            { opacity: 0, x: fromLeft ? -80 : 80 },
            { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
            0
          );
        }
        if (visual) {
          tl.fromTo(visual,
            { opacity: 0, x: fromLeft ? 80 : -80, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out' },
            0.1
          );
        }

        // Typewriter effect on heading chars
        if (chars.length) {
          tl.fromTo(chars,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.02, ease: 'power1.out' },
            0.2
          );
        }

        // Badge pop
        const badge = row.querySelector('.feature-badge');
        if (badge) {
          tl.fromTo(badge,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
            0.4
          );
        }
      });
    });

    // Mobile — simpler fade-in animations
    mm.add('(max-width: 768px)', () => {
      initBasicFeatureAnimations();
    });
  }

  function initBasicFeatureAnimations() {
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
  }

  /* ═══════════════════════════════════════════════════════════
     TEXT REVEAL EFFECTS
     ═══════════════════════════════════════════════════════════ */
  function initTextReveals() {
    // ── Navigator card titles — slide-up reveal ──────────
    document.querySelectorAll('.navigator-card h3').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 20, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    // ── Testimonial cards — staggered reveal with rotation ──
    document.querySelectorAll('.testimonial-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, rotateX: -5 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8, ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        }
      );
    });

    // ── Blog cards — cascade entrance ───────────────────
    document.querySelectorAll('.blog-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 90%', once: true }
        }
      );
    });

    // ── CTA section heading — dramatic word reveal ──────
    const ctaH2 = document.querySelector('.cta-content h2');
    if (ctaH2 && !ctaH2.dataset.split) {
      splitTextIntoSpans(ctaH2, 'words');
      const ctaWords = ctaH2.querySelectorAll('.word');
      if (ctaWords.length) {
        gsap.fromTo(ctaWords,
          { opacity: 0, y: 30, rotateX: -45 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.6, ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: { trigger: ctaH2, start: 'top 85%', once: true }
          }
        );
      }
    }

    // ── FAQ items — accordion slide entrance ────────────
    document.querySelectorAll('.faq-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5, ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: item, start: 'top 92%', once: true }
        }
      );
    });
  }

  /* ═══════════════════════════════════════════════════════════
     SCROLL-DRIVEN STORYTELLING (narrative flow timelines)
     ═══════════════════════════════════════════════════════════ */
  function initScrollStorytelling() {
    // ── Journey steps — sequential narrative reveal ──────
    const journeyPreview = document.querySelector('.journey-preview');
    if (journeyPreview) {
      const steps = journeyPreview.querySelectorAll('.journey-step');
      const connectors = journeyPreview.querySelectorAll('.journey-connector');

      if (steps.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: journeyPreview,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.6
          }
        });

        steps.forEach((step, i) => {
          // Each step fades in and slides up
          tl.fromTo(step,
            { opacity: 0, y: 40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }
          );

          // Connector grows between steps
          if (connectors[i]) {
            tl.fromTo(connectors[i],
              { scaleX: 0 },
              { scaleX: 1, duration: 0.5, ease: 'power1.inOut' },
              '-=0.3'
            );
          }
        });

        // Icon bounce at the end
        tl.fromTo(steps[steps.length - 1].querySelector('.journey-icon'),
          { scale: 1 },
          { scale: 1.2, duration: 0.3, ease: 'back.out(3)', yoyo: true, repeat: 1 }
        );
      }
    }

    // ── Stats counter — scroll-scrubbed number grow ─────
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
      const statNumbers = statsRow.querySelectorAll('.stat-number[data-target]');
      if (statNumbers.length) {
        gsap.fromTo(statsRow.querySelectorAll('.stat'),
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: { trigger: statsRow, start: 'top 85%', once: true }
          }
        );
      }
    }

    // ── Video section — cinematic entrance ──────────────
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
      const vTitle = videoSection.querySelector('.section-title');
      const vSub = videoSection.querySelector('.section-subtitle');

      if (vTitle) {
        const vWords = vTitle.querySelectorAll('.word');
        if (vWords.length) {
          gsap.fromTo(vWords,
            { opacity: 0, y: 15, filter: 'blur(4px)' },
            {
              opacity: 1, y: 0, filter: 'blur(0px)',
              duration: 0.5, ease: 'power2.out',
              stagger: 0.06,
              scrollTrigger: { trigger: vTitle, start: 'top 88%', once: true }
            }
          );
        }
      }
    }

    // ── CTA form — slide up with spring ─────────────────
    const ctaForm = document.getElementById('ctaForm');
    if (ctaForm) {
      gsap.fromTo(ctaForm,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: ctaForm, start: 'top 88%', once: true }
        }
      );
    }

    // ── Navigator cards — 3D tilt on scroll ─────────────
    document.querySelectorAll('.navigator-card').forEach((card, i) => {
      gsap.to(card, {
        rotateY: i === 1 ? 0 : (i === 0 ? -3 : 3),
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      });
    });

    // ── Footer reveal ────────────────────────────────────
    const footer = document.querySelector('.footer');
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power1.out',
          scrollTrigger: { trigger: footer, start: 'top 95%', once: true }
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
          initTextSplitting();
          initParallaxHero();
          initGSAPAnimations();
          initPinnedFeatures();
          initTextReveals();
          initScrollStorytelling();
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

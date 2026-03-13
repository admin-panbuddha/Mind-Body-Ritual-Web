/* ═══════════════════════════════════════════════════════════
   MindBodyRitual — Client App
   GSAP + ScrollTrigger — One-page immersive scroll experience
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ── Boot ─────────────────────────────────────────────── */
  function boot() {
    initPromoBanner();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initHeroAnimations();
    initScrollAnimations();
    initRitualCards();
    initStatCounters();
    initVideoPlayer();
    initNewsletterForm();
    setFooterYear();
  }

  document.addEventListener('DOMContentLoaded', boot);

  /* ═══════════════════════════════════════════════════════════
     HERO ANIMATIONS
     Cinematic entrance: eyebrow → title words → ritual tags
     → subtitle → app badges → phone
     ═══════════════════════════════════════════════════════════ */
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Eyebrow */
    const eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: 16, letterSpacing: '.3em' },
        { opacity: 1, y: 0, letterSpacing: '.15em', duration: 0.8 },
        0.2
      );
    }

    /* Title — split into words */
    const title = document.querySelector('.hero-title');
    if (title) {
      const words = splitWords(title);
      tl.fromTo(words,
        { opacity: 0, y: 40, rotateX: -45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.1 },
        0.5
      );
    }

    /* Ritual strip — stagger each tag */
    const ritualTags = document.querySelectorAll('.ritual-tag, .ritual-sep');
    if (ritualTags.length) {
      tl.fromTo(ritualTags,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out' },
        1.1
      );
    }

    /* Subtitle */
    const sub = document.querySelector('.hero-subtitle');
    if (sub) {
      tl.fromTo(sub,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.6
      );
    }

    /* App badges */
    const badges = document.querySelectorAll('.hero-app-badges .app-badge-link');
    if (badges.length) {
      tl.fromTo(badges,
        { opacity: 0, y: 18, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12 },
        1.9
      );
    }

    /* Phone — floats in from right, slight rotation */
    const phone = document.querySelector('.hero-phone');
    if (phone) {
      tl.fromTo(phone,
        { opacity: 0, x: 60, rotateY: 15, scale: 0.9 },
        { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
        0.6
      );
    }

    /* Scroll cue — subtle pulse after entrance */
    const scrollCue = document.querySelector('.hero-scroll-cue');
    if (scrollCue) {
      tl.fromTo(scrollCue,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        2.5
      );
    }

    /* Subtle floating animation on phone after entrance */
    if (phone) {
      gsap.to(phone, {
        y: -18,
        duration: 3.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.8
      });
    }

    /* Parallax on phone as you scroll */
    const phoneWrap = document.querySelector('.hero-phone-wrap');
    if (phoneWrap) {
      gsap.to(phoneWrap, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    /* Hero text fades as you scroll */
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
      gsap.to(heroText, {
        yPercent: -8,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '80% top',
          scrub: true
        }
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     GENERAL SCROLL ANIMATIONS
     ═══════════════════════════════════════════════════════════ */
  function initScrollAnimations() {

    /* ── Section titles — word-by-word stagger ─────────── */
    document.querySelectorAll('.section-title').forEach(el => {
      const words = splitWords(el);
      if (words.length) {
        gsap.fromTo(words,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      }
    });

    /* ── Section eyebrows ──────────────────────────────── */
    document.querySelectorAll('.section-eyebrow').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 12, letterSpacing: '.25em' },
        {
          opacity: 1, y: 0, letterSpacing: el.style.letterSpacing || '.14em', duration: 0.7,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    /* ── Section subtitles ─────────────────────────────── */
    document.querySelectorAll('.section-subtitle').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    /* ── Mission text ───────────────────────────────────── */
    const missionText = document.querySelector('.mission-text');
    if (missionText) {
      gsap.fromTo([
        missionText.querySelector('.mission-lead'),
        missionText.querySelector('.mission-body'),
        missionText.querySelector('.mission-quote'),
        missionText.querySelector('.mission-note')
      ].filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', stagger: 0.18,
          scrollTrigger: { trigger: missionText, start: 'top 80%', once: true }
        }
      );
    }

    /* ── Mission stat cards — stagger in ──────────────── */
    const missionStats = document.querySelectorAll('.mission-stat');
    if (missionStats.length) {
      gsap.fromTo(missionStats,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.5)', stagger: 0.12,
          scrollTrigger: { trigger: missionStats[0].closest('.mission-stats-stack'), start: 'top 82%', once: true }
        }
      );
    }

    /* ── Pack items ─────────────────────────────────────── */
    const packItems = document.querySelectorAll('.pack-item');
    if (packItems.length) {
      gsap.fromTo(packItems,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: packItems[0].closest('.pack-grid'), start: 'top 83%', once: true }
        }
      );
    }

    /* ── Video wrapper — cinematic scale entrance ──────── */
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
      gsap.fromTo(videoWrapper,
        { opacity: 0, scale: 0.86, y: 50 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: videoWrapper, start: 'top 85%', once: true }
        }
      );
    }

    /* ── Stats — pop in with spring ────────────────────── */
    const stats = document.querySelectorAll('.stat');
    if (stats.length) {
      gsap.fromTo(stats,
        { opacity: 0, y: 30, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.1,
          scrollTrigger: { trigger: stats[0].closest('.stats-display'), start: 'top 83%', once: true }
        }
      );
    }

    /* ── Testimonials — staggered reveal with tilt ─────── */
    document.querySelectorAll('.testimonial-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 45, rotateX: -6 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power2.out',
          delay: i * 0.14,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        }
      );
    });

    /* ── Download section elements ──────────────────────── */
    const dlTitle = document.querySelector('.download-title');
    const dlSub   = document.querySelector('.download-subtitle');
    const dlBadges = document.querySelector('.download-badges');
    const ctaForm  = document.getElementById('ctaForm');
    [dlTitle, dlSub, dlBadges, ctaForm].forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    /* ── Download phone ─────────────────────────────────── */
    const dlPhone = document.querySelector('.download-phone');
    if (dlPhone) {
      gsap.fromTo(dlPhone,
        { opacity: 0, y: 60, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: dlPhone, start: 'top 85%', once: true }
        }
      );
    }

    /* ── FAQ items — slide in from left ────────────────── */
    document.querySelectorAll('.faq-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
          delay: i * 0.06,
          scrollTrigger: { trigger: item, start: 'top 92%', once: true }
        }
      );
    });

    /* ── Footer fade in ─────────────────────────────────── */
    const footer = document.querySelector('.footer');
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1, duration: 1, ease: 'power1.out',
          scrollTrigger: { trigger: footer, start: 'top 95%', once: true }
        }
      );
    }
  }

  /* ═══════════════════════════════════════════════════════════
     RITUAL CARDS — scroll-stagger with color accent glow
     ═══════════════════════════════════════════════════════════ */
  function initRitualCards() {
    const cards = document.querySelectorAll('.ritual-card');
    if (!cards.length) return;

    /* Stagger entrance */
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75, ease: 'power2.out',
        stagger: { each: 0.14, from: 'start' },
        scrollTrigger: {
          trigger: '.rituals-grid',
          start: 'top 82%',
          once: true
        }
      }
    );

    /* Badge pop after cards reveal */
    const badges = document.querySelectorAll('.ritual-badge');
    if (badges.length) {
      gsap.fromTo(badges,
        { opacity: 0, scale: 0.6, y: 6 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.45, ease: 'back.out(2)',
          stagger: 0.12,
          scrollTrigger: { trigger: '.rituals-grid', start: 'top 80%', once: true }
        }
      );
    }

    /* Ritual number count-up on each card */
    document.querySelectorAll('.ritual-number').forEach((num, i) => {
      gsap.fromTo(num,
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'power1.out',
          delay: i * 0.14,
          scrollTrigger: { trigger: '.rituals-grid', start: 'top 82%', once: true }
        }
      );
    });

    /* Mouse-tilt effect on cards (desktop only) */
    if (window.matchMedia('(hover:hover)').matches) {
      cards.forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const cx   = rect.left + rect.width / 2;
          const cy   = rect.top  + rect.height / 2;
          const dx   = (e.clientX - cx) / (rect.width / 2);
          const dy   = (e.clientY - cy) / (rect.height / 2);
          gsap.to(card, {
            rotateY: dx * 6,
            rotateX: -dy * 4,
            scale: 1.025,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 900
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0, rotateX: 0, scale: 1,
            duration: 0.6, ease: 'power2.out'
          });
        });
      });
    }

    /* Scroll-scrub background color shift on the section */
    const ritualsSection = document.querySelector('.rituals-section');
    if (ritualsSection) {
      const colors = ['#FAF9F2', '#FAF9F2', '#FAF9F2', '#FAF9F2', '#FAF9F2'];
      // Subtle color accent on section background when each card row enters
      gsap.utils.toArray('.ritual-card').forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            const accent = getComputedStyle(document.documentElement)
              .getPropertyValue(['--terracotta', '--mind', '--sage', '--gold', '--forest'][i] || '--terracotta').trim();
          }
        });
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     ANIMATED STAT COUNTERS
     ═══════════════════════════════════════════════════════════ */
  function initStatCounters() {
    const nums = document.querySelectorAll('.stat-number[data-target]');
    if (!nums.length) return;

    nums.forEach(el => {
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
    const obj    = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.4,
      ease: 'power1.out',
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     TEXT SPLITTING UTILITY
     ═══════════════════════════════════════════════════════════ */
  function splitWords(el) {
    if (el.dataset.split) return el.querySelectorAll('.word');
    const original = el.innerHTML;
    const ariaLabel = el.textContent.trim();
    el.dataset.split = 'words';
    el.setAttribute('aria-label', ariaLabel);

    // Use text nodes only (preserve inline elements)
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    // Simple approach: just split the text content
    const words = ariaLabel.split(/\s+/).filter(Boolean);
    el.innerHTML = words.map(w =>
      `<span class="word" style="display:inline-block;white-space:nowrap">${w}</span>`
    ).join(' ');

    return el.querySelectorAll('.word');
  }

  /* ═══════════════════════════════════════════════════════════
     VIDEO PLAYER
     ═══════════════════════════════════════════════════════════ */
  function initVideoPlayer() {
    const video   = document.getElementById('heroVideo');
    const overlay = document.getElementById('videoOverlay');
    if (!video || !overlay) return;

    overlay.addEventListener('click', () => {
      video.muted = false;
      video.play();
      gsap.to(overlay, { opacity: 0, duration: 0.4, onComplete: () => {
        overlay.style.pointerEvents = 'none';
      }});
    });

    video.addEventListener('click', () => {
      if (!video.paused) {
        video.pause();
        overlay.style.pointerEvents = 'auto';
        gsap.to(overlay, { opacity: 1, duration: 0.4 });
      }
    });

    video.addEventListener('ended', () => {
      overlay.style.pointerEvents = 'auto';
      gsap.to(overlay, { opacity: 1, duration: 0.4 });
    });

    /* Auto-play (muted) when the video section enters the viewport */
    ScrollTrigger.create({
      trigger: video,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        video.muted = true;
        video.play().catch(() => {});
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     PROMO BANNER
     ═══════════════════════════════════════════════════════════ */
  function initPromoBanner() {
    const banner = document.getElementById('promoBanner');
    const btn    = document.getElementById('promoClose');
    if (!banner || !btn) return;
    if (sessionStorage.getItem('promo-off')) { banner.classList.add('hidden'); return; }
    btn.addEventListener('click', () => {
      gsap.to(banner, {
        height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, duration: 0.4,
        onComplete: () => { banner.classList.add('hidden'); }
      });
      sessionStorage.setItem('promo-off', '1');
    });
  }

  /* ═══════════════════════════════════════════════════════════
     NAVBAR — scroll shadow
     ═══════════════════════════════════════════════════════════ */
  function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    /* Transparent over dark hero, solid once past it */
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 95%',
      onEnter:     () => nav.classList.add('solid'),
      onLeaveBack: () => nav.classList.remove('solid'),
    });

    const checkShadow = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', checkShadow, { passive: true });
    checkShadow();

  }

  /* ═══════════════════════════════════════════════════════════
     MOBILE NAV
     ═══════════════════════════════════════════════════════════ */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu   = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      if (isOpen) {
        gsap.fromTo(menu,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
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

  /* ═══════════════════════════════════════════════════════════
     SMOOTH SCROLL
     ═══════════════════════════════════════════════════════════ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = (document.getElementById('navbar')?.offsetHeight || 72) + 16;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     NEWSLETTER FORM
     ═══════════════════════════════════════════════════════════ */
  function initNewsletterForm() {
    const form = document.getElementById('ctaForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input?.value.trim();
      if (!email) return;

      const btn  = form.querySelector('button');
      const orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const res = await fetch('/api/contact/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (res.ok) {
          showToast('Your e-book is on its way! 🎉');
          form.reset();
          gsap.to(form, { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' });
        } else {
          const d = await res.json();
          showToast(d.error || 'Something went wrong');
        }
      } catch {
        showToast('Subscribed! (offline preview)');
        form.reset();
      } finally {
        btn.textContent = orig;
        btn.disabled = false;
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     FOOTER YEAR
     ═══════════════════════════════════════════════════════════ */
  function setFooterYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ═══════════════════════════════════════════════════════════
     TOAST
     ═══════════════════════════════════════════════════════════ */
  function showToast(msg, ms = 3500) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), ms);
  }

  window.MBR = window.MBR || {};
  window.MBR.showToast = showToast;

})();

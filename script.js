/* ============================================================
   virtualpersonal.ai — Main JavaScript
   Modules: DarkMode, Navbar, ScrollAnimator, ParticleSystem,
            InputTyper, PricingToggle, ChatWidget, Ripple
   ============================================================ */

'use strict';

/* ── 1. Dark / Light Mode ── */
const DarkMode = {
  STORAGE_KEY: 'vp-theme',

  init() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // Sync icon to current state (class already applied by <head> script)
    this._syncIcon();
    btn.addEventListener('click', () => this.toggle());
  },

  apply(mode) {
    document.documentElement.classList.toggle('light', mode === 'light');
    localStorage.setItem(this.STORAGE_KEY, mode);
    this._syncIcon();
    // Re-paint particles if they exist (color scheme changes)
    if (window.ParticleSystem) ParticleSystem.updateColors();
  },

  toggle() {
    const isLight = document.documentElement.classList.contains('light');
    this.apply(isLight ? 'dark' : 'light');
  },

  _syncIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const isLight = document.documentElement.classList.contains('light');
    icon.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      icon.innerHTML = isLight
        ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
        : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      icon.style.transform = 'rotate(0deg)';
    }, 180);
  }
};

/* ── 2. Navbar ── */
const Navbar = {
  init() {
    const nav    = document.getElementById('navbar');
    const burger = document.getElementById('hamburger');
    const menu   = document.getElementById('mobile-menu');
    if (!nav) return;

    // Scroll → glass effect
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial

    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link');
    const secObs   = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        }
      });
    }, { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' });
    sections.forEach(s => secObs.observe(s));

    // Mobile menu
    if (burger && menu) {
      burger.addEventListener('click', () => {
        const open = burger.classList.toggle('open');
        menu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      document.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', () => {
          burger.classList.remove('open');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }
};

/* ── 3. Scroll Reveal Animator ── */
const ScrollAnimator = {
  init() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('is-visible');
          if (el.dataset.count !== undefined) this.animateCounter(el);
        }, delay);
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));

    // Timeline progress animation
    const timelineObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector('.timeline-track-progress');
          if (bar) { setTimeout(() => { bar.style.width = '100%'; }, 300); }
          timelineObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const timelineEl = document.querySelector('.timeline-container');
    if (timelineEl) timelineObs.observe(timelineEl);
  },

  animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 2200;
    const startTime = performance.now();
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = easeOutCubic(progress) * target;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
};

/* ── 4. Particle System (Canvas) ── */
const ParticleSystem = {
  canvas: null,
  ctx: null,
  particles: [],
  animId: null,
  isDark: true,
  isVisible: true,

  init() {
    this.canvas = document.getElementById('particle-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isDark = !document.documentElement.classList.contains('light');
    this.resize();
    this.spawn();
    this.loop();

    window.addEventListener('resize', () => {
      this.resize();
      this.spawn();
    }, { passive: true });

    // Pause when hero is off-screen (performance)
    const heroObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        this.isVisible = e.isIntersecting;
        if (this.isVisible && !this.animId) this.loop();
      });
    }, { threshold: 0 });
    const heroEl = document.getElementById('hero');
    if (heroEl) heroObs.observe(heroEl);

    // Pause on hidden tab
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      } else if (this.isVisible) {
        this.loop();
      }
    });
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  spawn() {
    const count = Math.min(75, Math.floor(window.innerWidth / 18));
    this.particles = Array.from({ length: count }, () => ({
      x:     Math.random() * this.canvas.width,
      y:     Math.random() * this.canvas.height,
      r:     Math.random() * 1.4 + 0.3,
      vx:    (Math.random() - 0.5) * 0.28,
      vy:    (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.45 + 0.08,
      hue:   Math.random() > 0.82 ? 45 : 170, // ~gold : ~emerald
      sat:   Math.random() * 20 + 70,
    }));
  },

  updateColors() {
    this.isDark = !document.documentElement.classList.contains('light');
  },

  drawConnections() {
    const maxDist = 110;
    const particles = this.particles;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * (this.isDark ? 0.10 : 0.07);
          this.ctx.strokeStyle = `hsla(170, 75%, 52%, ${opacity})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(particles[i].x, particles[i].y);
          this.ctx.lineTo(particles[j].x, particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  },

  loop() {
    if (!this.isVisible) { this.animId = null; return; }
    const { ctx, canvas, particles } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawConnections();

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0)             p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0)             p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const alphaMulti = this.isDark ? 1 : 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 60%, ${p.alpha * alphaMulti})`;
      ctx.fill();
    });

    this.animId = requestAnimationFrame(() => this.loop());
  }
};

/* ── 5. Hero Input Typewriter ── */
const InputTyper = {
  placeholders: [
    'Find me an executive virtual assistant for my CEO...',
    'I need a social media VA with Canva experience...',
    'Looking for a bookkeeping VA for my e-commerce store...',
    'Hire a customer support VA fluent in English...',
    'I need a general VA for project management and emails...',
  ],
  idx: 0,
  typingSpeed: 52,
  eraseSpeed: 26,
  pauseAfterType: 2800,
  pauseAfterErase: 350,

  init() {
    const input = document.getElementById('hero-query-input');
    if (!input) return;
    this._cycle(input);
  },

  _cycle(input) {
    const text = this.placeholders[this.idx];
    let charIdx = 0;
    input.placeholder = '';

    const typeChar = () => {
      input.placeholder += text[charIdx++];
      if (charIdx < text.length) {
        setTimeout(typeChar, this.typingSpeed);
      } else {
        setTimeout(() => eraseChar(), this.pauseAfterType);
      }
    };

    const eraseChar = () => {
      if (input.placeholder.length > 0) {
        input.placeholder = input.placeholder.slice(0, -1);
        setTimeout(eraseChar, this.eraseSpeed);
      } else {
        this.idx = (this.idx + 1) % this.placeholders.length;
        setTimeout(() => this._cycle(input), this.pauseAfterErase);
      }
    };

    setTimeout(typeChar, 400);
  }
};

/* ── 6. Pricing Toggle ── */
const PricingToggle = {
  isAnnual: false,

  init() {
    const btn   = document.getElementById('pricing-toggle');
    const label = document.getElementById('pricing-toggle-label');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.isAnnual = !this.isAnnual;
      btn.classList.toggle('is-annual', this.isAnnual);
      if (label) label.textContent = this.isAnnual ? 'Annual (Save 20%)' : 'Monthly';

      document.querySelectorAll('[data-price-monthly]').forEach(el => {
        const val = this.isAnnual ? el.dataset.priceAnnual : el.dataset.priceMonthly;
        el.textContent = val;
        // Animate the price change
        el.style.transform = 'translateY(-8px)';
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
          el.style.transform = 'none';
          el.style.opacity = '1';
        }, 50);
      });

      // Toggle savings badge visibility
      document.querySelectorAll('[data-annual-only]').forEach(el => {
        el.style.opacity = this.isAnnual ? '1' : '0';
      });
    });
  }
};

/* ── 7. Chat Widget ── */
const ChatWidget = {
  isOpen: false,
  responseIdx: 0,
  responses: [
    "Great question! Our AI matching engine surfaces qualified VA candidates tailored to your exact needs within 24 hours. What type of role are you looking to fill?",
    "We specialize in placing thoroughly vetted Virtual Assistants and virtual professionals. Unlike platforms like Upwork, we handle all the vetting — you just approve the match.",
    "I'd love to connect you with a Talent Advisor for a free 20-minute strategy call. Ready to find your perfect VA? 🚀",
  ],
  autoGreeted: false,

  init() {
    const trigger  = document.getElementById('chat-trigger');
    const panel    = document.getElementById('chat-panel');
    const badge    = document.getElementById('chat-badge');
    const input    = document.getElementById('chat-input');
    const sendBtn  = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');

    if (!trigger) return;

    trigger.addEventListener('click', () => this._toggle(panel, badge));
    if (sendBtn) sendBtn.addEventListener('click', () => this._send(input, messages));
    if (input)   input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this._send(input, messages); }
    });

    // Auto-greeting after 4s
    setTimeout(() => {
      if (!this.autoGreeted) {
        this.autoGreeted = true;
        if (!this.isOpen && badge) badge.classList.remove('hidden');
        // Add first message silently (shown when chat opens)
        this._appendMessage(messages, 'bot',
          "Hi there! 👋 I'm your AI Talent Advisor. Looking to hire a Virtual Assistant or virtual professional? I can help you find the perfect match in 24 hours."
        );
      }
    }, 4000);

    // Close on outside click
    document.addEventListener('click', e => {
      if (this.isOpen && !document.getElementById('chat-widget').contains(e.target)) {
        this._toggle(panel, badge);
      }
    });
  },

  _toggle(panel, badge) {
    this.isOpen = !this.isOpen;
    panel.classList.toggle('open', this.isOpen);
    if (this.isOpen && badge) badge.classList.add('hidden');
    // Scroll to bottom of messages
    if (this.isOpen) {
      const msgs = document.getElementById('chat-messages');
      if (msgs) setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 100);
    }
  },

  _send(input, messages) {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    this._appendMessage(messages, 'user', text);
    input.value = '';
    const typing = this._appendTyping(messages);
    const delay  = 900 + Math.random() * 500;
    setTimeout(() => {
      typing.remove();
      const resp = this.responses[this.responseIdx % this.responses.length];
      this.responseIdx++;
      this._appendMessage(messages, 'bot', resp);
    }, delay);
  },

  _appendMessage(container, type, text) {
    if (!container) return;
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${type}`;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  },

  _appendTyping(container) {
    if (!container) return document.createElement('div');
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg--typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  }
};

/* ── 8. Ripple Micro-interaction ── */
const Ripple = {
  init() {
    document.querySelectorAll('.btn-ripple').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect   = this.getBoundingClientRect();
        ripple.className = 'ripple-effect';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top  = (e.clientY - rect.top)  + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }
};

/* ── 9. Smooth Scroll for Anchor Links ── */
const SmoothScroll = {
  scrollTo(target) {
    const nav = document.getElementById('navbar');
    const offset = nav ? nav.offsetHeight + 8 : 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  },
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        this.scrollTo(target);
      });
    });
  }
};

/* ── 10. Timeline Step Animation ── */
const Timeline = {
  animated: false,

  init() {
    // Click to jump to a step
    document.querySelectorAll('.timeline-node-circle').forEach((node, i) => {
      node.addEventListener('click', () => this.activateUpTo(i));
    });

    // Auto-play when section scrolls into view
    const section = document.getElementById('how-it-works');
    if (!section) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          this.playSequence();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(section);
  },

  activateUpTo(index) {
    const nodes = document.querySelectorAll('.timeline-node-circle');
    nodes.forEach((node, i) => {
      node.classList.remove('step-latest');
      const on = i <= index;
      node.classList.toggle('step-active', on);
      node.classList.toggle('active', on);
    });
    if (nodes[index]) nodes[index].classList.add('step-latest');
    const bar = document.querySelector('.timeline-track-progress');
    if (bar) {
      bar.style.transition = 'width 0.45s ease-out';
      bar.style.width = `${(index / (nodes.length - 1)) * 100}%`;
    }
  },

  playSequence() {
    const nodes = document.querySelectorAll('.timeline-node-circle');
    const bar   = document.querySelector('.timeline-track-progress');

    // Hard-reset everything
    nodes.forEach(n => {
      n.classList.remove('step-active', 'active', 'step-burst', 'step-latest');
    });
    if (bar) { bar.style.transition = 'none'; bar.style.width = '0%'; }

    const STEP_MS = 620;

    nodes.forEach((node, i) => {
      setTimeout(() => {
        // Remove latest pulse from previous node
        if (i > 0) nodes[i - 1].classList.remove('step-latest');

        node.classList.add('step-active', 'active', 'step-burst', 'step-latest');

        // Strip burst class after animation so CSS transition takes over cleanly
        setTimeout(() => node.classList.remove('step-burst'), 580);

        // Advance progress bar to this step
        if (bar) {
          bar.style.transition = 'width 0.42s ease-out';
          bar.style.width = i === 0 ? '0%' : `${(i / (nodes.length - 1)) * 100}%`;
        }
      }, 320 + i * STEP_MS);
    });
  }
};

/* ── 11. Form Validation & Submit ── */
const ContactForm = {
  init() {
    const form = document.getElementById('cta-form');
    const btn  = document.getElementById('cta-submit');
    if (!form) return;

    // Live email validation
    const emailInput = form.querySelector('[data-validate="email"]');
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        emailInput.style.borderColor = emailInput.value
          ? (valid ? 'var(--emerald)' : '#ef4444')
          : '';
      });
    }

    // Submit handler
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
      setTimeout(() => {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) success.style.display = 'block';
      }, 1200);
    });
  }
};

/* ── 12. Number formatting for counters ── */
// Called via data-count on elements

/* ── Bootstrap (DOMContentLoaded) ── */
document.addEventListener('DOMContentLoaded', () => {
  DarkMode.init();
  Navbar.init();
  ScrollAnimator.init();
  ParticleSystem.init();
  InputTyper.init();
  PricingToggle.init();
  ChatWidget.init();
  Ripple.init();
  SmoothScroll.init();
  Timeline.init();
  ContactForm.init();
});

/* Expose globally for DarkMode.updateColors() call */
window.ParticleSystem = ParticleSystem;

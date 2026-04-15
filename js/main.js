/**
 * Future Edge Academy — Main JavaScript
 * Features: Cursor, Preloader, Navbar, Animations,
 *           Particles, Typing, Counter, Slider, Dark Mode
 */

'use strict';

/* ─────────────────────────────────
   PAGE TRANSITION
───────────────────────────────── */
class PageTransition {
  constructor() {
    this.overlay = document.querySelector('.page-transition');
    this.init();
  }

  init() {
    if (!this.overlay) return;
    // Reveal page after load
    window.addEventListener('load', () => {
      setTimeout(() => this.overlay.classList.add('leaving'), 100);
    });

    // Intercept clicks
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank'
      ) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        this.overlay.classList.remove('leaving');
        this.overlay.classList.add('entering');
        setTimeout(() => { window.location.href = href; }, 500);
      });
    });
  }
}

/* ─────────────────────────────────
   PRELOADER
───────────────────────────────── */
class Preloader {
  constructor() {
    this.el = document.getElementById('preloader');
    if (!this.el) return;
    this.hide();
  }

  hide() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.el.classList.add('hidden');
        document.body.style.overflow = '';
      }, 2200);
    });
    document.body.style.overflow = 'hidden';
  }
}

/* ─────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────── */
class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    if (!this.dot || !this.ring) return;
    this.x = 0; this.y = 0;
    this.ringX = 0; this.ringY = 0;
    this.init();
    this.animate();
  }

  init() {
    document.addEventListener('mousemove', e => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.dot.style.left = this.x + 'px';
      this.dot.style.top = this.y + 'px';
    });

    document.querySelectorAll('a, button, .glass-card, .gallery-item, .tab-btn, .slider-btn').forEach(el => {
      el.addEventListener('mouseenter', () => this.ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => this.ring.classList.remove('hovering'));
    });
  }

  animate() {
    this.ringX += (this.x - this.ringX) * 0.12;
    this.ringY += (this.y - this.ringY) * 0.12;
    this.ring.style.left = this.ringX + 'px';
    this.ring.style.top = this.ringY + 'px';
    requestAnimationFrame(() => this.animate());
  }
}

/* ─────────────────────────────────
   NAVBAR
───────────────────────────────── */
class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.scrollTop = document.querySelector('.scroll-top');
    this.isOpen = false;

    if (!this.navbar) return;
    this.init();
    this.setActive();
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    if (this.mobileMenu) {
      this.mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
    }

    if (this.scrollTop) {
      this.scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  onScroll() {
    const scroll = window.scrollY;
    this.navbar.classList.toggle('scrolled', scroll > 50);
    if (this.scrollTop) {
      this.scrollTop.classList.toggle('visible', scroll > 400);
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.hamburger.classList.toggle('active', this.isOpen);
    this.mobileMenu?.classList.toggle('open', this.isOpen);
    document.body.classList.toggle('menu-open', this.isOpen);
  }

  closeMenu() {
    this.isOpen = false;
    this.hamburger?.classList.remove('active');
    this.mobileMenu?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  setActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href')?.split('/').pop();
      link.classList.toggle('active', href === path);
    });
  }
}

/* ─────────────────────────────────
   SCROLL REVEAL ANIMATIONS
───────────────────────────────── */
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!this.elements.length) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.elements.forEach(el => this.observer.observe(el));
  }
}

/* ─────────────────────────────────
   TYPING ANIMATION
───────────────────────────────── */
class TypingEffect {
  constructor(el, words, speed = 80, pause = 2000) {
    this.el = el;
    if (!this.el) return;
    this.words = words;
    this.speed = speed;
    this.pause = pause;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex % this.words.length];
    const displayText = this.isDeleting
      ? currentWord.substring(0, this.charIndex - 1)
      : currentWord.substring(0, this.charIndex + 1);

    this.el.textContent = displayText;
    this.charIndex = this.isDeleting ? this.charIndex - 1 : this.charIndex + 1;

    let delay = this.isDeleting ? this.speed / 2 : this.speed;

    if (!this.isDeleting && displayText === currentWord) {
      delay = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && displayText === '') {
      this.isDeleting = false;
      this.wordIndex++;
      delay = 400;
    }

    setTimeout(() => this.type(), delay);
  }
}

/* ─────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────── */
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    if (!this.counters.length) return;

    this.observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          this.observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.5 }
    );
    this.counters.forEach(c => this.observer.observe(c));
  }

  animate(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }
}

/* ─────────────────────────────────
   PARTICLES CANVAS
───────────────────────────────── */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.offsetParent?.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetParent?.offsetHeight || window.innerHeight;
  }

  createParticles() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    this.particles = Array.from({ length: Math.min(count, 80) }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? '0, 212, 255' : '168, 85, 247',
    }));
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.3;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      this.ctx.fill();
    });

    this.drawConnections();
    this.ctx.shadowBlur = 0;
    requestAnimationFrame(() => this.animate());
  }
}

/* ─────────────────────────────────
   TESTIMONIALS SLIDER
───────────────────────────────── */
class Slider {
  constructor() {
    this.track = document.querySelector('.testimonials-track');
    this.prevBtn = document.querySelector('.slider-prev');
    this.nextBtn = document.querySelector('.slider-next');
    this.dots = document.querySelectorAll('.slider-dot');
    if (!this.track) return;

    this.cards = this.track.querySelectorAll('.testimonial-card');
    this.current = 0;
    this.auto = null;
    this.init();
    this.startAuto();
  }

  init() {
    this.prevBtn?.addEventListener('click', () => this.move(-1));
    this.nextBtn?.addEventListener('click', () => this.move(1));
    this.dots.forEach((d, i) => d.addEventListener('click', () => this.goTo(i)));

    // Touch/drag support
    let startX = 0;
    this.track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    this.track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) this.move(diff > 0 ? 1 : -1);
    });
  }

  move(dir) {
    this.current = (this.current + dir + this.cards.length) % this.cards.length;
    this.update();
    this.resetAuto();
  }

  goTo(i) {
    this.current = i;
    this.update();
    this.resetAuto();
  }

  update() {
    const cardW = this.cards[0].offsetWidth + 24;
    this.track.style.transform = `translateX(-${this.current * cardW}px)`;
    this.dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
  }

  startAuto() {
    this.auto = setInterval(() => this.move(1), 5000);
  }

  resetAuto() {
    clearInterval(this.auto);
    this.startAuto();
  }
}

/* ─────────────────────────────────
   DARK MODE TOGGLE
───────────────────────────────── */
class DarkModeToggle {
  constructor() {
    this.btn = document.querySelector('.theme-toggle');
    this.icon = this.btn?.querySelector('i');
    this.current = localStorage.getItem('theme') || 'dark';
    if (!this.btn) return;

    this.apply(this.current);
    this.btn.addEventListener('click', () => {
      this.current = this.current === 'dark' ? 'light' : 'dark';
      this.apply(this.current);
      localStorage.setItem('theme', this.current);
    });
  }

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (this.icon) {
      this.icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ─────────────────────────────────
   GALLERY FILTER & LIGHTBOX
───────────────────────────────── */
class Gallery {
  constructor() {
    this.filters = document.querySelectorAll('.gallery-filter');
    this.items = document.querySelectorAll('.gallery-item');
    this.lightbox = document.querySelector('.lightbox');
    this.lightboxContent = document.querySelector('.lightbox-content');
    this.currentIndex = 0;

    if (!this.filters.length) return;
    this.init();
  }

  init() {
    this.filters.forEach(f => {
      f.addEventListener('click', () => {
        this.filters.forEach(x => x.classList.remove('active'));
        f.classList.add('active');
        const cat = f.getAttribute('data-filter');
        this.filterItems(cat);
      });
    });

    this.items.forEach((item, i) => {
      item.addEventListener('click', () => this.openLightbox(i));
    });

    document.querySelector('.lightbox-close')?.addEventListener('click', () => this.closeLightbox());
    document.querySelector('.lightbox-prev')?.addEventListener('click', () => this.navigate(-1));
    document.querySelector('.lightbox-next')?.addEventListener('click', () => this.navigate(1));

    document.addEventListener('keydown', e => {
      if (!this.lightbox?.classList.contains('open')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });

    this.lightbox?.addEventListener('click', e => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
  }

  filterItems(cat) {
    this.items.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      const show = cat === 'all' || itemCat === cat;
      item.style.opacity = show ? '1' : '0';
      item.style.transform = show ? 'scale(1)' : 'scale(0.8)';
      item.style.pointerEvents = show ? '' : 'none';
      item.style.transition = 'all 0.4s ease';
    });
  }

  openLightbox(i) {
    this.currentIndex = i;
    const item = this.items[i];
    const emoji = item.querySelector('.gallery-thumb')?.textContent
      || item.querySelector('.gallery-img')?.alt
      || '🖼';
    if (this.lightboxContent) {
      this.lightboxContent.textContent = emoji;
    }
    this.lightbox?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  navigate(dir) {
    const visible = [...this.items].filter(item => item.style.pointerEvents !== 'none');
    const idx = visible.indexOf(this.items[this.currentIndex]);
    const next = (idx + dir + visible.length) % visible.length;
    const nextItem = visible[next];
    this.currentIndex = [...this.items].indexOf(nextItem);
    const emoji = nextItem.querySelector('.gallery-thumb')?.textContent || '🖼';
    if (this.lightboxContent) this.lightboxContent.textContent = emoji;
  }
}

/* ─────────────────────────────────
   ADMISSION FORM
───────────────────────────────── */
class AdmissionForm {
  constructor() {
    this.form = document.getElementById('admissionForm');
    this.successMsg = document.getElementById('formSuccess');
    if (!this.form) return;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      if (!this.validate()) return;
      this.submit();
    });

    // Floating label effect
    this.form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }

  validate() {
    let valid = true;
    this.form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff006e';
        field.style.boxShadow = '0 0 15px rgba(255,0,110,0.3)';
        valid = false;
        setTimeout(() => {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }, 2000);
      }
    });
    return valid;
  }

  submit() {
    const btn = this.form.querySelector('button[type="submit"]');
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    setTimeout(() => {
      this.form.style.display = 'none';
      if (this.successMsg) {
        this.successMsg.style.display = 'block';
      }
    }, 1500);
  }
}

/* ─────────────────────────────────
   CONTACT FORM
───────────────────────────────── */
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = this.form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #06ffa5, #00d4ff)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
        this.form.reset();
      }, 3500);
    });
  }
}

/* ─────────────────────────────────
   RIPPLE EFFECT ON BUTTONS
───────────────────────────────── */
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* ─────────────────────────────────
   COURSES TAB FILTER
───────────────────────────────── */
class CourseTabs {
  constructor() {
    this.tabs = document.querySelectorAll('.tab-btn');
    this.cards = document.querySelectorAll('.course-card-wrap');
    if (!this.tabs.length) return;
    this.init();
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-tab');
        this.cards.forEach(card => {
          const show = filter === 'all' || card.getAttribute('data-level') === filter;
          card.style.display = show ? '' : 'none';
          if (show) {
            card.style.animation = 'fadeInUp 0.5s ease both';
          }
        });
      });
    });
  }
}

/* ─────────────────────────────────
   NEWSLETTER FORM
───────────────────────────────── */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.newsletter-btn');
    if (!input.value.trim()) return;
    btn.innerHTML = '✓';
    btn.style.background = 'linear-gradient(135deg,#06ffa5,#00d4ff)';
    input.value = '';
    setTimeout(() => {
      btn.innerHTML = '→';
      btn.style.background = '';
    }, 3000);
  });
}

/* ─────────────────────────────────
   PARALLAX EFFECT
───────────────────────────────── */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const orbs = hero.querySelectorAll('.hero-orb');
    orbs.forEach((orb, i) => {
      const speed = 0.2 + i * 0.1;
      orb.style.transform = `translateY(${scroll * speed}px)`;
    });
  }, { passive: true });
}

/* ─────────────────────────────────
   INIT ALL
───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Core
  new Preloader();
  new PageTransition();
  new CustomCursor();
  new Navbar();
  new ScrollReveal();
  new DarkModeToggle();

  // Home page
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    new TypingEffect(typingEl, [
      'Shaping Tomorrow\'s Leaders',
      'Where Innovation Meets Education',
      'AI-Powered Learning Experience',
      'Building Futures, One Mind at a Time',
      'Excellence in Every Classroom',
    ], 60, 2200);
  }

  new CounterAnimation();
  new ParticleSystem('particles-canvas');
  new Slider();

  // Pages
  new Gallery();
  new AdmissionForm();
  new ContactForm();
  new CourseTabs();

  // Utils
  initRipple();
  initNewsletter();
  initParallax();
});

/* ============================================
   PORTFOLIO JS — Vinnarasan L
============================================ */

// ── Navbar scroll effect ──────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? (bars[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)',
      bars[1].style.cssText = 'opacity:0',
      bars[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)')
    : bars.forEach(b => (b.style.cssText = ''));
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(b => (b.style.cssText = ''));
  })
);

// ── Intersection Observer — reveal ───────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => revealObs.observe(el));

// ── Skill bars animate on reveal ─────────────────
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skills-col').forEach(col => barObs.observe(col));

// ── Active nav link on scroll ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = '#d4af37';
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObs.observe(s));

// ── Smooth hero scroll button ─────────────────────
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// ── Stagger reveal delay ──────────────────────────
document.querySelectorAll('.about-grid .reveal, .resp-grid .reveal, .achieve-grid .reveal')
  .forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });

// ── Tilt effect on glass cards ────────────────────
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.3s, background 0.3s';
  });
});

// ── Contact card ripple ───────────────────────────
document.querySelectorAll('.contact-card').forEach(card => {
  card.setAttribute('style', card.getAttribute('style') || '');
  card.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:10px; height:10px;
      background:rgba(212,175,55,0.35);
      left:${e.clientX - rect.left - 5}px;
      top:${e.clientY - rect.top - 5}px;
      transform:scale(0); animation:ripple 0.6s linear;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Add keyframe for ripple
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(40); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ── Typewriter effect (hero title) ────────────────
// Runs ONCE — hardcoded text avoids reading garbled DOM
window.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.hero-title');
  if (!el) return;
  const fullText = 'Physician Assistant';
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += fullText[i];
    i++;
    if (i >= fullText.length) clearInterval(timer);
  }, 120); // slow, professional pace
});

console.log('%c👨‍⚕️ Vinnarasan L — Physician Assistant Portfolio', 'color:#d4af37;font-size:14px;font-weight:bold');

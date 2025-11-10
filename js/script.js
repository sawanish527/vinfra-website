// =========================
// V-Infra - script.js
// =========================

// ===== Parallax Effect for Floating Cubes (optimized) =====
let mouseX = 0, mouseY = 0, ticking = false;

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
  document.addEventListener('mousemove', e => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const cubes = document.querySelectorAll('.cube');
        cubes.forEach(cube => {
          const speed = parseFloat(cube.dataset.speed) || 0.06;
          // smaller multipliers for smoother subtler motion
          const x = (mouseX - window.innerWidth / 2) * speed / 12;
          const y = (mouseY - window.innerHeight / 2) * speed / 12;
          cube.style.transform = `translateY(${y}px) translateX(${x}px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
        });

        // 3D tilt for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          const offsetX = (mouseX - window.innerWidth / 2) / 60;
          const offsetY = (mouseY - window.innerHeight / 2) / 60;
          heroContent.style.transform = `rotateY(${offsetX}deg) rotateX(${-offsetY}deg)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });
} else {
  // on touch devices, keep transforms reset
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) heroContent.style.transform = '';
}

// ===== Section Fade-In on Scroll (IntersectionObserver with fallback) =====
const sections = document.querySelectorAll('.about, .projects, .contact, .services');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px', // trigger a bit earlier
  threshold: 0.05 // small threshold to ensure it triggers reliably
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe each section
sections.forEach(sec => observer.observe(sec));

// ===== Fallback: ensure already-visible sections become visible on load =====
window.addEventListener('load', () => {
  // Make hero and services visible immediately
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('visible');

  const services = document.querySelector('.services');
  if (services) services.classList.add('visible');

  // Ensure any section already within viewport becomes visible
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      sec.classList.add('visible');
    }
  });
});

// ===== Smooth Scrolling Navigation =====
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if you implement one later
    }
  });
});

// ===== Optional: keyboard accessibility - allow Enter on nav links =====
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') a.click();
  });
});

const header = document.querySelector('header');
const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.links');
const anchorLinks = [...document.querySelectorAll('.links a')];

function closeMenu() {
  navLinks?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
anchorLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => event.key === 'Escape' && closeMenu());

function onScroll() { header?.classList.toggle('scrolled', scrollY > 24); }
onScroll();
addEventListener('scroll', onScroll, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
  revealObserver.observe(el);
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    anchorLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-40% 0px -52%' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

const roles = ['Full Stack Developer', 'JAVA Developer', 'Spring Boot Developer', 'Android Developer', 'Flutter Developer', 'Cross Platform App Developer'];
const typed = document.getElementById('typed');
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;
function typeRole() {
  if (!typed) return;
  const role = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  typed.textContent = role.slice(0, charIndex);
  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 350);
    return;
  }
  if (!deleting && charIndex === roles[roleIndex].length) {
    deleting = true;
    setTimeout(typeRole, 1800);
    return;
  }
  setTimeout(typeRole, deleting ? 38 : 75);
}
setTimeout(typeRole, 1800);
document.getElementById('year').textContent = new Date().getFullYear();

// Click-to-play video embed (supports YouTube, Vimeo, Archive.org, and direct video URLs)
document.querySelectorAll('.yt-embed').forEach(el => {
  function activate() {
    if (el.dataset.videourl) {
      const url = el.dataset.videourl;
      el.innerHTML = `<video src="${url}" controls autoplay></video>`;
    } else if (el.dataset.vimeoid) {
      const vimeoId = el.dataset.vimeoid;
      el.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1" title="Vimeo video player" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else if (el.dataset.archive) {
      const archiveId = el.dataset.archive;
      el.innerHTML = `<iframe src="https://archive.org/embed/${archiveId}?autoplay=1" title="Internet Archive video player" allow="autoplay; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    } else {
      const id = el.dataset.videoid;
      el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="YouTube video player" allow="autoplay; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
  }
  el.addEventListener('click', activate);
  el.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && activate());
});

// Back-to-top button smooth scrolling
document.querySelectorAll('a[href="#top"], .footer-top').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ── Presentation Slideshow ──
(function () {
  const total = 24;
  const track = document.getElementById('presTrack');
  const dotsContainer = document.getElementById('presDots');
  const prevBtn = document.querySelector('.pres-prev');
  const nextBtn = document.querySelector('.pres-next');
  if (!track || !dotsContainer) return;

  let current = 0;
  let autoTimer = null;
  let direction = 1; // 1 = LTR (right), -1 = RTL (left)

  // Build dots
  const dots = Array.from({ length: total }, (_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function updateDots(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function goTo(idx, skipAutoReset) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots(current);
    if (!skipAutoReset) resetAuto();
  }

  function nextSlide() {
    if (current >= total - 1) direction = -1;
    if (current <= 0) direction = 1;
    goTo(current + direction, true);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 3200);
  }

  prevBtn?.addEventListener('click', () => {
    direction = -1;
    goTo(current - 1);
  });
  nextBtn?.addEventListener('click', () => {
    direction = 1;
    goTo(current + 1);
  });

  // Touch/swipe support
  let touchStartX = 0;
  const slideshow = document.getElementById('presSlideshow');
  slideshow?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slideshow?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? goTo(current + 1) : goTo(current - 1); }
  }, { passive: true });

  // Pause on hover
  slideshow?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  slideshow?.addEventListener('mouseleave', resetAuto);

  // Keyboard accessibility
  slideshow?.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  resetAuto();
})();

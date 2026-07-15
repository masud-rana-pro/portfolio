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

const roles = ['Full Stack Developer', 'Spring Boot Developer', 'Android Developer', 'Flutter Developer'];
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

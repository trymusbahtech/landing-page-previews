document.documentElement.classList.add('motion');

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

const closeMenu = () => {
  mobileNav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const open = !mobileNav?.classList.contains('open');
  mobileNav?.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .12 });

document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((other) => { if (other !== video) other.pause(); });
  });
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) document.querySelectorAll('video').forEach((video) => video.pause());
});

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

if (header && menuButton) {
  menuButton.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
  });
  document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', () => {
    header.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .1 });
  items.forEach((item) => {
    item.style.setProperty('--delay', `${item.dataset.delay || 0}ms`);
    observer.observe(item);
  });
} else {
  items.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('.accordion details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.accordion details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

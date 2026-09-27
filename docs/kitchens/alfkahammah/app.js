const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (header && menuButton) {
  const closeMenu = () => {
    header.classList.remove('menu-is-open');
    document.body.classList.remove('menu-lock');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'فتح القائمة');
  };

  menuButton.addEventListener('click', () => {
    const open = header.classList.toggle('menu-is-open');
    document.body.classList.toggle('menu-lock', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
  });

  document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px' });

  revealItems.forEach((item) => {
    item.style.setProperty('--reveal-delay', `${item.dataset.delay || 0}ms`);
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const siteVideos = [...document.querySelectorAll('video')];
siteVideos.forEach((currentVideo) => {
  currentVideo.addEventListener('play', () => {
    siteVideos.forEach((otherVideo) => {
      if (otherVideo !== currentVideo) otherVideo.pause();
    });
  });
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) siteVideos.forEach((video) => video.pause());
});

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxTitle = lightbox.querySelector('[data-lightbox-title]');

  document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      lightboxImage.src = trigger.dataset.lightbox;
      lightboxImage.alt = trigger.dataset.title || '';
      lightboxTitle.textContent = trigger.dataset.title || '';
      lightbox.showModal();
    });
  });

  lightbox.querySelector('[data-close-lightbox]')?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

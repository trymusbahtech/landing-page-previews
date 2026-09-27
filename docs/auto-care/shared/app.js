const configNode = document.getElementById('site-config');

if (!configNode) {
  throw new Error('Missing site configuration.');
}

const site = JSON.parse(configNode.textContent);

const icons = {
  shield: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 26 7v8c0 7-4 11-10 14C10 26 6 22 6 15V7l10-4Z"/><path d="m11 16 3 3 7-8"/></svg>',
  sun: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="6"/><path d="M16 2v5M16 25v5M2 16h5M25 16h5M6 6l4 4M22 22l4 4M26 6l-4 4M10 22l-4 4"/></svg>',
  sparkle: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11Z"/><path d="M25 3c.4 3 1.8 4.4 5 5-3.2.6-4.6 2-5 5-.6-3-2-4.4-5-5 3-.6 4.4-2 5-5Z"/></svg>',
  palette: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4C9 4 4 9 4 16s5 12 12 12h2a3 3 0 0 0 0-6h-2a2 2 0 0 1 0-4h8a4 4 0 0 0 4-4C28 8 23 4 16 4Z"/><circle cx="10" cy="12" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="21" cy="11" r="1"/></svg>',
  seat: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 5v10c0 3 2 5 5 5h8v7M11 11H7v10c0 3 2 5 5 5h9"/><path d="M18 20v6"/></svg>',
  car: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m6 19 2-7c.4-1.5 1.5-2 3-2h10c1.5 0 2.6.5 3 2l2 7"/><path d="M4 18h24v7H4zM8 25v3M24 25v3M9 21h2M21 21h2"/></svg>',
  care: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 20c6-1 9-4 10-10 1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10Z"/><path d="M3 8c3-.5 4.5-2 5-5 .5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5Z"/></svg>',
  film: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="6" width="22" height="20" rx="4"/><path d="M8 22 24 10M8 16l7-7M17 23l7-7"/></svg>',
  wheel: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="4"/><path d="m16 12-3-7M20 16l7-3M16 20l3 7M12 16l-7 3"/></svg>',
};

const waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.5 9.5 0 0 0-8.1 14.5L2.6 21l4.7-1.2A9.5 9.5 0 1 0 12 2Zm5.4 13.4c-.2.6-1.2 1.2-1.8 1.3-.5.1-1.2.2-2-.1-.5-.2-1.1-.4-1.9-.8-3.3-1.4-5.4-4.8-5.6-5-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1.1-2.6.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6l1 2.5c.1.2.1.5 0 .7l-.4.7-.6.7c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.2.8-.1l1.1-1.3c.3-.3.5-.3.9-.2l2.3 1.1c.4.2.6.3.7.5.1.1.1.7-.1 1.3Z"/></svg>';
const phoneIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-5-1-1.2 3a16 16 0 0 1-9.8-9.8L8 8 7 3Z"/></svg>';
const mapIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const socialIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>';
const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"/></svg>';

document.documentElement.style.setProperty('--accent', site.theme.accent);
document.documentElement.style.setProperty('--accent-2', site.theme.accent2);
document.documentElement.style.setProperty('--accent-rgb', site.theme.rgb);
document.documentElement.style.setProperty('--logo-position', site.logoPosition || '50% 10%');
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', site.theme.base || '#080a0d');

const phoneHref = `tel:${site.phone.replace(/\s+/g, '')}`;
const waHref = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappText || 'مرحبًا، أريد الاستفسار عن خدمات العناية بالسيارات')}` : phoneHref;
const contactLabel = site.whatsapp ? 'تواصل عبر واتساب' : 'اتصل بالمركز';
const contactIcon = site.whatsapp ? waIcon : phoneIcon;
const sourceLinks = site.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener">${source.label} ↗</a>`).join('');
const navLinks = '<a href="#services">الخدمات</a><a href="#experience">التجربة</a><a href="#branches">الفروع</a><a href="#questions">الأسئلة</a>';

const serviceCards = site.services.map((service, index) => `
  <article class="service-card reveal" data-delay="${index * 70}">
    <span class="service-index">${String(index + 1).padStart(2, '0')}</span>
    <span class="service-icon">${icons[service.icon] || icons.car}</span>
    <h3>${service.title}</h3>
    <p>${service.copy}</p>
  </article>`).join('');

const branchCards = site.branches.map((branch, index) => `
  <article class="branch-card reveal" data-delay="${index * 70}">
    <span class="branch-number">${String(index + 1).padStart(2, '0')}</span>
    <div><h3>${branch.name}</h3><p>${branch.address}</p></div>
    <div class="branch-actions">
      <a class="mini-action primary" href="${branch.whatsapp ? `https://wa.me/${branch.whatsapp}` : phoneHref}" target="_blank" rel="noopener">تواصل</a>
      <a class="mini-action" href="${branch.map}" target="_blank" rel="noopener">الخريطة</a>
    </div>
  </article>`).join('');

const benefits = site.benefits.map((benefit, index) => `
  <article class="benefit reveal" data-delay="${index * 70}"><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${benefit.title}</h3><p>${benefit.copy}</p></div></article>`).join('');

const faqs = site.faqs.map((item, index) => `
  <details${index === 0 ? ' open' : ''}><summary>${item.q}</summary><p>${item.a}</p></details>`).join('');

document.getElementById('app').innerHTML = `
  <div class="demo-note">تصوّر تجريبي غير رسمي لموقع ${site.name} — المعلومات مستندة إلى القنوات العامة للمركز</div>
  <header class="site-header" id="top">
    <div class="container nav-row">
      <a class="brand" href="#top" aria-label="${site.name} — الرئيسية">
        <span class="brand-mark"><img src="${site.logo}" alt="شعار ${site.name}" /></span>
        <span class="brand-copy"><strong>${site.name}</strong><small>${site.nameEn}</small></span>
      </a>
      <nav class="main-nav" aria-label="التنقل الرئيسي">${navLinks}</nav>
      <a class="header-cta" href="${waHref}" target="_blank" rel="noopener">${contactLabel} <span>↗</span></a>
      <button class="menu-toggle" type="button" aria-label="فتح القائمة" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
    <nav class="mobile-menu" aria-label="قائمة الهاتف">${navLinks}<a href="${waHref}" target="_blank" rel="noopener">${contactLabel}</a></nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-orbit" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy reveal">
          <span class="eyebrow">${site.kicker}</span>
          <h1>${site.headline}<em>${site.headlineAccent}</em></h1>
          <p class="hero-description">${site.description}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${waHref}" target="_blank" rel="noopener">${contactLabel} ${arrowIcon}</a>
            <a class="button button-secondary" href="${site.mapUrl}" target="_blank" rel="noopener">افتح الموقع ${mapIcon}</a>
          </div>
          <ul class="hero-facts">${site.facts.map((fact) => `<li><strong>${fact.value}</strong><span>${fact.label}</span></li>`).join('')}</ul>
        </div>
        <div class="hero-visual reveal" data-delay="120">
          <div class="hero-photo"><img src="${site.heroImage}" alt="سيارة داخل مركز متخصص في الحماية والعناية" /><div class="visual-caption"><div><strong>${site.visualTitle}</strong><span>${site.visualSubtitle}</span></div><span class="visual-number">01</span></div></div>
          <div class="hero-badge"><div><img src="${site.logo}" alt="" /><small>${site.shortLabel}</small></div></div>
        </div>
      </div>
      <div class="container contact-rail reveal" data-delay="220">
        <a class="contact-card" href="${waHref}" target="_blank" rel="noopener"><span class="contact-icon">${contactIcon}</span><span><small>${site.contactKicker}</small><strong>${site.contactValue}</strong></span><b class="contact-arrow">←</b></a>
        <a class="contact-card" href="${site.mapUrl}" target="_blank" rel="noopener"><span class="contact-icon">${mapIcon}</span><span><small>${site.city}</small><strong>الاتجاهات على الخريطة</strong></span><b class="contact-arrow">←</b></a>
        <a class="contact-card" href="${site.socialUrl}" target="_blank" rel="noopener"><span class="contact-icon">${socialIcon}</span><span><small>${site.socialHandle}</small><strong>${site.socialLabel}</strong></span><b class="contact-arrow">←</b></a>
      </div>
    </section>

    <section class="section services" id="services">
      <div class="container">
        <div class="section-heading reveal"><div><span class="eyebrow">خدمات المركز</span><h2>${site.servicesTitle}</h2></div><p>${site.servicesIntro}</p></div>
        <div class="services-grid">${serviceCards}</div>
        <p class="services-note">تفاصيل الخامات والأسعار والضمانات والتوفر تُؤكد مباشرة مع المركز قبل الحجز.</p>
      </div>
    </section>

    <section class="section story" id="experience">
      <div class="container story-grid">
        <div class="story-media reveal"><img src="${site.detailImage}" alt="تفاصيل تنفيذ خدمة حماية وعناية بالسيارة" /><div class="media-note"><strong>${site.mediaNoteTitle}</strong><span>${site.mediaNoteCopy}</span></div></div>
        <div class="story-copy reveal" data-delay="110"><span class="eyebrow">التفاصيل تصنع النتيجة</span><h2>${site.storyTitle}</h2><p>${site.storyCopy}</p><div class="benefit-list">${benefits}</div></div>
      </div>
    </section>

    <section class="section branches" id="branches">
      <div class="container branches-grid">
        <div class="branches-copy reveal"><span class="eyebrow">الموقع والتواصل</span><h2>${site.branchesTitle}</h2><p>${site.branchesIntro}</p></div>
        <div class="branch-list">${branchCards}</div>
      </div>
    </section>

    <section class="section process">
      <div class="container">
        <div class="section-heading reveal"><div><span class="eyebrow">قبل ما تبدأ</span><h2>من الاستفسار إلى الاستلام.</h2></div><p>خطوات بسيطة تساعدك تحدد الخدمة المناسبة وتؤكد كل التفاصيل قبل تسليم السيارة.</p></div>
        <div class="process-grid reveal">
          <article class="process-step"><strong>01</strong><h3>أرسل بيانات السيارة</h3><p>اذكر الماركة والموديل والخدمة المطلوبة، وأرفق صورًا للحالة عند الحاجة.</p></article>
          <article class="process-step"><strong>02</strong><h3>أكد الباقة والتفاصيل</h3><p>اسأل عن الخامة والضمان والسعر والمدة المتوقعة وموعد الاستلام.</p></article>
          <article class="process-step"><strong>03</strong><h3>احجز موعد التنفيذ</h3><p>اختر الفرع والموعد المناسب ثم أكد تعليمات التسليم والاستلام.</p></article>
        </div>
      </div>
    </section>

    <section class="section faq" id="questions">
      <div class="container faq-grid">
        <div class="faq-copy reveal"><span class="eyebrow">أسئلة مهمة</span><h2>قبل حجز الخدمة.</h2><p>الإجابة النهائية عن الخامات والأسعار والضمانات تأتي من فريق المركز حسب سيارتك والخدمة المختارة.</p></div>
        <div class="accordion reveal" data-delay="90">${faqs}</div>
      </div>
    </section>

    <section class="final-cta">
      <div class="container final-row"><div><span class="eyebrow">ابدأ من هنا</span><h2>${site.ctaTitle}</h2><p>${site.ctaCopy}</p></div><a class="button button-primary" href="${waHref}" target="_blank" rel="noopener">${contactLabel} ${arrowIcon}</a></div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-main">
        <div class="footer-brand"><span class="brand-mark"><img src="${site.logo}" alt="" /></span><span><strong>${site.name}</strong><small>${site.city}</small></span></div>
        <nav class="footer-links" aria-label="روابط الصفحة"><span class="footer-title">روابط سريعة</span><a href="#services">الخدمات</a><a href="#branches">الفروع</a><a href="#questions">الأسئلة</a></nav>
        <div class="footer-sources"><span class="footer-title">القنوات العامة للمركز</span>${sourceLinks}</div>
      </div>
      <p class="footer-note">هذا نموذج تصميم غير رسمي أُعد لأغراض العرض. العلامة والشعار والمعلومات العامة تخص أصحابها، ويجب تأكيد البيانات الحالية مع المركز قبل النشر الرسمي.</p>
    </div>
  </footer>

  <a class="floating-contact" href="${waHref}" target="_blank" rel="noopener" aria-label="${contactLabel}"><span>${contactIcon}</span><b>${contactLabel}</b></a>`;

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
});

document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', () => {
  header?.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .1 });
  revealItems.forEach((item) => {
    item.style.setProperty('--delay', `${item.dataset.delay || 0}ms`);
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('.accordion details').forEach((item) => item.addEventListener('toggle', () => {
  if (!item.open) return;
  document.querySelectorAll('.accordion details').forEach((other) => {
    if (other !== item) other.open = false;
  });
}));

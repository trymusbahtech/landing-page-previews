const body = document.body;
const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 40);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

toggle?.addEventListener("click", () => {
  const open = body.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelector("[data-booking-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name") || "";
  const occasion = form.get("occasion") || "";
  const date = form.get("date") || "غير محدد";
  const guests = form.get("guests") || "غير محدد";
  const notes = form.get("notes") || "لا توجد ملاحظات إضافية";
  const message = [
    "السلام عليكم، أرغب في الاستفسار عن حجز قصر ليوان.",
    `الاسم: ${name}`,
    `نوع المناسبة: ${occasion}`,
    `التاريخ المقترح: ${date}`,
    `عدد الضيوف التقريبي: ${guests}`,
    `ملاحظات: ${notes}`,
  ].join("\n");
  window.open(`https://wa.me/966531080033?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

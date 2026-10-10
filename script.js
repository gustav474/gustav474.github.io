const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.location.hash) {
  document.fonts.ready.then(() => {
    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-header nav a");

const navigationObserver = new IntersectionObserver(
  (entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!current) return;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current.target.id}`,
      );
    });
  },
  { threshold: [0.2, 0.45, 0.7] },
);

sections.forEach((section) => navigationObserver.observe(section));

document.querySelector("[data-print]")?.addEventListener("click", () => window.print());

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const glow = document.querySelector(".cursor-glow");

if (glow && window.matchMedia("(pointer: fine)").matches && !reducedMotion) {
  document.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
  });

  document.addEventListener("pointerleave", () => {
    glow.style.opacity = "0";
  });
}

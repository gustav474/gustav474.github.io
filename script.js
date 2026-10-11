document.querySelector("[data-print]")?.addEventListener("click", () => {
  window.print();
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

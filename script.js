document.addEventListener("DOMContentLoaded", () => {
  // 1. ANIMACIONES DE SCROLL
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));

  // 2. FAQ INTERACTIVO
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      answer.hidden = expanded;
      icon.style.transform = expanded ? "rotate(0deg)" : "rotate(45deg)";
      icon.textContent = expanded ? "+" : "−";
    });
  });

  // 3. AUTO-AÑO FOOTER
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

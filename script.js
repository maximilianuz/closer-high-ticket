document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector(".toggle-theme");

  // 1. TEMA DARK/LIGHT
  const applyTheme = (theme) => {
    body.classList.remove("dark", "light");
    body.classList.add(theme);
    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
    localStorage.setItem("maxi-theme", theme);
  };

  const savedTheme = localStorage.getItem("maxi-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark ? "dark" : "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark") ? "light" : "dark";
      applyTheme(newTheme);
    });
  }

  // 2. SCROLL REVEAL (Animaciones)
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

  // 3. FAQ ACORDEÓN
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

  // 4. AUTO-FECHA FOOTER
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

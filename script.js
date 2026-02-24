document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.querySelector(".toggle-theme");

    // 1. TEMA
    const applyTheme = (theme) => {
        body.className = theme;
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
        localStorage.setItem("maxi-theme", theme);
    };

    const savedTheme = localStorage.getItem("maxi-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        applyTheme(body.className === "dark" ? "light" : "dark");
    });

    // 2. REVEAL (INTERSECTION OBSERVER)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));

    // 3. AÑO DINÁMICO
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

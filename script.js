document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.querySelector(".toggle-theme");

    // TEMA
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

    // REVEAL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));

    // FAQ
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling;
            answer.hidden = !answer.hidden;
            btn.querySelector("span").textContent = answer.hidden ? "+" : "−";
        });
    });

    // AÑO
    document.getElementById('year').textContent = new Date().getFullYear();
});

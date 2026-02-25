const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const elements = document.querySelectorAll(".fade-in");

if (elements.length > 0) {
    elements.forEach(el => observer.observe(el));
}

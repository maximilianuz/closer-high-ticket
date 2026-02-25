// Configuración del observador para animaciones de entrada
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se activa cuando el 15% de la sección es visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Añadimos la clase 'show' para disparar el CSS
            entry.target.classList.add("show");
            // Una vez animado, dejamos de observar para ahorrar recursos
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Seleccionamos todos los elementos con la clase fade-in
const elements = document.querySelectorAll(".fade-in");

// Iniciamos la observación
if (elements.length > 0) {
    elements.forEach(el => observer.observe(el));
}

// Pequeño truco para que el menú cambie de opacidad al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '25px 8%';
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        navbar.style.padding = '40px 8%';
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
    }
});

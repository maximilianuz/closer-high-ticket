const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Observador para Animaciones (Efecto "Slow Reveal")
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const elements = document.querySelectorAll('.fade-in');

if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('show'));
} else {
    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observerRef.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (elements.length > 0) {
        elements.forEach(el => observer.observe(el));
    }
}

// 2. Tracking de Eventos (DataLayer)
const trackEvent = (name, payload = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
};

// 2.1 Tracking automático para elementos con data-track
const trackedElements = document.querySelectorAll('[data-track]');
if (trackedElements.length > 0) {
    trackedElements.forEach(element => {
        element.addEventListener('click', () => {
            trackEvent('cta_click', {
                cta_id: element.dataset.track,
                cta_text: (element.textContent || '').trim(),
                page: window.location.pathname
            });
        });
    });
}

// 3. Navbar Efecto Scroll
const navbar = document.querySelector('.navbar');
let ticking = false;

const updateNavbarOnScroll = () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.padding = '25px 8%';
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        navbar.style.padding = '40px 8%';
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
    }
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateNavbarOnScroll);
});

// 4. Lógica del Formulario (start.html)
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(applicationForm).entries());
        const ticket = Number(formData.ticket || 0);
        const errorMsgBox = document.getElementById('formError');

        if (errorMsgBox) errorMsgBox.style.display = 'none';

        if (ticket < 1000) {
            if (errorMsgBox) {
                errorMsgBox.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="margin-right:8px; color: #d9534f;"></i> <b>Encaje no viable:</b> Para asegurar el rigor y retorno de inversión en este nivel de colaboración, actualmente mi estructura solo permite integrarse con ofertas a partir de USD 1.000.';
                errorMsgBox.style.display = 'block';
            }
            trackEvent('application_rejected', { reason: 'ticket_below_minimum' });
            return;
        }

        localStorage.setItem('applicationData', JSON.stringify(formData));
        localStorage.setItem('applicationCreatedAt', String(Date.now()));
        trackEvent('application_submitted', { niche: formData.nicho || '' });
        window.location.href = 'thanks.html';
    });
}

// 5. Lógica de la página de Confirmación (thanks.html)
const calendlyCta = document.getElementById('calendlyCta');
if (calendlyCta) {
    calendlyCta.addEventListener('click', () => {
        localStorage.setItem('calendlyVisited', 'true');
        trackEvent('calendly_click');
    });
}

const applicationSummary = document.getElementById('applicationSummary');
if (applicationSummary) {
    const rawData = localStorage.getItem('applicationData');
    if (rawData) {
        const data = JSON.parse(rawData);
        const niche = data.nicho ? `Nicho: ${data.nicho}` : '';
        const ticket = data.ticket ? `Ticket: USD ${data.ticket}` : '';
        applicationSummary.textContent = [niche, ticket].filter(Boolean).join(' • ');
    } else {
        applicationSummary.textContent = 'Si no completaste la aplicación, vuelve al inicio para validar encaje.';
    }
}

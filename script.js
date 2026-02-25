const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observerRef.unobserve(entry.target);
        }
    });
}, observerOptions);

const elements = document.querySelectorAll('.fade-in');
if (elements.length > 0) {
    elements.forEach(el => observer.observe(el));
}

const trackEvent = (name, payload = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
};

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.padding = '25px 8%';
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        navbar.style.padding = '40px 8%';
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
    }
});

const trackedCtas = document.querySelectorAll('[data-track]');
trackedCtas.forEach(cta => {
    cta.addEventListener('click', () => {
        trackEvent('cta_click', { cta_id: cta.dataset.track });
    });
});

const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(applicationForm).entries());
        const ticket = Number(formData.ticket || 0);

        if (ticket < 1000) {
            alert('Para esta evaluación estratégica, el ticket mínimo es USD 1.000.');
            trackEvent('application_rejected', { reason: 'ticket_below_minimum' });
            return;
        }

        localStorage.setItem('applicationData', JSON.stringify(formData));
        localStorage.setItem('applicationCreatedAt', String(Date.now()));
        trackEvent('application_submitted', { niche: formData.nicho || '' });
        window.location.href = 'thanks.html';
    });
}

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
        const ticket = data.ticket ? `Ticket actual: USD ${data.ticket}` : '';
        applicationSummary.textContent = [niche, ticket].filter(Boolean).join(' • ');
    } else {
        applicationSummary.textContent = 'Si todavía no completaste la aplicación, volvé al paso anterior para validar encaje.';
    }
}

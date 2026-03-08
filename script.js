document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animaciones Suaves
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 2. Lógica y Validación del Formulario
    const appForm = document.getElementById('applicationForm');
    
    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const ticket = Number(appForm.ticket.value);
            const errorBox = document.getElementById('formError');
            const btn = appForm.querySelector('button');

            // Filtro de Rentabilidad
            if (ticket < 1000) {
                errorBox.innerHTML = `<b>Hablemos con total transparencia:</b> Mi estructura de trabajo como socio comercial funciona únicamente para servicios a partir de USD 1.000 para poder garantizarte rentabilidad. Si aún no estás en ese nivel, prefiero ser honesto y no hacerte perder tiempo.`;
                errorBox.style.display = 'block';
                return;
            }

            errorBox.style.display = 'none';
            btn.innerText = "Procesando información...";
            btn.disabled = true;
            btn.style.opacity = "0.7";

            const formData = new FormData(appForm);

            // Envío a Formspree (Asegurate de que mwvrklll sea tu ID real)
            fetch("https://formspree.io/f/mwvrklll", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    const dataObj = Object.fromEntries(formData.entries());
                    localStorage.setItem('appData', JSON.stringify(dataObj));
                    window.location.href = 'thanks.html';
                } else {
                    btn.innerText = "Error técnico. Intenta nuevamente.";
                    btn.disabled = false;
                    btn.style.opacity = "1";
                }
            })
            .catch(() => {
                btn.innerText = "Validar sintonía y continuar";
                btn.disabled = false;
                btn.style.opacity = "1";
            });
        });
    }

    // 3. Resumen en Calendly
    const summaryBox = document.getElementById('applicationSummary');
    if (summaryBox) {
        const rawData = localStorage.getItem('appData');
        if (rawData) {
            const data = JSON.parse(rawData);
            summaryBox.innerHTML = `Especialidad: ${data.nicho || ''} &mdash; Ticket Actual: USD ${data.ticket || ''}`;
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Efecto Fade-In (Revelado Lento)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 2. Lógica del Formulario (start.html)
    const appForm = document.getElementById('applicationForm');
    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const ticket = Number(appForm.ticket.value);
            const errorBox = document.getElementById('formError');
            const btn = appForm.querySelector('button');

            // --- FILTRO DE SINTONÍA ---
            if (ticket < 1000) {
                errorBox.innerHTML = `<b>Hablemos con honestidad:</b> Mi estructura de trabajo está diseñada para ofertas a partir de USD 1.000. No es por elitismo, sino porque es donde realmente puedo asegurarte un retorno de inversión claro. Si aún no estás ahí, prefiero no hacerte perder tiempo.`;
                errorBox.style.display = 'block';
                return;
            }

            // --- ENVÍO DE DATOS (Formspree) ---
            errorBox.style.display = 'none';
            btn.innerText = "Validando sintonía comercial...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            const formData = new FormData(appForm);

            fetch("https://formspree.io/f/mwvrklll", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    const dataObj = Object.fromEntries(formData.entries());
                    localStorage.setItem('appData', JSON.stringify(dataObj));
                    window.location.href = 'thanks.html';
                } else {
                    btn.innerText = "Error al enviar";
                    btn.disabled = false;
                }
            });
        });
    }

    // 3. Resumen dinámico en thanks.html
    const summaryBox = document.getElementById('applicationSummary');
    if (summaryBox) {
        const rawData = localStorage.getItem('appData');
        if (rawData) {
            const data = JSON.parse(rawData);
            summaryBox.textContent = `Nicho: ${data.nicho || 'No especificado'} • Ticket: USD ${data.ticket || '0'}`;
        }
    }
});

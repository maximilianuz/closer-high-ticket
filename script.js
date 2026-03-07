document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Efecto Fade-In Suave
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 2. Lógica del Formulario de Sintonía (start.html)
    const appForm = document.getElementById('applicationForm');
    
    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const ticket = Number(appForm.ticket.value);
            const errorBox = document.getElementById('formError');
            const btn = appForm.querySelector('button');

            // --- FILTRO DE AUTORIDAD (USD 1.000) ---
            if (ticket < 1000) {
                errorBox.innerHTML = `
                    <i class="fa-solid fa-circle-exclamation" style="margin-right:8px; color:#d9534f;"></i>
                    <b>Hablemos con honestidad:</b> Mi estructura de trabajo actual está diseñada para ofertas a partir de USD 1.000. No es por elitismo, sino porque es donde realmente puedo asegurarte un retorno de inversión claro. Si aún no estás ahí, prefiero no hacerte perder tiempo.
                `;
                errorBox.style.display = 'block';
                errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // --- ENVÍO A FORMSPREE ---
            errorBox.style.display = 'none';
            btn.innerText = "Validando sintonía comercial...";
            btn.style.opacity = "0.6";
            btn.disabled = true;

            const formData = new FormData(appForm);

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
                    btn.innerText = "Error al enviar";
                    btn.disabled = false;
                    btn.style.opacity = "1";
                    alert("Hubo un problema técnico con el servidor. Por favor, intenta de nuevo.");
                }
            })
            .catch(() => {
                alert("Error de conexión. Por favor, revisa tu internet.");
                btn.disabled = false;
                btn.style.opacity = "1";
                btn.innerText = "Validar compatibilidad estratégica";
            });
        });
    }

    // 3. Resumen Dinámico (thanks.html)
    const summaryBox = document.getElementById('applicationSummary');
    if (summaryBox) {
        const rawData = localStorage.getItem('appData');
        if (rawData) {
            const data = JSON.parse(rawData);
            summaryBox.innerHTML = `Aplicación recibida <i class="fa-solid fa-check"></i> <br> Nicho: ${data.nicho || ''} • Ticket actual: USD ${data.ticket || ''}`;
        }
    }
});

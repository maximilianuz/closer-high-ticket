document.addEventListener("DOMContentLoaded", () => {
    
  // --- 1. Lógica de Scroll Reveal (Animaciones) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  // Seleccionamos todos los elementos ocultos
  const elementsToAnimate = document.querySelectorAll('.hidden-element');
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });

  // --- 2. Lógica para Preguntas Frecuentes (FAQ) ---
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems) {
    faqItems.forEach(item => {
      const questionButton = item.querySelector(".faq-question");
      const answerDiv = item.querySelector(".faq-answer");
      const icon = questionButton.querySelector(".faq-icon");

      questionButton.addEventListener("click", () => {
        const isExpanded = questionButton.getAttribute("aria-expanded") === "true";
        
        questionButton.setAttribute("aria-expanded", !isExpanded);
        answerDiv.hidden = isExpanded;
        icon.textContent = isExpanded ? "+" : "−";
        
        // Estilo visual del icono
        icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(45deg)";
      });
    });
  }
});

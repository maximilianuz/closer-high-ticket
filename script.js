document.addEventListener("DOMContentLoaded", () => {
    
  // 1. SCROLL REVEAL (Aparición suave)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.hidden-element');
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });

  // 2. FAQ (Acordeón)
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
        
        // Rotación del icono
        icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(45deg)";
      });
    });
  }

  // 3. AUTO-FECHA FOOTER
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

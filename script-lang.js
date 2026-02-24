// script-lang.js | Redirección inteligente de idioma (Optimizada para GitHub Pages)
(function() {
    const userLang = navigator.language || navigator.userLanguage; 
    const isEnglish = userLang.toLowerCase().startsWith('en');
    const hasBeenRedirected = sessionStorage.getItem('lang-redirected');

    // Usamos .includes() en lugar de coincidencia exacta (===) porque en GitHub Pages 
    // la ruta real incluye la carpeta del repositorio (ej: /closer-high-ticket/index-en.html)
    const isAlreadyOnEnglishPage = window.location.pathname.includes('index-en');

    // Solo redirige si el navegador está en inglés, no ha sido redirigido en esta sesión,
    // y no está actualmente ya parado en la página en inglés.
    if (isEnglish && !hasBeenRedirected && !isAlreadyOnEnglishPage) {
        
        // Marcamos la redirección para permitir que el usuario vuelva al español 
        // manualmente si así lo desea, sin que el script lo vuelva a forzar al inglés.
        sessionStorage.setItem('lang-redirected', 'true');
        window.location.href = 'index-en.html';
    }
})();

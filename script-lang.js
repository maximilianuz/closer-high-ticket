// script-lang.js | Redirección de idioma
(function() {
    const userLang = navigator.language || navigator.userLanguage; 
    const isEnglish = userLang.toLowerCase().startsWith('en');
    const hasBeenRedirected = sessionStorage.getItem('lang-redirected');

    // Solo redirige si el usuario tiene el navegador en inglés, 
    // está en la página en español y no ha sido redirigido antes en esta sesión.
    if (isEnglish && !hasBeenRedirected && window.location.pathname !== '/index-en.html' && window.location.pathname !== '/index-en') {
        sessionStorage.setItem('lang-redirected', 'true');
        window.location.href = 'index-en.html';
    }
})();

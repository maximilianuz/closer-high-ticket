// script-lang.js
(function() {
    const userLang = navigator.language || navigator.userLanguage; 
    const isEnglish = userLang.toLowerCase().startsWith('en');
    const hasBeenRedirected = sessionStorage.getItem('lang-redirected');

    if (isEnglish && !hasBeenRedirected && window.location.pathname !== '/index-en.html' && window.location.pathname !== '/index-en') {
        sessionStorage.setItem('lang-redirected', 'true');
        window.location.href = 'index-en.html';
    }
})();

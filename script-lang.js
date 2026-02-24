(function() {
    const userLang = navigator.language || navigator.userLanguage; 
    const isEnglish = userLang.toLowerCase().startsWith('en');
    const hasBeenRedirected = sessionStorage.getItem('lang-redirected');
    const isOnEnglishPage = window.location.pathname.includes('index-en');

    if (isEnglish && !hasBeenRedirected && !isOnEnglishPage) {
        sessionStorage.setItem('lang-redirected', 'true');
        window.location.href = 'index-en.html';
    }
})();

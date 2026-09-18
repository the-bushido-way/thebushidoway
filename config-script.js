/* ==========================================
   THE BUSHIDO WAY - SCRIPT DE CONFIGURACIÓN
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    inicializarAjustesGlobales();
    inicializarGoogleAuthReal();
});

function inicializarAjustesGlobales() {
    const htmlElement = document.documentElement;
    const themeBtn = document.getElementById('themeToggleBtn');
    const contrastToggle = document.getElementById('contrastToggle');
    const langSelect = document.getElementById('langSelect');

    // Recuperar estados persistidos permanentemente
    const savedTheme = localStorage.getItem('bushido_theme') || 'dark';
    const isHighContrast = localStorage.getItem('bushido_contrast') === 'true';
    const savedLang = localStorage.getItem('bushido_lang') || 'es';

    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    if (isHighContrast) {
        htmlElement.setAttribute('data-contrast', 'high');
        if (contrastToggle) contrastToggle.checked = true;
    }

    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => {
            localStorage.setItem('bushido_lang', e.target.value);
            location.reload();
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let currentTheme = htmlElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('bushido_theme', newTheme);
            themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        });
    }

    if (contrastToggle) {
        contrastToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                htmlElement.setAttribute('data-contrast', 'high');
                localStorage.setItem('bushido_contrast', 'true');
            } else {
                htmlElement.removeAttribute('data-contrast');
                localStorage.setItem('bushido_contrast', 'false');
            }
        });
    }
}

function inicializarGoogleAuthReal() {
    const googleBtn = document.getElementById('googleLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const usuarioGuardado = localStorage.getItem('bushido_google_user');
    actualizarInterfazUsuario(usuarioGuardado ? JSON.parse(usuarioGuardado) : null);

    if (window.google && window.google.accounts) {
        configurarClienteGoogle();
    } else {
        window.addEventListener('load', () => {
            if (window.google && window.google.accounts) configurarClienteGoogle();
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            if (window.tokenClient) window.tokenClient.requestAccessToken();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('bushido_google_user');
            localStorage.setItem('bushido_google_logged', 'false');
            actualizarInterfazUsuario(null);
        });
    }
}

function configurarClienteGoogle() {
    const CLIENT_ID = '345741995794-71jf37bduotlhd5fco01mvvptm8s0th0.apps.googleusercontent.com';
    try {
        window.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: 'profile email',
            callback: (response) => {
                if (response && response.access_token) obtenerDatosPerfilGoogle(response.access_token);
            },
        });
    } catch (e) {
        console.error("Error al inicializar Google Client:", e);
    }
}

function obtenerDatosPerfilGoogle(accessToken) {
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        const userData = { name: data.name, email: data.email, picture: data.picture };
        localStorage.setItem('bushido_google_user', JSON.stringify(userData));
        localStorage.setItem('bushido_google_logged', 'true');
        actualizarInterfazUsuario(userData);
    })
    .catch(error => console.error("Error al obtener perfil de Google:", error));
}

function actualizarInterfazUsuario(user) {
    const googleBtn = document.getElementById('googleLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (user) {
        if (googleBtn) googleBtn.style.display = 'none';
        if (logoutBtn) {
            logoutBtn.style.display = 'flex';
            logoutBtn.innerHTML = `🚪 Cerrar Sesión (${user.name})`;
        }
    } else {
        if (googleBtn) googleBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

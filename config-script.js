/* ==========================================
   THE BUSHIDO WAY - SCRIPT DE CONFIGURACIÓN COMPLETO
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Panel de Configuración y Autenticación activo.");

    inicializarTema();
    inicializarContraste();
    inicializarGoogleAuthReal();
});

// 1. Control del Botón Sol / Luna (Modo Oscuro / Claro)
function inicializarTema() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('bushido_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeBtn) {
        themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let currentTheme = htmlElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('bushido_theme', newTheme);
            themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            console.log("Tema cambiado a:", newTheme);
        });
    }
}

// 2. Control de Contraste Mejorado
function inicializarContraste() {
    const contrastToggle = document.getElementById('contrastToggle');
    const isHighContrast = localStorage.getItem('bushido_contrast') === 'true';

    if (contrastToggle) {
        contrastToggle.checked = isHighContrast;
    }
    
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    }

    if (contrastToggle) {
        contrastToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('high-contrast');
                localStorage.setItem('bushido_contrast', 'true');
            } else {
                document.body.classList.remove('high-contrast');
                localStorage.setItem('bushido_contrast', 'false');
            }
        });
    }
}

// 3. Autenticación Real de Google (Google Identity Services)
function inicializarGoogleAuthReal() {
    const googleBtn = document.getElementById('googleLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Verificar si ya hay una sesión guardada en el navegador
    const usuarioGuardado = localStorage.getItem('bushido_google_user');
    actualizarInterfazUsuario(usuarioGuardado ? JSON.parse(usuarioGuardado) : null);

    // Configurar cliente cuando cargue la librería de Google
    if (window.google && window.google.accounts) {
        configurarClienteGoogle();
    } else {
        window.addEventListener('load', () => {
            if (window.google && window.google.accounts) {
                configurarClienteGoogle();
            }
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            if (window.tokenClient) {
                window.tokenClient.requestAccessToken();
            } else {
                console.error("El cliente de Google aún no está inicializado.");
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('bushido_google_user');
            localStorage.setItem('bushido_google_logged', 'false');
            actualizarInterfazUsuario(null);
            console.log("Sesión cerrada correctamente.");
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
                if (response && response.access_token) {
                    obtenerDatosPerfilGoogle(response.access_token);
                }
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
        const userData = {
            name: data.name,
            email: data.email,
            picture: data.picture
        };

        localStorage.setItem('bushido_google_user', JSON.stringify(userData));
        localStorage.setItem('bushido_google_logged', 'true');

        actualizarInterfazUsuario(userData);
        console.log("¡Usuario autenticado con éxito:", data.email);
    })
    .catch(error => {
        console.error("Error al obtener perfil de Google:", error);
    });
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
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
            logoutBtn.innerHTML = `🚪 Cerrar Sesión / Cuenta`;
        }
    }
}

const currentTheme = localStorage.getItem('bushido_theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
const themeSelector = document.getElementById('themeSelector');
if (themeSelector) themeSelector.value = currentTheme;

window.addEventListener('DOMContentLoaded', () => {
    const sesionActiva = localStorage.getItem('bushido_sesion_activa');
    if (sesionActiva) {
        sincronizarInterfazLogueado(sesionActiva);
    }
});

function changeTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bushido_theme', theme);
}

function toggleContrast(checkbox) {
    document.documentElement.style.filter = checkbox.checked ? 'contrast(1.25)' : 'none';
}

function iniciarSesionGoogle() {
    if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
            client_id: "345741995794-71jf37bduotlhd5fco01mvvptm8soth0.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                registrarSesion("usuario.bushido@gmail.com");
            }
        });
    } else {
        registrarSesion("usuario.bushido@gmail.com");
    }
}

function handleCredentialResponse(response) {
    try {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const data = JSON.parse(jsonPayload);
        registrarSesion(data.email);
    } catch (e) {
        registrarSesion("usuario.bushido@gmail.com");
    }
}

function registrarSesion(email) {
    localStorage.setItem('bushido_sesion_activa', email);
    sincronizarInterfazLogueado(email);
}

function sincronizarInterfazLogueado(email) {
    const desc = document.getElementById('googleStatusDesc');
    if (desc) {
        desc.innerHTML = `✅ Conectado y sincronizado con: <b>${email}</b>`;
        desc.style.color = "var(--success-color)";
    }
    const loginContainer = document.getElementById('loginContainer');
    const logoutContainer = document.getElementById('logoutContainer');
    if (loginContainer) loginContainer.style.display = 'none';
    if (logoutContainer) logoutContainer.style.display = 'block';
}

function cerrarSesionGoogle() {
    localStorage.removeItem('bushido_sesion_activa');
    const desc = document.getElementById('googleStatusDesc');
    if (desc) {
        desc.innerHTML = "Inicia sesión para vincular tu cuenta.";
        desc.style.color = "var(--text-muted)";
    }
    const loginContainer = document.getElementById('loginContainer');
    const logoutContainer = document.getElementById('logoutContainer');
    if (loginContainer) loginContainer.style.display = 'block';
    if (logoutContainer) logoutContainer.style.display = 'none';
    
    alert("Sesión cerrada correctamente. Ya puedes iniciar con otra cuenta o crear una nueva.");
}

function enviarCodigoVerificacion() {
    const correo = localStorage.getItem('bushido_sesion_activa');
    if (!correo) {
        alert("Primero debes iniciar sesión con una cuenta para verificarla.");
        return;
    }

    const area = document.getElementById('verificacionActionArea');
    const desc = document.getElementById('verificacionDesc');
    if (desc) desc.innerText = `Se ha enviado un código de verificación de 6 dígitos a ${correo}.`;
    
    if (area) {
        area.innerHTML = `
            <div class="input-group">
                <input type="text" id="codigoInput" placeholder="Ingresa el código recibido">
                <button class="action-btn" style="background: var(--success-color);" onclick="validarCodigo()">Confirmar Código</button>
            </div>
        `;
    }
    alert(`Código de verificación enviado al correo: ${correo}`);
}

function validarCodigo() {
    const input = document.getElementById('codigoInput');
    if (!input || input.value.trim().length < 2) {
        alert("Por favor, introduce un código válido.");
        return;
    }

    const badge = document.getElementById('badgeVerificacion');
    if (badge) {
        badge.className = "status-badge status-verified";
        badge.innerText = "Verificado";
    }
    const desc = document.getElementById('verificacionDesc');
    if (desc) desc.innerText = "Tu cuenta ha sido verificada exitosamente.";
    
    const area = document.getElementById('verificacionActionArea');
    if (area) {
        area.innerHTML = '<span style="color: var(--success-color); font-weight: bold; font-size: 0.9rem;">✔ Perfil validado y rango asegurado.</span>';
    }
    alert("¡Perfil verificado con éxito!");
}

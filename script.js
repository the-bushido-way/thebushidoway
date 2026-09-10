// Inicializar EmailJS con tu Public Key proporcionada
emailjs.init("hp4sxfA8XihAxLGuH");

let currentEmail = "";
let generatedCode = "";

// Referencias a elementos del DOM
const authSection = document.getElementById("auth-section");
const verifySection = document.getElementById("verify-section");
const mainPanel = document.getElementById("main-panel");
const userMenu = document.getElementById("user-menu");
const userEmailDisplay = document.getElementById("user-email-display");
const targetEmailSpan = document.getElementById("target-email");
const verificationCodeInput = document.getElementById("verification-code-input");
const btnVerifyCode = document.getElementById("btn-verify-code");
const profileMenuBtn = document.getElementById("profile-menu-btn");
const dropdownContent = document.getElementById("dropdown-content");
const btnChangeAccount = document.getElementById("btn-change-account");
const btnLogout = document.getElementById("btn-logout");

// Comprobar si ya existe una sesión verificada al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const verifiedUser = localStorage.getItem("bushido_verified_user");
    if (verifiedUser) {
        activarPanelPrincipal(verifiedUser);
    }
});

// Callback de Google Identity Services
function handleGoogleSignIn(response) {
    try {
        const payload = parseJwt(response.credential);
        currentEmail = payload.email;

        // Verificar si este correo ya cuenta con sesión validada previamente en este equipo
        const verifiedUser = localStorage.getItem("bushido_verified_user");
        if (verifiedUser === currentEmail) {
            activarPanelPrincipal(currentEmail);
            return;
        }

        // Si es un usuario nuevo o diferente, generar código y solicitar verificación
        generarYEnviarCodigo(currentEmail);
    } catch (error) {
        console.error("Error al procesar el token de Google:", error);
    }
}

// Decodificador seguro para el JWT de Google
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Generar código de 6 dígitos y enviarlo mediante EmailJS
function generarYEnviarCodigo(email) {
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const templateParams = {
        email: email,
        code: generatedCode
    };

    emailjs.send("service_bushido", "template_qpeu2ti", templateParams)
        .then(() => {
            authSection.classList.add("hidden");
            verifySection.classList.remove("hidden");
            targetEmailSpan.textContent = email;
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
            alert("No se pudo enviar el correo de verificación. Inténtalo nuevamente.");
        });
}

// Validar código ingresado por el usuario
btnVerifyCode.addEventListener("click", () => {
    const userInput = verificationCodeInput.value.trim();
    if (userInput === generatedCode) {
        localStorage.setItem("bushido_verified_user", currentEmail);
        verifySection.classList.add("hidden");
        activarPanelPrincipal(currentEmail);
    } else {
        alert("Código incorrecto. Verifica los dígitos enviados a tu correo.");
    }
});

// Desbloquear interfaz principal tras la verificación exitosa
function activarPanelPrincipal(email) {
    authSection.classList.add("hidden");
    verifySection.classList.add("hidden");
    mainPanel.classList.remove("hidden");
    userMenu.classList.remove("hidden");
    userEmailDisplay.textContent = email;
}

// Control del menú desplegable de perfil
profileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle("hidden");
});

window.addEventListener("click", () => {
    if (!dropdownContent.classList.contains("hidden")) {
        dropdownContent.classList.add("hidden");
    }
});

// Cerrar Sesión
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("bushido_verified_user");
    location.reload();
});

// Cambiar Cuenta
btnChangeAccount.addEventListener("click", () => {
    localStorage.removeItem("bushido_verified_user");
    location.reload();
});

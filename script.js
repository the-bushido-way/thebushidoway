emailjs.init("hp4sxfA8XihAxLGuH");

let currentEmail = "";
let generatedCode = "";

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
const btnBackToHome = document.getElementById("btn-back-to-home");
const btnBackFromVerify = document.getElementById("btn-back-from-verify");

window.addEventListener("DOMContentLoaded", () => {
    // Persistencia inteligente: si el dispositivo ya fue verificado previamente, entra directo sin pedir código
    const recognizedDeviceUser = localStorage.getItem("bushido_recognized_device_user");
    if (recognizedDeviceUser) {
        activarPanelPrincipal(recognizedDeviceUser);
    }
});

function handleGoogleSignIn(response) {
    try {
        const payload = parseJwt(response.credential);
        currentEmail = payload.email;

        // Comprobamos si este dispositivo ya reconoció esta cuenta exacta
        const recognizedDeviceUser = localStorage.getItem("bushido_recognized_device_user");
        if (recognizedDeviceUser === currentEmail) {
            activarPanelPrincipal(currentEmail);
            return;
        }

        // Si es un dispositivo nuevo o primera vez, enviamos el código de seguridad por EmailJS
        generarYEnviarCodigo(currentEmail);
    } catch (error) {
        console.error("Error al procesar el token de Google:", error);
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

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

btnVerifyCode.addEventListener("click", () => {
    const userInput = verificationCodeInput.value.trim();
    if (userInput === generatedCode) {
        // Guardar automáticamente como dispositivo reconocido para no volver a pedir código en este equipo
        localStorage.setItem("bushido_recognized_device_user", currentEmail);
        verifySection.classList.add("hidden");
        activarPanelPrincipal(currentEmail);
    } else {
        alert("Código incorrecto. Verifica los 6 dígitos enviados a tu correo.");
    }
});

// Funcionalidad del botón Back
btnBackToHome.addEventListener("click", () => {
    authSection.classList.add("hidden");
    // Si quisieras volver a una landing o recargar el estado inicial limpio
    location.reload();
});

btnBackFromVerify.addEventListener("click", () => {
    verifySection.classList.add("hidden");
    authSection.classList.remove("hidden");
    verificationCodeInput.value = "";
});

function activarPanelPrincipal(email) {
    authSection.classList.add("hidden");
    verifySection.classList.add("hidden");
    mainPanel.classList.remove("hidden");
    userMenu.classList.remove("hidden");
    userEmailDisplay.textContent = email;
}

profileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = dropdownContent.classList.toggle("hidden");
    profileMenuBtn.setAttribute("aria-expanded", !isHidden);
});

window.addEventListener("click", () => {
    if (!dropdownContent.classList.contains("hidden")) {
        dropdownContent.classList.add("hidden");
        profileMenuBtn.setAttribute("aria-expanded", "false");
    }
});

// Cerrar sesión / Cambiar cuenta limpia el registro del dispositivo reconocido
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("bushido_recognized_device_user");
    location.reload();
});

btnChangeAccount.addEventListener("click", () => {
    localStorage.removeItem("bushido_recognized_device_user");
    location.reload();
});

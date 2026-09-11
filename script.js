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

window.addEventListener("DOMContentLoaded", () => {
    const verifiedUser = localStorage.getItem("bushido_verified_user");
    if (verifiedUser) {
        activarPanelPrincipal(verifiedUser);
    }
});

function handleGoogleSignIn(response) {
    try {
        const payload = parseJwt(response.credential);
        currentEmail = payload.email;

        const verifiedUser = localStorage.getItem("bushido_verified_user");
        if (verifiedUser === currentEmail) {
            activarPanelPrincipal(currentEmail);
            return;
        }

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
        localStorage.setItem("bushido_verified_user", currentEmail);
        verifySection.classList.add("hidden");
        activarPanelPrincipal(currentEmail);
    } else {
        alert("Código incorrecto. Verifica los dígitos enviados a tu correo.");
    }
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

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("bushido_verified_user");
    location.reload();
});

btnChangeAccount.addEventListener("click", () => {
    localStorage.removeItem("bushido_verified_user");
    location.reload();
});
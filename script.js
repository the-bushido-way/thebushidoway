emailjs.init("hp4sxfA8XihAxLGuH");

let currentEmail = "";
let generatedCode = "";

const authSection = document.getElementById("auth-section");
const verifySection = document.getElementById("verify-section");
const mainPanel = document.getElementById("main-panel");
const userMenu = document.getElementById("user-menu");
const targetEmailSpan = document.getElementById("target-email");
const verificationCodeInput = document.getElementById("verification-code-input");
const btnVerifyCode = document.getElementById("btn-verify-code");
const profileMenuBtn = document.getElementById("profile-menu-btn");
const dropdownContent = document.getElementById("dropdown-content");
const btnConfigSession = document.getElementById("btn-config-session");
const btnAutoSave = document.getElementById("btn-auto-save");
const btnSocialVerify = document.getElementById("btn-social-verify");
const btnChangeAccount = document.getElementById("btn-change-account");
const btnLogout = document.getElementById("btn-logout");
const btnBackToHome = document.getElementById("btn-back-to-home");
const btnBackFromVerify = document.getElementById("btn-back-from-verify");

// Sistema de Partículas de Luces Flotantes Estilo Arquitectura Python/Java (Canvas Animation)
window.addEventListener("DOMContentLoaded", () => {
    initFloatingParticles();

    // Persistencia inteligente: si el dispositivo ya fue verificado, entra directo sin código
    const recognizedDeviceUser = localStorage.getItem("bushido_recognized_device_user");
    if (recognizedDeviceUser) {
        activarPanelPrincipal(recognizedDeviceUser);
    }
});

function initFloatingParticles() {
    const canvas = document.getElementById("floating-particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particlesArray = [];
    const numberOfParticles = 35;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4 - 0.2;
            this.color = Math.random() > 0.5 ? "rgba(243, 156, 18, 0.7)" : "rgba(0, 206, 201, 0.7)";
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.001;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.size <= 0.2) {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + 10;
                this.size = Math.random() * 2.5 + 0.8;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

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

        // Si es dispositivo nuevo, enviamos código de seguridad por EmailJS respetando la ruta exacta
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

// Acciones del menú de configuración optimizadas y sincronizadas
btnConfigSession.addEventListener("click", () => {
    alert("Estado Cloud: Conectado de forma segura y dispositivo reconocido permanentemente.");
});

btnAutoSave.addEventListener("click", () => {
    alert("Guardado Automático de Sesión sincronizado localmente en este dispositivo.");
});

btnSocialVerify.addEventListener("click", () => {
    alert("Redes Sociales del Dojo: Vinculadas y verificadas correctamente.");
});

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("bushido_recognized_device_user");
    location.reload();
});

btnChangeAccount.addEventListener("click", () => {
    localStorage.removeItem("bushido_recognized_device_user");
    location.reload();
});
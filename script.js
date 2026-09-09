function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

class BushidoApp {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('bushido_user')) || null;
        this.initElements();
        this.render();
    }

    initElements() {
        this.loginPanel = document.getElementById('login-panel');
        this.sessionPanel = document.getElementById('session-panel');
        this.statusBadge = document.getElementById('auth-status-badge');
        this.emailDisplay = document.getElementById('user-email-display');
        this.navGrid = document.getElementById('dojo-nav-grid');
        this.verificationGroup = document.getElementById('verification-group');

        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        document.getElementById('verify-code-btn').addEventListener('click', () => this.verifyCode());
    }

    setUserData(email) {
        this.user = { email: email, verified: false };
        localStorage.setItem('bushido_user', JSON.stringify(this.user));
        showToast('Autenticación con Google completada correctamente.', 'success');
        
        setTimeout(() => {
            showToast(`Código de verificación enviado a: ${email}`, 'info');
        }, 800);

        this.render();
    }

    logout() {
        this.user = null;
        localStorage.removeItem('bushido_user');
        showToast('Sesión cerrada correctamente.', 'info');
        this.render();
    }

    verifyCode() {
        const input = document.getElementById('verification-code-input').value.trim();
        if (input.length === 6) {
            this.user.verified = true;
            localStorage.setItem('bushido_user', JSON.stringify(this.user));
            showToast('¡Perfil verificado correctamente!', 'success');
            this.render();
        } else {
            showToast('El código debe contener exactamente 6 dígitos.', 'error');
        }
    }

    render() {
        if (this.user) {
            this.loginPanel.style.display = 'none';
            this.sessionPanel.style.display = 'block';
            this.emailDisplay.textContent = `Conectado como: ${this.user.email}`;

            if (this.user.verified) {
                this.statusBadge.textContent = 'Verificado';
                this.statusBadge.className = 'status-badge verified';
                this.verificationGroup.style.display = 'none';
                this.navGrid.classList.remove('disabled-nav');
            } else {
                this.statusBadge.textContent = 'No Verificado';
                this.statusBadge.className = 'status-badge unverified';
                this.verificationGroup.style.display = 'flex';
                this.navGrid.classList.add('disabled-nav');
            }
        } else {
            this.loginPanel.style.display = 'block';
            this.sessionPanel.style.display = 'none';
            this.statusBadge.textContent = 'No Verificado';
            this.statusBadge.className = 'status-badge unverified';
            this.navGrid.classList.add('disabled-nav');
        }
    }
}

let appInstance;

window.handleCredentialResponse = function(response) {
    const responsePayload = parseJwt(response.credential);
    if (responsePayload && responsePayload.email) {
        if (appInstance) {
            appInstance.setUserData(responsePayload.email);
        }
    } else {
        showToast('Error al procesar las credenciales de Google.', 'error');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    appInstance = new BushidoApp();
});

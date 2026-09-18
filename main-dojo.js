/* ==========================================
   THE BUSHIDO WAY - SCRIPT PRINCIPAL DEL DOJO
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    sincronizarAjustesGlobalesMenu();
    generarParticulasGalaxia();
    verificarTraduccionesInterfaz();
});

function sincronizarAjustesGlobalesMenu() {
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('bushido_theme') || 'dark';
    const isHighContrast = localStorage.getItem('bushido_contrast') === 'true';

    htmlElement.setAttribute('data-theme', savedTheme);
    if (isHighContrast) {
        htmlElement.setAttribute('data-contrast', 'high');
    } else {
        htmlElement.removeAttribute('data-contrast');
    }
}

function generarParticulasGalaxia() {
    const contenedor = document.getElementById('galaxyParticles');
    if (!contenedor) return;

    const numeroEstrellas = 25;
    for (let i = 0; i < numeroEstrellas; i++) {
        const estrella = document.createElement('div');
        estrella.className = 'galaxy-star';
        
        const tamaño = Math.random() * 3 + 1;
        estrella.style.width = `${tamaño}px`;
        estrella.style.height = `${tamaño}px`;
        estrella.style.left = `${Math.random() * 100}%`;
        estrella.style.animationDuration = `${Math.random() * 2 + 2}s`;
        estrella.style.animationDelay = `${Math.random() * 3}s`;

        contenedor.appendChild(estrella);
    }
}

function verificarTraduccionesInterfaz() {
    const idiomaActual = localStorage.getItem('bushido_lang') || 'es';
    const welcomeText = document.getElementById('welcomeMessageText');

    if (welcomeText) {
        if (idiomaActual === 'en') {
            welcomeText.textContent = `"True combat begins in the stillness of the mind. Welcome back to the path of discipline, Sensei."`;
        } else {
            welcomeText.textContent = `"El verdadero combate comienza en la quietud de la mente. Bienvenido de nuevo al sendero de la disciplina, Sensei."`;
        }
    }
}

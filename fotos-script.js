/* ==========================================
   THE BUSHIDO WAY - SCRIPT DE GALERÍA DE FOTOS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    sincronizarTemaGaleria();
});

function sincronizarTemaGaleria() {
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

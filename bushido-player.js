// bushido-player.js
// Lógica principal para reproducir los efectos de entrada a pantalla completa

(function() {
    function initBushidoEffects() {
        const config = window.BushidoConfig;
        if (!config) {
            console.error('No se encontró la configuración de Bushido.');
            return;
        }

        // Obtener el rango del usuario (simulado por ahora con el fallback)
        const userRank = 'novato'; 
        const effectKey = config.userRanks[userRank] || config.settings.fallbackEffect;
        const effectData = config.effects[effectKey];

        if (!effectData) return;

        // Crear contenedor overlay a pantalla completa
        const overlay = document.createElement('div');
        overlay.id = config.settings.containerId;
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.zIndex = '99999';
        overlay.style.backgroundColor = '#000';
        overlay.style.overflow = 'hidden';

        // Crear elemento de video optimizado
        const video = document.createElement('video');
        video.src = `assets/clips/${effectData.file}`;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.autoplay = config.settings.autoPlay;
        video.muted = config.settings.muted;
        video.playsInline = true;

        // Limpiar overlay cuando termine el video
        video.onended = function() {
            overlay.remove();
        };

        // Si hay algún error cargando el archivo, remover para no bloquear la web
        video.onerror = function() {
            console.error('Error al reproducir el efecto cinemático.');
            overlay.remove();
        };

        overlay.appendChild(video);
        document.body.appendChild(overlay);
        
        video.play().catch(e => {
            console.log('Reproducción automática bloqueada por el navegador:', e);
            overlay.remove();
        });
    }

    // Ejecutar cuando cargue el DOM de tu página
    document.addEventListener('DOMContentLoaded', initBushidoEffects);
})();

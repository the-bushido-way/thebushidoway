// bushido-effects-config.js
// Configuración de efectos de entrada épicos para The Bushido Way

const bushidoEffectsConfig = {
    settings: {
        containerId: 'bushido-overlay-player',
        fallbackEffect: 'plasma_supremo',
        autoPlay: true,
        muted: true
    },

    effects: {
        'plasma_supremo': {
            name: 'Plasma Supremo',
            file: 'plasma_supremo.mp4',
            category: 'Heroico / Energía Pura',
            description: 'Descarga de rayos de plasma arcano para rangos VIP de alta categoría.'
        }
    },

    userRanks: {
        'novato': 'plasma_supremo',
        'vip': 'plasma_supremo',
        'leyenda': 'plasma_supremo'
    }
};

window.BushidoConfig = bushidoEffectsConfig;

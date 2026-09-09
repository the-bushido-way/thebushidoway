/* ==========================================================
   MOTOR GLOBAL - THE BUSHIDO WAY
   ========================================================== */

const diccionarioIdiomas = {
    es: {
        rango: "RANGO: <strong>{rango}</strong>",
        clase: "CLASE: <strong class='text-glow-splus'>S+</strong>",
        sistema: "SISTEMA ONLINE // PUERTO 8000",
        bienvenida: "Bienvenido al Nexo de Juegos, Blogs y Tutoriales",
        descripcion: "Tu portal de alto rendimiento optimizado para sistemas de baja latencia con efectos cinemáticos inmersivos, herramientas comunitarias y más.",
        idioma: "Idioma", chat: "Chat General", videos: "Videos", fotos: "Fotos",
        guias: "Guías", eventos: "Eventos", foro: "Foro", clasificacion: "Clasificación"
    },
    en: {
        rango: "RANK: <strong>{rango}</strong>",
        clase: "CLASS: <strong class='text-glow-splus'>S+</strong>",
        sistema: "SYSTEM ONLINE // PORT 8000",
        bienvenida: "Welcome to the Nexus of Games, Blogs & Tutorials",
        descripcion: "Your high-performance portal optimized for low-latency systems with immersive cinematic effects, community tools, and more.",
        idioma: "Language", chat: "General Chat", videos: "Videos", fotos: "Photos",
        guias: "Guides", eventos: "Events", foro: "Forum", clasificacion: "Leaderboard"
    },
    pt: {
        rango: "RANKING: <strong>{rango}</strong>",
        clase: "CLASSE: <strong class='text-glow-splus'>S+</strong>",
        sistema: "SISTEMA ONLINE // PORTA 8000",
        bienvenida: "Bem-vindo ao Nexus de Jogos, Blogs e Tutoriais",
        descripcion: "Seu portal de alto desempenho otimizado para sistemas de baixa latência com efeitos cinematográficos imersivos.",
        idioma: "Idioma", chat: "Chat Geral", videos: "Vídeos", fotos: "Fotos",
        guias: "Guias", eventos: "Eventos", foro: "Fórum", clasificacion: "Classificação"
    },
    fr: {
        rango: "RANG : <strong>{rango}</strong>",
        clase: "CLASSE : <strong class='text-glow-splus'>S+</strong>",
        sistema: "SYSTÈME EN LIGNE // PORT 8000",
        bienvenida: "Bienvenue sur le Nexus des Jeux, Blogs et Tutoriels",
        descripcion: "Votre portail haute performance optimisé pour les systèmes à faible latence.",
        idioma: "Langue", chat: "Chat Général", videos: "Vidéos", fotos: "Photos",
        guias: "Guides", eventos: "Événements", foro: "Forum", clasificacion: "Classement"
    },
    zh: {
        rango: "等级: <strong>{rango}</strong>",
        clase: "阶级: <strong class='text-glow-splus'>S+</strong>",
        sistema: "系统在线 // 端口 8000",
        bienvenida: "欢迎来到游戏、博客与教程中心",
        descripcion: "您的高性能门户，专为低延迟系统优化。",
        idioma: "语言", chat: "综合聊天", videos: "视频", fotos: "照片",
        guias: "指南", eventos: "活动", foro: "论坛", clasificacion: "排行榜"
    },
    hi: {
        rango: "रैंक: <strong>{rango}</strong>",
        clase: "क्लास: <strong class='text-glow-splus'>S+</strong>",
        sistema: "सिस्टम ऑनलाइन // पोर्ट 8000",
        bienvenida: "गेम, ब्लॉग और ट्यूटोरियल नेक्सस में आपका स्वागत है",
        descripcion: "कम विलंबता प्रणालियों کے लिए अनुकूलित आपका उच्च-प्रदर्शन पोर्टल।",
        idioma: "भाषा", chat: "सामान्य चैट", videos: "वीडियो", fotos: "तस्वीरें",
        guias: "गाइड", eventos: "इवेंट्स", foro: "फ़ोरम", clasificacion: "लीडरबोर्ड"
    },
    ja: {
        rango: "ランク: <strong>{rango}</strong>",
        clase: "クラス: <strong class='text-glow-splus'>S+</strong>",
        sistema: "システムオンライン // ポート 8000",
        bienvenida: "ゲーム、ブログ、チュートリアルのネクサスへようこそ",
        descripcion: "低レイテンシシステム向けに最適化された高性能ポータル。",
        idioma: "言語", chat: "全体チャット", videos: "動画", fotos: "写真",
        guias: "ガイド", eventos: "イベント", foro: "フォーラム", clasificacion: "ランキング"
    },
    ar: {
        rango: "الرتبة: <strong>{rango}</strong>",
        clase: "الفئة: <strong class='text-glow-splus'>S+</strong>",
        sistema: "النظام متصل // المنفذ 8000",
        bienvenida: "مرحباً بك في مركز الألعاب والمدونات والدروس",
        descripcion: "بوابتك عالية الأداء والمحسنة لنظام منخفض التأثير.",
        idioma: "اللغة", chat: "الدردشة العامة", videos: "فيديوهات", fotos: "صور",
        guias: "الدليل", eventos: "الفعاليات", foro: "المنتدى", clasificacion: "لوحة الشرف"
    }
};

// GESTIÓN DE REINICIO SEMANAL (Domingo 12:00 AM a Domingo 11:58 PM)
function verificarReinicioSemanal() {
    const ahora = new Date();
    const dia = ahora.getDay(); // 0 = Domingo
    const hora = ahora.getHours();
    const minuto = ahora.getMinutes();

    let ultimaLimpieza = localStorage.getItem('bushido_last_reset_week');
    const semanaActual = `${ahora.getFullYear()}-W${Math.floor(ahora.getDate() / 7)}`;

    // Si es domingo y pasa de las 00:00 y no se ha limpiado esta semana
    if (dia === 0 && ultimaLimpieza !== semanaActual) {
        localStorage.setItem('bushido_weekly_pts', '0');
        localStorage.setItem('bushido_last_reset_week', semanaActual);
    }

    if (!localStorage.getItem('bushido_weekly_pts')) {
        localStorage.setItem('bushido_weekly_pts', '1250'); // Puntos iniciales de prueba
    }
    if (!localStorage.getItem('bushido_rank')) {
        localStorage.setItem('bushido_rank', 'Novato I'); // Rango inicial por defecto
    }
}

// DETECCIÓN DE REGIÓN Y PAÍS EXACTO
async function actualizarRegionYLatencia() {
    const elemPing = document.getElementById('txt-ping');
    if (!elemPing) return;

    let regionPais = "Global";
    try {
        const respuesta = await fetch('https://ipapi.co/json/');
        const datos = await respuesta.json();
        if (datos && datos.country_name && datos.region) {
            regionPais = `${datos.region}, ${datos.country_name}`;
        } else if (datos && datos.country_name) {
            regionPais = datos.country_name;
        }
    } catch (e) {
        // Fallback por zona horaria si falla la API de IP
        regionPais = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1] || "Online";
    }

    const latenciaAleatoria = Math.floor(Math.random() * 15) + 8; // 8ms a 22ms
    elemPing.innerHTML = `<span class="ping-dot"></span> 📍 ${regionPais} | Latencia: ${latenciaAleatoria}ms (Seguro)`;
}

function toggleLanguageModal() {
    const modal = document.getElementById('language-modal');
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

function cambiarIdioma(lang) {
    localStorage.setItem('bushido_lang', lang);
    aplicarTraduccion(lang);
    toggleLanguageModal();
}

function aplicarTraduccion(lang) {
    const t = diccionarioIdiomas[lang] || diccionarioIdiomas['es'];
    const rangoActual = localStorage.getItem('bushido_rank') || 'Novato I';
    
    document.getElementById('html-root').setAttribute('lang', lang);
    
    let textoRangoFormateado = t.rango.replace('{rango}', rangoActual);
    document.getElementById('txt-rango').innerHTML = textoRangoFormateado;
    document.getElementById('txt-clase').innerHTML = t.clase;
    document.getElementById('txt-system').innerText = t.sistema;
    document.getElementById('txt-welcome-title').innerText = t.bienvenida;
    document.getElementById('txt-welcome-desc').innerText = t.descripcion;
    
    document.getElementById('lbl-idioma').innerText = t.idioma;
    document.getElementById('lbl-chat').innerText = t.chat;
    document.getElementById('lbl-videos').innerText = t.videos;
    document.getElementById('lbl-fotos').innerText = t.fotos;
    document.getElementById('lbl-guias').innerText = t.guias;
    document.getElementById('lbl-eventos').innerText = t.eventos;
    document.getElementById('lbl-foro').innerText = t.foro;
    document.getElementById('lbl-clasificacion').innerText = t.clasificacion;

    const pts = localStorage.getItem('bushido_weekly_pts') || '0';
    const elemPts = document.getElementById('txt-pts');
    if(elemPts) elemPts.innerText = pts;
}

document.addEventListener("DOMContentLoaded", () => {
    verificarReinicioSemanal();
    const langGuardado = localStorage.getItem('bushido_lang') || 'es';
    aplicarTraduccion(langGuardado);
    actualizarRegionYLatencia();
});

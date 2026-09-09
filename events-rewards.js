// ==========================================================
// THE BUSHIDO WAY - SISTEMA DE 10 MISIONES, DIAMANTES Y PERFIL
// ==========================================================

let userState = {
    diamonds: 150,
    personalPoints: 1250,
    vipPoints: 300,
    rank: "NOVATO",
    tier: "#CLASE D"
};

// Array completo con las 10 misiones detalladas
const misionesDiarias = [
    { id: 1, title: "💬 Participar en el Chat General", desc: "Envía un mensaje activo en el chat de la comunidad.", reward: 50, completed: false, type: "action" },
    { id: 2, title: "👥 Invitar a 5 Nuevos Miembros", desc: "Comparte tu enlace de invitación con amigos.", reward: 200, completed: false, type: "action" },
    { id: 3, title: "🔗 Vincular cuenta con Google", desc: "Asegura tu cuenta conectando tu perfil oficial.", reward: 300, completed: true, type: "link" },
    { id: 4, title: "▶️ Vincular Canal de YouTube", desc: "Conecta tu canal personal para compartir contenido.", reward: 150, completed: false, type: "link" },
    { id: 5, title: "📘 Vincular cuenta de Facebook", desc: "Conecta tu perfil social de Facebook.", reward: 100, completed: false, type: "link" },
    { id: 6, title: "🎵 Vincular cuenta de TikTok", desc: "Conecta tu cuenta para sincronizar clips de video.", reward: 150, completed: false, type: "link" },
    { id: 7, title: "📸 Vincular cuenta de Instagram", desc: "Sincroniza tu galería gráfica personal.", reward: 100, completed: false, type: "link" },
    { id: 8, title: "✖️ Vincular cuenta de X / Twitter", desc: "Conecta tu cuenta para menciones de comunidad.", reward: 100, completed: false, type: "link" },
    { id: 9, title: "⚡ Explorar la Guía de Tutoriales", desc: "Visita y lee al menos un artículo técnico.", reward: 75, completed: false, type: "action" },
    { id: 10, title: "🏆 Reclamar Conexión Diaria", desc: "Inicia sesión consecutiva en el Nexo hoy.", reward: 50, completed: false, type: "action" }
];

function actualizarUIUsuario() {
    const diamondEl = document.getElementById('diamond-count');
    const rankEl = document.getElementById('user-rank-display');
    const tierEl = document.getElementById('user-tier-display');
    const xpEl = document.getElementById('personal-points');
    const vipEl = document.getElementById('vip-points');

    if (diamondEl) diamondEl.textContent = userState.diamonds;
    if (rankEl) rankEl.textContent = `RANGO: ${userState.rank}`;
    if (tierEl) tierEl.textContent = userState.tier;
    if (xpEl) xpEl.textContent = `${userState.personalPoints} XP`;
    if (vipEl) vipEl.textContent = `${userState.vipPoints} PTS`;
}

function reclamarMision(missionId) {
    const mision = misionesDiarias.find(m => m.id === missionId);
    if (mision && !mision.completed) {
        mision.completed = true;
        userState.diamonds += mision.reward;
        userState.personalPoints += 100;

        // Evaluar subida de nivel dinámica basada en puntos
        if (userState.personalPoints > 1500) {
            userState.rank = "VETERANO";
            userState.tier = "#CLASE C";
        }
        if (userState.personalPoints > 2500) {
            userState.rank = "VIP LEYENDA";
            userState.tier = "#CLASE S";
        }

        actualizarUIUsuario();
        alert(`¡Misión completada! Has ganado +${mision.reward} 💎 y +100 XP.`);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    actualizarUIUsuario();
    console.log("THE BUSHIDO WAY // Sistema de 10 misiones y perfiles sincronizado.");
});

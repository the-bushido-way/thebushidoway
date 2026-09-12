/* ==========================================
   THE BUSHIDO WAY - SCRIPT PRINCIPAL
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log("The Bushido Way: Sistema de Menú y Recargas activo.");
    
    // 1. Verificar si la URL trae parámetros de éxito de Stripe
    verificarTransaccionStripe();

    // 2. Cargar el balance actual de monedas
    actualizarInterfazMonedas();
});

function actualizarInterfazMonedas() {
    let coins = localStorage.getItem('bushido_coins');
    if (coins === null) {
        coins = 0; // Inicia en 0 limpio para pruebas de recarga
        localStorage.setItem('bushido_coins', coins);
    }

    const balanceElement = document.getElementById('coinBalance');
    if (balanceElement) {
        balanceElement.textContent = coins;
    }
}

function verificarTransaccionStripe() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Comprobamos si la URL contiene indicador de éxito de pago
    if (urlParams.has('success') || urlParams.get('checkout') === 'success') {
        console.log("Transacción de Stripe detectada como exitosa.");
        
        // Sumar recompensa o acreditar monedas de la recarga
        let coinsActuales = parseInt(localStorage.getItem('bushido_coins') || '0');
        coinsActuales += 500; // Valor de prueba por recarga
        localStorage.setItem('bushido_coins', coinsActuales);

        // Obtener el identificador de sesión para enviarlo al servidor
        const sessionId = urlParams.get('session_id') || 'sandbox_session_' + Date.now();

        // Notificar al servidor de manera segura que la transacción se completó con éxito
        notificarServidorTransaccionExitosa(sessionId);

        // Limpiar los parámetros de la URL para evitar duplicar la recarga al refrescar
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

function notificarServidorTransaccionExitosa(sessionId) {
    console.log("Enviando código de confirmación al servidor...", sessionId);
    
    /* 
      Estructura lista para conectar con tu servidor (Backend Python/NodeJS):
      
      fetch('/api/confirmar-pago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, status: 'completed' })
      })
      .then(response => response.json())
      .then(data => {
          console.log("Servidor confirmó recepción exitosa:", data);
      })
      .catch(error => {
          console.error("Error al notificar al servidor:", error);
      });
    */
}
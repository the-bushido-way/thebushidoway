// Inicialización segura de Stripe con tu Clave Publicable real de prueba
const stripe = Stripe('pk_test_51UEbwFHRnTyU9SbnRpwlUVUCjyngReWztkQxPmuV7j7EUafyJ9IoYFKkRV9wGVzoGBT5yvOzImlRuqeczIZ75ju10021DLQbaR');

// Cargar saldo actual desde localStorage al iniciar la tienda
document.addEventListener('DOMContentLoaded', () => {
    actualizarVistaMonedas();
});

function actualizarVistaMonedas() {
    const monedasActuales = localStorage.getItem('bushido_coins') || '0';
    const display = document.getElementById('balance-display');
    if (display) {
        display.textContent = monedasActuales;
    }
}

function iniciarCompra(nombreProducto, montoCents) {
    console.log(`Iniciando pasarela para: ${nombreProducto} por un valor de ${montoCents / 100} USD`);
    
    // Simulación de pasarela fluida en entorno de pruebas sandbox
    alert(`⚡ [MODO SEGURO STRIPE] Conectando pasarela para adquirir: ${nombreProducto}.`);

    // Ejemplo de cómo interactuaría al completarse el pago exitosamente:
    // simularAcreditacionExitosa(100); 
}

// Función auxiliar para actualizar inventario tras pago exitoso verificado por webhook
function simularAcreditacionExitosa(cantidadGanada) {
    let actual = parseInt(localStorage.getItem('bushido_coins') || '0');
    let nuevoTotal = actual + cantidadGanada;
    localStorage.setItem('bushido_coins', nuevoTotal);
    actualizarVistaMonedas();
    alert(`🎉 ¡Pago confirmado! Se han acreditado ${cantidadGanada} Bushido Coins a tu cuenta.`);
}

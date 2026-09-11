const stripe = Stripe('pk_test_51UEbwFHRnTyU9SbnRpwlUVUCjyngReWztkQxPmuV7j7EUafyJ9IoYFKkRV9wGVzoGBT5yvOzImlRuqeczIZ75ju10021DLQbaR');

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

function iniciarCompraStripe(nombreProducto, cantidadCoins) {
    console.log(`Iniciando checkout de prueba para: ${nombreProducto} (${cantidadCoins} coins)`);
    
    // Simulación interactiva avanzada de pasarela en entorno de pruebas
    // En cuanto conectemos tu servidor definitivo con la clave secreta, aquí redirigiremos al Checkout de Stripe.
    alert(`⚡ [STRIPE SANDBOX] Redirigiendo a pasarela segura para adquirir: ${nombreProducto}`);
    
    // Simulamos la acreditación inmediata para que pruebes cómo sube tu saldo en el dojo:
    simularAcreditacionExitosa(cantidadCoins);
}

function simularAcreditacionExitosa(cantidadGanada) {
    let actual = parseInt(localStorage.getItem('bushido_coins') || '0');
    let nuevoTotal = actual + cantidadGanada;
    localStorage.setItem('bushido_coins', nuevoTotal);
    actualizarVistaMonedas();
}

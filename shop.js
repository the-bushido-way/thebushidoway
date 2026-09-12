/* Lógica de la Tienda de The Bushido Way */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Módulo Dojo Shop activo.");
    
    // Ejemplo opcional: si deseas simular que al hacer clic en comprar se sumen monedas de prueba
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aquí puedes gestionar eventos de la pasarela si lo requieres
            console.log("Redirigiendo a pasarela segura de Stripe...");
        });
    });
});
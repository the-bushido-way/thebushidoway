/* Lógica del Menú Principal y gestión de monedas */
document.addEventListener('DOMContentLoaded', () => {
    console.log("The Bushido Way: Sistema principal inicializado.");
    
    // Función para actualizar el saldo de monedas en la interfaz
    loadUserCoins();
});

function loadUserCoins() {
    // Obtenemos las monedas almacenadas (o 0 por defecto)
    const currentCoins = localStorage.getItem('bushido_coins') || '0';
    const balanceElement = document.getElementById('coinBalance');
    
    if (balanceElement) {
        balanceElement.textContent = currentCoins;
    }
}

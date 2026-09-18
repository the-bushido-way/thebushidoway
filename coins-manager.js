/* ==========================================
   THE BUSHIDO WAY - GESTOR DE MONEDAS Y PAGOS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    sincronizarSaldoCoins();
});

function obtenerSaldoActual() {
    const saldoGuardado = localStorage.getItem('bushido_coins_balance');
    return saldoGuardado !== null ? parseInt(saldoGuardado, 10) : 0;
}

function sincronizarSaldoCoins() {
    const saldoActual = obtenerSaldoActual();
    const elementoBalance = document.getElementById('bushidoCoinsBalance');
    if (elementoBalance) {
        elementoBalance.textContent = saldoActual;
    }
}

function simularCompraRecarga(cantidad) {
    console.log(`[PASARELA] Procesando compra de ${cantidad} Bushido Coins...`);

    setTimeout(() => {
        const saldoActual = obtenerSaldoActual();
        const nuevoSaldo = saldoActual + cantidad;

        localStorage.setItem('bushido_coins_balance', nuevoSaldo);
        sincronizarSaldoCoins();

        console.log(`[SERVIDOR] Transacción verificada. Añadidos ${cantidad} monedas.`);
        alert(`¡Transacción Exitosa! Se han acreditado ${cantidad} Bushido Coins a tu cuenta.`);
    }, 600);
}

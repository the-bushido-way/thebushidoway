// bushido-auth.js - Google OAuth Integration for The Bushido Way
const CLIENT_ID = '345741995794-71jf37bduotlhd5fco01mvvptm8s0th0.apps.googleusercontent.com';

function handleCredentialResponse(response) {
    console.log("Token recibido exitosamente.");
    alert("¡Autenticación con Google exitosa en The Bushido Way!");
    window.location.href = "index.html";
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });
    
    const buttonDiv = document.getElementById("buttonDiv");
    if (buttonDiv) {
        google.accounts.id.renderButton(
            buttonDiv,
            { theme: "filled_black", size: "large", text: "signin_with", locale: "es", shape: "rectangular" }
        );
    }
};

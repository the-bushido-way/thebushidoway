/* ==========================================================
   THE BUSHIDO WAY - CHAT ENGINE JS (Independiente)
   ========================================================== */

let archivoActualEditor = null;
let misStickersGuardados = [];

function toggleDrawer(pestanaActiva = 'emojis') {
    const drawer = document.getElementById('whatsapp-drawer');
    if (!drawer) return;

    if (drawer.style.display === 'none' || drawer.style.display === '') {
        drawer.style.display = 'flex';
        cambiarPestana(pestanaActiva);
    } else {
        drawer.style.display = 'none';
    }
}

function cambiarPestana(nombrePestana) {
    const contentEmojis = document.getElementById('content-emojis');
    const contentGifs = document.getElementById('content-gifs');
    const contentCrear = document.getElementById('content-crear');
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));

    if (contentEmojis) contentEmojis.style.display = 'none';
    if (contentGifs) contentGifs.style.display = 'none';
    if (contentCrear) contentCrear.style.display = 'none';

    if (nombrePestana === 'emojis' && contentEmojis) {
        contentEmojis.style.display = 'grid';
        if(tabs[0]) tabs[0].classList.add('active');
        cargarEmojisNativosChat();
    } else if (nombrePestana === 'gifs' && contentGifs) {
        contentGifs.style.display = 'grid';
        if(tabs[1]) tabs[1].classList.add('active');
        renderizarMisStickers();
    } else if (nombrePestana === 'crear' && contentCrear) {
        contentCrear.style.display = 'flex';
        if(tabs[2]) tabs[2].classList.add('active');
    }
}

function cerrarEditorInterno() {
    archivoActualEditor = null;
    const inputEditor = document.getElementById('input-imagen-editor');
    const textoInput = document.getElementById('texto-meme-input');
    const previewWrapper = document.getElementById('media-preview-wrapper');
    
    if (inputEditor) inputEditor.value = '';
    if (textoInput) textoInput.value = '';
    if (previewWrapper) {
        previewWrapper.innerHTML = '<div class="placeholder-upload-text">📂 Toca para cargar Foto o Vídeo (Cualquier duración)</div>';
    }
    cambiarPestana('emojis');
}

function cargarMedioEnEditor(event) {
    const file = event.target.files[0];
    if (!file) return;

    archivoActualEditor = file;
    const previewWrapper = document.getElementById('media-preview-wrapper');
    if (!previewWrapper) return;

    const mediaURL = URL.createObjectURL(file);
    previewWrapper.innerHTML = '';

    if (file.type.startsWith('video/')) {
        const videoElement = document.createElement('video');
        videoElement.src = mediaURL;
        videoElement.controls = true;
        videoElement.style.maxHeight = '100px';
        previewWrapper.appendChild(videoElement);
    } else {
        const imgElement = document.createElement('img');
        imgElement.src = mediaURL;
        imgElement.style.maxHeight = '100px';
        previewWrapper.appendChild(imgElement);
    }
}

function manejarArchivoGaleria(event) {
    const file = event.target.files[0];
    if (!file) return;

    const mediaURL = URL.createObjectURL(file);
    const contenedorMensajes = document.getElementById('chat-messages');
    if (!contenedorMensajes) return;

    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.className = 'mensaje-item';

    if (file.type.startsWith('video/')) {
        nuevoMensaje.innerHTML = `
            <video src="${mediaURL}" controls style="max-width: 100%; border-radius: 6px;"></video>
            <div class="mensaje-footer-reacciones">
                <button type="button" class="btn-reaccion" onclick="reaccionarMensajeChat(this, '👍')">👍</button>
                <button type="button" class="btn-reaccion" onclick="reaccionarMensajeChat(this, '❤️')">❤️</button>
            </div>
        `;
    } else {
        nuevoMensaje.innerHTML = `
            <img src="${mediaURL}" style="max-width: 100%; border-radius: 6px;" />
            <div class="mensaje-footer-reacciones">
                <button type="button" class="btn-reaccion" onclick="reaccionarMensajeChat(this, '👍')">👍</button>
                <button type="button" class="btn-reaccion" onclick="reaccionarMensajeChat(this, '❤️')">❤️</button>
            </div>
        `;
    }

    contenedorMensajes.appendChild(nuevoMensaje);
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
    event.target.value = ''; // Limpiar input
}

function guardarStickerPersonalizado() {
    if (!archivoActualEditor) {
        alert("Primero carga una foto o vídeo para crear el sticker.");
        return;
    }

    const mediaURL = URL.createObjectURL(archivoActualEditor);
    const nuevoSticker = {
        url: mediaURL,
        tipo: archivoActualEditor.type.startsWith('video/') ? 'video' : 'image'
    };

    misStickersGuardados.push(nuevoSticker);
    alert("¡Sticker guardado exitosamente en Mis Stickers!");
    cerrarEditorInterno();
    cambiarPestana('gifs');
}

function renderizarMisStickers() {
    const contenedor = document.getElementById('content-gifs');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    if (misStickersGuardados.length === 0) {
        contenedor.innerHTML = '<div style="grid-column: span 3; text-align: center; color: #8696a0; padding: 20px; font-size: 0.85rem;">No tienes stickers guardados aún. Crea uno en la pestaña Estudio GIF.</div>';
        return;
    }

    misStickersGuardados.forEach((sticker) => {
        const item = document.createElement('div');
        item.className = 'saved-sticker-item';
        
        if (sticker.tipo === 'video') {
            item.innerHTML = `<video src="${sticker.url}" muted></video>`;
        } else {
            item.innerHTML = `<img src="${sticker.url}" />`;
        }

        item.onclick = () => {
            enviarStickerAlChat(sticker);
        };
        contenedor.appendChild(item);
    });
}

function enviarStickerAlChat(sticker) {
    const contenedorMensajes = document.getElementById('chat-messages');
    if (!contenedorMensajes) return;

    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.className = 'mensaje-item';

    if (sticker.tipo === 'video') {
        nuevoMensaje.innerHTML = `<video src="${sticker.url}" autoplay loop muted style="max-width: 140px; border-radius: 6px;"></video>`;
    } else {
        nuevoMensaje.innerHTML = `<img src="${sticker.url}" style="max-width: 140px; border-radius: 6px;" />`;
    }

    contenedorMensajes.appendChild(nuevoMensaje);
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
    toggleDrawer(); // Cerrar drawer al enviar
}

function enviarTextoChat() {
    const input = document.getElementById('mensaje-input');
    if (!input) return;
    
    const texto = input.value.trim();
    if (texto === '') return;

    const contenedorMensajes = document.getElementById('chat-messages');
    if (!contenedorMensajes) return;

    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.className = 'mensaje-item';
    nuevoMensaje.innerHTML = `
        <div class="mensaje-texto">${escapeHTMLChat(texto)}</div>
        <div class="mensaje-footer-reacciones">
            <button type="button" class="btn-reaccion" onclick="reaccionarMensajeChat(this, '👍')">👍</button>
            <button type="button" class="btn-reaccion" onclick="reaccionarMensajeChat(this, '❤️')">❤️</button>
            <button type="button" class="btn-reaccion" onclick="reaccionarMensajeChat(this, '🔥')">🔥</button>
        </div>
    `;

    contenedorMensajes.appendChild(nuevoMensaje);
    input.value = '';
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
}

function reaccionarMensajeChat(boton, emoji) {
    const footer = boton.closest('.mensaje-footer-reacciones');
    if (!footer) return;
    
    let badge = footer.querySelector(`[data-reaccion="${emoji}"]`);
    if (!badge) {
        badge = document.createElement('span');
        badge.setAttribute('data-reaccion', emoji);
        badge.style.marginLeft = '4px';
        badge.style.fontSize = '0.8rem';
        badge.style.background = '#1e293b';
        badge.style.padding = '2px 6px';
        badge.style.borderRadius = '10px';
        badge.style.border = '1px solid #334155';
        badge.innerText = `${emoji} 1`;
        footer.appendChild(badge);
    } else {
        badge.innerText = `${emoji} 2`;
    }
}

function cargarEmojisNativosChat() {
    const contenedor = document.getElementById('content-emojis');
    if (!contenedor || contenedor.children.length > 0) return;
    
    const emojis = ['😀','😂','😍','🔥','👍','🎉','😎','😢','🙌','✨','🚀','💻','🎮','🐉','⚡','💥','💯','⭐'];
    emojis.forEach(e => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'emoji-drawer-btn';
        btn.innerText = e;
        btn.onclick = () => {
            const input = document.getElementById('mensaje-input');
            if (input) input.value += e;
        };
        contenedor.appendChild(btn);
    });
}

function escapeHTMLChat(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}


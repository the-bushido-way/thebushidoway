document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatMessageInput');
    const sendButton = document.getElementById('sendButton');
    const audioButton = document.getElementById('audioRecordButton');
    const messagesContainer = document.getElementById('chatMessagesContainer');

    function sendTextMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message sent';
        msgDiv.innerHTML = `
            <div class="message-bubble">
                <p>${escapeHtml(text)}</p>
                <div class="message-reactions-bar">
                    <button class="reaction-chip">👍 <span>0</span></button>
                </div>
            </div>
        `;
        messagesContainer.appendChild(msgDiv);
        chatInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendTextMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendTextMessage();
            }
        });
    }

    if (audioButton) {
        let isRecording = false;

        audioButton.addEventListener('click', () => {
            isRecording = !isRecording;
            if (isRecording) {
                audioButton.classList.add('recording');
                audioButton.title = 'Grabando nota de voz... (Click para detener)';
                showAudioNotification("🎙️ Grabando nota de voz del dojo...");
            } else {
                audioButton.classList.remove('recording');
                audioButton.title = 'Nota de voz';
                sendAudioMessageBubble();
            }
        });
    }

    function showAudioNotification(text) {
        let notif = document.getElementById('audioNotifToast');
        if (!notif) {
            notif = document.createElement('div');
            notif.id = 'audioNotifToast';
            notif.style.cssText = `
                position: fixed; bottom: 70px; left: 50%; transform: translateX(-50%);
                background: #ff4757; color: #fff; padding: 6px 14px; border-radius: 20px;
                font-size: 0.8rem; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            `;
            document.body.appendChild(notif);
        }
        notif.textContent = text;
        setTimeout(() => {
            if (!audioButton.classList.contains('recording') && notif) {
                notif.remove();
            }
        }, 3000);
    }

    function sendAudioMessageBubble() {
        const notif = document.getElementById('audioNotifToast');
        if (notif) notif.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message sent';
        msgDiv.innerHTML = `
            <div class="message-bubble" style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2rem;">🎤</span>
                <div>
                    <p style="margin: 0; font-weight: bold;">Nota de voz (0:05)</p>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">▶ ──────── 0:05</div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});
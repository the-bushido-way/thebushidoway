import os
import http.server
import socketserver
import json
import mimetypes

PORT = 8000

class MiHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Normalizar la ruta para evitar errores de barras
        ruta = self.path.split('?')[0]

        # ----------------- RUTAS DE PÁGINAS HTML -----------------
        if ruta == '/' or ruta == '/index.html':
            self.enviar_archivo('index.html', 'text/html')
        elif ruta == '/videos.html' or ruta == '/videos':
            self.enviar_archivo('videos.html', 'text/html')
        elif ruta == '/fotos.html' or ruta == '/fotos':
            self.enviar_archivo('fotos.html', 'text/html')
        elif ruta == '/tutoriales.html' or ruta == '/tutoriales':
            self.enviar_archivo('tutoriales.html', 'text/html')
        elif ruta == '/foro.html' or ruta == '/foro':
            self.enviar_archivo('foro.html', 'text/html')
        elif ruta == '/chats.html' or ruta == '/chats':
            self.enviar_archivo('chats.html', 'text/html')

        # ----------------- RUTAS DE APIS (DATOS GET) -----------------
        elif ruta == '/api/fotos':
            self.enviar_lista_archivos('galeria_fotos')
        elif ruta == '/api/videos':
            self.enviar_lista_archivos('carpeta_videos')
        
        # ----------------- ARCHIVOS ESTÁTICOS (CSS, ETC) -----------------
        else:
            super().do_GET()

    def do_POST(self):
        ruta = self.path.split('?')[0]

        # ----------------- RUTAS DE APIS (DATOS POST) -----------------
        if ruta == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                datos = json.loads(post_data.decode('utf-8'))
                consulta = datos.get('consulta', '')
                
                # Respuesta dinámica del asistente según lo que pregunte el usuario
                if consulta.strip() == "":
                    respuesta = "Por favor, indique su duda después del comando #Assistant para que pueda ayudarle con precisión."
                else:
                    respuesta = f"He procesado su solicitud sobre: '{consulta}'. Como asistente del dojo, estoy a su disposición para guiarle en lo que necesite."
                
                resultado = {"respuesta": respuesta}
            except Exception as e:
                resultado = {"respuesta": "Hubo un error al procesar su comando en el servidor."}

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(resultado).encode('utf-8'))
        else:
            self.send_error(404, "Ruta POST no encontrada")

    def enviar_archivo(self, nombre_archivo, tipo_contenido):
        if os.path.exists(nombre_archivo):
            self.send_response(200)
            self.send_header('Content-Type', tipo_contenido)
            self.end_headers()
            with open(nombre_archivo, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404, "Archivo no encontrado")

    def enviar_lista_archivos(self, carpeta):
        if os.path.exists(carpeta) and os.path.isdir(carpeta):
            archivos = [f for f in os.listdir(carpeta) if os.path.isfile(os.path.join(carpeta, f))]
            archivos_validos = [f for f in archivos if f.lower().endswith(('.png', '.jpg', '.jpeg', '.mp4', '.webm', '.gif'))]
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(archivos_validos).encode('utf-8'))
        else:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps([]).encode('utf-8'))

# Iniciar servidor local
with socketserver.TCPServer(("", PORT), MiHandler) as httpd:
    print(f"Dojo activo en el puerto http://localhost:{PORT}")
    httpd.serve_forever()

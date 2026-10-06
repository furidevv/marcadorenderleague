# Ender League Remote Scoreboard

## Qué hace
El panel de control genera una sala y un enlace único para OBS.
El marcador de OBS recibe los cambios en tiempo real mediante PeerJS.

## IMPORTANTE
Los dos HTML deben estar publicados en una URL HTTPS pública para que OBS pueda cargar el marcador.
No hace falta Python ni un servidor propio.

Una opción gratuita:
1. Crea un repositorio en GitHub.
2. Sube `control.html`, `display.html`, `display.js` y `style.css`.
3. Activa GitHub Pages.
4. Abre `control.html` desde tu página publicada.
5. Pulsa "GENERAR ENLACE PARA OBS".
6. Copia el enlace y pégalo en OBS -> Fuente -> Navegador -> URL.
7. Mantén abierta la página de control.

La URL generada será parecida a:
https://TUUSUARIO.github.io/ender-league/display.html?room=XXXXXXXX

## Archivos
- control.html: panel de control.
- display.html: marcador para OBS.
- display.js: conexión y marcador.
- style.css: diseño.


CORRECCIÓN: display.html ahora se conecta al PeerJS del panel mediante ?room=..., en lugar de intentar crear el mismo Peer ID. Esto permite recibir goles y estados.

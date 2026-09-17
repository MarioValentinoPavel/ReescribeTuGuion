# Reescribe tu Guion

Landing del curso de Mario Valentino Pavel (marketing, conciencia y mentalidad). Web estática (HTML + CSS + JS, sin frameworks ni build).

## Estructura

Todos los archivos están en la raíz, sin subcarpetas — así no hay ninguna jerarquía que se pueda romper al subirlo arrastrando el .zip a GitHub:

```
reescribe-tu-guion/
├── index.html            # estructura de la página
├── style.css               # estilos
├── main.js                  # acordeón de "Cómo funciona" + wizard del test + enlace a WhatsApp
├── car-photo.jpg            # foto de fondo del hero ("FADE IN")
├── castle-photo.jpg          # foto de la sección "Quién dirige esta historia"
├── package.json
├── .nojekyll
├── .gitignore
└── README.md
```

## Ver la web en tu ordenador

No hace falta instalar nada: abre `index.html` con doble clic en el navegador.

## Publicar en GitHub Pages — subiendo el .zip a mano

1. Ve a tu repositorio en GitHub → botón **Add file → Upload files**.
2. Descomprime el `.zip` en una carpeta de tu ordenador.
3. **Abre esa carpeta** (no arrastres el `.zip` sin descomprimir, y no arrastres subcarpetas — aquí ya no hay ninguna) y **selecciona todos los archivos con Ctrl+A dentro de la carpeta**, luego arrástralos todos juntos al recuadro de subida de GitHub.
4. Si en el repo queda algún archivo suelto de subidas anteriores que no está en esta lista (por ejemplo uno llamado `download`, o una carpeta `css`/`js`/`images` vacía), bórralo desde GitHub (los tres puntos `...` al lado del archivo → Delete file) para que no queden restos.
5. Haz commit directamente en `main`.
6. Ve a **Settings → Pages** → en "Source" elige la rama `main` y la carpeta `/ (root)` → Guarda.
7. Tu web quedará en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

## Publicar en GitHub Pages — con git/gh (alternativa desde terminal)

Este ordenador tiene `git` y `gh` (GitHub CLI) instalados y `gh` autenticado como **MarioValentinoPavel**:

```bash
cd ruta/a/la/carpeta/reescribe-tu-guion
git init
git add .
git commit -m "Primera versión de Reescribe tu Guion"
git branch -M main
gh repo create reescribe-tu-guion --public --source=. --remote=origin --push
```

Luego activa Pages igual que en el paso 6 de arriba.

## Editar contenido

- **Vídeo gratuito**: en `index.html`, busca el comentario `<!-- Sustituye este div.video-frame por tu <iframe> real de YouTube/Vimeo -->` dentro de la sección `#video` y cambia ese `div.video-frame` por el iframe real de tu vídeo.
- **Fotos**: sustituye `car-photo.jpg` (fondo del hero) y `castle-photo.jpg` (sección "Quién dirige esta historia") por otras del mismo nombre.
- **WhatsApp**: el número `+34 633 712 475` aparece en el pie de página (`index.html`) y dentro de `main.js` (función `buildWhatsapp`). Cámbialo en los dos si lo actualizas.
- **Preguntas del test**: cada paso del wizard es un bloque `.quiz-step` en `index.html`; la lógica de validación y avance está en `main.js`.
- **Colores**: variables CSS al principio de `style.css` (`--teal`, `--teal-deep`, `--teal-bright`, `--bg`, etc.).

# Chacabana Barber Shop - Landing Page

Landing page bilingüe (ES/EN) y optimizada para SEO local para **Chacabana Barber Shop**, barbería con 2 sucursales en San Antonio, TX (Eisenhauer Rd y Schaefer Rd).

Sitio estático sin build step, listo para desplegar en **Cloudflare Pages**.

## ✨ Características

- **Bilingüe ES/EN** con toggle instantáneo (recuerda la preferencia y detecta el idioma del navegador).
- **Agenda por WhatsApp**: formulario que arma el mensaje y abre `wa.me` con todo listo.
- **2 sucursales** con horario, botón de Google Maps y **mapa embebido**.
- **Estado "Abierto / Cerrado" en vivo** por sucursal (zona horaria `America/Chicago`).
- **Sección de reseñas de Google** y rating.
- **SEO local**: JSON-LD (HairSalon) generado desde config, `sitemap.xml`, `robots.txt`, Open Graph.
- **PWA instalable**: manifest + iconos.
- **Rendimiento**: HTML5 semántico, CSS moderno y JS vanilla, sin dependencias.

## 🚀 Deploy en Cloudflare Pages

1. Sube este repo a GitHub.
2. En Cloudflare Pages: **Create project → Connect to Git**.
3. Build command: *(vacío)* · Output directory: `/`
4. Deploy. Cada push a `main` publica automáticamente.

## 🛠️ Configuración

Edita **`config.js`** (único archivo necesario) para cambiar:

- Número de WhatsApp, Instagram y links de reseñas.
- Sucursales, direcciones, horarios y mapas.
- Servicios, precios y duración.
- Barberos, reseñas y rating.
- Token de Cloudflare Web Analytics.

## 📁 Estructura

```
index.html            # Estructura semántica
styles.css            # Diseño (rojo/blanco/azul)
app.js                # Lógica: i18n, WhatsApp, estado, reseñas
config.js             # ⚙️ Datos del negocio (editar aquí)
manifest.webmanifest  # PWA
_headers              # Seguridad y caché (Cloudflare Pages)
robots.txt / sitemap.xml
images/  icons/
```

## 🧪 Preview local

```bash
python3 -m http.server 8123
# abre http://localhost:8123
```

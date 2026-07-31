# M_R Desarrollo Web

Sitio web corporativo y de servicios para **M_R Web Design**. El proyecto está diseñado para ofrecer landing pages, sitios corporativos y catálogos digitales para negocios que necesitan una presencia digital clara, ordenada y fácil de administrar.

## Tecnología Actual del Proyecto (Stack)

El proyecto es un sitio web estático moderno, ligero y **sin dependencias externas** (ni Bootstrap, ni librerías de terceros).

- **HTML5:** Lenguaje de marcado con estructura semántica nativa.
- **CSS3 Puro:**
  - **Variables CSS (Custom Properties):** Paleta de colores y espaciados centralizados en `:root`.
  - **Flexbox:** Diseño del encabezado, menú hamburguesa, logo y formularios.
  - **Grid system propio:** Clases `.row`, `.col-md-*` implementadas sin Bootstrap.
  - **Media Queries:** Diseño 100% responsivo (móvil, tablet, escritorio).
  - **Funciones avanzadas:** `env()` para Safe Area Insets, `@supports` para detección de características.
- **JavaScript (Vanilla JS):** Programación nativa sin frameworks.
  - **LocalStorage API:** para recordar la selección de servicios entre páginas.
  - **Blob API y URL.createObjectURL:** generan y descargan archivos `.txt` con los datos de los formularios.
  - **Fetch API:** inyecta el encabezado y el pie desde la carpeta `partials/` para no repetirlos en cada página.
  - **URLSearchParams e history.replaceState:** leen el servicio desde la URL y la limpian después de usarla.
- **Sin dependencias externas:** No se usa Bootstrap, jQuery ni CDNs. Todo el CSS y JS es propio.
- **Accesibilidad:** Soporte para `prefers-reduced-motion`, navegación por teclado, atributos ARIA y skip-to-content link.

> **Importante:** los parciales se cargan con `fetch()`, por lo que el sitio debe servirse por HTTP
> (ej. `python3 -m http.server`) o publicarse en GitHub Pages. No funciona abriendo los archivos
> directamente con `file://`.

## Estructura del Proyecto

```text
m_r_desarrollo_web/
├── css/
│   └── style.css           # Hoja de estilos principal (CSS3 + Variables)
│
├── js/
│   ├── components.js       # Inyección del encabezado/pie y menú hamburguesa
│   └── script.js           # Lógica de formularios y selección de servicios
│
├── img/
│   ├── dominio.png         # Logotipo del sitio (globo terráqueo, usado también como favicon)
│   └── pexels_01.jpg       # Imagen de fondo para el efecto parallax global
│
├── partials/
│   ├── header.html         # Encabezado y menú compartidos por todas las páginas
│   └── footer.html         # Pie de página compartido por todas las páginas
│
├── index.html              # Página de inicio (Hero, Servicios, Acerca de)
├── cotizacion.html         # Formulario de solicitud de cotización
├── contactenos.html        # Formulario de contacto directo
├── 404.html                # Página personalizada de error 404
└── README.md               # Documentación del proyecto
```

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
- **Sin dependencias externas:** No se usa Bootstrap, jQuery ni CDNs. Todo el CSS y JS es propio.
- **Accesibilidad:** Soporte para `prefers-reduced-motion`, navegación por teclado, atributos ARIA y skip-to-content link.

## Estructura del Proyecto

```text
proyecto_mr/
│
── css/
│   └── style.css               # Hoja de estilos principal (CSS3 + Variables)
│
├── js/
│   └── script.js               # Lógica de formularios, menú y selección de servicios
│
├── img/
│   ├── dominio.png             # Logotipo del sitio (globo terráqueo, usado también como favicon)
│   ├── pexels_01.jpg           # Imagen de fondo para el efecto parallax global
│   └── seo-y-web.png           # Imagen adicional para servicios
│
├── index.html                  # Página única consolidada (Hero, Servicios, Acerca de)
├── cotizacion.html             # Formulario de solicitud de cotización
├── contactenos.html            # Formulario de contacto directo
├── 404.html                    # Página personalizada de error 404
└── README.md                   # Documentación del proyecto
```

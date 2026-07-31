/* ============================================================
   components.js - M_R Web Design
   Version: 3.1
   Funcion: carga el encabezado y el pie de pagina desde la
   carpeta partials/ para no repetirlos en cada pagina del sitio.
   ============================================================ */

// Esperamos a que el documento HTML termine de cargarse
document.addEventListener("DOMContentLoaded", function () {

    // Buscamos todos los contenedores vacios que tengan el atributo data-include
    var contenedores = document.querySelectorAll("[data-include]");

    // Si no hay ninguno, no hay nada que inyectar y salimos de la funcion
    if (contenedores.length === 0) { return; }

    // Obtenemos el nombre del archivo actual (ej. "index.html")
    var paginaActual = window.location.pathname.split("/").pop() || "index.html";

    // Contador de parciales pendientes por cargar
    var pendientes = contenedores.length;

    // Recorremos cada contenedor para inyectar su archivo parcial
    contenedores.forEach(function (contenedor) {

        // fetch() pide al servidor el archivo indicado en data-include
        fetch(contenedor.getAttribute("data-include"))

            // Si la respuesta del servidor no es correcta, lanzamos un error
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar el parcial");
                }
                return respuesta.text();
            })

            // Cuando se obtiene el texto, lo colocamos dentro del contenedor
            .then(function (html) {
                contenedor.innerHTML = html;
                terminoDeCargar();
            })

            // Si ocurre un error, mostramos un aviso dentro del contenedor
            .catch(function () {
                contenedor.innerHTML =
                    '<p class="texto-ayuda">Error al cargar un componente. ' +
                    "Sirvelo por HTTP (ej. python3 -m http.server).</p>";
                terminoDeCargar();
            });
    });

    // Funcion que se ejecuta cada vez que un parcial termina de inyectarse
    function terminoDeCargar() {
        pendientes--;

        // Cuando ya se cargaron todos los parciales, configuramos el menu
        if (pendientes === 0) { configurarMenu(); }
    }

    // Configura el enlace activo del menu y el boton hamburguesa
    function configurarMenu() {

        // Marcamos como activo el enlace que apunta a la pagina actual
        document.querySelectorAll(".menu a").forEach(function (enlace) {
            if (enlace.getAttribute("href") === paginaActual) {
                enlace.classList.add("active");
            }
        });

        // Referencias al boton hamburguesa y al menu desplegable
        var boton = document.querySelector(".boton-hamburguesa");
        var menu = document.querySelector(".menu");

        // Si no existen, no configuramos el menu y salimos
        if (!boton || !menu) { return; }

        // Al hacer clic en el boton, mostramos u ocultamos el menu
        boton.addEventListener("click", function () {
            var abierto = menu.classList.toggle("menu-activo");
            boton.setAttribute("aria-expanded", abierto ? "true" : "false");
        });

        // Al hacer clic en un enlace del menu, lo cerramos
        menu.querySelectorAll("a").forEach(function (enlace) {
            enlace.addEventListener("click", cerrarMenu);
        });

        // Al presionar la tecla Escape, cerramos el menu
        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") { cerrarMenu(); }
        });

        // Al hacer clic fuera del menu y del boton, lo cerramos
        document.addEventListener("click", function (evento) {
            var clicDentro = menu.contains(evento.target) || boton.contains(evento.target);
            if (!clicDentro) { cerrarMenu(); }
        });
    }

    // Funcion auxiliar para cerrar el menu y actualizar aria-expanded
    function cerrarMenu() {
        var boton = document.querySelector(".boton-hamburguesa");
        var menu = document.querySelector(".menu");
        if (menu) { menu.classList.remove("menu-activo"); }
        if (boton) { boton.setAttribute("aria-expanded", "false"); }
    }
});

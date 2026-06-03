/* ============================================================
   script.js - M_R Desarrollo Web
   Version: 3.0
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    // UTILIDADES
    function obtenerElemento(id) { return document.getElementById(id); }
    function limpiarTexto(t) { return t ? String(t).replace(/\s+/g, " ").trim() : ""; }
    function textoSeguro(t) { return limpiarTexto(t).replace(/[<>"]/g, ""); }
    function obtenerFecha() { return new Date().toLocaleString("es-CR"); }
    function obtenerTelefono() {
        var c = obtenerElemento("telefono");
        return c ? "+506 " + limpiarTexto(c.value) : "";
    }

    function descargarArchivo(nombre, contenido) {
        var blob = new Blob([contenido], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url; a.download = nombre;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function guardarServicio(s) { try { localStorage.setItem("servicioTemporalMR", s); } catch(e){} }
    function leerServicio() {
        var s = "";
        try { s = localStorage.getItem("servicioTemporalMR"); } catch(e){}
        if (!s) { var p = new URLSearchParams(window.location.search); s = p.get("servicio"); }
        return textoSeguro(s);
    }
    function borrarServicio() { try { localStorage.removeItem("servicioTemporalMR"); } catch(e){} }

    // MENÚ HAMBURGUESA
    var btnHamb = document.querySelector(".boton-hamburguesa");
    var menu = document.querySelector(".menu");
    if (btnHamb && menu) {
        btnHamb.addEventListener("click", function () {
            var abierto = menu.classList.toggle("menu-activo");
            btnHamb.setAttribute("aria-expanded", abierto);
        });
        menu.querySelectorAll("a").forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                menu.classList.remove("menu-activo");
                btnHamb.setAttribute("aria-expanded", "false");
            });
        });
    }

    // CONTADOR
    var campoMsg = obtenerElemento("mensaje");
    var contador = obtenerElemento("contador");
    if (campoMsg && contador) {
        function actualizar() { contador.textContent = campoMsg.value.length; }
        campoMsg.addEventListener("input", actualizar);
        actualizar();
    }

    // RESALTADO DE CAMPOS
    document.querySelectorAll("input, select, textarea").forEach(function (campo) {
        campo.addEventListener("focus", function () { campo.classList.add("campo-activo"); });
        campo.addEventListener("blur", function () { campo.classList.remove("campo-activo"); });
    });

    // SELECCIÓN DE SERVICIO
    function seleccionarServicio(tarjeta) {
        var s = textoSeguro(tarjeta.getAttribute("data-servicio"));
        if (!s) return alert("No se pudo identificar el servicio.");
        guardarServicio(s);
        window.location.href = "cotizacion.html?servicio=" + encodeURIComponent(s);
    }
    document.querySelectorAll(".tarjeta-servicio").forEach(function (t) {
        t.addEventListener("click", function () { seleccionarServicio(t); });
        t.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); seleccionarServicio(t); }
        });
    });

    // FORM CONTÁCTENOS
    var formC = obtenerElemento("formContactenos");
    if (formC) {
        formC.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!formC.checkValidity()) { formC.reportValidity(); return; }
            var txt = "Formulario de contáctenos - M_R\n--------------------------------\n";
            txt += "Fecha: " + obtenerFecha() + "\n";
            txt += "Nombre: " + textoSeguro(obtenerElemento("nombre").value) + "\n";
            txt += "Correo: " + limpiarTexto(obtenerElemento("correo").value).toLowerCase() + "\n";
            txt += "Teléfono: " + obtenerTelefono() + "\n";
            txt += "Mensaje: " + textoSeguro(obtenerElemento("mensaje").value) + "\n";
            descargarArchivo("contactenos_mr.txt", txt);
            var msg = obtenerElemento("mensajeConfirmacion");
            if (msg) msg.classList.remove("d-none");
            formC.reset();
            if (contador) contador.textContent = "0";
        });
    }

    // FORM COTIZACIÓN
    var formQ = obtenerElemento("formCotizacion");
    if (formQ) {
        var serv = leerServicio();
        var tipo = obtenerElemento("tipo");
        var nomServ = obtenerElemento("nombreServicioFormulario");
        if (serv && tipo) {
            tipo.value = serv;
            if (nomServ) nomServ.textContent = "Servicio preseleccionado: " + serv;
        }
        formQ.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!formQ.checkValidity()) { formQ.reportValidity(); return; }
            var txt = "Formulario de cotización - M_R\n------------------------------\n";
            txt += "Fecha: " + obtenerFecha() + "\n";
            txt += "Nombre: " + textoSeguro(obtenerElemento("nombre").value) + "\n";
            txt += "Correo: " + limpiarTexto(obtenerElemento("correo").value).toLowerCase() + "\n";
            txt += "Teléfono: " + obtenerTelefono() + "\n";
            txt += "Tipo: " + textoSeguro(obtenerElemento("tipo").value) + "\n";
            txt += "Descripción: " + textoSeguro(obtenerElemento("mensaje").value) + "\n";
            descargarArchivo("cotizacion_mr.txt", txt);
            var msg = obtenerElemento("mensajeConfirmacion");
            if (msg) msg.classList.remove("d-none");
            formQ.reset();
            borrarServicio();
            if (contador) contador.textContent = "0";
        });
    }
});
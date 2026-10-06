/* Comunicación de un cambio en las condiciones de trabajo (página /comunicar-cambio/; arts. 5 y 7.3 del RD 723/2026).
   Todo ocurre en este navegador. La vista previa sale del mismo modelo que el PDF (js/doc-model.js → buildChangeModel;
   js/pdf.js → buildPdf, igual que el documento informativo). Los datos de la empresa se leen y se guardan en
   ic:empresa:v1, la misma memoria que el generador (se borra con «Borrar mis datos»); los de la persona trabajadora
   no se guardan. Los datos del usuario se escriben siempre con textContent o value, nunca con innerHTML. */
(function () {
  "use strict";

  var IC = window.__IC__, L = window.__LEGAL__, C = window.__IC_CATALOG__, V = window.__IC_VALIDATE__, M = window.__IC_MODEL__;
  var card = document.getElementById("cambio");
  if (!card || !IC || !L || !C || !V || !M) return;
  var $ = IC.$, el = IC.el, BRAND = window.__BRAND__ || {};
  var KEY_EMPRESA = "ic:empresa:v1";
  var form = $("#form-cambio"), vista = $("#cambio-vista"), lista = $("#m-lista"), anuncio = $("#m-anuncio");
  var btnDescargar = $("#m-descargar"), btnWord = $("#m-word"), btnAbrir = $("#m-abrir"), btnCompartir = $("#m-compartir");
  var FALTA = {
    empresa: "Escribe el nombre de la empresa o de la persona empleadora.",
    nif: "Escribe el NIF.",
    trabajador: "Escribe el nombre de la persona trabajadora.",
    fecha: "Indica desde qué día se aplica el cambio."
  };
  // Todos los apartados menos a) (identidad de las partes): cualquiera de ellos puede cambiar (art. 5.1)
  var APARTADOS = C.APARTADOS.filter(function (a) { return a.id !== "a"; });

  function hoy() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function control(id) { return $("#m-" + id); }
  function anunciar(t) { anuncio.textContent = ""; setTimeout(function () { anuncio.textContent = t; }, 60); }
  function leer() {
    return {
      modoHogar: control("hogar").checked,
      empresaNombre: control("empresa").value.trim(),
      empresaNif: control("nif").value.trim().toUpperCase(),
      trabajadorNombre: control("trabajador").value.trim(),
      trabajadorDni: control("dni").value.trim().toUpperCase(),
      fechaEfecto: control("fecha").value,
      cambios: APARTADOS.filter(function (a) { return $("#m-cambia-" + a.id).checked; })
        .map(function (a) { return { id: a.id, texto: $("#m-texto-" + a.id).value.trim() }; })
    };
  }
  function modelo(d) { return M.buildChangeModel(d, { catalog: C, legal: L, marca: BRAND.name, actualizado: BRAND.updated }); }

  // ---------- Lista «Qué cambia»: una casilla por apartado; al marcarla aparece su texto ----------
  function construirLista() {
    APARTADOS.forEach(function (a) {
      var casilla = el("input", { type: "checkbox", id: "m-cambia-" + a.id, "aria-controls": "m-bloque-" + a.id, "aria-expanded": "false" });
      var texto = el("textarea", { id: "m-texto-" + a.id, maxlength: "1200", rows: "3", "aria-describedby": "m-ayuda-" + a.id + " m-error-" + a.id });
      var bloque = el("div", { class: "field cambio-texto", id: "m-bloque-" + a.id, hidden: true }, [
        el("label", { for: "m-texto-" + a.id, text: "Cómo queda: " + a.id + ") " + a.titulo }),
        el("p", { class: "field-help", id: "m-ayuda-" + a.id, text: a.explica }),
        texto,
        el("p", { class: "field-error", id: "m-error-" + a.id })
      ]);
      casilla.addEventListener("change", function () {
        bloque.hidden = !casilla.checked;
        casilla.setAttribute("aria-expanded", String(casilla.checked));
        if (casilla.checked) texto.focus();
        validarCambios(false);
      });
      lista.append(el("div", { class: "cambio" }, [
        el("label", { class: "check" }, [casilla, el("span", { text: a.id + ") " + a.titulo })]),
        bloque
      ]));
    });
  }

  // ---------- Vista previa: la comunicación se escribe mientras se rellena ----------
  function conHuecos(texto) { // los «[…]» pendientes de rellenar, en gris
    return String(texto).split(/(\[[^\]]+\])/).filter(Boolean).map(function (t) {
      return t.charAt(0) === "[" ? el("span", { class: "hueco", text: t }) : t;
    });
  }
  function pintarVista() {
    var d = leer();
    if (!d.empresaNombre) d.empresaNombre = "[empresa]";
    if (!d.trabajadorNombre) d.trabajadorNombre = "[persona trabajadora]";
    var m = modelo(d);
    var apartados = m.apartados.length ? m.apartados.map(function (a) {
      return el("li", { class: "papel-apartado" }, [
        el("div", { class: "papel-ap-cabecera" }, [el("h4", { text: a.id + ") " + a.titulo })]),
        el("p", { class: "papel-cita", text: a.cita }),
        el("p", {}, conHuecos(a.texto))
      ]);
    }) : [el("li", { class: "papel-apartado" }, [el("p", {}, conHuecos("[marca arriba qué cambia]"))])];
    vista.textContent = "";
    var lg = IC.logo.leer();
    vista.append(el("article", { class: "papel", "aria-label": "Vista previa de la comunicación" }, [
      lg ? el("img", { class: "papel-logo", src: lg.dataUrl, alt: "Logo de la empresa" }) : null,
      el("h3", { text: m.titulo }),
      el("p", { class: "papel-sub", text: m.subtitulo }),
      el("dl", { class: "papel-partes" }, [
        el("div", {}, [el("dt", { text: m.partes.etiquetaEmpresa }), el("dd", {}, conHuecos(m.partes.empresa))]),
        el("div", {}, [el("dt", { text: "Persona trabajadora" }), el("dd", {}, conHuecos(m.partes.trabajador))])
      ]),
      el("p", { class: "papel-intro" }, conHuecos(m.intro)),
      el("ol", { class: "papel-apartados", role: "list" }, apartados),
      el("section", { class: "papel-recibi", "aria-label": "Recibí" }, [
        el("h4", { text: "Recibí" }),
        el("p", { text: m.recibi.texto }),
        el("p", { class: "papel-lugar", text: m.recibi.lugarFecha }),
        el("div", { class: "papel-firmas" }, m.recibi.firmas.map(function (f) { return el("p", { text: f }); }))
      ]),
      el("p", { class: "papel-pie", text: m.pie })
    ]));
  }

  // ---------- Validación ----------
  function marcar(ctrl, caja, msg) {
    caja.textContent = msg;
    if (msg) ctrl.setAttribute("aria-invalid", "true"); else ctrl.removeAttribute("aria-invalid");
    return !msg;
  }
  function validarCampo(id) {
    var v = control(id).value.trim();
    var msg = !v ? FALTA[id] : id === "fecha" && !V.parseFecha(v) ? "La fecha no es válida." : "";
    return marcar(control(id), $("#m-" + id + "-error"), msg);
  }
  // Devuelve el primer control con error (o null). Con «mostrar», también pinta los mensajes.
  function validarCambios(mostrar) {
    var marcados = APARTADOS.filter(function (a) { return $("#m-cambia-" + a.id).checked; });
    var primero = null;
    var msgLista = marcados.length ? "" : "Marca al menos un apartado que cambie.";
    if (mostrar || !msgLista) $("#m-cambios-error").textContent = msgLista;
    if (msgLista) primero = $("#m-cambia-" + APARTADOS[0].id);
    marcados.forEach(function (a) {
      var t = $("#m-texto-" + a.id), msg = t.value.trim() ? "" : "Escribe cómo queda este apartado.";
      if (mostrar || t.hasAttribute("aria-invalid")) marcar(t, $("#m-error-" + a.id), msg);
      if (msg && !primero) primero = t;
    });
    return primero;
  }
  function listos() {
    var faltan = Object.keys(FALTA).filter(function (id) { return !validarCampo(id); });
    var enCambios = validarCambios(true);
    var primero = faltan.length ? control(faltan[0]) : enCambios;
    if (!primero) return true;
    primero.focus();
    anunciar("Faltan datos para crear la comunicación. Revisa los campos marcados.");
    return false;
  }
  function avisos() {
    var dni = control("dni").value.trim(), cajaDni = $("#m-dni-aviso");
    cajaDni.textContent = "";
    if (dni && !V.dniValido(dni)) cajaDni.append(IC.aviso("warn", "Revisa el DNI o NIE: el número y la letra no coinciden."));
    var f = control("fecha").value, cajaFecha = $("#m-fecha-aviso");
    cajaFecha.textContent = "";
    if (f && V.parseFecha(f) && f < hoy()) {
      cajaFecha.append(IC.aviso("warn", "Esa fecha ya ha pasado: la comunicación tenía que entregarse como tarde ese día (art. 7.3). Entrégala cuanto antes."));
    }
  }

  // ---------- Empresa: se lee y se guarda en la misma memoria que el generador ----------
  function leerEmpresa() { try { return JSON.parse(localStorage.getItem(KEY_EMPRESA)) || {}; } catch (e) { return {}; } }
  function guardarEmpresa() {
    var d = leer(), e = leerEmpresa();
    if (!d.empresaNombre && !d.empresaNif) return;
    e.modoHogar = d.modoHogar; e.empresaNombre = d.empresaNombre; e.empresaNif = d.empresaNif;
    try { localStorage.setItem(KEY_EMPRESA, JSON.stringify(e)); } catch (err) { /* modo privado: sin memoria */ }
  }

  // ---------- PDF: se crea una vez por versión de los datos ----------
  var hecho = null; // { clave, blob, nombre, file, usado }
  function crear(d) {
    var lg = IC.logo.leer(), clave = JSON.stringify(d) + (lg ? lg.dataUrl.length + lg.dataUrl.slice(-40) : "");
    if (hecho && hecho.clave === clave) return hecho;
    var blob = window.__IC_PDF__.buildPdf(modelo(d), { jsPDF: window.jspdf.jsPDF, marca: BRAND.name, logo: IC.logo.leer() }).output("blob");
    var nombre = "comunicacion-cambio-" + (IC.pdf.slug(d.trabajadorNombre) || "trabajador") + "-" + d.fechaEfecto + ".pdf";
    hecho = { clave: clave, blob: blob, nombre: nombre, file: typeof File === "function" ? new File([blob], nombre, { type: "application/pdf" }) : null, usado: false };
    return hecho;
  }
  // «cambio_generado» cuenta una vez por versión de los datos, se descargue en PDF, en Word o en los dos
  var contado = null;
  function contar(d) {
    var clave = JSON.stringify(d);
    if (contado === clave) return;
    contado = clave;
    if (window.__track) window.__track("cambio_generado");
  }
  // Word (.docx) con el mismo modelo que el PDF (js/docx.js), por si hay que retocarla antes de entregarla
  function descargarWord() {
    if (!listos()) return;
    var d = leer();
    IC.pdf.cargarWord().then(function () {
      var D = window.__IC_DOCX__;
      IC.pdf.descargar(new Blob([D.buildDocx(modelo(d))], { type: D.MIME }), "comunicacion-cambio-" + (IC.pdf.slug(d.trabajadorNombre) || "trabajador") + "-" + d.fechaEfecto + ".docx");
      contar(d);
      anunciar("Comunicación descargada en Word. Revísala antes de entregarla y guarda el recibí firmado.");
    }).catch(function (e) {
      console.warn("[cambio docx]", e);
      anunciar("No se ha podido crear el Word en este navegador. Descarga el PDF.");
    });
  }
  var ocupado = false;
  function ocupar(si) {
    ocupado = si;
    [btnDescargar, btnAbrir, btnCompartir].forEach(function (b) {
      if (si) b.setAttribute("aria-disabled", "true"); else b.removeAttribute("aria-disabled");
    });
  }
  function conPdf(accion) {
    if (ocupado) return Promise.resolve(false);
    card.setAttribute("data-state", "working");
    ocupar(true);
    return IC.pdf.cargar().then(function () {
      var r = crear(leer());
      accion(r);
      if (!r.usado) { r.usado = true; contar(leer()); }
      card.setAttribute("data-state", "done");
      btnDescargar.textContent = "Descargar la comunicación en PDF (" + IC.pdf.tamano(r.blob.size) + ")";
      return true;
    }).catch(function (e) {
      console.warn("[cambio]", e);
      card.setAttribute("data-state", "error");
      anunciar("No se ha podido crear el PDF en este navegador. Puedes imprimir la comunicación desde la vista previa.");
      return false;
    }).then(function (ok) { ocupar(false); return ok; });
  }
  // Alternativa si el PDF falla: imprimir la vista previa con el menú del navegador
  function imprimirVista() {
    pintarVista();
    var hoja = el("div", { id: "impresion" }, [$(".papel", vista).cloneNode(true)]);
    document.body.append(hoja);
    document.body.classList.add("imprimir-papel");
    var fin = function () { document.body.classList.remove("imprimir-papel"); hoja.remove(); window.removeEventListener("afterprint", fin); };
    window.addEventListener("afterprint", fin);
    window.print();
  }

  // ---------- Eventos ----------
  var tVista;
  form.addEventListener("input", function (ev) {
    var id = (ev.target.id || "").replace(/^m-/, "");
    if (FALTA[id] && ev.target.hasAttribute("aria-invalid")) validarCampo(id);
    if (/^texto-/.test(id) && ev.target.hasAttribute("aria-invalid")) validarCambios(false);
    if (id === "dni" || id === "fecha") avisos();
    if (id === "empresa" || id === "nif" || id === "hogar") guardarEmpresa();
    if (card.getAttribute("data-state") !== "idle") {
      card.setAttribute("data-state", "idle");
      btnDescargar.textContent = "Descargar la comunicación en PDF";
    }
    clearTimeout(tVista);
    tVista = setTimeout(pintarVista, 120);
  });
  form.addEventListener("change", function (ev) { if (ev.target.type === "checkbox") pintarVista(); });
  form.addEventListener("focusin", function () { IC.pdf.cargar().catch(function () { /* se reintenta al pulsar */ }); }, { once: true });
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!listos()) return;
    conPdf(function (r) {
      IC.pdf.descargar(r.blob, r.nombre);
      anunciar("Comunicación descargada. Entrega un ejemplar y guarda el otro con el recibí firmado.");
    });
  });
  btnAbrir.addEventListener("click", function () {
    if (!listos()) return;
    var ventana = window.open("", "_blank"); // se abre ya, dentro del clic, para que no la bloquee el navegador
    conPdf(function (r) {
      if (ventana) ventana.location.href = URL.createObjectURL(r.blob); else IC.pdf.descargar(r.blob, r.nombre);
    }).then(function (ok) { if (!ok && ventana) ventana.close(); });
  });
  btnCompartir.addEventListener("click", function () {
    if (!listos()) return;
    conPdf(function (r) {
      navigator.share({ files: [r.file], title: "Comunicación de un cambio de condiciones de trabajo" }).catch(function (e) {
        if (e && e.name !== "AbortError") console.warn("[compartir]", e);
      });
    });
  });
  btnWord.addEventListener("click", descargarWord);
  $("#m-imprimir-vista").addEventListener("click", imprimirVista);

  // ---------- Arranque ----------
  function init() {
    construirLista();
    $(".acciones-doc", form).before(IC.logo.campo("m-logo", function () { hecho = null; pintarVista(); }));
    var e = leerEmpresa();
    control("hogar").checked = !!e.modoHogar;
    if (e.empresaNombre) control("empresa").value = e.empresaNombre;
    if (e.empresaNif) control("nif").value = e.empresaNif;
    btnCompartir.hidden = !IC.pdf.puedeCompartir();
    form.hidden = false;
    vista.hidden = false;
    pintarVista();
  }
  IC.safe(init, "cambio");
})();

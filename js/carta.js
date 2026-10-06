/* Carta para pedir a la empresa la información del RD 723/2026 (página /solicitar-informacion/).
   Todo ocurre en este navegador. La carta se escribe mientras se rellena: la vista previa sale del mismo
   modelo que el PDF (js/doc-model.js → buildLetterModel; js/pdf.js → buildLetterPdf).
   Los datos solo se guardan si se marca «Recordar mis datos en este dispositivo» (ic:carta:v1).
   Los datos del usuario se escriben siempre con textContent o value, nunca con innerHTML. */
(function () {
  "use strict";

  var IC = window.__IC__, L = window.__LEGAL__, V = window.__IC_VALIDATE__, M = window.__IC_MODEL__;
  var card = document.getElementById("carta");
  if (!card || !IC || !L || !V || !M) return;
  var $ = IC.$, el = IC.el, BRAND = window.__BRAND__ || {};
  var KEY = "ic:carta:v1";
  var form = $("#form-carta"), vista = $("#carta-vista"), recordar = $("#c-recordar"), anuncio = $("#c-anuncio");
  var btnDescargar = $("#c-descargar"), btnWord = $("#c-word"), btnAbrir = $("#c-abrir"), btnCompartir = $("#c-compartir");
  var CAMPOS = ["nombre", "dni", "empresa", "fechaAlta", "lugar"];
  var FALTA = {
    nombre: "Escribe tu nombre y apellidos.",
    empresa: "Escribe el nombre de la empresa.",
    fechaAlta: "Indica la fecha en que empezaste (o empezarás) a trabajar.",
    lugar: "Escribe la localidad desde la que firmas."
  };
  var HUECO = { nombre: "[tu nombre]", empresa: "[nombre de la empresa]", lugar: "[localidad]" };

  function hoy() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function control(id) { return $("#c-" + id); }
  function leer() { var d = {}; CAMPOS.forEach(function (id) { d[id] = control(id).value.trim(); }); return d; }
  function anunciar(t) { anuncio.textContent = ""; setTimeout(function () { anuncio.textContent = t; }, 60); }
  function modelo(d, huecos) {
    var datos = Object.assign({}, d);
    if (huecos) Object.keys(HUECO).forEach(function (k) { if (!datos[k]) datos[k] = HUECO[k]; });
    return M.buildLetterModel(datos, { legal: L, hoy: hoy(), marca: BRAND.name });
  }

  // ---------- Vista previa: la carta se escribe mientras se rellena ----------
  function conHuecos(texto) { // los «[…]» pendientes de rellenar, en gris
    return String(texto).split(/(\[[^\]]+\])/).filter(Boolean).map(function (t) {
      return t.charAt(0) === "[" ? el("span", { class: "hueco", text: t }) : t;
    });
  }
  function pintarVista() {
    var c = modelo(leer(), true);
    var hijos = [
      el("p", { class: "carta-fecha" }, conHuecos(c.lugarFecha)),
      el("p", {}, conHuecos(c.destinatario)),
      el("p", { class: "carta-asunto" }, conHuecos(c.asunto))
    ].concat(c.parrafos.map(function (p) { return el("p", {}, conHuecos(p)); }), [
      el("p", { text: c.despedida }),
      el("div", { class: "carta-firma" }, c.firma.map(function (f) { return el("p", {}, conHuecos(f)); })),
      el("div", { class: "carta-recepcion" }, [el("p", { text: c.recepcion.titulo })].concat(c.recepcion.lineas.map(function (l) { return el("p", { text: l }); }))),
      el("p", { class: "papel-pie", text: c.pie })
    ]);
    vista.textContent = "";
    vista.append(el("article", { class: "papel papel--carta", "aria-label": "Vista previa de la carta" }, hijos));
  }

  // ---------- Validación ----------
  function validarCampo(id, d) {
    var msg = !d[id] ? FALTA[id] : id === "fechaAlta" && !V.parseFecha(d[id]) ? "La fecha no es válida." : "";
    $("#c-" + id + "-error").textContent = msg;
    if (msg) control(id).setAttribute("aria-invalid", "true"); else control(id).removeAttribute("aria-invalid");
    return !msg;
  }
  function listos() {
    var d = leer(), faltan = Object.keys(FALTA).filter(function (id) { return !validarCampo(id, d); });
    if (!faltan.length) return true;
    control(faltan[0]).focus();
    anunciar(faltan.length === 1 ? "Falta un dato para crear la carta." : "Faltan " + faltan.length + " datos para crear la carta.");
    return false;
  }
  function avisoDni() {
    var v = control("dni").value.trim(), caja = $("#c-dni-aviso");
    caja.textContent = "";
    if (v && !V.dniValido(v)) caja.append(IC.aviso("warn", "Revisa el DNI o NIE: el número y la letra no coinciden."));
  }

  // ---------- PDF: se crea una vez por versión de los datos ----------
  var carta = null; // { clave, blob, nombre, file, usado }
  function crear(d) {
    var clave = JSON.stringify(d) + hoy();
    if (carta && carta.clave === clave) return carta;
    var blob = window.__IC_PDF__.buildLetterPdf(modelo(d, false), { jsPDF: window.jspdf.jsPDF, marca: BRAND.name }).output("blob");
    var nombre = "carta-solicitud-informacion-" + (IC.pdf.slug(d.nombre) || "trabajador") + "-" + hoy() + ".pdf";
    carta = { clave: clave, blob: blob, nombre: nombre, file: typeof File === "function" ? new File([blob], nombre, { type: "application/pdf" }) : null, usado: false };
    return carta;
  }
  // «carta_generada» cuenta una vez por versión de los datos, se descargue en PDF, en Word o en los dos
  var contada = null;
  function contar(d) {
    var clave = JSON.stringify(d) + hoy();
    if (contada === clave) return;
    contada = clave;
    if (window.__track) window.__track("carta_generada");
  }
  // Word (.docx) con el mismo modelo que el PDF (js/docx.js), por si hay que retocarla
  function descargarWord() {
    if (!listos()) return;
    var d = leer();
    IC.pdf.cargarWord().then(function () {
      var D = window.__IC_DOCX__;
      IC.pdf.descargar(new Blob([D.buildLetterDocx(modelo(d, false))], { type: D.MIME }), "carta-solicitud-informacion-" + (IC.pdf.slug(d.nombre) || "trabajador") + "-" + hoy() + ".docx");
      contar(d);
      anunciar("Carta descargada en Word. Imprime dos copias, fírmalas y entrega una en la empresa.");
    }).catch(function (e) {
      console.warn("[carta docx]", e);
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
  function conCarta(accion) {
    if (ocupado) return Promise.resolve(false);
    card.setAttribute("data-state", "working");
    ocupar(true);
    return IC.pdf.cargar().then(function () {
      var r = crear(leer());
      accion(r);
      if (!r.usado) { r.usado = true; contar(leer()); }
      card.setAttribute("data-state", "done");
      btnDescargar.textContent = "Descargar la carta en PDF (" + IC.pdf.tamano(r.blob.size) + ")";
      return true;
    }).catch(function (e) {
      console.warn("[carta]", e);
      card.setAttribute("data-state", "error");
      anunciar("No se ha podido crear el PDF en este navegador. Puedes imprimir la carta desde la vista previa.");
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

  // ---------- Memoria, solo si se pide ----------
  function recordarDatos() {
    try {
      if (recordar.checked) localStorage.setItem(KEY, JSON.stringify(leer()));
      else localStorage.removeItem(KEY);
    } catch (e) { /* modo privado: sin memoria */ }
  }

  // ---------- Eventos ----------
  var tVista;
  form.addEventListener("input", function (ev) {
    var id = (ev.target.id || "").replace(/^c-/, "");
    if (FALTA[id] && ev.target.hasAttribute("aria-invalid")) validarCampo(id, leer());
    if (id === "dni") avisoDni();
    if (card.getAttribute("data-state") !== "idle") {
      card.setAttribute("data-state", "idle");
      btnDescargar.textContent = "Descargar la carta en PDF";
    }
    clearTimeout(tVista);
    tVista = setTimeout(pintarVista, 120);
    recordarDatos();
  });
  form.addEventListener("focusin", function () { IC.pdf.cargar().catch(function () { /* se reintenta al pulsar */ }); }, { once: true });
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!listos()) return;
    conCarta(function (r) {
      IC.pdf.descargar(r.blob, r.nombre);
      anunciar("Carta descargada. Imprime dos copias, fírmalas y entrega una en la empresa.");
    });
  });
  btnWord.addEventListener("click", descargarWord);
  btnAbrir.addEventListener("click", function () {
    if (!listos()) return;
    var ventana = window.open("", "_blank"); // se abre ya, dentro del clic, para que no la bloquee el navegador
    conCarta(function (r) {
      if (ventana) ventana.location.href = URL.createObjectURL(r.blob); else IC.pdf.descargar(r.blob, r.nombre);
    }).then(function (ok) { if (!ok && ventana) ventana.close(); });
  });
  btnCompartir.addEventListener("click", function () {
    if (!listos()) return;
    conCarta(function (r) {
      navigator.share({ files: [r.file], title: "Carta para pedir la información laboral" }).catch(function (e) {
        if (e && e.name !== "AbortError") console.warn("[compartir]", e);
      });
    });
  });
  $("#c-imprimir-vista").addEventListener("click", imprimirVista);

  // ---------- Arranque ----------
  function init() {
    try {
      var guardado = JSON.parse(localStorage.getItem(KEY));
      if (guardado) {
        CAMPOS.forEach(function (id) { if (guardado[id]) control(id).value = guardado[id]; });
        recordar.checked = true;
      }
    } catch (e) { /* sin memoria */ }
    btnCompartir.hidden = !IC.pdf.puedeCompartir();
    $("#c-antes-vigor").hidden = hoy() >= L.norma.vigor;
    form.hidden = false;
    vista.hidden = false;
    avisoDni();
    pintarVista();
  }
  IC.safe(init, "carta");
})();

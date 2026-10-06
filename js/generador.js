/* Generador por pasos del documento informativo del RD 723/2026 (portada).
   Pinta los campos desde el catálogo (js/doc-catalog.js), valida con js/doc-validate.js y monta el
   documento con js/doc-model.js. Todo ocurre en este navegador: nada se envía a ningún servidor.
   Modelo: `datos` guarda solo lo que la persona ha escrito; lo que se ve es C.withDefaults(datos), así
   los textos propuestos cambian solos al activar el modo hogar mientras nadie los haya tocado.
   Memoria local: ic:empresa:v1 (empresa, para el siguiente contrato) e ic:borrador:v1 (documento a medias).
   Los datos del usuario se escriben siempre con textContent o value, nunca con innerHTML. */
(function () {
  "use strict";

  var IC = window.__IC__, C = window.__IC_CATALOG__, L = window.__LEGAL__, V = window.__IC_VALIDATE__, M = window.__IC_MODEL__;
  var card = document.getElementById("generador");
  if (!card || !IC || !C || !L || !V || !M) return;
  var $ = IC.$, $$ = IC.$$;
  var BRAND = window.__BRAND__ || {};
  var TOTAL = C.PASOS.length;

  // ---------- Memoria en este navegador (modo privado o almacenamiento bloqueado: sin memoria, sin fallos) ----------
  var KEY_EMPRESA = "ic:empresa:v1", KEY_BORRADOR = "ic:borrador:v1";
  var memoria = {
    leer: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    guardar: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin memoria */ } },
    borrar: function (k) { try { localStorage.removeItem(k); } catch (e) { /* sin memoria */ } }
  };

  // ---------- Estado ----------
  var datos = {};        // solo lo que la persona ha escrito
  var actual = 1;        // paso visible
  var alcanzado = 1;     // paso más avanzado al que se ha llegado pasando la validación
  var conError = {};     // campos marcados al pulsar «Siguiente»: solo esos se revalidan al escribir
  var CAMPO = {};        // id → definición del catálogo
  var UI = {};           // id → { wrap, control, etiqueta, ayuda, error, aviso }
  C.CAMPOS.forEach(function (c) { CAMPO[c.id] = c; });

  var INTRO = {
    1: "Quién contrata. Se guarda en este navegador para el próximo contrato. Todos los datos son obligatorios salvo los marcados como opcionales.",
    2: "Quién va a trabajar, desde cuándo y en qué.",
    3: "Lo que cobrará y cómo se le paga.",
    4: "Horas, horario, horas extra y vacaciones.",
    5: "El resto de condiciones que pide la ley. Varios campos traen un texto propuesto a partir de la norma: puedes dejarlo tal cual.",
    6: "Comprueba el documento. Puedes volver a cualquier apartado para cambiarlo."
  };
  // Campos que comparten fila: la cantidad y su unidad
  var PAREJA = { pruebaCantidad: "pruebaUnidad", salarioBase: "salarioPeriodo", horasSemanales: "tipoJornada", vacacionesDias: "vacacionesUnidad" };

  // ---------- Utilidades de DOM (main.js) ----------
  var el = IC.el, icono = IC.icono, aviso = IC.aviso;
  function enlaceExterno(url, texto) {
    return el("a", { href: url, target: "_blank", rel: "noopener" }, [texto, el("span", { class: "sr-only", text: " (se abre en una pestaña nueva)" })]);
  }
  function flag(v, d) { return typeof v === "function" ? !!v(d) : v === undefined ? true : !!v; }
  function vista() { return C.withDefaults(datos); }
  function textoDe(c, d, campo) { return (d.modoHogar && c[campo + "Hogar"]) || c[campo]; }
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Construcción de los pasos ----------
  var pasosEl = $("#pasos"), form = $("#form-generador");
  var btnAnterior = $("#btn-anterior"), btnSiguiente = $("#btn-siguiente");
  var anuncio = $("#anuncio"), barra = $("#progreso-barra");
  var tira = {};
  $$("#tira li").forEach(function (li) { tira[li.getAttribute("data-ap")] = li; });
  var FIELDSET = {}, GRUPOS = [];
  var resumen = el("div", { class: "notice notice--error error-summary", role: "alert", tabindex: "-1", hidden: true });
  var avisoHogar = aviso("info", C.TEXTOS.hogarAviso, { class: "notice aviso-hogar", hidden: true });
  var recuperado = aviso("ok", "Datos de la empresa recuperados de este navegador.", { hidden: true });
  var ayudaConvenio = el("div", { class: "notice ayuda-convenio" });
  var bloqueo = el("div", { class: "notice notice--error bloqueo", hidden: true });
  var paso6 = {}; // piezas del paso 6: avisos, acciones, estados y el papel (ver construirPaso6)

  function crearControl(c, id) {
    if (c.tipo === "textarea") {
      return el("textarea", { id: id, name: c.id, rows: c.defecto && c.defecto.length > 200 ? 7 : 4, maxlength: c.max, placeholder: c.ejemplo });
    }
    if (c.tipo === "select") {
      var s = el("select", { id: id, name: c.id });
      var ops = c.opciones === "provincias" ? L.provincias.map(function (p) { return { valor: p.nombre, texto: p.nombre }; }) : c.opciones;
      if (c.defecto === undefined) s.append(el("option", { value: "", text: c.opciones === "provincias" ? "Elige una provincia" : "Elige una opción" }));
      ops.forEach(function (o) { s.append(el("option", { value: o.valor, text: o.texto })); });
      return s;
    }
    if (c.tipo === "date") return el("input", { id: id, name: c.id, type: "date" });
    var entero = c.tipo === "number" && c.incremento === 1;
    return el("input", {
      id: id, name: c.id, type: "text", maxlength: c.tipo === "number" ? undefined : c.max, placeholder: c.ejemplo,
      inputmode: c.tipo === "number" ? (entero ? "numeric" : "decimal") : undefined,
      autocomplete: c.autocomplete || "off",
      autocapitalize: /Nif|Dni/.test(c.id) ? "characters" : undefined, spellcheck: /Nif|Dni|Codigo/.test(c.id) ? "false" : undefined
    });
  }

  function crearCampo(c) {
    var id = "f-" + c.id, u = { error: el("p", { class: "field-error", id: id + "-error" }), aviso: el("div", { class: "field-aviso", id: id + "-aviso" }) };
    if (c.tipo === "lista") return crearLista(c, u);
    u.ayuda = c.ayuda ? el("p", { class: "field-help", id: id + "-ayuda" }) : null;
    if (c.tipo === "checkbox") {
      u.control = el("input", { type: "checkbox", id: id, name: c.id });
      u.etiqueta = el("span");
      u.wrap = el("div", { class: "field field--check" + (c.id === "modoHogar" ? " opcion" : ""), "data-campo": c.id }, [
        el("label", { class: "check", for: id }, [u.control, u.etiqueta]), u.ayuda, u.error, u.aviso
      ]);
    } else {
      u.control = crearControl(c, id);
      u.etiqueta = el("label", { for: id });
      var sufijo = c.sufijo ? el("span", { class: "sufijo", id: id + "-sufijo", text: c.sufijo }) : null;
      u.wrap = el("div", { class: "field", "data-campo": c.id }, [
        u.etiqueta, u.ayuda, sufijo ? el("div", { class: "input-sufijo" }, [u.control, sufijo]) : u.control, u.error, u.aviso
      ]);
    }
    u.control.setAttribute("aria-describedby", [u.ayuda && u.ayuda.id, c.sufijo && id + "-sufijo", u.error.id, u.aviso.id].filter(Boolean).join(" "));
    return u;
  }

  // Complementos salariales: filas de nombre + importe que se añaden y se quitan
  function crearLista(c, u) {
    var id = "f-" + c.id;
    u.etiqueta = el("p", { class: "field-label", id: id + "-titulo" });
    u.ayuda = c.ayuda ? el("p", { class: "field-help", id: id + "-ayuda" }) : null;
    u.filas = el("div", { class: "lista-filas" });
    u.anadir = el("button", { type: "button", class: "btn btn--secondary btn--small", text: "Añadir complemento" });
    u.wrap = el("div", { class: "field", role: "group", "aria-labelledby": id + "-titulo", "data-campo": c.id }, [u.etiqueta, u.ayuda, u.filas, u.anadir, u.error, u.aviso]);
    u.control = u.anadir;
    u.anadir.addEventListener("click", function () {
      datos[c.id] = (datos[c.id] || []).concat([{ nombre: "", importe: "" }]);
      pintarLista(c);
      var filas = $$(".lista-fila", u.filas);
      $("input", filas[filas.length - 1]).focus();
      guardarPronto();
    });
    return u;
  }
  function pintarLista(c) {
    var u = UI[c.id], items = datos[c.id] || [];
    u.filas.textContent = "";
    items.forEach(function (item, i) {
      var n = i + 1, sub = c.subcampos;
      var nombre = el("input", { type: "text", id: "f-" + c.id + "-" + i + "-nombre", maxlength: sub[0].max, placeholder: sub[0].ejemplo, autocomplete: "off", "data-lista": c.id, "data-i": i, "data-sub": "nombre" });
      var importe = el("input", { type: "text", id: "f-" + c.id + "-" + i + "-importe", inputmode: "decimal", placeholder: sub[1].ejemplo, autocomplete: "off", "data-lista": c.id, "data-i": i, "data-sub": "importe" });
      nombre.value = item.nombre || "";
      importe.value = item.importe === undefined || item.importe === "" ? "" : String(item.importe).replace(".", ",");
      var quitar = el("button", { type: "button", class: "btn btn--link", text: "Quitar", "aria-label": "Quitar el complemento " + n });
      quitar.addEventListener("click", function () {
        datos[c.id] = items.filter(function (_, j) { return j !== i; });
        pintarLista(c);
        (datos[c.id].length ? $("input", u.filas) : u.anadir).focus();
        refrescar();
        guardarPronto();
      });
      u.filas.append(el("div", { class: "lista-fila" }, [
        el("div", { class: "field" }, [el("label", { for: nombre.id, text: sub[0].label + " " + n }), nombre]),
        el("div", { class: "field" }, [el("label", { for: importe.id, text: "Importe (€/mes)" }), importe]),
        quitar
      ]));
    });
    u.anadir.hidden = items.length >= c.maxItems;
  }

  function construir() {
    C.PASOS.forEach(function (p) {
      var legend = el("legend", { tabindex: "-1", text: p.titulo });
      var fs = el("fieldset", { class: "paso", id: "paso-" + p.n, hidden: true }, [legend, el("p", { class: "paso-intro", text: INTRO[p.n] })]);
      var grupoActual = null, fila = null;
      C.CAMPOS.filter(function (c) { return c.paso === p.n; }).forEach(function (c) {
        if (c.grupo && c.grupo !== (grupoActual && grupoActual.nombre)) {
          grupoActual = { nombre: c.grupo, h: el("h3", { class: "grupo", text: c.grupo }), campos: [] };
          GRUPOS.push(grupoActual);
          fs.append(grupoActual.h);
          if (c.grupo === "Convenio colectivo") fs.append(ayudaConvenio);
        }
        var u = UI[c.id] = crearCampo(c);
        if (grupoActual) grupoActual.campos.push(c.id);
        if (PAREJA[c.id]) {
          // La pareja comparte fila; su ayuda y sus mensajes van debajo, a todo lo ancho
          fila = { rejilla: el("div", { class: "field-row" }), mensajes: el("div", { class: "field-row-mensajes" }) };
          u.fila = fila;
          fila.rejilla.append(u.wrap);
          [u.ayuda, u.error, u.aviso].filter(Boolean).forEach(function (n) { fila.mensajes.append(n); });
          fs.append(el("div", { class: "field-pair" }, [fila.rejilla, fila.mensajes]));
          fila.primero = c.id;
          return;
        }
        if (fila && PAREJA[fila.primero] === c.id) {
          u.fila = fila;
          fila.rejilla.append(u.wrap);
          [u.ayuda, u.error, u.aviso].filter(Boolean).forEach(function (n) { fila.mensajes.append(n); });
          fila = null;
          return;
        }
        fs.append(u.wrap);
        if (c.id === "modoHogar") fs.append(avisoHogar);
        if (c.id === "duracionPrevista") fs.append(bloqueo);
      });
      if (p.n === 1) $(".paso-intro", fs).after(recuperado);
      if (p.n === TOTAL) construirPaso6(fs);
      FIELDSET[p.n] = fs;
      pasosEl.append(fs);
    });
  }

  // ---------- Valores: de `datos` a la pantalla y al revés ----------
  function mostrarValor(c, v) {
    var u = UI[c.id];
    if (c.tipo === "lista") return pintarLista(c);
    if (c.tipo === "checkbox") u.control.checked = !!v;
    else u.control.value = v === undefined || v === null ? "" : (typeof v === "number" ? String(v).replace(".", ",") : v);
  }
  function pintarValores(soloNoTocados) {
    var d = vista();
    C.CAMPOS.forEach(function (c) {
      if (soloNoTocados && datos[c.id] !== undefined) return;
      mostrarValor(c, d[c.id]);
    });
  }
  function leerValor(c, control) {
    if (c.tipo === "checkbox") return control.checked;
    if (c.tipo === "number") return V.parseNumero(control.value);
    return control.value;
  }

  // ---------- Refresco de lo que depende de los datos ----------
  function erroresPaso(n) { return V.validate(datos, { catalog: C, legal: L, paso: n }).errors; }

  function refrescar() {
    var d = vista();
    C.CAMPOS.forEach(function (c) {
      var u = UI[c.id];
      u.etiqueta.textContent = textoDe(c, d, "label");
      if (u.ayuda) u.ayuda.textContent = textoDe(c, d, "ayuda");
      u.wrap.hidden = !flag(c.visible, d);
    });
    // Filas de pareja y subtítulos: se ocultan si no queda nada visible dentro
    $$(".field-pair", pasosEl).forEach(function (f) { f.hidden = !$$(".field", f).some(function (w) { return !w.hidden; }); });
    GRUPOS.forEach(function (g) { g.h.hidden = !g.campos.some(function (id) { return !UI[id].wrap.hidden; }); });
    avisoHogar.hidden = !d.modoHogar;
    ayudaConvenio.hidden = !!d.modoHogar;
    pintarAyudaConvenio(d);
    pintarBloqueo();
    actualizarProgreso();
    avisosPronto();
  }

  function pintarAyudaConvenio(d) {
    var prov = L.provincias.filter(function (p) { return p.nombre === d.provincia; })[0];
    var ca = prov && L.ccaa[prov.ccaa];
    var clave = ca ? prov.ccaa : "-";
    if (ayudaConvenio.getAttribute("data-ccaa") === clave) return;
    ayudaConvenio.setAttribute("data-ccaa", clave);
    ayudaConvenio.textContent = "";
    var partes = ["¿No sabes cuál es tu convenio? Búscalo en el ", enlaceExterno(L.enlaces.regcon, "buscador de convenios estatales del Ministerio de Trabajo")];
    if (ca) partes.push(", en el ", enlaceExterno(ca.url, ca.fuente));
    partes.push(" o, si es de una sola provincia, en el boletín oficial de esa provincia (", enlaceExterno(L.enlaces.boletines, "lista de boletines"), ").");
    ayudaConvenio.append(icono("info"), el("span", {}, partes));
  }

  // Contratos de 4 semanas o menos: explicación y «Siguiente» desactivado mientras dure (art. 2.2)
  function pintarBloqueo() {
    var e = erroresPaso(2).filter(function (x) { return x.code === "DURACION_4_SEMANAS"; })[0];
    bloqueo.hidden = !e;
    btnSiguiente.disabled = !!e && actual === 2;
    if (!e || bloqueo.getAttribute("data-msg") === e.mensaje) return;
    bloqueo.setAttribute("data-msg", e.mensaje);
    bloqueo.textContent = "";
    bloqueo.append(icono("error"), el("span", {}, [e.mensaje + " ", el("a", { href: "rd-723-2026/#a-quien", text: "Qué dice la norma" })]));
  }

  // La tira a–q: rellenas las letras de los pasos ya superados y válidos; marcadas las del paso en curso
  function actualizarProgreso() {
    var p = C.PASOS[actual - 1], texto = "Paso " + actual + " de " + TOTAL + ": " + p.titulo;
    $("#progreso-paso").textContent = texto;
    barra.setAttribute("aria-valuenow", actual);
    barra.setAttribute("aria-valuetext", texto);
    var valido = {}, hechos = 0;
    for (var n = 1; n < TOTAL; n++) valido[n] = alcanzado > n && erroresPaso(n).length === 0;
    C.APARTADOS.forEach(function (ap) {
      var hecho = !!valido[ap.completoTrasPaso];
      tira[ap.id].classList.toggle("is-done", hecho);
      tira[ap.id].classList.toggle("is-current", !hecho && ap.completoTrasPaso === actual);
      if (hecho) hechos++;
    });
    $("#progreso-apartados").textContent = hechos + " de " + C.APARTADOS.length + " apartados";
    return hechos;
  }

  // Avisos que no bloquean (salario mínimo, periodo de prueba…), bajo su campo y con un pequeño retardo
  var tAvisos;
  function avisosPronto() { clearTimeout(tAvisos); tAvisos = setTimeout(pintarAvisos, 350); }
  // El aviso de salario mínimo depende también de las horas (paso 4): se muestra en los dos sitios
  var TAMBIEN_EN = { BAJO_SMI: ["horasSemanales"] };
  function pintarAvisos() {
    C.CAMPOS.forEach(function (c) { UI[c.id].aviso.textContent = ""; });
    V.validate(datos, { catalog: C, legal: L }).warnings.forEach(function (w) {
      if (w.code === "HOGAR") return;
      [w.campo].concat(TAMBIEN_EN[w.code] || []).forEach(function (id) {
        if (UI[id] && !UI[id].wrap.hidden) UI[id].aviso.append(aviso("warn", w.mensaje));
      });
    });
  }

  // ---------- Errores ----------
  function controlDeError(e) {
    var u = UI[e.campo];
    if (!u) return null;
    if (e.indice !== undefined) {
      var fila = $$(".lista-fila", u.filas)[e.indice];
      return fila ? $(e.code === "REQUERIDO" ? '[data-sub="nombre"]' : '[data-sub="importe"]', fila) : u.control;
    }
    return u.control;
  }
  function pintarErrores(errs) {
    $$("[aria-invalid]", FIELDSET[actual]).forEach(function (n) { n.removeAttribute("aria-invalid"); });
    C.CAMPOS.forEach(function (c) { if (c.paso === actual) UI[c.id].error.textContent = ""; });
    errs.forEach(function (e) {
      var ctrl = controlDeError(e);
      if (ctrl) ctrl.setAttribute("aria-invalid", "true");
      var p = UI[e.campo] && UI[e.campo].error;
      if (p) p.textContent = (p.textContent ? p.textContent + " " : "") + e.mensaje;
    });
    pintarResumen(errs);
  }
  function pintarResumen(errs) {
    resumen.textContent = "";
    resumen.hidden = !errs.length;
    if (!errs.length) return;
    var lista = el("ul");
    errs.forEach(function (e) {
      var a = el("a", { href: "#" + (controlDeError(e) || {}).id, text: e.mensaje });
      a.addEventListener("click", function (ev) { var c = controlDeError(e); if (c) { ev.preventDefault(); c.focus(); } });
      lista.append(el("li", {}, [a]));
    });
    resumen.append(icono("error"), el("div", {}, [el("p", { class: "error-summary-title", text: errs.length === 1 ? "Revisa este dato para continuar:" : "Revisa estos " + errs.length + " datos para continuar:" }), lista]));
    $(".paso-intro", FIELDSET[actual]).after(resumen);
  }

  // ---------- Navegación ----------
  function anunciar(t) { anuncio.textContent = ""; setTimeout(function () { anuncio.textContent = t; }, 60); }

  function mostrarPaso(n) {
    actual = n;
    C.PASOS.forEach(function (p) { FIELDSET[p.n].hidden = p.n !== n; });
    btnAnterior.hidden = n === 1;
    btnSiguiente.hidden = n === TOTAL;
    if (n < TOTAL) btnSiguiente.textContent = n === TOTAL - 1 ? "Revisar el documento" : "Siguiente: " + C.PASOS[n].titulo;
    if (n > 1) recuperado.hidden = true;
    resumen.hidden = true;
    conError = {};
    if (n === TOTAL) pintarPaso6();
    else card.setAttribute("data-state", "idle");
    if (n >= TOTAL - 1) cargarMotor().then(prepararEnSilencio).catch(function () { /* se reintenta al pulsar Descargar */ });
    refrescar();
  }

  function irA(n, campoFoco, desdeHistorial) {
    if (!desdeHistorial) history.pushState({ icPaso: n }, "");
    mostrarPaso(n);
    var hechos = actualizarProgreso();
    anunciar("Paso " + n + " de " + TOTAL + ": " + C.PASOS[n - 1].titulo + ". " + hechos + " de " + C.APARTADOS.length + " apartados completados.");
    var destino = campoFoco && UI[campoFoco] ? UI[campoFoco].control : $("legend", FIELDSET[n]);
    card.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
    destino.focus({ preventScroll: true });
    guardarPronto();
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (actual === TOTAL || btnSiguiente.disabled) return;
    var errs = erroresPaso(actual);
    conError = {};
    errs.forEach(function (e) { conError[e.campo] = true; });
    pintarErrores(errs);
    if (errs.length) {
      var primero = controlDeError(errs[0]);
      if (errs.length > 1) resumen.focus(); else if (primero) primero.focus();
      return;
    }
    alcanzado = Math.max(alcanzado, actual + 1);
    guardarEmpresa();
    if (window.__track) window.__track("paso_" + actual + "_completado"); // solo el número de paso, para ver dónde se abandona
    irA(actual + 1);
  });
  btnAnterior.addEventListener("click", function () { irA(actual - 1); });
  window.addEventListener("popstate", function (ev) {
    var n = ev.state && ev.state.icPaso;
    if (!n || n === actual) return;
    // Hacia delante solo se llega hasta el primer paso que aún tenga errores
    var hasta = 1;
    while (hasta < n && hasta < alcanzado && !erroresPaso(hasta).length) hasta++;
    irA(Math.min(n, hasta), null, true);
  });

  // ---------- Cambios en el formulario ----------
  form.addEventListener("input", function (ev) {
    var t = ev.target, c;
    if (t.hasAttribute("data-lista")) {
      c = CAMPO[t.getAttribute("data-lista")];
      var i = Number(t.getAttribute("data-i")), sub = t.getAttribute("data-sub");
      datos[c.id] = (datos[c.id] || []).slice();
      datos[c.id][i] = Object.assign({}, datos[c.id][i]);
      datos[c.id][i][sub] = sub === "importe" ? V.parseNumero(t.value) : t.value;
    } else {
      c = CAMPO[t.name];
      if (!c) return;
      datos[c.id] = leerValor(c, t);
      if (c.id === "modoHogar") pintarValores(true); // textos propuestos del hogar en los campos sin tocar
    }
    $("#reanudar").hidden = true;
    if (conError[c.id]) {
      pintarErrores(erroresPaso(actual).filter(function (e) { return conError[e.campo]; }));
    }
    refrescar();
    guardarPronto();
  });

  // ---------- Memoria ----------
  var tGuardar;
  function guardarPronto() {
    clearTimeout(tGuardar);
    tGuardar = setTimeout(function () {
      if (!Object.keys(datos).length) return;
      memoria.guardar(KEY_BORRADOR, { v: 1, paso: actual, alcanzado: alcanzado, datos: datos, fecha: new Date().toISOString() });
    }, 500);
  }
  function guardarEmpresa() {
    var e = {};
    C.CAMPOS.forEach(function (c) { if (c.ambito === "empresa" && datos[c.id] !== undefined) e[c.id] = datos[c.id]; });
    if (Object.keys(e).length) memoria.guardar(KEY_EMPRESA, e);
  }

  $("#btn-continuar").addEventListener("click", function () {
    var b = memoria.leer(KEY_BORRADOR) || {};
    datos = b.datos || {};
    alcanzado = Math.min(Math.max(Number(b.alcanzado) || 1, 1), TOTAL);
    $("#reanudar").hidden = true;
    pintarValores();
    irA(Math.min(Math.max(Number(b.paso) || 1, 1), alcanzado));
  });
  $("#btn-de-cero").addEventListener("click", function () {
    memoria.borrar(KEY_BORRADOR);
    $("#reanudar").hidden = true;
    irA(1);
  });
  $("#btn-borrar").addEventListener("click", function () {
    if (!window.confirm("¿Borrar de este navegador los datos de la empresa y el documento a medias? El formulario se quedará vacío.")) return;
    memoria.borrar(KEY_EMPRESA);
    memoria.borrar(KEY_BORRADOR);
    IC.logo.borrar();
    if (paso6.campoLogo) { var nuevo = paso6.logo(); paso6.campoLogo.replaceWith(nuevo); paso6.campoLogo = nuevo; }
    pdf = null;
    datos = {};
    alcanzado = 1;
    $("#reanudar").hidden = true;
    recuperado.hidden = true;
    pintarValores();
    irA(1);
    anunciar("Datos borrados de este navegador.");
  });

  // ---------- Paso 6: el papel, el PDF y la entrega ----------
  function modelo() { return M.buildDocModel(datos, { catalog: C, legal: L, marca: BRAND.name, actualizado: BRAND.updated }); }
  function cargarMotor() { return IC.pdf.cargar(); }
  // informacion-laboral-<nombre>-<aaaa-mm-dd>.pdf: sin tildes ni signos, solo a-z, 0-9 y guiones
  function nombreArchivo() {
    var d = vista();
    var nombre = IC.pdf.slug(d.trabajadorNombre);
    var fecha = String(d.fechaInicio || new Date().toISOString().slice(0, 10)).replace(/[^0-9-]/g, "");
    return "informacion-laboral-" + (nombre || "documento") + "-" + fecha + ".pdf";
  }

  // El PDF se crea una vez por versión de los datos y se reutiliza para descargar, abrir y compartir
  var pdf = null; // { clave, blob, nombre, file, usado }
  function crearPdf() {
    var clave = JSON.stringify(datos);
    if (pdf && pdf.clave === clave) return pdf;
    var blob = window.__IC_PDF__.buildPdf(modelo(), { jsPDF: window.jspdf.jsPDF, marca: BRAND.name, logo: IC.logo.leer() }).output("blob");
    var nombre = nombreArchivo();
    pdf = { clave: clave, blob: blob, nombre: nombre, file: typeof File === "function" ? new File([blob], nombre, { type: "application/pdf" }) : null, usado: false };
    return pdf;
  }
  // Al llegar al paso 6 con el motor ya cargado: así los botones responden al instante (y compartir no caduca)
  function prepararEnSilencio() {
    if (actual !== TOTAL) return;
    try { crearPdf(); } catch (e) { /* se verá al pulsar un botón */ }
  }
  var ocupado = false;
  function ocupar(si) {
    ocupado = si;
    [paso6.descargar, paso6.bajo, paso6.abrir, paso6.compartir].forEach(function (b) {
      if (si) b.setAttribute("aria-disabled", "true"); else b.removeAttribute("aria-disabled");
    });
  }
  function conPdf(accion) {
    if (ocupado) return Promise.resolve();
    var listo = pdf && pdf.clave === JSON.stringify(datos);
    if (!listo) { card.setAttribute("data-state", "working"); anunciar("Preparando el documento…"); }
    ocupar(true);
    return cargarMotor().then(function () {
      var r = crearPdf();
      accion(r);
      if (!r.usado) { r.usado = true; marcarGenerado(); }
      card.setAttribute("data-state", "done");
      textoDescargar(r);
    }).catch(function (e) {
      console.warn("[pdf]", e);
      card.setAttribute("data-state", "error");
      anunciar("No se ha podido crear el PDF en este navegador. Puedes usar la versión para imprimir.");
    }).then(function () { ocupar(false); });
  }
  // «doc_generado» cuenta una vez por versión de los datos, se descargue en PDF, en Word o en los dos
  var generado = null;
  function marcarGenerado() {
    var clave = JSON.stringify(datos);
    if (generado === clave) return;
    generado = clave;
    if (window.__track) window.__track("doc_generado");
  }
  // Word (.docx) con el mismo modelo que el PDF, para quien necesite editarlo antes de entregarlo
  function descargarWord() {
    IC.pdf.cargarWord().then(function () {
      var D = window.__IC_DOCX__;
      IC.pdf.descargar(new Blob([D.buildDocx(modelo())], { type: D.MIME }), nombreArchivo().replace(/\.pdf$/, ".docx"));
      marcarGenerado();
      anunciar("Documento en Word descargado. Si lo editas, revisa que sigan los 17 apartados antes de entregarlo.");
    }).catch(function (e) {
      console.warn("[docx]", e);
      anunciar("No se ha podido crear el Word en este navegador. Descarga el PDF.");
    });
  }
  function textoDescargar(r) {
    [paso6.descargar, paso6.bajo].forEach(function (b) { b.textContent = r ? "Descargar PDF (" + IC.pdf.tamano(r.blob.size) + ")" : "Descargar PDF"; });
  }
  function descargar(r) {
    IC.pdf.descargar(r.blob, r.nombre);
    anunciar("Documento descargado. Entrégalo antes de que empiece a trabajar y guarda el Recibí firmado.");
  }

  // Alternativa si el PDF falla: imprimir la vista previa (dos ejemplares) con el menú del navegador
  function imprimirVista() {
    var m = modelo();
    var hojas = el("div", { id: "impresion" }, m.ejemplares.map(function (ej) {
      return el("div", { class: "impresion-ejemplar" }, [el("p", { class: "papel-rotulo", text: ej }), crearPapel(m, false)]);
    }));
    document.body.append(hojas);
    document.body.classList.add("imprimir-papel");
    var fin = function () { document.body.classList.remove("imprimir-papel"); hojas.remove(); window.removeEventListener("afterprint", fin); };
    window.addEventListener("afterprint", fin);
    window.print();
  }

  function crearPapel(m, conEditar) {
    var hogar = !!vista().modoHogar;
    var lista = el("ol", { class: "papel-apartados", role: "list" });
    m.apartados.forEach(function (a) {
      var ap = C.APARTADOS.filter(function (x) { return x.id === a.id; })[0];
      var cabecera = el("div", { class: "papel-ap-cabecera" }, [el("h4", { text: a.id + ") " + a.titulo })]);
      // En el modo hogar, j, k, l, m y o son textos fijos: no hay nada que editar
      if (conEditar && !(hogar && "jklmo".indexOf(a.id) >= 0)) {
        var editar = el("button", { type: "button", class: "btn-editar", text: "Editar", "aria-label": "Editar el apartado " + a.id + ") " + a.titulo });
        editar.addEventListener("click", function () { irA(ap.completoTrasPaso); });
        cabecera.append(editar);
      }
      lista.append(el("li", { class: "papel-apartado" }, [cabecera, el("p", { class: "papel-cita", text: a.cita }), el("p", { text: a.texto })]));
    });
    var lg = IC.logo.leer();
    return el("article", { class: "papel", "aria-label": "Vista previa del documento" }, [
      lg ? el("img", { class: "papel-logo", src: lg.dataUrl, alt: "Logo de la empresa" }) : null,
      el("h3", { text: m.titulo }),
      el("p", { class: "papel-sub", text: m.subtitulo }),
      el("dl", { class: "papel-partes" }, [
        el("div", {}, [el("dt", { text: m.partes.etiquetaEmpresa }), el("dd", { text: m.partes.empresa })]),
        el("div", {}, [el("dt", { text: "Persona trabajadora" }), el("dd", { text: m.partes.trabajador })])
      ]),
      lista,
      el("section", { class: "papel-recibi", "aria-label": "Recibí" }, [
        el("h4", { text: "Recibí" }),
        el("p", { text: m.recibi.texto }),
        el("p", { class: "papel-lugar", text: m.recibi.lugarFecha }),
        el("div", { class: "papel-firmas" }, m.recibi.firmas.map(function (f) { return el("p", { text: f }); }))
      ]),
      el("p", { class: "papel-pie", text: m.pie })
    ]);
  }

  function construirPaso6(fs) {
    paso6.avisos = el("div", { class: "revision-avisos", hidden: true });
    paso6.descargar = el("button", { type: "button", class: "btn btn--primary btn--grande", text: "Descargar PDF" });
    paso6.abrir = el("button", { type: "button", class: "btn btn--secondary", text: "Abrir para imprimir" });
    paso6.compartir = el("button", { type: "button", class: "btn btn--secondary", text: "Compartir", hidden: !IC.pdf.puedeCompartir() });
    paso6.word = el("button", { type: "button", class: "btn btn--secondary", text: "Descargar en Word" });
    var vistaImpresion = el("button", { type: "button", class: "btn btn--secondary", text: "Imprimir o guardar como PDF" });
    var otro = el("button", { type: "button", class: "btn btn--link", text: "Crear otro documento (se mantiene la empresa)" });
    var bajo = paso6.bajo = el("button", { type: "button", class: "btn btn--primary", text: "Descargar PDF" });
    var whatsapp = el("a", {
      href: "https://wa.me/?text=" + encodeURIComponent("Para hacer gratis el documento de información laboral del RD 723/2026: " + location.origin + location.pathname),
      target: "_blank", rel: "noopener"
    }, ["Compártelo por WhatsApp", el("span", { class: "sr-only", text: " (se abre en una pestaña nueva)" })]);
    paso6.papel = el("div", { class: "papel-marco" });
    // Logo opcional: al ponerlo o quitarlo, el PDF se vuelve a crear y la vista previa se repinta
    paso6.logo = function () { return IC.logo.campo("f-logo", function () { pdf = null; pintarPaso6(); }); };
    paso6.campoLogo = paso6.logo();

    fs.append(
      paso6.avisos,
      paso6.campoLogo,
      el("div", { class: "acciones-doc" }, [paso6.descargar, el("div", { class: "acciones-secundarias" }, [paso6.word, paso6.abrir, paso6.compartir])]),
      el("p", { class: "nota-doc", "data-when": "idle" }, ["El PDF lleva dos ejemplares: uno para la persona trabajadora y otro para que la empresa lo conserve firmado. El Word trae lo mismo, por si necesitas editarlo."]),
      aviso("info", "Preparando el documento…", { "data-when": "working" }),
      aviso("ok", "Documento listo. Entrégalo antes de que empiece a trabajar y guarda el Recibí firmado.", { "data-when": "done" }),
      aviso("error", ["No se ha podido crear el PDF en este navegador. Puedes imprimir el documento o guardarlo como PDF desde el menú de impresión. ", vistaImpresion], { "data-when": "error" }),
      paso6.papel,
      el("div", { class: "cierre-doc" }, [
        bajo,
        el("p", { class: "nota-doc" }, ["Al entregarlo: si la persona no domina el castellano, explícale el contenido; si tiene una discapacidad o capacidad intelectual límite, debe resultarle accesible y comprensible (art. 6.3 del RD 723/2026)."]),
        el("p", { class: "nota-doc", "data-when": "done" }, ["¿Conoces a alguien que también lo necesite? ", whatsapp, "."]),
        el("p", { class: "nota-doc" }, ["Si usas un ordenador compartido, pulsa «Borrar mis datos de este dispositivo» al terminar."]),
        otro
      ])
    );

    paso6.descargar.addEventListener("click", function () { conPdf(descargar); });
    bajo.addEventListener("click", function () { conPdf(descargar); });
    paso6.word.addEventListener("click", descargarWord);
    paso6.abrir.addEventListener("click", function () {
      var ventana = window.open("", "_blank"); // se abre ya, dentro del clic, para que no la bloquee el navegador
      conPdf(function (r) {
        var url = URL.createObjectURL(r.blob);
        if (ventana) ventana.location.href = url; else descargar(r);
      }).then(function () { if (ventana && card.getAttribute("data-state") === "error") ventana.close(); });
    });
    paso6.compartir.addEventListener("click", function () {
      conPdf(function (r) {
        navigator.share({ files: [r.file], title: "Información laboral RD 723/2026" }).catch(function (e) {
          if (e && e.name !== "AbortError") console.warn("[compartir]", e);
        });
      });
    });
    vistaImpresion.addEventListener("click", imprimirVista);
    otro.addEventListener("click", function () {
      var empresa = {};
      C.CAMPOS.forEach(function (c) { if (c.ambito === "empresa" && datos[c.id] !== undefined) empresa[c.id] = datos[c.id]; });
      guardarEmpresa();
      memoria.borrar(KEY_BORRADOR);
      datos = empresa;
      pdf = null;
      alcanzado = erroresPaso(1).length ? 1 : 2;
      pintarValores();
      irA(alcanzado);
    });
  }

  function pintarPaso6() {
    var avisos = V.validate(datos, { catalog: C, legal: L }).warnings.filter(function (w) { return w.code !== "HOGAR" && CAMPO[w.campo]; });
    paso6.avisos.textContent = "";
    paso6.avisos.hidden = !avisos.length;
    if (avisos.length) {
      paso6.avisos.append(el("h3", { text: avisos.length === 1 ? "Un aviso antes de descargar" : avisos.length + " avisos antes de descargar" }));
      avisos.forEach(function (w) {
        var ir = el("button", { type: "button", class: "btn btn--link", text: "Revisar este dato" });
        ir.addEventListener("click", function () { irA(CAMPO[w.campo].paso, w.campo); });
        paso6.avisos.append(aviso("warn", [w.mensaje + " ", ir]));
      });
    }
    paso6.papel.textContent = "";
    paso6.papel.append(crearPapel(modelo(), true));
    var listo = pdf && pdf.clave === JSON.stringify(datos);
    card.setAttribute("data-state", listo && pdf.usado ? "done" : "idle");
    textoDescargar(listo ? pdf : null);
  }

  // «Rellenarlo con datos de ejemplo»: enseña el documento terminado al momento; luego se cambian los datos
  var EJEMPLO = {
    modoHogar: false, empresaNombre: "Bar La Esquina, S.L. (ejemplo)", empresaNif: "B00000000",
    empresaDomicilio: "C/ Mayor 12, 28013 Madrid", centroIgualDomicilio: true, provincia: "Madrid", numTrabajadores: 4,
    trabajadorNombre: "Lucía Martín Pérez (ejemplo)", fechaInicio: "2026-10-06", tipoContrato: "indefinido",
    puesto: "Camarera de barra", categoria: "Grupo II, camarero/a", pruebaCantidad: 2, pruebaUnidad: "meses",
    funciones: "Atención a clientes en barra y sala, preparación de bebidas y cafés, cobro y limpieza de la zona de trabajo.",
    salarioBase: 1400, salarioPeriodo: "mes", complementos: [{ nombre: "Plus de transporte", importe: 60 }], pagasExtra: 2,
    horasSemanales: 40, tipoJornada: "completa", horario: "De martes a sábado, de 10:00 a 14:00 y de 19:00 a 23:00.",
    convenioNombre: "Convenio colectivo de hostelería de la Comunidad de Madrid", convenioCodigo: "28000000012025",
    convenioPublicacion: "BOCM de 15 de marzo de 2025", convenioVigencia: "Del 1 de enero de 2025 al 31 de diciembre de 2027",
    ssMutua: "Mutua colaboradora, para accidentes de trabajo y enfermedades profesionales",
    protocoloAcoso: "Tablón del local y copia entregada junto a este documento"
  };
  function initEjemplo() {
    var caja = $("#ejemplo-rapido"), boton = $("#btn-ejemplo");
    if (!caja || !boton) return;
    caja.hidden = false;
    boton.addEventListener("click", function () {
      datos = JSON.parse(JSON.stringify(EJEMPLO));
      pintarValores();
      alcanzado = TOTAL;
      $("#reanudar").hidden = true;
      $("#ejemplo-texto").textContent = "Es un ejemplo con datos inventados: cambia en cada paso los datos por los tuyos, o pulsa «Borrar mis datos» para empezar de cero.";
      boton.hidden = true;
      if (window.__track) window.__track("ejemplo_cargado");
      irA(TOTAL);
    });
  }

  // ---------- Arranque ----------
  function init() {
    construir();
    var borrador = memoria.leer(KEY_BORRADOR), empresa = memoria.leer(KEY_EMPRESA);
    if (empresa && typeof empresa === "object") {
      datos = Object.assign({}, empresa);
      recuperado.hidden = false;
    }
    pintarValores();
    mostrarPaso(1);
    history.replaceState({ icPaso: 1 }, "");
    ["#progreso", "#form-generador", "#card-foot"].forEach(function (s) { $(s).hidden = false; });
    if (borrador && borrador.datos && Object.keys(borrador.datos).length) {
      recuperado.hidden = true;
      $("#reanudar").hidden = false;
    }
    initEjemplo();
  }
  IC.safe(init, "generador");

  // Para la sección 05 (comunicación de cambios) y las pruebas
  window.__IC_GENERADOR__ = { datos: function () { return datos; }, irA: irA };
})();

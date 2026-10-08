/* lib/manifest.js */
/* Datos de marca de InfoContrato. Cambiar aquí nombre, dominio o email cambia toda la web. */
(function () {
  "use strict";
  window.__BRAND__ = {
    name: "InfoContrato",
    tagline: "El documento de información laboral del RD 723/2026, gratis y sin registro",
    domain: "infocontrato.es",            // se rellena al comprar el dominio (sección 11 del plan)
    email: "asierfernandezmotilva@gmail.com",             // email de contacto del titular (sección 08 del plan)
    gaId: "G-55FQ2C5YG5",              // ID de medición de Google Analytics 4 («G-…»); vacío = sin analítica. Pasos en js/analytics.js
    adsense: "",           // «ca-pub-4424403733078041» cuando AdSense APRUEBE la web: carga los anuncios y cambia el banner propio por el de Google (js/consent.js)
    adsenseSlots: {},      // números de bloque de AdSense, p. ej. { articulo: "1234567890" } (ver js/ads.js)
    updated: "2026-10-08", // fecha visible «Actualizado el…»; se pone la del día de publicación (sección 11)
    palette: { accent: "#0b5d73", accentDark: "#5cc3d9" } // igual que --accent en styles.css (claro / oscuro)
  };
})();
;
/* js/consent.js */
/* Banner de cookies propio, sin terceros. Guarda la decisión solo en este navegador
   (localStorage "ic:consent:v1" = { analitica: true|false, fecha }) y la vuelve a pedir a los 24 meses,
   como recomienda la guía de cookies de la AEPD. Sin decisión no se carga nada de Google.
   Va al final del <body> con position: sticky: se queda abajo mientras se lee y nunca tapa el final de la página.
   window.__consent = { init, get, onChange, open }. main.js llama a init(); los botones [data-consent-open]
   (en cookies.html) reabren la configuración.

   Modo Google (cuando lib/manifest.js tiene «adsense»): AdSense exige en Europa una plataforma de consentimiento
   certificada, así que se carga el script de AdSense (anuncios automáticos + mensaje de consentimiento de Google,
   configurado en AdSense → Privacidad y mensajes) y no se muestra el banner propio. La decisión se lee con la API
   estándar IAB TCF v2.2 (__tcfapi): hay analítica si se aceptan el propósito 1 (almacenar o acceder a información
   en el dispositivo) y a Google (proveedor 755), o si no se aplica el RGPD (visitas de fuera del EEE, Reino Unido y
   Suiza). Sin la plataforma de Google (bloqueador, sin conexión) no hay analítica. Los textos marcados con
   [data-cmp-propio] / [data-cmp-google] en las páginas legales se muestran según el modo. */
(function () {
  "use strict";

  var KEY = "ic:consent:v1";
  var CADUCA_MS = 730 * 24 * 3600 * 1000; // 24 meses
  var estado = null;                      // { analitica, fecha } o null si aún no ha decidido
  var oyentes = [];
  var barra = null, volverA = null;

  function leer() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && typeof v.analitica === "boolean" && Date.now() - Date.parse(v.fecha) < CADUCA_MS) return v;
    } catch (e) { /* modo privado o almacenamiento bloqueado: se vuelve a preguntar */ }
    return null;
  }

  function decidir(analitica) {
    estado = { analitica: analitica, fecha: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(estado)); } catch (e) { /* vale para esta página */ }
    cerrar();
    oyentes.forEach(function (cb) {
      try { cb(estado); } catch (e) { console.warn("[consent]", e); }
    });
  }

  function cerrar() {
    if (!barra) return;
    barra.remove();
    barra = null;
    if (volverA && document.contains(volverA)) volverA.focus();
    volverA = null;
  }

  function mostrar(configurar) {
    if (!barra) {
      var base = window.__IC__ ? window.__IC__.base : "";
      barra = document.createElement("section");
      barra.className = "consent";
      barra.setAttribute("role", "dialog");
      barra.setAttribute("aria-label", "Cookies");
      barra.setAttribute("aria-describedby", "consent-texto");
      barra.innerHTML =
        '<div class="container">' +
          '<p id="consent-texto">Usamos Google Analytics para contar visitas, solo si lo aceptas. ' +
          'Lo que escribes en el formulario nunca sale de tu dispositivo. <a href="' + base + 'cookies.html">Política de cookies</a></p>' +
          '<div class="consent-opciones" hidden>' +
            '<label class="check"><input type="checkbox" checked disabled> <span><strong>Técnicas</strong>: recuerdan esta elección y tu borrador en este navegador. Siempre activas.</span></label>' +
            '<label class="check"><input type="checkbox" id="consent-analitica"> <span><strong>Analíticas</strong>: Google Analytics, para saber cuántas personas usan la web.</span></label>' +
          '</div>' +
          '<div class="consent-acciones">' +
            '<button type="button" class="btn btn--secondary" data-accion="aceptar">Aceptar</button>' +
            '<button type="button" class="btn btn--secondary" data-accion="rechazar">Rechazar</button>' +
            '<button type="button" class="btn btn--secondary" data-accion="configurar">Configurar</button>' +
          '</div>' +
        '</div>';
      barra.addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-accion]");
        if (!b) return;
        var accion = b.getAttribute("data-accion");
        if (accion === "aceptar") decidir(true);
        else if (accion === "rechazar") decidir(false);
        else if (accion === "guardar") decidir(barra.querySelector("#consent-analitica").checked);
        else modoConfigurar();
      });
      document.body.appendChild(barra);
    }
    if (configurar) modoConfigurar();
  }

  // Muestra las casillas y convierte «Configurar» en «Guardar».
  function modoConfigurar() {
    var casilla = barra.querySelector("#consent-analitica");
    var boton = barra.querySelector('[data-accion="configurar"]');
    barra.querySelector(".consent-opciones").hidden = false;
    casilla.checked = !!(estado && estado.analitica);
    if (boton) { boton.textContent = "Guardar"; boton.setAttribute("data-accion", "guardar"); }
    casilla.focus();
  }

  function open(ev) {
    volverA = ev && ev.currentTarget ? ev.currentTarget : document.activeElement;
    mostrar(true);
  }

  function avisar(nuevo) {
    if (estado && estado.analitica === nuevo.analitica) return;
    estado = nuevo;
    oyentes.forEach(function (cb) {
      try { cb(estado); } catch (e) { console.warn("[consent]", e); }
    });
  }

  function leerTcf(tc, ok) {
    if (!ok || !tc) return;
    if (tc.gdprApplies === false) return avisar({ analitica: true });
    if (tc.eventStatus !== "tcloaded" && tc.eventStatus !== "useractioncomplete") return; // mensaje en pantalla: sin decisión
    var propositos = (tc.purpose && tc.purpose.consents) || {}, proveedores = (tc.vendor && tc.vendor.consents) || {};
    avisar({ analitica: !!(propositos[1] && proveedores[755]) });
  }

  // El script de Google llega async y define __tcfapi cuando está listo: se espera hasta 20 s.
  function esperarTcf(intentos) {
    if (typeof window.__tcfapi === "function") {
      window.__tcfapi("addEventListener", 2, leerTcf);
      botones().forEach(function (b) { b.hidden = false; });
    } else if (intentos > 0) {
      setTimeout(function () { esperarTcf(intentos - 1); }, 250);
    }
  }

  function abrirGoogle() {
    var fc = window.googlefc = window.googlefc || {};
    fc.callbackQueue = fc.callbackQueue || [];
    fc.callbackQueue.push(function () { window.googlefc.showRevocationMessage(); });
  }

  function botones() { return Array.prototype.slice.call(document.querySelectorAll("[data-consent-open]")); }

  function initGoogle(cliente) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-cmp-propio]"), function (n) { n.hidden = true; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-cmp-google]"), function (n) { n.hidden = false; });
    botones().forEach(function (b) { b.addEventListener("click", abrirGoogle); });
    var s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(cliente);
    document.head.appendChild(s);
    esperarTcf(80);
  }

  function init() {
    var cliente = (window.__BRAND__ || {}).adsense;
    if (cliente) return initGoogle(cliente);
    estado = leer();
    Array.prototype.forEach.call(document.querySelectorAll("[data-consent-open]"), function (b) {
      b.hidden = false;
      b.addEventListener("click", open);
    });
    if (!estado) mostrar(false);
  }

  window.__consent = {
    init: init,
    get: function () { return estado; },
    onChange: function (cb) { oyentes.push(cb); },
    open: function (ev) { if ((window.__BRAND__ || {}).adsense) abrirGoogle(); else open(ev); }
  };
})();
;
/* js/analytics.js */
/* Google Analytics 4 solo con consentimiento. Consent Mode v2 con todo denegado por defecto: hasta que la
   persona acepta la analítica (banner de js/consent.js) no se pide nada a Google. Sin gaId tampoco.
   Para activarlo (sección 11 del plan):
     1. En analytics.google.com crea una cuenta y una propiedad GA4 con un flujo de datos «Web» para el dominio.
     2. Copia el ID de medición del flujo (empieza por «G-»).
     3. Pégalo en lib/manifest.js → gaId: "G-XXXXXXXXXX" y cambia el ?v= de los scripts en las páginas.
   window.__track(nombre) envía solo el nombre del evento, nunca datos del formulario. */
(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"
  });

  var activa = false, cargada = false;

  // Sin consentimiento se borran las cookies _ga que hubiera dejado una visita anterior.
  function borrarCookiesGa() {
    var host = location.hostname.replace(/^www\./, "");
    document.cookie.split(";").forEach(function (c) {
      var nombre = c.split("=")[0].trim();
      if (nombre.indexOf("_ga") !== 0) return;
      ["", "; domain=" + host, "; domain=." + host].forEach(function (dominio) {
        document.cookie = nombre + "=; Max-Age=0; path=/" + dominio;
      });
    });
  }

  function aplicar(estado) {
    var id = (window.__BRAND__ || {}).gaId;
    activa = !!(id && estado && estado.analitica);
    if (!activa) {
      if (cargada) gtag("consent", "update", { analytics_storage: "denied" });
      borrarCookiesGa();
      return;
    }
    gtag("consent", "update", { analytics_storage: "granted" });
    if (cargada) return;
    cargada = true;
    gtag("js", new Date());
    // GA4 no guarda direcciones IP. Además, sin señales de Google ni personalización de anuncios.
    gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });
    // Bloqueador de anuncios o sin conexión: se ignora en silencio; la web funciona igual.
    window.__IC__.loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id)).catch(function () {});
  }

  window.__track = function (nombre) { if (activa) gtag("event", nombre); };

  window.__analytics = {
    init: function () {
      if (!window.__consent) return;
      aplicar(window.__consent.get());
      window.__consent.onChange(aplicar);
    }
  };
})();
;
/* main.js */
/* InfoContrato — main.js: común a todas las páginas. IIFE con scripts clásicos (sin módulos).
   Expone window.__IC__ con las utilidades que usan los scripts de cada página (generador, carta, PDF). */
(function () {
  "use strict";

  // Raíz de la web, deducida de la URL de este archivo: así las páginas en subcarpetas
  // (p. ej. /solicitar-informacion/) cargan los motores desde el sitio correcto.
  const BASE = (function () {
    try { return new URL(".", document.currentScript.src).href; }
    catch (e) { return new URL(".", location.href).href; }
  })();

  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));

  function safe(fn, name) {
    try { return fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  // Carga un motor (p. ej. el de PDF) solo cuando hace falta y una única vez.
  // Si falla (sin conexión, bloqueador…), se olvida el intento para poder reintentarlo.
  const pending = {};
  function loadScript(src) {
    const url = new URL(src, BASE).href;
    if (!pending[url]) {
      pending[url] = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = url;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => {
          delete pending[url];
          s.remove();
          reject(new Error("No se pudo cargar " + src));
        };
        document.head.appendChild(s);
      });
    }
    return pending[url];
  }

  // Marca en la cabecera la página en la que estamos.
  function initNav() {
    const here = location.pathname.replace(/index\.html$/, "");
    $$(".site-nav a").forEach((a) => {
      if (a.pathname.replace(/index\.html$/, "") === here) a.setAttribute("aria-current", "page");
    });
  }

  // Modelo oficial del SEPE: si lib/legal-data.js ya tiene su URL, se muestran los textos [data-modelo-sepe]
  // (con enlace y fecha) y se ocultan los [data-sin-modelo-sepe]. Sin URL, todo queda como está en el HTML.
  function initModeloSepe() {
    const L = window.__LEGAL__;
    const url = L && L.enlaces && L.enlaces.modeloSepe;
    if (!url) return;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(L.enlaces.modeloSepeFecha || "");
    const fecha = m ? new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
      .format(new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))) : "";
    $$("[data-sin-modelo-sepe]").forEach((n) => { n.hidden = true; });
    $$("[data-modelo-sepe]").forEach((n) => { n.hidden = false; });
    $$("[data-modelo-sepe-enlace]").forEach((a) => { a.href = url; });
    $$("[data-modelo-sepe-fecha]").forEach((n) => { n.textContent = fecha; });
  }

  // «Avisar de un error»: asunto con el título de la página y cuerpo con su dirección, sin datos del formulario.
  function initReportLinks() {
    $$("a[data-report]").forEach((a) => {
      a.href = a.getAttribute("href").split("?")[0] +
        "?subject=" + encodeURIComponent("Error en InfoContrato: " + document.title) +
        "&body=" + encodeURIComponent("Página: " + location.origin + location.pathname + "\n\n");
    });
  }

  // Botones «Copiar el código» (Quiénes somos): copian el textarea indicado; si el navegador no deja, lo seleccionan
  function initCopiar() {
    $$("button[data-copiar]").forEach((b) => {
      const campo = document.getElementById(b.getAttribute("data-copiar"));
      if (!campo) return;
      const texto = b.textContent;
      b.addEventListener("click", () => {
        const hecho = () => { b.textContent = b.getAttribute("data-copiado") || "Código copiado"; setTimeout(() => { b.textContent = texto; }, 2500); };
        const aMano = () => { campo.focus(); campo.select(); b.textContent = "Pulsa Ctrl+C (o Copiar) para copiarlo"; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(campo.value).then(hecho, aMano);
        else aMano();
      });
    });
  }

  // Utilidades de DOM para los scripts de cada página. El texto va siempre con textContent, nunca con innerHTML.
  function el(tag, attrs, hijos) {
    const n = document.createElement(tag);
    Object.keys(attrs || {}).forEach((k) => {
      const v = attrs[k];
      if (v === undefined || v === null || v === false) return;
      if (k === "text") n.textContent = v;
      else n.setAttribute(k, v === true ? "" : v);
    });
    (hijos || []).forEach((h) => { if (h !== null && h !== undefined) n.append(h); });
    return n;
  }
  const SVG = { // marcado fijo de esta web, sin datos del usuario
    info: '<circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9v5M10 6.2v.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    warn: '<path d="M10 2.5l8 14.5H2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 8v4.5M10 14.6v.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    error: '<circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    ok: '<path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  function icono(tipo) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 20 20");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    s.innerHTML = SVG[tipo];
    return s;
  }
  // Aviso con icono: tipo info | warn | error | ok; contenido: texto o nodos
  function aviso(tipo, contenido, attrs) {
    const clase = "notice" + (tipo === "info" ? "" : " notice--" + tipo);
    return el("div", Object.assign({ class: clase }, attrs || {}), [icono(tipo), el("span", {}, [].concat(contenido))]);
  }

  // Entrega de PDF, común al generador y a la carta: motor bajo demanda (con el mismo ?v= que este archivo),
  // tamaño legible, descarga, compartir y nombres de archivo sin tildes ni signos.
  const VERSION = (function () { try { return new URL(document.currentScript.src).search; } catch (e) { return ""; } })();
  const pdf = {
    cargar: () => Promise.all([loadScript("lib/vendor/jspdf.umd.min.js"), loadScript("js/pdf.js" + VERSION)]),
    cargarWord: () => loadScript("js/docx.js" + VERSION), // el .docx del generador (js/docx.js), sin librerías
    puedeCompartir() {
      try { return !!(navigator.canShare && navigator.canShare({ files: [new File([""], "prueba.pdf", { type: "application/pdf" })] })); }
      catch (e) { return false; }
    },
    tamano: (bytes) => bytes < 1048576 ? Math.max(1, Math.round(bytes / 1024)) + " KB" : (bytes / 1048576).toFixed(1).replace(".", ",") + " MB",
    descargar(blob, nombre) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nombre;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    },
    slug: (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/, "")
  };

  // Logo de la empresa para los PDF (generador y comunicación de cambios). Se reduce a 600 px como máximo y se
  // guarda solo en este navegador (ic:logo:v1 = { dataUrl, ancho, alto }); «Borrar mis datos» lo elimina.
  const KEY_LOGO = "ic:logo:v1";
  const logo = {
    leer() { try { const l = JSON.parse(localStorage.getItem(KEY_LOGO)); return l && /^data:image\/(png|jpeg);base64,/.test(l.dataUrl) ? l : null; } catch (e) { return null; } },
    borrar() { try { localStorage.removeItem(KEY_LOGO); } catch (e) { /* sin memoria */ } },
    // file → Promise<{ dataUrl, ancho, alto }>; rechaza con un mensaje para mostrar si no vale
    preparar(file) {
      if (!file || !/^image\/(png|jpeg)$/.test(file.type)) return Promise.reject(new Error("El logo tiene que ser una imagen PNG o JPG."));
      if (file.size > 1048576) return Promise.reject(new Error("El logo pesa más de 1 MB. Usa una versión más pequeña."));
      return new Promise((ok, mal) => {
        const img = new Image(), url = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(url);
          const f = Math.min(1, 600 / Math.max(img.naturalWidth, img.naturalHeight));
          const c = document.createElement("canvas");
          c.width = Math.max(1, Math.round(img.naturalWidth * f));
          c.height = Math.max(1, Math.round(img.naturalHeight * f));
          const g = c.getContext("2d");
          if (file.type === "image/jpeg") { g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); }
          g.drawImage(img, 0, 0, c.width, c.height);
          const l = { dataUrl: file.type === "image/png" ? c.toDataURL("image/png") : c.toDataURL("image/jpeg", 0.9), ancho: c.width, alto: c.height };
          try { localStorage.setItem(KEY_LOGO, JSON.stringify(l)); } catch (e) { /* sin memoria: vale para esta visita */ }
          ok(l);
        };
        img.onerror = () => { URL.revokeObjectURL(url); mal(new Error("No se ha podido leer la imagen del logo.")); };
        img.src = url;
      });
    },
    // Campo «Logo de la empresa (opcional)» con miniatura, «Quitar» y error; alCambiar(logo|null) tras cada cambio
    campo(id, alCambiar) {
      const input = el("input", { type: "file", id, accept: "image/png,image/jpeg", "aria-describedby": id + "-ayuda " + id + "-error" });
      const mini = el("img", { class: "logo-mini", alt: "Logo elegido", hidden: true });
      const quitar = el("button", { type: "button", class: "btn btn--link", text: "Quitar el logo", hidden: true });
      const error = el("p", { class: "field-error", id: id + "-error" });
      const pintar = (l) => { mini.hidden = quitar.hidden = !l; if (l) mini.src = l.dataUrl; };
      input.addEventListener("change", () => {
        error.textContent = "";
        logo.preparar(input.files[0]).then((l) => { pintar(l); alCambiar(l); }, (e) => { error.textContent = e.message; input.value = ""; });
      });
      quitar.addEventListener("click", () => { logo.borrar(); input.value = ""; pintar(null); alCambiar(null); input.focus(); });
      pintar(logo.leer());
      return el("div", { class: "field campo-logo" }, [
        el("label", { for: id, text: "Logo de la empresa (opcional)" }),
        el("p", { class: "field-help", id: id + "-ayuda", text: "PNG o JPG de hasta 1 MB. Sale arriba del PDF (en el Word puedes ponerlo tú) y se guarda solo en este navegador." }),
        input, error, el("div", { class: "logo-fila" }, [mini, quitar])
      ]);
    }
  };

  window.__IC__ = { base: BASE, $, $$, safe, loadScript, el, icono, aviso, pdf, logo };
  // Si js/analytics.js no llega a cargar, medir no hace nada y nada falla.
  window.__track = window.__track || function () {};

  function boot() {
    safe(initNav, "initNav");
    safe(initReportLinks, "initReportLinks");
    safe(initCopiar, "initCopiar");
    safe(initModeloSepe, "initModeloSepe");
    // Banner de cookies (js/consent.js) y Analytics solo con consentimiento (js/analytics.js), por separado:
    // si uno falla, el otro y la herramienta siguen funcionando.
    safe(() => window.__consent && window.__consent.init(), "consent");
    safe(() => window.__analytics && window.__analytics.init(), "analytics");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
;

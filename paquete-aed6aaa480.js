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
    updated: "2026-10-06", // fecha visible «Actualizado el…»; se pone la del día de publicación (sección 11)
    palette: { accent: "#0b5d73", accentDark: "#5cc3d9" } // igual que --accent en styles.css (claro / oscuro)
  };
})();
;
/* lib/legal-data.js */
/* Datos legales que cambian con el tiempo. TODO lo que haya que actualizar (salario mínimo, enlaces,
   fechas) vive solo aquí. Cada cifra lleva su fuente. REVISAR CADA ENERO (nuevo salario mínimo).
   Se usa en el navegador (window.__LEGAL__) y en las pruebas de Node (require). */
(function (root) {
  "use strict";

  var LEGAL = {
    revisado: "2026-09-25", // fecha en la que se comprobaron estas cifras y enlaces

    // Real Decreto 723/2026, de 9 de septiembre (transpone la Directiva (UE) 2019/1152).
    norma: {
      nombre: "Real Decreto 723/2026, de 9 de septiembre",
      boeId: "BOE-A-2026-19200",
      fechaBoe: "2026-09-15",
      vigor: "2026-10-05",        // disposición final cuarta: veinte días tras su publicación
      sustituye: "Real Decreto 1659/1998",
      url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-19200"
    },

    // Art. 2.2 RD 723/2026: el capítulo II solo se aplica a relaciones de MÁS de cuatro semanas.
    exclusionDias: 28,

    // Disposición transitoria única RD 723/2026: la plantilla existente puede pedirlo; la empresa responde
    // en 30 días HÁBILES desde que recibe la solicitud (y solo si no se lo había dado ya).
    plazoRespuestaDias: 30,
    plazoRespuestaTipo: "hábiles",

    // Salario mínimo interprofesional 2026 — Real Decreto 126/2026, de 18 de febrero (BOE 19/02/2026).
    // REVISAR CADA ENERO.
    smi: {
      anio: 2026,
      norma: "Real Decreto 126/2026",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815",
      mensual14: 1221,      // euros/mes en 14 pagas, jornada completa
      mensual12: 1424.5,    // euros/mes con pagas extra prorrateadas (12 pagas)
      anual: 17094,         // euros/año
      diario: 40.7,         // euros/día
      hogarHora: 9.55,      // euros/hora efectiva, empleo de hogar por horas (incluye partes proporcionales)
      jornadaSemanal: 40    // horas/semana de la jornada completa de referencia
    },

    // Duración máxima del periodo de prueba sin convenio que diga otra cosa — art. 14.1 Estatuto de los Trabajadores.
    prueba: {
      fuente: "Art. 14.1 del Estatuto de los Trabajadores",
      tecnicosMeses: 6,         // técnicos titulados
      restoMeses: 2,            // resto de trabajadores
      restoPymeMeses: 3,        // resto, en empresas de menos de 25 trabajadores
      umbralPymeTrabajadores: 25,
      hogarMeses: 2             // empleo de hogar (art. 6.2 del Real Decreto 1620/2011)
    },

    // Alquiler de vivienda (/actualizar-alquiler/). Los índices del INE están en lib/indices-alquiler.js
    // (tools/actualizar-indices.py, cada mes). topeExtra: límite extraordinario a la actualización anual que fije un
    // real decreto-ley, p. ej. { desde: "2026-10-08", hasta: "2027-12-31", maximo: 2, norma: "Real Decreto-ley X/2026" }.
    // null = no hay ninguno en vigor. El RDL 26/2026 (2 %) lo derogó el Congreso el 02/10/2026 (BOE-A-2026-20526).
    alquiler: {
      topeExtra: null
    },

    enlaces: {
      boe723: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-19200",
      boe126: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815",
      // Consulta pública de convenios de ámbito estatal (REGCON). La antigua dirección en mitramiss.gob.es ya no responde.
      regcon: "https://expinterweb.mites.gob.es/regcon/pub/consultaPublicaEstatal",
      // Lista oficial de todos los boletines autonómicos y provinciales (los convenios provinciales se publican en el BOP).
      boletines: "https://www.boe.es/legislacion/otros_diarios_oficiales.php",
      sepe: "https://www.sepe.es/HomeSepe",
      // Modelo oficial del SEPE (disposición adicional primera), publicado a primeros de octubre de 2026 (el PDF es
      // del 01/10/2026). Los textos de portada, guía y /modelo-sepe/ ya están escritos en el HTML; ver tools/MODELO-SEPE.md.
      modeloSepe: "https://www.sepe.es/HomeSepe/empresas/Contratos-de-trabajo/modelos-contrato.html",
      modeloSepeFecha: ""
    },

    // Comunidades autónomas y ciudades autónomas (códigos ISO 3166-2:ES).
    // tipo "registro": buscador o registro de convenios propio de la comunidad.
    // tipo "boletin": URL genérica (boletín oficial autonómico) porque no se encontró buscador propio.
    ccaa: {
      AN: { nombre: "Andalucía", tipo: "registro", fuente: "Registro de convenios colectivos de la Junta de Andalucía", url: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/relaciones-laborales/registro-convenios-colectivos-planes-igualdad.html" },
      AR: { nombre: "Aragón", tipo: "boletin", fuente: "Boletín Oficial de Aragón (BOA)", url: "https://www.boa.aragon.es/" },
      AS: { nombre: "Principado de Asturias", tipo: "boletin", fuente: "Boletín Oficial del Principado de Asturias (BOPA)", url: "https://miprincipado.asturias.es/bopa" },
      IB: { nombre: "Illes Balears", tipo: "boletin", fuente: "Butlletí Oficial de les Illes Balears (BOIB)", url: "https://www.caib.es/eboibfront/" },
      CN: { nombre: "Canarias", tipo: "boletin", fuente: "Boletín Oficial de Canarias (BOC)", url: "https://www.gobiernodecanarias.org/boc/" },
      CB: { nombre: "Cantabria", tipo: "boletin", fuente: "Boletín Oficial de Cantabria (BOC)", url: "https://boc.cantabria.es/boces/" },
      CL: { nombre: "Castilla y León", tipo: "boletin", fuente: "Boletín Oficial de Castilla y León (BOCYL)", url: "https://bocyl.jcyl.es/" },
      CM: { nombre: "Castilla-La Mancha", tipo: "boletin", fuente: "Diario Oficial de Castilla-La Mancha (DOCM)", url: "https://docm.jccm.es/docm/" },
      CT: { nombre: "Cataluña", tipo: "registro", fuente: "Cercador de convenis de la Generalitat de Catalunya", url: "https://treball.gencat.cat/ca/consell_relacions_laborals/convenis_colectius/cercador_de_convenis/" },
      VC: { nombre: "Comunitat Valenciana", tipo: "registro", fuente: "Buscador de convenios colectivos de la Generalitat Valenciana", url: "https://habitatge.gva.es/es/web/dg-trabajo/convenios-buscador" },
      EX: { nombre: "Extremadura", tipo: "boletin", fuente: "Diario Oficial de Extremadura (DOE)", url: "https://doe.juntaex.es/" },
      GA: { nombre: "Galicia", tipo: "boletin", fuente: "Diario Oficial de Galicia (DOG)", url: "https://www.xunta.gal/diario-oficial-galicia" },
      MD: { nombre: "Comunidad de Madrid", tipo: "registro", fuente: "Convenios colectivos de la Comunidad de Madrid", url: "https://www.comunidad.madrid/empleo/convenios-colectivos" },
      MC: { nombre: "Región de Murcia", tipo: "registro", fuente: "Convenios colectivos de la Región de Murcia", url: "https://www.carm.es/web/pagina?IDCONTENIDO=14590&IDTIPO=100&RASTRO=c897$m34326" },
      NC: { nombre: "Comunidad Foral de Navarra", tipo: "boletin", fuente: "Boletín Oficial de Navarra (BON)", url: "https://bon.navarra.es/es/inicio" },
      PV: { nombre: "País Vasco", tipo: "registro", fuente: "Registro de convenios colectivos del País Vasco", url: "https://www.euskadi.eus/registro/regcon/web01-tramite/es/" },
      RI: { nombre: "La Rioja", tipo: "boletin", fuente: "Boletín Oficial de La Rioja (BOR)", url: "https://web.larioja.org/bor-portada" },
      CE: { nombre: "Ceuta", tipo: "boletin", fuente: "Boletín Oficial de la Ciudad de Ceuta (BOCCE)", url: "https://www.ceuta.es/ceuta/bocce" },
      ML: { nombre: "Melilla", tipo: "boletin", fuente: "Boletín Oficial de Melilla (BOME)", url: "https://bomemelilla.es/" }
    },

    // 50 provincias + 2 ciudades autónomas, en orden alfabético, con su comunidad.
    provincias: [
      { nombre: "A Coruña", ccaa: "GA" },
      { nombre: "Álava / Araba", ccaa: "PV" },
      { nombre: "Albacete", ccaa: "CM" },
      { nombre: "Alicante / Alacant", ccaa: "VC" },
      { nombre: "Almería", ccaa: "AN" },
      { nombre: "Asturias", ccaa: "AS" },
      { nombre: "Ávila", ccaa: "CL" },
      { nombre: "Badajoz", ccaa: "EX" },
      { nombre: "Barcelona", ccaa: "CT" },
      { nombre: "Bizkaia", ccaa: "PV" },
      { nombre: "Burgos", ccaa: "CL" },
      { nombre: "Cáceres", ccaa: "EX" },
      { nombre: "Cádiz", ccaa: "AN" },
      { nombre: "Cantabria", ccaa: "CB" },
      { nombre: "Castellón / Castelló", ccaa: "VC" },
      { nombre: "Ceuta", ccaa: "CE" },
      { nombre: "Ciudad Real", ccaa: "CM" },
      { nombre: "Córdoba", ccaa: "AN" },
      { nombre: "Cuenca", ccaa: "CM" },
      { nombre: "Gipuzkoa", ccaa: "PV" },
      { nombre: "Girona", ccaa: "CT" },
      { nombre: "Granada", ccaa: "AN" },
      { nombre: "Guadalajara", ccaa: "CM" },
      { nombre: "Huelva", ccaa: "AN" },
      { nombre: "Huesca", ccaa: "AR" },
      { nombre: "Illes Balears", ccaa: "IB" },
      { nombre: "Jaén", ccaa: "AN" },
      { nombre: "La Rioja", ccaa: "RI" },
      { nombre: "Las Palmas", ccaa: "CN" },
      { nombre: "León", ccaa: "CL" },
      { nombre: "Lleida", ccaa: "CT" },
      { nombre: "Lugo", ccaa: "GA" },
      { nombre: "Madrid", ccaa: "MD" },
      { nombre: "Málaga", ccaa: "AN" },
      { nombre: "Melilla", ccaa: "ML" },
      { nombre: "Murcia", ccaa: "MC" },
      { nombre: "Navarra", ccaa: "NC" },
      { nombre: "Ourense", ccaa: "GA" },
      { nombre: "Palencia", ccaa: "CL" },
      { nombre: "Pontevedra", ccaa: "GA" },
      { nombre: "Salamanca", ccaa: "CL" },
      { nombre: "Santa Cruz de Tenerife", ccaa: "CN" },
      { nombre: "Segovia", ccaa: "CL" },
      { nombre: "Sevilla", ccaa: "AN" },
      { nombre: "Soria", ccaa: "CL" },
      { nombre: "Tarragona", ccaa: "CT" },
      { nombre: "Teruel", ccaa: "AR" },
      { nombre: "Toledo", ccaa: "CM" },
      { nombre: "Valencia / València", ccaa: "VC" },
      { nombre: "Valladolid", ccaa: "CL" },
      { nombre: "Zamora", ccaa: "CL" },
      { nombre: "Zaragoza", ccaa: "AR" }
    ]
  };

  root.__LEGAL__ = LEGAL;
  if (typeof module !== "undefined" && module.exports) module.exports = LEGAL;
})(typeof window !== "undefined" ? window : {});
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
/* js/ads.js */
/* Anuncios manuales de AdSense. Inactivo hasta que AdSense apruebe la web.
 *
 * Cómo se activa (cuando aprueben):
 *   1. lib/manifest.js → adsense: "ca-pub-4424403733078041"  (consent.js carga entonces el script y el aviso TCF de Google)
 *   2. En AdSense → Anuncios → Por bloque de anuncios, crea 1 bloque «Adaptable» y pon su número (10 cifras) en
 *      adsenseSlots de lib/manifest.js, p. ej. adsenseSlots: { articulo: "1234567890" }.
 *   3. Publicar. Mientras falte el número o el cliente, el hueco queda oculto y no ocupa espacio.
 *
 * Reglas: los huecos <div class="ad-slot" data-ad-slot="articulo"> solo van en guías y artículos, nunca dentro del
 * generador ni pegados a los botones de descargar. Cada hueco reserva alto (CSS .ad-slot) para no mover el texto.
 */
(function () {
  "use strict";

  function activar() {
    var marca = window.__BRAND__ || {};
    var cliente = marca.adsense, slots = marca.adsenseSlots || {};
    if (!cliente) return;
    Array.prototype.forEach.call(document.querySelectorAll(".ad-slot[data-ad-slot]"), function (hueco) {
      var id = slots[hueco.getAttribute("data-ad-slot")];
      if (!id || hueco.getAttribute("data-ad-listo")) return;
      hueco.setAttribute("data-ad-listo", "1");
      var etiqueta = document.createElement("p");
      etiqueta.className = "ad-etiqueta";
      etiqueta.textContent = "Publicidad";
      var ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", cliente);
      ins.setAttribute("data-ad-slot", id);
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      hueco.appendChild(etiqueta);
      hueco.appendChild(ins);
      hueco.hidden = false;
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { hueco.hidden = true; }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", activar);
  else activar();
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
/* js/calculadoras.js */
/* Calculadoras pequeñas: periodo de prueba (/periodo-de-prueba/), salario mínimo (/salario-minimo-2026/) y duración
   del alquiler (/duracion-contrato-alquiler/). Todo en el navegador. Las funciones puras las prueba
   tools/test-calculadoras.js; la parte de cada página solo se activa si encuentra su formulario. */
(function (root) {
  "use strict";

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function fechaLarga(f) { var p = f.split("-"); return +p[2] + " de " + MESES[+p[1] - 1] + " de " + p[0]; }
  function euros(n) { return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
  function redondea(n) { return Math.round(n * 100) / 100; }

  // Suma meses a una fecha «de fecha a fecha»; si el mes final no tiene ese día, vence el último (art. 5.1 del Código Civil).
  function sumarFecha(f, meses) {
    var p = f.split("-").map(Number);
    var total = p[0] * 12 + (p[1] - 1) + meses, y = Math.floor(total / 12), m = total - y * 12;
    var ultimo = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(Math.min(p[2], ultimo)).padStart(2, "0");
  }

  // ---- Periodo de prueba: arts. 14.1 y 11 del Estatuto de los Trabajadores; art. 6.2 del RD 1620/2011 (hogar) ----
  // e = { tipo: "indefinido" | "temporal-largo" | "temporal-corto" | "practicas" | "alternancia" | "hogar", titulado, pyme }
  function periodoPrueba(e) {
    if (e.tipo === "alternancia") return { meses: 0, base: "art. 11.2.l del Estatuto de los Trabajadores", texto: "En el contrato de formación en alternancia no se puede pactar periodo de prueba." };
    if (e.tipo === "practicas") return { meses: 1, base: "art. 11.3.e del Estatuto de los Trabajadores", texto: "Como máximo 1 mes en el contrato para la obtención de práctica profesional, salvo que el convenio diga otra cosa." };
    if (e.tipo === "hogar") return { meses: 2, base: "art. 6.2 del Real Decreto 1620/2011", texto: "Como máximo 2 meses en el empleo de hogar, salvo que el convenio diga otra cosa. Durante la prueba, el preaviso para terminar no puede pasar de 7 días naturales." };
    if (e.tipo === "temporal-corto") return { meses: 1, base: "art. 14.1 del Estatuto de los Trabajadores", texto: "Como máximo 1 mes en los contratos temporales de seis meses o menos, salvo que el convenio diga otra cosa." };
    var meses = e.titulado ? 6 : e.pyme ? 3 : 2;
    var quien = e.titulado ? "técnicos titulados" : e.pyme ? "quien no es técnico titulado en una empresa de menos de 25 personas trabajadoras" : "quien no es técnico titulado";
    return { meses: meses, base: "art. 14.1 del Estatuto de los Trabajadores", texto: "Como máximo " + meses + " meses para " + quien + ", si el convenio no fija otro límite." };
  }

  // ---- Salario mínimo a prorrata de la jornada (art. 1 del RD 126/2026: «si se realizase jornada inferior se percibirá a prorrata») ----
  // e = { horas, completa }; S = LEGAL.smi
  function smi(e, S) {
    if (!(e.horas > 0) || !(e.completa > 0)) return { error: "Escribe las horas de tu jornada y las de la jornada completa." };
    if (e.horas > e.completa) return { error: "Tus horas no pueden superar las de la jornada completa." };
    var f = e.horas / e.completa;
    return { fraccion: f, mensual14: redondea(S.mensual14 * f), mensual12: redondea(S.mensual12 * f), anual: redondea(S.anual * f), diario: redondea(S.diario * f) };
  }

  // ---- Duración del alquiler de vivienda: arts. 9, 10 y 11 de la Ley de Arrendamientos Urbanos (contratos desde el 6/3/2019) ----
  // e = { inicio: "AAAA-MM-DD", anios: duración pactada en años, juridica: el casero es una empresa }
  function duracionAlquiler(e) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.inicio || "")) return { error: "Escribe la fecha de inicio del contrato." };
    if (e.inicio < "2019-03-06") return { error: "Los contratos firmados antes del 6 de marzo de 2019 tienen otros plazos. Esta calculadora cubre los firmados desde esa fecha." };
    if (!(e.anios > 0) || e.anios > 30) return { error: "Escribe la duración pactada en años (por ejemplo, 1)." };
    var minimo = e.juridica ? 7 : 5;
    var meses = Math.round(e.anios * 12);
    var r = { minimo: minimo, finPactado: sumarFecha(e.inicio, meses), prorrogaObligatoria: meses < minimo * 12 };
    r.finMinimo = r.prorrogaObligatoria ? sumarFecha(e.inicio, minimo * 12) : r.finPactado;
    r.avisoCasero = sumarFecha(r.finMinimo, -4);
    r.avisoInquilino = sumarFecha(r.finMinimo, -2);
    r.finTacita = sumarFecha(r.finMinimo, 36);
    r.desistimiento = sumarFecha(e.inicio, 6);
    return r;
  }

  // ---- Carta de dimisión: preaviso del convenio o de la costumbre (art. 49.1.d ET), contado desde el día siguiente (art. 5.1 CC) ----
  // e = { nombre, empresa, puesto, fecha: "AAAA-MM-DD" (entrega de la carta), dias }
  function cartaDimision(e) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.fecha || "")) return { error: "Escribe la fecha en que entregarás la carta." };
    if (!(e.dias >= 0) || e.dias > 120 || Math.round(e.dias) !== e.dias) return { error: "Escribe los días de preaviso de tu convenio (por ejemplo, 15)." };
    var p = e.fecha.split("-").map(Number);
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2] + e.dias));
    var ultimo = d.toISOString().slice(0, 10);
    var nombre = e.nombre || "[Tu nombre y apellidos]";
    var texto = (e.empresa || "[Nombre de la empresa]") + "\nA la atención de la dirección\n\n" +
      "Asunto: comunicación de baja voluntaria\n\n" +
      "Yo, " + nombre + ", con DNI [número], que trabajo en la empresa como " + (e.puesto || "[puesto]") + ", le comunico mi decisión de causar baja voluntaria.\n\n" +
      (e.dias > 0 ? "Para cumplir el preaviso de " + e.dias + " días, mi último día de trabajo será el " + fechaLarga(ultimo) + " (art. 49.1.d del Estatuto de los Trabajadores).\n\n"
                  : "Mi último día de trabajo será el " + fechaLarga(ultimo) + ".\n\n") +
      "Le ruego que me entregue la propuesta de liquidación de las cantidades que me correspondan (finiquito), como prevé el artículo 49.2 del Estatuto de los Trabajadores, y una copia firmada de esta carta como acuse de recibo.\n\n" +
      "En [localidad], a " + fechaLarga(e.fecha) + ".\n\nAtentamente,\n\n" + nombre + "\n[Firma]\n\n" +
      "Recibido por la empresa: fecha __________ y firma __________";
    return { ultimo: ultimo, texto: texto };
  }

  // ---- Vacaciones generadas: 30 días naturales al año como mínimo (art. 38.1 ET), en proporción a los días del periodo ----
  // e = { inicio, fin: "AAAA-MM-DD" (ambos incluidos), anuales: días al año (30 o los del convenio), disfrutados }
  function vacaciones(e) {
    var ok = /^\d{4}-\d{2}-\d{2}$/;
    if (!ok.test(e.inicio || "") || !ok.test(e.fin || "")) return { error: "Escribe la fecha de inicio y la de fin." };
    if (e.fin < e.inicio) return { error: "La fecha de fin tiene que ser posterior a la de inicio." };
    var dias = Math.round((Date.parse(e.fin) - Date.parse(e.inicio)) / 864e5) + 1;
    if (dias > 366) return { error: "Calcula cada año por separado: el periodo no puede pasar de un año." };
    if (!(e.anuales >= 30) || e.anuales > 60) return { error: "Los días de vacaciones al año no pueden ser menos de 30 naturales (art. 38.1)." };
    var generados = Math.round(e.anuales * dias / 365 * 100) / 100;
    if (generados > e.anuales) generados = e.anuales;
    var disfrutados = e.disfrutados > 0 ? e.disfrutados : 0;
    return { dias: dias, generados: generados, pendientes: Math.round((generados - disfrutados) * 100) / 100 };
  }

  var API = { periodoPrueba: periodoPrueba, smi: smi, duracionAlquiler: duracionAlquiler, sumarFecha: sumarFecha, cartaDimision: cartaDimision, vacaciones: vacaciones };
  if (typeof module !== "undefined" && module.exports) { module.exports = API; return; }

  // ---- Páginas ----
  function p(texto, clase) { var n = document.createElement("p"); n.textContent = texto; if (clase) n.className = clase; return n; }
  function cifra(etiqueta, valor) { var n = document.createElement("p"), b = document.createElement("strong"); n.className = "alquiler-cifra"; b.textContent = valor; n.append(etiqueta, b); return n; }
  function num(v) { v = String(v).trim(); return parseFloat(v.indexOf(",") >= 0 ? v.replace(/\./g, "").replace(",", ".") : v); }
  function enviar(id, pintar) {
    var form = document.getElementById(id), salida = document.getElementById(id + "-resultado");
    if (!form || !salida) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      salida.replaceChildren();
      salida.hidden = false;
      pintar(form, salida);
      salida.focus();
      if (root.__track) root.__track(id.replace(/-/g, "_"));
    });
  }

  enviar("calc-prueba", function (f, s) {
    var r = periodoPrueba({ tipo: f.tipo.value, titulado: f.titulado.checked, pyme: f.pyme.checked });
    s.append(cifra("Duración máxima: ", r.meses === 0 ? "no se puede pactar" : r.meses + (r.meses === 1 ? " mes" : " meses")));
    s.append(p(r.texto + " (" + r.base + ")."));
    if (r.meses > 0) {
      s.append(p("Tiene que pactarse por escrito. Si la persona ya hizo las mismas funciones antes en la empresa, con cualquier contrato, el periodo de prueba es nulo (art. 14.1).", "fine-print"));
      s.append(p("En el documento informativo va en el apartado h): la duración concreta y qué tareas son objeto de la prueba (art. 3.2.h del RD 723/2026).", "fine-print"));
    }
  });
  var fp = document.getElementById("calc-prueba");
  if (fp) {
    var syncPrueba = function () { document.getElementById("prueba-extra").hidden = ["indefinido", "temporal-largo"].indexOf(fp.tipo.value) < 0; };
    fp.addEventListener("change", syncPrueba);
    syncPrueba();
  }

  enviar("calc-smi", function (f, s) {
    var S = root.__LEGAL__ && root.__LEGAL__.smi;
    var r = smi({ horas: num(f.horas.value), completa: num(f.completa.value) }, S);
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    s.append(cifra("En 14 pagas: ", euros(r.mensual14) + " al mes"));
    s.append(cifra("En 12 pagas (extras prorrateadas): ", euros(r.mensual12) + " al mes"));
    s.append(p("Al año: " + euros(r.anual) + ". Por día: " + euros(r.diario) + ". Es el " + (Math.round(r.fraccion * 1000) / 10).toLocaleString("es-ES") + " % del salario mínimo de " + S.anio + "."));
    s.append(p("Son importes brutos. Si el convenio colectivo fija un salario mayor, manda el convenio.", "fine-print"));
  });

  enviar("calc-dimision", function (f, s) {
    var r = cartaDimision({ nombre: f.nombre.value.trim(), empresa: f.empresa.value.trim(), puesto: f.puesto.value.trim(), fecha: f.fecha.value, dias: num(f.dias.value) });
    var bloque = document.getElementById("bloque-carta");
    bloque.hidden = !!r.error;
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    s.append(cifra("Tu último día de trabajo: ", fechaLarga(r.ultimo)));
    s.append(p("Entrega la carta y quédate una copia firmada por la empresa, o envíala por un medio que deje constancia de la fecha.", "fine-print"));
    document.getElementById("carta-dimision").value = r.texto;
  });

  enviar("calc-vacaciones", function (f, s) {
    var r = vacaciones({ inicio: f.inicio.value, fin: f.fin.value, anuales: num(f.anuales.value), disfrutados: num(f.disfrutados.value) || 0 });
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    var n = function (x) { return x.toLocaleString("es-ES", { maximumFractionDigits: 2 }); };
    s.append(cifra("Vacaciones generadas: ", n(r.generados) + " días naturales"));
    s.append(p("Por " + r.dias + " días de contrato en el periodo. Te quedan " + n(r.pendientes) + " días por disfrutar."));
    s.append(p("Si el convenio da más días o los cuenta en días laborables, se aplica el convenio. Las vacaciones que no hayas disfrutado al terminar el contrato se pagan en el finiquito.", "fine-print"));
  });

  // Plantilla de registro de jornada: imprime solo la hoja (el navegador permite guardarla en PDF)
  var imprimir = document.getElementById("imprimir-hoja");
  if (imprimir) {
    imprimir.addEventListener("click", function () {
      document.body.classList.add("imprimir-hoja");
      root.print();
    });
    root.addEventListener("afterprint", function () { document.body.classList.remove("imprimir-hoja"); });
  }

  enviar("calc-duracion", function (f, s) {
    var r = duracionAlquiler({ inicio: f.inicio.value, anios: num(f.anios.value), juridica: f.casero.value === "juridica" });
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    s.append(cifra("El contrato dura, como mínimo, hasta el ", fechaLarga(r.finMinimo)));
    if (r.prorrogaObligatoria) s.append(p("Se pactó por menos de " + r.minimo + " años: al vencer el " + fechaLarga(r.finPactado) + " se prorroga año a año, obligatoriamente para el casero, hasta cumplir " + r.minimo + " años. El inquilino puede irse al final de cada año avisando con 30 días de antelación (art. 9.1)."));
    s.append(p("Para no renovar después, el casero tiene que avisar como tarde el " + fechaLarga(r.avisoCasero) + " (4 meses antes) y el inquilino como tarde el " + fechaLarga(r.avisoInquilino) + " (2 meses antes) (art. 10.1)."));
    s.append(p("Si nadie avisa, se prorroga año a año hasta el " + fechaLarga(r.finTacita) + " como máximo. En esos años el inquilino puede irse avisando con un mes de antelación al final de cada anualidad (art. 10.1)."));
    s.append(p("Desde el " + fechaLarga(r.desistimiento) + " el inquilino puede dejar la vivienda avisando con 30 días de antelación; si el contrato lo prevé, pagaría una mensualidad por cada año que falte, o la parte proporcional (art. 11).", "fine-print"));
  });
})(typeof window !== "undefined" ? window : {});
;

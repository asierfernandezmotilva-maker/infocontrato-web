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
    updated: "2026-10-07", // fecha visible «Actualizado el…»; se pone la del día de publicación (sección 11)
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
    // (tools/actualizar-indices.py, cada mes). topeExtra: límite extraordinario a la actualización anual que fija un
    // real decreto-ley; null = no hay ninguno en vigor. El RDL 26/2026 (2 %) lo derogó el Congreso el 02/10/2026
    // (BOE-A-2026-20526); el RDL 29/2026 (BOE 07/10/2026, BOE-A-2026-20823, en vigor el 08/10/2026) lo repone en su
    // disposición final sexta: actualizaciones entre el 08/10/2026 y el 31/12/2027, máximo 2 % si no hay nuevo pacto
    // (y 0 % si la renta supera el límite del índice de precios de referencia). Si el Congreso no lo convalida, poner null.
    alquiler: {
      topeExtra: { desde: "2026-10-08", hasta: "2027-12-31", maximo: 2, norma: "disposición final sexta del Real Decreto-ley 29/2026" }
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
/* js/comunidad.js */
/* Comunidad de propietarios (Ley 49/1960, de Propiedad Horizontal): mayorías de la junta (/mayorias-junta-propietarios/),
   convocatoria (/convocatoria-junta-propietarios/), reparto de una derrama (/derrama-comunidad/) y carta a un moroso
   (/reclamar-moroso-comunidad/). Todo en el navegador. Las funciones puras las prueba tools/test-comunidad.js; la parte
   de cada página solo se activa si encuentra su formulario. Artículos comprobados en el texto consolidado del BOE. */
(function (root) {
  "use strict";

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var FECHA = /^\d{4}-\d{2}-\d{2}$/;
  function fechaLarga(f) { var p = f.split("-"); return +p[2] + " de " + MESES[+p[1] - 1] + " de " + p[0]; }
  function euros(n) { return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
  function pct(n) { return n.toLocaleString("es-ES", { maximumFractionDigits: 2 }) + " %"; }
  function r2(n) { return Math.round(n * 100) / 100; }
  function sumarDias(f, d) { var p = f.split("-").map(Number); return new Date(Date.UTC(p[0], p[1] - 1, p[2] + d)).toISOString().slice(0, 10); }
  function diasEntre(a, b) { var x = a.split("-"), y = b.split("-"); return Math.round((Date.UTC(y[0], y[1] - 1, y[2]) - Date.UTC(x[0], x[1] - 1, x[2])) / 864e5); }
  function minutos(h) { var m = /^(\d{1,2}):(\d{2})$/.exec(h || ""); return m ? +m[1] * 60 + +m[2] : null; }
  function hora(min) { min = ((min % 1440) + 1440) % 1440; return String(Math.floor(min / 60)).padStart(2, "0") + ":" + String(min % 60).padStart(2, "0"); }

  // ---- Mayorías de la junta: art. 17 de la Ley de Propiedad Horizontal (quórum: art. 16.2; morosos sin voto: art. 15.2) ----
  // num/den: fracción exigida; estricta: «mayoría» = más de la mitad; total: se mide sobre el total de propietarios y cuotas
  // (si no, sobre los asistentes en segunda convocatoria); presunto: los ausentes que no se opongan en 30 días cuentan a favor (17.8)
  var REGLAS = {
    simple:        { nombre: "mayoría simple", base: "art. 17.7", num: 1, den: 2, estricta: true, total: false, presunto: false },
    accesibilidad: { nombre: "mayoría de propietarios que representen la mayoría de las cuotas", base: "art. 17.2", num: 1, den: 2, estricta: true, total: true, presunto: true },
    energia:       { nombre: "mayoría simple de propietarios que representen la mayoría simple de las cuotas", base: "art. 17.2, párrafo tercero", num: 1, den: 2, estricta: true, total: true, presunto: true },
    tercio:        { nombre: "un tercio de los propietarios que representen un tercio de las cuotas", base: "art. 17.1 y 17.3", num: 1, den: 3, estricta: false, total: true, presunto: false },
    tresquintos:   { nombre: "tres quintas partes del total de los propietarios que representen tres quintas partes de las cuotas", base: "art. 17.3 y 17.4", num: 3, den: 5, estricta: false, total: true, presunto: true },
    turisticos:    { nombre: "tres quintas partes del total de los propietarios que representen tres quintas partes de las cuotas", base: "art. 17.12", num: 3, den: 5, estricta: false, total: true, presunto: true },
    unanimidad:    { nombre: "unanimidad del total de los propietarios y de las cuotas", base: "art. 17.6", num: 1, den: 1, estricta: false, total: true, presunto: true },
    recarga:       { sinVoto: true, base: "art. 17.5", texto: "Instalar un punto de recarga para uso privado en una plaza de garaje individual no se vota: basta comunicarlo antes a la comunidad. El coste de la instalación y la electricidad los paga quien lo instala." },
    obligatorias:  { sinVoto: true, base: "art. 10.1", texto: "Las obras necesarias para conservar el edificio y las de accesibilidad universal (y las que pida un propietario para una persona con discapacidad o mayor de 70 años, si no pasan de 12 mensualidades de gastos comunes al año una vez descontadas las ayudas) son obligatorias y no necesitan acuerdo: la junta solo reparte la derrama y decide cómo se paga (art. 10.2)." }
  };
  var EPS = 1e-9;
  function alcanza(regla, n, q, baseN, baseQ) {
    return regla.estricta ? n * regla.den > regla.num * baseN && q * regla.den > regla.num * baseQ + EPS
                          : n * regla.den >= regla.num * baseN && q * regla.den + EPS >= regla.num * baseQ;
  }
  function necesarios(regla, baseN, baseQ) {
    var n = regla.estricta ? Math.floor(regla.num * baseN / regla.den) + 1 : Math.ceil(regla.num * baseN / regla.den - EPS);
    return { n: n, q: r2(regla.num * baseQ / regla.den) };
  }
  // e = { tipo, convocatoria: "primera" | "segunda", propietarios, cuotasTotal (100 si no se indica), morosos, cuotasMorosos,
  //       favor, cuotasFavor, contra, cuotasContra, abstencion, cuotasAbstencion }
  function mayoria(e) {
    var regla = REGLAS[e.tipo];
    if (!regla) return { error: "Elige el tipo de acuerdo." };
    if (regla.sinVoto) return { sinVoto: true, base: regla.base, texto: regla.texto };
    var N = e.propietarios, QT = e.cuotasTotal > 0 ? e.cuotasTotal : 100;
    if (!(N >= 2) || N !== Math.round(N) || N > 5000) return { error: "Escribe cuántos propietarios tiene la comunidad (un número entero, 2 o más)." };
    var m = e.morosos > 0 ? Math.round(e.morosos) : 0, qm = e.cuotasMorosos > 0 ? e.cuotasMorosos : 0;
    var f = e.favor > 0 ? Math.round(e.favor) : 0, qf = e.cuotasFavor > 0 ? e.cuotasFavor : 0;
    var c = e.contra > 0 ? Math.round(e.contra) : 0, qc = e.cuotasContra > 0 ? e.cuotasContra : 0;
    var a = e.abstencion > 0 ? Math.round(e.abstencion) : 0, qa = e.cuotasAbstencion > 0 ? e.cuotasAbstencion : 0;
    if (f + c + a + m > N) return { error: "Los votos a favor, en contra, las abstenciones y los morosos suman más propietarios de los que tiene la comunidad." };
    if (qf + qc + qa + qm > QT + 0.01) return { error: "Las cuotas que has escrito suman más que el total de cuotas de la comunidad." };
    if (f > 0 && !(qf > 0)) return { error: "Escribe las cuotas de participación que suman los votos a favor." };
    var totalN = N - m, totalQ = r2(QT - qm);
    var asistN = f + c + a, asistQ = r2(qf + qc + qa);
    var ausN = totalN - asistN, ausQ = r2(totalQ - asistQ);
    var quorum = asistN * 2 > totalN && asistQ * 2 > totalQ + EPS;
    var r = { regla: regla, tipo: e.tipo, favor: f, cuotasFavor: qf, ausentes: ausN, cuotasAusentes: ausQ, asistentes: asistN, cuotasAsistentes: asistQ, quorum: quorum, totalN: totalN, totalQ: totalQ, segunda: false };
    var baseN = totalN, baseQ = totalQ;
    if (!regla.total) {
      r.segunda = e.convocatoria === "segunda" || !quorum;
      r.sinQuorum = e.convocatoria !== "segunda" && !quorum;
      if (r.segunda) { baseN = asistN; baseQ = asistQ; }
    }
    r.baseN = baseN; r.baseQ = baseQ;
    if (baseN === 0) return { error: "Escribe los votos a favor, en contra y las abstenciones." };
    var nec = necesarios(regla, baseN, baseQ);
    r.necesitaN = nec.n; r.necesitaQ = nec.q;
    if (alcanza(regla, f, qf, baseN, baseQ)) r.estado = "aprobado";
    else if (regla.presunto && alcanza(regla, f + ausN, qf + ausQ, baseN, baseQ)) {
      r.estado = "pendiente";
      r.holguraN = f + ausN - nec.n;
      r.holguraQ = r2(qf + ausQ - nec.q);
    } else r.estado = "rechazado";
    return r;
  }

  // Carta a los propietarios ausentes (arts. 17.8 y 9.1.h): si no se oponen en 30 días naturales, su voto cuenta a favor
  // e = { comunidad, direccion, fechaJunta, acuerdo, secretario, presidente, localidad, fecha }, r = resultado de mayoria()
  function notificacionAusentes(e, r) {
    var fecha = FECHA.test(e.fecha || "") ? e.fecha : null;
    return "COMUNIDAD DE PROPIETARIOS " + (e.comunidad || "[nombre de la comunidad]").toUpperCase() + "\n" + (e.direccion || "[dirección]") + "\n\n" +
      "Notificación del acuerdo adoptado en la junta de propietarios a los propietarios ausentes\n\n" +
      "Estimado/a propietario/a de [piso o local]:\n\n" +
      "En la junta de propietarios celebrada el " + (FECHA.test(e.fechaJunta || "") ? fechaLarga(e.fechaJunta) : "[fecha de la junta]") + ", a la que fue debidamente citado/a, se sometió a votación el siguiente acuerdo:\n\n" +
      "«" + (e.acuerdo || "[texto del acuerdo]") + "»\n\n" +
      "Votaron a favor " + r.favor + " propietarios, que representan el " + pct(r.cuotasFavor) + " de las cuotas de participación. El acuerdo requiere el voto favorable de " + r.regla.nombre + " (" + r.regla.base + " de la Ley de Propiedad Horizontal).\n\n" +
      "De acuerdo con el artículo 17.8 de la Ley de Propiedad Horizontal, su voto se computará como favorable si en el plazo de 30 días naturales desde que reciba esta notificación no manifiesta su discrepancia a quien ejerce las funciones de secretario de la comunidad, por cualquier medio que permita tener constancia de la recepción (por ejemplo, correo electrónico, burofax o escrito entregado en la dirección de la comunidad).\n\n" +
      "Si no se opone en ese plazo, el acuerdo quedará aprobado y obligará a todos los propietarios (art. 17.9).\n\n" +
      "En " + (e.localidad || "[localidad]") + ", a " + (fecha ? fechaLarga(fecha) : "[fecha]") + ".\n\n" +
      "El/La secretario/a: " + (e.secretario || "[nombre]") + "\n\nV.º B.º del/de la presidente/a: " + (e.presidente || "[nombre]");
  }

  // ---- Convocatoria de la junta: art. 16 (quién convoca, contenido, 6 días para la ordinaria, segunda convocatoria) ----
  // e = { comunidad, direccion, tipo: "ordinaria" | "extraordinaria", fecha, hora1, hora2, lugar, orden: [...], convoca: "presidente" | "propietarios",
  //       presidente, morosos: [...], fechaConvocatoria, localidad }
  function convocatoria(e) {
    if (!(e.comunidad || "").trim()) return { error: "Escribe el nombre de la comunidad." };
    if (!FECHA.test(e.fecha || "")) return { error: "Escribe la fecha de la junta." };
    var h1 = minutos(e.hora1);
    if (h1 === null) return { error: "Escribe la hora de la primera convocatoria." };
    var orden = (e.orden || []).map(function (s) { return String(s).trim(); }).filter(Boolean);
    if (!orden.length) return { error: "Escribe al menos un punto del orden del día." };
    var h2 = minutos(e.hora2), avisos = [];
    if (h2 === null) h2 = h1 + 30;
    else if (h2 < h1 + 30) avisos.push("Entre la primera y la segunda convocatoria tienen que pasar al menos 30 minutos si son el mismo día (art. 16.2). Se ha puesto la segunda media hora después.");
    if (h2 < h1 + 30) h2 = h1 + 30;
    var fc = FECHA.test(e.fechaConvocatoria || "") ? e.fechaConvocatoria : null;
    var dias = fc ? diasEntre(fc, e.fecha) : null;
    if (dias !== null && dias < 0) return { error: "La fecha de la junta tiene que ser posterior a la de la convocatoria." };
    var ordinaria = e.tipo !== "extraordinaria";
    if (ordinaria && dias !== null && dias < 6) avisos.push("La junta ordinaria se cita con al menos 6 días de antelación (art. 16.3): entre la convocatoria y la junta solo hay " + dias + " día" + (dias === 1 ? "" : "s") + ". Cambia la fecha de la junta o de la convocatoria.");
    var morosos = (e.morosos || []).map(function (s) { return String(s).trim(); }).filter(Boolean);
    var quien = e.convoca === "propietarios"
      ? "A petición de propietarios que representan al menos la cuarta parte de los propietarios o el 25 % de las cuotas de participación (art. 16.1 de la Ley de Propiedad Horizontal), se convoca"
      : "Por orden de " + (e.presidente ? "la presidencia de la comunidad, " + e.presidente + "," : "la presidencia de la comunidad") + " se convoca";
    var texto = "COMUNIDAD DE PROPIETARIOS " + e.comunidad.trim().toUpperCase() + "\n" + (e.direccion ? e.direccion.trim() + "\n" : "") + "\n" +
      "CONVOCATORIA DE JUNTA GENERAL " + (ordinaria ? "ORDINARIA" : "EXTRAORDINARIA") + " DE PROPIETARIOS\n\n" +
      quien + " a todos los propietarios a la junta general " + (ordinaria ? "ordinaria" : "extraordinaria") + " que se celebrará en " + (e.lugar || "[lugar]") +
      " el " + fechaLarga(e.fecha) + ", a las " + hora(h1) + " en primera convocatoria y, si no hay quórum, a las " + hora(h2) + " en segunda convocatoria (art. 16.2), con el siguiente\n\n" +
      "ORDEN DEL DÍA\n" + orden.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n") + "\n\n" +
      "Propietarios con deudas vencidas pendientes de pago con la comunidad (art. 16.2): " + (morosos.length ? "\n" + morosos.map(function (s) { return "- " + s; }).join("\n") : "ninguno.") + "\n" +
      "Quienes al comenzar la junta no estén al corriente de pago de todas las deudas vencidas, y no las hayan impugnado judicialmente ni consignado judicial o notarialmente, podrán participar en las deliberaciones pero no tendrán derecho de voto (art. 15.2).\n\n" +
      "Puede asistir en persona o representado/a por otra persona mediante un escrito firmado (art. 15.1); puede usar la autorización que figura al pie. Cualquier propietario puede pedir por escrito a la presidencia que se incluya un asunto en el orden del día de la siguiente junta (art. 16.2).\n\n" +
      "En " + (e.localidad || "[localidad]") + ", a " + (fc ? fechaLarga(fc) : "[fecha]") + ".\n\n" +
      (e.convoca === "propietarios" ? "Los propietarios promotores:" : "El/La presidente/a: " + (e.presidente || "[nombre]")) + "\n\n" +
      "..........................................................................\n\n" +
      "AUTORIZACIÓN PARA REPRESENTARME EN LA JUNTA (art. 15.1)\n" +
      "D./D.ª ______________________________, propietario/a de ______________________, autorizo a D./D.ª ______________________________ a asistir y votar en mi nombre en la junta de propietarios del " + fechaLarga(e.fecha) + ".\n" +
      "Fecha y firma: ______________________";
    return { texto: texto, avisos: avisos, hora2: hora(h2), dias: dias };
  }

  // ---- Reparto de una derrama por cuota de participación (art. 9.1.e) o a partes iguales si lo dice el título ----
  // Cada línea: «Bajo A 3,25», «1.º B; 4,1» o «Local 2, 6» (el último número es el coeficiente). Devuelve [{ nombre, coeficiente }].
  function parsearLista(texto) {
    return String(texto || "").split(/\r?\n/).map(function (l) {
      l = l.trim();
      if (!l) return null;
      var m = /^(.*?)[\s;,\t]*([0-9]+(?:[.,][0-9]+)?)\s*%?$/.exec(l);
      if (!m || !m[1].trim()) return { nombre: l, coeficiente: NaN };
      return { nombre: m[1].trim().replace(/[;,]+$/, ""), coeficiente: parseFloat(m[2].replace(",", ".")) };
    }).filter(Boolean);
  }
  // e = { importe, lineas: [{ nombre, coeficiente }], modo: "coeficiente" | "iguales" }
  function derrama(e) {
    if (!(e.importe > 0)) return { error: "Escribe el importe total de la derrama." };
    var lineas = e.lineas || [];
    if (lineas.length < 2) return { error: "Escribe al menos dos viviendas o locales, una por línea, con su coeficiente." };
    var mala = lineas.filter(function (l) { return !(l.coeficiente > 0); });
    if (e.modo !== "iguales" && mala.length) return { error: "Falta el coeficiente en: " + mala.map(function (l) { return l.nombre; }).join(", ") + ". Escribe el nombre y, al final, el coeficiente (por ejemplo, «2.º A 4,25»)." };
    var suma = r2(lineas.reduce(function (s, l) { return s + (l.coeficiente > 0 ? l.coeficiente : 0); }, 0));
    var total = r2(e.importe), filas = [], acumulado = 0;
    lineas.forEach(function (l, i) {
      var parte = e.modo === "iguales" ? total / lineas.length : total * l.coeficiente / suma;
      var imp = i === lineas.length - 1 ? r2(total - acumulado) : r2(parte);
      acumulado = r2(acumulado + imp);
      filas.push({ nombre: l.nombre, coeficiente: l.coeficiente > 0 ? l.coeficiente : null, importe: imp });
    });
    var r = { filas: filas, total: total, sumaCoeficientes: suma, modo: e.modo === "iguales" ? "iguales" : "coeficiente" };
    if (r.modo === "coeficiente" && Math.abs(suma - 100) > 0.5) r.aviso = "Los coeficientes suman " + pct(suma) + ", no 100 %. Si falta alguna vivienda o local, añádela: el reparto se ha hecho en proporción a la suma escrita.";
    return r;
  }

  // ---- Carta de reclamación a un propietario moroso (arts. 9.1.e, 15.2 y 21) ----
  // e = { comunidad, direccion, deudor, piso, importe, concepto, fecha, dias (plazo), firmante: "presidente" | "secretario", nombreFirmante, iban, localidad }
  function cartaMoroso(e) {
    if (!(e.importe > 0)) return { error: "Escribe la cantidad que debe." };
    if (!FECHA.test(e.fecha || "")) return { error: "Escribe la fecha de la carta." };
    var dias = e.dias >= 1 && e.dias <= 60 ? Math.round(e.dias) : 10;
    var limite = sumarDias(e.fecha, dias);
    var texto = "COMUNIDAD DE PROPIETARIOS " + (e.comunidad || "[nombre de la comunidad]").toUpperCase() + "\n" + (e.direccion || "[dirección]") + "\n\n" +
      "A: " + (e.deudor || "[nombre del propietario]") + ", propietario/a de " + (e.piso || "[piso o local]") + "\n\n" +
      "Asunto: requerimiento de pago de cuotas de comunidad pendientes\n\n" +
      "Según la contabilidad de la comunidad, a fecha " + fechaLarga(e.fecha) + " debe " + euros(e.importe) + " en concepto de " + (e.concepto || "[cuotas ordinarias de los meses de … / derrama aprobada el …]") + ".\n\n" +
      "Contribuir a los gastos comunes con arreglo a la cuota de participación es una obligación de cada propietario (art. 9.1.e de la Ley de Propiedad Horizontal). Le pedimos que pague esa cantidad antes del " + fechaLarga(limite) + (e.iban ? " en la cuenta de la comunidad " + e.iban : "") + ", o que nos indique en ese plazo si hay algún error.\n\n" +
      "Le recordamos que, mientras no esté al corriente de pago, puede participar en las juntas pero sin derecho de voto (art. 15.2), que la deuda genera intereses desde la fecha en que debió pagarse (art. 21.1) y que, si no paga, la junta puede aprobar la liquidación de la deuda y reclamarla judicialmente por el proceso monitorio, con los gastos y costes de la reclamación a su cargo (art. 21.2 y 21.3).\n\n" +
      "En " + (e.localidad || "[localidad]") + ", a " + fechaLarga(e.fecha) + ".\n\n" +
      (e.firmante === "secretario" ? "El/La secretario/a-administrador/a: " : "El/La presidente/a: ") + (e.nombreFirmante || "[nombre]") + "\n\n" +
      "Recibí: fecha __________ y firma __________";
    return { texto: texto, limite: limite, dias: dias };
  }

  var API = { REGLAS: REGLAS, mayoria: mayoria, notificacionAusentes: notificacionAusentes, convocatoria: convocatoria, parsearLista: parsearLista, derrama: derrama, cartaMoroso: cartaMoroso, sumarDias: sumarDias };
  if (typeof module !== "undefined" && module.exports) { module.exports = API; return; }

  // ---- Páginas ----
  function p(texto, clase) { var n = document.createElement("p"); n.textContent = texto; if (clase) n.className = clase; return n; }
  function cifra(etiqueta, valor) { var n = document.createElement("p"), b = document.createElement("strong"); n.className = "alquiler-cifra"; b.textContent = valor; n.append(etiqueta, b); return n; }
  function num(v) { v = String(v == null ? "" : v).trim(); return parseFloat(v.indexOf(",") >= 0 ? v.replace(/\./g, "").replace(",", ".") : v); }
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
  function lineas(v) { return String(v || "").split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean); }

  // Las dos mayorías dibujadas: propietarios y cuotas, con el umbral y el tramo que aportarían los ausentes (voto presunto)
  function barra(etiqueta, favor, ausentes, necesita, base, unidad) {
    var fila = document.createElement("div"), cab = document.createElement("p"), b = document.createElement("div");
    fila.className = "dm-fila";
    cab.className = "dm-cab";
    var fmt = unidad === "%" ? pct : String;
    cab.append(etiqueta + ": ", Object.assign(document.createElement("strong"), { textContent: fmt(favor) }), " a favor de " + fmt(base) + ". Hacen falta " + fmt(necesita) + ".");
    b.className = "dm-barra";
    var f = document.createElement("span"), a = document.createElement("span"), u = document.createElement("span");
    var pf = Math.min(100, 100 * favor / base);
    f.className = "dm-favor"; f.style.width = pf + "%";
    a.className = "dm-ausentes"; a.style.left = pf + "%"; a.style.width = Math.max(0, Math.min(100 - pf, 100 * ausentes / base)) + "%";
    u.className = "dm-umbral"; u.style.left = Math.min(100, 100 * necesita / base) + "%";
    b.append(f, a, u);
    fila.append(cab, b);
    return fila;
  }

  enviar("calc-mayoria", function (f, s) {
    var r = mayoria({ tipo: f.tipo.value, convocatoria: f.convocatoria.value, propietarios: num(f.propietarios.value), cuotasTotal: num(f.cuotasTotal.value),
      morosos: num(f.morosos.value), cuotasMorosos: num(f.cuotasMorosos.value), favor: num(f.favor.value), cuotasFavor: num(f.cuotasFavor.value),
      contra: num(f.contra.value), cuotasContra: num(f.cuotasContra.value), abstencion: num(f.abstencion.value), cuotasAbstencion: num(f.cuotasAbstencion.value) });
    var bloque = document.getElementById("bloque-notificacion");
    bloque.hidden = true;
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    if (r.sinVoto) { s.append(cifra("", "No hace falta votarlo"), p(r.texto + " (" + r.base + " de la Ley de Propiedad Horizontal).")); return; }
    var titulo = r.estado === "aprobado" ? "Se aprueba" : r.estado === "pendiente" ? "Todavía no: depende de los ausentes" : "No se aprueba";
    s.append(cifra("", titulo));
    s.append(p("Hace falta " + r.regla.nombre + " (" + r.regla.base + " de la Ley de Propiedad Horizontal)" +
      (r.regla.total ? ", contando sobre el total de la comunidad" + (r.totalN < num(f.propietarios.value) ? " sin los morosos privados de voto (art. 15.2)" : "") + "."
                     : r.segunda ? ", contando sobre los asistentes porque la junta se celebra en segunda convocatoria." : ", contando sobre el total de la comunidad porque hay quórum en primera convocatoria.")));
    if (r.sinQuorum) s.append(p("En primera convocatoria no hay quórum (no asisten la mayoría de los propietarios con la mayoría de las cuotas, art. 16.2), así que la junta se celebra en segunda convocatoria, media hora después, y la mayoría se cuenta sobre los asistentes.", "notice notice--warn"));
    var g = document.createElement("div");
    g.className = "dm";
    var aus = r.regla.presunto && r.estado !== "aprobado";
    g.append(barra("Propietarios", r.favor, aus ? r.ausentes : 0, r.necesitaN, r.baseN, "n"), barra("Cuotas", r.cuotasFavor, aus ? r.cuotasAusentes : 0, r.necesitaQ, r.baseQ, "%"));
    s.append(g);
    if (aus) s.append(p("La parte rayada es lo que sumarían los ausentes si no se oponen; la raya vertical, la mayoría que hace falta.", "fine-print"));
    if (r.estado === "aprobado") {
      s.append(p("El acuerdo obliga a todos los propietarios (art. 17.9). Hay que recogerlo en el acta con los votos a favor y en contra y sus cuotas (art. 19.2.f), cerrarla en 10 días naturales y enviarla a todos los propietarios (art. 19.3). Quien votó en contra, estuvo ausente o fue privado del voto indebidamente puede impugnarlo en 3 meses, o en un año si es contrario a la ley o a los estatutos (art. 18)."));
    } else if (r.estado === "pendiente") {
      s.append(p("Los ausentes debidamente citados cuentan como votos a favor si, una vez notificado el acuerdo, no se oponen en 30 días naturales (art. 17.8). Hay " + r.ausentes + " ausentes con el " + pct(r.cuotasAusentes) + " de las cuotas: se aprobará si se oponen como mucho " + r.holguraN + (r.holguraN === 1 ? " propietario" : " propietarios") + " y sus cuotas no pasan del " + pct(Math.max(0, r.holguraQ)) + ". Notifícaselo a cada ausente por un medio que deje constancia; debajo tienes la carta."));
      bloque.hidden = false;
      document.getElementById("carta-notificacion").value = notificacionAusentes({ comunidad: f.comunidad.value.trim(), direccion: f.direccion.value.trim(), fechaJunta: f.fechaJunta.value, acuerdo: f.acuerdo.value.trim(),
        secretario: f.secretario.value.trim(), presidente: f.presidente.value.trim(), localidad: f.localidad.value.trim(), fecha: f.fechaCarta.value }, r);
    } else {
      s.append(p(r.regla.presunto ? "Ni con todos los ausentes a favor se llegaría a la mayoría. El acuerdo no sale; puede volver a votarse en otra junta."
        : r.regla.total ? "En este tipo de acuerdo los ausentes no cuentan como votos a favor (art. 17.8), porque el coste no se puede repercutir a quien no votó a favor. El acuerdo no sale; puede volver a votarse en otra junta."
        : "El acuerdo no sale. Si la mayoría no se consigue, cualquier propietario puede pedir al juez, en el mes siguiente a la segunda junta, que resuelva en equidad (art. 17.7)."));
    }
  });
  var fm = document.getElementById("calc-mayoria");
  if (fm) {
    var sync = function () { document.getElementById("convocatoria-campo").hidden = fm.tipo.value !== "simple"; };
    fm.addEventListener("change", sync);
    sync();
  }

  enviar("calc-convocatoria", function (f, s) {
    var r = convocatoria({ comunidad: f.comunidad.value, direccion: f.direccion.value, tipo: f.tipo.value, fecha: f.fecha.value, hora1: f.hora1.value, hora2: f.hora2.value, lugar: f.lugar.value.trim(),
      orden: lineas(f.orden.value), convoca: f.convoca.value, presidente: f.presidente.value.trim(), morosos: lineas(f.morosos.value), fechaConvocatoria: f.fechaConvocatoria.value, localidad: f.localidad.value.trim() });
    var hoja = document.getElementById("hoja-convocatoria");
    hoja.hidden = !!r.error;
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    r.avisos.forEach(function (a) { s.append(p(a, "notice notice--warn")); });
    s.append(p("Convocatoria preparada" + (r.dias !== null ? " con " + r.dias + " días de antelación" : "") + ". Entrégala a cada propietario en el domicilio que haya comunicado a la comunidad o, si no, en su piso; si no se puede, en el tablón de anuncios con diligencia firmada, y surte efecto a los 3 días (art. 9.1.h).", "fine-print"));
    document.getElementById("texto-convocatoria").value = r.texto;
    document.getElementById("hoja-convocatoria-texto").textContent = r.texto;
  });

  enviar("calc-derrama", function (f, s) {
    var r = derrama({ importe: num(f.importe.value), lineas: parsearLista(f.lista.value), modo: f.modo.value });
    var hoja = document.getElementById("hoja-derrama");
    hoja.hidden = !!r.error;
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    if (r.aviso) s.append(p(r.aviso, "notice notice--warn"));
    s.append(cifra("Total repartido: ", euros(r.total)));
    s.append(p(r.modo === "iguales" ? "A partes iguales entre " + r.filas.length + " viviendas o locales." : "En proporción a los coeficientes (suman " + pct(r.sumaCoeficientes) + "). Los céntimos del redondeo se ajustan en la última línea."));
    var cuerpo = document.getElementById("derrama-filas");
    cuerpo.replaceChildren();
    r.filas.forEach(function (fila) {
      var tr = document.createElement("tr");
      [fila.nombre, fila.coeficiente === null ? "" : pct(fila.coeficiente), euros(fila.importe)].forEach(function (v, i) { var td = document.createElement("td"); td.textContent = v; if (i) td.className = "num"; tr.append(td); });
      cuerpo.append(tr);
    });
    document.getElementById("derrama-total").textContent = euros(r.total);
  });

  enviar("calc-moroso", function (f, s) {
    var r = cartaMoroso({ comunidad: f.comunidad.value.trim(), direccion: f.direccion.value.trim(), deudor: f.deudor.value.trim(), piso: f.piso.value.trim(), importe: num(f.importe.value), concepto: f.concepto.value.trim(),
      fecha: f.fecha.value, dias: num(f.dias.value), firmante: f.firmante.value, nombreFirmante: f.nombreFirmante.value.trim(), iban: f.iban.value.trim(), localidad: f.localidad.value.trim() });
    var bloque = document.getElementById("bloque-carta");
    bloque.hidden = !!r.error;
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    s.append(cifra("Plazo para pagar: hasta el ", fechaLarga(r.limite)));
    s.append(p("Entrégala con acuse de recibo o envíala por burofax o correo certificado: si llega a la reclamación judicial, hay que acreditar que la deuda se notificó (art. 21.3). Si no se puede entregar, vale el tablón de anuncios durante al menos 3 días.", "fine-print"));
    document.getElementById("carta-moroso").value = r.texto;
  });

  // Hojas imprimibles (convocatoria y derrama): el navegador imprime solo la hoja o la guarda en PDF
  document.querySelectorAll("[data-imprimir]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.body.classList.add("imprimir-hoja");
      root.print();
    });
  });
  root.addEventListener("afterprint", function () { document.body.classList.remove("imprimir-hoja"); });
})(typeof window !== "undefined" ? window : {});
;

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
/* lib/indices-alquiler.js */
/* Generado por tools/actualizar-indices.py con datos del INE (variación anual, %). No editar a mano.
   irav: Índice de Referencia de Arrendamientos de Vivienda (serie IRAV1). ipc: IPC general (serie IPC290750). */
(function (root) {
  "use strict";
  var INDICES = {
    "irav": {
      "2024-11": 2.2,
      "2024-12": 2.28,
      "2025-01": 2.19,
      "2025-02": 2.08,
      "2025-03": 1.98,
      "2025-04": 2.09,
      "2025-05": 1.99,
      "2025-06": 2.1,
      "2025-07": 2.15,
      "2025-08": 2.19,
      "2025-09": 2.22,
      "2025-10": 2.25,
      "2025-11": 2.29,
      "2025-12": 2.32,
      "2026-01": 2.14,
      "2026-02": 2.16,
      "2026-03": 2.47,
      "2026-04": 2.4,
      "2026-05": 2.48,
      "2026-06": 2.44,
      "2026-07": 2.49,
      "2026-08": 2.47
    },
    "ipc": {
      "2024-11": 2.4,
      "2024-12": 2.8,
      "2025-01": 2.9,
      "2025-02": 3.0,
      "2025-03": 2.3,
      "2025-04": 2.2,
      "2025-05": 2.0,
      "2025-06": 2.3,
      "2025-07": 2.7,
      "2025-08": 2.7,
      "2025-09": 3.0,
      "2025-10": 3.1,
      "2025-11": 3.0,
      "2025-12": 2.9,
      "2026-01": 2.3,
      "2026-02": 2.3,
      "2026-03": 3.4,
      "2026-04": 3.2,
      "2026-05": 3.2,
      "2026-06": 3.2,
      "2026-07": 3.6,
      "2026-08": 4.3
    },
    "actualizado": "2026-10-08"
  };
  root.__INDICES__ = INDICES;
  if (typeof module !== "undefined" && module.exports) module.exports = INDICES;
})(typeof window !== "undefined" ? window : {});
;
/* js/alquiler.js */
/* Calculadora de la actualización anual de la renta del alquiler de vivienda (art. 18 LAU).
   Todo ocurre en el navegador. calcular() no toca el DOM: la usan la página y tools/test-alquiler.js. */
(function (root) {
  "use strict";

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var LEY_2023 = "2023-05-26";   // entrada en vigor de la Ley 12/2023: desde aquí el tope es el IRAV (DA 11.ª LAU)
  var RDL_2019 = "2019-03-06";   // entrada en vigor del RDL 7/2019: desde aquí el tope es el IPC (art. 18.1 LAU)
  var RDL_2026 = "2026-10-08";   // entrada en vigor del RDL 29/2026: las actualizaciones desde aquí se limitan al IRAV en todos los contratos
  var DESDE = "2025-01-01";      // primeras actualizaciones con IRAV publicado

  function nombreMes(m) { var p = m.split("-"); return MESES[+p[1] - 1] + " de " + p[0]; }
  function fechaLarga(f) { var p = f.split("-"); return +p[2] + " de " + MESES[+p[1] - 1] + " de " + p[0]; }
  function euros(n) { return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
  function pct(n) { return n.toLocaleString("es-ES", { maximumFractionDigits: 2 }) + " %"; }
  function valida(f) { return /^\d{4}-\d{2}-\d{2}$/.test(f || "") && !isNaN(Date.parse(f)); }

  // Último mes publicado en una fecha: el INE publica el IPC y el IRAV de un mes hacia el día 15 del siguiente.
  // ponytail: regla del día 15, no el calendario exacto del INE; la página muestra el mes usado para que se compruebe.
  function mesReferencia(f) {
    var p = f.split("-").map(Number), atras = p[2] >= 15 ? 1 : 2;
    var d = new Date(Date.UTC(p[0], p[1] - 1 - atras, 1));
    return d.getUTCFullYear() + "-" + String(d.getUTCMonth() + 1).padStart(2, "0");
  }

  // e = { renta, firma, fecha, clausula: "ipc" | "irav" | "fijo" | "ninguna" | "generica", fijo }
  // tope = null o { desde, hasta, maximo, norma } (tope extraordinario de un real decreto-ley, en lib/legal-data.js)
  function calcular(e, I, tope) {
    if (!(e.renta > 0)) return { estado: "error", mensaje: "Escribe la renta mensual actual." };
    if (!valida(e.firma) || !valida(e.fecha)) return { estado: "error", mensaje: "Escribe las dos fechas." };
    if (e.fecha <= e.firma) return { estado: "error", mensaje: "La fecha de la actualización tiene que ser posterior a la firma del contrato." };
    if (e.fecha < DESDE) return { estado: "error", mensaje: "La calculadora cubre las actualizaciones desde el 1 de enero de 2025." };
    // art. 18.1: solo se actualiza «en la fecha en que se cumpla cada año de vigencia»; se avisa sin bloquear
    var aviso = e.firma.slice(5) !== e.fecha.slice(5) ? "Ojo: la renta solo se actualiza el día en que se cumple cada año de contrato (art. 18.1 LAU)." : null;
    if (e.clausula === "ninguna") return { estado: "sin-clausula", aviso: aviso };
    // Desde el RDL 29/2026: el IRAV limita todos los contratos, también los anteriores a 2023 (DT 4.ª Ley 12/2023,
    // redactada por su art. 4.Dos), y la cláusula que no dice índice se actualiza con el IRAV (art. 18.1 LAU)
    var reforma = e.fecha >= RDL_2026;
    if (e.clausula === "generica" && !reforma) return { estado: "generica", aviso: aviso };

    var mes = mesReferencia(e.fecha);
    var regimen = reforma || e.firma >= LEY_2023 ? "irav" : e.firma >= RDL_2019 ? "ipc" : "libre";
    var indice = e.clausula === "generica" ? "irav" : e.clausula;
    var pactado = e.clausula === "fijo" ? e.fijo : I[indice][mes];
    if (e.clausula === "fijo" && !isFinite(pactado)) return { estado: "error", mensaje: "Escribe el porcentaje fijo del contrato." };
    var limite = regimen === "libre" ? null : I[regimen][mes];
    if (pactado === undefined || limite === undefined) return { estado: "sin-dato", mes: mes, aviso: aviso };

    var r = { estado: "ok", mes: mes, regimen: regimen, reforma: reforma, pactado: pactado, limite: limite, aviso: aviso };
    r.pct = limite !== null && pactado > limite ? limite : pactado;
    r.limitado = r.pct !== pactado;
    if (tope && e.fecha >= tope.desde && e.fecha <= tope.hasta && r.pct > tope.maximo) {
      r.pct = tope.maximo; r.limitado = true; r.topeExtra = tope;
    }
    r.nueva = Math.round(e.renta * (1 + r.pct / 100) * 100) / 100;
    r.diferencia = Math.round((r.nueva - e.renta) * 100) / 100;
    return r;
  }

  function carta(e, r) {
    var origen = e.clausula === "fijo" ? "el porcentaje fijo pactado" : "la variación anual del " + (e.clausula === "ipc" ? "IPC" : "IRAV") + " de " + nombreMes(r.mes) + " publicada por el INE";
    if (e.clausula === "generica") origen += ", que es el índice aplicable cuando el contrato no concreta ninguno";
    var tope = r.topeExtra ? ", limitado al " + pct(r.topeExtra.maximo) + " por el " + r.topeExtra.norma
      : r.limitado ? ", limitado al " + (r.regimen === "irav" ? "IRAV" : "IPC") + " de " + nombreMes(r.mes) + " (" + pct(r.limite) + ")" : "";
    return "Asunto: actualización anual de la renta del alquiler\n\n" +
      "[Nombre de la persona arrendataria]\n[Dirección de la vivienda]\n\n" +
      "Le comunico que, conforme a la cláusula de actualización del contrato de arrendamiento firmado el " + fechaLarga(e.firma) +
      " y al artículo 18 de la Ley de Arrendamientos Urbanos, el " + fechaLarga(e.fecha) + " se cumple una nueva anualidad y la renta se actualiza un " +
      pct(r.pct) + " (" + origen + tope + ").\n\n" +
      "La renta mensual pasa de " + euros(e.renta) + " a " + euros(r.nueva) + ". Según el artículo 18.2 de la Ley de Arrendamientos Urbanos, " +
      "la nueva renta será exigible a partir del mes siguiente al de esta comunicación. Si lo desea, le facilitaré la certificación del INE.\n\n" +
      "En [localidad], a [fecha].\n\n[Nombre y firma de la persona arrendadora]";
  }

  var API = { calcular: calcular, carta: carta, mesReferencia: mesReferencia };
  if (typeof module !== "undefined" && module.exports) { module.exports = API; return; }

  // ---- Página /actualizar-alquiler/ ----
  var form = document.getElementById("calc-alquiler");
  var salida = document.getElementById("resultado-alquiler");
  var bloqueCarta = document.getElementById("bloque-carta");
  if (!form || !salida || !root.__INDICES__) return;
  var I = root.__INDICES__, tope = (root.__LEGAL__ && root.__LEGAL__.alquiler && root.__LEGAL__.alquiler.topeExtra) || null;
  var campoFijo = document.getElementById("campo-fijo");
  function syncFijo() { campoFijo.hidden = form.clausula.value !== "fijo"; }
  form.addEventListener("change", syncFijo);
  syncFijo();

  function p(texto, clase) { var n = document.createElement("p"); n.textContent = texto; if (clase) n.className = clase; return n; }
  // «1.250,50» y «750,5» al estilo español; «750.50» sin coma se lee con punto decimal
  function num(v) { v = String(v).trim(); return parseFloat(v.indexOf(",") >= 0 ? v.replace(/\./g, "").replace(",", ".") : v); }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var e = { renta: num(form.renta.value), firma: form.firma.value, fecha: form.fecha.value, clausula: form.clausula.value, fijo: num(form.fijo.value) };
    var r = calcular(e, I, tope);
    salida.replaceChildren();
    salida.hidden = false;
    bloqueCarta.hidden = r.estado !== "ok";
    if (r.estado === "error") salida.append(p(r.mensaje, "notice notice--error"));
    else if (r.estado === "sin-clausula") salida.append(p("Si el contrato no dice nada sobre la actualización, la renta no se actualiza (art. 18.1 LAU). Sigues pagando " + euros(e.renta) + " al mes."));
    else if (r.estado === "generica") salida.append(p("Hasta el 8 de octubre de 2026, si el contrato preveía actualizar la renta pero no decía con qué índice, se aplicaba la variación anual del Índice de Garantía de Competitividad, que publica el INE (art. 18.1 LAU). Esta calculadora no lo incluye. Desde el 8 de octubre de 2026 se aplica el IRAV: pon esa fecha de actualización o posterior."));
    else if (r.estado === "sin-dato") salida.append(p("El INE todavía no ha publicado el índice de " + nombreMes(r.mes) + ". Se publica hacia el día 15 del mes siguiente: vuelve entonces.", "notice notice--warn"));
    else {
      var cifra = document.createElement("p"), b = document.createElement("strong");
      cifra.className = "alquiler-cifra";
      b.textContent = euros(r.nueva) + " al mes";
      cifra.append("Nueva renta: ", b, " (" + (r.diferencia >= 0 ? "+" : "") + euros(r.diferencia) + ", " + pct(r.pct) + ")");
      salida.append(cifra);
      salida.append(p(r.topeExtra ? "Se aplica el tope extraordinario del " + pct(r.topeExtra.maximo) + " (" + r.topeExtra.norma + "), que rige si no hay un nuevo pacto entre las partes. Si la renta supera el límite del índice de precios de referencia de la vivienda, no procede ninguna subida."
        : r.regimen === "irav" && r.reforma && e.firma < LEY_2023 ? "Desde el 8 de octubre de 2026 el tope del IRAV se aplica a todos los contratos, también a los firmados antes del 26 de mayo de 2023 (disposición transitoria cuarta de la Ley 12/2023, redactada por el Real Decreto-ley 29/2026): la subida no puede superar el " + pct(r.limite) + " de " + nombreMes(r.mes) + "."
        : r.regimen === "irav" ? "Tu contrato es del 26 de mayo de 2023 o posterior: la subida no puede superar el IRAV (" + pct(r.limite) + " en " + nombreMes(r.mes) + ")."
        : r.regimen === "ipc" ? "Tu contrato es de entre el 6 de marzo de 2019 y el 25 de mayo de 2023: la subida no puede superar el IPC (" + pct(r.limite) + " en " + nombreMes(r.mes) + ")."
        : "Tu contrato es anterior al 6 de marzo de 2019: se aplica lo pactado, sin el tope del IPC ni del IRAV."));
      if (e.clausula === "generica") salida.append(p("El contrato prevé actualizar la renta sin decir con qué índice: desde el 8 de octubre de 2026 se aplica el IRAV (art. 18.1 LAU, redactado por el Real Decreto-ley 29/2026).", "fine-print"));
      if (e.clausula !== "fijo") salida.append(p("Índice " + (e.clausula === "generica" ? "aplicable" : "pactado") + ": " + (e.clausula === "ipc" ? "IPC" : "IRAV") + " de " + nombreMes(r.mes) + " = " + pct(r.pactado) + ". Es el último que el INE suele tener publicado en esa fecha; si la actualización cae cerca del día 15, compruébalo.", "fine-print"));
      if (r.pct < 0) salida.append(p("El índice es negativo: la renta baja.", "fine-print"));
      salida.append(p("La nueva renta se paga a partir del mes siguiente al de la comunicación por escrito (art. 18.2 LAU).", "fine-print"));
      document.getElementById("carta-alquiler").value = carta(e, r);
    }
    if (r.aviso) salida.append(p(r.aviso, "notice notice--warn"));
    salida.focus();
    if (root.__track) root.__track("alquiler_calculado");
  });
})(typeof window !== "undefined" ? window : {});
;

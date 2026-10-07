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
/* js/doc-validate.js */
/* Comprobaciones del documento informativo (RD 723/2026). Funciones puras, sin acceso a la página.
   validate(datos, { catalog, legal, paso }) → { errors: [...], warnings: [...] }
   - errors: bloquean el avance (solo los del paso pedido, o todos si no se indica paso).
   - warnings: avisos amables que no bloquean; se calculan siempre que haya datos para ello.
   Cada elemento: { code, campo, mensaje } con mensajes en castellano llano.
   En el navegador: window.__IC_VALIDATE__. En Node: require(). */
(function (root) {
  "use strict";

  var LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";
  var fmtEuros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var fmtNum = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 });

  // Números escritos a la española: «1.221,50», «1221,5», «1.221», «60 €». Devuelve el número o,
  // si no se entiende, el texto tal cual para que la validación lo marque como no válido.
  function parseNumero(s) {
    if (typeof s === "number") return s;
    var t = String(s === undefined || s === null ? "" : s).replace(/[\s€%]/g, "");
    if (t === "") return "";
    if (t.indexOf(",") >= 0) t = t.replace(/\./g, "").replace(",", ".");
    else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, "");
    var n = Number(t);
    return isNaN(n) ? String(s) : n;
  }

  function flag(v, d) { return typeof v === "function" ? !!v(d) : !!v; }
  function vacio(v) {
    return v === undefined || v === null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0);
  }
  function visible(c, d) { return c.visible === undefined ? true : flag(c.visible, d); }
  function etiqueta(c, d) { return (d.modoHogar && c.labelHogar) || c.label; }

  // «aaaa-mm-dd» → fecha UTC; null si no es una fecha real
  function parseFecha(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    if (!m) return null;
    var f = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return f.getUTCMonth() === +m[2] - 1 ? f : null;
  }
  function sumarMeses(f, n) {
    var r = new Date(f.getTime());
    r.setUTCMonth(r.getUTCMonth() + n);
    return r;
  }
  // Días de contrato contando el primero y el último (del 1 al 28 = 28 días)
  function diasContrato(ini, fin) { return Math.round((fin - ini) / 86400000) + 1; }

  function dniValido(s) {
    var v = String(s).toUpperCase().replace(/[\s.-]/g, "");
    var m = /^([XYZ]?)(\d{7,8})([A-Z])$/.exec(v);
    if (!m) return false;
    if (m[1] ? m[2].length !== 7 : m[2].length !== 8) return false;
    var num = parseInt((m[1] ? "XYZ".indexOf(m[1]) : "") + m[2], 10);
    return LETRAS_DNI[num % 23] === m[3];
  }

  // Salario anual fijo aproximado (sin variables), para compararlo con el salario mínimo.
  function salarioAnual(d) {
    var base = Number(d.salarioBase);
    if (!(base > 0)) return null;
    var comp = (d.complementos || []).reduce(function (s, c) {
      var i = Number(c && c.importe);
      return s + (i > 0 ? i : 0);
    }, 0);
    if (d.salarioPeriodo === "anio") return base + comp * 12;
    if (d.salarioPeriodo === "hora") {
      var h = Number(d.horasSemanales);
      return h > 0 ? base * h * 52 + comp * 12 : null;
    }
    return base * (12 + (Number(d.pagasExtra) || 0)) + comp * 12;
  }

  function mesesDePrueba(cantidad, unidad) {
    var n = Number(cantidad);
    if (unidad === "dias") return n / 30;
    if (unidad === "semanas") return n * 7 / 30;
    return n;
  }

  function validate(datos, opts) {
    var C = opts.catalog, L = opts.legal, paso = opts.paso;
    var d = C.withDefaults(datos);
    var errors = [], warnings = [];
    var enPaso = function (c) { return paso === undefined || c.paso === paso; };

    // --- Campos: obligatorios, longitud y números ---
    C.CAMPOS.forEach(function (c) {
      if (!enPaso(c) || !visible(c, d)) return;
      var v = d[c.id], nombre = "«" + etiqueta(c, d) + "»";

      if (c.tipo === "lista") {
        (v || []).forEach(function (item, i) {
          var nom = item && item.nombre, imp = item && item.importe;
          if (vacio(nom) && vacio(imp)) return;
          if (vacio(nom)) errors.push({ code: "REQUERIDO", campo: c.id, indice: i, mensaje: "Pon nombre al complemento " + (i + 1) + "." });
          var n = Number(imp);
          if (vacio(imp) || !(n > 0) || n > 99999) errors.push({ code: "NUMERO_INVALIDO", campo: c.id, indice: i, mensaje: "Indica el importe mensual del complemento " + (i + 1) + "." });
        });
        return;
      }
      if (c.tipo === "checkbox") return;

      if (vacio(v)) {
        if (flag(c.requerido, d)) errors.push({ code: "REQUERIDO", campo: c.id, mensaje: "Rellena " + nombre + "." });
        return;
      }
      if (c.max && typeof v === "string" && v.length > c.max) {
        errors.push({ code: "LONGITUD", campo: c.id, mensaje: nombre + " es demasiado largo: máximo " + c.max + " caracteres." });
      }
      if (c.tipo === "number") {
        var num = Number(v);
        if (isNaN(num) || (c.min !== undefined && num < c.min) || (c.max !== undefined && num > c.max)) {
          errors.push({ code: "NUMERO_INVALIDO", campo: c.id, mensaje: nombre + ": escribe un número entre " + fmtNum.format(c.min) + " y " + fmtNum.format(c.max) + "." });
        }
      }
      if (c.tipo === "date" && !parseFecha(v)) {
        errors.push({ code: "FECHA_INVALIDA", campo: c.id, mensaje: nombre + ": la fecha no es válida." });
      }
    });

    // --- Fechas del contrato temporal (paso 2) ---
    var ini = parseFecha(d.fechaInicio), fin = parseFecha(d.fechaFin);
    var temporal = d.tipoContrato === "temporal";
    if ((paso === undefined || paso === 2) && temporal && ini && fin) {
      if (fin < ini) {
        errors.push({ code: "FECHAS_IMPOSIBLES", campo: "fechaFin", mensaje: "La fecha de finalización no puede ser anterior a la de inicio." });
      } else if (diasContrato(ini, fin) <= L.exclusionDias) {
        errors.push({
          code: "DURACION_4_SEMANAS", campo: "fechaFin",
          mensaje: "Este contrato dura " + diasContrato(ini, fin) + " días. El documento del RD 723/2026 solo es obligatorio en relaciones laborales de más de cuatro semanas (art. 2.2), así que no se puede generar."
        });
      }
    }

    // --- Avisos (no bloquean) ---
    if (!vacio(d.trabajadorDni) && !dniValido(d.trabajadorDni)) {
      warnings.push({ code: "DNI_FORMATO", campo: "trabajadorDni", mensaje: "Revisa el DNI o NIE: el número y la letra no coinciden." });
    }

    var h = Number(d.horasSemanales), anual = salarioAnual(d);
    if (d.modoHogar && d.salarioPeriodo === "hora" && Number(d.salarioBase) > 0 && Number(d.salarioBase) < L.smi.hogarHora) {
      warnings.push({
        code: "BAJO_SMI", campo: "salarioBase",
        mensaje: "El salario por hora es inferior al mínimo de " + L.smi.anio + " para el empleo de hogar por horas (" + String(L.smi.hogarHora).replace(".", ",") + " € por hora trabajada). Revísalo."
      });
    } else if (anual !== null && h > 0) {
      var minimo = L.smi.anual * Math.min(h, L.smi.jornadaSemanal) / L.smi.jornadaSemanal;
      if (anual < minimo * 0.995) {
        warnings.push({
          code: "BAJO_SMI", campo: "salarioBase",
          mensaje: "Con estos datos el salario anual es de unos " + fmtEuros.format(anual) + ", por debajo del salario mínimo de " + L.smi.anio + " para " + String(h).replace(".", ",") + " horas semanales (" + fmtEuros.format(minimo) + "). Revísalo con tu convenio: podría ser un error."
        });
      }
    }

    if (!d.pruebaNoAplica && Number(d.pruebaCantidad) > 0) {
      var meses = mesesDePrueba(d.pruebaCantidad, d.pruebaUnidad);
      var maximo = d.tecnicoTitulado ? L.prueba.tecnicosMeses
        : (Number(d.numTrabajadores) < L.prueba.umbralPymeTrabajadores ? L.prueba.restoPymeMeses : L.prueba.restoMeses);
      var motivo = d.tecnicoTitulado ? "técnicos titulados" : (maximo === L.prueba.restoPymeMeses ? "empresas de menos de " + L.prueba.umbralPymeTrabajadores + " personas" : "este puesto");
      var norma = "art. 14.1 del Estatuto de los Trabajadores";
      if (d.modoHogar) { maximo = L.prueba.hogarMeses; motivo = "el empleo de hogar"; norma = "art. 6.2 del Real Decreto 1620/2011"; }
      if (temporal && ini && fin && fin <= sumarMeses(ini, 6)) { maximo = 1; motivo = "contratos temporales de hasta seis meses"; norma = "art. 14.1 del Estatuto de los Trabajadores"; }
      if (meses > maximo + 1e-9) {
        warnings.push({
          code: "PRUEBA_LARGA", campo: "pruebaCantidad",
          mensaje: "El periodo de prueba supera el máximo legal de " + maximo + (maximo === 1 ? " mes" : " meses") + " para " + motivo + " (" + norma + ")" + (d.modoHogar ? "." : ", salvo que tu convenio fije otro.")
        });
      }
    }

    if (h > L.smi.jornadaSemanal) {
      warnings.push({ code: "HORAS_MAS_40", campo: "horasSemanales", mensaje: "La jornada máxima es de 40 horas semanales de promedio en cómputo anual (art. 34.1 del Estatuto de los Trabajadores)." });
    }
    var vac = Number(d.vacacionesDias);
    if (vac > 0 && ((d.vacacionesUnidad === "naturales" && vac < 30) || (d.vacacionesUnidad === "laborables" && vac < 22))) {
      warnings.push({ code: "VACACIONES_MINIMO", campo: "vacacionesDias", mensaje: "El mínimo legal son 30 días naturales de vacaciones al año (art. 38 del Estatuto de los Trabajadores); 22 días laborables es la equivalencia habitual." });
    }

    if (!d.modoHogar) {
      var plantilla = Number(d.numTrabajadores);
      if (plantilla >= 50 && d.planIgualdadEstado === "no") {
        warnings.push({ code: "IGUALDAD_OBLIGATORIO", campo: "planIgualdadEstado", mensaje: "Las empresas de 50 o más personas deben tener plan de igualdad (Ley Orgánica 3/2007)." });
      }
      if (plantilla > 50 && d.lgtbiEstado === "no") {
        warnings.push({ code: "LGTBI_OBLIGATORIO", campo: "lgtbiEstado", mensaje: "Las empresas de más de 50 personas deben contar con medidas para la igualdad de las personas LGTBI (Real Decreto 1026/2024)." });
      }
      if (d.protocoloNoDispone) {
        warnings.push({ code: "ACOSO_OBLIGATORIO", campo: "protocoloNoDispone", mensaje: "Todas las empresas deben tener un protocolo frente al acoso sexual y por razón de sexo (art. 48 de la Ley Orgánica 3/2007)." });
      }
      if (!vacio(d.convenioCodigo) && !/^\d{14}$/.test(String(d.convenioCodigo).replace(/\s/g, ""))) {
        warnings.push({ code: "CONVENIO_CODIGO", campo: "convenioCodigo", mensaje: "El código de convenio suele tener 14 cifras. Compruébalo en el boletín o en el buscador de convenios." });
      }
    }

    // Aviso del modo hogar: siempre visible cuando está activo
    if (d.modoHogar) warnings.push({ code: "HOGAR", campo: "modoHogar", mensaje: C.TEXTOS.hogarAviso });

    return { errors: errors, warnings: warnings };
  }

  var API = { validate: validate, dniValido: dniValido, salarioAnual: salarioAnual, parseFecha: parseFecha, parseNumero: parseNumero };
  root.__IC_VALIDATE__ = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : {});
;
/* js/doc-model.js */
/* Modelo del documento informativo del RD 723/2026: convierte los datos del formulario en los
   17 apartados (art. 3.2 a–q) listos para la vista previa y el PDF. Función pura y determinista.
   buildDocModel(datos, { catalog, legal, tipo, marca, actualizado }) → modelo
   Nunca devuelve un apartado vacío: si falta un dato opcional usa el texto estándar del catálogo.
   En el navegador: window.__IC_MODEL__. En Node: require(). */
(function (root) {
  "use strict";

  var fmtEuros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
  var fmtFecha = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  var fmtNum = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 });

  function t(v) { return v === undefined || v === null ? "" : String(v).trim(); }
  function euros(v) { return fmtEuros.format(Number(v)); }
  function fecha(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? fmtFecha.format(new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))) : t(s);
  }
  function punto(s) { s = t(s); return s && !/[.!?]$/.test(s) ? s + "." : s; }
  function frases() { return Array.prototype.filter.call(arguments, Boolean).map(punto).join(" "); }

  var PERIODO = { mes: "al mes", anio: "al año", hora: "a la hora" };
  var UNIDAD_PRUEBA = { dias: ["día", "días"], semanas: ["semana", "semanas"], meses: ["mes", "meses"] };
  var TURNOS = {
    nocturno: "Parte de la jornada se desarrolla en trabajo nocturno",
    turnos: "La jornada se desarrolla a turnos",
    ambos: "La jornada se desarrolla a turnos e incluye trabajo nocturno"
  };

  // Un redactor por letra del art. 3.2. Reciben los datos ya completados con sus valores por defecto.
  var REDACTAR = {
    a: function (d) {
      return frases(
        (d.modoHogar ? "Persona empleadora: " : "Empresa: ") + t(d.empresaNombre) + (t(d.empresaNif) ? ", con NIF " + t(d.empresaNif) : ", con NIF ______________"),
        "Persona trabajadora: " + t(d.trabajadorNombre) + (t(d.trabajadorDni) ? ", con DNI/NIE " + t(d.trabajadorDni) : "")
      );
    },
    b: function (d) {
      var tipo = { indefinido: "Contrato indefinido", temporal: "Contrato temporal", "fijo-discontinuo": "Contrato fijo discontinuo" }[d.tipoContrato] || "Contrato de trabajo";
      var dur = "";
      if (d.tipoContrato === "temporal") {
        dur = t(d.fechaFin) ? "Fecha de finalización: " + fecha(d.fechaFin) : "Duración previsible: " + t(d.duracionPrevista);
      }
      return frases("Fecha de comienzo de la relación laboral: " + fecha(d.fechaInicio), tipo, dur);
    },
    c: function (d) {
      var centro = d.centroIgualDomicilio ? "La persona trabajadora presta sus servicios en ese mismo domicilio" : "Centro de trabajo habitual: " + t(d.centroTrabajo);
      return frases((d.modoHogar ? "Domicilio de la persona empleadora: " : "Domicilio social: ") + t(d.empresaDomicilio), centro, t(d.lugarNotas));
    },
    d: function (d) {
      return frases(
        "Contenido de la prestación laboral: " + t(d.funciones),
        d.tipoContrato === "temporal" ? "Causa de la contratación temporal, circunstancias que la justifican y su conexión con la duración prevista: " + t(d.causaTemporal) : ""
      );
    },
    e: function (d) {
      // El art. 3.2.e pide también «la caracterización o la descripción resumida» del puesto: se repiten las funciones
      return frases("Grupo o categoría profesional: " + t(d.categoria), "Puesto de trabajo: " + t(d.puesto),
        t(d.funciones) ? "Descripción resumida del puesto: " + t(d.funciones) : "");
    },
    f: function (d) {
      var comps = (d.complementos || []).filter(function (c) { return c && t(c.nombre) && Number(c.importe) > 0; });
      var compTxt = comps.length
        ? "Complementos salariales: " + comps.map(function (c) { return t(c.nombre) + ", " + euros(c.importe) + " brutos al mes"; }).join("; ")
        : "No se perciben complementos salariales";
      var pagas = Number(d.pagasExtra) || 0;
      var pagasTxt = pagas ? pagas + (pagas === 1 ? " paga extraordinaria" : " pagas extraordinarias") + " al año" + (d.pagasProrrateadas ? ", prorrateadas en las mensualidades" : "") : "";
      // Hogar por horas sin pagas aparte: el salario por hora lo incluye todo (art. 8.5 del RD 1620/2011)
      if (!pagas && d.modoHogar && d.salarioPeriodo === "hora") pagasTxt = "El salario por hora incluye todos los conceptos retributivos, también la parte proporcional de las pagas extraordinarias y de las vacaciones (art. 8.5 del Real Decreto 1620/2011)";
      var metodo = { transferencia: "transferencia bancaria", cheque: "cheque", efectivo: "efectivo" }[d.formaPago] || t(d.formaPago);
      return frases(
        "Salario base: " + euros(d.salarioBase) + " brutos " + (PERIODO[d.salarioPeriodo] || ""),
        compTxt,
        d.modoHogar && t(d.hogarEspecie) ? "Salario en especie: " + t(d.hogarEspecie) : "",
        pagasTxt,
        "Periodicidad de pago: " + t(d.periodicidadPago),
        "Método de pago: " + metodo,
        d.variablesNoAplica ? "No hay conceptos salariales variables" : "Conceptos variables, modo de cálculo y criterios de percepción: " + t(d.variables)
      );
    },
    g: function (d, C) {
      var h = fmtNum.format(Number(d.horasSemanales));
      // En el hogar no hay convenio: sin horas anuales, solo la jornada semanal
      var anual = Number(d.horasAnuales) > 0 ? " y " + fmtNum.format(Number(d.horasAnuales)) + " horas anuales"
        : d.modoHogar ? "" : " y la jornada anual que fije el convenio colectivo aplicable";
      // Si la jornada es parcial y el texto de horas extra es uno de los propuestos, se usa el propio del tiempo parcial
      var extraPropuesto = t(d.horasExtra) === t(C.TEXTOS.horasExtra) || t(d.horasExtra) === t(C.TEXTOS.hogarHorasExtra);
      var extra = d.tipoJornada === "parcial" && extraPropuesto ? C.TEXTOS.horasExtraParcial : t(d.horasExtra);
      var irregular = d.irregularNoAplica
        ? "No se establece una distribución irregular de la jornada a lo largo del año"
        : frases("Distribución irregular de la jornada: " + t(d.irregularSistema), "Preaviso mínimo antes del comienzo de la tarea y de su cancelación: " + t(d.irregularPreaviso));
      return frases(
        "Jornada " + (d.tipoJornada === "parcial" ? "a tiempo parcial" : "completa") + " de " + h + " horas semanales" + anual,
        "Distribución horaria: " + t(d.horario),
        d.modoHogar && t(d.hogarPresencia) ? "Tiempo de presencia: " + t(d.hogarPresencia) : "",
        d.modoHogar && t(d.hogarPernocta) ? "Pernocta en el domicilio familiar: " + t(d.hogarPernocta) : "",
        d.nocturnoTurnos && d.nocturnoTurnos !== "no" ? TURNOS[d.nocturnoTurnos] + ": " + t(d.nocturnoDetalle) : "No se realiza trabajo nocturno ni a turnos",
        "Modificación de la jornada y cambios de turno: " + t(d.modificacionJornada),
        "Horas extraordinarias: " + extra,
        "Vacaciones: " + t(d.vacacionesDias) + " días " + t(d.vacacionesUnidad) + " al año. " + t(d.vacacionesProcedimiento),
        irregular,
        d.tipoContrato === "fijo-discontinuo" ? "Periodos de actividad e inactividad: " + t(d.periodosActividad) : ""
      );
    },
    h: function (d, C) {
      if (d.pruebaNoAplica) return C.APARTADOS.filter(function (a) { return a.id === "h"; })[0].textoNoAplica;
      var n = Number(d.pruebaCantidad), u = UNIDAD_PRUEBA[d.pruebaUnidad] || ["", ""];
      return frases("Duración del periodo de prueba: " + fmtNum.format(n) + " " + (n === 1 ? u[0] : u[1]), t(d.pruebaCondiciones));
    },
    i: function (d) { return t(d.formacion); },
    j: function (d, C) {
      if (d.modoHogar || d.ettNoAplica) return C.TEXTOS.ettNo;
      return frases("Empresa usuaria: " + t(d.ettEmpresaUsuaria), "Causa del contrato de puesta a disposición: " + t(d.ettCausa));
    },
    k: function (d, C) {
      if (d.modoHogar) return C.TEXTOS.hogarAlgoritmos;
      return d.algoritmos === "si"
        ? "La empresa utiliza sistemas algorítmicos o automatizados de toma de decisiones. Pautas, criterios y reglas de funcionamiento: " + punto(d.algoritmosDescripcion)
        : C.TEXTOS.algoritmosNo;
    },
    l: function (d, C) {
      if (d.modoHogar) return C.TEXTOS.hogarIgualdad;
      return frases(
        d.planIgualdadEstado === "si" ? "Plan de igualdad aplicable: " + t(d.planIgualdad) : C.TEXTOS.planIgualdadNo,
        t(d.conciliacion) ? "Política de conciliación de la empresa: " + t(d.conciliacion) : C.TEXTOS.conciliacionNo,
        d.protocoloNoDispone ? C.TEXTOS.acosoNo : "Protocolo frente al acoso sexual y por razón de sexo: " + t(d.protocoloAcoso)
      );
    },
    m: function (d, C) {
      if (d.modoHogar) return C.TEXTOS.hogarLgtbi;
      return d.lgtbiEstado === "si" ? "Medidas para la igualdad y no discriminación de las personas LGTBI: " + punto(d.lgtbiMedidas) : C.TEXTOS.lgtbiNo;
    },
    n: function (d) { return t(d.extincion); },
    o: function (d, C) {
      if (d.modoHogar) return C.TEXTOS.hogarConvenio;
      return frases(
        "Convenio colectivo aplicable: " + t(d.convenioNombre),
        "Código: " + t(d.convenioCodigo),
        "Publicación: " + t(d.convenioPublicacion),
        "Vigencia: " + t(d.convenioVigencia),
        t(d.convenioUltraactividad) ? "Ultraactividad: " + t(d.convenioUltraactividad) : ""
      );
    },
    p: function (d, C) {
      return frases(
        "Entidad gestora de la Seguridad Social: " + C.TEXTOS.ssEntidad,
        t(d.ssMutua) ? "Mutua colaboradora con la Seguridad Social: " + t(d.ssMutua) : "No hay mutua colaboradora concertada; la cobertura de las contingencias corresponde a la entidad gestora",
        (d.modoHogar ? "La persona empleadora" : "La empresa") + " no colabora directamente en la gestión de la Seguridad Social",
        t(d.mejoras) ? "Mejoras voluntarias y planes o fondos de pensiones: " + t(d.mejoras) : C.TEXTOS.mejorasNo
      );
    },
    q: function (d) { return t(d.modificaciones); }
  };
  // Marca de la versión gratuita en el pie de cada página de todos los PDF: no hay forma de quitarla
  // (quitarla sería una ventaja del futuro plan de pago, sección 13 del plan).
  function marca(opts, que) { return que + " gratis con " + (opts.marca || "InfoContrato") + " (" + (opts.web || "infocontrato.es") + ")"; }

  function buildDocModel(datos, opts) {
    var C = opts.catalog, L = opts.legal;
    var d = C.withDefaults(datos);
    var hogar = !!d.modoHogar;

    var apartados = C.APARTADOS.map(function (ap) {
      var texto = t(REDACTAR[ap.id](d, C, L));
      return { id: ap.id, titulo: ap.titulo, cita: ap.cita, texto: texto || ap.textoNoAplica || "" };
    });

    return {
      tipo: opts.tipo || "inicial",
      titulo: "Información sobre los elementos esenciales del contrato de trabajo y las principales condiciones de trabajo",
      subtitulo: "Artículo 3 del " + L.norma.nombre,
      partes: {
        etiquetaEmpresa: hogar ? "Persona empleadora" : "Empresa",
        empresa: t(d.empresaNombre) + " (NIF " + (t(d.empresaNif) || "______________") + ")",
        trabajador: t(d.trabajadorNombre)
      },
      apartados: apartados,
      ejemplares: ["Ejemplar para la persona trabajadora", "Ejemplar para la empresa: firmar y conservar como prueba de entrega"],
      recibi: {
        texto: "Recibí el presente documento informativo sobre los elementos esenciales de mi contrato de trabajo y las principales condiciones de trabajo (artículo 3 del " + L.norma.nombre + ").",
        lugarFecha: "En ______________________, a ____ de ________________ de ______",
        firmas: ["La persona trabajadora", hogar ? "La persona empleadora" : "Por la empresa"]
      },
      avisos: hogar ? [C.TEXTOS.hogarAviso] : [],
      pie: marca(opts, "Generado") + ". Actualizado el " + fecha(opts.actualizado || L.revisado) + " conforme al " + L.norma.nombre + "."
    };
  }

  // Carta con la que la persona trabajadora pide la información (página /solicitar-informacion/).
  // datos: { nombre, dni, empresa, fechaAlta, lugar }; opts: { legal, hoy: "aaaa-mm-dd", marca }.
  // caso: "transitoria" (ya trabajaba cuando entró en vigor: 30 días hábiles, disposición transitoria única),
  // "nuevo" (alta desde la entrada en vigor: antes de empezar, art. 7.1) o "sin-fecha" (vista previa incompleta).
  function buildLetterModel(datos, opts) {
    var L = opts.legal, d = datos || {}, hoy = opts.hoy, alta = t(d.fechaAlta);
    var norma = L.norma.nombre, normaCorta = norma.split(",")[0];
    var caso = !/^\d{4}-\d{2}-\d{2}$/.test(alta) ? "sin-fecha" : alta < L.norma.vigor ? "transitoria" : "nuevo";
    var quien = "Me llamo " + t(d.nombre) + (t(d.dni) ? " (DNI/NIE " + t(d.dni) + ")" : "");
    var parrafos = [quien + (caso === "sin-fecha" ? " y trabajo en esa empresa"
      : alta > hoy ? " y comenzaré a trabajar en esa empresa el " + fecha(alta) : " y trabajo en esa empresa desde el " + fecha(alta)) + "."];
    if (caso === "transitoria") {
      parrafos.push(
        "Conforme a la disposición transitoria única del " + norma + ", solicito que me entreguen por escrito la información sobre los elementos esenciales de mi contrato de trabajo y las principales condiciones de trabajo que enumera su artículo 3, en la parte que no figure ya en mi contrato escrito.",
        "La empresa dispone de un plazo de treinta días hábiles, contados desde la recepción de esta solicitud, para entregármela."
      );
    } else if (caso === "nuevo") {
      parrafos.push(
        "El artículo 7.1 del " + norma + " obliga a la empresa a entregar por escrito, antes del inicio de la relación laboral, la información sobre los elementos esenciales del contrato de trabajo y las principales condiciones de trabajo que enumera su artículo 3.",
        alta > hoy
          ? "Por ello, solicito que me la entreguen por escrito antes de esa fecha, en la parte que no figure en mi contrato escrito."
          : "Como no la he recibido, o no la he recibido completa, solicito que me la entreguen por escrito cuanto antes, en la parte que no figure en mi contrato escrito."
      );
    } else {
      parrafos.push("[Indica tu fecha de alta: el texto cambia según empezaras a trabajar antes o después del " + fecha(L.norma.vigor) + ".]");
    }
    parrafos.push(
      "Pueden entregármela en papel o en formato electrónico, siempre que pueda acceder a ella, guardarla e imprimirla (artículo 6.2 del mismo real decreto).",
      "Les ruego que me devuelvan una copia de esta carta firmada o sellada con la fecha en que la reciben."
    );
    return {
      tipo: "carta",
      caso: caso,
      lugarFecha: t(d.lugar) + ", a " + fecha(hoy),
      destinatario: "A la atención de " + t(d.empresa),
      asunto: "Asunto: solicitud de información sobre mis condiciones de trabajo (" + normaCorta + ")",
      parrafos: parrafos,
      despedida: "Atentamente,",
      firma: [t(d.nombre), t(d.dni) ? "DNI/NIE " + t(d.dni) : ""].filter(Boolean),
      recepcion: { titulo: "Recibido por la empresa", lineas: ["Fecha de recepción:", "Nombre, firma y sello:"] },
      pie: marca(opts, "Carta generada") + " conforme al " + norma + "."
    };
  }

  // Comunicación de un cambio en las condiciones de trabajo (página /comunicar-cambio/): arts. 5 y 7.3.
  // datos: { empresaNombre, empresaNif, modoHogar, trabajadorNombre, trabajadorDni, fechaEfecto, cambios: [{ id, texto }] };
  // opts: { catalog, legal, marca, actualizado }. Misma forma que buildDocModel, así que js/pdf.js lo imprime igual.
  function buildChangeModel(datos, opts) {
    var C = opts.catalog, L = opts.legal, d = datos || {}, hogar = !!d.modoHogar, norma = L.norma.nombre;
    var efecto = /^\d{4}-\d{2}-\d{2}$/.test(t(d.fechaEfecto)) ? fecha(t(d.fechaEfecto)) : "[fecha de efecto]";
    var textos = {};
    (d.cambios || []).forEach(function (c) { textos[c.id] = t(c.texto); });
    return {
      tipo: "modificacion",
      titulo: "Comunicación de modificación de las condiciones de trabajo",
      subtitulo: "Artículos 5 y 7.3 del " + norma,
      partes: {
        etiquetaEmpresa: hogar ? "Persona empleadora" : "Empresa",
        empresa: t(d.empresaNombre) + (t(d.empresaNif) ? " (NIF " + t(d.empresaNif) + ")" : ""),
        trabajador: t(d.trabajadorNombre) + (t(d.trabajadorDni) ? " (DNI/NIE " + t(d.trabajadorDni) + ")" : "")
      },
      intro: "Conforme al artículo 5 del " + norma + ", " + (hogar ? "la persona empleadora" : "la empresa") +
        " comunica por escrito a la persona trabajadora la modificación de las condiciones de trabajo que se indican a continuación, con efectos desde el " +
        efecto + ". Las demás condiciones de las que fue informada no cambian.",
      apartados: C.APARTADOS.filter(function (ap) { return ap.id in textos; }).map(function (ap) {
        return { id: ap.id, titulo: ap.titulo, cita: ap.cita, texto: textos[ap.id] || "[describe la nueva condición]" };
      }),
      ejemplares: ["Ejemplar para la persona trabajadora", "Ejemplar para " + (hogar ? "la persona empleadora" : "la empresa") + ": firmar y conservar como prueba de entrega"],
      recibi: {
        texto: "Recibí la presente comunicación de la modificación de mis condiciones de trabajo (artículos 5 y 7.3 del " + norma + ").",
        lugarFecha: "En ______________________, a ____ de ________________ de ______",
        firmas: ["La persona trabajadora", hogar ? "La persona empleadora" : "Por la empresa"]
      },
      avisos: [],
      pie: marca(opts, "Generado") + ". Actualizado el " + fecha(opts.actualizado || L.revisado) + " conforme al " + norma + "."
    };
  }

  var API = { buildDocModel: buildDocModel, buildLetterModel: buildLetterModel, buildChangeModel: buildChangeModel, fecha: fecha, euros: euros };
  root.__IC_MODEL__ = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
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
/* js/carta.js */
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
;

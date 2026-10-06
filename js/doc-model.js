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

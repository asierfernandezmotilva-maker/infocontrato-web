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

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

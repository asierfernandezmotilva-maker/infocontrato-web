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
  // El RDL 28/2026 reescribe el art. 10 desde el 15/11/2026: si el periodo mínimo vence desde esa fecha, el casero avisa con
  // 6 meses (4 si el vencimiento es anterior al 15/05/2027, DT única.2), la prórroga tácita es de 5 o 7 años y, si el casero
  // no renueva sin causa del art. 10.2, indemniza. Si el mínimo venció antes, el contrato sigue en la prórroga tácita antigua
  // (por años, hasta 3) hasta que termine (DT única.3).
  // e = { inicio: "AAAA-MM-DD", anios: duración pactada en años, juridica: el casero es una empresa }
  var ART10_2026 = "2026-11-15";
  function duracionAlquiler(e) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.inicio || "")) return { error: "Escribe la fecha de inicio del contrato." };
    if (e.inicio < "2019-03-06") return { error: "Los contratos firmados antes del 6 de marzo de 2019 tienen otros plazos. Esta calculadora cubre los firmados desde esa fecha." };
    if (!(e.anios > 0) || e.anios > 30) return { error: "Escribe la duración pactada en años (por ejemplo, 1)." };
    var minimo = e.juridica ? 7 : 5;
    var meses = Math.round(e.anios * 12);
    var r = { minimo: minimo, finPactado: sumarFecha(e.inicio, meses), prorrogaObligatoria: meses < minimo * 12 };
    r.finMinimo = r.prorrogaObligatoria ? sumarFecha(e.inicio, minimo * 12) : r.finPactado;
    r.nuevoArt10 = r.finMinimo >= ART10_2026;
    r.mesesAvisoCasero = r.nuevoArt10 && r.finMinimo >= sumarFecha(ART10_2026, 6) ? 6 : 4;
    r.avisoCasero = sumarFecha(r.finMinimo, -r.mesesAvisoCasero);
    r.avisoInquilino = sumarFecha(r.finMinimo, -2);
    r.finTacita = sumarFecha(r.finMinimo, r.nuevoArt10 ? minimo * 12 : 36);
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

  // ---- Indemnización al inquilino si el casero no renueva (art. 10.1 LAU, redactado por el RDL 28/2026, desde el 15/11/2026):
  // la mayor entre 12 mensualidades y una por año residido (prorrateo por meses y, dentro del mes, por días), con el valor
  // superior del índice de precios de referencia o, si no lo hay, la renta vigente ----
  // e = { entrada: "AAAA-MM-DD" (desde cuándo vive), salida: "AAAA-MM-DD" (vencimiento), renta, indice (opcional) }
  function diasEntre(a, b) { var x = a.split("-"), y = b.split("-"); return Math.round((Date.UTC(y[0], y[1] - 1, y[2]) - Date.UTC(x[0], x[1] - 1, x[2])) / 86400000); }
  function indemnizacionAlquiler(e) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.entrada || "") || !/^\d{4}-\d{2}-\d{2}$/.test(e.salida || "")) return { error: "Escribe las dos fechas." };
    if (e.salida <= e.entrada) return { error: "La fecha en que termina el contrato tiene que ser posterior a la de entrada." };
    if (e.salida < ART10_2026) return { error: "La indemnización solo existe para los contratos que terminan desde el 15 de noviembre de 2026 (Real Decreto-ley 28/2026)." };
    if (!(e.renta > 0)) return { error: "Escribe la renta mensual actual." };
    var base = e.indice > 0 ? e.indice : e.renta;
    var meses = 0;
    while (sumarFecha(e.entrada, meses + 1) <= e.salida) meses++;
    var ancla = sumarFecha(e.entrada, meses);
    var anios = (meses + diasEntre(ancla, e.salida) / diasEntre(ancla, sumarFecha(ancla, 1))) / 12;
    var r = { base: base, porIndice: e.indice > 0, anios: redondea(anios), doce: redondea(12 * base), porAnios: redondea(base * anios) };
    r.total = Math.max(r.doce, r.porAnios);
    return r;
  }

  var API = { periodoPrueba: periodoPrueba, smi: smi, duracionAlquiler: duracionAlquiler, indemnizacionAlquiler: indemnizacionAlquiler, sumarFecha: sumarFecha, cartaDimision: cartaDimision, vacaciones: vacaciones };
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

  enviar("calc-indemnizacion", function (f, s) {
    var r = indemnizacionAlquiler({ entrada: f.entrada.value, salida: f.salida.value, renta: num(f.renta.value), indice: num(f.indice.value) });
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    s.append(cifra("Indemnización: ", euros(r.total)));
    s.append(p("Es la mayor de estas dos cantidades: 12 mensualidades (" + euros(r.doce) + ") o una mensualidad por cada año vivido en la vivienda (" + r.anios.toLocaleString("es-ES") + " años: " + euros(r.porAnios) + "), calculadas con " +
      (r.porIndice ? "el valor superior del índice de precios de referencia (" + euros(r.base) + " al mes)" : "la renta actual (" + euros(r.base) + " al mes), porque no has indicado el valor del índice de precios de referencia") + " (art. 10.1 LAU)."));
    s.append(p("Se cobra al entregar la vivienda. No hay indemnización si el casero hace constar en el aviso una de las causas del art. 10.2 (abajo), si el aviso de no renovar es anterior al 8 de octubre de 2026 o si podías pedir una prórroga legal obligatoria para el casero y no la pediste.", "fine-print"));
  });

  enviar("calc-duracion", function (f, s) {
    var r = duracionAlquiler({ inicio: f.inicio.value, anios: num(f.anios.value), juridica: f.casero.value === "juridica" });
    if (r.error) { s.append(p(r.error, "notice notice--error")); return; }
    s.append(cifra("El contrato dura, como mínimo, hasta el ", fechaLarga(r.finMinimo)));
    if (r.prorrogaObligatoria) s.append(p("Se pactó por menos de " + r.minimo + " años: al vencer el " + fechaLarga(r.finPactado) + " se prorroga año a año, obligatoriamente para el casero, hasta cumplir " + r.minimo + " años. El inquilino puede irse al final de cada año avisando con 30 días de antelación (art. 9.1)."));
    s.append(p("Para no renovar después, el casero tiene que avisar como tarde el " + fechaLarga(r.avisoCasero) + " (" + r.mesesAvisoCasero + " meses antes) y el inquilino como tarde el " + fechaLarga(r.avisoInquilino) + " (2 meses antes) (art. 10.1" + (r.nuevoArt10 && r.mesesAvisoCasero === 4 ? " y disposición transitoria única del Real Decreto-ley 28/2026" : "") + ")."));
    if (r.nuevoArt10) {
      s.append(p("Si nadie avisa, el contrato se prorroga " + r.minimo + " años más, hasta el " + fechaLarga(r.finTacita) + ", y así sucesivamente (art. 10.1, redactado por el Real Decreto-ley 28/2026, en vigor desde el 15 de noviembre de 2026)."));
      s.append(p("Si el casero avisa de que no renueva sin una causa del art. 10.2 (por ejemplo, necesitar la vivienda para él o su familia hasta el segundo grado, o que el inquilino tenga otra vivienda en el municipio), tiene que indemnizar al inquilino al entregar la vivienda: lo mayor entre 12 mensualidades según el valor superior del índice de precios de referencia de la vivienda y una mensualidad por cada año vivido en ella; si la vivienda no tiene valor en el índice, se usa la renta vigente (art. 10.1)."));
    } else {
      s.append(p("Si nadie avisa, se prorroga año a año hasta el " + fechaLarga(r.finTacita) + " como máximo. En esos años el inquilino puede irse avisando con un mes de antelación al final de cada anualidad (art. 10.1 en su redacción anterior al 15 de noviembre de 2026, que sigue rigiendo esta prórroga por la disposición transitoria única del Real Decreto-ley 28/2026). Al terminar, se aplicará el nuevo artículo 10."));
    }
    if (r.finMinimo <= "2028-12-31") s.append(p("Como el contrato termina antes del 31 de diciembre de 2028, si estás al corriente de pago puedes pedir una prórroga extraordinaria de hasta 2 años (Real Decreto-ley 29/2026): mira cómo en la página de la prórroga del alquiler.", "fine-print"));
    s.append(p("Desde el " + fechaLarga(r.desistimiento) + " el inquilino puede dejar la vivienda avisando con 30 días de antelación; si el contrato lo prevé, pagaría una mensualidad por cada año que falte, o la parte proporcional (art. 11).", "fine-print"));
  });
})(typeof window !== "undefined" ? window : {});

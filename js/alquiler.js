/* Calculadora de la actualización anual de la renta del alquiler de vivienda (art. 18 LAU).
   Todo ocurre en el navegador. calcular() no toca el DOM: la usan la página y tools/test-alquiler.js. */
(function (root) {
  "use strict";

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var LEY_2023 = "2023-05-26";   // entrada en vigor de la Ley 12/2023: desde aquí el tope es el IRAV (DA 11.ª LAU)
  var RDL_2019 = "2019-03-06";   // entrada en vigor del RDL 7/2019: desde aquí el tope es el IPC (art. 18.1 LAU)
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
    if (e.clausula === "generica") return { estado: "generica", aviso: aviso };

    var mes = mesReferencia(e.fecha);
    var regimen = e.firma >= LEY_2023 ? "irav" : e.firma >= RDL_2019 ? "ipc" : "libre";
    var pactado = e.clausula === "fijo" ? e.fijo : I[e.clausula][mes];
    if (e.clausula === "fijo" && !isFinite(pactado)) return { estado: "error", mensaje: "Escribe el porcentaje fijo del contrato." };
    var limite = regimen === "libre" ? null : I[regimen][mes];
    if (pactado === undefined || limite === undefined) return { estado: "sin-dato", mes: mes, aviso: aviso };

    var r = { estado: "ok", mes: mes, regimen: regimen, pactado: pactado, limite: limite, aviso: aviso };
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
    else if (r.estado === "generica") salida.append(p("Si el contrato prevé actualizar la renta pero no dice con qué índice, se aplica la variación anual del Índice de Garantía de Competitividad, que publica el INE (art. 18.1 LAU). Esta calculadora no lo incluye."));
    else if (r.estado === "sin-dato") salida.append(p("El INE todavía no ha publicado el índice de " + nombreMes(r.mes) + ". Se publica hacia el día 15 del mes siguiente: vuelve entonces.", "notice notice--warn"));
    else {
      var cifra = document.createElement("p"), b = document.createElement("strong");
      cifra.className = "alquiler-cifra";
      b.textContent = euros(r.nueva) + " al mes";
      cifra.append("Nueva renta: ", b, " (" + (r.diferencia >= 0 ? "+" : "") + euros(r.diferencia) + ", " + pct(r.pct) + ")");
      salida.append(cifra);
      salida.append(p(r.topeExtra ? "Se aplica el tope extraordinario del " + pct(r.topeExtra.maximo) + " (" + r.topeExtra.norma + "), salvo que las partes pacten otra cosa."
        : r.regimen === "irav" ? "Tu contrato es del 26 de mayo de 2023 o posterior: la subida no puede superar el IRAV (" + pct(r.limite) + " en " + nombreMes(r.mes) + ")."
        : r.regimen === "ipc" ? "Tu contrato es de entre el 6 de marzo de 2019 y el 25 de mayo de 2023: la subida no puede superar el IPC (" + pct(r.limite) + " en " + nombreMes(r.mes) + ")."
        : "Tu contrato es anterior al 6 de marzo de 2019: se aplica lo pactado, sin el tope del IPC ni del IRAV."));
      if (e.clausula !== "fijo") salida.append(p("Índice pactado: " + (e.clausula === "ipc" ? "IPC" : "IRAV") + " de " + nombreMes(r.mes) + " = " + pct(r.pactado) + ". Es el último que el INE suele tener publicado en esa fecha; si la actualización cae cerca del día 15, compruébalo.", "fine-print"));
      if (r.pct < 0) salida.append(p("El índice es negativo: la renta baja.", "fine-print"));
      salida.append(p("La nueva renta se paga a partir del mes siguiente al de la comunicación por escrito (art. 18.2 LAU).", "fine-print"));
      document.getElementById("carta-alquiler").value = carta(e, r);
    }
    if (r.aviso) salida.append(p(r.aviso, "notice notice--warn"));
    salida.focus();
    if (root.__track) root.__track("alquiler_calculado");
  });
})(typeof window !== "undefined" ? window : {});

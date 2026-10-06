/* PDF del documento informativo (RD 723/2026) con jsPDF: solo texto real (seleccionable y legible por
   lectores de pantalla), nunca capturas. Blanco y negro, A4, márgenes de 20 mm, letra Helvetica estándar
   (cubre €, ñ, tildes y «»). Dos ejemplares completos, cada uno desde página nueva, con su rótulo y su
   propia numeración «Página X de Y»; el Recibí cierra cada ejemplar.
   buildPdf(model, { jsPDF, marca, logo }) → documento jsPDF (logo opcional: { dataUrl, ancho, alto }): el navegador lo convierte en Blob y Node en bytes
   (tools/make-pdf.js genera los PDF de prueba con este mismo código).
   En el navegador: window.__IC_PDF__ (se carga con jsPDF al llegar al paso 5). En Node: require(). */
(function (root) {
  "use strict";

  var ALTO_A4 = 297, MX = 20, ARRIBA = 20, ABAJO = 24, ANCHO = 170;
  var MM_POR_PT = 0.3528, INTERLINEA = 1.4;
  var TINTA = 20, GRIS = 95; // escala de grises 0–255

  function fuenteDe(doc, pt, estilo, gris) {
    doc.setFont("helvetica", estilo || "normal");
    doc.setFontSize(pt);
    doc.setTextColor(gris === undefined ? TINTA : gris);
  }
  function alto(pt) { return pt * MM_POR_PT * INTERLINEA; }
  // Espacios finos que puede meter Intl y caracteres invisibles: la fuente estándar no los tiene
  function limpio(s) { return String(s === undefined || s === null ? "" : s).replace(/[   ]/g, " ").replace(/[​-‍﻿]/g, ""); }

  function buildPdf(model, opts) {
    var doc = new opts.jsPDF({ unit: "mm", format: "a4", compress: true });
    doc.setProperties({ title: model.titulo, subject: "Información sobre las condiciones de trabajo (RD 723/2026)", creator: opts.marca || "InfoContrato" });
    doc.setLanguage("es-ES");
    var y = ARRIBA, rotulo = "", tramos = [];

    function fuente(pt, estilo, gris) { fuenteDe(doc, pt, estilo, gris); }
    function lineas(txt, pt, estilo) { fuente(pt, estilo); return doc.splitTextToSize(limpio(txt), ANCHO); }
    function cabe(mm) { return y + mm <= ALTO_A4 - ABAJO; }
    function nuevaPagina() {
      doc.addPage();
      y = ARRIBA;
      fuente(8, "normal", GRIS);
      doc.text(rotulo, MX, y, { baseline: "top" }); // si las hojas se separan, cada una dice de qué ejemplar es
      y += 8;
    }
    function escribir(txt, pt, estilo, gris, despues) {
      var ls = lineas(txt, pt, estilo), lh = alto(pt);
      ls.forEach(function (l) {
        if (!cabe(lh)) nuevaPagina();
        fuente(pt, estilo, gris);
        doc.text(l, MX, y, { baseline: "top" });
        y += lh;
      });
      y += despues || 0;
    }
    function raya(despues) {
      doc.setDrawColor(190);
      doc.setLineWidth(0.2);
      doc.line(MX, y, MX + ANCHO, y);
      y += despues;
    }

    function apartado(a) {
      var cabecera = a.id + ") " + a.titulo;
      // El título nunca se queda solo al pie de una página: entra con su cita y al menos dos líneas
      var minimo = lineas(cabecera, 10.5, "bold").length * alto(10.5) + alto(8) + Math.min(2, lineas(a.texto, 10).length) * alto(10);
      if (!cabe(minimo)) nuevaPagina();
      escribir(cabecera, 10.5, "bold", TINTA, 0);
      escribir(a.cita, 8, "normal", GRIS, 1);
      escribir(a.texto, 10, "normal", TINTA, 4.5);
    }

    function recibi(r) {
      var bloque = alto(10.5) + lineas(r.texto, 10).length * alto(10) + 5 + alto(10) + 30;
      if (!cabe(bloque)) nuevaPagina();
      y += 2;
      raya(5);
      escribir("Recibí", 10.5, "bold", TINTA, 1);
      escribir(r.texto, 10, "normal", TINTA, 5);
      escribir(r.lugarFecha, 10, "normal", TINTA, 20); // hueco para firmar
      var col = (ANCHO - 12) / 2;
      doc.setDrawColor(60);
      doc.setLineWidth(0.3);
      r.firmas.forEach(function (f, i) {
        var x = MX + i * (col + 12);
        doc.line(x, y, x + col, y);
        fuente(9, "normal", GRIS);
        doc.text(limpio(f), x, y + 2, { baseline: "top" });
      });
      y += 8;
    }

    model.ejemplares.forEach(function (ejemplar, i) {
      if (i > 0) doc.addPage();
      var primera = doc.getNumberOfPages();
      rotulo = ejemplar;
      y = ARRIBA;
      if (opts.logo) { // logo de la empresa (opcional): 14 mm de alto como máximo, 50 de ancho, sin deformar
        var la = 14, lw = la * opts.logo.ancho / opts.logo.alto;
        if (lw > 50) { lw = 50; la = lw * opts.logo.alto / opts.logo.ancho; }
        doc.addImage(opts.logo.dataUrl, /^data:image\/png/.test(opts.logo.dataUrl) ? "PNG" : "JPEG", MX, y, lw, la);
        y += la + 5;
      }
      escribir(ejemplar, 9, "bold", GRIS, 4);
      escribir(model.titulo, 14, "bold", TINTA, 1.5);
      escribir(model.subtitulo, 10, "normal", GRIS, 5);
      escribir(model.partes.etiquetaEmpresa + ": " + model.partes.empresa, 10, "normal", TINTA, 0.5);
      escribir("Persona trabajadora: " + model.partes.trabajador, 10, "normal", TINTA, 4);
      raya(6);
      if (model.intro) escribir(model.intro, 10, "normal", TINTA, 5); // comunicación de un cambio: qué y desde cuándo
      model.apartados.forEach(apartado);
      recibi(model.recibi);
      tramos.push([primera, doc.getNumberOfPages()]);
    });

    // Pie en cada página, con la numeración de su ejemplar (segunda pasada: ya se sabe el total)
    tramos.forEach(function (tr) {
      var total = tr[1] - tr[0] + 1;
      for (var p = tr[0]; p <= tr[1]; p++) {
        doc.setPage(p);
        fuente(7.5, "normal", GRIS);
        doc.text(doc.splitTextToSize(limpio(model.pie), 125), MX, ALTO_A4 - 16, { baseline: "top" });
        doc.text("Página " + (p - tr[0] + 1) + " de " + total, MX + ANCHO, ALTO_A4 - 16, { baseline: "top", align: "right" });
      }
    });
    return doc;
  }

  // Carta de la persona trabajadora (doc-model.js → buildLetterModel): una página, márgenes de carta,
  // hueco para firmar y un recuadro para que la empresa anote la fecha de recepción y la selle.
  function buildLetterPdf(carta, opts) {
    var doc = new opts.jsPDF({ unit: "mm", format: "a4", compress: true });
    doc.setProperties({ title: carta.asunto.replace(/^Asunto: /, ""), subject: "Solicitud de información (RD 723/2026)", creator: opts.marca || "InfoContrato" });
    doc.setLanguage("es-ES");
    var X = 25, W = 160, y = 30;
    function escribir(txt, pt, estilo, despues, derecha) {
      fuenteDe(doc, pt, estilo);
      doc.splitTextToSize(limpio(txt), W).forEach(function (l) {
        if (y + alto(pt) > ALTO_A4 - ABAJO) { doc.addPage(); y = ARRIBA; fuenteDe(doc, pt, estilo); }
        doc.text(l, derecha ? X + W : X, y, { baseline: "top", align: derecha ? "right" : "left" });
        y += alto(pt);
      });
      y += despues || 0;
    }
    escribir(carta.lugarFecha, 11, "normal", 10, true);
    escribir(carta.destinatario, 11, "normal", 6);
    escribir(carta.asunto, 11, "bold", 6);
    carta.parrafos.forEach(function (p) { escribir(p, 11, "normal", 3.5); });
    escribir(carta.despedida, 11, "normal", 24); // hueco para la firma
    doc.setDrawColor(60);
    doc.setLineWidth(0.3);
    doc.line(X, y, X + 70, y);
    y += 2;
    carta.firma.forEach(function (f) { escribir(f, 10, "normal", 0); });

    // Recuadro de recepción, al pie de la página (o en otra si no cabe)
    var caja = 30, cajaY = Math.max(y + 12, ALTO_A4 - ABAJO - caja - 4);
    if (cajaY + caja > ALTO_A4 - ABAJO) { doc.addPage(); cajaY = ARRIBA; }
    doc.setDrawColor(150);
    doc.setLineWidth(0.25);
    doc.rect(X, cajaY, W, caja);
    fuenteDe(doc, 9, "bold", GRIS);
    doc.text(carta.recepcion.titulo, X + 4, cajaY + 4, { baseline: "top" });
    fuenteDe(doc, 9, "normal", GRIS);
    carta.recepcion.lineas.forEach(function (l, i) { doc.text(l, X + 4 + i * (W / 2), cajaY + 11, { baseline: "top" }); });

    for (var p = 1; p <= doc.getNumberOfPages(); p++) {
      doc.setPage(p);
      fuenteDe(doc, 7.5, "normal", GRIS);
      doc.text(limpio(carta.pie), X, ALTO_A4 - 16, { baseline: "top" });
    }
    return doc;
  }

  var API = { buildPdf: buildPdf, buildLetterPdf: buildLetterPdf };
  root.__IC_PDF__ = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : {});

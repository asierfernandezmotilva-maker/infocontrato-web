/* Word (.docx) del documento informativo, con el mismo modelo que el PDF (js/doc-model.js → js/pdf.js) para que
   ambos digan exactamente lo mismo. Sin librerías: un .docx es un ZIP de XML y aquí se empaqueta sin comprimir.
   A4, márgenes de 20 mm, Arial. Cada ejemplar es una sección propia que empieza en página nueva, con su rótulo y su
   numeración «Página X»; el Recibí cierra cada ejemplar. Sin logo: en Word se puede poner a mano.
   buildDocx(model) y buildLetterDocx(carta) → Uint8Array. En el navegador: window.__IC_DOCX__ (y IC.docx.blob); en Node: require()
   (tools/make-plantilla-word.js genera con este mismo código la plantilla publicada). */
(function (root) {
  "use strict";

  var MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  var TINTA = "141414", GRIS = "5F5F5F";

  // ---------- ZIP sin compresión (método 0) ----------
  var CRC = (function () {
    var t = [];
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(b) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function utf8(s) { return new TextEncoder().encode(s); }
  function zip(archivos) { // [{ nombre, datos: Uint8Array }]
    var partes = [], central = [], offset = 0;
    function u16(v) { return [v & 0xFF, (v >>> 8) & 0xFF]; }
    function u32(v) { return [v & 0xFF, (v >>> 8) & 0xFF, (v >>> 16) & 0xFF, (v >>> 24) & 0xFF]; }
    var HORA = 0, FECHA = (2026 - 1980) << 9 | 1 << 5 | 1; // fecha fija: el mismo contenido da los mismos bytes
    archivos.forEach(function (a) {
      var nombre = utf8(a.nombre), crc = crc32(a.datos), tam = a.datos.length;
      var comun = [].concat(u16(20), u16(0x0800), u16(0), u16(HORA), u16(FECHA), u32(crc), u32(tam), u32(tam), u16(nombre.length), u16(0));
      var local = new Uint8Array([0x50, 0x4B, 0x03, 0x04].concat(comun));
      partes.push(local, nombre, a.datos);
      central.push(new Uint8Array([0x50, 0x4B, 0x01, 0x02].concat(u16(20), comun, u16(0), u16(0), u16(0), u32(0), u32(offset))), nombre);
      offset += local.length + nombre.length + tam;
    });
    var tamCentral = central.reduce(function (s, p) { return s + p.length; }, 0);
    var fin = new Uint8Array([0x50, 0x4B, 0x05, 0x06].concat(u16(0), u16(0), u16(archivos.length), u16(archivos.length), u32(tamCentral), u32(offset), u16(0)));
    var todo = partes.concat(central, [fin]), total = todo.reduce(function (s, p) { return s + p.length; }, 0);
    var out = new Uint8Array(total), pos = 0;
    todo.forEach(function (p) { out.set(p, pos); pos += p.length; });
    return out;
  }

  // ---------- WordprocessingML ----------
  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function run(txt, o) {
    o = o || {};
    var rpr = (o.negrita ? "<w:b/>" : "") + (o.color ? '<w:color w:val="' + o.color + '"/>' : "") + (o.pt ? '<w:sz w:val="' + Math.round(o.pt * 2) + '"/>' : "");
    return String(txt).split("\n").map(function (l, i) {
      return "<w:r>" + (rpr ? "<w:rPr>" + rpr + "</w:rPr>" : "") + (i ? "<w:br/>" : "") + '<w:t xml:space="preserve">' + esc(l) + "</w:t></w:r>";
    }).join("");
  }
  // o: { pt, negrita, color, antes, despues (en pt), conSiguiente, rayaArriba, rayaAbajo, derecha, estilo }
  function parrafo(txt, o) {
    o = o || {};
    var ppr = (o.estilo ? '<w:pStyle w:val="' + o.estilo + '"/>' : "") + (o.conSiguiente ? "<w:keepNext/>" : "") +
      (o.rayaArriba || o.rayaAbajo ? "<w:pBdr>" +
        (o.rayaArriba ? '<w:top w:val="single" w:sz="4" w:space="8" w:color="BEBEBE"/>' : "") +
        (o.rayaAbajo ? '<w:bottom w:val="single" w:sz="4" w:space="8" w:color="BEBEBE"/>' : "") + "</w:pBdr>" : "") +
      '<w:spacing w:before="' + Math.round((o.antes || 0) * 20) + '" w:after="' + Math.round((o.despues || 0) * 20) + '"/>' +
      (o.derecha ? '<w:jc w:val="right"/>' : "");
    return "<w:p><w:pPr>" + ppr + "</w:pPr>" + (txt === "" ? "" : run(txt, o)) + "</w:p>";
  }
  function firmas(lista) { // dos columnas con la raya de firma encima del texto
    var ancho = 4500;
    var celdas = lista.map(function (f) {
      return '<w:tc><w:tcPr><w:tcW w:w="' + ancho + '" w:type="dxa"/><w:tcBorders><w:top w:val="single" w:sz="6" w:color="3C3C3C"/></w:tcBorders></w:tcPr>' +
        parrafo(f, { pt: 9, color: GRIS, antes: 2 }) + "</w:tc>";
    });
    var hueco = '<w:tc><w:tcPr><w:tcW w:w="638" w:type="dxa"/></w:tcPr><w:p/></w:tc>';
    return '<w:tbl><w:tblPr><w:tblW w:w="9638" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>' +
      '<w:gridCol w:w="' + ancho + '"/><w:gridCol w:w="638"/><w:gridCol w:w="' + ancho + '"/></w:tblGrid><w:tr>' +
      celdas[0] + hueco + (celdas[1] || '<w:tc><w:p/></w:tc>') + "</w:tr></w:tbl>";
  }
  // Propiedades de sección: A4, pie propio y numeración que empieza en 1 (en el documento, en cada ejemplar)
  var MARGEN_DOC = '<w:pgMar w:top="1134" w:right="1134" w:bottom="1361" w:left="1134" w:header="567" w:footer="680" w:gutter="0"/>';
  var MARGEN_CARTA = '<w:pgMar w:top="1701" w:right="1417" w:bottom="1361" w:left="1417" w:header="567" w:footer="680" w:gutter="0"/>';
  function seccion(ultima, margen) {
    var s = '<w:sectPr><w:footerReference w:type="default" r:id="rIdPie"/><w:type w:val="nextPage"/>' +
      '<w:pgSz w:w="11906" w:h="16838"/>' + (margen || MARGEN_DOC) + '<w:pgNumType w:start="1"/></w:sectPr>';
    return ultima ? s : "<w:p><w:pPr>" + s + "</w:pPr></w:p>";
  }

  function cuerpo(model) {
    var x = [];
    model.ejemplares.forEach(function (ejemplar, i) {
      x.push(parrafo(ejemplar, { pt: 9, negrita: true, color: GRIS, despues: 10 }));
      x.push(parrafo(model.titulo, { pt: 14, negrita: true, despues: 3 }));
      x.push(parrafo(model.subtitulo, { color: GRIS, despues: 12 }));
      x.push(parrafo(model.partes.etiquetaEmpresa + ": " + model.partes.empresa, { despues: 1 }));
      x.push(parrafo("Persona trabajadora: " + model.partes.trabajador, { despues: 12, rayaAbajo: true }));
      if (model.intro) x.push(parrafo(model.intro, { despues: 12 }));
      model.apartados.forEach(function (a) {
        x.push(parrafo(a.id + ") " + a.titulo, { pt: 10.5, negrita: true, conSiguiente: true, antes: 4 }));
        x.push(parrafo(a.cita, { pt: 8, color: GRIS, conSiguiente: true, despues: 2 }));
        x.push(parrafo(a.texto, { despues: 8 }));
      });
      var r = model.recibi;
      x.push(parrafo("Recibí", { pt: 10.5, negrita: true, conSiguiente: true, antes: 10, rayaArriba: true, despues: 3 }));
      x.push(parrafo(r.texto, { conSiguiente: true, despues: 12 }));
      x.push(parrafo(r.lugarFecha, { conSiguiente: true, despues: 48 })); // hueco para firmar
      x.push(firmas(r.firmas));
      x.push(seccion(i === model.ejemplares.length - 1));
    });
    return x.join("");
  }

  // Carta de la persona trabajadora (doc-model.js → buildLetterModel), como buildLetterPdf: fecha a la derecha,
  // hueco y raya para firmar y un recuadro para que la empresa anote la recepción y la selle.
  function cuerpoCarta(c) {
    var x = [], pt = 11;
    x.push(parrafo(c.lugarFecha, { pt: pt, despues: 20, derecha: true }));
    x.push(parrafo(c.destinatario, { pt: pt, despues: 12 }));
    x.push(parrafo(c.asunto, { pt: pt, negrita: true, despues: 12 }));
    c.parrafos.forEach(function (t) { x.push(parrafo(t, { pt: pt, despues: 8 })); });
    x.push(parrafo(c.despedida, { pt: pt, despues: 54, conSiguiente: true }));
    x.push(parrafo("______________________________", { pt: pt, color: GRIS, conSiguiente: true }));
    c.firma.forEach(function (f) { x.push(parrafo(f, { pt: 10, conSiguiente: true })); });
    x.push(parrafo("", { despues: 24 }));
    var celda = parrafo(c.recepcion.titulo, { pt: 9, negrita: true, color: GRIS, antes: 4, despues: 6 }) +
      c.recepcion.lineas.map(function (l) { return parrafo(l, { pt: 9, color: GRIS, despues: 18 }); }).join("");
    x.push('<w:tbl><w:tblPr><w:tblW w:w="9072" w:type="dxa"/><w:tblBorders>' +
      ["top", "left", "bottom", "right"].map(function (b) { return "<w:" + b + ' w:val="single" w:sz="4" w:color="969696"/>'; }).join("") +
      '</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="170" w:type="dxa"/><w:right w:w="170" w:type="dxa"/></w:tblCellMar></w:tblPr>' +
      '<w:tblGrid><w:gridCol w:w="9072"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="9072" w:type="dxa"/></w:tcPr>' + celda + "</w:tc></w:tr></w:tbl>");
    x.push(seccion(true, MARGEN_CARTA));
    return x.join("");
  }

  var NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  var CAB = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';

  // Empaqueta el cuerpo con estilos, pie (texto de marca y, si se pide, «Página X») y propiedades del documento
  function empaquetar(o) {
    var campo = function (instr) {
      var rpr = '<w:rPr><w:color w:val="' + GRIS + '"/><w:sz w:val="15"/></w:rPr>';
      return "<w:r>" + rpr + '<w:fldChar w:fldCharType="begin"/></w:r>' +
        "<w:r>" + rpr + '<w:instrText xml:space="preserve"> ' + instr + " </w:instrText></w:r>" +
        "<w:r>" + rpr + '<w:fldChar w:fldCharType="separate"/></w:r>' +
        "<w:r>" + rpr + "<w:t>1</w:t></w:r>" +
        "<w:r>" + rpr + '<w:fldChar w:fldCharType="end"/></w:r>';
    };
    var gris = { pt: 7.5, color: GRIS };
    // sin «de Y»: LibreOffice y Google Docs no calculan SECTIONPAGES
    var pie = CAB + "<w:ftr " + NS + ">" +
      '<w:p><w:pPr><w:tabs><w:tab w:val="right" w:pos="9638"/></w:tabs><w:spacing w:before="0" w:after="0"/></w:pPr>' +
      run(o.pie, gris) + (o.paginas ? "<w:r><w:tab/></w:r>" + run("Página ", gris) + campo("PAGE") : "") + "</w:p></w:ftr>";

    var estilos = CAB + "<w:styles " + NS + ">" +
      '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/>' +
      '<w:color w:val="' + TINTA + '"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:lang w:val="es-ES"/></w:rPr></w:rPrDefault>' +
      '<w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="300" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
      '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style></w:styles>';

    var documento = CAB + "<w:document " + NS + "><w:body>" + o.cuerpo + "</w:body></w:document>";

    var core = CAB + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
      'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      "<dc:title>" + esc(o.titulo) + "</dc:title><dc:subject>" + esc(o.asunto) + "</dc:subject>" +
      "<dc:creator>InfoContrato</dc:creator><dc:language>es-ES</dc:language>" +
      '<dcterms:created xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:created></cp:coreProperties>';

    var tipos = CAB + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
      '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>';
    var rels = CAB + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>';
    var relsDoc = CAB + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rIdEstilos" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      '<Relationship Id="rIdPie" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>';

    return zip([
      { nombre: "[Content_Types].xml", datos: utf8(tipos) },
      { nombre: "_rels/.rels", datos: utf8(rels) },
      { nombre: "docProps/core.xml", datos: utf8(core) },
      { nombre: "word/document.xml", datos: utf8(documento) },
      { nombre: "word/styles.xml", datos: utf8(estilos) },
      { nombre: "word/footer1.xml", datos: utf8(pie) },
      { nombre: "word/_rels/document.xml.rels", datos: utf8(relsDoc) }
    ]);
  }

  function buildDocx(model) {
    return empaquetar({ cuerpo: cuerpo(model), pie: model.pie, paginas: true, titulo: model.titulo, asunto: "Información sobre las condiciones de trabajo (RD 723/2026)" });
  }
  function buildLetterDocx(carta) {
    return empaquetar({ cuerpo: cuerpoCarta(carta), pie: carta.pie, paginas: false, titulo: carta.asunto.replace(/^Asunto: /, ""), asunto: "Solicitud de información (RD 723/2026)" });
  }

  var API = { buildDocx: buildDocx, buildLetterDocx: buildLetterDocx, MIME: MIME };
  root.__IC_DOCX__ = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : {});

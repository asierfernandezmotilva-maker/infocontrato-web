/* Comprobador «¿Cumples el RD 723/2026?». Todo ocurre en el navegador: no se guarda ni se envía nada.
   Las 7 preguntas (name = id de PREGUNTAS) están escritas en multa-documento-informativo/index.html. */
(function () {
  "use strict";

  var PREGUNTAS = [
    { id: "plazo", puerta: true,
      falta: { t: "No estás obligado a entregarlo", d: "Con cuatro semanas o menos no hace falta el documento (art. 2.2). Si la relación se alarga, sí.", href: "../rd-723-2026/", a: "Ver la guía" } },
    { id: "antes", falta: { t: "Entrégalo antes del primer día", d: "Prepáralo con tiempo: con el generador son unos 3 minutos.", href: "../", a: "Hacer el documento" } },
    { id: "apartados", falta: { t: "Completa los 17 apartados (a–q)", d: "Si falta alguno, no cumples del todo. El generador los trae todos y propone los textos.", href: "../rd-723-2026/#apartados", a: "Ver los 17 apartados" } },
    { id: "formato", falta: { t: "Usa un formato válido", d: "Vale papel o un archivo que la persona pueda abrir, guardar e imprimir (por ejemplo, un PDF por correo).", href: "../rd-723-2026/#enviar", a: "Cómo enviarlo" } },
    { id: "prueba", falta: { t: "Guarda la prueba de la entrega", d: "El PDF de InfoContrato lleva dos ejemplares y un recibí: uno para la persona y otro firmado para ti.", href: "../", a: "Descargar con recibí" } },
    { id: "cambios", falta: { t: "Comunica los cambios por escrito", d: "Cualquier cambio de condiciones se comunica por escrito como tarde el día en que surte efecto.", href: "../comunicar-cambio/", a: "Comunicar un cambio" } },
    { id: "plantilla", falta: { t: "Prepara la respuesta para la plantilla actual", d: "Solo hay que dárselo a quien ya trabaja si lo pide, y con un plazo propio.", href: "../rd-723-2026/#plantilla-actual", a: "Plantilla ya contratada" } }
  ];

  var form = document.getElementById("comprobador");
  var salida = document.getElementById("resultado");
  if (!form || !salida) return;

  // Las preguntas están en el HTML de la página (sin salto al cargar); aquí solo se calcula el resultado.
  var aviso = document.getElementById("check-aviso");

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt) n.textContent = txt;
    return n;
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var resp = {}, sinContestar = 0;
    PREGUNTAS.forEach(function (p) {
      var c = form.querySelector('input[name="' + p.id + '"]:checked');
      if (c) resp[p.id] = c.value; else sinContestar++;
    });
    if (sinContestar) {
      aviso.textContent = "Te faltan " + sinContestar + " pregunta" + (sinContestar > 1 ? "s" : "") + " por contestar.";
      return;
    }
    aviso.textContent = "";
    salida.hidden = false;
    salida.textContent = "";

    var puerta = PREGUNTAS[0];
    if (resp[puerta.id] === "no") {
      salida.appendChild(el("h2", "", "Resultado: no estás obligado"));
      salida.appendChild(el("p", "", puerta.falta.d));
      var l0 = el("a", "btn btn--secondary", puerta.falta.a);
      l0.href = puerta.falta.href;
      salida.appendChild(l0);
      salida.focus();
      return;
    }

    var pendientes = PREGUNTAS.filter(function (p) { return !p.puerta && resp[p.id] !== "si"; });
    var ok = PREGUNTAS.length - 1 - pendientes.length;
    salida.appendChild(el("h2", "", pendientes.length ? "Te faltan " + pendientes.length + " de " + (PREGUNTAS.length - 1) + " puntos" : "Cumples los " + (PREGUNTAS.length - 1) + " puntos"));
    salida.appendChild(el("p", "", "Has marcado " + ok + " de " + (PREGUNTAS.length - 1) + " como resueltos (los «No lo sé» cuentan como pendientes)."));
    if (pendientes.length) {
      var ul = el("ul", "check-pendientes");
      pendientes.forEach(function (p) {
        var li = el("li");
        li.appendChild(el("strong", "", p.falta.t));
        li.appendChild(el("span", "", " " + p.falta.d + " "));
        var a = el("a", "", p.falta.a);
        a.href = p.falta.href;
        li.appendChild(a);
        ul.appendChild(li);
      });
      salida.appendChild(ul);
      var cta = el("div", "cta-box");
      var b = el("a", "btn btn--primary", "Hacer el documento gratis");
      b.href = "../";
      cta.appendChild(b);
      var m = el("a", "btn btn--secondary", "Qué multa hay");
      m.href = "../multa-documento-informativo/";
      cta.appendChild(m);
      salida.appendChild(cta);
    } else {
      salida.appendChild(el("p", "", "Buen trabajo. Guarda la prueba de cada entrega al menos tres años (plazo general de prescripción de las infracciones, art. 4.1 de la LISOS)."));
    }
    salida.focus();
  });
})();

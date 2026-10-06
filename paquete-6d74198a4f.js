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
    updated: "2026-10-06", // fecha visible «Actualizado el…»; se pone la del día de publicación (sección 11)
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
    // (tools/actualizar-indices.py, cada mes). topeExtra: límite extraordinario a la actualización anual que fije un
    // real decreto-ley, p. ej. { desde: "2026-10-08", hasta: "2027-12-31", maximo: 2, norma: "Real Decreto-ley X/2026" }.
    // null = no hay ninguno en vigor. El RDL 26/2026 (2 %) lo derogó el Congreso el 02/10/2026 (BOE-A-2026-20526).
    alquiler: {
      topeExtra: null
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
/* js/doc-catalog.js */
/* Catálogo del documento informativo del Real Decreto 723/2026 (art. 3.2, letras a–q).
   Solo datos: pasos del asistente, campos del formulario y los 17 apartados legales.
   Lo usan el formulario (sección 03), las validaciones y el modelo del documento (sección 02),
   la vista previa y el PDF (sección 04). Textos redactados a partir del BOE-A-2026-19200.
   En el navegador: window.__IC_CATALOG__. En Node: require(). */
(function (root) {
  "use strict";

  var esTemporal = function (d) { return d.tipoContrato === "temporal"; };
  var noHogar = function (d) { return !d.modoHogar; };

  // --- Textos por defecto (editables por el usuario). Cuando el art. 3.3 lo permite,
  //     remiten a la ley o al convenio con una referencia precisa. ---
  var TEXTOS = {
    pruebaCondiciones: "La empresa y la persona trabajadora están obligadas a realizar las experiencias que constituyen el objeto de la prueba. Durante el periodo de prueba, cualquiera de las partes puede resolver la relación laboral (art. 14 del Estatuto de los Trabajadores).",
    modificacionJornada: "La duración y la distribución de la jornada, y en su caso los turnos, solo podrán modificarse en los supuestos y con los procedimientos previstos en el convenio colectivo y en el Estatuto de los Trabajadores: distribución irregular de la jornada (art. 34.2) y modificación sustancial de condiciones de trabajo (art. 41).",
    horasExtra: "La realización de horas extraordinarias es voluntaria, salvo pacto en convenio o contrato, con un máximo de 80 al año. Se retribuyen en la cuantía que fije el convenio, nunca inferior al valor de la hora ordinaria, o se compensan con descanso retribuido; sin pacto, se compensan con descanso en los cuatro meses siguientes (art. 35 del Estatuto de los Trabajadores).",
    horasExtraParcial: "Al tratarse de un contrato a tiempo parcial, no se pueden realizar horas extraordinarias, salvo las necesarias para prevenir o reparar siniestros y otros daños extraordinarios y urgentes (arts. 12.4.c y 35.3 del Estatuto de los Trabajadores). Las horas complementarias, si se pactan, se regirán por el art. 12.5 del Estatuto de los Trabajadores.",
    vacacionesProcedimiento: "El periodo o periodos de disfrute se fijan de común acuerdo entre la empresa y la persona trabajadora, de conformidad con lo previsto en el convenio colectivo. La persona trabajadora conocerá las fechas que le correspondan al menos dos meses antes del comienzo del disfrute (art. 38 del Estatuto de los Trabajadores).",
    preavisoIrregular: "5 días de antelación como mínimo (art. 34.2 del Estatuto de los Trabajadores), salvo que el convenio fije otro plazo.",
    formacion: "La persona trabajadora tiene derecho a la formación necesaria para adaptarse a las modificaciones de su puesto, a cargo de la empresa y considerada tiempo de trabajo efectivo; a un permiso retribuido de 20 horas anuales de formación profesional para el empleo cuando tenga al menos un año de antigüedad (art. 23 del Estatuto de los Trabajadores); a la formación en prevención de riesgos laborales (art. 19 de la Ley 31/1995), y a la que establezca el convenio colectivo.",
    algoritmosNo: "La empresa no utiliza sistemas algorítmicos o automatizados de toma de decisiones que afecten a las condiciones de trabajo.",
    planIgualdadNo: "La empresa no dispone de plan de igualdad.",
    conciliacionNo: "La empresa no dispone de una política de conciliación propia distinta de la prevista en la legislación laboral y en el convenio colectivo.",
    acosoNo: "La empresa no dispone todavía de protocolo frente al acoso sexual y por razón de sexo.",
    lgtbiNo: "La empresa no dispone de un conjunto planificado de medidas y recursos para la igualdad y no discriminación de las personas LGTBI.",
    extincion: "El contrato se extinguirá por las causas y con los requisitos formales previstos en el artículo 49 y siguientes del Estatuto de los Trabajadores. El despido se comunica por escrito, indicando los hechos que lo motivan y la fecha de efectos (arts. 53 y 55); en el despido por causas objetivas, la empresa debe dar un preaviso de 15 días. En caso de dimisión, la persona trabajadora debe dar el preaviso que fije el convenio colectivo o, en su defecto, la costumbre del lugar. En los contratos temporales de más de un año, la parte que denuncie el contrato debe notificarlo con al menos 15 días de antelación (art. 49.1.c).",
    ssEntidad: "Instituto Nacional de la Seguridad Social (INSS)",
    mejorasNo: "No existen mejoras voluntarias de la acción protectora de la Seguridad Social ni planes o fondos de pensiones promovidos en favor de la persona trabajadora.",
    modificaciones: "Las condiciones de los apartados d), e), f) y g) solo podrán modificarse en los supuestos y con los procedimientos previstos en el Estatuto de los Trabajadores (movilidad funcional, art. 39; modificación sustancial de condiciones de trabajo, art. 41; distribución irregular de la jornada, art. 34.2) y en el convenio colectivo. Cualquier cambio se comunicará por escrito lo antes posible y, como tarde, el día en que surta efecto (arts. 5 y 7.3 del Real Decreto 723/2026).",
    ettNo: "La persona trabajadora no ha sido cedida por una empresa de trabajo temporal.",
    // Modo «familia empleadora»: relación laboral especial del servicio del hogar familiar. Textos redactados a partir
    // del RD 1620/2011 consolidado (BOE-A-2011-17975, con el RDL 16/2022) y del RD 893/2024 (BOE-A-2024-18182).
    hogarAviso: "El empleo en el hogar familiar es una relación laboral especial: se rige por el Real Decreto 1620/2011 y el RD 723/2026 se aplica en los términos que esta prevé. Los apartados están adaptados a este caso; revísalos antes de entregar el documento.",
    hogarConvenio: "No existe convenio colectivo aplicable a la relación laboral especial del servicio del hogar familiar, que se rige por el Real Decreto 1620/2011 y, en lo que resulte compatible, por el Estatuto de los Trabajadores.",
    hogarPrueba: "La persona empleadora y la persona trabajadora están obligadas a cumplir sus respectivas prestaciones. Durante el periodo de prueba, cualquiera de las partes puede resolver la relación laboral con el preaviso que se pacte, que no puede superar siete días naturales (art. 6.2 del Real Decreto 1620/2011).",
    hogarModificacionJornada: "El horario se fija por acuerdo entre las partes (art. 9.1 del Real Decreto 1620/2011). Los cambios de jornada u horario se acordarán entre ambas partes o, en su defecto, se regirán por el Estatuto de los Trabajadores en lo que resulte compatible con esta relación especial (art. 3 del Real Decreto 1620/2011).",
    hogarHorasExtra: "Las horas extraordinarias se rigen por el art. 35 del Estatuto de los Trabajadores (art. 9.3 del Real Decreto 1620/2011): son voluntarias salvo pacto, con un máximo de 80 al año, y se retribuyen en la cuantía que se acuerde, nunca inferior al valor de la hora ordinaria, o se compensan con descanso retribuido; sin pacto, se compensan con descanso en los cuatro meses siguientes.",
    hogarVacaciones: "Pueden dividirse en varios periodos, uno de ellos de al menos 15 días naturales seguidos. Las fechas se acuerdan entre las partes; a falta de acuerdo, la persona empleadora puede fijar 15 días según las necesidades familiares y la persona trabajadora elige libremente el resto. Las fechas se conocerán con dos meses de antelación (art. 9.7 del Real Decreto 1620/2011).",
    hogarFormacion: "La persona trabajadora tiene derecho a recibir, al ser contratada, formación en prevención de riesgos laborales centrada en las tareas del hogar, a través de la plataforma pública gestionada por Fundae, dentro de la jornada siempre que sea posible o compensada con descanso equivalente. Si alguna tarea entraña riesgos excepcionales, la persona empleadora proporcionará a su cargo una formación complementaria (art. 5.3 y disposición adicional quinta del Real Decreto 893/2024). Además, tiene los derechos de formación del art. 23 del Estatuto de los Trabajadores en lo que resulten compatibles con esta relación especial.",
    hogarExtincion: "El contrato puede extinguirse por las causas del art. 49.1 del Estatuto de los Trabajadores. Además, la persona empleadora puede extinguirlo, de forma justificada, por disminución de los ingresos o aumento de los gastos de la familia por una circunstancia sobrevenida, por un cambio sustancial de las necesidades familiares o por un comportamiento de la persona trabajadora que justifique razonablemente la pérdida de confianza. En esos casos debe comunicarlo por escrito indicando la causa, poner a la vez a su disposición una indemnización de 12 días de salario por año de servicio, con un máximo de seis mensualidades, y dar un preaviso de 20 días si la relación ha durado más de un año, o de 7 días en los demás casos, que puede sustituir por los salarios de ese periodo (art. 11 del Real Decreto 1620/2011). En caso de dimisión, la persona trabajadora debe dar el preaviso que marque la costumbre del lugar (art. 49.1.d del Estatuto de los Trabajadores).",
    hogarModificaciones: "Las condiciones de los apartados d), e), f) y g) se modificarán por acuerdo entre las partes o, en su defecto, según lo previsto en el Estatuto de los Trabajadores en lo que resulte compatible con esta relación especial (art. 3 del Real Decreto 1620/2011). Cualquier cambio se comunicará por escrito lo antes posible y, como tarde, el día en que surta efecto (arts. 5 y 7.3 del Real Decreto 723/2026).",
    hogarIgualdad: "Al tratarse de empleo en el hogar familiar y no de una empresa, no existe plan de igualdad ni política de conciliación propia. La persona trabajadora tiene derecho a la protección frente a la violencia y el acoso (disposición adicional segunda del Real Decreto 893/2024); el protocolo de actuación para el servicio del hogar familiar lo publica el Instituto Nacional de Seguridad y Salud en el Trabajo.",
    hogarLgtbi: "Al tratarse de empleo en el hogar familiar y no de una empresa, no existe un conjunto planificado de medidas para la igualdad de las personas LGTBI.",
    hogarAlgoritmos: "La persona empleadora no utiliza sistemas algorítmicos o automatizados de toma de decisiones."
  };

  var PASOS = [
    { n: 1, id: "empresa", titulo: "Empresa" },
    { n: 2, id: "contrato", titulo: "Trabajador y contrato" },
    { n: 3, id: "salario", titulo: "Salario" },
    { n: 4, id: "jornada", titulo: "Jornada y vacaciones" },
    { n: 5, id: "resto", titulo: "Resto de condiciones" },
    { n: 6, id: "revisar", titulo: "Revisar y descargar" }
  ];

  // Campos. ambito: "empresa" se guarda con la empresa para el siguiente contrato;
  // "trabajador" es propio de cada documento. requerido/visible: booleano o función(datos).
  // labelHogar/ayudaHogar/defectoHogar: lo que cambia en el modo familia empleadora.
  // grupo: subtítulo dentro del paso 5, que es largo.
  var CAMPOS = [
    // ---------- Paso 1: Empresa (apartados a y c) ----------
    { id: "modoHogar", paso: 1, ambito: "empresa", tipo: "checkbox", defecto: false,
      label: "Soy una familia que contrata a una persona para el hogar",
      ayuda: "Actívalo si contratas para el servicio del hogar familiar (limpieza, cuidados, etc.)." },
    { id: "empresaNombre", paso: 1, ambito: "empresa", tipo: "text", requerido: true, max: 160, apartado: "a",
      label: "Nombre o razón social de la empresa", labelHogar: "Tu nombre y apellidos",
      ayuda: "Tal como figura en tu alta en la Seguridad Social.", ejemplo: "Ej.: Bar La Esquina, S.L.", autocomplete: "organization" },
    { id: "empresaNif", paso: 1, ambito: "empresa", tipo: "text", max: 12, apartado: "a",
      label: "NIF (opcional)", ayuda: "El de la empresa; si eres autónomo o una familia, tu NIF. Si lo prefieres, déjalo en blanco y escríbelo a mano en el papel.", ejemplo: "Ej.: B12345678" },
    { id: "empresaDomicilio", paso: 1, ambito: "empresa", tipo: "text", requerido: true, max: 200, apartado: "c",
      label: "Domicilio social", labelHogar: "Tu domicilio",
      ayuda: "Calle, número, código postal y localidad.", ejemplo: "Ej.: C/ Mayor 12, 28013 Madrid", autocomplete: "street-address" },
    { id: "centroIgualDomicilio", paso: 1, ambito: "trabajador", tipo: "checkbox", defecto: true, apartado: "c",
      label: "Trabajará en el mismo domicilio" },
    { id: "centroTrabajo", paso: 1, ambito: "trabajador", tipo: "text", max: 200, apartado: "c",
      visible: function (d) { return !d.centroIgualDomicilio; }, requerido: function (d) { return !d.centroIgualDomicilio; },
      label: "Centro de trabajo habitual", ayuda: "Dirección donde trabajará normalmente.", ejemplo: "Ej.: Local de C/ Luna 3, 28004 Madrid" },
    { id: "lugarNotas", paso: 1, ambito: "trabajador", tipo: "textarea", max: 600, apartado: "c",
      label: "Otras circunstancias del lugar de trabajo (opcional)",
      ayuda: "Si teletrabaja (indica el centro al que queda adscrita), trabaja en varios centros o en lugares móviles, o elige libremente dónde trabajar.",
      ejemplo: "Ej.: Teletrabajo dos días a la semana; adscrita al centro de C/ Luna 3." },
    { id: "provincia", paso: 1, ambito: "empresa", tipo: "select", visible: noHogar, requerido: noHogar, opciones: "provincias",
      label: "Provincia del centro de trabajo", ayuda: "Te ayuda a encontrar tu convenio colectivo." },
    { id: "numTrabajadores", paso: 1, ambito: "empresa", tipo: "number", visible: noHogar, requerido: noHogar, min: 1, max: 100000, incremento: 1,
      label: "Número de personas en plantilla", labelHogar: "Número de personas que tienes contratadas",
      ayuda: "Sirve para saber qué obligaciones te afectan: plan de igualdad, medidas LGTBI y duración del periodo de prueba.", ejemplo: "Ej.: 4" },

    // ---------- Paso 2: Trabajador y contrato (apartados a, b, d, e y h) ----------
    { id: "trabajadorNombre", paso: 2, ambito: "trabajador", tipo: "text", requerido: true, max: 160, apartado: "a",
      label: "Nombre y apellidos de la persona trabajadora", ayuda: "Tal como aparece en su DNI o NIE.", ejemplo: "Ej.: Lucía Martín Pérez" },
    { id: "trabajadorDni", paso: 2, ambito: "trabajador", tipo: "text", max: 12, apartado: "a",
      label: "DNI o NIE (opcional)", ayuda: "Si lo prefieres, déjalo en blanco y escríbelo a mano en el papel.", ejemplo: "Ej.: 12345678Z" },
    { id: "fechaInicio", paso: 2, ambito: "trabajador", tipo: "date", requerido: true, apartado: "b",
      label: "Fecha de inicio", ayuda: "Día en que empieza a trabajar. El documento debe entregarse antes." },
    { id: "tipoContrato", paso: 2, ambito: "trabajador", tipo: "select", requerido: true, defecto: "indefinido", apartado: "b",
      opciones: [{ valor: "indefinido", texto: "Indefinido" }, { valor: "temporal", texto: "Temporal" }, { valor: "fijo-discontinuo", texto: "Fijo discontinuo" }],
      label: "Tipo de contrato" },
    { id: "fechaFin", paso: 2, ambito: "trabajador", tipo: "date", apartado: "b",
      visible: esTemporal, requerido: function (d) { return esTemporal(d) && !d.duracionPrevista; },
      label: "Fecha de finalización", ayuda: "Si no se conoce la fecha exacta, rellena la duración previsible." },
    { id: "duracionPrevista", paso: 2, ambito: "trabajador", tipo: "text", max: 200, apartado: "b",
      visible: esTemporal, requerido: function (d) { return esTemporal(d) && !d.fechaFin; },
      label: "Duración previsible", ejemplo: "Ej.: Hasta la reincorporación de la persona sustituida" },
    { id: "causaTemporal", paso: 2, ambito: "trabajador", tipo: "textarea", max: 1500, apartado: "d",
      visible: esTemporal, requerido: esTemporal,
      label: "Causa del contrato temporal",
      ayuda: "La causa legal (circunstancias de la producción o sustitución de una persona), los hechos concretos que la justifican y su relación con la duración del contrato (art. 15 del Estatuto de los Trabajadores).",
      ejemplo: "Ej.: Aumento de clientela en la temporada de verano, del 1 de junio al 30 de septiembre; se necesita reforzar la barra durante ese periodo." },
    { id: "puesto", paso: 2, ambito: "trabajador", tipo: "text", requerido: true, max: 120, apartado: "e",
      label: "Puesto de trabajo", ejemplo: "Ej.: Camarero/a de barra" },
    { id: "funciones", paso: 2, ambito: "trabajador", tipo: "textarea", requerido: true, max: 1500, apartado: "d",
      label: "Funciones principales", ayuda: "Lo que hará en su trabajo, con suficiente detalle para entender el contenido del puesto.",
      ejemplo: "Ej.: Atención a clientes en barra y sala, preparación de bebidas y cafés, cobro y limpieza de la zona de trabajo." },
    { id: "categoria", paso: 2, ambito: "trabajador", tipo: "text", max: 160, apartado: "e",
      requerido: noHogar, defectoHogar: "Empleado/a de hogar",
      label: "Grupo o categoría profesional", ayuda: "La que marca tu convenio colectivo para este puesto.", ayudaHogar: "En el empleo de hogar suele bastar con «Empleado/a de hogar».", ejemplo: "Ej.: Grupo II, camarero/a" },
    { id: "pruebaNoAplica", paso: 2, ambito: "trabajador", tipo: "checkbox", defecto: false, apartado: "h",
      label: "No se pacta periodo de prueba" },
    { id: "pruebaCantidad", paso: 2, ambito: "trabajador", tipo: "number", min: 1, max: 365, incremento: 1, apartado: "h",
      visible: function (d) { return !d.pruebaNoAplica; }, requerido: function (d) { return !d.pruebaNoAplica; },
      label: "Duración del periodo de prueba", ejemplo: "Ej.: 2" },
    { id: "pruebaUnidad", paso: 2, ambito: "trabajador", tipo: "select", defecto: "meses", apartado: "h",
      visible: function (d) { return !d.pruebaNoAplica; },
      opciones: [{ valor: "dias", texto: "días" }, { valor: "semanas", texto: "semanas" }, { valor: "meses", texto: "meses" }],
      label: "Unidad" },
    { id: "tecnicoTitulado", paso: 2, ambito: "trabajador", tipo: "checkbox", defecto: false, apartado: "h",
      visible: function (d) { return !d.pruebaNoAplica && !d.modoHogar; },
      label: "Es un puesto de técnico titulado", ayuda: "Para ellos el periodo de prueba puede llegar a 6 meses." },
    { id: "pruebaCondiciones", paso: 2, ambito: "trabajador", tipo: "textarea", max: 1000, apartado: "h",
      defecto: TEXTOS.pruebaCondiciones, defectoHogar: TEXTOS.hogarPrueba,
      visible: function (d) { return !d.pruebaNoAplica; }, requerido: function (d) { return !d.pruebaNoAplica; },
      label: "Condiciones del periodo de prueba", ayuda: "Texto propuesto a partir de la ley. Puedes adaptarlo." },

    // ---------- Paso 3: Salario (apartado f) ----------
    { id: "salarioBase", paso: 3, ambito: "trabajador", tipo: "number", requerido: true, min: 0.01, max: 999999, incremento: 0.01, sufijo: "€", apartado: "f",
      label: "Salario base (bruto)", ayuda: "Sin contar complementos ni la parte proporcional de las pagas extra.", ejemplo: "Ej.: 1221" },
    { id: "salarioPeriodo", paso: 3, ambito: "trabajador", tipo: "select", requerido: true, defecto: "mes", apartado: "f",
      opciones: [{ valor: "mes", texto: "al mes" }, { valor: "anio", texto: "al año" }, { valor: "hora", texto: "a la hora" }],
      label: "El importe es" },
    { id: "complementos", paso: 3, ambito: "trabajador", tipo: "lista", maxItems: 15, apartado: "f",
      label: "Complementos salariales (opcional)", ayuda: "Cada uno por separado, con su importe bruto mensual: antigüedad, nocturnidad, transporte…",
      subcampos: [
        { id: "nombre", tipo: "text", max: 80, label: "Complemento", ejemplo: "Ej.: Plus de transporte" },
        { id: "importe", tipo: "number", min: 0.01, max: 99999, incremento: 0.01, sufijo: "€/mes", label: "Importe", ejemplo: "Ej.: 60" }
      ] },
    { id: "pagasExtra", paso: 3, ambito: "trabajador", tipo: "number", requerido: true, defecto: 2, min: 0, max: 6, incremento: 1, apartado: "f",
      label: "Pagas extraordinarias al año", ayuda: "El Estatuto de los Trabajadores fija al menos dos; tu convenio puede fijar más." },
    { id: "pagasProrrateadas", paso: 3, ambito: "trabajador", tipo: "checkbox", defecto: false, apartado: "f",
      label: "Las pagas extra se prorratean en cada mensualidad" },
    { id: "periodicidadPago", paso: 3, ambito: "trabajador", tipo: "select", requerido: true, defecto: "mensual", apartado: "f",
      opciones: [{ valor: "mensual", texto: "Mensual" }, { valor: "quincenal", texto: "Quincenal" }, { valor: "semanal", texto: "Semanal" }],
      label: "Periodicidad de pago" },
    { id: "formaPago", paso: 3, ambito: "empresa", tipo: "select", requerido: true, defecto: "transferencia", apartado: "f",
      opciones: [{ valor: "transferencia", texto: "Transferencia bancaria" }, { valor: "cheque", texto: "Cheque" }, { valor: "efectivo", texto: "Efectivo" }],
      label: "Método de pago" },
    { id: "variablesNoAplica", paso: 3, ambito: "trabajador", tipo: "checkbox", defecto: true, apartado: "f",
      label: "No hay retribución variable (comisiones, incentivos, objetivos…)" },
    { id: "hogarEspecie", paso: 3, ambito: "trabajador", tipo: "textarea", max: 600, apartado: "f", visible: function (d) { return !!d.modoHogar; },
      label: "Salario en especie (opcional)",
      ayuda: "Solo si se pacta alojamiento o manutención: qué incluye y qué parte del salario se descuenta, como máximo el 30 % (arts. 5.4 y 8.2 del Real Decreto 1620/2011).",
      ejemplo: "Ej.: Alojamiento y manutención, valorados en el 20 % del salario total." },
    { id: "variables", paso: 3, ambito: "trabajador", tipo: "textarea", max: 1500, apartado: "f",
      visible: function (d) { return !d.variablesNoAplica; }, requerido: function (d) { return !d.variablesNoAplica; },
      label: "Cómo se calcula la parte variable",
      ejemplo: "Ej.: Comisión del 3 % sobre las ventas netas mensuales, que se paga con la nómina del mes siguiente." },

    // ---------- Paso 4: Jornada y vacaciones (apartado g) ----------
    { id: "horasSemanales", paso: 4, ambito: "trabajador", tipo: "number", requerido: true, min: 1, max: 60, incremento: 0.5, apartado: "g",
      label: "Horas de trabajo a la semana", ejemplo: "Ej.: 40" },
    { id: "tipoJornada", paso: 4, ambito: "trabajador", tipo: "select", requerido: true, defecto: "completa", apartado: "g",
      opciones: [{ valor: "completa", texto: "Completa" }, { valor: "parcial", texto: "Parcial" }],
      label: "Tipo de jornada" },
    { id: "horasAnuales", paso: 4, ambito: "trabajador", tipo: "number", visible: noHogar, min: 1, max: 3000, incremento: 1, apartado: "g",
      label: "Horas al año (opcional)", ayuda: "Si tu convenio fija una jornada anual, indícala. Si la dejas en blanco, el documento remite al convenio.", ejemplo: "Ej.: 1792" },
    { id: "horario", paso: 4, ambito: "trabajador", tipo: "textarea", requerido: true, max: 1000, apartado: "g",
      label: "Días y horario", ayuda: "Cómo se reparte la jornada a lo largo del día y de la semana.",
      ejemplo: "Ej.: De martes a sábado, de 10:00 a 14:00 y de 19:00 a 23:00." },
    { id: "nocturnoTurnos", paso: 4, ambito: "trabajador", tipo: "select", requerido: true, defecto: "no", apartado: "g",
      opciones: [{ valor: "no", texto: "No" }, { valor: "nocturno", texto: "Sí, trabajo nocturno" }, { valor: "turnos", texto: "Sí, trabajo a turnos" }, { valor: "ambos", texto: "Sí, nocturno y a turnos" }],
      label: "¿Trabajo nocturno o a turnos?", ayuda: "Trabajo nocturno es el realizado entre las 22:00 y las 6:00 (art. 36 del Estatuto de los Trabajadores)." },
    { id: "nocturnoDetalle", paso: 4, ambito: "trabajador", tipo: "textarea", max: 600, apartado: "g",
      visible: function (d) { return d.nocturnoTurnos && d.nocturnoTurnos !== "no"; }, requerido: function (d) { return d.nocturnoTurnos && d.nocturnoTurnos !== "no"; },
      label: "Detalle del trabajo nocturno o a turnos", ejemplo: "Ej.: Turno rotativo semanal de mañana (7:00–15:00) y tarde (15:00–23:00)." },
    { id: "hogarPresencia", paso: 4, ambito: "trabajador", tipo: "textarea", max: 600, apartado: "g", visible: function (d) { return !!d.modoHogar; },
      label: "Tiempo de presencia (opcional)",
      ayuda: "Horas en las que la persona está a tu disposición sin trabajar: cuántas, cuándo y cómo se pagan o compensan. Si no se compensan con descanso, no pueden superar 20 horas semanales de promedio al mes y se pagan al menos como las ordinarias (arts. 5.4 y 9.2 del Real Decreto 1620/2011).",
      ejemplo: "Ej.: 4 horas semanales, los martes de 17:00 a 21:00, pagadas como horas ordinarias." },
    { id: "hogarPernocta", paso: 4, ambito: "trabajador", tipo: "textarea", max: 400, apartado: "g", visible: function (d) { return !!d.modoHogar; },
      label: "Pernocta en el domicilio (opcional)", ayuda: "Si trabaja como interna o interno, indica cuándo duerme en el domicilio familiar (art. 5.4 del Real Decreto 1620/2011).",
      ejemplo: "Ej.: Empleo interno: pernocta en el domicilio familiar de lunes a viernes." },
    { id: "modificacionJornada", paso: 4, ambito: "empresa", tipo: "textarea", requerido: true, max: 1200, apartado: "g",
      defecto: TEXTOS.modificacionJornada, defectoHogar: TEXTOS.hogarModificacionJornada,
      label: "Cómo se puede cambiar la jornada o los turnos", ayuda: "Texto propuesto con referencia a la ley. Puedes adaptarlo." },
    { id: "horasExtra", paso: 4, ambito: "trabajador", tipo: "textarea", requerido: true, max: 1200, apartado: "g",
      defecto: TEXTOS.horasExtra, defectoHogar: TEXTOS.hogarHorasExtra,
      label: "Horas extraordinarias", ayuda: "Texto propuesto con referencia a la ley. Si la jornada es parcial, el documento usa el texto propio de ese caso." },
    { id: "vacacionesDias", paso: 4, ambito: "trabajador", tipo: "number", requerido: true, defecto: 30, min: 1, max: 60, incremento: 1, apartado: "g",
      label: "Días de vacaciones al año", ayuda: "El mínimo legal son 30 días naturales (art. 38 del Estatuto de los Trabajadores).",
      ayudaHogar: "El mínimo legal son 30 días naturales (art. 9.7 del Real Decreto 1620/2011)." },
    { id: "vacacionesUnidad", paso: 4, ambito: "trabajador", tipo: "select", requerido: true, defecto: "naturales", apartado: "g",
      opciones: [{ valor: "naturales", texto: "naturales" }, { valor: "laborables", texto: "laborables" }],
      label: "Tipo de días" },
    { id: "vacacionesProcedimiento", paso: 4, ambito: "empresa", tipo: "textarea", requerido: true, max: 1000, apartado: "g",
      defecto: TEXTOS.vacacionesProcedimiento, defectoHogar: TEXTOS.hogarVacaciones,
      label: "Cómo se fijan las vacaciones" },
    { id: "irregularNoAplica", paso: 4, ambito: "trabajador", tipo: "checkbox", defecto: true, apartado: "g",
      label: "No hay distribución irregular de la jornada a lo largo del año" },
    { id: "irregularSistema", paso: 4, ambito: "trabajador", tipo: "textarea", max: 1000, apartado: "g",
      visible: function (d) { return !d.irregularNoAplica; }, requerido: function (d) { return !d.irregularNoAplica; },
      label: "Cómo se fija la distribución irregular", ayuda: "Horas y días de referencia en los que la empresa puede pedir que se trabaje.",
      ejemplo: "Ej.: Hasta un 10 % de la jornada anual, en viernes y sábados de junio a septiembre." },
    { id: "irregularPreaviso", paso: 4, ambito: "trabajador", tipo: "text", max: 300, apartado: "g", defecto: TEXTOS.preavisoIrregular,
      visible: function (d) { return !d.irregularNoAplica; }, requerido: function (d) { return !d.irregularNoAplica; },
      label: "Preaviso mínimo antes de empezar o cancelar una tarea" },
    { id: "periodosActividad", paso: 4, ambito: "trabajador", tipo: "textarea", max: 1000, apartado: "g",
      visible: function (d) { return d.tipoContrato === "fijo-discontinuo"; }, requerido: function (d) { return d.tipoContrato === "fijo-discontinuo"; },
      label: "Periodos de actividad e inactividad (o su estimación)",
      ejemplo: "Ej.: De abril a octubre de cada año, según la temporada; el llamamiento se hará por escrito con 15 días de antelación." },

    // ---------- Paso 5: Resto de condiciones (apartados i, j, k, l, m, n, o, p y q) ----------
    { id: "convenioNombre", paso: 5, grupo: "Convenio colectivo", ambito: "empresa", tipo: "text", max: 250, apartado: "o",
      visible: noHogar, requerido: noHogar,
      label: "Nombre del convenio colectivo", ejemplo: "Ej.: Convenio colectivo de hostelería de la Comunidad de Madrid" },
    { id: "convenioCodigo", paso: 5, grupo: "Convenio colectivo", ambito: "empresa", tipo: "text", max: 20, apartado: "o",
      visible: noHogar, requerido: noHogar,
      label: "Código del convenio", ayuda: "Número de 14 cifras que aparece en el boletín oficial o en el buscador de convenios.", ejemplo: "14 cifras, sin espacios" },
    { id: "convenioPublicacion", paso: 5, grupo: "Convenio colectivo", ambito: "empresa", tipo: "text", max: 200, apartado: "o",
      visible: noHogar, requerido: noHogar,
      label: "Boletín y fecha de publicación", ejemplo: "Ej.: BOCM de 15 de marzo de 2025" },
    { id: "convenioVigencia", paso: 5, grupo: "Convenio colectivo", ambito: "empresa", tipo: "text", max: 200, apartado: "o",
      visible: noHogar, requerido: noHogar,
      label: "Periodo de vigencia", ejemplo: "Ej.: Del 1 de enero de 2025 al 31 de diciembre de 2027" },
    { id: "convenioUltraactividad", paso: 5, grupo: "Convenio colectivo", ambito: "empresa", tipo: "text", max: 300, apartado: "o",
      visible: noHogar,
      label: "Ultraactividad (solo si ya terminó su vigencia)", ayuda: "Si el convenio ya venció y sigue aplicándose mientras se negocia otro, indícalo.",
      ejemplo: "Ej.: En ultraactividad desde el 1 de enero de 2026" },
    { id: "formacion", paso: 5, grupo: "Formación y tecnología", ambito: "empresa", tipo: "textarea", requerido: true, max: 1500, apartado: "i",
      defecto: TEXTOS.formacion, defectoHogar: TEXTOS.hogarFormacion,
      label: "Derecho a formación", ayuda: "Texto propuesto con referencia a la ley. Añade la formación que ofrezca tu empresa o tu convenio.",
      ayudaHogar: "Texto propuesto a partir del Real Decreto 893/2024. Puedes adaptarlo." },
    { id: "algoritmos", paso: 5, grupo: "Formación y tecnología", ambito: "empresa", tipo: "select", requerido: true, defecto: "no", apartado: "k",
      visible: noHogar,
      opciones: [{ valor: "no", texto: "No" }, { valor: "si", texto: "Sí" }],
      label: "¿Usa la empresa sistemas automáticos o algoritmos para decidir sobre el trabajo?",
      ayuda: "Por ejemplo, programas que asignan turnos o tareas, fijan sueldos o evalúan el rendimiento de forma automática." },
    { id: "algoritmosDescripcion", paso: 5, grupo: "Formación y tecnología", ambito: "empresa", tipo: "textarea", max: 1500, apartado: "k",
      visible: function (d) { return noHogar(d) && d.algoritmos === "si"; }, requerido: function (d) { return noHogar(d) && d.algoritmos === "si"; },
      label: "Qué deciden y con qué criterios",
      ejemplo: "Ej.: Una aplicación asigna los turnos semanales según la disponibilidad declarada y la previsión de ventas." },
    { id: "planIgualdadEstado", paso: 5, grupo: "Igualdad", ambito: "empresa", tipo: "select", requerido: true, defecto: "no", apartado: "l",
      visible: noHogar,
      opciones: [{ valor: "no", texto: "No dispone" }, { valor: "si", texto: "Sí dispone" }],
      label: "Plan de igualdad", ayuda: "Obligatorio en empresas de 50 o más personas." },
    { id: "planIgualdad", paso: 5, grupo: "Igualdad", ambito: "empresa", tipo: "text", max: 300, apartado: "l",
      visible: function (d) { return noHogar(d) && d.planIgualdadEstado === "si"; }, requerido: function (d) { return noHogar(d) && d.planIgualdadEstado === "si"; },
      label: "Identificación del plan de igualdad", ejemplo: "Ej.: Plan de igualdad 2025-2029, registrado en REGCON el 10/02/2025" },
    { id: "conciliacion", paso: 5, grupo: "Igualdad", ambito: "empresa", tipo: "textarea", max: 1000, apartado: "l",
      visible: noHogar,
      label: "Política de conciliación propia (opcional)", ayuda: "Solo si tu empresa mejora o desarrolla lo que exige la ley. Si no, déjalo en blanco." },
    { id: "protocoloNoDispone", paso: 5, grupo: "Igualdad", ambito: "empresa", tipo: "checkbox", defecto: false, apartado: "l",
      visible: noHogar,
      label: "Todavía no tengo protocolo frente al acoso sexual y por razón de sexo" },
    { id: "protocoloAcoso", paso: 5, grupo: "Igualdad", ambito: "empresa", tipo: "text", max: 300, apartado: "l",
      visible: function (d) { return noHogar(d) && !d.protocoloNoDispone; }, requerido: function (d) { return noHogar(d) && !d.protocoloNoDispone; },
      label: "Dónde se puede consultar el protocolo frente al acoso", ayuda: "Todas las empresas deben tenerlo.",
      ejemplo: "Ej.: Tablón del local y copia entregada junto a este documento" },
    { id: "lgtbiEstado", paso: 5, grupo: "Igualdad", ambito: "empresa", tipo: "select", requerido: true, defecto: "no", apartado: "m",
      visible: noHogar,
      opciones: [{ valor: "no", texto: "No dispone" }, { valor: "si", texto: "Sí dispone" }],
      label: "Medidas para la igualdad de las personas LGTBI", ayuda: "Obligatorias en empresas de más de 50 personas." },
    { id: "lgtbiMedidas", paso: 5, grupo: "Igualdad", ambito: "empresa", tipo: "textarea", max: 1000, apartado: "m",
      visible: function (d) { return noHogar(d) && d.lgtbiEstado === "si"; }, requerido: function (d) { return noHogar(d) && d.lgtbiEstado === "si"; },
      label: "Identificación de las medidas LGTBI", ejemplo: "Ej.: Conjunto de medidas LGTBI acordado el 01/03/2025, disponible en la intranet" },
    { id: "ssMutua", paso: 5, grupo: "Seguridad Social", ambito: "empresa", tipo: "text", max: 300, apartado: "p",
      label: "Mutua colaboradora con la Seguridad Social y qué cubre (opcional)",
      ayuda: "Si no tienes mutua, déjalo en blanco: la cobertura corresponde al INSS.",
      ejemplo: "Ej.: Fremap, para accidentes de trabajo, enfermedades profesionales e incapacidad temporal" },
    { id: "mejoras", paso: 5, grupo: "Seguridad Social", ambito: "empresa", tipo: "textarea", max: 1000, apartado: "p",
      label: "Mejoras voluntarias y planes de pensiones (opcional)",
      ayuda: "Seguros, complementos de la baja o planes de pensiones que pague la empresa, con sus aportaciones. Si no hay, déjalo en blanco." },
    { id: "extincion", paso: 5, grupo: "Fin del contrato y cambios", ambito: "empresa", tipo: "textarea", requerido: true, max: 2000, apartado: "n",
      defecto: TEXTOS.extincion, defectoHogar: TEXTOS.hogarExtincion,
      label: "Fin del contrato y preavisos", ayuda: "Texto propuesto con referencia a la ley. Si tu convenio fija preavisos concretos, añádelos.",
      ayudaHogar: "Texto propuesto a partir del art. 11 del Real Decreto 1620/2011. Puedes adaptarlo." },
    { id: "modificaciones", paso: 5, grupo: "Fin del contrato y cambios", ambito: "empresa", tipo: "textarea", requerido: true, max: 1500, apartado: "q",
      defecto: TEXTOS.modificaciones, defectoHogar: TEXTOS.hogarModificaciones,
      label: "Cuándo y cómo pueden cambiar las condiciones" },
    { id: "ettNoAplica", paso: 5, grupo: "Empresa de trabajo temporal", ambito: "trabajador", tipo: "checkbox", defecto: true, apartado: "j",
      visible: noHogar,
      label: "No aplica: la persona no viene cedida por una empresa de trabajo temporal (ETT)" },
    { id: "ettEmpresaUsuaria", paso: 5, grupo: "Empresa de trabajo temporal", ambito: "trabajador", tipo: "text", max: 200, apartado: "j",
      visible: function (d) { return noHogar(d) && !d.ettNoAplica; }, requerido: function (d) { return noHogar(d) && !d.ettNoAplica; },
      label: "Empresa usuaria", ejemplo: "Ej.: Logística Norte, S.A." },
    { id: "ettCausa", paso: 5, grupo: "Empresa de trabajo temporal", ambito: "trabajador", tipo: "textarea", max: 800, apartado: "j",
      visible: function (d) { return noHogar(d) && !d.ettNoAplica; }, requerido: function (d) { return noHogar(d) && !d.ettNoAplica; },
      label: "Causa del contrato de puesta a disposición" }
  ];

  // Los 17 apartados del art. 3.2 RD 723/2026, en orden. completoTrasPaso: paso tras el que
  // el apartado queda relleno (lo usa la tira a–q de la portada).
  var APARTADOS = [
    { id: "a", titulo: "Identidad de las partes", completoTrasPaso: 2,
      explica: "Quién contrata y a quién: nombre y NIF de la empresa y nombre de la persona trabajadora." },
    { id: "b", titulo: "Fecha de inicio y duración", completoTrasPaso: 2,
      explica: "Cuándo empieza la relación laboral y, si es temporal, cuándo termina o cuánto se prevé que dure." },
    { id: "c", titulo: "Domicilio y centro de trabajo", completoTrasPaso: 1,
      explica: "El domicilio social y, si es distinto, dónde se trabaja: incluido el centro de adscripción en teletrabajo, varios centros o centros móviles." },
    { id: "d", titulo: "Contenido del trabajo y causa de la temporalidad", completoTrasPaso: 2,
      explica: "Qué trabajo se hace y, si el contrato es temporal, su causa legal, los hechos que la justifican y su relación con la duración." },
    { id: "e", titulo: "Grupo o categoría profesional", completoTrasPaso: 2,
      explica: "El grupo o la categoría del puesto, con una descripción que permita saber con precisión en qué consiste." },
    { id: "f", titulo: "Salario", completoTrasPaso: 3,
      explica: "El salario base y cada complemento por separado, cuándo y cómo se pagan, y cómo se calcula la parte variable." },
    { id: "g", titulo: "Tiempo de trabajo y vacaciones", completoTrasPaso: 4,
      explica: "Jornada diaria, semanal y anual y su horario; trabajo nocturno o a turnos; cómo puede cambiar; horas extraordinarias; vacaciones y, si existe, la distribución irregular de la jornada o los periodos de actividad de los fijos discontinuos." },
    { id: "h", titulo: "Periodo de prueba", completoTrasPaso: 2, textoNoAplica: "No se pacta periodo de prueba.",
      explica: "Si se pacta: su duración concreta y la obligación de ambas partes de realizar las experiencias que son su objeto." },
    { id: "i", titulo: "Derecho a formación", completoTrasPaso: 5,
      explica: "La formación a la que se tiene derecho y que proporciona la empresa." },
    { id: "j", titulo: "Empresa de trabajo temporal", completoTrasPaso: 5, textoNoAplica: TEXTOS.ettNo,
      explica: "Solo si la persona viene cedida por una ETT: la empresa usuaria y la causa de cada contrato de puesta a disposición." },
    { id: "k", titulo: "Sistemas algorítmicos o automatizados", completoTrasPaso: 5, textoNoAplica: TEXTOS.algoritmosNo, textoHogar: TEXTOS.hogarAlgoritmos,
      explica: "Si la empresa usa algoritmos o sistemas automáticos para decidir sobre jornada, tareas, salario, promoción, lugar de trabajo o despido, y con qué criterios." },
    { id: "l", titulo: "Plan de igualdad, conciliación y protocolo de acoso", completoTrasPaso: 5, textoHogar: TEXTOS.hogarIgualdad,
      explica: "Si existe plan de igualdad y cuál es; la política de conciliación propia, si la hay; y el protocolo frente al acoso sexual y por razón de sexo." },
    { id: "m", titulo: "Medidas para la igualdad de las personas LGTBI", completoTrasPaso: 5, textoNoAplica: TEXTOS.lgtbiNo, textoHogar: TEXTOS.hogarLgtbi,
      explica: "El conjunto de medidas y recursos para la igualdad real de las personas LGTBI, si la empresa dispone de él." },
    { id: "n", titulo: "Fin del contrato y preavisos", completoTrasPaso: 5,
      explica: "Cómo se extingue el contrato, los requisitos formales y los plazos de preaviso de ambas partes." },
    { id: "o", titulo: "Convenio colectivo", completoTrasPaso: 5, textoHogar: TEXTOS.hogarConvenio,
      explica: "Qué convenio se aplica: su código, boletín y fecha de publicación, vigencia y, si ya venció, su ultraactividad." },
    { id: "p", titulo: "Seguridad Social", completoTrasPaso: 5,
      explica: "La entidad gestora o la mutua con la que colabora la empresa, las mejoras voluntarias y los planes de pensiones con sus aportaciones." },
    { id: "q", titulo: "Posibles cambios en las condiciones", completoTrasPaso: 5,
      explica: "En qué casos pueden cambiar el trabajo, la categoría, el salario o la jornada, y qué procedimiento se sigue." }
  ].map(function (ap) {
    ap.cita = "Art. 3.2." + ap.id + ") del Real Decreto 723/2026";
    return ap;
  });

  // Datos + valores por defecto de los campos que el usuario no ha tocado (undefined).
  // Un campo vaciado a propósito ("") NO se rellena: así la validación puede avisar.
  function withDefaults(datos) {
    datos = datos || {};
    var d = {};
    CAMPOS.forEach(function (c) { if (c.defecto !== undefined) d[c.id] = c.defecto; });
    Object.keys(datos).forEach(function (k) { if (datos[k] !== undefined) d[k] = datos[k]; });
    if (d.modoHogar) {
      CAMPOS.forEach(function (c) { if (c.defectoHogar !== undefined && datos[c.id] === undefined) d[c.id] = c.defectoHogar; });
    }
    return d;
  }

  var CATALOG = { PASOS: PASOS, CAMPOS: CAMPOS, APARTADOS: APARTADOS, TEXTOS: TEXTOS, withDefaults: withDefaults };

  root.__IC_CATALOG__ = CATALOG;
  if (typeof module !== "undefined" && module.exports) module.exports = CATALOG;
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
/* js/generador.js */
/* Generador por pasos del documento informativo del RD 723/2026 (portada).
   Pinta los campos desde el catálogo (js/doc-catalog.js), valida con js/doc-validate.js y monta el
   documento con js/doc-model.js. Todo ocurre en este navegador: nada se envía a ningún servidor.
   Modelo: `datos` guarda solo lo que la persona ha escrito; lo que se ve es C.withDefaults(datos), así
   los textos propuestos cambian solos al activar el modo hogar mientras nadie los haya tocado.
   Memoria local: ic:empresa:v1 (empresa, para el siguiente contrato) e ic:borrador:v1 (documento a medias).
   Los datos del usuario se escriben siempre con textContent o value, nunca con innerHTML. */
(function () {
  "use strict";

  var IC = window.__IC__, C = window.__IC_CATALOG__, L = window.__LEGAL__, V = window.__IC_VALIDATE__, M = window.__IC_MODEL__;
  var card = document.getElementById("generador");
  if (!card || !IC || !C || !L || !V || !M) return;
  var $ = IC.$, $$ = IC.$$;
  var BRAND = window.__BRAND__ || {};
  var TOTAL = C.PASOS.length;

  // ---------- Memoria en este navegador (modo privado o almacenamiento bloqueado: sin memoria, sin fallos) ----------
  var KEY_EMPRESA = "ic:empresa:v1", KEY_BORRADOR = "ic:borrador:v1";
  var memoria = {
    leer: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    guardar: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin memoria */ } },
    borrar: function (k) { try { localStorage.removeItem(k); } catch (e) { /* sin memoria */ } }
  };

  // ---------- Estado ----------
  var datos = {};        // solo lo que la persona ha escrito
  var actual = 1;        // paso visible
  var alcanzado = 1;     // paso más avanzado al que se ha llegado pasando la validación
  var conError = {};     // campos marcados al pulsar «Siguiente»: solo esos se revalidan al escribir
  var CAMPO = {};        // id → definición del catálogo
  var UI = {};           // id → { wrap, control, etiqueta, ayuda, error, aviso }
  C.CAMPOS.forEach(function (c) { CAMPO[c.id] = c; });

  var INTRO = {
    1: "Quién contrata. Se guarda en este navegador para el próximo contrato. Todos los datos son obligatorios salvo los marcados como opcionales.",
    2: "Quién va a trabajar, desde cuándo y en qué.",
    3: "Lo que cobrará y cómo se le paga.",
    4: "Horas, horario, horas extra y vacaciones.",
    5: "El resto de condiciones que pide la ley. Varios campos traen un texto propuesto a partir de la norma: puedes dejarlo tal cual.",
    6: "Comprueba el documento. Puedes volver a cualquier apartado para cambiarlo."
  };
  // Campos que comparten fila: la cantidad y su unidad
  var PAREJA = { pruebaCantidad: "pruebaUnidad", salarioBase: "salarioPeriodo", horasSemanales: "tipoJornada", vacacionesDias: "vacacionesUnidad" };

  // ---------- Utilidades de DOM (main.js) ----------
  var el = IC.el, icono = IC.icono, aviso = IC.aviso;
  function enlaceExterno(url, texto) {
    return el("a", { href: url, target: "_blank", rel: "noopener" }, [texto, el("span", { class: "sr-only", text: " (se abre en una pestaña nueva)" })]);
  }
  function flag(v, d) { return typeof v === "function" ? !!v(d) : v === undefined ? true : !!v; }
  function vista() { return C.withDefaults(datos); }
  function textoDe(c, d, campo) { return (d.modoHogar && c[campo + "Hogar"]) || c[campo]; }
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Construcción de los pasos ----------
  var pasosEl = $("#pasos"), form = $("#form-generador");
  var btnAnterior = $("#btn-anterior"), btnSiguiente = $("#btn-siguiente");
  var anuncio = $("#anuncio"), barra = $("#progreso-barra");
  var tira = {};
  $$("#tira li").forEach(function (li) { tira[li.getAttribute("data-ap")] = li; });
  var FIELDSET = {}, GRUPOS = [];
  var resumen = el("div", { class: "notice notice--error error-summary", role: "alert", tabindex: "-1", hidden: true });
  var avisoHogar = aviso("info", C.TEXTOS.hogarAviso, { class: "notice aviso-hogar", hidden: true });
  var recuperado = aviso("ok", "Datos de la empresa recuperados de este navegador.", { hidden: true });
  var ayudaConvenio = el("div", { class: "notice ayuda-convenio" });
  var bloqueo = el("div", { class: "notice notice--error bloqueo", hidden: true });
  var paso6 = {}; // piezas del paso 6: avisos, acciones, estados y el papel (ver construirPaso6)

  function crearControl(c, id) {
    if (c.tipo === "textarea") {
      return el("textarea", { id: id, name: c.id, rows: c.defecto && c.defecto.length > 200 ? 7 : 4, maxlength: c.max, placeholder: c.ejemplo });
    }
    if (c.tipo === "select") {
      var s = el("select", { id: id, name: c.id });
      var ops = c.opciones === "provincias" ? L.provincias.map(function (p) { return { valor: p.nombre, texto: p.nombre }; }) : c.opciones;
      if (c.defecto === undefined) s.append(el("option", { value: "", text: c.opciones === "provincias" ? "Elige una provincia" : "Elige una opción" }));
      ops.forEach(function (o) { s.append(el("option", { value: o.valor, text: o.texto })); });
      return s;
    }
    if (c.tipo === "date") return el("input", { id: id, name: c.id, type: "date" });
    var entero = c.tipo === "number" && c.incremento === 1;
    return el("input", {
      id: id, name: c.id, type: "text", maxlength: c.tipo === "number" ? undefined : c.max, placeholder: c.ejemplo,
      inputmode: c.tipo === "number" ? (entero ? "numeric" : "decimal") : undefined,
      autocomplete: c.autocomplete || "off",
      autocapitalize: /Nif|Dni/.test(c.id) ? "characters" : undefined, spellcheck: /Nif|Dni|Codigo/.test(c.id) ? "false" : undefined
    });
  }

  function crearCampo(c) {
    var id = "f-" + c.id, u = { error: el("p", { class: "field-error", id: id + "-error" }), aviso: el("div", { class: "field-aviso", id: id + "-aviso" }) };
    if (c.tipo === "lista") return crearLista(c, u);
    u.ayuda = c.ayuda ? el("p", { class: "field-help", id: id + "-ayuda" }) : null;
    if (c.tipo === "checkbox") {
      u.control = el("input", { type: "checkbox", id: id, name: c.id });
      u.etiqueta = el("span");
      u.wrap = el("div", { class: "field field--check" + (c.id === "modoHogar" ? " opcion" : ""), "data-campo": c.id }, [
        el("label", { class: "check", for: id }, [u.control, u.etiqueta]), u.ayuda, u.error, u.aviso
      ]);
    } else {
      u.control = crearControl(c, id);
      u.etiqueta = el("label", { for: id });
      var sufijo = c.sufijo ? el("span", { class: "sufijo", id: id + "-sufijo", text: c.sufijo }) : null;
      u.wrap = el("div", { class: "field", "data-campo": c.id }, [
        u.etiqueta, u.ayuda, sufijo ? el("div", { class: "input-sufijo" }, [u.control, sufijo]) : u.control, u.error, u.aviso
      ]);
    }
    u.control.setAttribute("aria-describedby", [u.ayuda && u.ayuda.id, c.sufijo && id + "-sufijo", u.error.id, u.aviso.id].filter(Boolean).join(" "));
    return u;
  }

  // Complementos salariales: filas de nombre + importe que se añaden y se quitan
  function crearLista(c, u) {
    var id = "f-" + c.id;
    u.etiqueta = el("p", { class: "field-label", id: id + "-titulo" });
    u.ayuda = c.ayuda ? el("p", { class: "field-help", id: id + "-ayuda" }) : null;
    u.filas = el("div", { class: "lista-filas" });
    u.anadir = el("button", { type: "button", class: "btn btn--secondary btn--small", text: "Añadir complemento" });
    u.wrap = el("div", { class: "field", role: "group", "aria-labelledby": id + "-titulo", "data-campo": c.id }, [u.etiqueta, u.ayuda, u.filas, u.anadir, u.error, u.aviso]);
    u.control = u.anadir;
    u.anadir.addEventListener("click", function () {
      datos[c.id] = (datos[c.id] || []).concat([{ nombre: "", importe: "" }]);
      pintarLista(c);
      var filas = $$(".lista-fila", u.filas);
      $("input", filas[filas.length - 1]).focus();
      guardarPronto();
    });
    return u;
  }
  function pintarLista(c) {
    var u = UI[c.id], items = datos[c.id] || [];
    u.filas.textContent = "";
    items.forEach(function (item, i) {
      var n = i + 1, sub = c.subcampos;
      var nombre = el("input", { type: "text", id: "f-" + c.id + "-" + i + "-nombre", maxlength: sub[0].max, placeholder: sub[0].ejemplo, autocomplete: "off", "data-lista": c.id, "data-i": i, "data-sub": "nombre" });
      var importe = el("input", { type: "text", id: "f-" + c.id + "-" + i + "-importe", inputmode: "decimal", placeholder: sub[1].ejemplo, autocomplete: "off", "data-lista": c.id, "data-i": i, "data-sub": "importe" });
      nombre.value = item.nombre || "";
      importe.value = item.importe === undefined || item.importe === "" ? "" : String(item.importe).replace(".", ",");
      var quitar = el("button", { type: "button", class: "btn btn--link", text: "Quitar", "aria-label": "Quitar el complemento " + n });
      quitar.addEventListener("click", function () {
        datos[c.id] = items.filter(function (_, j) { return j !== i; });
        pintarLista(c);
        (datos[c.id].length ? $("input", u.filas) : u.anadir).focus();
        refrescar();
        guardarPronto();
      });
      u.filas.append(el("div", { class: "lista-fila" }, [
        el("div", { class: "field" }, [el("label", { for: nombre.id, text: sub[0].label + " " + n }), nombre]),
        el("div", { class: "field" }, [el("label", { for: importe.id, text: "Importe (€/mes)" }), importe]),
        quitar
      ]));
    });
    u.anadir.hidden = items.length >= c.maxItems;
  }

  function construir() {
    C.PASOS.forEach(function (p) {
      var legend = el("legend", { tabindex: "-1", text: p.titulo });
      var fs = el("fieldset", { class: "paso", id: "paso-" + p.n, hidden: true }, [legend, el("p", { class: "paso-intro", text: INTRO[p.n] })]);
      var grupoActual = null, fila = null;
      C.CAMPOS.filter(function (c) { return c.paso === p.n; }).forEach(function (c) {
        if (c.grupo && c.grupo !== (grupoActual && grupoActual.nombre)) {
          grupoActual = { nombre: c.grupo, h: el("h3", { class: "grupo", text: c.grupo }), campos: [] };
          GRUPOS.push(grupoActual);
          fs.append(grupoActual.h);
          if (c.grupo === "Convenio colectivo") fs.append(ayudaConvenio);
        }
        var u = UI[c.id] = crearCampo(c);
        if (grupoActual) grupoActual.campos.push(c.id);
        if (PAREJA[c.id]) {
          // La pareja comparte fila; su ayuda y sus mensajes van debajo, a todo lo ancho
          fila = { rejilla: el("div", { class: "field-row" }), mensajes: el("div", { class: "field-row-mensajes" }) };
          u.fila = fila;
          fila.rejilla.append(u.wrap);
          [u.ayuda, u.error, u.aviso].filter(Boolean).forEach(function (n) { fila.mensajes.append(n); });
          fs.append(el("div", { class: "field-pair" }, [fila.rejilla, fila.mensajes]));
          fila.primero = c.id;
          return;
        }
        if (fila && PAREJA[fila.primero] === c.id) {
          u.fila = fila;
          fila.rejilla.append(u.wrap);
          [u.ayuda, u.error, u.aviso].filter(Boolean).forEach(function (n) { fila.mensajes.append(n); });
          fila = null;
          return;
        }
        fs.append(u.wrap);
        if (c.id === "modoHogar") fs.append(avisoHogar);
        if (c.id === "duracionPrevista") fs.append(bloqueo);
      });
      if (p.n === 1) $(".paso-intro", fs).after(recuperado);
      if (p.n === TOTAL) construirPaso6(fs);
      FIELDSET[p.n] = fs;
      pasosEl.append(fs);
    });
  }

  // ---------- Valores: de `datos` a la pantalla y al revés ----------
  function mostrarValor(c, v) {
    var u = UI[c.id];
    if (c.tipo === "lista") return pintarLista(c);
    if (c.tipo === "checkbox") u.control.checked = !!v;
    else u.control.value = v === undefined || v === null ? "" : (typeof v === "number" ? String(v).replace(".", ",") : v);
  }
  function pintarValores(soloNoTocados) {
    var d = vista();
    C.CAMPOS.forEach(function (c) {
      if (soloNoTocados && datos[c.id] !== undefined) return;
      mostrarValor(c, d[c.id]);
    });
  }
  function leerValor(c, control) {
    if (c.tipo === "checkbox") return control.checked;
    if (c.tipo === "number") return V.parseNumero(control.value);
    return control.value;
  }

  // ---------- Refresco de lo que depende de los datos ----------
  function erroresPaso(n) { return V.validate(datos, { catalog: C, legal: L, paso: n }).errors; }

  function refrescar() {
    var d = vista();
    C.CAMPOS.forEach(function (c) {
      var u = UI[c.id];
      u.etiqueta.textContent = textoDe(c, d, "label");
      if (u.ayuda) u.ayuda.textContent = textoDe(c, d, "ayuda");
      u.wrap.hidden = !flag(c.visible, d);
    });
    // Filas de pareja y subtítulos: se ocultan si no queda nada visible dentro
    $$(".field-pair", pasosEl).forEach(function (f) { f.hidden = !$$(".field", f).some(function (w) { return !w.hidden; }); });
    GRUPOS.forEach(function (g) { g.h.hidden = !g.campos.some(function (id) { return !UI[id].wrap.hidden; }); });
    avisoHogar.hidden = !d.modoHogar;
    ayudaConvenio.hidden = !!d.modoHogar;
    pintarAyudaConvenio(d);
    pintarBloqueo();
    actualizarProgreso();
    avisosPronto();
  }

  function pintarAyudaConvenio(d) {
    var prov = L.provincias.filter(function (p) { return p.nombre === d.provincia; })[0];
    var ca = prov && L.ccaa[prov.ccaa];
    var clave = ca ? prov.ccaa : "-";
    if (ayudaConvenio.getAttribute("data-ccaa") === clave) return;
    ayudaConvenio.setAttribute("data-ccaa", clave);
    ayudaConvenio.textContent = "";
    var partes = ["¿No sabes cuál es tu convenio? Búscalo en el ", enlaceExterno(L.enlaces.regcon, "buscador de convenios estatales del Ministerio de Trabajo")];
    if (ca) partes.push(", en el ", enlaceExterno(ca.url, ca.fuente));
    partes.push(" o, si es de una sola provincia, en el boletín oficial de esa provincia (", enlaceExterno(L.enlaces.boletines, "lista de boletines"), ").");
    ayudaConvenio.append(icono("info"), el("span", {}, partes));
  }

  // Contratos de 4 semanas o menos: explicación y «Siguiente» desactivado mientras dure (art. 2.2)
  function pintarBloqueo() {
    var e = erroresPaso(2).filter(function (x) { return x.code === "DURACION_4_SEMANAS"; })[0];
    bloqueo.hidden = !e;
    btnSiguiente.disabled = !!e && actual === 2;
    if (!e || bloqueo.getAttribute("data-msg") === e.mensaje) return;
    bloqueo.setAttribute("data-msg", e.mensaje);
    bloqueo.textContent = "";
    bloqueo.append(icono("error"), el("span", {}, [e.mensaje + " ", el("a", { href: "rd-723-2026/#a-quien", text: "Qué dice la norma" })]));
  }

  // La tira a–q: rellenas las letras de los pasos ya superados y válidos; marcadas las del paso en curso
  function actualizarProgreso() {
    var p = C.PASOS[actual - 1], texto = "Paso " + actual + " de " + TOTAL + ": " + p.titulo;
    $("#progreso-paso").textContent = texto;
    barra.setAttribute("aria-valuenow", actual);
    barra.setAttribute("aria-valuetext", texto);
    var valido = {}, hechos = 0;
    for (var n = 1; n < TOTAL; n++) valido[n] = alcanzado > n && erroresPaso(n).length === 0;
    C.APARTADOS.forEach(function (ap) {
      var hecho = !!valido[ap.completoTrasPaso];
      tira[ap.id].classList.toggle("is-done", hecho);
      tira[ap.id].classList.toggle("is-current", !hecho && ap.completoTrasPaso === actual);
      if (hecho) hechos++;
    });
    $("#progreso-apartados").textContent = hechos + " de " + C.APARTADOS.length + " apartados";
    return hechos;
  }

  // Avisos que no bloquean (salario mínimo, periodo de prueba…), bajo su campo y con un pequeño retardo
  var tAvisos;
  function avisosPronto() { clearTimeout(tAvisos); tAvisos = setTimeout(pintarAvisos, 350); }
  // El aviso de salario mínimo depende también de las horas (paso 4): se muestra en los dos sitios
  var TAMBIEN_EN = { BAJO_SMI: ["horasSemanales"] };
  function pintarAvisos() {
    C.CAMPOS.forEach(function (c) { UI[c.id].aviso.textContent = ""; });
    V.validate(datos, { catalog: C, legal: L }).warnings.forEach(function (w) {
      if (w.code === "HOGAR") return;
      [w.campo].concat(TAMBIEN_EN[w.code] || []).forEach(function (id) {
        if (UI[id] && !UI[id].wrap.hidden) UI[id].aviso.append(aviso("warn", w.mensaje));
      });
    });
  }

  // ---------- Errores ----------
  function controlDeError(e) {
    var u = UI[e.campo];
    if (!u) return null;
    if (e.indice !== undefined) {
      var fila = $$(".lista-fila", u.filas)[e.indice];
      return fila ? $(e.code === "REQUERIDO" ? '[data-sub="nombre"]' : '[data-sub="importe"]', fila) : u.control;
    }
    return u.control;
  }
  function pintarErrores(errs) {
    $$("[aria-invalid]", FIELDSET[actual]).forEach(function (n) { n.removeAttribute("aria-invalid"); });
    C.CAMPOS.forEach(function (c) { if (c.paso === actual) UI[c.id].error.textContent = ""; });
    errs.forEach(function (e) {
      var ctrl = controlDeError(e);
      if (ctrl) ctrl.setAttribute("aria-invalid", "true");
      var p = UI[e.campo] && UI[e.campo].error;
      if (p) p.textContent = (p.textContent ? p.textContent + " " : "") + e.mensaje;
    });
    pintarResumen(errs);
  }
  function pintarResumen(errs) {
    resumen.textContent = "";
    resumen.hidden = !errs.length;
    if (!errs.length) return;
    var lista = el("ul");
    errs.forEach(function (e) {
      var a = el("a", { href: "#" + (controlDeError(e) || {}).id, text: e.mensaje });
      a.addEventListener("click", function (ev) { var c = controlDeError(e); if (c) { ev.preventDefault(); c.focus(); } });
      lista.append(el("li", {}, [a]));
    });
    resumen.append(icono("error"), el("div", {}, [el("p", { class: "error-summary-title", text: errs.length === 1 ? "Revisa este dato para continuar:" : "Revisa estos " + errs.length + " datos para continuar:" }), lista]));
    $(".paso-intro", FIELDSET[actual]).after(resumen);
  }

  // ---------- Navegación ----------
  function anunciar(t) { anuncio.textContent = ""; setTimeout(function () { anuncio.textContent = t; }, 60); }

  function mostrarPaso(n) {
    actual = n;
    C.PASOS.forEach(function (p) { FIELDSET[p.n].hidden = p.n !== n; });
    btnAnterior.hidden = n === 1;
    btnSiguiente.hidden = n === TOTAL;
    if (n < TOTAL) btnSiguiente.textContent = n === TOTAL - 1 ? "Revisar el documento" : "Siguiente: " + C.PASOS[n].titulo;
    if (n > 1) recuperado.hidden = true;
    resumen.hidden = true;
    conError = {};
    if (n === TOTAL) pintarPaso6();
    else card.setAttribute("data-state", "idle");
    if (n >= TOTAL - 1) cargarMotor().then(prepararEnSilencio).catch(function () { /* se reintenta al pulsar Descargar */ });
    refrescar();
  }

  function irA(n, campoFoco, desdeHistorial) {
    if (!desdeHistorial) history.pushState({ icPaso: n }, "");
    mostrarPaso(n);
    var hechos = actualizarProgreso();
    anunciar("Paso " + n + " de " + TOTAL + ": " + C.PASOS[n - 1].titulo + ". " + hechos + " de " + C.APARTADOS.length + " apartados completados.");
    var destino = campoFoco && UI[campoFoco] ? UI[campoFoco].control : $("legend", FIELDSET[n]);
    card.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
    destino.focus({ preventScroll: true });
    guardarPronto();
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (actual === TOTAL || btnSiguiente.disabled) return;
    var errs = erroresPaso(actual);
    conError = {};
    errs.forEach(function (e) { conError[e.campo] = true; });
    pintarErrores(errs);
    if (errs.length) {
      var primero = controlDeError(errs[0]);
      if (errs.length > 1) resumen.focus(); else if (primero) primero.focus();
      return;
    }
    alcanzado = Math.max(alcanzado, actual + 1);
    guardarEmpresa();
    if (window.__track) window.__track("paso_" + actual + "_completado"); // solo el número de paso, para ver dónde se abandona
    irA(actual + 1);
  });
  btnAnterior.addEventListener("click", function () { irA(actual - 1); });
  window.addEventListener("popstate", function (ev) {
    var n = ev.state && ev.state.icPaso;
    if (!n || n === actual) return;
    // Hacia delante solo se llega hasta el primer paso que aún tenga errores
    var hasta = 1;
    while (hasta < n && hasta < alcanzado && !erroresPaso(hasta).length) hasta++;
    irA(Math.min(n, hasta), null, true);
  });

  // ---------- Cambios en el formulario ----------
  form.addEventListener("input", function (ev) {
    var t = ev.target, c;
    if (t.hasAttribute("data-lista")) {
      c = CAMPO[t.getAttribute("data-lista")];
      var i = Number(t.getAttribute("data-i")), sub = t.getAttribute("data-sub");
      datos[c.id] = (datos[c.id] || []).slice();
      datos[c.id][i] = Object.assign({}, datos[c.id][i]);
      datos[c.id][i][sub] = sub === "importe" ? V.parseNumero(t.value) : t.value;
    } else {
      c = CAMPO[t.name];
      if (!c) return;
      datos[c.id] = leerValor(c, t);
      if (c.id === "modoHogar") pintarValores(true); // textos propuestos del hogar en los campos sin tocar
    }
    $("#reanudar").hidden = true;
    if (conError[c.id]) {
      pintarErrores(erroresPaso(actual).filter(function (e) { return conError[e.campo]; }));
    }
    refrescar();
    guardarPronto();
  });

  // ---------- Memoria ----------
  var tGuardar;
  function guardarPronto() {
    clearTimeout(tGuardar);
    tGuardar = setTimeout(function () {
      if (!Object.keys(datos).length) return;
      memoria.guardar(KEY_BORRADOR, { v: 1, paso: actual, alcanzado: alcanzado, datos: datos, fecha: new Date().toISOString() });
    }, 500);
  }
  function guardarEmpresa() {
    var e = {};
    C.CAMPOS.forEach(function (c) { if (c.ambito === "empresa" && datos[c.id] !== undefined) e[c.id] = datos[c.id]; });
    if (Object.keys(e).length) memoria.guardar(KEY_EMPRESA, e);
  }

  $("#btn-continuar").addEventListener("click", function () {
    var b = memoria.leer(KEY_BORRADOR) || {};
    datos = b.datos || {};
    alcanzado = Math.min(Math.max(Number(b.alcanzado) || 1, 1), TOTAL);
    $("#reanudar").hidden = true;
    pintarValores();
    irA(Math.min(Math.max(Number(b.paso) || 1, 1), alcanzado));
  });
  $("#btn-de-cero").addEventListener("click", function () {
    memoria.borrar(KEY_BORRADOR);
    $("#reanudar").hidden = true;
    irA(1);
  });
  $("#btn-borrar").addEventListener("click", function () {
    if (!window.confirm("¿Borrar de este navegador los datos de la empresa y el documento a medias? El formulario se quedará vacío.")) return;
    memoria.borrar(KEY_EMPRESA);
    memoria.borrar(KEY_BORRADOR);
    IC.logo.borrar();
    if (paso6.campoLogo) { var nuevo = paso6.logo(); paso6.campoLogo.replaceWith(nuevo); paso6.campoLogo = nuevo; }
    pdf = null;
    datos = {};
    alcanzado = 1;
    $("#reanudar").hidden = true;
    recuperado.hidden = true;
    pintarValores();
    irA(1);
    anunciar("Datos borrados de este navegador.");
  });

  // ---------- Paso 6: el papel, el PDF y la entrega ----------
  function modelo() { return M.buildDocModel(datos, { catalog: C, legal: L, marca: BRAND.name, actualizado: BRAND.updated }); }
  function cargarMotor() { return IC.pdf.cargar(); }
  // informacion-laboral-<nombre>-<aaaa-mm-dd>.pdf: sin tildes ni signos, solo a-z, 0-9 y guiones
  function nombreArchivo() {
    var d = vista();
    var nombre = IC.pdf.slug(d.trabajadorNombre);
    var fecha = String(d.fechaInicio || new Date().toISOString().slice(0, 10)).replace(/[^0-9-]/g, "");
    return "informacion-laboral-" + (nombre || "documento") + "-" + fecha + ".pdf";
  }

  // El PDF se crea una vez por versión de los datos y se reutiliza para descargar, abrir y compartir
  var pdf = null; // { clave, blob, nombre, file, usado }
  function crearPdf() {
    var clave = JSON.stringify(datos);
    if (pdf && pdf.clave === clave) return pdf;
    var blob = window.__IC_PDF__.buildPdf(modelo(), { jsPDF: window.jspdf.jsPDF, marca: BRAND.name, logo: IC.logo.leer() }).output("blob");
    var nombre = nombreArchivo();
    pdf = { clave: clave, blob: blob, nombre: nombre, file: typeof File === "function" ? new File([blob], nombre, { type: "application/pdf" }) : null, usado: false };
    return pdf;
  }
  // Al llegar al paso 6 con el motor ya cargado: así los botones responden al instante (y compartir no caduca)
  function prepararEnSilencio() {
    if (actual !== TOTAL) return;
    try { crearPdf(); } catch (e) { /* se verá al pulsar un botón */ }
  }
  var ocupado = false;
  function ocupar(si) {
    ocupado = si;
    [paso6.descargar, paso6.bajo, paso6.abrir, paso6.compartir].forEach(function (b) {
      if (si) b.setAttribute("aria-disabled", "true"); else b.removeAttribute("aria-disabled");
    });
  }
  function conPdf(accion) {
    if (ocupado) return Promise.resolve();
    var listo = pdf && pdf.clave === JSON.stringify(datos);
    if (!listo) { card.setAttribute("data-state", "working"); anunciar("Preparando el documento…"); }
    ocupar(true);
    return cargarMotor().then(function () {
      var r = crearPdf();
      accion(r);
      if (!r.usado) { r.usado = true; marcarGenerado(); }
      card.setAttribute("data-state", "done");
      textoDescargar(r);
    }).catch(function (e) {
      console.warn("[pdf]", e);
      card.setAttribute("data-state", "error");
      anunciar("No se ha podido crear el PDF en este navegador. Puedes usar la versión para imprimir.");
    }).then(function () { ocupar(false); });
  }
  // «doc_generado» cuenta una vez por versión de los datos, se descargue en PDF, en Word o en los dos
  var generado = null;
  function marcarGenerado() {
    var clave = JSON.stringify(datos);
    if (generado === clave) return;
    generado = clave;
    if (window.__track) window.__track("doc_generado");
  }
  // Word (.docx) con el mismo modelo que el PDF, para quien necesite editarlo antes de entregarlo
  function descargarWord() {
    IC.pdf.cargarWord().then(function () {
      var D = window.__IC_DOCX__;
      IC.pdf.descargar(new Blob([D.buildDocx(modelo())], { type: D.MIME }), nombreArchivo().replace(/\.pdf$/, ".docx"));
      marcarGenerado();
      anunciar("Documento en Word descargado. Si lo editas, revisa que sigan los 17 apartados antes de entregarlo.");
    }).catch(function (e) {
      console.warn("[docx]", e);
      anunciar("No se ha podido crear el Word en este navegador. Descarga el PDF.");
    });
  }
  function textoDescargar(r) {
    [paso6.descargar, paso6.bajo].forEach(function (b) { b.textContent = r ? "Descargar PDF (" + IC.pdf.tamano(r.blob.size) + ")" : "Descargar PDF"; });
  }
  function descargar(r) {
    IC.pdf.descargar(r.blob, r.nombre);
    anunciar("Documento descargado. Entrégalo antes de que empiece a trabajar y guarda el Recibí firmado.");
  }

  // Alternativa si el PDF falla: imprimir la vista previa (dos ejemplares) con el menú del navegador
  function imprimirVista() {
    var m = modelo();
    var hojas = el("div", { id: "impresion" }, m.ejemplares.map(function (ej) {
      return el("div", { class: "impresion-ejemplar" }, [el("p", { class: "papel-rotulo", text: ej }), crearPapel(m, false)]);
    }));
    document.body.append(hojas);
    document.body.classList.add("imprimir-papel");
    var fin = function () { document.body.classList.remove("imprimir-papel"); hojas.remove(); window.removeEventListener("afterprint", fin); };
    window.addEventListener("afterprint", fin);
    window.print();
  }

  function crearPapel(m, conEditar) {
    var hogar = !!vista().modoHogar;
    var lista = el("ol", { class: "papel-apartados", role: "list" });
    m.apartados.forEach(function (a) {
      var ap = C.APARTADOS.filter(function (x) { return x.id === a.id; })[0];
      var cabecera = el("div", { class: "papel-ap-cabecera" }, [el("h4", { text: a.id + ") " + a.titulo })]);
      // En el modo hogar, j, k, l, m y o son textos fijos: no hay nada que editar
      if (conEditar && !(hogar && "jklmo".indexOf(a.id) >= 0)) {
        var editar = el("button", { type: "button", class: "btn-editar", text: "Editar", "aria-label": "Editar el apartado " + a.id + ") " + a.titulo });
        editar.addEventListener("click", function () { irA(ap.completoTrasPaso); });
        cabecera.append(editar);
      }
      lista.append(el("li", { class: "papel-apartado" }, [cabecera, el("p", { class: "papel-cita", text: a.cita }), el("p", { text: a.texto })]));
    });
    var lg = IC.logo.leer();
    return el("article", { class: "papel", "aria-label": "Vista previa del documento" }, [
      lg ? el("img", { class: "papel-logo", src: lg.dataUrl, alt: "Logo de la empresa" }) : null,
      el("h3", { text: m.titulo }),
      el("p", { class: "papel-sub", text: m.subtitulo }),
      el("dl", { class: "papel-partes" }, [
        el("div", {}, [el("dt", { text: m.partes.etiquetaEmpresa }), el("dd", { text: m.partes.empresa })]),
        el("div", {}, [el("dt", { text: "Persona trabajadora" }), el("dd", { text: m.partes.trabajador })])
      ]),
      lista,
      el("section", { class: "papel-recibi", "aria-label": "Recibí" }, [
        el("h4", { text: "Recibí" }),
        el("p", { text: m.recibi.texto }),
        el("p", { class: "papel-lugar", text: m.recibi.lugarFecha }),
        el("div", { class: "papel-firmas" }, m.recibi.firmas.map(function (f) { return el("p", { text: f }); }))
      ]),
      el("p", { class: "papel-pie", text: m.pie })
    ]);
  }

  function construirPaso6(fs) {
    paso6.avisos = el("div", { class: "revision-avisos", hidden: true });
    paso6.descargar = el("button", { type: "button", class: "btn btn--primary btn--grande", text: "Descargar PDF" });
    paso6.abrir = el("button", { type: "button", class: "btn btn--secondary", text: "Abrir para imprimir" });
    paso6.compartir = el("button", { type: "button", class: "btn btn--secondary", text: "Compartir", hidden: !IC.pdf.puedeCompartir() });
    paso6.word = el("button", { type: "button", class: "btn btn--secondary", text: "Descargar en Word" });
    var vistaImpresion = el("button", { type: "button", class: "btn btn--secondary", text: "Imprimir o guardar como PDF" });
    var otro = el("button", { type: "button", class: "btn btn--link", text: "Crear otro documento (se mantiene la empresa)" });
    var bajo = paso6.bajo = el("button", { type: "button", class: "btn btn--primary", text: "Descargar PDF" });
    var whatsapp = el("a", {
      href: "https://wa.me/?text=" + encodeURIComponent("Para hacer gratis el documento de información laboral del RD 723/2026: " + location.origin + location.pathname),
      target: "_blank", rel: "noopener"
    }, ["Compártelo por WhatsApp", el("span", { class: "sr-only", text: " (se abre en una pestaña nueva)" })]);
    paso6.papel = el("div", { class: "papel-marco" });
    // Logo opcional: al ponerlo o quitarlo, el PDF se vuelve a crear y la vista previa se repinta
    paso6.logo = function () { return IC.logo.campo("f-logo", function () { pdf = null; pintarPaso6(); }); };
    paso6.campoLogo = paso6.logo();

    fs.append(
      paso6.avisos,
      paso6.campoLogo,
      el("div", { class: "acciones-doc" }, [paso6.descargar, el("div", { class: "acciones-secundarias" }, [paso6.word, paso6.abrir, paso6.compartir])]),
      el("p", { class: "nota-doc", "data-when": "idle" }, ["El PDF lleva dos ejemplares: uno para la persona trabajadora y otro para que la empresa lo conserve firmado. El Word trae lo mismo, por si necesitas editarlo."]),
      aviso("info", "Preparando el documento…", { "data-when": "working" }),
      aviso("ok", "Documento listo. Entrégalo antes de que empiece a trabajar y guarda el Recibí firmado.", { "data-when": "done" }),
      aviso("error", ["No se ha podido crear el PDF en este navegador. Puedes imprimir el documento o guardarlo como PDF desde el menú de impresión. ", vistaImpresion], { "data-when": "error" }),
      paso6.papel,
      el("div", { class: "cierre-doc" }, [
        bajo,
        el("p", { class: "nota-doc" }, ["Al entregarlo: si la persona no domina el castellano, explícale el contenido; si tiene una discapacidad o capacidad intelectual límite, debe resultarle accesible y comprensible (art. 6.3 del RD 723/2026)."]),
        el("p", { class: "nota-doc", "data-when": "done" }, ["¿Conoces a alguien que también lo necesite? ", whatsapp, "."]),
        el("p", { class: "nota-doc" }, ["Si usas un ordenador compartido, pulsa «Borrar mis datos de este dispositivo» al terminar."]),
        otro
      ])
    );

    paso6.descargar.addEventListener("click", function () { conPdf(descargar); });
    bajo.addEventListener("click", function () { conPdf(descargar); });
    paso6.word.addEventListener("click", descargarWord);
    paso6.abrir.addEventListener("click", function () {
      var ventana = window.open("", "_blank"); // se abre ya, dentro del clic, para que no la bloquee el navegador
      conPdf(function (r) {
        var url = URL.createObjectURL(r.blob);
        if (ventana) ventana.location.href = url; else descargar(r);
      }).then(function () { if (ventana && card.getAttribute("data-state") === "error") ventana.close(); });
    });
    paso6.compartir.addEventListener("click", function () {
      conPdf(function (r) {
        navigator.share({ files: [r.file], title: "Información laboral RD 723/2026" }).catch(function (e) {
          if (e && e.name !== "AbortError") console.warn("[compartir]", e);
        });
      });
    });
    vistaImpresion.addEventListener("click", imprimirVista);
    otro.addEventListener("click", function () {
      var empresa = {};
      C.CAMPOS.forEach(function (c) { if (c.ambito === "empresa" && datos[c.id] !== undefined) empresa[c.id] = datos[c.id]; });
      guardarEmpresa();
      memoria.borrar(KEY_BORRADOR);
      datos = empresa;
      pdf = null;
      alcanzado = erroresPaso(1).length ? 1 : 2;
      pintarValores();
      irA(alcanzado);
    });
  }

  function pintarPaso6() {
    var avisos = V.validate(datos, { catalog: C, legal: L }).warnings.filter(function (w) { return w.code !== "HOGAR" && CAMPO[w.campo]; });
    paso6.avisos.textContent = "";
    paso6.avisos.hidden = !avisos.length;
    if (avisos.length) {
      paso6.avisos.append(el("h3", { text: avisos.length === 1 ? "Un aviso antes de descargar" : avisos.length + " avisos antes de descargar" }));
      avisos.forEach(function (w) {
        var ir = el("button", { type: "button", class: "btn btn--link", text: "Revisar este dato" });
        ir.addEventListener("click", function () { irA(CAMPO[w.campo].paso, w.campo); });
        paso6.avisos.append(aviso("warn", [w.mensaje + " ", ir]));
      });
    }
    paso6.papel.textContent = "";
    paso6.papel.append(crearPapel(modelo(), true));
    var listo = pdf && pdf.clave === JSON.stringify(datos);
    card.setAttribute("data-state", listo && pdf.usado ? "done" : "idle");
    textoDescargar(listo ? pdf : null);
  }

  // «Rellenarlo con datos de ejemplo»: enseña el documento terminado al momento; luego se cambian los datos
  var EJEMPLO = {
    modoHogar: false, empresaNombre: "Bar La Esquina, S.L. (ejemplo)", empresaNif: "B00000000",
    empresaDomicilio: "C/ Mayor 12, 28013 Madrid", centroIgualDomicilio: true, provincia: "Madrid", numTrabajadores: 4,
    trabajadorNombre: "Lucía Martín Pérez (ejemplo)", fechaInicio: "2026-10-06", tipoContrato: "indefinido",
    puesto: "Camarera de barra", categoria: "Grupo II, camarero/a", pruebaCantidad: 2, pruebaUnidad: "meses",
    funciones: "Atención a clientes en barra y sala, preparación de bebidas y cafés, cobro y limpieza de la zona de trabajo.",
    salarioBase: 1400, salarioPeriodo: "mes", complementos: [{ nombre: "Plus de transporte", importe: 60 }], pagasExtra: 2,
    horasSemanales: 40, tipoJornada: "completa", horario: "De martes a sábado, de 10:00 a 14:00 y de 19:00 a 23:00.",
    convenioNombre: "Convenio colectivo de hostelería de la Comunidad de Madrid", convenioCodigo: "28000000012025",
    convenioPublicacion: "BOCM de 15 de marzo de 2025", convenioVigencia: "Del 1 de enero de 2025 al 31 de diciembre de 2027",
    ssMutua: "Mutua colaboradora, para accidentes de trabajo y enfermedades profesionales",
    protocoloAcoso: "Tablón del local y copia entregada junto a este documento"
  };
  function initEjemplo() {
    var caja = $("#ejemplo-rapido"), boton = $("#btn-ejemplo");
    if (!caja || !boton) return;
    caja.hidden = false;
    boton.addEventListener("click", function () {
      datos = JSON.parse(JSON.stringify(EJEMPLO));
      pintarValores();
      alcanzado = TOTAL;
      $("#reanudar").hidden = true;
      $("#ejemplo-texto").textContent = "Es un ejemplo con datos inventados: cambia en cada paso los datos por los tuyos, o pulsa «Borrar mis datos» para empezar de cero.";
      boton.hidden = true;
      if (window.__track) window.__track("ejemplo_cargado");
      irA(TOTAL);
    });
  }

  // ---------- Arranque ----------
  function init() {
    construir();
    var borrador = memoria.leer(KEY_BORRADOR), empresa = memoria.leer(KEY_EMPRESA);
    if (empresa && typeof empresa === "object") {
      datos = Object.assign({}, empresa);
      recuperado.hidden = false;
    }
    pintarValores();
    mostrarPaso(1);
    history.replaceState({ icPaso: 1 }, "");
    ["#progreso", "#form-generador", "#card-foot"].forEach(function (s) { $(s).hidden = false; });
    if (borrador && borrador.datos && Object.keys(borrador.datos).length) {
      recuperado.hidden = true;
      $("#reanudar").hidden = false;
    }
    initEjemplo();
  }
  IC.safe(init, "generador");

  // Para la sección 05 (comunicación de cambios) y las pruebas
  window.__IC_GENERADOR__ = { datos: function () { return datos; }, irA: irA };
})();
;

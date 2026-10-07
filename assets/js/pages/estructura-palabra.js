/* Docere et Delectare · lógica de página */
/* =====================================================
   UTILIDADES
===================================================== */







function comparar(respuesta, soluciones) {

    const r = normalizar(respuesta);

    return soluciones.some(
        s => r === normalizar(s)
    );

}


/* =====================================================
   BANCO: IDENTIFICA
   NIVEL 1
===================================================== */





/* =====================================================
   BANCO: CLASIFICA
===================================================== */



/* =====================================================
   BANCO: ANALIZA
===================================================== */




/* =====================================================
   BANCO: RETO FINAL
===================================================== */




/* =====================================================
   VARIABLES
===================================================== */

let bloqueActual = "";

let actividadesActuales = [];

let actividadActual = 0;

let puntuacion = 0;

let respondida = false;


/* =====================================================
   CONFIGURACIÓN DE CADA PARTIDA
===================================================== */

const configuracion = {

identifica: [
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 3],
    [5, 3],
    [6, 2]
],

clasifica: [
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 4],
    [6, 4]
],

analiza: [
    ["analisis", 11]
],

reto: [
    ["analisis", 5],
    ["mcq", 7],
    ["texto", 2]
]


};


/* =====================================================
   NOMBRES
===================================================== */

// Estas dos secciones utilizan todo su banco disponible; sus sesiones tienen 11 y 14 actividades respectivamente.
const nombres = {

identifica: "🔎 Identifica",

clasifica: "🏷️ Clasifica",

analiza: "🧩 Analiza",

reto: "🏆 Reto final"

};


/* =====================================================
   CREAR PARTIDA
===================================================== */

function crearPartida(tipo){
 const banco={identifica,clasifica,analiza,reto}[tipo]||[],reglas=configuracion[tipo]||[],seleccion=[];
 if(tipo==="identifica"||tipo==="clasifica")reglas.forEach(([nivel,cantidad])=>seleccion.push(...mezclar(banco.filter(a=>a.nivel===nivel)).slice(0,cantidad)));
 else{reglas.forEach(([tipoActividad,cantidad])=>seleccion.push(...mezclar(banco.filter(a=>a.tipo===tipoActividad)).slice(0,cantidad)));if(seleccion.length<20)seleccion.push(...mezclar(banco.filter(a=>!seleccion.includes(a))).slice(0,20-seleccion.length));}
 return mezclar(seleccion).slice(0,20);
}
/* =====================================================
   INICIAR BLOQUE
===================================================== */

function iniciarBloque(tipo){
 bloqueActual=tipo;window.respuestaMCQ=undefined;window.respuestaClasificacion=undefined;
 actividadesActuales=crearPartida(tipo);actividadActual=0;puntuacion=0;omitidas=0;
 document.getElementById("menu").style.display="none";document.getElementById("resultado").style.display="none";document.getElementById("actividad").style.display="block";mostrarActividad();
}


/* =====================================================
   MOSTRAR ACTIVIDAD
===================================================== */

function mostrarActividad() {

    respondida = false;


    const actividad =
        actividadesActuales[actividadActual];


    const porcentaje =
        Math.round(
            ((actividadActual + 1) /
            actividadesActuales.length) * 100
        );


    document.getElementById("numeroPregunta")
        .textContent =
        "Actividad " +
        (actividadActual + 1) +
        " de " +
        actividadesActuales.length;


    document.getElementById("porcentaje")
        .textContent =
        porcentaje + "%";


    document.getElementById("barraProgreso")
        .style.width =
        porcentaje + "%";


    document.getElementById("etiquetaActividad")
        .textContent =
        nombres[bloqueActual];


    document.getElementById("pregunta")
        .textContent =
        actividad.pregunta;


    document.getElementById("palabra")
        .textContent =
        actividad.palabra || "";


    const feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
    feedback.className = "";


    document.getElementById("comprobar")
        .style.display =
        "inline-block";


    document.getElementById("siguiente")
        .style.display =
        "none";


    construirInterfaz(actividad);

}


/* =====================================================
   CONSTRUIR INTERFAZ
===================================================== */

function construirInterfaz(actividad) {

    const contenedor =
        document.getElementById(
            "contenidoActividad"
        );


    contenedor.innerHTML = "";


    /* TEST */

    if (actividad.tipo === "mcq") {

        const div =
            document.createElement("div");

        div.className = "opciones";

        actividad.opciones.forEach(
            (opcion, indice) => {

                const boton =
                    document.createElement("button");

                boton.className = "opcion";

                boton.textContent = opcion;

                boton.dataset.indice =
                    indice;

                boton.onclick = function() {

                    seleccionarMCQ(
                        indice,
                        div
                    );

                };

                div.appendChild(boton);

            }
        );

        contenedor.appendChild(div);

    }


    /* TEXTO */

    if (actividad.tipo === "texto") {

        const input =
            document.createElement("input");

        input.className = "campo";

        input.id = "respuestaTexto";

        input.placeholder =
            "Escribe tu respuesta...";

        contenedor.appendChild(input);

        setTimeout(
            () => input.focus(),
            100
        );

    }


    /* SEGMENTACIÓN */

    if (actividad.tipo === "segmentacion") {

        const texto =
            document.createElement("p");

        texto.className =
            "segmentacion";

        texto.textContent =
            "Escribe la segmentación de la palabra.";

        contenedor.appendChild(texto);


        const input =
            document.createElement("input");

        input.className = "campo";

        input.id = "respuestaTexto";

        input.placeholder =
            "Ejemplo: re- + lect- + -ura";

        contenedor.appendChild(input);

        setTimeout(
            () => input.focus(),
            100
        );

    }


    /* CLASIFICACIÓN */

    if (actividad.tipo === "clasificacion") {

        const texto =
            document.createElement("p");

        texto.textContent =
            "Selecciona la categoría correcta:";

        contenedor.appendChild(texto);


        const div =
            document.createElement("div");

        div.className =
            "lista-clasificacion";


        actividad.categorias.forEach(
            categoria => {

                const boton =
                    document.createElement("button");

                boton.className =
                    "clasificacion-btn";

                boton.textContent =
                    categoria;

                boton.dataset.valor =
                    categoria;

                boton.onclick = function() {

                    document
                        .querySelectorAll(
                            ".clasificacion-btn"
                        )
                        .forEach(
                            b =>
                                b.style.background =
                                "white"
                        );

                    boton.style.background =
                        "#eee8dc";

                    window.respuestaClasificacion =
                        categoria;

                };

                div.appendChild(boton);

            }
        );


        contenedor.appendChild(div);

    }


    /* ANÁLISIS COMPLETO */

    if (actividad.tipo === "analisis") {

        actividad.campos.forEach(
            campo => {

                const etiqueta =
                    document.createElement("label");

                etiqueta.className =
                    "etiqueta-campo";

                etiqueta.textContent =
                    campo[1];

                contenedor.appendChild(
                    etiqueta
                );


                const input =
                    document.createElement("input");

                input.className = "campo";

                input.dataset.campo =
                    campo[0];

                input.placeholder =
                    "Escribe aquí...";

                contenedor.appendChild(
                    input
                );

            }
        );

    }

}


/* =====================================================
   SELECCIONAR TEST
===================================================== */

function seleccionarMCQ(indice, contenedor) {

    window.respuestaMCQ = indice;

    contenedor
        .querySelectorAll(".opcion")
        .forEach(
            boton => {

                boton.style.background =
                    "#eee8dc";

            }
        );


    contenedor
        .querySelectorAll(".opcion")
        [indice]
        .style.background =
        "#d9d0c2";

}


/* =====================================================
   COMPROBAR
===================================================== */

function comprobar() {

    if (respondida) {
        return;
    }


    const actividad =
        actividadesActuales[actividadActual];


    let correcto = false;

    let explicacion =
        actividad.explicacion || "";


    /* TEST */

    if (actividad.tipo === "mcq") {

        if (
            window.respuestaMCQ === undefined
        ) {

            mostrarAviso(
                "Selecciona una respuesta antes de comprobar."
            );

            return;

        }


        correcto =
            window.respuestaMCQ ===
            actividad.correcta;

    }


    /* TEXTO */

    if (
        actividad.tipo === "texto" ||
        actividad.tipo === "segmentacion"
    ) {

        const input =
            document.getElementById(
                "respuestaTexto"
            );


        if (!input.value.trim()) {

            mostrarAviso(
                "Escribe una respuesta antes de comprobar."
            );

            return;

        }


        correcto =
            comparar(
                input.value,
                actividad.soluciones
            );

    }


    /* CLASIFICACIÓN */

    if (actividad.tipo === "clasificacion") {

        if (
            !window.respuestaClasificacion
        ) {

            mostrarAviso(
                "Selecciona una categoría antes de comprobar."
            );

            return;

        }


        correcto =
            window.respuestaClasificacion ===
            actividad.correcta;

    }


    /* ANÁLISIS */

    if (actividad.tipo === "analisis") {

        const inputs =
            document.querySelectorAll(
                "[data-campo]"
            );


        let total = inputs.length;

        let aciertos = 0;

        let respuestasCompletas = true;


        inputs.forEach(
            input => {

                const valor =
                    input.value.trim();


                if (!valor) {

                    respuestasCompletas =
                        false;

                    return;

                }


                const clave =
                    input.dataset.campo;


                const soluciones =
                    actividad.soluciones[clave] || [];


                if (
                    comparar(
                        valor,
                        soluciones
                    )
                ) {

                    aciertos++;

                }

            }
        );


        if (!respuestasCompletas) {

            mostrarAviso(
                "Completa todos los apartados antes de comprobar."
            );

            return;

        }


        correcto =
            aciertos === total;


        if (!correcto) {

            explicacion +=
                "<br><br><strong>" +
                aciertos +
                " de " +
                total +
                " apartados correctos.</strong>";

        }

    }


    respondida = true;


    if (correcto) {

        puntuacion++;

        mostrarFeedback(
            true,
            explicacion
        );

    } else {

        mostrarFeedback(
            false,
            obtenerSolucion(actividad, explicacion)
        );

    }


    document.getElementById("comprobar")
        .style.display =
        "none";


    document.getElementById("siguiente")
        .style.display =
        "inline-block";

}


/* =====================================================
   SOLUCIÓN
===================================================== */

function obtenerSolucion(
    actividad,
    explicacion
) {

    let texto = "";


    if (actividad.tipo === "mcq") {

        texto =
            "La respuesta correcta es: <strong>" +
            actividad.opciones[
                actividad.correcta
            ] +
            "</strong>";

    }


    if (
        actividad.tipo === "texto" ||
        actividad.tipo === "segmentacion"
    ) {

        texto =
            "Una respuesta válida es: <strong>" +
            actividad.soluciones[0] +
            "</strong>";

    }


    if (actividad.tipo === "clasificacion") {

        texto =
            "La clasificación correcta es: <strong>" +
            actividad.correcta +
            "</strong>";

    }


    if (actividad.tipo === "analisis") {

        texto =
            "<strong>Solución:</strong><br>";

        actividad.campos.forEach(
            campo => {

                const soluciones =
                    actividad.soluciones[
                        campo[0]
                    ];


                if (soluciones) {

                    texto +=
                        "<br><strong>" +
                        campo[1] +
                        ":</strong> " +
                        soluciones[0];

                }

            }
        );

    }


    return texto +
        "<br><br>" +
        explicacion;

}


/* =====================================================
   FEEDBACK
===================================================== */

function mostrarFeedback(
    correcto,
    texto
) {

    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        correcto
            ? "feedback exito"
            : "feedback error";


    feedback.innerHTML =
        correcto
            ? "✅ <strong>¡Correcto!</strong><br><br>" +
              texto
            : "❌ <strong>Hay algún error.</strong><br><br>" +
              texto;

}


/* =====================================================
   AVISO
===================================================== */

function mostrarAviso(texto) {

    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "feedback";


    feedback.innerHTML =
        "⚠️ " + texto;

}


/* =====================================================
   SIGUIENTE
===================================================== */

function adelante() {
    if (!respondida) omitidas++;
    actividadActual++;
    if (actividadActual < actividadesActuales.length) {
        window.respuestaMCQ = undefined;
        window.respuestaClasificacion = undefined;
        mostrarActividad();
    } else {
        mostrarResultado();
    }
}

function siguientePregunta() {

    actividadActual++;


    if (
        actividadActual <
        actividadesActuales.length
    ) {

        window.respuestaMCQ =
            undefined;

        window.respuestaClasificacion =
            undefined;

        mostrarActividad();

    } else {

        mostrarResultado();

    }

}


/* =====================================================
   RESULTADO
===================================================== */

function mostrarResultado() {

    document.getElementById("actividad")
        .style.display =
        "none";


    document.getElementById("resultado")
        .style.display =
        "block";


    const nota =
        (
            puntuacion /
            actividadesActuales.length
        ) * 10;


    document.getElementById("nota")
        .textContent =
        nota.toFixed(1) +
        " / 10";


    let mensaje;


    if (nota >= 9) {

        mensaje =
            "🏆 ¡Excelente! Dominas muy bien la estructura de la palabra.";

    }

    else if (nota >= 7) {

        mensaje =
            "👏 ¡Muy bien! Tienes un buen dominio de estos contenidos.";

    }

    else if (nota >= 5) {

        mensaje =
            "👍 Has aprobado. Conviene seguir practicando algunos contenidos.";

    }

    else {

        mensaje =
            "📚 Necesitas repasar y volver a practicar.";

    }


    document.getElementById("mensaje")
        .innerHTML = mensaje + "<br><br><strong>Correctas:</strong> " + puntuacion + " · <strong>Incorrectas:</strong> " + (actividadesActuales.length - puntuacion - omitidas) + " · <strong>Sin responder:</strong> " + omitidas;}


/* =====================================================
   REPETIR
===================================================== */

function repetirBloque() {

    window.respuestaMCQ =
        undefined;

    window.respuestaClasificacion =
        undefined;

    iniciarBloque(
        bloqueActual
    );

}


/* =====================================================
   VOLVER AL MENÚ
===================================================== */

function volverMenu() {

    document.getElementById("actividad")
        .style.display =
        "none";


    document.getElementById("resultado")
        .style.display =
        "none";


    document.getElementById("menu")
        .style.display =
        "block";

}


/* =====================================================
   VOLVER A MORFOLOGÍA
===================================================== */

function volverMorfologia() {

    window.location.href =
        "morfologia.html";

}


window.comparar=comparar;window.crearPartida=crearPartida;window.iniciarBloque=iniciarBloque;window.mostrarActividad=mostrarActividad;window.construirInterfaz=construirInterfaz;window.seleccionarMCQ=seleccionarMCQ;window.comprobar=comprobar;window.obtenerSolucion=obtenerSolucion;window.mostrarFeedback=mostrarFeedback;window.mostrarAviso=mostrarAviso;window.siguientePregunta=siguientePregunta;window.mostrarResultado=mostrarResultado;window.repetirBloque=repetirBloque;window.volverMenu=volverMenu;window.volverMorfologia=volverMorfologia;

/* Docere et Delectare · Contrato de generación de Sintaxis · v1.0.0
   Contrato de datos para una futura capa IA. No conecta todavía con ningún servicio. */
const CONTRATO_GENERACION_SINTAXIS={
version:"1.0.0",
entrada:{
bloque:"unidades | simple | compuesta | error | reto",
familia:"clave de SINTAXIS_TAXONOMIA.familias",
nivel:"1..6",
formato:"mcq | text | analysis | select | build | transform | chain",
cantidad:"entero positivo",
restricciones:"lista de restricciones adicionales"
},
salida:{
id:"identificador provisional; el repositorio asigna el ID definitivo al publicar",
n:"nivel 1..6",
t:"tipo implementado por el motor",
q:"enunciado HTML seguro",
o:"opciones para mcq",
r:"respuesta o respuestas aceptadas",
e:"explicación pedagógica",
meta:{
familias:"array",
operacion:"operación cognitiva",
confusionObjetivo:"error que pretenden discriminar los distractores, si procede",
criterio:"prueba lingüística que justifica la solución"
}
},
estados:["generada","validada","rechazada","publicada"],
validacion:[
"El formato existe en el motor.",
"El nivel pertenece al bloque y cumple su definición operativa.",
"La familia pertenece al bloque solicitado.",
"El enunciado no revela la respuesta.",
"Un MCQ tiene exactamente una opción válida.",
"Los distractores son falsos en el contexto y representan errores plausibles.",
"La explicación justifica la respuesta mediante un criterio sintáctico.",
"La oración propuesta no presenta ambigüedad de análisis razonable.",
"La actividad no duplica inmediatamente otra actividad.",
"El HTML permitido está equilibrado."
],
publicacion:{
regla:"Ninguna salida generada por IA entra directamente en BANCO.",
flujo:["generar","validar","revisar","asignar-ID","publicar"]
}
};
globalThis.CONTRATO_GENERACION_SINTAXIS=CONTRATO_GENERACION_SINTAXIS;
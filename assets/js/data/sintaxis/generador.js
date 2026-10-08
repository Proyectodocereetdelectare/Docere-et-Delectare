/* Docere et Delectare · Generador calibrado de Sintaxis · v1.0.0
   Núcleo agnóstico del proveedor IA. No contiene claves ni llama a servicios externos.
   Flujo: especificación → prompt estructurado → candidato → validación → publicación. */
(function(){
"use strict";
function cargar(nombre){return globalThis[nombre];}
function error(mensaje){return {ok:false,errores:[mensaje]};}
function crearEspecificacion(opciones={}){
  const tax=cargar("SINTAXIS_TAXONOMIA");
  if(!tax)return error("No está cargada la taxonomía de Sintaxis.");
  const bloque=opciones.bloque||"simple";
  const familia=opciones.familia||null;
  const nivel=Number(opciones.nivel||3);
  const formato=opciones.formato||"mcq";
  const cantidad=Math.max(1,Math.min(20,Number(opciones.cantidad||5)));
  if(!tax.bloques[bloque])return error("Bloque inexistente: "+bloque);
  if(!tax.bloques[bloque].familias.includes(familia)&&!(bloque==="reto"&&familia==="integracion"))
    return error("La familia "+familia+" no pertenece al bloque "+bloque+".");
  if(!tax.niveles[nivel])return error("Nivel inexistente: "+nivel);
  if(!tax.generacion.formatos.includes(formato))return error("Formato no implementado: "+formato+".");
  const nivelDef=tax.bloques[bloque].niveles[nivel];
  const familiaDef=tax.familias[familia]||{};
  return {ok:true,especificacion:{
    bloque,familia,nivel,formato,cantidad,objetivo:nivelDef,
    pruebas:familiaDef.pruebas||[],contrastes:familiaDef.contrastes||[],
    restricciones:Array.isArray(opciones.restricciones)?opciones.restricciones:[],
    evitar:Array.isArray(opciones.evitar)?opciones.evitar:[],
    contexto:opciones.contexto||"educativo ESO/Bachillerato",idioma:"es"
  }};
}
function construirPrompt(especificacion){
  const tax=cargar("SINTAXIS_TAXONOMIA"),contrato=cargar("CONTRATO_GENERACION_SINTAXIS");
  if(!tax||!contrato)return "";
  return [
    "Eres un generador especializado en didáctica de la sintaxis española.",
    "Genera actividades para Docere et Delectare respetando estrictamente la especificación.",
    "","ESPECIFICACIÓN:",JSON.stringify(especificacion,null,2),
    "","REGLAS CURRICULARES:",...tax.principios.map(x=>"- "+x),
    "","BLOQUE:",JSON.stringify(tax.bloques[especificacion.bloque],null,2),
    "","FAMILIA:",JSON.stringify(tax.familias[especificacion.familia]||{},null,2),
    "","RESTRICCIONES DE GENERACIÓN:",...tax.generacion.reglas.map(x=>"- "+x),
    "","BLOQUEOS:",...tax.generacion.bloqueos.map(x=>"- "+x),
    "","CONTRATO DE SALIDA:",JSON.stringify(contrato.salida,null,2),
    "","Devuelve SOLO JSON válido con una propiedad actividades que contenga un array.",
    "No añadas markdown ni explicaciones fuera del JSON."
  ].join("\n");
}
function textoPlano(valor){return String(valor??"").replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();}
function validarActividad(a,e){
  const errores=[];
  if(!a||typeof a!=="object")return error("La actividad no es un objeto.");
  if(!a.q||!textoPlano(a.q))errores.push("Falta el enunciado.");
  if(!a.e||!textoPlano(a.e))errores.push("Falta la explicación.");
  if(a.n!==e.nivel)errores.push("El nivel generado no coincide con el solicitado.");
  if(a.t!==e.formato)errores.push("El tipo generado no coincide con el solicitado.");
  if(a.meta?.familias&&!a.meta.familias.includes(e.familia))errores.push("La actividad declara una familia distinta.");
  if(e.formato==="mcq"){
    if(!Array.isArray(a.o)||a.o.length!==4)errores.push("Un MCQ debe tener exactamente 4 opciones.");
    else{
      const opciones=a.o.map(textoPlano).filter(Boolean);
      if(new Set(opciones.map(x=>x.toLowerCase())).size!==4)errores.push("El MCQ contiene opciones duplicadas.");
      if(!a.r||!opciones.some(x=>x.toLowerCase()===textoPlano(a.r).toLowerCase()))errores.push("La respuesta correcta no coincide con ninguna opción.");
    }
  }
  if(Array.isArray(a.o)&&a.o.some(x=>!textoPlano(x)))errores.push("Hay una opción vacía.");
  if(a.meta?.criterio&&!textoPlano(a.meta.criterio))errores.push("El criterio de solución está vacío.");
  return errores.length?{ok:false,errores}:{ok:true,actividad:a};
}
function validarLote(respuesta,e){
  let actividades=respuesta?.actividades;
  if(typeof respuesta==="string"){
    try{actividades=JSON.parse(respuesta).actividades;}catch(err){return error("La respuesta del modelo no es JSON válido.");}
  }
  if(!Array.isArray(actividades))return error("La respuesta no contiene un array actividades.");
  const validas=[],rechazadas=[];
  for(const a of actividades){const r=validarActividad(a,e);(r.ok?validas:rechazadas).push(r.ok?r.actividad:{actividad:a,errores:r.errores});}
  return {ok:rechazadas.length===0,validas,rechazadas,total:actividades.length};
}
function seleccionarMejores(lote,existentes=[]){
  const usadas=new Set(existentes.map(a=>textoPlano(a.q).toLowerCase())),salida=[],vistos=new Set();
  for(const a of lote.validas||[]){
    const clave=textoPlano(a.q).toLowerCase();
    if(usadas.has(clave)||vistos.has(clave))continue;
    vistos.add(clave);salida.push(a);
  }
  return salida;
}
globalThis.DocereSintaxisGenerador={crearEspecificacion,construirPrompt,validarActividad,validarLote,seleccionarMejores,version:"1.0.0"};
})();
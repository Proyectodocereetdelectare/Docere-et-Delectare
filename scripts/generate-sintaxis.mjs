import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root=process.cwd();
function load(file){vm.runInThisContext(fs.readFileSync(path.join(root,file),"utf8"),{filename:file});}
load("assets/js/data/sintaxis/taxonomia.js");
load("assets/js/data/sintaxis/contrato-generacion.js");
load("assets/js/data/sintaxis/generador.js");

const provider=process.env.AI_PROVIDER||"openai-compatible";
const apiKey=process.env.AI_API_KEY;
const apiUrl=process.env.AI_API_URL||"https://api.openai.com/v1/chat/completions";
const model=process.env.AI_MODEL||"gpt-5-mini";
if(provider!=="openai-compatible")throw new Error("AI_PROVIDER debe ser openai-compatible.");
if(!apiKey)throw new Error("Falta AI_API_KEY.");

const options={
  bloque:process.env.AI_BLOCK||"simple",
  familia:process.env.AI_FAMILY||"CR",
  nivel:Number(process.env.AI_LEVEL||3),
  formato:process.env.AI_FORMAT||"mcq",
  cantidad:Number(process.env.AI_QUANTITY||5),
  restricciones:["No revelar la respuesta en el enunciado.","Exactamente una opción válida en cada MCQ.","Distractores plausibles pero falsos en el contexto.","Explicación basada en una prueba sintáctica."],
  contexto:"ESO/Bachillerato · Docere et Delectare"
};
const spec=globalThis.DocereSintaxisGenerador.crearEspecificacion(options);
if(!spec.ok)throw new Error(spec.errores.join(" | "));
const prompt=globalThis.DocereSintaxisGenerador.construirPrompt(spec.especificacion);

async function pedir(instruccion){
  const body={
      model,
      messages:[
        {role:"system",content:"Eres el proveedor de generación de actividades de Docere et Delectare. Cumple estrictamente el contrato recibido."},
        {role:"user",content:instruccion}
      ],
      temperature:0.7,
      response_format:{type:"json_object"}
    };
  let response=await fetch(apiUrl,{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+apiKey},
    body:JSON.stringify(body)
  });
  if(!response.ok && response.status===400){
    delete body.response_format;
    response=await fetch(apiUrl,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+apiKey},body:JSON.stringify(body)});
  }
  if(!response.ok)throw new Error("Proveedor IA HTTP "+response.status+": "+await response.text());
  const data=await response.json();
  const content=data?.choices?.[0]?.message?.content;
  if(!content)throw new Error("El proveedor no devolvió contenido JSON.");
  return content;
}

let raw=await pedir(prompt);
let lote=globalThis.DocereSintaxisGenerador.validarLote(raw,spec.especificacion);

if(!lote.ok){
  const errores=lote.rechazadas.flatMap(x=>x.errores||[]).slice(0,20);
  const reparacion=prompt+"\n\nINTENTO ANTERIOR RECHAZADO. Corrige estos problemas y devuelve un lote completo nuevo:\n- "+errores.join("\n- ");
  raw=await pedir(reparacion);
  lote=globalThis.DocereSintaxisGenerador.validarLote(raw,spec.especificacion);
}

if(!lote.ok)throw new Error("El lote IA no superó la validación: "+JSON.stringify(lote.rechazadas,null,2));
const actividades=globalThis.DocereSintaxisGenerador.seleccionarMejores(lote,[]);
const salida={
  version:1,
  generadoEn:new Date().toISOString(),
  proveedor:provider,
  modelo:model,
  especificacion:spec.especificacion,
  actividades
};
fs.mkdirSync(path.join(root,"generated"),{recursive:true});
const stamp=new Date().toISOString().replace(/[:.]/g,"-");
const out=path.join(root,"generated","sintaxis-ia-"+stamp+".json");
fs.writeFileSync(out,JSON.stringify(salida,null,2)+"\n");
console.log("Generación IA validada:",out);
console.log("Actividades válidas:",actividades.length);

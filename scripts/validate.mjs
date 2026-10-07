import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const pages=[
  "index.html","morfologia.html","estructura-palabra.html",
  "formacion-palabras.html","categorias-gramaticales.html",
  "verbo.html","sintaxis.html"
];
const dynamicIds=new Set(["respuesta","campo0","campo1","campo2","campo3","campo4","campo5","campo6"]);

const errors=[];
const externalScripts=new Set();
const exportedGlobals=new Set();
const forbiddenRuntimePatterns=[/DOCERE_STORAGE/,/localStorage/,/progreso\.html/,/ranking-local|actualizarRankingLocal/,/perfilModal|guardarPerfil|obtenerAlias|obtenerPlayerId/];

function addError(message){errors.push(message);}

function normalizarAuditoria(texto){
  return String(texto ?? "")
    .replace(/<[^>]*>/g,"")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[¡!¿?.,;:()"'“”+\-_|/]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function htmlEquilibrado(texto){
  for(const tag of ["b","i","strong","em"]){
    const abiertos=(String(texto ?? "").match(new RegExp("<"+tag+"\\b","gi"))||[]).length;
    const cerrados=(String(texto ?? "").match(new RegExp("</"+tag+">","gi"))||[]).length;
    if(abiertos!==cerrados)return false;
  }
  return true;
}

function read(pathname){
  return fs.readFileSync(path.join(root,pathname),"utf8");
}

for(const file of pages){
  const full=path.join(root,file);
  if(!fs.existsSync(full)){addError(file+": archivo inexistente");continue;}

  const html=read(file);

  for(const src of [...html.matchAll(/<script\s+src=["']([^"']+)["']/gi)].map(m=>m[1])){
    const target=path.join(root,src);
    if(!fs.existsSync(target))addError(file+": script inexistente "+src);
    else externalScripts.add(target);
  }

  for(const href of [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)].map(m=>m[1])){
    if(!/^(https?:|data:|javascript:)/i.test(href)){
      const target=path.join(root,href);
      if(!fs.existsSync(target))addError(file+": recurso CSS inexistente "+href);
    }
  }

  for(const href of [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m=>m[1])){
    if(href==="#")addError(file+': enlace href="#" sin destino');
    if(!/^(https?:|mailto:|javascript:|#)/i.test(href)){
      const target=path.join(root,href.split("#")[0].split("?")[0]);
      if(!fs.existsSync(target))addError(file+": destino inexistente "+href);
    }
  }

  if(/4\.?º\s*ESO/i.test(html))addError(file+": referencia a 4.º ESO");
  if(/según (la )?(presentación|material)|en el material|en la presentación/i.test(html)){
    addError(file+": referencia indebida a presentación/material");
  }

  const ids=new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m=>m[1]));
  const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join("\n");

  if(inline.trim()){
    try{new Function(inline);}
    catch(error){addError(file+": JavaScript inline inválido: "+error.message);}
  }

  for(const match of inline.matchAll(/getElementById\(["']([^"']+)["']\)/g)){
    if(!ids.has(match[1])&&!dynamicIds.has(match[1]))addError(file+": JavaScript referencia un id inexistente: "+match[1]);
  }

  const funcs=[...inline.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]);
  const duplicates=[...new Set(funcs.filter((x,i)=>funcs.indexOf(x)!==i))];
  if(duplicates.length)addError(file+": funciones inline duplicadas: "+duplicates.join(", "));

  const handlers=[...html.matchAll(/\bon(?:click|change|input|submit|keydown|keyup)\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]);
  const localFunctions=new Set(funcs);
  const jsKeywords=new Set(["if","for","while","switch","catch","function","setTimeout","setInterval","clearTimeout","clearInterval","alert","confirm","prompt"]);
  for(const handler of handlers){
    for(const match of handler.matchAll(/(?:^|[^.\w$])([A-Za-z_$][\w$]*)\s*\(/g)){
      const name=match[1];
      if(!jsKeywords.has(name)&&!localFunctions.has(name)&&!exportedGlobals.has(name)){
        // External globals are collected below; keep this check for the second pass.
      }
    }
  }
}

const coreSource=read("assets/js/core.js");
for(const name of ["normalizar","mezclar","irInicio"]){
  if(!coreSource.includes("globalThis."+name+"="))addError("assets/js/core.js: falta la exportación global "+name);
}
for(const file of externalScripts){
  try{
    const source=fs.readFileSync(file,"utf8");
    new Function(source);
    for(const m of source.matchAll(/(?:globalThis|window)\.([A-Za-z_$][\w$]*)\s*=/g))exportedGlobals.add(m[1]);
  }catch(error){
    addError("JS externo inválido "+path.relative(root,file)+": "+error.message);
  }
}

for(const file of pages){
  const html=read(file);
  const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join("\n");
  const funcs=new Set([...inline.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
  const handlers=[...html.matchAll(/\bon(?:click|change|input|submit|keydown|keyup)\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]);
  const ignored=new Set(["if","for","while","switch","catch","function","setTimeout","setInterval","clearTimeout","clearInterval","alert","confirm","prompt"]);
  for(const handler of handlers){
    for(const match of handler.matchAll(/(?:^|[^.\w$])([A-Za-z_$][\w$]*)\s*\(/g)){
      const name=match[1];
      if(!ignored.has(name)&&!funcs.has(name)&&!exportedGlobals.has(name)){
        addError(file+": handler referencia función inexistente: "+name);
      }
    }
  }
}

const contracts=[
  ["assets/js/data/morfologia/estructura-palabra.js",["identifica","clasifica","analiza","reto"]],
  ["assets/js/data/morfologia/formacion-palabras.js",["A"]],
  ["assets/js/data/morfologia/categorias-gramaticales.js",["A"]],
  ["assets/js/data/morfologia/verbo.js",["A"]],
  ["assets/js/data/sintaxis/sintaxis.js",["BANCO"]]
];

for(const [file,names] of contracts){
  try{
    const source=read(file);
    const values=new Function(source+"\nreturn {"+names.join(",")+"};")();
    const arrays=names.flatMap(name=>Array.isArray(values[name])?[values[name]]:name==="BANCO"?Object.values(values[name]):[]);
    const activities=arrays.flat();
    const ids=activities.map(a=>a?.id);
    if(activities.some(a=>!a||!a.id))addError(file+": actividad sin identificador estable");
    if(new Set(ids).size!==ids.length)addError(file+": identificadores de actividad duplicados");

    const seenQuestions=new Map();
    for(const a of activities){
      const level=a.nivel??a.n;
      const type=a.tipo??a.t;
      const normalizedQuestion=normalizarAuditoria(a.q??a.pregunta);
      if(file.endsWith("assets/js/data/sintaxis/sintaxis.js") && normalizedQuestion){
        const previous=seenQuestions.get(normalizedQuestion);
        if(previous)addError(file+": enunciado duplicado entre "+previous+" y "+a.id);
        else seenQuestions.set(normalizedQuestion,a.id);
      }
      if(!htmlEquilibrado((a.q??"")+" "+(a.e??a.explicacion??""))){
        addError(file+": HTML descompensado en "+a.id);
      }
      if(!(a.e??a.explicacion))addError(file+": actividad sin explicación en "+a.id);
      const allowsNoLevel=file.endsWith("estructura-palabra.js") && (a.tipo==="analisis" || a.tipo==="texto" || a.tipo==="mcq") && /^EP-(S|R)-/.test(a.id||"");
      if(!allowsNoLevel && (!Number.isInteger(level)||level<1||level>6))addError(file+": nivel inválido en "+(a.id||"actividad"));
      if(!a.q&&!a.pregunta)addError(file+": actividad sin enunciado en "+(a.id||"actividad"));
      if(type==="mcq"){
        const options=a.opciones??a.o;
        const answer=a.correcta??a.r;
        if(!Array.isArray(options)||options.length<2) addError(file+": MCQ sin opciones válidas en "+a.id);
        else if(typeof answer==="number" ? (answer<0||answer>=options.length) : !options.includes(answer)){
          addError(file+": respuesta MCQ inválida en "+a.id);
        }
      }
      if(type==="text"||type==="seg"||type==="texto"||type==="segmentacion"){
        const answers=a.soluciones??a.r;
        if(!answers || (Array.isArray(answers)&&answers.length===0))addError(file+": actividad abierta sin soluciones en "+a.id);
      }
      if(type==="analysis"){
        const fields=a.f;
        const answers=a.r;
        if(!Array.isArray(fields)||!Array.isArray(answers)||fields.length!==answers.length){
          addError(file+": análisis con campos/respuestas desalineados en "+a.id);
        }
      }
      if(type==="analisis"){
        const fields=a.campos;
        const answers=a.soluciones;
        if(!Array.isArray(fields)||!answers||typeof answers!=="object"){
          addError(file+": análisis sin campos/soluciones en "+a.id);
        }else{
          const keys=fields.map(x=>Array.isArray(x)?x[0]:x);
          if(keys.some(k=>!Object.prototype.hasOwnProperty.call(answers,k))){
            addError(file+": análisis con campos sin solución en "+a.id);
          }
        }
      }
    }
    if(file.endsWith("assets/js/data/sintaxis/sintaxis.js")){
      const banco=values.BANCO;
      const objetivos={1:3,2:3,3:3,4:3,5:4,6:4};
      for(const [section,arr] of Object.entries(banco)){
        if(arr.length<20)addError(file+": sección "+section+" tiene menos de 20 actividades");
        for(const [level,target] of Object.entries(objetivos)){
          const count=arr.filter(a=>(a.nivel??a.n)===Number(level)).length;
          if(count<target)addError(file+": sección "+section+" no alcanza "+target+" actividades de nivel "+level);
        }
      }
    }
  }catch(error){
    addError(file+": banco inválido: "+error.message);
  }
}

// Pruebas de comportamiento estáticas: protegen las reglas críticas del motor sin exigir navegador.
const behaviorContracts=[
  ["assets/js/pages/sintaxis.js",["omitidas++","Respuesta correcta:","function adelante("]],
  ["assets/js/pages/estructura-palabra.js",["omitidas++","Sin responder:"]],
  ["assets/js/pages/formacion-palabras.js",["omitidas++","Respuesta correcta:","Sin responder:"]],
  ["assets/js/pages/categorias-gramaticales.js",["omitidas++","Respuesta correcta:","Sin responder:"]],
  ["assets/js/pages/verbo.js",["omitidas++","Respuesta correcta:","Sin responder:"]]
];
for(const [file,patterns] of behaviorContracts){
  const source=read(file);
  for(const pattern of patterns){
    if(!source.includes(pattern))addError(file+": falta contrato de comportamiento "+pattern);
  }
}
if(/\balias\(\)|\babrirPerfil\b/.test(read("formacion-palabras.html")))addError("formacion-palabras.html: residuo de perfil/alias");

if(errors.length){
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Docere et Delectare: auditoría estructural OK.");

/* Docere et Delectare · lógica de página */
let partida=[],i=0,puntos=0,respondida=false,seccionActual='';

const DESCRIPCIONES={
  sustantivos:'Clasifica los sustantivos según sus principales tipos: comunes y propios, concretos y abstractos, individuales y colectivos, contables y no contables.',
  identifica:'Reconoce la categoría gramatical de palabras y expresiones. Empieza por los casos más directos y avanza hacia ejemplos con contexto.',
  analiza:'Analiza palabras indicando su categoría y, cuando corresponda, sus rasgos o subcategoría.',
  transforma:'Modifica las oraciones para comprobar cómo cambia el comportamiento gramatical de una palabra.',
  error:'Detecta análisis incorrectos, corrígelos y explica qué debería decirse.',
  reto:'Resuelve actividades integradas de mayor dificultad que combinan identificación, análisis y razonamiento.'
};


function ok(v,r){return (Array.isArray(r)?r.flat(Infinity):[r]).some(x=>normalizar(v)===normalizar(x))}






function elegirSeccion(s){
  if(!['sustantivos','identifica','analiza','transforma','error','reto'].includes(s))return;
  seccionActual=s;
  iniciar();
}
window.elegirSeccion=elegirSeccion;
function iniciar(){if(!seccionActual)return;crear();i=0;puntos=0;omitidas=0;document.getElementById('inicio').style.display='none';document.getElementById('resultado').style.display='none';document.getElementById('actividad').style.display='block';mostrar();}
function crear(){omitidas=0;const seleccion=[];const usadosPartida=new Set();const objetivos={1:3,2:3,3:3,4:3,5:4,6:4};for(let nivel=1;nivel<=6;nivel++){const disponibles=mezclar(A.map((a,j)=>({a,j})).filter(x=>x.a.s===seccionActual&&x.a.n===nivel&&!usadosPartida.has(x.j)));disponibles.slice(0,objetivos[nivel]).forEach(x=>{seleccion.push(x.j);usadosPartida.add(x.j)});}partida=seleccion.map(x=>A[x]);}
function mostrar(){
  respondida=false;
  let a=partida[i];
  const total=partida.length;
  document.getElementById('numero').textContent='Actividad '+(i+1)+' de '+total;
  document.getElementById('porcentaje').textContent=Math.round((i+1)/total*100)+'%';
  document.getElementById('barra').style.width=Math.round((i+1)/total*100)+'%';
  document.getElementById('feedback').innerHTML='';
  document.getElementById('siguiente').style.display='none';
  let nombres={sustantivos:'Tipos de sustantivos',identifica:'Identifica',analiza:'Analiza',transforma:'Transforma',error:'Detecta el error',reto:'Reto final'};
  let h='<div class="etiqueta">'+nombres[seccionActual]+' · Nivel '+a.n+'</div><div id="pregunta">'+a.q+'</div>';
  if(a.t==='mcq')h+='<div class="opciones">'+mezclar(a.o).map(x=>'<button type="button" class="opcion" data-respuesta="'+x.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'" onclick="window.mcq(this, this.dataset.respuesta)">'+x+'</button>').join('')+'</div>';
  if(a.t==='text')h+='<input id="respuesta" class="campo" placeholder="Escribe tu respuesta"><button type="button" class="boton boton-principal" data-accion="texto">Comprobar</button>';
  if(a.t==='analysis'){a.f.forEach((x,j)=>h+='<label class="etiqueta-campo">'+x+'</label><input class="campo analisis" data-i="'+j+'" placeholder="Categoría y subcategoría">');h+='<button type="button" class="boton boton-principal" data-accion="analisis">Comprobar</button>'}
  document.getElementById('contenido').innerHTML=h;
  
const accionTexto=document.querySelector('#contenido [data-accion="texto"]');if(accionTexto)accionTexto.addEventListener('click',texto);
const accionAnalisis=document.querySelector('#contenido [data-accion="analisis"]');if(accionAnalisis)accionAnalisis.addEventListener('click',analisis);
}
function solucionVisible(a){if(a.t==='mcq')return String(a.r);if(a.t==='text')return Array.isArray(a.r)?a.r.join(' / '):String(a.r);if(a.t==='analysis')return a.f.map((campo,j)=>campo+': '+(Array.isArray(a.r[j])?a.r[j].join(' / '):a.r[j])).join('<br>');return String(a.r||'')}function feedback(b,e){let f=document.getElementById('feedback');f.className='feedback '+(b?'exito':'error');let a=partida[i];f.innerHTML=(b?'<strong>✓ Correcto.</strong> ':'<strong>✗ No es correcto.</strong><br><strong>Respuesta correcta:</strong> '+solucionVisible(a)+'<br>')+e;document.getElementById('siguiente').style.display='inline-block'}
function mcq(btn,v){if(respondida)return;respondida=true;let a=partida[i],b=normalizar(v)===normalizar(a.r);document.querySelectorAll('.opcion').forEach(x=>{x.disabled=true;if(normalizar(x.textContent)===normalizar(a.r))x.classList.add('correcta')});if(!b)btn.classList.add('incorrecta');else puntos++;feedback(b,a.e);document.getElementById('porcentaje').textContent=Math.round((i+1)/partida.length*100)+'%'}
function texto(){if(respondida)return;let v=document.getElementById('respuesta').value;if(!v.trim())return;respondida=true;let a=partida[i],b=ok(v,a.r);if(b)puntos++;document.getElementById('respuesta').disabled=true;feedback(b,a.e)}
function analisis(){if(respondida)return;let a=partida[i],cs=[...document.querySelectorAll('.analisis')];if(cs.some(x=>!x.value.trim()))return;respondida=true;let b=true;cs.forEach((x,j)=>{let z=ok(x.value,a.r[j]);if(!z){b=false;x.classList.add('incorrecta')}else x.classList.add('correcta');x.disabled=true});if(b)puntos++;feedback(b,a.e)}
function adelante(){if(!respondida)omitidas++;if(i<partida.length-1){i++;mostrar()}else resultado()}
function siguiente(){if(i<partida.length-1){i++;mostrar()}else resultado()}
function resultado(){document.getElementById('actividad').style.display='none';document.getElementById('resultado').style.display='block';let total=partida.length,nota=Number((puntos/total*10).toFixed(1));document.getElementById('nota').textContent=nota+'/10';document.getElementById('detalle').innerHTML='Has acertado '+puntos+' de '+total+' actividades.<br><strong>Correctas:</strong> '+puntos+' · <strong>Incorrectas:</strong> '+(total-puntos-omitidas)+' · <strong>Sin responder:</strong> '+omitidas+'<br>Las actividades sin responder no suman puntos.'}
function repetir(){crear();i=0;puntos=0;document.getElementById('resultado').style.display='none';document.getElementById('actividad').style.display='block';mostrar()}
function volverMenu(){document.getElementById('actividad').style.display='none';document.getElementById('resultado').style.display='none';document.getElementById('inicio').style.display='block';document.querySelectorAll('.seccion-btn').forEach(b=>b.classList.remove('activa'));seccionActual=''}/* Navegación de secciones: se gestiona desde JavaScript para evitar problemas
   con handlers inline y garantizar que todos los bloques funcionen igual. */
document.querySelectorAll('.bloque[data-seccion]').forEach(function(boton){
  boton.addEventListener('click',function(){
    elegirSeccion(this.dataset.seccion);
  });
});window.ok=ok;window.elegirSeccion=elegirSeccion;window.iniciar=iniciar;window.crear=crear;window.mostrar=mostrar;window.feedback=feedback;window.mcq=mcq;window.texto=texto;window.analisis=analisis;window.siguiente=siguiente;window.resultado=resultado;window.repetir=repetir;window.volverMenu=volverMenu;

window.adelante=adelante;

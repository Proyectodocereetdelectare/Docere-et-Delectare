/* Docere et Delectare · lógica de página */
const secciones={identifica:'Identifica',analiza:'Analiza',conjuga:'Conjuga',transforma:'Transforma',perifrasis:'Perífrasis y locuciones',error:'Detecta el error',reto:'Reto final'};
let seccionActual='',partida=[],i=0,puntos=0,omitidas=0,respondida=false;




function ok(v,r){return (Array.isArray(r)?r.flat(Infinity):[r]).some(x=>normalizar(v)===normalizar(x))}






function iniciarSeccion(s){seccionActual=s;iniciarPartida()}
function iniciarPartida(){crearPartida();i=0;puntos=0;omitidas=0;document.getElementById('menu').style.display='none';document.getElementById('resultado').style.display='none';document.getElementById('actividad').style.display='block';mostrar()}
function crearPartida(){const niveles=[1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,5,6,6,6,6],usadosPartida=new Set(),seleccion=[];niveles.forEach(nivel=>{const disponibles=mezclar(A.map((a,j)=>({a,j})).filter(x=>x.a.s===seccionActual&&x.a.n===nivel&&!usadosPartida.has(x.j)));const elegido=disponibles[0];if(elegido){seleccion.push(elegido.j);usadosPartida.add(elegido.j);}});partida=seleccion.map(x=>A[x]);}
function mostrar(){respondida=false;let a=partida[i],pct=Math.round((i+1)/partida.length*100);document.getElementById('numero').textContent='Actividad '+(i+1)+' de '+partida.length;document.getElementById('porcentaje').textContent=pct+'%';document.getElementById('barraProgreso').style.width=pct+'%';document.getElementById('etiqueta').textContent=secciones[seccionActual]+' · Nivel '+a.n;document.getElementById('feedback').innerHTML='';document.getElementById('siguiente').style.display='none';document.getElementById('pregunta').innerHTML=a.q;let h='';if(a.t==='mcq')h='<div class="opciones">'+mezclar(a.o).map(x=>'<button type="button" class="opcion" data-respuesta="'+x.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'" onclick="window.mcq(this, this.dataset.respuesta)">'+x+'</button>').join('')+'</div>';if(a.t==='text')h='<label class="etiqueta-campo" for="respuesta">Escribe tu respuesta</label><input id="respuesta" class="campo" placeholder="Escribe tu respuesta"><button type="button" class="boton boton-principal" data-accion="texto">Comprobar</button>';
if(a.t==='analysis'){a.f.forEach((x,j)=>h+='<label class="etiqueta-campo" for="analisis'+j+'">'+x+'</label><input id="analisis'+j+'" class="campo analisis" placeholder="Escribe tu respuesta">');h+='<button type="button" class="boton boton-principal" data-accion="analisis">Comprobar</button>';}
document.getElementById('contenido').innerHTML=h;
if(a.t==='text'){const b=document.querySelector('#contenido .boton-principal');if(b)b.addEventListener('click',texto)};
if(a.t==='analysis'){const b=document.querySelector('#contenido .boton-principal');if(b)b.addEventListener('click',analisis)};}
function analisis(){
 if(respondida)return;
 const a=partida[i];
 const vals=[...document.querySelectorAll('.analisis')].map(x=>x.value.trim());
 if(vals.some(v=>!v)){feedback(false,'Completa todos los campos antes de comprobar.');return}
 const correcto=Array.isArray(a.r)&&a.r.every((sol,j)=>ok(vals[j],sol));
 respondida=true;
 if(correcto)puntos++;
 feedback(correcto,a.e);
}

function solucionVisible(a){if(a.t==='mcq')return String(a.r);if(a.t==='text')return Array.isArray(a.r)?a.r.join(' / '):String(a.r);if(a.t==='analysis')return a.f.map((campo,j)=>campo+': '+(Array.isArray(a.r[j])?a.r[j].join(' / '):a.r[j])).join('<br>');return String(a.r||'')}function feedback(b,e){let f=document.getElementById('feedback');f.className='feedback '+(b?'exito':'error');let a=partida[i];f.innerHTML=(b?'<strong>✓ Correcto.</strong> ':'<strong>✗ No es correcto.</strong><br><strong>Respuesta correcta:</strong> '+solucionVisible(a)+'<br>')+e;document.getElementById('siguiente').style.display='inline-block'}
function mcq(btn,v){if(respondida)return;respondida=true;let a=partida[i],b=normalizar(v)===normalizar(a.r);document.querySelectorAll('.opcion').forEach(x=>{x.disabled=true;if(normalizar(x.textContent)===normalizar(a.r))x.classList.add('correcta')});if(!b)btn.classList.add('incorrecta');else puntos++;feedback(b,a.e)}
function texto(){if(respondida)return;let v=document.getElementById('respuesta').value;if(!v.trim())return;respondida=true;let a=partida[i],b=ok(v,a.r);if(b)puntos++;document.getElementById('respuesta').disabled=true;feedback(b,a.e)}
function adelante(){if(!respondida)omitidas++;if(i<partida.length-1){i++;mostrar()}else resultado()}
function siguiente(){if(i<partida.length-1){i++;mostrar()}else resultado()}
function resultado(){document.getElementById('actividad').style.display='none';document.getElementById('resultado').style.display='block';let nota=Number((puntos/partida.length*10).toFixed(1));document.getElementById('nota').textContent=nota+'/10';document.getElementById('detalle').innerHTML='Has acertado '+puntos+' de '+partida.length+' actividades.<br><strong>Correctas:</strong> '+puntos+' · <strong>Incorrectas:</strong> '+(partida.length-puntos-omitidas)+' · <strong>Sin responder:</strong> '+omitidas+'<br>Las actividades sin responder no suman puntos.'}
function repetir(){iniciarPartida()}
function volverMenu(){document.getElementById('actividad').style.display='none';document.getElementById('resultado').style.display='none';document.getElementById('menu').style.display='block';seccionActual=''}window.ok=ok;window.iniciarSeccion=iniciarSeccion;
window.iniciarPartida=iniciarPartida;
window.crearPartida=crearPartida;
window.mostrar=mostrar;
window.feedback=feedback;
window.mcq=mcq;
window.texto=texto;
window.siguiente=siguiente;
window.resultado=resultado;
window.repetir=repetir;
window.volverMenu=volverMenu;
window.irInicio=irInicio;

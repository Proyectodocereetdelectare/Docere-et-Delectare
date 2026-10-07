/* Docere et Delectare · lógica de página */
let partida=[],i=0,puntos=0,respondida=false;
const dist={1:4,2:4,3:4,4:3,5:3,6:2};
// La partida avanza por niveles: no se mezclan entre sí para que la dificultad sea visible y progresiva.

function ok(v,r){r=Array.isArray(r)?r:[r];return r.some(x=>normalizar(v)===normalizar(x))}






function iniciarBloque(){crear();i=0;puntos=0;omitidas=0;document.getElementById('inicio').style.display='none';document.getElementById('resultado').style.display='none';document.getElementById('actividad').style.display='block';mostrar();}
function solucionVisible(a){if(a.t==='mcq')return String(a.r);if(a.t==='text')return Array.isArray(a.r)?a.r.join(' / '):String(a.r);if(a.t==='analysis')return a.f.map((campo,j)=>campo+': '+(Array.isArray(a.r[j])?a.r[j].join(' / '):a.r[j])).join('<br>');return String(a.r||'')}function feedback(b,e){let f=document.getElementById('feedback');f.className='feedback '+(b?'exito':'error');let a=partida[i];f.innerHTML=(b?'<strong>✓ Correcto.</strong> ':'<strong>✗ No es correcto.</strong><br><strong>Respuesta correcta:</strong> '+solucionVisible(a)+'<br>')+e;document.getElementById('siguiente').style.display='inline-block'}
function mcq(btn,v){if(respondida)return;respondida=true;let a=partida[i],b=ok(v,a.r);document.querySelectorAll('.opcion').forEach(x=>{x.disabled=true;if(normalizar(x.textContent)===normalizar(a.r))x.classList.add('correcta')});if(!b)btn.classList.add('incorrecta');else puntos++;feedback(b,a.e);document.getElementById('aciertos').textContent=puntos+' aciertos'}
function texto(){if(respondida)return;let v=document.getElementById('respuesta').value;if(!v.trim())return;respondida=true;let a=partida[i],b=ok(v,a.r);if(b)puntos++;document.getElementById('respuesta').disabled=true;feedback(b,a.e);document.getElementById('aciertos').textContent=puntos+' aciertos'}
function analisis(){if(respondida)return;let a=partida[i],cs=[...document.querySelectorAll('.analisis')];if(cs.some(x=>!x.value.trim()))return;respondida=true;let b=true;cs.forEach((x,j)=>{let z=ok(x.value,a.r[j]);if(!z){b=false;x.classList.add('incorrecta')}else x.classList.add('correcta');x.disabled=true});if(b)puntos++;feedback(b,a.e);document.getElementById('aciertos').textContent=puntos+' aciertos'}
function adelante(){
  if(!respondida)omitidas++;
  if(i<partida.length-1){i++;mostrar()}else{resultado()}
}
function siguiente(){if(i<partida.length-1){i++;mostrar()}else{resultado()}}
function resultado(){document.getElementById('actividad').style.display='none';document.getElementById('resultado').style.display='block';let nota=Number((puntos/partida.length*10).toFixed(1));document.getElementById('nota').textContent=nota+'/10';document.getElementById('detalle').innerHTML='Has acertado '+puntos+' de '+partida.length+' actividades.<br><strong>Correctas:</strong> '+puntos+' · <strong>Incorrectas:</strong> '+(partida.length-puntos-omitidas)+' · <strong>Sin responder:</strong> '+omitidas+'<br>Las actividades sin responder no suman puntos.}
function repetir(){crear();i=0;puntos=0;document.getElementById('resultado').style.display='none';document.getElementById('actividad').style.display='block';mostrar()}window.ok=ok;window.iniciarBloque=iniciarBloque;window.crear=crear;window.mostrar=mostrar;window.feedback=feedback;window.mcq=mcq;window.texto=texto;window.analisis=analisis;window.siguiente=siguiente;window.resultado=resultado;window.repetir=repetir;

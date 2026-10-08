/* Docere et Delectare · lógica de página */
let seccionActual='', partida=[], indice=0, aciertos=0, omitidas=0, respondida=false, preguntaActual=null;


function acepta(v, respuestas){
 const x=normalizar(v);
 return (Array.isArray(respuestas)?respuestas:[respuestas]).some(r=>normalizar(r)===x);
}
function escapar(s){
 return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function seleccionar(){
 const arr=[...BANCO[seccionActual]];
 const salida=[];
 const tiposInter=['select','build','transform','chain'];
 const objetivos={1:3,2:3,3:3,4:3,5:4,6:4};
 const sacar=lista=>lista.length?lista.splice(Math.floor(Math.random()*lista.length),1)[0]:null;

 for(let n=1;n<=6;n++){
   const nivel=arr.filter(a=>a.n===n);
   const objetivo=Math.min(objetivos[n],nivel.length);
   const inter=nivel.filter(a=>tiposInter.includes(a.t));
   const elegidas=[];
   const primeraInter=sacar(inter);
   if(primeraInter)elegidas.push(primeraInter);

   while(elegidas.length<objetivo){
     const disponibles=nivel.filter(a=>!elegidas.includes(a));
     const siguiente=sacar(disponibles);
     if(!siguiente)break;
     elegidas.push(siguiente);
   }
   salida.push(...elegidas);
 }
 return mezclar(salida);
}
function iniciarSeccion(s){
 seccionActual=s;partida=seleccionar(); indice=0; aciertos=0; omitidas=0;
 document.getElementById('menu').style.display='none';
 document.getElementById('resultado').style.display='none';
 document.getElementById('actividad').style.display='block'; render();
}
function render(){
 preguntaActual=partida[indice]; respondida=false; construccion=[];
 document.getElementById('numero').textContent='Actividad '+(indice+1)+' de '+partida.length;
 document.getElementById('aciertos').textContent=aciertos+' aciertos';
 document.getElementById('barra').style.width=((indice+1)/partida.length*100)+'%';
 const nombres={unidades:'🔎 Unidades sintácticas',simple:'🏗️ Oración simple',compuesta:'🔗 Oración compuesta',error:'🧠 Detecta el error',reto:'🏆 Reto sintáctico'};
 document.getElementById('etiqueta').textContent=nombres[seccionActual];
 document.getElementById('nivel').textContent='Nivel '+preguntaActual.n;
 document.getElementById('pregunta').innerHTML=preguntaActual.q;
 document.getElementById('feedback').innerHTML='';
 document.getElementById('feedback').className='feedback';
 document.getElementById('comprobar').style.display='inline-block';
 document.getElementById('siguiente').style.display='none';
 const c=document.getElementById('contenido');
 if(preguntaActual.t==='mcq') renderMcq(c);
 else if(preguntaActual.t==='text') renderText(c);
 else if(preguntaActual.t==='select') renderSelect(c);

 else if(preguntaActual.t==='build') renderBuild(c);
 else if(preguntaActual.t==='transform') renderTransform(c);
 else if(preguntaActual.t==='chain') renderChain(c);
 else renderAnalysis(c);
}
function renderMcq(c){
 const opciones=mezclar(preguntaActual.o.map((x,i)=>({x,i})));
 c.innerHTML='<div class="opciones">'+opciones.map((op,j)=>'<button type="button" class="opcion" data-i="'+op.i+'" data-orden="'+j+'" onclick="elegir('+op.i+')">'+op.x+'</button>').join('')+'</div>';
}
function renderText(c){
 c.innerHTML='<label class="etiqueta-campo" for="respuesta">Escribe tu respuesta</label><input id="respuesta" class="campo" aria-label="Respuesta" autocomplete="off" onkeydown="if(event.key===\'Enter\')comprobar()" placeholder="Escribe aquí...">';
 setTimeout(()=>document.getElementById('respuesta')?.focus(),50);
}
function renderAnalysis(c){
 c.innerHTML=preguntaActual.f.map((f,i)=>'<label class="etiqueta-campo" for="campo'+i+'">'+f+'</label><input id="campo'+i+'" class="campo" autocomplete="off" onkeydown="if(event.key===\'Enter\')comprobar()">').join('');
 setTimeout(()=>document.getElementById('campo0')?.focus(),50);
}
function renderSelect(c){
 c.innerHTML='<div class="seleccionables">'+preguntaActual.segmentos.map((x,i)=>'<button type="button" class="seleccionable" data-i="'+i+'" onclick="elegirSeleccionable('+i+')">'+x.t+'</button>').join('')+'</div><div class="ayuda"><strong>Consejo:</strong> no te fijes solo en la forma; piensa qué relación establece el fragmento con el verbo.</div>';
}
function elegirSeleccionable(i){
 if(respondida)return;
 document.querySelectorAll('.seleccionable').forEach((b,j)=>{b.dataset.seleccion=(j===i?'1':'0');b.classList.toggle('seleccionada',j===i);});
}
function renderBuild(c){
 c.innerHTML='<div class="construccion"><div class="piezas">'+preguntaActual.piezas.map((x,i)=>'<button type="button" class="pieza" data-i="'+i+'" onclick="usarPieza('+i+')">'+x+'</button>').join('')+'</div><div id="construida" class="construida">Pulsa las piezas en el orden en que deben aparecer.</div><button class="boton" type="button" onclick="reiniciarConstruccion()">↺ Reiniciar</button></div>';
}
let construccion=[];
function usarPieza(i){if(respondida||construccion.includes(i))return;construccion.push(i);document.getElementById('construida').innerHTML=construccion.map(j=>'<span class="pieza-usada">'+preguntaActual.piezas[j]+'</span>').join('');document.querySelector('.pieza[data-i="'+i+'"]').disabled=true;}
function reiniciarConstruccion(){if(respondida)return;construccion=[];document.querySelectorAll('.pieza').forEach(b=>b.disabled=false);document.getElementById('construida').textContent='Pulsa las piezas en el orden en que deben aparecer.';}
function renderTransform(c){
 c.innerHTML='<label class="etiqueta-campo" for="respuesta">Escribe la transformación</label><input id="respuesta" class="campo" autocomplete="off" onkeydown="if(event.key===\'Enter\')comprobar()" placeholder="Escribe la oración transformada...">';
 setTimeout(()=>document.getElementById('respuesta')?.focus(),50);
}
function renderChain(c){
 c.innerHTML='<div>'+preguntaActual.pasos.map((p,i)=>{
   const opciones=mezclar(p.o.map((x,j)=>({x,j})));
   return '<div class="paso-actividad"><div class="paso-titulo">'+(i+1)+'. '+p.label+'</div><div class="opciones">'+opciones.map(op=>'<button type="button" class="opcion paso-opcion" data-paso="'+i+'" data-i="'+op.j+'" onclick="elegirPaso('+i+','+op.j+')">'+op.x+'</button>').join('')+'</div></div>';
 }).join('')+'</div>';
}
function elegirPaso(paso,i){
 if(respondida)return;
 document.querySelectorAll('.paso-opcion[data-paso="'+paso+'"]').forEach((b,j)=>b.dataset.seleccion=(j===i?'1':'0'));
}
function elegir(i){
 if(respondida)return;
 document.querySelectorAll('.opcion').forEach(b=>b.classList.remove('correcta','incorrecta'));
 document.querySelectorAll('.opcion').forEach((b,j)=>b.dataset.seleccion=(j===i?'1':'0'));
}
function comprobar(){
 if(respondida)return;
 let correcto=false;
 if(preguntaActual.t==='mcq'){
   const sel=document.querySelector('.opcion[data-seleccion="1"]');
   if(!sel){mostrarFeedback('Primero selecciona una opción.','error');return}
   correcto=normalizar(sel.textContent)===normalizar(preguntaActual.r);
   document.querySelectorAll('.opcion').forEach(b=>{
     if(normalizar(b.textContent)===normalizar(preguntaActual.r))b.classList.add('correcta');
     if(b.dataset.seleccion==='1'&&!correcto)b.classList.add('incorrecta');
     b.disabled=true;
   });
 }else if(preguntaActual.t==='text'||preguntaActual.t==='transform'){
   const v=document.getElementById('respuesta')?.value||'';
   if(!v.trim()){mostrarFeedback('Escribe una respuesta antes de comprobar.','error');return}
   correcto=acepta(v,preguntaActual.r);
 }else if(preguntaActual.t==='select'){
   const sel=document.querySelector('.seleccionable[data-seleccion="1"]');
   if(!sel){mostrarFeedback('Primero pulsa sobre un fragmento.','error');return}
   const i=Number(sel.dataset.i);
   correcto=normalizar(preguntaActual.segmentos[i].t)===normalizar(preguntaActual.r);
   document.querySelectorAll('.seleccionable').forEach((b,j)=>{
     if(normalizar(preguntaActual.segmentos[j].t)===normalizar(preguntaActual.r))b.classList.add('correcta');
     if(b.dataset.seleccion==='1'&&!correcto)b.classList.add('incorrecta');
     b.disabled=true;
   });
 }else if(preguntaActual.t==='build'){
   if(construccion.length!==preguntaActual.piezas.length){mostrarFeedback('Coloca todas las piezas antes de comprobar.','error');return}
   correcto=construccion.map(i=>preguntaActual.piezas[i]).join('|')===preguntaActual.r;
 }else if(preguntaActual.t==='chain'){
   const selecciones=preguntaActual.pasos.map((_,i)=>document.querySelector('.paso-opcion[data-paso="'+i+'"][data-seleccion="1"]'));
   if(selecciones.some(x=>!x)){mostrarFeedback('Completa todos los pasos antes de comprobar.','error');return}
   const ok=preguntaActual.pasos.map((p,i)=>{
     const sel=selecciones[i];
     const valido=normalizar(sel.textContent)===normalizar(p.r);
     document.querySelectorAll('.paso-opcion[data-paso="'+i+'"]').forEach(b=>{if(normalizar(b.textContent)===normalizar(p.r))b.classList.add('correcta');if(b.dataset.seleccion==='1'&&!valido)b.classList.add('incorrecta');b.disabled=true;});
     return valido;
   });
   correcto=ok.every(Boolean);
 }else{
   const vals=preguntaActual.f.map((_,i)=>document.getElementById('campo'+i)?.value||'');
   if(vals.some(v=>!v.trim())){mostrarFeedback('Completa todos los campos antes de comprobar.','error');return}
   correcto=preguntaActual.r.every((res,i)=>acepta(vals[i],res));
 }
 respondida=true;
 if(correcto)aciertos++;
 const fb=document.getElementById('feedback');
 fb.className='feedback '+(correcto?'exito':'error');
 fb.innerHTML='<strong>'+(correcto?'✓ ¡Correcto!':'✗ No es correcto.')+'</strong><br>'+(correcto?'': '<strong>Respuesta correcta:</strong> '+solucionVisible(preguntaActual)+'<br>')+preguntaActual.e;
 document.getElementById('comprobar').style.display='none';
 document.getElementById('siguiente').style.display='inline-block';
 document.getElementById('aciertos').textContent=aciertos+' aciertos';
}
function solucionVisible(a){
 if(a.t==='mcq'||a.t==='text'||a.t==='transform')return Array.isArray(a.r)?a.r.join(' / '):String(a.r);
 if(a.t==='select')return String(a.r);
 if(a.t==='analysis')return a.f.map((campo,i)=>campo+': '+(Array.isArray(a.r[i])?a.r[i].join(' / '):a.r[i])).join('<br>');
 if(a.t==='build')return a.piezas.filter((_,i)=>a.r.split('|').includes(a.piezas[i])).join(' ');
 if(a.t==='chain')return a.pasos.map((p,i)=>(i+1)+'. '+p.r).join('<br>');
 return '';
}
function mostrarFeedback(t,c){
 const fb=document.getElementById('feedback');fb.className='feedback '+c;fb.innerHTML=t;
}
function adelante(){
 if(!respondida)omitidas++;
 if(indice>=partida.length-1){terminar();return}
 indice++;
 render();
}
function siguiente(){
 if(!respondida)return;
 indice++;
 if(indice>=partida.length)terminar(); else render();
}
function terminar(){
 const nota=Number((aciertos/partida.length*10).toFixed(1));
 document.getElementById('actividad').style.display='none';
 document.getElementById('resultado').style.display='block';
 document.getElementById('resultadoAciertos').textContent=aciertos+'/'+partida.length;
 document.getElementById('resultadoNota').textContent=nota.toFixed(1).replace('.',',');
 document.getElementById('resultadoPuntos').textContent=aciertos*10;
 document.getElementById('notaFinal').textContent=nota.toFixed(1).replace('.',',')+' / 10';
 document.getElementById('detalleFinal').innerHTML='Correctas: '+aciertos+' · Incorrectas: '+(partida.length-aciertos-omitidas)+' · Sin responder: '+omitidas+'<br><span class="pequeno">Las actividades sin responder no suman puntos.</span><br>'+ (nota>=9?'Excelente análisis sintáctico.':nota>=7?'Buen trabajo: sigue afinando las funciones y las relaciones entre proposiciones.':nota>=5?'Has superado la partida; revisa los errores para consolidar el análisis.':'Conviene repasar las pruebas de identificación y volver a intentarlo.');
}
function repetir(){iniciarSeccion(seccionActual)}
function volverMenu(){
 document.getElementById('actividad').style.display='none';
 document.getElementById('resultado').style.display='none';
 document.getElementById('menu').style.display='block';
}

window.adelante=adelante;

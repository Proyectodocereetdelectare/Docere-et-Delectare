/* Docere et Delectare · núcleo compartido */
(function(){
"use strict";
function normalizar(texto){return String(texto??"").replace(/<[^>]*>/g,"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¡!¿?.,;:()"'“”+\-_|/]/g," ").replace(/\s+/g," ").trim();}
function mezclar(array){const copia=[...array];for(let i=copia.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copia[i],copia[j]]=[copia[j],copia[i]];}return copia;}
function irInicio(){const actividad=document.getElementById("actividad");const visible=actividad&&getComputedStyle(actividad).display!=="none";if(visible&&!confirm("Si vuelves al inicio, perderás la partida actual. ¿Quieres continuar?"))return;window.location.href="index.html";}
globalThis.normalizar=normalizar;globalThis.mezclar=mezclar;globalThis.irInicio=irInicio;
})();
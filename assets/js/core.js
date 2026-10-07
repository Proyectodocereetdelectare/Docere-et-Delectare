/* Docere et Delectare · núcleo compartido
   Responsabilidades: utilidades, identidad anónima, alias y navegación global.
   Las páginas de contenido conservan su lógica didáctica y su motor específico.
*/
(function(){
  "use strict";

  const DOCERE_STORAGE=Object.freeze({
    PLAYER_ID:"docerePlayerId",
    ALIAS:"docereAlias",
    PROGRESO:"docereProgreso",
    RANKING:"docereRanking",
    ESTRUCTURA_IDENTIFICA:"identificaUsadas",
    ESTRUCTURA_CLASIFICA:"clasificaUsadas",
    FORMACION:"formacionUsadas",
    CATEGORIAS:"categoriasUsadas",
    VERBO:"verboUsadas"
  });

  function normalizar(texto){
    return String(texto ?? "")
      .replace(/<[^>]*>/g,"")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[¡!¿?.,;:()"'“”+\-_|/]/g," ")
      .replace(/\s+/g," ")
      .trim();
  }

  function mezclar(array){
    const copia=[...array];
    for(let i=copia.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copia[i],copia[j]]=[copia[j],copia[i]];
    }
    return copia;
  }

  function limpiarAlias(alias){
    return String(alias ?? "").replace(/[<>]/g,"").trim().slice(0,20);
  }

  function leerJSON(clave,porDefecto){
    try{
      const raw=localStorage.getItem(clave);
      return raw===null ? porDefecto : JSON.parse(raw);
    }catch(_){
      return porDefecto;
    }
  }

  function guardarJSON(clave,valor){
    localStorage.setItem(clave,JSON.stringify(valor));
  }

  function actualizarRankingLocal(){
    const id=obtenerPlayerId();
    const alias=obtenerAlias() || "Invitado";
    let progreso=leerJSON(DOCERE_STORAGE.PROGRESO,{mejor:0,puntos:0});
    if(Array.isArray(progreso)){
      progreso={
        mejor:progreso.reduce((m,x)=>Math.max(m,Number(x.nota||0)),0),
        puntos:progreso.reduce((s,x)=>s+Number(x.aciertos||0)*10,0)
      };
    }
    if(!progreso||typeof progreso!=="object")progreso={mejor:0,puntos:0};
    let ranking=leerJSON(DOCERE_STORAGE.RANKING,[]);
    if(!Array.isArray(ranking))ranking=[];
    const registro={
      playerId:id,
      alias,
      mejor:Number(progreso.mejor||0),
      puntos:Number(progreso.puntos||0)
    };
    const indice=ranking.findIndex(x=>x.playerId===id);
    if(indice>=0)ranking[indice]=registro;
    else ranking.push(registro);
    ranking.sort((a,b)=>Number(b.mejor||0)-Number(a.mejor||0)||Number(b.puntos||0)-Number(a.puntos||0));
    guardarJSON(DOCERE_STORAGE.RANKING,ranking.slice(0,20));
  }

  function obtenerPlayerId(){
    let id=localStorage.getItem(DOCERE_STORAGE.PLAYER_ID);
    if(!id){
      const generador=globalThis.crypto && typeof globalThis.crypto.randomUUID==="function"
        ? globalThis.crypto.randomUUID.bind(globalThis.crypto)
        : null;
      id=generador ? generador() : "p_"+Date.now()+"_"+Math.random().toString(36).slice(2,12);
      localStorage.setItem(DOCERE_STORAGE.PLAYER_ID,id);
    }
    return id;
  }

  function obtenerAlias(){
    return localStorage.getItem(DOCERE_STORAGE.ALIAS) || "";
  }

  function actualizarAliases(){
    const alias=obtenerAlias() || "Invitado";
    document.querySelectorAll(".alias").forEach(el=>el.textContent=alias);
    ["aliasInicio","aliasActividad","aliasResultado"].forEach(id=>{
      const el=document.getElementById(id);
      if(el)el.textContent=alias;
    });
  }

  function abrirPerfil(forzar=false){
    const modal=document.getElementById("perfilModal");
    const input=document.getElementById("aliasInput");
    if(!modal||!input)return;
    input.value=obtenerAlias();
    if(forzar || !obtenerAlias()){
      modal.style.display="flex";
      setTimeout(()=>input.focus(),50);
    }
  }

  function guardarPerfil(){
    const input=document.getElementById("aliasInput");
    const modal=document.getElementById("perfilModal");
    if(!input)return;
    const alias=limpiarAlias(input.value);
    if(!alias){
      input.focus();
      return;
    }
    localStorage.setItem(DOCERE_STORAGE.ALIAS,alias);
    actualizarAliases();
    actualizarRankingLocal();
    if(typeof actualizarAliasInterfaz==="function")actualizarAliasInterfaz();
    if(typeof actualizarAlias==="function")actualizarAlias();
    if(modal)modal.style.display="none";
    const pendiente=globalThis.accionPerfilPendiente;
    globalThis.accionPerfilPendiente=null;
    if(typeof pendiente==="function")pendiente();
    else if(globalThis.bloquePendiente && typeof globalThis.iniciarBloque==="function"){
      const bloque=globalThis.bloquePendiente;
      globalThis.bloquePendiente=null;
      globalThis.iniciarBloque(bloque);
    }
  }

  function irInicio(){
    const actividad=document.getElementById("actividad");
    const visible=actividad && getComputedStyle(actividad).display!=="none";
    if(visible && !confirm("Si vuelves al inicio, perderás la partida actual. ¿Quieres continuar?"))return;
    window.location.href="index.html";
  }

  globalThis.DOCERE_STORAGE=DOCERE_STORAGE;
  globalThis.normalizar=normalizar;
  globalThis.norm=normalizar;
  globalThis.mezclar=mezclar;
  globalThis.mix=mezclar;
  globalThis.obtenerPlayerId=obtenerPlayerId;
  globalThis.player=obtenerPlayerId;
  globalThis.obtenerAlias=obtenerAlias;
  globalThis.alias=obtenerAlias;
  globalThis.getAlias=obtenerAlias;
  globalThis.limpiarAlias=limpiarAlias;
  globalThis.abrirPerfil=abrirPerfil;
  globalThis.guardarPerfil=guardarPerfil;
  globalThis.leerJSON=leerJSON;
  globalThis.guardarJSON=guardarJSON;
  globalThis.actualizarRankingLocal=actualizarRankingLocal;
  globalThis.irInicio=irInicio;
  globalThis.mostrarAlias=actualizarAliases;
  globalThis.actualizarAliases=actualizarAliases;
  globalThis.actualizarAliasInterfaz=actualizarAliases;
})();

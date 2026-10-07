/* Docere et Delectare · núcleo compartido
   Responsabilidades: utilidades, identidad anónima, alias y navegación global.
   Las páginas de contenido conservan su lógica didáctica y su motor específico.
*/
(function(){
  "use strict";

  function normalizar(texto){
    return String(texto ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[+\-_|/]/g,"")
      .replace(/\s+/g,"")
      .trim();
  }

  function mezclar(array){
    return [...array].sort(()=>Math.random()-0.5);
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

  function obtenerPlayerId(){
    let id=localStorage.getItem("docerePlayerId");
    if(!id){
      const generador=globalThis.crypto && typeof globalThis.crypto.randomUUID==="function"
        ? globalThis.crypto.randomUUID.bind(globalThis.crypto)
        : null;
      id=generador ? generador() : "p_"+Date.now()+"_"+Math.random().toString(36).slice(2,12);
      localStorage.setItem("docerePlayerId",id);
    }
    return id;
  }

  function obtenerAlias(){
    return localStorage.getItem("docereAlias") || "";
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
    localStorage.setItem("docereAlias",alias);
    actualizarAliases();
    if(typeof actualizarAliasInterfaz==="function")actualizarAliasInterfaz();
    if(typeof actualizarAlias==="function")actualizarAlias();
    if(typeof mostrarAlias==="function")mostrarAlias();
    if(modal)modal.style.display="none";
  }

  function irInicio(){
    const actividad=document.getElementById("actividad");
    const visible=actividad && getComputedStyle(actividad).display!=="none";
    if(visible && !confirm("Si vuelves al inicio, perderás la partida actual. ¿Quieres continuar?"))return;
    window.location.href="index.html";
  }

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
  globalThis.irInicio=irInicio;
  globalThis.mostrarAlias=actualizarAliases;
  globalThis.actualizarAliases=actualizarAliases;
})();

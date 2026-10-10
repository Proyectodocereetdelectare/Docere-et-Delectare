/* Docere et Delectare · Taxonomía curricular de Sintaxis · v1.0.0
   Fuente de verdad curricular para la futura generación controlada por IA. */
const SINTAXIS_TAXONOMIA={
version:"1.0.0",
principios:[
"La pregunta debe exigir una inferencia y no revelar la respuesta solicitada.",
"Un MCQ debe tener exactamente una respuesta inequívocamente válida y tres distractores falsos en ese contexto.",
"Los distractores deben representar errores reales, no ser opciones absurdas.",
"La dificultad depende de la operación cognitiva, la estructura y la proximidad entre alternativas.",
"La IA propone; la taxonomía, las reglas y los validadores deciden qué puede publicarse.",
"No se genera contenido fuera del bloque ni de sus prerrequisitos."
],
niveles:{
1:{nombre:"Reconocer",operaciones:["identificar","clasificar"],estructura:"elemento aislado u oración transparente",exigencia:"una decisión clara"},
2:{nombre:"Identificar en contexto",operaciones:["localizar","clasificar","aplicar prueba directa"],estructura:"oración sencilla con un foco"},
3:{nombre:"Distinguir",operaciones:["contrastar","aplicar concordancia","aplicar sustitución"],estructura:"oración con funciones próximas"},
4:{nombre:"Aplicar",operaciones:["aplicar pruebas","transformar","analizar varios complementos"],estructura:"estructura menos transparente"},
5:{nombre:"Justificar y transformar",operaciones:["justificar","transformar","contrastar"],estructura:"oración compleja o contraste funcional"},
6:{nombre:"Integrar y argumentar",operaciones:["analizar","corregir","justificar","combinar pruebas"],estructura:"análisis integrado"}
},
bloques:{
unidades:{
nombre:"Sintagmas y oración simple · Inicio",
proposito:"Reconocer unidades sintácticas antes de asignar funciones.",
prerequisitos:[],
excluye:["CD","CI","CR","atributo","PVO","complemento agente"],
niveles:{
1:"palabra frente a sintagma; SN básico",
2:"SAdj y SPrep",
3:"SAdv y reconocimiento del núcleo",
4:"SV y oración simple; SPrep dentro de oración",
5:"sintagmas complejos y reconocimiento integrado",
6:"análisis de SN y SV principales sin funciones internas"
},
familias:["unidad","SN","SAdj","SAdv","SPrep","SV","oracion-simple-basica"]
},
simple:{
nombre:"Oración simple",
proposito:"Reconocer, distinguir, justificar y transformar las principales funciones de una oración simple.",
prerequisitos:["unidades"],
excluye:["coordinacion","subordinacion"],
niveles:{
1:"sujeto y CD transparentes",
2:"CI, CD y primeros CC",
3:"atributo, PVO, CR inicial y contraste PVO/CC de modo",
4:"complemento agente, CC variados y pruebas sintácticas",
5:"activa/pasiva, sustitución y contrastes próximos",
6:"análisis integrado y justificación de varias funciones"
},
familias:["sujeto","CD","CI","CR","atributo","PVO-sujeto","PVO-CD","CC","complemento-agente","voz-pasiva","transformacion","analisis-integrado"]
},
compuesta:{
nombre:"Oración compuesta",
proposito:"Reconocer, clasificar y analizar coordinación, yuxtaposición y subordinación.",
prerequisitos:["unidades","simple"],
niveles:{
1:"yuxtaposición y copulativa transparentes",
2:"disyuntiva, explicativa y estructuras yuxtapuestas",
3:"distributiva y adverbiales propias transparentes: causal, temporal, lugar y modo",
4:"adjetivas y funciones básicas de sustantivas",
5:"sustantivas con funciones diversas, consecutivas y comparativas",
6:"concesivas, contrastes y análisis complejo"
},
familias:["yuxtaposicion","coordinacion-copulativa","coordinacion-disyuntiva","coordinacion-explicativa","coordinacion-distributiva","coordinacion-adversativa","sustantiva","adjetiva","adverbial-propia","causal","temporal","locativa","modal","consecutiva","comparativa","concesiva","distincion-subordinadas"]
},
error:{
nombre:"Detecta el error",
proposito:"Diagnosticar errores frecuentes, explicar por qué son errores y corregirlos.",
prerequisitos:["simple","compuesta"],
niveles:{
1:"CD/CI y agente básicos",
2:"atributo, PVO y CD/CI por preposición",
3:"CR/CC y PVO/CC de modo",
4:"CR, agente y sustantivas",
5:"clasificación de subordinadas y funciones",
6:"errores complejos que exigen justificación"
},
familias:["CD-CI","CR-CC","PVO-CC","atributo-PVO","agente-CC","sustantiva-condicional","adjetiva-adverbial","causal-concesiva"]
},
reto:{
nombre:"Reto sintáctico",
proposito:"Integrar contenidos de todos los bloques.",
prerequisitos:["unidades","simple","compuesta"],
permiteTodo:true,
niveles:{
1:"reconocimiento básico",
2:"análisis simple con varias funciones",
3:"primeras subordinadas y contrastes",
4:"análisis de subordinadas",
5:"análisis y justificación complejos",
6:"análisis integrado de varias relaciones"
},
familias:["integracion"]
}
},
familias:{
sujeto:{bloque:"simple",pruebas:["concordancia con el verbo"],contrastes:["CD","CI"]},
CD:{bloque:"simple",pruebas:["lo/la/los/las","pasiva cuando procede"],contrastes:["CI","CR"]},
CI:{bloque:"simple",pruebas:["le/les","duplicación pronominal cuando procede"],contrastes:["CD"]},
CR:{bloque:"simple",pruebas:["preposición seleccionada por el verbo","sustitución manteniendo la preposición"],contrastes:["CC","CD"]},
atributo:{bloque:"simple",pruebas:["verbo copulativo","lo cuando procede"],contrastes:["PVO","CD"]},
"PVO-sujeto":{bloque:"simple",pruebas:["concordancia con el sujeto","verbo predicativo"],contrastes:["CC-modo","atributo"]},
"PVO-CD":{bloque:"simple",pruebas:["concordancia con el CD","predicación secundaria"],contrastes:["CC-modo","atributo"]},
CC:{bloque:"simple",subtipos:["lugar","tiempo","modo","cantidad","causa","finalidad","compañía","afirmación","negación","instrumento"]},
"complemento-agente":{bloque:"simple",pruebas:["pasiva perifrástica","por + entidad agente"],contrastes:["CC-causa","CR"]},
"voz-pasiva":{bloque:"simple",operaciones:["activa-a-pasiva","pasiva-a-activa","sujeto-paciente","agente"]},
sustantiva:{bloque:"compuesta",funciones:["sujeto","atributo","CD","complemento-del-nombre","complemento-del-adjetivo","complemento-del-adverbio","CR"]},
adjetiva:{bloque:"compuesta",tipos:["especificativa","explicativa"],criterio:"antecedente nominal"},
"adverbial-propia":{bloque:"compuesta",subtipos:["lugar","modo","tiempo"]},
causal:{bloque:"compuesta",contrastes:["consecutiva","concesiva"]},
consecutiva:{bloque:"compuesta",contrastes:["causal","comparativa"]},
concesiva:{bloque:"compuesta",contrastes:["causal"]},
"distincion-subordinadas":{bloque:"compuesta",operaciones:["comparar","justificar"]},
diagnostico:{bloque:"error",operacion:"detectar-explicar-corregir"},
integracion:{bloque:"reto",operacion:"analisis-global"}
},
generacion:{
formatos:["mcq","text","analysis","select","build","transform","chain"],
reglas:[
"MCQ: exactamente una respuesta válida y tres distractores falsos en el contexto.",
"No revelar en el enunciado la función, tipo o relación que se pide identificar.",
"La explicación debe exponer el criterio de identificación.",
"En actividades discriminativas, al menos un distractor debe representar el error objetivo.",
"Las transformaciones deben conservar contenido proposicional, concordancia y relaciones sintácticas.",
"Evitar repetir inmediatamente oración, verbo, conector, estructura y patrón de distractores.",
"El nivel declarado debe ser demostrable por su operación cognitiva y estructura.",
"No publicar una actividad si el análisis admite dos respuestas razonables.",
"En Oración compuesta, la dificultad debe proceder de la relación sintáctica que se analiza, no de acumular subordinadas o alargar artificialmente la oración.",
"En actividades ordinarias de Oración compuesta, evitar subordinación encadenada: como regla general, no más de una subordinada incrustada dentro de otra.",
"Los niveles 1-4 de Oración compuesta deben trabajar normalmente con un máximo de 3 proposiciones; los niveles 5-6 pueden llegar a 4 solo cuando la complejidad sea el objetivo del ejercicio.",
"Evitar oraciones excesivamente largas: una oración no debe superar los 35 palabras en niveles 1-4 ni las 45 palabras en niveles 5-6, salvo una actividad del Reto diseñada específicamente para integrar estructura."
],
bloqueos:[
"CR no se identifica por llevar preposición: debe existir régimen verbal.",
"La preposición a no basta para identificar CI.",
"PVO no se identifica solo por responder a cómo: debe existir predicación y concordancia pertinente.",
"Por + sintagma no basta para identificar complemento agente.",
"Una relativa no es adverbial solo porque ocupe una posición circunstancial.",
"No introducir funciones internas en la puerta de entrada de Unidades.",
"No introducir coordinación o subordinación en Unidades salvo contraste controlado de oración simple/compuesta.",
"El Reto puede mezclar cualquier contenido."
]
}
};
globalThis.SINTAXIS_TAXONOMIA=SINTAXIS_TAXONOMIA;
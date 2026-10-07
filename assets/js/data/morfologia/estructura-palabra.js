const identifica = [

/* NIVEL 1 · RECONOCE */
{id:"id01",nivel:1,tipo:"mcq",pregunta:"¿Qué es un morfema?",opciones:["La mínima unidad lingüística con significado","El significado central de una familia léxica","Una palabra formada por dos lexemas","Un elemento que siempre aparece al final"],correcta:0,explicacion:"Un morfema es la mínima unidad lingüística con significado."},
{id:"id02",nivel:1,tipo:"mcq",pregunta:"¿Qué elemento aporta el significado central y común a los términos de una familia léxica?",opciones:["El lexema","El morfema flexivo","El infijo","El sufijo"],correcta:0,explicacion:"Los lexemas aportan el significado central, común a los términos de una familia léxica."},
{id:"id03",nivel:1,tipo:"mcq",pregunta:"¿Cuál de estos elementos es un morfema flexivo?",opciones:["re- en «revivir»","-eza en «belleza»","-s en «libros»","im- en «impar»"],correcta:2,explicacion:"-s indica número plural y, por tanto, es un morfema flexivo."},
{id:"id04",nivel:1,tipo:"mcq",pregunta:"¿Cuál de estos elementos es un afijo derivativo?",opciones:["-s en «libros»","-a en «rápida»","re- en «revivir»","-mos en «temiésemos»"],correcta:2,explicacion:"re- es un prefijo derivativo: se añade delante del lexema y modifica su significado."},
{id:"id05",nivel:1,tipo:"mcq",pregunta:"¿Dónde se sitúa un prefijo?",opciones:["Delante del lexema","Detrás del lexema","Siempre entre dos lexemas","Solo en palabras compuestas"],correcta:0,explicacion:"Los prefijos se sitúan delante del lexema."},
{id:"id06",nivel:1,tipo:"mcq",pregunta:"¿Dónde se sitúa un sufijo?",opciones:["Delante del lexema","Detrás del lexema","Siempre al principio de la palabra","Solo en los verbos"],correcta:1,explicacion:"Los sufijos aparecen detrás del lexema."},
{id:"id07",nivel:1,tipo:"mcq",pregunta:"¿Qué es un alomorfo?",opciones:["Una variante de un morfema","Un tipo de sufijo","Un morfema de número","Un elemento que carece siempre de significado"],correcta:0,explicacion:"Un alomorfo es una variante de un morfema."},
{id:"id08",nivel:1,tipo:"mcq",pregunta:"¿Qué es un infijo?",opciones:["Un elemento de enlace situado en el interior de una palabra que no aporta significado","Un prefijo que modifica el significado del lexema","Un morfema flexivo de género","El significado central de una familia léxica"],correcta:0,explicacion:"El infijo es un elemento de enlace situado en el interior de una palabra que no aporta significado."},

/* NIVEL 2 · LOCALIZA */
{id:"id09",nivel:2,tipo:"texto",pregunta:"Escribe el lexema de «sol».",palabra:"sol",soluciones:["sol","sol-"],explicacion:"sol- es el lexema."},
{id:"id10",nivel:2,tipo:"texto",pregunta:"Escribe el lexema de «soleado».",palabra:"soleado",soluciones:["sol","sol-"],explicacion:"sol- es el lexema que aporta el significado central de la familia léxica."},
{id:"id11",nivel:2,tipo:"texto",pregunta:"Escribe el sufijo derivativo de «belleza».",palabra:"belleza",soluciones:["eza","-eza"],explicacion:"-eza es un sufijo derivativo."},
{id:"id12",nivel:2,tipo:"texto",pregunta:"Escribe el prefijo de «impar».",palabra:"impar",soluciones:["im","im-"],explicacion:"im- es un prefijo."},
{id:"id13",nivel:2,tipo:"texto",pregunta:"En «libros», ¿qué morfema indica el número?",palabra:"libros",soluciones:["s","-s"],explicacion:"-s indica número plural."},
{id:"id14",nivel:2,tipo:"texto",pregunta:"En «paredes», ¿qué morfema indica el número?",palabra:"paredes",soluciones:["es","-es"],explicacion:"-es indica número plural."},
{id:"id15",nivel:2,tipo:"texto",pregunta:"En «rápida», ¿qué morfema indica el género?",palabra:"rápida",soluciones:["a","-a"],explicacion:"-a indica género femenino."},
{id:"id16",nivel:2,tipo:"mcq",pregunta:"En «minero», ¿qué elemento se relaciona con la idea de oficio u ocupación?",opciones:["min-","-er-","-o","minero completo"],correcta:1,explicacion:"En minero, -er- aparece como morfema relacionado con «oficio u ocupación»."},

/* NIVEL 3 · DISTINGUE */
{id:"id17",nivel:3,tipo:"mcq",pregunta:"¿Por qué «-s» en «libros» es un morfema flexivo y no un sufijo derivativo?",opciones:["Porque indica número","Porque aparece delante del lexema","Porque cambia el significado del lexema","Porque forma una palabra nueva"],correcta:0,explicacion:"Los morfemas flexivos expresan valores gramaticales. En libros, -s indica número."},
{id:"id18",nivel:3,tipo:"mcq",pregunta:"¿Por qué «re-» en «revivir» es un afijo derivativo?",opciones:["Porque indica plural","Porque se añade al lexema y modifica su significado","Porque indica género","Porque funciona como elemento de enlace sin significado"],correcta:1,explicacion:"Los afijos derivativos son no flexivos y pueden matizar o modificar el significado del lexema."},
{id:"id19",nivel:3,tipo:"mcq",pregunta:"¿Cuál de estos pares distingue correctamente un afijo derivativo de uno flexivo?",opciones:["re- en «revivir» / -s en «libros»","-s en «libros» / re- en «revivir»","-a en «rápida» / -s en «libros»","-s en «libros» / -a en «rápida»"],correcta:0,explicacion:"re- es derivativo; -s es flexivo porque expresa número."},
{id:"id20",nivel:3,tipo:"mcq",pregunta:"En «sencillas», ¿qué elemento expresa el número?",opciones:["sencill-","-a","-s","todo el lexema"],correcta:2,explicacion:"-s indica número plural."},
{id:"id21",nivel:3,tipo:"mcq",pregunta:"En «sencillas», ¿qué elemento expresa el género?",opciones:["sencill-","-a","-s","ninguno"],correcta:1,explicacion:"-a indica género femenino."},
{id:"id22",nivel:3,tipo:"mcq",pregunta:"En «escribiré», ¿qué tipo de información pueden aportar los morfemas flexivos verbales?",opciones:["Tiempo, modo, número y persona","Solo género y número","Solo significado léxico","Solo derivación"],correcta:0,explicacion:"En los verbos, los morfemas flexivos pueden indicar tiempo, modo, número y persona."},
{id:"id23",nivel:3,tipo:"mcq",pregunta:"¿Cuál de estas afirmaciones es correcta?",opciones:["Los prefijos se sitúan detrás del lexema","Los sufijos se sitúan delante del lexema","Los prefijos se sitúan delante y los sufijos detrás del lexema","Los afijos derivativos siempre indican número"],correcta:2,explicacion:"Los prefijos se sitúan delante del lexema y los sufijos detrás."},
{id:"id24",nivel:3,tipo:"mcq",pregunta:"Un alumno afirma: «En libros, -s es un sufijo derivativo porque aparece al final». ¿Qué error comete?",opciones:["Confunde posición con función: -s es flexivo porque indica número","Confunde lexema con infijo","Confunde un prefijo con un lexema","No comete ningún error"],correcta:0,explicacion:"Que un elemento aparezca al final no lo convierte automáticamente en sufijo derivativo. En libros, -s expresa número y es flexivo."},

/* NIVEL 4 · APLICA Y CORRIGE */
{id:"id25",nivel:4,tipo:"mcq",pregunta:"Un alumno analiza «rápidas» como «rápid- + -as» y dice que «-as» es un único sufijo derivativo. ¿Qué debería corregir?",opciones:["Debe distinguir -a, género, y -s, número","Debe considerar -as un lexema","Debe eliminar el lexema","No hay nada que corregir"],correcta:0,explicacion:"En el análisis morfológico conviene distinguir -a como morfema de género y -s como morfema de número."},
{id:"id26",nivel:4,tipo:"mcq",pregunta:"Un alumno afirma que «re-» en «revivir» es un morfema flexivo porque aparece delante de la palabra. ¿Qué respuesta es correcta?",opciones:["Es flexivo porque aparece delante","Es derivativo porque es un prefijo que modifica el significado","Es un infijo","Es el lexema"],correcta:1,explicacion:"La posición no determina por sí sola la función. re- es un prefijo derivativo."},
{id:"id27",nivel:4,tipo:"segmentacion",pregunta:"Segmenta «sencillas» indicando sus morfemas.",palabra:"sencillas",soluciones:["sencill- + -a + -s","sencill + a + s"],explicacion:"sencill- es el lexema; -a indica género y -s indica número."},
{id:"id28",nivel:4,tipo:"segmentacion",pregunta:"Segmenta «paredes» indicando sus morfemas.",palabra:"paredes",soluciones:["pared- + -es","pared + es"],explicacion:"pared- es el lexema y -es indica número plural."},
{id:"id29",nivel:4,tipo:"segmentacion",pregunta:"Segmenta «lápices» indicando sus morfemas.",palabra:"lápices",soluciones:["lápic- + -es","lapic- + -es","lápic + es","lapic + es"],explicacion:"lápic- es el lexema y -es indica número plural."},
{id:"id30",nivel:4,tipo:"mcq",pregunta:"¿Cuál de estos análisis identifica correctamente los elementos de «belleza»?",opciones:["bell- = lexema; -eza = sufijo derivativo","bell- = sufijo; -eza = lexema","bell- = prefijo; -eza = flexivo","bell- = infijo; -eza = lexema"],correcta:0,explicacion:"En belleza, bell- funciona como lexema y -eza como sufijo derivativo."},

/* NIVEL 5 · CASOS ESPECIALES */
{id:"id31",nivel:5,tipo:"mcq",pregunta:"En «sueñas» y «soñar» aparecen «sueñ-» y «soñ-». ¿Cómo se denominan estas dos formas?",opciones:["Dos infijos","Dos alomorfos","Dos sufijos","Dos morfemas flexivos"],correcta:1,explicacion:"sueñ- y soñ- son variantes de un mismo lexema: son alomorfos."},
{id:"id32",nivel:5,tipo:"mcq",pregunta:"¿Qué caracteriza a «sueñ-» y «soñ-»?",opciones:["Presentan formas diferentes pero pertenecen al mismo lexema","Uno es un prefijo y otro un sufijo","Uno es un infijo y otro un morfema flexivo","Son dos palabras compuestas"],correcta:0,explicacion:"Los alomorfos son variantes de un mismo morfema; aquí, sueñ- y soñ- son formas diferentes del mismo lexema."},
{id:"id33",nivel:5,tipo:"mcq",pregunta:"¿Cuál de estas parejas aparece como ejemplo de alomorfia?",opciones:["sueñ- / soñ-","pan- / -ec-","re- / -eza","-a / -s"],correcta:0,explicacion:"sueñ- y soñ- son el ejemplo de alomorfos."},
{id:"id34",nivel:5,tipo:"mcq",pregunta:"En «panecillo», ¿qué función cumple «-ec-»?",opciones:["Aporta el significado central de la palabra","Es un elemento de enlace que no aporta significado","Indica plural","Es un prefijo derivativo"],correcta:1,explicacion:"-ec- funciona como elemento de enlace situado en el interior de la palabra y no aporta significado."},
{id:"id35",nivel:5,tipo:"mcq",pregunta:"¿Por qué «-ec-» en «panecillo» no se considera un morfema con significado?",opciones:["Porque funciona como elemento de enlace","Porque es el lexema","Porque indica género","Porque es un prefijo"],correcta:0,explicacion:"El infijo funciona como elemento de enlace y no aporta significado."},
{id:"id36",nivel:5,tipo:"mcq",pregunta:"Un alumno dice que «-ec-» en «panecillo» es un sufijo derivativo porque aparece antes del final. ¿Qué respuesta es más adecuada?",opciones:["No: funciona como elemento de enlace y no aporta significado","Sí: todos los elementos interiores son sufijos","No: es el lexema","Sí: indica plural"],correcta:0,explicacion:"La función de -ec- es la de elemento de enlace o infijo, no la de sufijo derivativo."},

/* NIVEL 6 · RETO */
{id:"id37",nivel:6,tipo:"mcq",pregunta:"¿Cuál de estas afirmaciones reúne correctamente las funciones de los tres elementos de «sencillas»?",opciones:["sencill- = lexema; -a = género; -s = número","sencill- = prefijo; -a = sufijo; -s = lexema","sencill- = lexema; -a = número; -s = género","sencill- = infijo; -a = lexema; -s = sufijo"],correcta:0,explicacion:"sencill- aporta el significado central; -a expresa género femenino y -s expresa plural."},
{id:"id38",nivel:6,tipo:"mcq",pregunta:"¿Cuál de estas afirmaciones compara correctamente «revivir» y «libros»?",opciones:["re- es derivativo, mientras que -s es flexivo","re- es flexivo, mientras que -s es derivativo","Ambos son morfemas flexivos","Ambos son infijos"],correcta:0,explicacion:"re- es un afijo derivativo; -s es un morfema flexivo de número."},
{id:"id39",nivel:6,tipo:"mcq",pregunta:"¿Cuál de estos análisis es incorrecto?",opciones:["«belleza»: bell- + -eza","«libros»: libr- + -o + -s","«panecillo»: pan- + -ec- como elemento de enlace","«sueñas»: sueñ- como sufijo derivativo"],correcta:3,explicacion:"En sueñas, sueñ- es una variante del lexema, no un sufijo derivativo."},
{id:"id40",nivel:6,tipo:"mcq",pregunta:"Un alumno afirma: «Todos los elementos que aparecen después del lexema son sufijos derivativos». ¿Qué ejemplo demuestra que la afirmación es incorrecta?",opciones:["-s en «libros»","re- en «revivir»","im- en «impar»","bell- en «belleza»"],correcta:0,explicacion:"-s aparece después del lexema, pero es un morfema flexivo porque indica número. La posición no basta para determinar la función."},
{id:"id41",nivel:6,tipo:"mcq",pregunta:"¿Qué opción diferencia mejor un infijo de un sufijo derivativo?",opciones:["El infijo sirve de enlace y no aporta significado; el sufijo derivativo sí modifica o matiza el significado del lexema","El infijo siempre aparece al principio; el sufijo siempre al final","El infijo indica número; el sufijo indica género","No existe diferencia"],correcta:0,explicacion:"El infijo funciona como elemento de enlace sin significado, mientras que los afijos derivativos matizan o modifican el significado del lexema."},
{id:"id42",nivel:6,tipo:"mcq",pregunta:"¿Cuál sería la mejor explicación de por qué «sueñ-» y «soñ-» no deben analizarse como dos lexemas completamente independientes?",opciones:["Porque son variantes formales de un mismo lexema","Porque ambos son sufijos","Porque ambos son morfemas de número","Porque uno es un infijo"],correcta:0,explicacion:"Se consideran alomorfos: presentan formas diferentes, pero corresponden a variantes de un mismo lexema."}

];

const clasifica = [

{id:"EP-A-001",nivel:1,tipo:"mcq",pregunta:"¿Qué elemento aporta el significado léxico central?",opciones:["El lexema","El morfema flexivo","El prefijo","El interfijo"],correcta:0,explicacion:"El lexema aporta el significado central."},
{id:"EP-A-002",nivel:1,tipo:"mcq",pregunta:"En «libros», ¿qué elemento indica el plural?",opciones:["-s","libr-","-o","libro"],correcta:0,explicacion:"-s expresa número plural."},
{id:"EP-A-003",nivel:1,tipo:"mcq",pregunta:"En «revivir», ¿qué elemento es un prefijo derivativo?",opciones:["re-","viv-","-ir","-s"],correcta:0,explicacion:"re- aparece delante del lexema y es derivativo."},
{id:"EP-A-004",nivel:1,tipo:"mcq",pregunta:"¿Dónde aparece normalmente un prefijo?",opciones:["Delante del lexema","Detrás del lexema","Solo entre dos lexemas","Solo al final"],correcta:0,explicacion:"El prefijo se sitúa delante del lexema."},
{id:"EP-A-005",nivel:1,tipo:"mcq",pregunta:"¿Dónde aparece normalmente un sufijo?",opciones:["Detrás del lexema","Delante del lexema","Solo al principio","Entre dos palabras"],correcta:0,explicacion:"El sufijo se sitúa detrás del lexema."},
{id:"EP-A-006",nivel:1,tipo:"mcq",pregunta:"¿Qué es un morfema?",opciones:["Una unidad mínima con significado","Una palabra compuesta","Un tipo de lexema","Una palabra sin significado"],correcta:0,explicacion:"El morfema es la unidad lingüística mínima con significado."},
{id:"EP-A-007",nivel:1,tipo:"mcq",pregunta:"¿Qué elemento de «lápices» es flexivo?",opciones:["-es","lápic-","-iz-","re-"],correcta:0,explicacion:"-es expresa el número plural."},
{id:"EP-A-008",nivel:1,tipo:"mcq",pregunta:"¿Qué elemento de «belleza» es derivativo?",opciones:["-eza","bell-","-s","-a"],correcta:0,explicacion:"-eza es un sufijo derivativo."},
{id:"EP-A-009",nivel:2,tipo:"mcq",pregunta:"En «paredes», ¿qué elemento es el lexema?",opciones:["pared-","-es","-ed-","paredes"],correcta:0,explicacion:"pared- aporta el significado léxico."},
{id:"EP-A-010",nivel:2,tipo:"mcq",pregunta:"En «rápidas», ¿qué elemento expresa género?",opciones:["-a","-s","rápid-","-ida"],correcta:0,explicacion:"-a expresa género femenino."},
{id:"EP-A-011",nivel:2,tipo:"mcq",pregunta:"En «sencillas», ¿qué elemento expresa número?",opciones:["-s","-a","sencill-","-illa"],correcta:0,explicacion:"-s expresa plural."},
{id:"EP-A-012",nivel:2,tipo:"mcq",pregunta:"¿Qué tipo de elemento es «re-» en «rehacer»?",opciones:["Prefijo derivativo","Morfema flexivo","Interfijo","Lexema"],correcta:0,explicacion:"re- es un prefijo derivativo."},
{id:"EP-A-013",nivel:2,tipo:"mcq",pregunta:"¿Qué tipo de elemento es «-ura» en «blancura»?",opciones:["Sufijo derivativo","Prefijo","Morfema flexivo","Lexema"],correcta:0,explicacion:"-ura es un sufijo derivativo."},
{id:"EP-A-014",nivel:2,tipo:"mcq",pregunta:"¿Qué tipo de elemento es «-es» en «paredes»?",opciones:["Morfema flexivo","Sufijo derivativo","Prefijo","Interfijo"],correcta:0,explicacion:"-es expresa número."},
{id:"EP-A-015",nivel:2,tipo:"mcq",pregunta:"¿Qué es «sueñ-» frente a «soñ-»?",opciones:["Una variante del mismo lexema","Un sufijo","Un prefijo","Un morfema de plural"],correcta:0,explicacion:"Son alomorfos: variantes de un mismo morfema."},
{id:"EP-A-016",nivel:2,tipo:"mcq",pregunta:"En «panecillo», ¿qué función cumple «-ec-»?",opciones:["Elemento de enlace o interfijo","Lexema","Prefijo","Morfema de género"],correcta:0,explicacion:"-ec- funciona como elemento de enlace."},
{id:"EP-A-017",nivel:3,tipo:"mcq",pregunta:"¿Por qué «-s» en «libros» es flexivo?",opciones:["Porque expresa número","Porque crea un lexema","Porque es un prefijo","Porque cambia la categoría"],correcta:0,explicacion:"Los morfemas flexivos expresan valores gramaticales."},
{id:"EP-A-018",nivel:3,tipo:"mcq",pregunta:"¿Por qué «re-» en «revivir» es derivativo?",opciones:["Porque modifica el significado del lexema","Porque expresa plural","Porque indica género","Porque enlaza dos lexemas"],correcta:0,explicacion:"re- modifica el significado del lexema."},
{id:"EP-A-019",nivel:3,tipo:"mcq",pregunta:"¿Cuál distingue correctamente derivativo y flexivo?",opciones:["re- / -s","-s / re-","-a / -s","-s / -a"],correcta:0,explicacion:"re- es derivativo y -s es flexivo."},
{id:"EP-A-020",nivel:3,tipo:"mcq",pregunta:"En «niñas», ¿qué combinación es correcta?",opciones:["niñ- + -a + -s","niñ- + -s + -a","niña- + -s + re-","niñ- + -ura"],correcta:0,explicacion:"niñ- es lexema; -a género; -s número."},
{id:"EP-A-021",nivel:3,tipo:"mcq",pregunta:"En «escribiré», los elementos flexivos verbales pueden expresar...",opciones:["tiempo, modo, número y persona","solo género","solo número","solo derivación"],correcta:0,explicacion:"Los flexivos verbales expresan tiempo, modo, número y persona."},
{id:"EP-A-022",nivel:3,tipo:"mcq",pregunta:"¿Qué diferencia a prefijo y sufijo?",opciones:["Su posición respecto al lexema","Su número de letras","Su categoría gramatical","El prefijo siempre es flexivo"],correcta:0,explicacion:"El prefijo va delante y el sufijo detrás."},
{id:"EP-A-023",nivel:3,tipo:"mcq",pregunta:"¿Qué error hay en decir que «-s» es derivativo porque está al final?",opciones:["Confunde posición con función","Confunde lexema con prefijo","Confunde verbo y sustantivo","No hay error"],correcta:0,explicacion:"La función determina que -s sea flexivo."},
{id:"EP-A-024",nivel:3,tipo:"mcq",pregunta:"¿Qué elemento no aporta significado en «panecillo»?",opciones:["-ec-","pan-","-ill-","-o"],correcta:0,explicacion:"-ec- funciona como enlace y no aporta significado."},
{id:"EP-A-025",nivel:4,tipo:"mcq",pregunta:"Un alumno analiza «rápidas» como un único sufijo «-as». ¿Qué debe distinguir?",opciones:["-a de género y -s de número","dos lexemas","un prefijo y un lexema","solo el lexema"],correcta:0,explicacion:"Conviene separar los morfemas flexivos de género y número."},
{id:"EP-A-026",nivel:4,tipo:"mcq",pregunta:"¿Qué análisis es correcto para «lápices»?",opciones:["lápic- + -es","láp- + -ice + -s","lápices- + -s","la- + pices"],correcta:0,explicacion:"lápic- es el lexema y -es es flexivo."},
{id:"EP-A-027",nivel:4,tipo:"mcq",pregunta:"¿Qué análisis es correcto para «belleza»?",opciones:["bell- + -eza","be- + lleza","bellez- + -a","bell- + -e + -za"],correcta:0,explicacion:"bell- funciona como lexema y -eza como sufijo derivativo."},
{id:"EP-A-028",nivel:4,tipo:"mcq",pregunta:"¿Qué elemento identifica correctamente «impar»?",opciones:["im- es un prefijo","-par es un sufijo","im- es un flexivo","par es un infijo"],correcta:0,explicacion:"im- aparece delante de la base."},
{id:"EP-A-029",nivel:4,tipo:"mcq",pregunta:"¿Qué análisis es correcto para «revivir»?",opciones:["re- + viv- + -ir","rev- + ivir-","revi- + vir-","revivir- + -s"],correcta:0,explicacion:"re- es prefijo y viv- es el lexema."},
{id:"EP-A-030",nivel:4,tipo:"mcq",pregunta:"¿Qué análisis es correcto para «sencillas»?",opciones:["sencill- + -a + -s","sen- + cill- + -as","sencilla- + -s","sencill- + -as como un único sufijo"],correcta:0,explicacion:"-a y -s son morfemas flexivos distintos."},
{id:"EP-A-031",nivel:4,tipo:"mcq",pregunta:"¿Qué elemento es un alomorfo?",opciones:["soñ- en relación con sueñ-","-s en libros","re- en revivir","-ura en blancura"],correcta:0,explicacion:"soñ- y sueñ- son variantes de un mismo lexema."},
{id:"EP-A-032",nivel:4,tipo:"mcq",pregunta:"¿Qué análisis identifica el interfijo de «panecillo»?",opciones:["pan- + -ec- + -ill-","pan- + -illo","pa- + nec- + -illo","panec- + -illo"],correcta:0,explicacion:"-ec- es el elemento de enlace."},
{id:"EP-A-033",nivel:5,tipo:"mcq",pregunta:"¿Cuál de estas parejas contiene alomorfos?",opciones:["sueñ- / soñ-","re- / -ura","-a / -s","pan- / -ec-"],correcta:0,explicacion:"sueñ- y soñ- son variantes de un mismo lexema."},
{id:"EP-A-034",nivel:5,tipo:"mcq",pregunta:"¿Qué caracteriza a un alomorfo?",opciones:["Es una variante de un mismo morfema","Es siempre un sufijo","Es siempre un prefijo","No tiene relación con otros morfemas"],correcta:0,explicacion:"Los alomorfos son variantes de un morfema."},
{id:"EP-A-035",nivel:5,tipo:"mcq",pregunta:"¿Qué caracteriza a un interfijo?",opciones:["Sirve de enlace y no aporta significado","Indica plural","Aporta el significado central","Siempre modifica la categoría"],correcta:0,explicacion:"El interfijo funciona como elemento de enlace."},
{id:"EP-A-036",nivel:5,tipo:"mcq",pregunta:"En «panecillo», ¿qué elemento no debe confundirse con el sufijo derivativo?",opciones:["-ec-","-ill-","pan-","-o"],correcta:0,explicacion:"-ec- es un elemento de enlace."},
{id:"EP-A-037",nivel:5,tipo:"mcq",pregunta:"¿Qué afirmación es correcta sobre los morfemas flexivos?",opciones:["Expresan valores gramaticales","Siempre crean palabras nuevas","Siempre son prefijos","No pueden aparecer en verbos"],correcta:0,explicacion:"Los flexivos expresan género, número y, en verbos, tiempo, modo, número y persona."},
{id:"EP-A-038",nivel:5,tipo:"mcq",pregunta:"¿Qué afirmación es correcta sobre los afijos derivativos?",opciones:["Son no flexivos y pueden modificar o matizar el significado","Siempre indican número","Solo aparecen en verbos","Son siempre lexemas"],correcta:0,explicacion:"Los afijos derivativos no son flexivos."},
{id:"EP-A-039",nivel:5,tipo:"mcq",pregunta:"¿Qué diferencia hay entre lexema y morfema flexivo?",opciones:["El lexema aporta significado léxico y el flexivo información gramatical","Ambos expresan exactamente lo mismo","El flexivo aporta siempre el significado central","El lexema solo aparece al final"],correcta:0,explicacion:"Cumplen funciones diferentes."},
{id:"EP-A-040",nivel:5,tipo:"mcq",pregunta:"¿Cuál es un análisis correcto de «sueñas»?",opciones:["sueñ- es una variante del lexema y -s es flexivo","sueñ- es un sufijo y -s un lexema","sueñ- es un prefijo y -s derivativo","todo «sueñas» es un morfema"],correcta:0,explicacion:"sueñ- es un alomorfo del lexema y -s expresa número."},
{id:"EP-A-041",nivel:6,tipo:"mcq",pregunta:"¿Cuál reúne correctamente lexema, derivativo y flexivo?",opciones:["des-igual-dad-es","des- / igual / -dad / -es","des- / -igual / dad / es","desigual / dad-es"],correcta:1,explicacion:"des- y -dad son derivativos; -es es flexivo; igual es el lexema."},
{id:"EP-A-042",nivel:6,tipo:"mcq",pregunta:"¿Cuál es el análisis correcto de «panecillos»?",opciones:["pan- + -ec- + -ill- + -o + -s","pan- + -ec- + -illos como un único sufijo","panec- + -illo + -s","pan- + -ecillos"],correcta:0,explicacion:"pan- es lexema; -ec- enlace; -ill- derivativo; -o y -s flexivos."},
{id:"EP-A-043",nivel:6,tipo:"mcq",pregunta:"¿Cuál es el análisis correcto de «relectura»?",opciones:["re- + lect- + -ura","relect- + -ura","re- + lectura-","re- + lec + tura"],correcta:0,explicacion:"re- y -ura son derivativos y lect- es el lexema."},
{id:"EP-A-044",nivel:6,tipo:"mcq",pregunta:"¿Cuál de estas afirmaciones es incorrecta?",opciones:["Todo elemento final es necesariamente un sufijo derivativo","Los prefijos aparecen delante del lexema","Los flexivos expresan valores gramaticales","Los alomorfos son variantes de un morfema"],correcta:0,explicacion:"La posición final no basta para considerar derivativo un elemento."},
{id:"EP-A-045",nivel:6,tipo:"mcq",pregunta:"¿Qué análisis de «niñas» es correcto?",opciones:["niñ- + -a + -s","niña- + -s","niñ- + -as como un único sufijo derivativo","ni- + -ñ- + -as"],correcta:0,explicacion:"-a y -s son morfemas flexivos."},
{id:"EP-A-046",nivel:6,tipo:"mcq",pregunta:"¿Cuál compara correctamente «libros» y «revivir»?",opciones:["-s es flexivo y re- es derivativo","Ambos son flexivos","Ambos son derivativos","-s es derivativo y re- flexivo"],correcta:0,explicacion:"Las funciones son distintas."},
{id:"EP-A-047",nivel:6,tipo:"mcq",pregunta:"¿Qué opción identifica correctamente el elemento especial?",opciones:["panecillo → -ec- = interfijo","sueñas → -s = alomorfo","revivir → re- = flexivo","libros → libr- = sufijo"],correcta:0,explicacion:"-ec- funciona como elemento de enlace."},
{id:"EP-A-048",nivel:6,tipo:"mcq",pregunta:"¿Qué afirmación resume mejor la estructura interna de una palabra?",opciones:["Puede contener lexema y morfemas; estos pueden ser flexivos o derivativos","Toda palabra tiene dos lexemas","Todo morfema es un sufijo","Toda terminación es flexiva"],correcta:0,explicacion:"La estructura interna se analiza según la función de sus constituyentes."},
{"id":"cl01","nivel":1,"tipo":"texto","pregunta":"En «libros», escribe el elemento que indica el plural.","soluciones":["s","-s","morfema flexivo de numero","morfema flexivo de número"],"explicacion":"-s es un morfema flexivo de número: indica plural."},
{"id":"cl02","nivel":1,"tipo":"texto","pregunta":"En «revivir», escribe el prefijo derivativo.","soluciones":["re","re-","prefijo re","prefijo re-"],"explicacion":"re- es un prefijo derivativo situado delante del lexema."},
{"id":"cl03","nivel":2,"tipo":"texto","pregunta":"En «belleza», escribe el sufijo derivativo.","soluciones":["eza","-eza","sufijo eza","sufijo -eza"],"explicacion":"-eza es un sufijo derivativo."},
{"id":"cl04","nivel":2,"tipo":"texto","pregunta":"En «panecillo», identifica el elemento de enlace que aparece entre el lexema y el sufijo.","soluciones":["ec","-ec-","ec-","interfijo ec","interfijo -ec-"],"explicacion":"-ec- funciona como interfijo, un elemento de enlace sin significado propio."},
{"id":"cl05","nivel":3,"tipo":"texto","pregunta":"Escribe los dos lexemas de «rojiblanco».","soluciones":["roj y blanco","roj+blanco","roj-blanco","roj blanco"],"explicacion":"Rojiblanco contiene los lexemas roj- y blanco; la -i- funciona como interfijo."},
{"id":"cl06","nivel":3,"tipo":"texto","pregunta":"En «lápices», ¿qué elemento indica el plural?","soluciones":["s","-s","morfema flexivo de numero","morfema flexivo de número"],"explicacion":"-s es el morfema flexivo que indica número plural."},
{"id":"cl07","nivel":4,"tipo":"texto","pregunta":"En «imposible», identifica el afijo derivativo y señala si es prefijo o sufijo.","soluciones":["im-, prefijo","im prefijo","im- prefijo derivativo","prefijo im-"],"explicacion":"im- es un prefijo derivativo que aparece delante del lexema."},
{"id":"cl08","nivel":4,"tipo":"texto","pregunta":"En «inutilidad», identifica el prefijo y el sufijo derivativos.","soluciones":["in- e -idad","in y idad","in- + -idad","in e idad"],"explicacion":"in- es prefijo derivativo y -idad es sufijo derivativo."},
{"id":"cl09","nivel":5,"tipo":"texto","pregunta":"En «sueñas» y «soñar», ¿qué relación existe entre «sueñ-» y «soñ-»?","soluciones":["son alomorfos","alomorfos","son dos alomorfos","variante de un morfema"],"explicacion":"sueñ- y soñ- son variantes o alomorfos relacionados con un mismo morfema."},
{"id":"cl10","nivel":5,"tipo":"texto","pregunta":"En «piedra» y «pedrusco», ¿qué fenómeno permite relacionar «piedr-» y «pedr-»?","soluciones":["alomorfia","alomorfos","son alomorfos","variante de un morfema"],"explicacion":"La variación formal entre ambos elementos se explica mediante la alomorfia."},
{"id":"cl11","nivel":6,"tipo":"texto","pregunta":"Segmenta «rojiblanco» indicando lexema + interfijo + lexema.","soluciones":["roj+i+blanco","roj-i-blanco","roj + i + blanco","roj- + -i- + blanco"],"explicacion":"La segmentación es roj- + -i- + blanco: dos lexemas unidos mediante un interfijo."},
{"id":"cl12","nivel":6,"tipo":"texto","pregunta":"Explica brevemente la diferencia entre un morfema flexivo y un afijo derivativo.","soluciones":["el flexivo indica genero o numero y el derivativo crea o modifica palabras","el morfema flexivo indica genero o numero y el afijo derivativo modifica el lexema","flexivo indica genero numero derivativo modifica el lexema","flexivo género número derivativo modifica el significado"],"explicacion":"Los morfemas flexivos expresan rasgos como género y número; los afijos derivativos modifican el lexema y permiten formar nuevas palabras."}
];

const analiza = [

{id:"EP-S-001",
tipo: "analisis",
pregunta: "Realiza un análisis completo.",
palabra: "relectura",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["re- + lect- + -ura", "re + lect + ura"],
lexema: ["lect", "lect-"],
derivativos: ["re- + -ura", "re + ura"],
tipo: ["derivada"]
},
explicacion: "re- es un prefijo derivativo, lect- es el lexema y -ura es un sufijo derivativo. Es una palabra derivada."
},

{id:"EP-S-002",
tipo: "analisis",
pregunta: "Realiza un análisis completo.",
palabra: "desigualdad",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["des- + igual + -dad", "des + igual + dad"],
lexema: ["igual"],
derivativos: ["des- + -dad", "des + dad"],
tipo: ["derivada"]
},
explicacion: "des- es prefijo, igual es el lexema y -dad es sufijo derivativo."
},

{id:"EP-S-003",
tipo: "analisis",
pregunta: "Realiza un análisis completo.",
palabra: "inutilidad",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["in- + util + -idad", "in + util + idad"],
lexema: ["util", "útil"],
derivativos: ["in- + -idad", "in + idad"],
tipo: ["derivada"]
},
explicacion: "in- es un prefijo derivativo, útil es el lexema y -idad es un sufijo derivativo."
},

{id:"EP-S-004",
tipo: "analisis",
pregunta: "Realiza un análisis completo.",
palabra: "panecillos",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["especial", "Elemento especial"],
["tipo", "Tipo de elemento"]
],
soluciones: {
segmentacion: ["pan- + -ec- + -ill- + -o + -s", "pan + ec + ill + o + s"],
lexema: ["pan", "pan-"],
especial: ["ec", "-ec", "-ec-"],
tipo: ["infijo", "elemento de enlace"]
},
explicacion: "pan- es el lexema; -ec- funciona como elemento de enlace o infijo."
},

{id:"EP-S-005",
tipo: "analisis",
pregunta: "Realiza un análisis completo.",
palabra: "reblandecer",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["re- + bland- + -ec- + -er", "re + bland + ec + er"],
lexema: ["bland", "bland-"],
derivativos: ["re- + -ec-", "re + ec"],
tipo: ["parasintética", "parasintetica"]
},
explicacion: "reblandecer presenta afijos delante y detrás del lexema y *blandecer no existe en castellano."
},

{id:"EP-S-006",
tipo: "analisis",
pregunta: "Realiza un análisis completo.",
palabra: "niñas",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["flexivos", "Morfemas flexivos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["niñ- + -a + -s", "niñ + a + s"],
lexema: ["niñ", "niñ-"],
flexivos: ["-a + -s", "a + s"],
tipo: ["simple"]
},
explicacion: "niñ- es el lexema; -a indica género y -s número."
},

{id:"EP-S-007",
tipo: "analisis",
pregunta: "Analiza los constituyentes de «geología».",
palabra: "geología",
campos: [
["segmentacion", "Formantes"],
["geo", "Significado de geo-"],
["logia", "Significado de -logía"],
["tipo", "Tipo de formación"]
],
soluciones: {
segmentacion: ["geo- + -logía", "geo + logia"],
geo: ["tierra"],
logia: ["estudio"],
tipo: ["compuesto culto", "compuesta"]
},
explicacion: "geo- significa tierra y -logía se relaciona con estudio. geología es un compuesto culto: combina los formantes grecolatinos geo- («tierra») y -logía («estudio»)."
},

{id:"EP-S-008",
tipo: "analisis",
pregunta: "Analiza los formantes de «telescopio».",
palabra: "telescopio",
campos: [
["segmentacion", "Formantes"],
["tele", "Significado de tele-"],
["scopio", "Significado de -scopio"],
["tipo", "Tipo de formación"]
],
soluciones: {
segmentacion: ["tele- + -scopio", "tele + scopio"],
tele: ["lejos"],
scopio: ["observar", "observación"],
tipo: ["compuesto culto", "compuesta"]
},
explicacion: "tele- significa lejos y -scopio se relaciona con observar."
},

{id:"EP-S-009",
tipo: "analisis",
pregunta: "Analiza los constituyentes de «cardiopatía».",
palabra: "cardiopatía",
campos: [
["segmentacion", "Formantes"],
["cardio", "Significado de cardio-"],
["tipo", "Tipo de formación"]
],
soluciones: {
segmentacion: ["cardio- + -patía", "cardio + patia"],
cardio: ["corazón"],
tipo: ["compuesto culto", "compuesta"]
},
explicacion: "cardio- es un formante relacionado con el corazón."
},

{id:"EP-S-010",
tipo: "analisis",
pregunta: "Analiza «libros».",
palabra: "libros",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["flexivos", "Morfemas flexivos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["libr- + -o + -s", "libr + o + s"],
lexema: ["libr", "libr-"],
flexivos: ["-o + -s", "o + s"],
tipo: ["simple"]
},
explicacion: "libr- es el lexema; -o indica género y -s número."
},

{id:"EP-S-011",
tipo: "analisis",
pregunta: "Analiza «desafortunado».",
palabra: "desafortunado",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["des- + afortun- + -ad- + -o", "des + afortun + ad + o"],
lexema: ["afortun", "afortun-"],
derivativos: ["des- + -ad-", "des + ad"],
tipo: ["derivada"]
},
explicacion: "La palabra contiene un prefijo y un sufijo derivativos."
}

];

const reto = [

{id:"EP-S-012",
tipo: "analisis",
pregunta: "🏆 Reto de examen: realiza un análisis completo.",
palabra: "desigualdades",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["flexivos", "Morfemas flexivos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["des- + igual + -dad + -es", "des + igual + dad + es"],
lexema: ["igual"],
derivativos: ["des- + -dad", "des + dad"],
flexivos: ["-es", "es"],
tipo: ["derivada"]
},
explicacion: "des- y -dad son derivativos; -es es flexivo de número."
},

{id:"EP-S-013",
tipo: "analisis",
pregunta: "🏆 Reto de examen: realiza un análisis completo.",
palabra: "reblandecer",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["re- + bland- + -ec- + -er", "re + bland + ec + er"],
lexema: ["bland", "bland-"],
derivativos: ["re- + -ec-", "re + ec"],
tipo: ["parasintética", "parasintetica"]
},
explicacion: "Es parasintética porque presenta elementos a ambos lados del lexema y *blandecer no existe."
},

{id:"EP-S-014",
tipo: "analisis",
pregunta: "🏆 Reto de examen: realiza un análisis completo.",
palabra: "geología",
campos: [
["segmentacion", "Formantes"],
["geo", "Significado de geo-"],
["logia", "Significado de -logía"],
["tipo", "Tipo de formación"]
],
soluciones: {
segmentacion: ["geo- + -logía", "geo + logia"],
geo: ["tierra"],
logia: ["estudio"],
tipo: ["compuesto culto", "compuesta"]
},
explicacion: "geo- significa tierra y -logía se relaciona con estudio."
},

{id:"EP-S-015",
tipo: "analisis",
pregunta: "🏆 Reto de examen: realiza un análisis completo.",
palabra: "panecillos",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["especial", "Elemento especial"],
["flexivos", "Morfemas finales"],
["tipo", "Elemento especial"]
],
soluciones: {
segmentacion: ["pan- + -ec- + -ill- + -o + -s", "pan + ec + ill + o + s"],
lexema: ["pan", "pan-"],
especial: ["ec", "-ec", "-ec-"],
flexivos: ["-o + -s", "o + s"],
tipo: ["infijo", "elemento de enlace"]
},
explicacion: "pan- es el lexema; -ec- es un elemento de enlace o infijo."
},

{id:"EP-S-016",
tipo: "mcq",
pregunta: "Un alumno afirma: «reblandecer es derivada porque tiene un prefijo y un sufijo». ¿Qué debemos añadir para justificar que es parasintética?",
opciones: [
"Que tiene dos lexemas",
"Que al eliminar el prefijo, *blandecer no existe",
"Que tiene un morfema de plural",
"Que contiene un infijo"
],
correcta: 1,
explicacion: "Para reconocer la parasíntesis hay que comprobar que aparecen elementos a ambos lados del lexema y que, al eliminar el prefijo, la forma resultante no existe como palabra independiente."
},

{id:"EP-S-017",
tipo: "mcq",
pregunta: "¿Cuál de estas parejas contiene dos alomorfos del mismo lexema?",
opciones: [
"sueñ- / soñ-",
"re- / -ura",
"pan- / -ec-",
"geo- / -logía"
],
correcta: 0,
explicacion: "sueñ- y soñ- son dos formas diferentes de un mismo lexema; por eso son alomorfos."
},

{id:"EP-S-018",
tipo: "texto",
pregunta: "¿Qué significa el formante «cardio-»?",
palabra: "cardiopatía",
soluciones: ["corazon", "corazón"],
explicacion: "cardio- es un formante relacionado con el corazón."
},

{id:"EP-S-019",
tipo: "texto",
pregunta: "¿Qué significa «geo-» en «geología»?",
palabra: "geología",
soluciones: ["tierra"],
explicacion: "geo- significa tierra."
},

{id:"EP-S-020",
tipo: "mcq",
pregunta: "¿Cuál es el análisis correcto de «rojiblanco»?",
opciones: [
"Un lexema con dos morfemas flexivos",
"Dos lexemas unidos",
"Un prefijo y un lexema",
"Un prefijo, un lexema y un sufijo"
],
correcta: 1,
explicacion: "rojiblanco se forma mediante la unión de dos lexemas."
},

{id:"EP-S-021",
tipo: "mcq",
pregunta: "¿Cuál de estas afirmaciones distingue correctamente una sigla de un acrónimo?",
opciones: [
"Una sigla se pronuncia normalmente letra por letra; un acrónimo puede pronunciarse como una palabra",
"Una sigla siempre tiene dos letras; un acrónimo siempre tiene más de tres",
"Una sigla siempre es una palabra derivada; un acrónimo siempre es una palabra compuesta",
"No existe ninguna diferencia entre ambos"
],
correcta: 0,
explicacion: "La diferencia se aprecia en la pronunciación: las siglas suelen leerse letra por letra, como «ONG» («o-ene-ge»), mientras que los acrónimos pueden pronunciarse como palabras, como «ONU» («onu»)."
},

{id:"EP-S-022",
tipo: "mcq",
pregunta: "¿Por qué «ONG» es una sigla?",
opciones: [
"Porque se pronuncia como una palabra: «ong»",
"Porque se forma con iniciales y se pronuncia letra por letra: «o-ene-ge»",
"Porque contiene un prefijo y un sufijo",
"Porque une dos lexemas"
],
correcta: 1,
explicacion: "ONG procede de «Organización No Gubernamental» y se pronuncia letra por letra: «o-ene-ge». Por eso es una sigla."
},

{id:"EP-S-023",
tipo: "mcq",
pregunta: "¿Por qué «ONU» puede considerarse un acrónimo?",
opciones: [
"Porque se pronuncia como una palabra: «onu»",
"Porque se pronuncia letra por letra: «o-ene-u»",
"Porque contiene dos sufijos",
"Porque está formada por un único lexema"
],
correcta: 0,
explicacion: "ONU procede de «Organización de las Naciones Unidas» y se pronuncia como una palabra: «onu». Por eso funciona como acrónimo."
},

{id:"EP-S-024",
tipo: "mcq",
pregunta: "¿Qué diferencia fundamental hay entre un morfema flexivo y uno derivativo?",
opciones: [
"El flexivo expresa valores gramaticales y el derivativo puede modificar o matizar el significado",
"El derivativo siempre indica plural",
"El flexivo siempre es un prefijo",
"No existe diferencia"
],
correcta: 0,
explicacion: "Los flexivos expresan valores gramaticales; los derivativos son afijos no flexivos."
},

{id:"EP-S-025",
tipo: "analisis",
pregunta: "🏆 Reto de examen: analiza «inutilidad».",
palabra: "inutilidad",
campos: [
["segmentacion", "Segmentación"],
["lexema", "Lexema"],
["derivativos", "Afijos derivativos"],
["tipo", "Tipo de palabra"]
],
soluciones: {
segmentacion: ["in- + util + -idad", "in + util + idad"],
lexema: ["util", "útil"],
derivativos: ["in- + -idad", "in + idad"],
tipo: ["derivada"]
},
explicacion: "in- es prefijo derivativo; útil es el lexema y -idad es sufijo derivativo."
}

];
# Arquitectura de Docere et Delectare

## Principio
Web estática compatible con GitHub Pages. El objetivo es que añadir o corregir contenido afecte al mínimo número posible de archivos.

## Estructura
```text
Docere-et-Delectare/
├── index.html
├── morfologia.html
├── sintaxis.html
├── estructura-palabra.html
├── formacion-palabras.html
├── categorias-gramaticales.html
├── verbo.html
├── assets/
│   ├── css/core.css
│   └── js/
│       ├── core.js
│       ├── pages/{estructura-palabra,formacion-palabras,categorias-gramaticales,verbo,sintaxis}.js
│       └── data/{morfologia,sintaxis}/
│           └── sintaxis/taxonomia.js
├── scripts/validate.mjs
└── docs/ARQUITECTURA.md

En `assets/js/data/sintaxis/` viven `taxonomia.js`, `contrato-generacion.js`, `generador.js` y el lote piloto `generadas-ia.js`. El lote piloto está separado del banco curricular estable para poder probar la generación sin contaminar el contenido consolidado.
```

## Responsabilidades
- **core.js:** `normalizar`, `mezclar` e `irInicio`.
- **data/:** bancos de actividades y contenido educativo.
- **pages/*.js:** selección, renderizado, corrección y resultado de cada bloque; las páginas HTML contienen estructura y navegación, no lógica de aplicación.
- **páginas HTML:** estructura, navegación y carga de módulos.
- **core.css:** componentes globales.

El núcleo no contiene preguntas ni estado persistente.

## Estado
Se ha eliminado progreso personal, alias/perfil, ranking, historial y registro local de preguntas usadas. Las partidas son efímeras.

Si en el futuro se necesita historial o aprendizaje adaptativo, debe añadirse como una capa independiente y no mediante `localStorage` repartido por las páginas.

## Escalabilidad
1. Contenido → banco de datos.
2. Lógica exclusiva → página/módulo de la materia.
3. Utilidad transversal → `core.js`.
4. Interfaz global → `core.css`.

Añadir preguntas no debe exigir cambios en otras materias.

Cada banco admite sus alias históricos (`t`/`tipo`, `n`/`nivel`, `q`/`pregunta`, etc.) mientras el validador garantiza que los tipos realmente implementados coincidan con cada motor. No se introduce una capa de persistencia ni un contrato remoto.

## Taxonomía y generación futura

`assets/js/data/sintaxis/taxonomia.js` define la fuente de verdad curricular de Sintaxis: propósito de cada bloque, prerrequisitos, exclusiones, progresión de niveles 1–6, familias de contenido, pruebas sintácticas y restricciones de generación. No genera actividades ni sustituye al banco actual.

La IA generativa ya dispone de una vía de prueba controlada. `generadas-ia.js` contiene un lote piloto visible en la interfaz bajo **Laboratorio IA · Sintaxis**; sus actividades usan IDs `IA-SX-*` y se validan de forma independiente. Este laboratorio no sustituye el banco curricular estable. `contrato-generacion.js` fija además el contrato de entrada/salida y establece que ninguna salida de IA entra directamente en `BANCO`: debe pasar por generación → validación → revisión → asignación de ID → publicación. El flujo previsto es: **taxonomía → especificación → generación → validación lingüística/estructural → selección → revisión → publicación**. `generador.js` implementa ya la capa de especificación, construcción del prompt, validación de candidatos/lotes y filtrado de duplicados; queda deliberadamente desacoplado del proveedor IA. En particular, la taxonomía fija que los MCQ tengan una única respuesta válida, impide que el enunciado revele la respuesta y codifica las confusiones críticas (CR/CC, PVO/CC de modo, CD/CI, agente/CC, relativa/adverbial).

La generación remota no se ejecuta desde GitHub Pages ni expone claves en el navegador. `scripts/generate-sintaxis.mjs` funciona como adaptador seguro de proveedor compatible con la API configurada y reutiliza la taxonomía, el contrato y `generador.js`. `.github/workflows/generate-sintaxis.yml` permite lanzar manualmente lotes, validarlos y conservarlos como artefactos. La clave se suministra exclusivamente mediante el secreto `OPENAI_API_KEY`; ningún secreto se almacena en el repositorio. El flujo remoto es: **especificación → prompt → proveedor → validación → reparación si procede → lote validado**. La publicación en el banco estable sigue requiriendo revisión.

La puerta de entrada de Sintaxis se mantiene deliberadamente separada: `unidades` trabaja sintagmas y reconocimiento básico de oración simple; `simple` trabaja funciones; `compuesta` trabaja relaciones entre proposiciones; `reto` integra todos los contenidos.

## Validación
`scripts/validate.mjs` comprueba recursos, JavaScript, IDs, handlers, contratos de datos, niveles, respuestas, explicaciones, HTML, duplicados y cobertura de Sintaxis, además de detectar la reaparición de la infraestructura eliminada.

GitHub Actions valida cada push y pull request y usa `concurrency` para cancelar ejecuciones obsoletas. El workflow de generación de IA es manual y está aislado del despliegue.

## Regla de trabajo
Los cambios relacionados deben agruparse en un único commit funcional. No se deben hacer commits independientes para cada pequeño archivo.

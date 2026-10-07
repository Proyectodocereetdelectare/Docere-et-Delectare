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
│       └── data/{morfologia,sintaxis}/
├── scripts/validate.mjs
└── docs/ARQUITECTURA.md
```

## Responsabilidades
- **core.js:** `normalizar`, `mezclar` e `irInicio`.
- **data/:** bancos de actividades y contenido educativo.
- **páginas:** selección, renderizado, corrección y resultado de su bloque.
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

## Validación
`scripts/validate.mjs` comprueba recursos, JavaScript, IDs, handlers, contratos de datos, niveles, respuestas, explicaciones, HTML, duplicados y cobertura de Sintaxis, además de detectar la reaparición de la infraestructura eliminada.

GitHub Actions valida cada push y pull request y usa `concurrency` para cancelar ejecuciones obsoletas.

## Regla de trabajo
Los cambios relacionados deben agruparse en un único commit funcional. No se deben hacer commits independientes para cada pequeño archivo.

# Arquitectura de Docere et Delectare

## 1. Objetivo

El proyecto está diseñado para crecer durante mucho tiempo y añadir nuevos bloques, materias, niveles y tipos de actividad sin obligar a modificar todo el código existente.

La regla principal es:

> **El contenido educativo, el motor de actividades, la interfaz y la persistencia deben evolucionar de forma independiente siempre que sea posible.**

No se debe resolver una necesidad local modificando código global si esa necesidad pertenece a una sola materia o subapartado.

---

## 2. Árbol conceptual del proyecto

```text
Docere-et-Delectare/
│
├── index.html                         # Inicio global
├── progreso.html                      # Perfil, progreso y ranking
│
├── morfologia.html                    # Índice del bloque de Morfología
├── sintaxis.html                      # Índice del bloque de Sintaxis
│
├── estructura-palabra.html             # Actividad: Estructura de la palabra
├── formacion-palabras.html             # Actividad: Formación de palabras
├── categorias-gramaticales.html        # Actividad: Categorías gramaticales
├── verbo.html                          # Actividad: El verbo
│
├── literatura.html                     # Futuro
├── comunicacion.html                   # Futuro
├── lexica-semantica.html               # Futuro
├── ortografia.html                     # Futuro
│
├── assets/
│   ├── css/
│   │   ├── base.css                    # Estilos globales
│   │   ├── components.css              # Componentes reutilizables
│   │   └── activities.css              # Interfaz común de actividades
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── app.js                  # Inicialización común
│   │   │   ├── navigation.js           # Navegación
│   │   │   ├── identity.js             # Alias e identidad anónima
│   │   │   ├── storage.js              # Persistencia local
│   │   │   └── progress.js             # Progreso y estadísticas
│   │   │
│   │   ├── engine/
│   │   │   ├── activity-engine.js      # Ciclo de una actividad
│   │   │   ├── session.js              # Construcción de sesiones
│   │   │   ├── feedback.js             # Corrección y feedback
│   │   │   └── renderers.js             # Representación de tipos
│   │   │
│   │   └── modules/
│   │       ├── morfologia/
│   │       │   ├── estructura-palabra.js
│   │       │   ├── formacion-palabras.js
│   │       │   ├── categorias-gramaticales.js
│   │       │   └── verbo.js
│   │       ├── sintaxis/
│   │       │   └── sintaxis.js
│   │       ├── literatura/
│   │       ├── comunicacion/
│   │       ├── lexica-semantica/
│   │       └── ortografia/
│   │
│   └── data/
│       ├── morfologia/
│       │   ├── estructura-palabra/
│       │   │   └── actividades.js
│       │   ├── formacion-palabras/
│       │   │   └── actividades.js
│       │   ├── categorias-gramaticales/
│       │   │   └── actividades.js
│       │   └── verbo/
│       │       └── actividades.js
│       ├── sintaxis/
│       ├── literatura/
│       ├── comunicacion/
│       ├── lexica-semantica/
│       └── ortografia/
│
└── docs/
    └── ARQUITECTURA.md                 # Este documento
```

> El árbol anterior es el **objetivo arquitectónico**. La migración se hará por fases para no romper las páginas actuales.

---

## 3. Regla de separación

Cada actividad debe responder a cuatro preguntas distintas:

### A. Datos
¿Qué se pregunta?

Ejemplo:

```js
{
  id: "FP-L4-023",
  nivel: 4,
  tipo: "analysis",
  pregunta: "...",
  respuesta: "...",
  explicacion: "..."
}
```

### B. Motor
¿Cómo se selecciona, muestra, corrige y guarda?

Esto pertenece al motor común, no a la actividad concreta.

### C. Módulo
¿Qué particularidades tiene esta materia?

Por ejemplo, Sintaxis puede necesitar un tipo de actividad `drag` o `chain` que no sea necesario en Morfología.

### D. Página
¿Dónde aparece visualmente?

La página debe ser principalmente una estructura de interfaz y un punto de entrada.

---

## 4. Jerarquía educativa

La arquitectura debe permitir crecer verticalmente:

```text
Área
└── Bloque
    └── Subbloque
        └── Sección
            └── Actividad
                └── Tipo de actividad
```

Ejemplo:

```text
Lengua
└── Morfología
    └── Estructura de la palabra
        ├── Identifica
        ├── Clasifica elementos
        ├── Analiza
        └── Reto final
            └── Actividades
```

Si en el futuro aparece:

```text
Estructura de la palabra
└── Morfemas
    ├── Lexemas
    ├── Flexivos
    ├── Derivativos
    └── Alomorfos
```

se añadirá ese nivel sin tener que reorganizar el resto del sistema.

---

## 5. Regla de independencia

Un cambio en un subbloque debe afectar únicamente a:

1. sus datos;
2. su módulo específico, si necesita lógica propia;
3. su interfaz específica, si realmente la necesita.

Ejemplo:

> Añadir 150 preguntas nuevas a Formación de palabras **no debe obligar a modificar el motor de actividades ni Sintaxis**.

Otro ejemplo:

> Crear un nuevo tipo de actividad para Sintaxis **no debe obligar a modificar las preguntas de Morfología**.

---

## 6. Código común frente a código específico

### Código común

Debe estar centralizado:

- navegación global;
- alias e identidad;
- almacenamiento;
- progreso;
- estadísticas;
- ciclo general de una sesión;
- contador de preguntas;
- barra de progreso;
- botones Comprobar / Adelante / Siguiente;
- resultados;
- reutilización de componentes;
- utilidades generales.

### Código específico

Debe permanecer en su módulo:

- preguntas;
- soluciones;
- explicaciones;
- criterios de aceptación;
- tipos de actividad propios;
- reglas didácticas particulares;
- selección especial que responda a la estructura de ese bloque.

---

## 7. Regla contra el código espagueti

No se debe:

- copiar una función común para modificarla ligeramente;
- crear una segunda versión de una función que ya existe;
- introducir lógica de otro bloque dentro de una página;
- usar selectores globales ambiguos;
- depender de variables globales con nombres genéricos;
- mezclar datos de actividades con la lógica de renderizado;
- hacer que una actividad conozca detalles internos de otra;
- modificar varios bloques para resolver una necesidad exclusiva de uno.

Antes de añadir una función nueva se debe preguntar:

> **¿Esto es una capacidad del sistema o una particularidad de este bloque?**

Si es del sistema, va al núcleo común.

Si es del bloque, va al módulo del bloque.

---

## 8. Identificación estable de contenidos

Las actividades deberán disponer de identificadores estables.

Formato recomendado:

```text
[BLOQUE]-[SECCIÓN]-[NIVEL]-[ID]
```

Ejemplos:

```text
FP-L4-023
CG-L2-011
VB-L6-034
SX-L5-017
```

Esto permitirá posteriormente:

- historial;
- estadísticas por actividad;
- detección de preguntas repetidas;
- revisión de errores;
- analítica;
- actualización de contenido;
- migración de datos.

El identificador no debe depender de la posición que ocupe la pregunta dentro de un array.

---

## 9. Niveles

No se debe confundir:

- **nivel de dificultad de una actividad**
- **nivel de dominio del alumno**

Son entidades distintas.

Una actividad puede tener:

```js
nivel: 5
```

mientras que el dominio del alumno se almacenará en el sistema de progreso.

Esto permitirá desarrollar posteriormente aprendizaje adaptativo sin tener que rehacer las actividades existentes.

---

## 10. Persistencia

Las claves de almacenamiento deben estar centralizadas y documentadas.

No se deben crear claves `localStorage` arbitrarias desde cada página.

Arquitectura prevista:

```text
storage
├── identidad
├── perfil
├── progreso
├── historial
├── ranking local
└── configuración
```

El futuro backend global podrá sustituir o complementar esta capa sin obligar a modificar las actividades.

---

## 11. Compatibilidad con GitHub Pages

La arquitectura debe seguir siendo compatible con una aplicación estática.

Por tanto:

- no se dependerá de un servidor Node para ejecutar la aplicación;
- los módulos JavaScript usarán ES Modules cuando se haga la migración;
- los datos podrán mantenerse inicialmente en archivos JavaScript/JSON estáticos;
- un backend futuro se conectará a través de una capa de persistencia independiente.

---

## 12. Estrategia de migración

No se debe hacer una refactorización masiva de golpe.

### Fase 1 — Arquitectura
Definir carpetas, responsabilidades, identificadores y contratos de datos.

### Fase 2 — Núcleo común
Extraer navegación, identidad, almacenamiento y progreso.

### Fase 3 — Motor
Extraer el ciclo común de las actividades.

### Fase 4 — Datos
Separar progresivamente los bancos de preguntas de la interfaz.

### Fase 5 — Módulos
Cada bloque queda como módulo independiente.

### Fase 6 — Nuevos bloques
Literatura, Comunicación, Léxico y semántica y Ortografía se construyen directamente sobre esta arquitectura.

### Fase 7 — Evolución
Adaptación, logros, ranking global, panel docente y backend se incorporarán como capas independientes.

---

## 13. Regla de oro para futuras modificaciones

Antes de modificar código se debe determinar:

1. **¿Qué nivel del árbol estoy modificando?**
2. **¿Es una necesidad local o común?**
3. **¿Qué archivos deberían cambiar realmente?**
4. **¿Qué archivos NO deberían cambiar?**
5. **¿Puedo añadirlo sin duplicar lógica?**
6. **¿El cambio sigue funcionando si mañana añadimos otro bloque?**

Si una modificación pequeña exige tocar muchas áreas no relacionadas, se considera una señal de mala arquitectura y debe revisarse antes de continuar.

---

## 14. Estado actual

La primera capa de la arquitectura ya está implantada:

- `assets/js/core.js`: utilidades compartidas, identidad anónima, alias, navegación y lectura segura de almacenamiento.
- `assets/css/core.css`: estilos compartidos de navegación.
- `assets/js/data/`: bancos de actividades separados de las páginas HTML.
- Las páginas conservan su motor didáctico específico, pero ya no contienen los grandes bancos de preguntas.
- `progreso.html` reutiliza el núcleo común para identidad y almacenamiento.
- Las rutas públicas de las páginas se mantienen para no romper enlaces existentes.

La migración continuará por capas: primero responsabilidades comunes, después motores reutilizables y, cuando sea necesario, renderizadores y componentes. No se hará una reescritura masiva que obligue a modificar simultáneamente todo el proyecto.

### Principio de compatibilidad durante la migración

Durante la transición puede coexistir código específico de una página con el núcleo común. Esto es deliberado: cada extracción debe comprobarse antes de eliminar la implementación anterior. El objetivo es reducir acoplamiento progresivamente, no sustituir todo el sistema de una vez.

El objetivo no es que el proyecto tenga más archivos por tener más archivos.

El objetivo es que cada responsabilidad tenga **un lugar claro, estable y reutilizable**.

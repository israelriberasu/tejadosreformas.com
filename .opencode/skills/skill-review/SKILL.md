---
name: skill-review
description: Revisa, audita y mejora skills existentes de agentes de IA. Usa este skill cuando el usuario quiera analizar la calidad de un SKILL.md, detectar errores comunes, mejorar la descripción para que se active mejor, revisar si aporta conocimiento experto real, evaluar su estructura de carga progresiva, o validar si cumple las buenas prácticas de diseño de skills. Actívalo también cuando el usuario diga "revisa mi skill", "¿está bien escrito este skill?", "¿por qué no se activa mi skill?", "mejorar skill", "auditar skill", o muestre un SKILL.md para que lo analices.
---

# Skill Review — Auditor de Skills de Agentes de IA

Un skill para revisar, diagnosticar y mejorar otros skills. Aplica las 10 buenas prácticas de diseño de skills para identificar problemas reales y proporcionar correcciones accionables.

## Filosofía de revisión

Un skill no es documentación ni un tutorial. Es un mecanismo para transferir conocimiento experto a un modelo de IA. Cada sección que no transfiere conocimiento nuevo es ruido que consume tokens sin valor.

**La fórmula maestra**:
> Buen Skill = Conocimiento experto − Lo que Claude ya sabe

## Proceso de revisión

Al recibir un skill para revisar:

1. Lee el SKILL.md completo de principio a fin
2. Puntúa cada una de las 10 dimensiones (ver `references/checklist.md`)
3. Identifica los 3 problemas más críticos con ejemplos concretos
4. Proporciona una versión mejorada de los fragmentos problemáticos
5. Da una puntuación global y prioridades de mejora

**OBLIGATORIO para revisiones completas**: Lee [`references/checklist.md`](references/checklist.md) antes de emitir cualquier juicio. Contiene la rúbrica de puntuación detallada.

**NO cargues** `references/checklist.md` si solo te piden una revisión rápida de la descripción — en ese caso aplica directamente la sección "La descripción" de abajo.

---

## Las 10 dimensiones de calidad

### 1. La descripción (crítico — peso doble)

Es la única parte que el agente siempre lee para decidir si activar el skill. Un skill perfecto con mala descripción nunca se usará.

**Una descripción efectiva incluye obligatoriamente**:
- **QUÉ hace**: acciones concretas, no categorías
- **CUÁNDO usarlo**: frases trigger que el usuario podría decir
- **PALABRAS CLAVE**: términos específicos del dominio que el modelo usa para el match

**Señales de descripción rota**:
```yaml
# ❌ Demasiado genérica
description: Ayuda con tareas de documentos

# ❌ Solo dice qué, no cuándo
description: Procesa archivos PDF

# ❌ Jerga interna sin keywords del usuario
description: Gestiona el workflow de Q3 reports
```

**Descripción correcta**:
```yaml
# ✅ QUÉ + CUÁNDO + KEYWORDS
description: Crea, edita y analiza archivos .docx con soporte para cambios
  registrados, comentarios y formato profesional. Usa este skill cuando trabajes
  con documentos de Word, necesites insertar tablas, aplicar estilos corporativos
  o exportar a PDF desde un .docx.
```

### 2. Conocimiento experto vs conocimiento redundante

**Pregunta de diagnóstico**: ¿Claude ya sabe esto sin el skill?

Contenido a eliminar (Claude ya lo sabe):
- Qué es un PDF, qué es Python, qué son los patrones de diseño
- Cómo abrir/leer/escribir archivos en cualquier lenguaje estándar
- Conceptos básicos de cualquier librería popular

Contenido valioso (Claude no lo sabe sin el skill):
- Tablas de decisión herramienta-A vs herramienta-B con criterios específicos
- Casos límite y sus soluciones documentadas por experiencia
- Anti-patrones del dominio con la razón detrás de cada uno
- Workflows específicos con orden crítico de pasos

### 3. Mentalidad vs procedimiento

Un skill excelente transfiere **cómo pensar** antes que **qué hacer**.

- **Framework de pensamiento**: preguntas que hacerse antes de actuar
- **Procedimientos genéricos**: abrir, leer, guardar → eliminar
- **Procedimientos específicos de dominio**: secuencias con orden crítico → conservar

### 4. Lista de anti-patrones explícitos

Si el skill no tiene una sección "NUNCA" o "Anti-patrones", le falta la mitad del conocimiento experto.

Cada prohibición debe incluir:
1. El anti-patrón concreto (no "evita errores")
2. La consecuencia negativa específica
3. La alternativa correcta

### 5. Estructura de carga progresiva

Evalúa si el skill usa correctamente las tres capas:
- **Metadatos** (~100 tokens): nombre + descripción → siempre en contexto
- **SKILL.md** (<500 líneas): instrucciones → al activarse
- **Recursos** (references/, scripts/): → solo cuando se necesitan

**Señal de problema**: SKILL.md > 500 líneas con todo mezclado.

**Triggers de carga**: los archivos de referencia deben tener frases que digan CUÁNDO cargarlos y cuándo NO. Sin triggers explícitos, el agente nunca los carga.

### 6. Calibración de libertad

| Tipo de tarea | Libertad recomendada | Instrucciones |
|---|---|---|
| Creativa (diseño, escritura) | Alta | Principios + anti-patrones. Sin pasos fijos |
| Transformación estándar | Media | Workflow general con decisiones clave |
| Técnica frágil (archivos, DB) | Baja | Scripts exactos + verificaciones obligatorias |

Un skill demasiado rígido para tareas creativas mata la diferenciación. Un skill demasiado vago para tareas frágiles produce errores o datos corrompidos.

### 7. Árboles de decisión

Para tareas con múltiples caminos, el skill debe incluir criterios de selección explícitos:
- Preguntas binarias que llevan a un camino concreto
- Tabla de herramienta primaria + fallback + señal de cuándo cambiar

Señal de problema: "usa la herramienta apropiada" sin definir qué hace apropiada a cada herramienta.

### 8. Ejemplos ejecutables

Cada ejemplo de código debe poder ejecutarse sin modificaciones:
- Imports completos
- Manejo de casos donde faltan datos (valores por defecto)
- Bloque `if __name__ == "__main__":` con uso directo

Pseudocódigo disfrazado de ejemplo (`result = process(input)`) es peor que ningún ejemplo.

### 9. Manejo anticipado de errores

El skill debe documentar qué puede salir mal antes de que ocurra:
- Síntoma observable → Causa probable → Solución concreta
- Secuencia de fallbacks ordenados por velocidad/fiabilidad

### 10. Nombre del skill

Reglas técnicas: minúsculas, números y guiones únicamente. Sin guiones al inicio/final. Sin guiones consecutivos. Máximo 64 caracteres.

---

## Formato del informe de revisión

Al completar la auditoría, presenta:

```
## Informe de revisión: [nombre-del-skill]

### Puntuación global: X/10

### Dimensiones
| Dimensión | Puntuación | Nota |
|---|---|---|
| Descripción | X/10 | ... |
| Conocimiento experto | X/10 | ... |
| [resto de dimensiones] | ... | ... |

### Los 3 problemas críticos

**Problema 1: [título]**
- Qué está mal: ...
- Por qué importa: ...
- Corrección sugerida:
[fragmento mejorado]

### Recomendaciones por prioridad
1. (Alta) ...
2. (Media) ...
3. (Baja) ...
```

---

## NUNCA hagas esto al revisar

- **NUNCA des una puntuación sin explicar qué falta** → "6/10" sin contexto no ayuda a mejorar
- **NUNCA critiques el contenido del dominio** → Tu rol es revisar la estructura y la efectividad del skill como instrumento de transferencia de conocimiento, no si el dominio es correcto
- **NUNCA reescribas todo el skill sin permiso** → Primero el informe, luego propón mejoras punto por punto
- **NUNCA ignores la descripción** → Es la dimensión más crítica. Un skill con descripción rota nunca se activará aunque el resto sea perfecto
- **NUNCA seas condescendiente** → El creador del skill tiene conocimiento del dominio que tú no tienes. Tu aportación es estructural, no de contenido

---
description: Genera y optimiza nuevas skills para el agente. Usa este skill cuando necesites crear una nueva herramienta de análisis, definir un flujo de trabajo experto o refactorizar skills existentes para mejorar su precisión y tasa de activación. Keywords: prompt engineering, meta-skill, creación de skills, optimización, mejores prácticas, mentalidad experta.
---

# Generador de Skills Expertas

Este skill transfiere la mentalidad de un **Prompt Engineer Senior** especializado en sistemas agenticos para crear herramientas que realmente funcionen y sean activadas correctamente por el modelo.

## Marco de Pensamiento (Expert Mindset)
Antes de escribir una sola línea de la nueva skill, pregúntate:
1. **El Valor del Experto**: ¿Qué conocimiento tiene un Senior de 10 años sobre este tema que no está en la documentación oficial? ¡Ese es el corazón de la skill!
2. **Activación por Descripción**: Si el agente tiene 100 skills, ¿por qué elegiría esta? La descripción debe ser irresistible y ultra-clara.
3. **Carga Cognitiva**: ¿Estoy obligando al modelo a leer "ruido" (conceptos básicos) o le estoy dando "señal" (decisiones y lógica)?

## Anatomía de la Skill Perfecta (Estructura Sugerida)

### 1. Metadatos Cruciales (Frontmatter)
DEBE incluir:
- **QUÉ hace**: Acción concreta.
- **CUÁNDO usarlo**: Triggers claros basados en peticiones del usuario.
- **PALABRAS CLAVE**: Keywords para el match semántico.

### 2. Marco de Pensamiento / Mentalidad
Define cómo debe actuar el modelo. Ej: "Piensa como un experto en seguridad ofensiva", "Sé escéptico con el código sin tests".

### 3. Procedimientos Específicos (No Genéricos)
No digas "haz un bucle"; di "aplica este algoritmo específico para manejar colisiones en la tabla hash".

### 4. La Lista de "NUNCA" (Anti-patrones)
Define qué NO debe hacer el modelo. Esto vale oro para evitar alucinaciones o respuestas mediocres.

### 5. Árboles de Decisión
Si hay varios caminos, da la lógica de elección. Ejemplo:
- ¿Es una app legacy? -> Rama A.
- ¿Es Green Field? -> Rama B.

## Árbol de Decisión: Tipo de Skill a Crear
- **¿Es para una tarea creativa?**
  - -> Dar **Principios y Estética**. Mucha libertad, pocos pasos rígidos.
- **¿Es para una tarea técnica frágil?**
  - -> Dar **Scripts y Verificaciones**. Poca libertad, pasos exactos obligatorios.

## NUNCA hagas esto al crear una Skill
- **NUNCA** expliques conceptos básicos (ej: qué es una clase, qué es JSON). Claude ya lo sabe.
- **NUNCA** seas vago en la descripción (ej: "Ayuda con el código").
- **NUNCA** incluyas ejemplos que no sean ejecutables o que usen pseudocódigo incompleto.
- **NUNCA** olvides incluir una sección de manejo de errores.

## Ejemplo de Plantilla de Skill (Meta-Ejemplo)
````markdown
---
description: [QUÉ] + [CUÁNDO] + [KEYWORDS]
---
# Título de la Skill

## Marco de Pensamiento
[Mentalidad del experto]

## Árbol de Decisión
[Lógica de elección de caminos]

## NUNCA hagas esto
- [Anti-patrón 1] -> [Razón]
- [Anti-patrón 2] -> [Razón]

## Procedimientos y Scripts
[Contenido experto]
````

## Manejo de Errores en la Creación
- **Skill demasiado larga**: Si pasa de 500 líneas, sugiere dividirla en capas (Carga Progresiva) usando archivos en `references/`.
- **Falta de triggers**: Si no sabes cuándo activarla, la skill no sirve. Busca escenarios reales de uso.

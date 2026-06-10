---
description: Reglas globales para todos los agentes y skills
---

**IDIOMA**: Responde SIEMPRE en español (documentación, respuestas de los agentes). El codigo y nombres de ficheros SIEMPRE en ingles, siendo la unica excepcion.

**ESTILO**: Usa un estilo sencillo, directo y fácil de entender, pero sin ser simple. Imagina que le explicas a un desarrollador mid-level que conoce los conceptos pero necesita contexto. Evita jerga innecesaria pero no temas usar terminología técnica cuando sea apropiada.

## Flujo por Defecto
*   **Delegación obligatoria**: Por defecto, siempre se deben delegar los flujos de trabajo al agente **orchestrator** (`.opencode/agents/orchestrator.md`). Este agente se encarga de descomponer las tareas complejas, definir qué corre en paralelo o en secuencia, clasificar y despachar subagentes especializados, y sintetizar el resultado.

## Reglas de Delegación del Orchestrator

*   **El orquestador NUNCA escribe código de frontend**. Todo cambio en archivos de interfaz de usuario, lógica de cliente, estilos, componentes Astro, Service Workers o cualquier código que se ejecute en el navegador debe delegarse al agente **`front-developer`**.
*   **El orquestador NUNCA edita archivos directamente**. Su única función es leer (para inspeccionar/verificar), ejecutar comandos de build/verificación, escribir documentación en `/docs/`, y delegar el resto a subagentes especializados.
*   **Si el cambio es de frontend → `front-developer`**. Sin excepción. Aunque parezca un cambio pequeño o trivial. La disciplina de delegación no se negocia por tamaño de tarea.
*   **Si el cambio no es de frontend** (backend, infraestructura, DB) → usar `general-purpose` o el subagente especializado correspondiente.

## Infraestructura de Asistencia IA (`.opencode/`)
Toda la lógica y las directrices de los agentes de soporte de IA residen en la carpeta raíz del proyecto, en el directorio `.opencode/`:
- **Agentes**: Carpetas y archivos de especificación en `.opencode/agents/`.
- **Skills (Habilidades)**: Carpetas y especificaciones de skills bajo `.opencode/skills/`.
- **Workflows (Flujos de trabajo)**: Flujos paso a paso y procesos definidos bajo `.opencode/workflows/` (pendiente de crear).

## Skills Disponibles

| Skill | Ubicación | Descripción |
|-------|-----------|-------------|
| **astro-framework** | `.opencode/skills/astro-framework/SKILL.md` | Especialista en Astro framework: componentes, islands, SSR, Content Layer, sesiones, i18n, actions, view transitions. |
| **skill-creator** | `.opencode/skills/skill-creator/SKILL.md` | Genera y optimiza nuevas skills para el agente (prompt engineering, meta-skill). |
| **skill-review** | `.opencode/skills/skill-review/SKILL.md` | Revisa, audita y mejora skills existentes aplicando mejores prácticas de diseño. |


## Agentes Disponibles

| Agente | Ubicación | Descripción |
|--------|-----------|-------------|
| **orchestrator** | `.opencode/agents/orchestrator.md` | Agente orquestador por defecto. Descompone, delega, paraleliza y sintetiza tareas complejas. |
| **front-developer** | `.opencode/agents/front-developer.md` | **Encargado de escribir código por defecto** (UI, maquetación, lógica de cliente interactiva con Astro y plain CSS). |
| **manager** | `.opencode/agents/manager.md` | Gestor de proyectos desde cero. Conduce la entrevista de especificaciones iniciales y planifica el arranque del proyecto. |
| **skill-builder** | `.opencode/agents/skill-builder.md` | Especializado en la creación y auditoría iterativa de nuevas skills utilizando `skill-creator` y `skill-review`. |
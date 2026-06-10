# TejadosReformas — instrucciones para el agente

## Proyecto

TejadosReformas: [Agregar descripcion]

**Idioma**: todo en español (UI, respuestas del agente), codigo en ingles (ver `.opencode/rules.md`).

**Documento de especificaciones completo**: ver `ESPECIFICACIONES.md` en la raíz.

## Comandos exactos

| Comando | Qué hace |
|---|---|
| `npm run dev` | `astro dev --host 0.0.0.0 --port 4321` |
| `npm run build` | `astro build` → `dist/` |
| `npm run preview` | `astro preview --host 0.0.0.0 --port 4321` |
| `npm run lint` | `astro check` (type-check de Astro, **no ESLint**) |
| `npm run clean` | `rm -rf dist` |

No existe test runner, test directory ni suite de tests.

## `.opencode/` — Skills, Agentes y Workflows

Este directorio contiene infraestructura de asistencia AI, no código de la aplicación:

- `.opencode/skills/` — Skills (archivos SKILL.md)
- `.opencode/agents/` — Subagentes (archivos `.md` individuales con especificación)
- `.opencode/rules.md` — Reglas globales (idioma, estilo)

## Añadir nuevo agente o skill

1. Crear en `.opencode/agents/[nombre].md` o `.opencode/skills/[nombre]/SKILL.md`
2. Actualizar este archivo
3. Registrar en `.opencode/rules.md`

## Entorno

- Devcontainer: puerto 4321
- Post-create: `"if [ -f package.json ]; then npm install --no-audit --no-fund; else echo 'No package.json found. Ready to create Astro app!'; fi"`

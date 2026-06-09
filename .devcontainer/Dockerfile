FROM ghcr.io/pakeating/devcontainerregistry/astro-opencode:latest

# Copiar configuración de gentle-ai (skills SDD, commands, orchestrator)
COPY --chown=node:node gentle/config /home/node/.config/opencode

# Instalar dependencias de plugins (skills globales, TUI, etc.)
RUN cd /home/node/.config/opencode && npm install --no-audit --no-fund --loglevel=error

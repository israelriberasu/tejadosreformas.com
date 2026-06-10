FROM mcr.microsoft.com/devcontainers/javascript-node:20

# 1. Instalar opencode-ai y astro de forma global
RUN npm install -g opencode-ai create-astro astro

# 2. Configurar opencode de forma interna
USER node
RUN mkdir -p /home/node/.config/opencode && \
    cd /home/node/.config/opencode && \
    echo '{"private":true}' > package.json && \
    npm install --no-audit --no-fund --loglevel=error --prefix .
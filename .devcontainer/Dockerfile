FROM mcr.microsoft.com/devcontainers/javascript-node:20

RUN npm install -g opencode-ai

COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

RUN rm -f package.json package-lock.json*

# Instalar dependencias de plugins (skills globales, TUI, etc.)
RUN cd /home/node/.config/opencode && npm install --no-audit --no-fund --loglevel=error

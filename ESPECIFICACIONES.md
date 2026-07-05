# Especificaciones del proyecto: TejadosReformas

## 1. Resumen ejecutivo

- **Propósito y problema que resuelve:** Landing page de alta conversión para una empresa de construcción, reparación de tejados y multiservicios que opera en la provincia de Burgos. La página permite a potenciales clientes conocer los servicios, resolver dudas y solicitar presupuestos sin fricción, maximizando la captación de leads locales.
- **Actores principales:** Usuarios particulares y empresas de la provincia de Burgos que necesitan reparación de tejados, reformas integrales, fontanería, electricidad o pequeños arreglos domésticos.
- **Alcance del MVP:** Landing page de una sola página (single-page) con generación estática (SSG) que incluye: Hero con CTAs, servicios detallados (tejados + multiservicios), pilares de confianza, testimonios locales, FAQ con Schema.org, formulario de captación y footer con datos de contacto y área de cobertura. No hay back-end propio; el formulario utiliza un servicio externo de captación de leads.
- **Fases futuras:** No definidas. El MVP constituye el producto completo inicial.

## 2. Stack tecnológico

| Capa | Tecnología | Versión mínima | Justificación |
|---|---|---|---|
| Framework frontend | Astro | 5.x | Generación de sitio estático (SSG), rendimiento nativo, cero JavaScript en carga inicial |
| Adapter de despliegue | @astrojs/cloudflare | 12.x | Adapter oficial para Cloudflare Pages, permite prerenderizado estático + worker opcional |
| Maquetación y estilos | CSS puro (vanilla) | — | Prohibición expresa de frameworks UI; se usan variables CSS nativas para mantener la paleta corporativa |
| Interactividad | JavaScript vanilla | ES6+ | Interacciones mínimas (menú hamburguesa, scroll suave); no se requiere framework JS |
| Tipografía | Google Fonts (Inter / Roboto) o sistema Sans-Serif | — | Aspecto limpio, moderno y corporativo; carga optimizada desde Google Fonts o fallback del sistema |
| Procesamiento de formularios | Formspree / Getform / Netlify Forms | — | Servicio externo sin servidor para recibir leads por correo electrónico; no hay back-end propio |
| Control de versiones | Git + GitHub | — | Repositorio para colaboración y despliegue |
| Despliegue | Cloudflare Pages | — | Hosting estático en el edge de Cloudflare con integración directa desde GitHub. Adapter @astrojs/cloudflare maneja el prerenderizado estático y genera `_routes.json` automáticamente |

## 3. Arquitectura

### Diagrama de capas

```
┌──────────────────────────────────────────────────┐
│              Navegador (Cliente)                  │
│  HTML semántico │ CSS variables │ JS vanilla      │
└──────────────────────┬───────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────┐
│              Astro SSG (Build time)               │
│  ├── Layout base (Head, SEO meta, Schema.org)    │
│  ├── Header (logo, nav, hamburger)               │
│  ├── Hero Section (H1, CTAs)                     │
│  ├── Services (tejados + multiservicios)         │
│  ├── Value Props (confianza)                     │
│  ├── Testimonials (prueba social)                │
│  ├── FAQ (con Schema FAQPage)                    │
│  ├── Footer / Formulario                         │
│  └── WhatsApp floating button                    │
└──────────────────────┬───────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────┐
│              Servicios externos                   │
│  ├── Formspree / Getform / Netlify Forms         │
│  │   (recepción de leads del formulario)         │
│  └── Google Fonts CDN (tipografía)               │
└──────────────────────────────────────────────────┘
```

### Patrón arquitectónico

- **Static Site Generation (SSG):** Toda la página se compila a HTML plano en tiempo de build. No hay servidor en tiempo de ejecución. Cada sección es un componente `.astro` que se ensambla en una única página.
- **One-page / Single-page application con anclajes:** Navegación mediante enlaces de ancla (`href="#seccion"`) con scroll suave nativo CSS.
- **Islas (Islands Architecture):** No se requiere hidratación de componentes del lado del cliente. El único JavaScript es un script vanilla mínimo para el menú hamburguesa.

### Comunicación entre componentes

- Los componentes `.astro` se comunican mediante props y slots durante el build. No hay comunicación en tiempo de ejecución entre componentes.
- Los enlaces de CTA (teléfono, WhatsApp) usan protocolos nativos (`tel:`, `https://wa.me/`).
- El formulario envía datos a un endpoint externo mediante petición HTTP POST estándar.

## 4. Funcionalidades

### 4.1 MVP

| ID | Funcionalidad | Actor | Flujo principal | Casos de error |
|---|---|---|---|---|
| F-001 | Hero con valoración inmediata | Visitante | El usuario accede a la página y en <3s identifica: qué hace la empresa, dónde opera (provincia de Burgos) y cómo contactar | Carga lenta de recursos (imágenes, fuentes) |
| F-002 | Llamada telefónica directa | Visitante | Usuario pulsa el botón "Llamar Ahora" y se inicia la llamada vía `tel:` en el dispositivo | Dispositivo sin capacidad telefónica (tablet sin SIM); se muestra el número sin enlace |
| F-003 | Contacto por WhatsApp | Visitante | Usuario pulsa botón flotante de WhatsApp, se abre la app con mensaje predefinido | Dispositivo sin WhatsApp instalado; redirige a versión web |
| F-004 | Visualización de servicios de tejados | Visitante | Usuario navega a la sección "Especialistas en Tejados" y ve los subservicios: reparación de goteras, impermeabilización (poliuretano líquido, membrana sistemática, fibra de vidrio), rehabilitación completa, limpieza y mantenimiento de tu tejado (limpieza de canalones, desatasco de valles/bajantes, revisión/reparación de cumbreras, pintado con poliuretano y fibra de vidrio, sustitución de tejas, revisión de ventanas de tejados) | Contenido no carga por error en assets |
| F-005 | Visualización de multiservicios | Visitante | Usuario navega a "Reformas del Hogar" y ve las categorías: albañilería, fontanería (urgencias 24h), electricidad (urgencias 24h), servicio de manitas (jardinería, limpiezas de obra, pequeñas mudanzas con furgonetas) | Contenido no carga por error en assets |
| F-006 | Testimonios locales | Visitante | Usuario ve testimonios reales con nombre y ubicación dentro de la provincia de Burgos | Ausencia de testimonios si no se insertan datos |
| F-007 | FAQ interactiva | Visitante | Usuario lee preguntas frecuentes con respuestas; los datos están marcados con Schema FAQPage para rich snippets en Google | Schema mal formado no visible al usuario pero penaliza SEO |
| F-008 | Formulario de presupuesto | Visitante | Usuario completa nombre, teléfono, localización, tipo de servicio y mensaje, y envía la solicitud | Validación de campo obligatorio (teléfono); error 4xx/5xx del servicio externo |
| F-009 | Menú de navegación responsive | Visitante | En desktop ve enlaces horizontales; en móvil (<768px) ve botón hamburguesa que despliega el menú | JavaScript deshabilitado: el menú hamburguesa no funciona; se muestra menú estático |
| F-010 | Pilares de confianza | Visitante | Usuario ve 4 valores (presupuestos ajustados a tu medida, garantía de calidad, compromiso de limpieza y plazos, técnicos homologados) que mitigan objeciones | Contenido no carga |
| F-011 | Énfasis en urgencias 24/7 | Visitante | El usuario ve destacado que se atienden pequeñas reparaciones de fontanería y electricidad las 24 horas del día, los 365 días del año | Contenido no visible o poco destacado |

### 4.2 Fases futuras

No definidas. El MVP constituye el producto completo actual. Posibles ampliaciones futuras: galería de proyectos realizados, página de blog con artículos SEO local, panel de administración de leads.

## 5. Seguridad

- **Modelo de autenticación y autorización:** No aplica. La web es 100% estática y pública. No hay área privada ni autenticación de usuarios.
- **Roles y permisos:** No aplica. No hay usuarios registrados ni roles diferenciados.
- **Datos sensibles y tratamiento:** El formulario recoge nombre, teléfono y localización. Estos datos se transmiten mediante POST a un servicio externo (Formspree/Getform/Netlify Forms) que utiliza HTTPS. No se almacenan en el servidor propio. Se debe incluir un enlace a la Política de Privacidad informando del tratamiento de datos.
- **Requisitos de auditoría:** No aplica. No hay operaciones internas que auditar. El servicio externo de formularios puede proporcionar registro de entradas.

## 6. Interfaz de usuario

### Referentes visuales y paleta

La imagen corporativa (basada en archivo `1000127615.jpg`) define la identidad visual:

- **Color primario (azul marino):** `#1A3254` — utilizado para bloques de sección, encabezados, títulos principales y textos fuertes.
- **Color de acento (naranja caldera):** `#E47923` — utilizado exclusivamente para CTAs, botones de conversión y elementos clave de contacto.
- **Color de fondo claro:** `#FFFFFF` y `#F8F9FA` — para mantener limpieza visual y contraste.
- **Tipografía:** Fuentes Sans-Serif (Inter, Roboto o Helvetica) cargadas desde Google Fonts o con fallback del sistema. Aspecto limpio, moderno y corporativo.

Los colores se definen mediante variables CSS nativas en `:root`.

### Logotipo del header

- **Texto "TejadosReformas":** "Tejados" en color naranja (`#E47923`) y "Reformas" en color azul marino (`#1A3254`). Inversión respecto a la versión anterior.
- **Logo de empresa (PENDIENTE):** No hay archivo de logotipo disponible todavía. Mientras tanto se utiliza el texto con los colores invertidos.

### Componentes clave

- Header con logotipo/nombre y navegación por anclas
- Hero con título H1, subtítulo y dos CTAS (llamada, WhatsApp), con énfasis en atención de urgencias 24h/365d
- Secciones de servicios con iconos y descripciones
- Bloque de pilares de confianza (4 columnas en desktop, apiladas en móvil)
- Carrusel o lista de testimonios
- Acordeón FAQ (CSS/JS vanilla)
- Formulario con 5 campos y botón de envío (action configurado con Formspree/Getform/Netlify Forms)
- Footer con datos legales, contacto y área de cobertura
- Botón flotante de WhatsApp

### Imágenes de proyecto

- **PENDIENTE:** No hay fotografías de proyectos reales disponibles todavía. El cliente ha mencionado tener fotos de ejemplo (reparaciones antes/después). Cuando estén disponibles, se insertarán usando el componente `<Image />` de Astro con generación de formato `.webp`.

### Responsive / mobile-first

- Diseño **mobile-first**: todas las reglas CSS parten desde la vista móvil y se escalan hacia arriba con `min-width` media queries.
- Breakpoint principal: `768px` (tablet/desktop). El menú de navegación colapsa en menú hamburguesa por debajo de este umbral.
- Botones de CTA adaptados al tacto (tamaño mínimo 44x44px).

### Accesibilidad

- Contraste suficiente entre colores primarios/accento y fondos claros.
- Etiquetas semánticas HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Atributos `aria-label` en elementos interactivos (menú hamburguesa, botones).
- Texto alternativo (`alt`) descriptivo en todas las imágenes.

### Internacionalización (i18n)

- **No aplica.** El público objetivo es exclusivamente local (provincia de Burgos, España). Todo el contenido se produce en español.

## 7. Requisitos no funcionales

| Atributo | Objetivo | Medición |
|---|---|---|
| Velocidad de carga (LCP) | < 2.5s | Google PageSpeed Insights / Lighthouse |
| Velocidad de carga (FID/INP) | < 200ms | Google PageSpeed Insights / Lighthouse |
| Velocidad de carga (CLS) | < 0.1 | Google PageSpeed Insights / Lighthouse |
| Puntuación PageSpeed Insights | ≥ 95/100 | Google PageSpeed Insights |
| Tamaño total de página | < 500KB (incluyendo imágenes optimizadas) | Build inspector / DevTools |
| Disponibilidad | 99.9% (depende del hosting estático) | Proporcionado por Netlify/Vercel |
| Tiempo de build | < 30s | Tiempo de ejecución `astro build` |
| Compatibilidad de navegadores | Últimas 2 versiones de Chrome, Firefox, Safari, Edge | Pruebas manuales en navegadores |

## 8. Infraestructura y despliegue

### Entornos y diferencias de config

- **Entorno único (producción):** No hay diferenciación dev/staging/prod más allá del entorno local. Cloudflare Pages sirve como entorno de producción desde la rama principal del repositorio. Cloudflare Pages también ofrece despliegues de previsualización (preview) para ramas de trabajo.
- **Entorno local:** `npm run dev` (Astro dev server en `localhost:4321`).

### Pipeline CI/CD

- **Control de versiones:** Git + GitHub.
- **Plataforma de despliegue:** Cloudflare Pages con el adapter `@astrojs/cloudflare`.
- **Configuración del adapter:** `output: "static"` con `platform: "static"` — prerenderiza todas las páginas a HTML estático y genera un worker ligero para el enrutamiento en Cloudflare.
- **Despliegue automático:** Conectado al repositorio de GitHub mediante Cloudflare Pages. Cada `push` a la rama principal ejecuta `npm run build` y despliega el contenido de `dist/`. El archivo `_routes.json` generado automáticamente excluye las rutas estáticas del worker para máxima velocidad.
- **Comandos definidos:**
  - `npm run dev` — `astro dev --host 0.0.0.0 --port 4321`
  - `npm run build` — `astro build` → genera `dist/` con assets optimizados para Cloudflare
  - `npm run preview` — `astro preview --host 0.0.0.0 --port 4321`
  - `npm run lint` — `astro check` (type-check de Astro)
  - `npm run clean` — `rm -rf dist`
- **Configuración de despliegue en Cloudflare Pages:**
  1. Conectar repositorio de GitHub a Cloudflare Pages
  2. Framework preset: Astro (detecta automáticamente)
  3. Comando de build: `npm run build`
  4. Directorio de salida: `dist/`
  5. Variables de entorno: ninguna requerida para site estático

### Monitorización y alertas

- **No se implementa monitorización propia.**
- Cloudflare Pages proporciona analíticas básicas de tráfico y estado del despliegue en el dashboard.
- Cloudflare Web Analytics puede activarse gratuitamente desde el dashboard sin afectar al rendimiento.
- Se recomienda Google Analytics 4 para tracking avanzado de conversiones (futuro).

## 9. Testing

| Tipo de test | Requerido | Herramienta | Cobertura mínima |
|---|---|---|---|
| Type-check (Astro) | Sí | `astro check` | Sin errores de tipos |
| Build | Sí | `npm run build` | Build exitoso sin warnings |
| Validación de HTML | Sí | W3C Validator | Sin errores de marcado |
| Validación de Schema.org | Sí | Google Rich Results Test | Estructura correcta de LocalBusiness y FAQPage |
| Lighthouse / PageSpeed | Sí | Google Lighthouse | ≥ 95/100 en todas las categorías |
| Prueba de formulario | Sí | Manual | Envío correcto a servicio externo con datos de prueba |
| Prueba responsive | Sí | Manual / DevTools | Correcta visualización en móvil (<768px) y desktop |
| Prueba de enlaces | Sí | Manual | Todos los anclajes, `tel:` y `wa.me` funcionan |

**Nota:** No existe test runner, test directory ni suite de tests automatizados en el proyecto. Las validaciones se realizan mediante herramientas externas y comprobaciones manuales.

## 10. Criterios de aceptación globales

- [ ] CA-001: La página se genera completamente estática con `astro build` sin errores.
- [ ] CA-002: La página utiliza únicamente Astro + CSS puro + JavaScript vanilla. No hay Tailwind CSS, React, Vue, Svelte ni ningún otro framework de UI o estilos.
- [ ] CA-003: No hay ningún servidor back-end ni base de datos. La web es 100% estática.
- [ ] CA-004: La paleta de colores corporativa está implementada mediante variables CSS nativas en `:root`: primario `#1A3254`, acento `#E47923`, fondos `#FFFFFF` y `#F8F9FA`.
- [ ] CA-005: El Hero Section muestra en menos de 3 segundos qué hace la empresa (construcción y reparación de tejados), dónde opera (provincia de Burgos) y cómo contactar (teléfono/WhatsApp).
- [ ] CA-006: El título principal de la página es un único `<h1>` con el texto "Expertos en Construcción y Reparación de Tejados en la provincia de Burgos".
- [ ] CA-007: Existe un botón de llamada directa con protocolo `tel:622299746` visible permanentemente (especialmente en móvil).
- [ ] CA-008: Existe un botón flotante de WhatsApp en la esquina inferior con enlace a `https://wa.me/34622299746` y mensaje predefinido.
- [ ] CA-009: La sección de servicio principal (Tejados y Cubiertas) incluye los subservicios con sus descripciones actualizadas: reparación de goteras; impermeabilización (poliuretano líquido, membrana sistemática para analizar la estanquidad, fibra de vidrio); rehabilitación completa de cubiertas; limpieza y mantenimiento de tu tejado (limpieza de canalones, desatasco de valles, limpieza y desatasco de bajantes, revisión de cumbreras, reparación de cumbreras, pintado con poliuretano y fibra de vidrio en cumbreras, sustitución de tejas en mal estado, revisión de ventanas de tejados).
- [ ] CA-010: La sección de multiservicios (Reformas del Hogar) incluye 4 categorías: albañilería; fontanería (con énfasis en urgencias 24h); electricidad (con énfasis en urgencias 24h); servicio de manitas (con trabajos de jardinería, limpiezas de obra y pequeñas mudanzas con furgonetas).
- [ ] CA-011: La sección de pilares de confianza incluye 4 valores: presupuestos ajustados a tu medida (con descripción sobre ajuste según materiales y calidades), garantía de calidad (todos los trabajos tienen garantía de calidad realizados por profesionales), compromiso de limpieza y plazos, técnicos homologados.
- [ ] CA-012: La sección de testimonios contiene al menos 2 testimonios con nombre real y ubicación específica dentro de la provincia de Burgos.
- [ ] CA-013: La sección FAQ contiene al menos 3 preguntas frecuentes. La primera (presupuesto) indica "presupuesto totalmente gratuito y sin compromiso"; la segunda (garantía) indica "Dependiendo de la intervención, todos nuestros trabajos disponen de garantía de calidad, efectuados por profesionales expertos".
- [ ] CA-014: La sección FAQ está marcada con Schema.org de tipo `FAQPage` con preguntas y respuestas estructuradas.
- [ ] CA-015: El marcado Schema.org `LocalBusiness` está presente e incluye nombre, teléfono, horario y área de servicio geográfico (provincia de Burgos).
- [ ] CA-016: Existe un formulario de solicitud de presupuesto con los campos: nombre completo, teléfono (obligatorio), localización, tipo de servicio (desplegable) y mensaje.
- [ ] CA-017: El formulario envía los datos a un servicio externo (Formspree / Getform / Netlify Forms) mediante POST, con el atributo `action` configurado correctamente y funcional.
- [ ] CA-018: El footer incluye: área de cobertura (Burgos capital y provincia), teléfono `622299746`, correo electrónico y horario laboral (L-V 8:00-19:00, urgencias fines de semana).
- [ ] CA-019: El footer incluye enlaces a páginas independientes de Aviso Legal, Política de Privacidad y Política de Cookies.
- [ ] CA-020: El menú de navegación en desktop muestra enlaces de ancla horizontales. En móvil (<768px) se colapsa en un botón hamburguesa que despliega el menú mediante JavaScript vanilla.
- [ ] CA-021: El scroll suave entre secciones está implementado con `html { scroll-behavior: smooth; }` en CSS.
- [ ] CA-022: La estructura HTML utiliza etiquetas semánticas HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- [ ] CA-023: Las imágenes se cargan usando el componente `<Image />` de Astro con generación de formato `.webp`. (PENDIENTE: no hay fotografías de proyectos disponibles aún.)
- [ ] CA-024: La página obtiene una puntuación ≥ 95/100 en Google PageSpeed Insights (desktop y móvil).
- [ ] CA-025: La tipografía utilizada es Sans-Serif (Inter, Roboto o Helvetica) cargada desde Google Fonts o fallback del sistema.
- [ ] CA-026: El logotipo del header muestra "Tejados" en color naranja (#E47923) y "Reformas" en color azul marino (#1A3254).
- [ ] CA-027: La página destaca que se atienden pequeñas reparaciones de fontanería y electricidad las 24 horas del día, los 365 días del año.
- [ ] CA-028: (PENDIENTE) El archivo de logotipo de la empresa está disponible e insertado en el header. Mientras tanto se usa el texto con los colores invertidos.
- [ ] CA-029: La página menciona explícitamente "provincia de Burgos" en todas las referencias geográficas relevantes (Hero, servicios, footer, Schema.org).

## 11. Restricciones y dependencias

- **Plazo e hitos:** No se especifica una fecha límite. La implementación debe completarse bloque por bloque según el plan establecido.
- **Restricciones de licencia:** Sin restricciones específicas. Dependencias de npm con licencias MIT/Apache-2.0 (Astro y sus paquetes oficiales).
- **Dependencias externas:**
  - Google Fonts CDN para la tipografía (Inter o Roboto).
  - Servicio externo de formularios (Formspree, Getform o Netlify Forms). Se requiere una cuenta activa en el servicio elegido y configurar el atributo `action` del formulario.
  - Hosting estático (Netlify, Vercel o similar). Se requiere una cuenta activa.
  - Número de teléfono real: `622299746` (extraído de la imagen corporativa).
- **Decisiones no negociables:**
  - Stack Astro (SSG) + CSS puro + JS vanilla (prohibido Tailwind, React, Vue, Svelte).
  - Sin back-end propio ni base de datos.
  - Sin frameworks UI o de estilos adicionales.
  - Paleta de colores fijada (primario `#1A3254`, acento `#E47923`).

## 12. Decisiones de diseño registradas

| ID | Decisión | Alternativas consideradas | Motivo de elección |
|---|---|---|---|
| DD-001 | Stack: Astro (SSG) + CSS puro + JavaScript vanilla | WordPress, React+Next.js, HTML plano sin framework, Tailwind CSS | Astro ofrece generación estática nativa, rendimiento sobresaliente y estructura de componentes sin JavaScript en cliente. CSS puro elimina dependencias innecesarias. JS vanilla cubre las mínimas interacciones requeridas. El stack se ajusta a la restricción expresa de no usar frameworks UI. |
| DD-002 | Sin frameworks de UI (ni Tailwind, React, Vue, Svelte) | Uso de Tailwind CSS o React para componentes | Decisión explícita del cliente. La página tiene pocas interacciones y no justifica la complejidad ni el peso de un framework. CSS puro con variables nativas ofrece control total sobre la paleta corporativa. |
| DD-003 | Formulario estático con servicio externo (Formspree/Getform/Netlify Forms) | Back-end propio (Node.js, PHP) o servicios serverless (AWS Lambda) | La web no tiene servidor. Un servicio externo sin servidor recibe los datos del formulario y los reenvía por correo electrónico sin necesidad de gestionar infraestructura, cumpliendo con la restricción de web 100% estática. |
| DD-004 | Sin test runner automatizado | Jest, Vitest, Playwright | Dada la naturaleza de la página (estática, sin lógica compleja) y la ausencia de un entorno de pruebas definido, las verificaciones se realizan mediante herramientas externas (W3C, Lighthouse, Rich Results Test) y comprobaciones manuales. |
| DD-005 | Una sola página (single-page) con navegación por anclas | Múltiples páginas (múltiples rutas) | Al ser una landing page de negocio local, todo el contenido cabe en una sola página. La navegación por anclas mejora la experiencia de usuario y evita tiempos de carga entre páginas. |
| DD-006 | Tipografía de Google Fonts (Inter/Roboto) con fallback del sistema | Tipografías auto-hospedadas, Adobe Fonts, tipografías del sistema exclusivamente | Google Fonts ofrece carga optimizada, selección amplia y buena integración con Astro. Inter y Roboto son tipografías modernas, legibles y corporativas que se alinean con la identidad visual deseada. |
| DD-007 | Schema.org LocalBusiness y FAQPage incluidos en el HTML | JSON-LD inyectado mediante script, microdatos en línea, RDFa | JSON-LD es el formato recomendado por Google para datos estructurados, fácil de mantener y verificar. Se incluye en el `<head>` o al final del `<body>` según la práctica recomendada. |
| DD-008 | Sin monitorización ni analítica en el MVP | Google Analytics 4, Plausible, Fathom | La prioridad del MVP es la página en sí misma. La analítica se puede añadir posteriormente sin afectar a la estructura existente. |
| DD-009 | Despliegue en Cloudflare Pages con @astrojs/cloudflare | Netlify, Vercel, AWS S3+CloudFront | Cloudflare Pages ofrece edge network global, integración nativa con GitHub, y el adapter @astrojs/cloudflare genera automáticamente la configuración de rutas óptima (`_routes.json`). Al usar `platform: "static"`, las páginas prerenderizadas se sirven directamente desde el edge sin coste de worker. |
| DD-010 | Colores del logotipo invertidos: "Tejados" en naranja, "Reformas" en azul marino | Colores originales (Tejados azul, Reformas naranja) | Solicitud expresa del cliente tras ver la página en funcionamiento. La nueva disposición refuerza la identidad visual. |
| DD-011 | Contenido de servicios actualizado según feedback del cliente | Versión inicial de servicios | El cliente revisó la página y solicitó cambios en materiales de impermeabilización, ampliación del servicio de limpieza de canalones a "Limpieza y mantenimiento de tu tejado", y adición de servicios de jardinería/mudanzas en manitas. |
| DD-012 | Énfasis en urgencias 24h/365d para fontanería, electricidad y pequeñas reparaciones | Sin énfasis específico | El cliente quiere destacar la disponibilidad permanente como factor diferencial frente a la competencia local. |

## 13. Estado de implementación

Fecha de cierre: 2026-07-05
Estado: EN REVISIÓN — Nuevos requisitos recibidos del cliente (Israel) pendientes de implementar

| CA-ID | Estado | Verificado en |
|---|---|---|
| CA-001 | ✅ | Build exitoso — 4 páginas generadas en 5.07s |
| CA-002 | ✅ | Stack Astro + CSS puro + JS vanilla — sin Tailwind/React/Vue/Svelte |
| CA-003 | ✅ | Web 100% estática, sin servidor back-end ni base de datos |
| CA-004 | ✅ | `src/styles/global.css` — variables `:root` con `#1A3254`, `#E47923`, `#FFFFFF`, `#F8F9FA` |
| CA-005 | ✅ | Hero Section <3s: qué hace, dónde opera, cómo contactar |
| CA-006 | ⏳ | Pendiente de actualizar H1 para incluir "provincia de Burgos" |
| CA-007 | ✅ | `tel:622299746` en Hero y Footer |
| CA-008 | ✅ | `wa.me/34622299746` en Hero CTA secundario + botón flotante |
| CA-009 | ⏳ | Pendiente de actualizar subservicios: impermeabilización (nuevos materiales) y limpieza (expandido a mantenimiento de tejado) |
| CA-010 | ⏳ | Pendiente de actualizar multiservicios: urgencias 24h en fontanería/electricidad, jardinería/mudanzas en manitas |
| CA-011 | ⏳ | Pendiente de actualizar pilares: "Presupuestos Ajustados a tu Medida" y "Garantía de Calidad" con nuevos textos |
| CA-012 | ✅ | Sección Testimonios con 2 testimonios locales (Mariano S. Aranda, Beatriz M. Burgos) |
| CA-013 | ⏳ | Pendiente de actualizar FAQ: preguntas 1 y 2 con nuevos textos |
| CA-014 | ✅ | Schema FAQPage JSON-LD en FAQ.astro con preguntas y respuestas |
| CA-015 | ✅ | Schema LocalBusiness JSON-LD en BaseLayout — nombre, teléfono, horario, área |
| CA-016 | ✅ | Formulario con campos: nombre, teléfono (required), localización, servicio (select), mensaje |
| CA-017 | ⏳ | Pendiente de configurar `action` del formulario con Formspree/Getform/Netlify Forms |
| CA-018 | ✅ | Footer: área cobertura (Burgos capital y provincia), teléfono, email, horario |
| CA-019 | ✅ | Footer: enlaces a /aviso-legal, /politica-privacidad, /politica-cookies |
| CA-020 | ✅ | Menú hamburguesa <768px con JS vanilla, cierre en enlace/fuera/Escape |
| CA-021 | ✅ | `scroll-behavior: smooth` en CSS global |
| CA-022 | ✅ | HTML5 semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| CA-023 | ⏳ | Sin imágenes de proyecto — pendiente de recibir fotos reales del cliente |
| CA-024 | ⏳ | Pendiente de auditoría PageSpeed Insights en producción |
| CA-025 | ✅ | Google Fonts Inter (400, 600, 700) cargada con preconnect |
| CA-026 | ⏳ | Pendiente de invertir colores del logotipo: "Tejados" naranja, "Reformas" azul marino |
| CA-027 | ⏳ | Pendiente de añadir énfasis en urgencias 24h/365d para pequeñas reparaciones |
| CA-028 | ⏳ | Pendiente de recibir archivo de logotipo de la empresa |
| CA-029 | ⏳ | Pendiente de revisar y actualizar referencias geográficas para usar "provincia de Burgos" en todas las secciones relevantes |

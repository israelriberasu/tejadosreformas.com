globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as decodeKey } from './chunks/astro/server_0NpeuRv-.mjs';
import './chunks/astro-designed-error-pages_C5VpUNFL.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_DhcAt84I.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/tejadosreformas.com/","cacheDir":"file:///workspaces/tejadosreformas.com/node_modules/.astro/","outDir":"file:///workspaces/tejadosreformas.com/dist/","srcDir":"file:///workspaces/tejadosreformas.com/src/","publicDir":"file:///workspaces/tejadosreformas.com/public/","buildClientDir":"file:///workspaces/tejadosreformas.com/dist/","buildServerDir":"file:///workspaces/tejadosreformas.com/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"aviso-legal.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.rKxMkPSd.css"},{"type":"inline","content":".legal-page[data-astro-cid-sjm3lmgm]{padding-block:var(--spacing-3xl)}.legal-page__title[data-astro-cid-sjm3lmgm]{font-size:var(--font-size-h1);color:var(--color-primary);margin-bottom:var(--spacing-2xl);text-align:center}.legal-page__content[data-astro-cid-sjm3lmgm]{max-width:800px;margin-inline:auto}.legal-page__content[data-astro-cid-sjm3lmgm] article[data-astro-cid-sjm3lmgm]{margin-bottom:var(--spacing-2xl)}.legal-page__content[data-astro-cid-sjm3lmgm] h2[data-astro-cid-sjm3lmgm]{font-size:var(--font-size-h3);color:var(--color-primary);margin-bottom:var(--spacing-md);padding-bottom:var(--spacing-sm);border-bottom:2px solid var(--color-accent)}.legal-page__content[data-astro-cid-sjm3lmgm] p[data-astro-cid-sjm3lmgm]{font-size:1rem;line-height:1.7;color:var(--color-text-light);margin-bottom:var(--spacing-md)}.legal-page__content[data-astro-cid-sjm3lmgm] ul[data-astro-cid-sjm3lmgm]{list-style:none;padding:0;margin-bottom:var(--spacing-md)}.legal-page__content[data-astro-cid-sjm3lmgm] ul[data-astro-cid-sjm3lmgm] li[data-astro-cid-sjm3lmgm]{padding:.375rem 0 .375rem 1.25rem;position:relative;font-size:1rem;line-height:1.7;color:var(--color-text-light)}.legal-page__content[data-astro-cid-sjm3lmgm] ul[data-astro-cid-sjm3lmgm] li[data-astro-cid-sjm3lmgm]:before{content:\"\";position:absolute;left:0;top:.85rem;width:6px;height:6px;background-color:var(--color-accent);border-radius:50%}.legal-page__content[data-astro-cid-sjm3lmgm] ul[data-astro-cid-sjm3lmgm] li[data-astro-cid-sjm3lmgm] strong[data-astro-cid-sjm3lmgm]{color:var(--color-text)}.legal-page__back[data-astro-cid-sjm3lmgm]{text-align:center;margin-top:var(--spacing-3xl)}\n"}],"routeData":{"route":"/aviso-legal","isIndex":false,"type":"page","pattern":"^\\/aviso-legal\\/?$","segments":[[{"content":"aviso-legal","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso-legal.astro","pathname":"/aviso-legal","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"politica-cookies.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.rKxMkPSd.css"},{"type":"inline","content":".legal-page[data-astro-cid-odr7vx52]{padding-block:var(--spacing-3xl)}.legal-page__title[data-astro-cid-odr7vx52]{font-size:var(--font-size-h1);color:var(--color-primary);margin-bottom:var(--spacing-2xl);text-align:center}.legal-page__content[data-astro-cid-odr7vx52]{max-width:800px;margin-inline:auto}.legal-page__content[data-astro-cid-odr7vx52] article[data-astro-cid-odr7vx52]{margin-bottom:var(--spacing-2xl)}.legal-page__content[data-astro-cid-odr7vx52] h2[data-astro-cid-odr7vx52]{font-size:var(--font-size-h3);color:var(--color-primary);margin-bottom:var(--spacing-md);padding-bottom:var(--spacing-sm);border-bottom:2px solid var(--color-accent)}.legal-page__content[data-astro-cid-odr7vx52] h3[data-astro-cid-odr7vx52]{font-size:1.125rem;color:var(--color-primary);margin-bottom:var(--spacing-sm);margin-top:var(--spacing-lg)}.legal-page__content[data-astro-cid-odr7vx52] p[data-astro-cid-odr7vx52]{font-size:1rem;line-height:1.7;color:var(--color-text-light);margin-bottom:var(--spacing-md)}.legal-page__content[data-astro-cid-odr7vx52] ul[data-astro-cid-odr7vx52]{list-style:none;padding:0;margin-bottom:var(--spacing-md)}.legal-page__content[data-astro-cid-odr7vx52] ul[data-astro-cid-odr7vx52] li[data-astro-cid-odr7vx52]{padding:.375rem 0 .375rem 1.25rem;position:relative;font-size:1rem;line-height:1.7;color:var(--color-text-light)}.legal-page__content[data-astro-cid-odr7vx52] ul[data-astro-cid-odr7vx52] li[data-astro-cid-odr7vx52]:before{content:\"\";position:absolute;left:0;top:.85rem;width:6px;height:6px;background-color:var(--color-accent);border-radius:50%}.legal-page__content[data-astro-cid-odr7vx52] ul[data-astro-cid-odr7vx52] li[data-astro-cid-odr7vx52] strong[data-astro-cid-odr7vx52]{color:var(--color-text)}.legal-page__content[data-astro-cid-odr7vx52] a[data-astro-cid-odr7vx52]{color:var(--color-accent);text-decoration:underline}.legal-page__content[data-astro-cid-odr7vx52] a[data-astro-cid-odr7vx52]:hover{color:var(--color-accent-hover)}.legal-page__back[data-astro-cid-odr7vx52]{text-align:center;margin-top:var(--spacing-3xl)}\n"}],"routeData":{"route":"/politica-cookies","isIndex":false,"type":"page","pattern":"^\\/politica-cookies\\/?$","segments":[[{"content":"politica-cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politica-cookies.astro","pathname":"/politica-cookies","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"politica-privacidad.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.rKxMkPSd.css"},{"type":"inline","content":".legal-page[data-astro-cid-gu5jn454]{padding-block:var(--spacing-3xl)}.legal-page__title[data-astro-cid-gu5jn454]{font-size:var(--font-size-h1);color:var(--color-primary);margin-bottom:var(--spacing-2xl);text-align:center}.legal-page__content[data-astro-cid-gu5jn454]{max-width:800px;margin-inline:auto}.legal-page__content[data-astro-cid-gu5jn454] article[data-astro-cid-gu5jn454]{margin-bottom:var(--spacing-2xl)}.legal-page__content[data-astro-cid-gu5jn454] h2[data-astro-cid-gu5jn454]{font-size:var(--font-size-h3);color:var(--color-primary);margin-bottom:var(--spacing-md);padding-bottom:var(--spacing-sm);border-bottom:2px solid var(--color-accent)}.legal-page__content[data-astro-cid-gu5jn454] p[data-astro-cid-gu5jn454]{font-size:1rem;line-height:1.7;color:var(--color-text-light);margin-bottom:var(--spacing-md)}.legal-page__content[data-astro-cid-gu5jn454] ul[data-astro-cid-gu5jn454]{list-style:none;padding:0;margin-bottom:var(--spacing-md)}.legal-page__content[data-astro-cid-gu5jn454] ul[data-astro-cid-gu5jn454] li[data-astro-cid-gu5jn454]{padding:.375rem 0 .375rem 1.25rem;position:relative;font-size:1rem;line-height:1.7;color:var(--color-text-light)}.legal-page__content[data-astro-cid-gu5jn454] ul[data-astro-cid-gu5jn454] li[data-astro-cid-gu5jn454]:before{content:\"\";position:absolute;left:0;top:.85rem;width:6px;height:6px;background-color:var(--color-accent);border-radius:50%}.legal-page__content[data-astro-cid-gu5jn454] ul[data-astro-cid-gu5jn454] li[data-astro-cid-gu5jn454] strong[data-astro-cid-gu5jn454]{color:var(--color-text)}.legal-page__back[data-astro-cid-gu5jn454]{text-align:center;margin-top:var(--spacing-3xl)}\n"}],"routeData":{"route":"/politica-privacidad","isIndex":false,"type":"page","pattern":"^\\/politica-privacidad\\/?$","segments":[[{"content":"politica-privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politica-privacidad.astro","pathname":"/politica-privacidad","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.rKxMkPSd.css"},{"type":"external","src":"/_astro/index.DwBvJ1Zq.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://tejadosreformas.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/tejadosreformas.com/src/pages/aviso-legal.astro",{"propagation":"none","containsHead":true}],["/workspaces/tejadosreformas.com/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/workspaces/tejadosreformas.com/src/pages/politica-cookies.astro",{"propagation":"none","containsHead":true}],["/workspaces/tejadosreformas.com/src/pages/politica-privacidad.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/aviso-legal@_@astro":"pages/aviso-legal.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/politica-cookies@_@astro":"pages/politica-cookies.astro.mjs","\u0000@astro-page:src/pages/politica-privacidad@_@astro":"pages/politica-privacidad.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BOc2qbRb.mjs","/workspaces/tejadosreformas.com/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/workspaces/tejadosreformas.com/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.CEk1EUDF.js","/workspaces/tejadosreformas.com/src/components/TrustValues.astro?astro&type=script&index=0&lang.ts":"_astro/TrustValues.astro_astro_type_script_index_0_lang.kx85NzwD.js","/workspaces/tejadosreformas.com/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.DLZC-Eq6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/workspaces/tejadosreformas.com/src/components/Header.astro?astro&type=script&index=0&lang.ts","function r(){const e=document.querySelector(\".nav-toggle\"),t=document.querySelector(\".nav-menu\");if(!e||!t)return;new MutationObserver(function(){const n=t.classList.contains(\"is-active\");e.setAttribute(\"aria-expanded\",n?\"true\":\"false\"),e.setAttribute(\"aria-label\",n?\"Cerrar menú de navegación\":\"Abrir menú de navegación\")}).observe(t,{attributes:!0,attributeFilter:[\"class\"]})}document.addEventListener(\"astro:page-load\",r);r();"],["/workspaces/tejadosreformas.com/src/components/TrustValues.astro?astro&type=script&index=0&lang.ts","(()=>{const s=document.querySelectorAll(\"#trust-values .value-card\");if(!s.length)return;const t=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&(r.target.classList.add(\"value-card--visible\"),t.unobserve(r.target))})},{threshold:.15});s.forEach(e=>t.observe(e))})();"],["/workspaces/tejadosreformas.com/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","(function(){const i=document.querySelector(\".nav-toggle\"),n=document.querySelector(\".nav-menu\"),o=n?n.querySelectorAll(\"a\"):[],s=document.body;if(!i||!n)return;function a(){n.classList.add(\"is-active\"),i.classList.add(\"is-open\"),s.classList.add(\"is-menu-open\")}function t(){n.classList.remove(\"is-active\"),i.classList.remove(\"is-open\"),s.classList.remove(\"is-menu-open\")}function u(){n.classList.contains(\"is-active\")?t():a()}i.addEventListener(\"click\",function(e){e.stopPropagation(),u()}),o.forEach(function(e){e.addEventListener(\"click\",function(){t()})}),document.addEventListener(\"click\",function(e){if(!n.classList.contains(\"is-active\"))return;const l=i.contains(e.target),d=n.contains(e.target);!l&&!d&&t()}),document.addEventListener(\"keydown\",function(e){e.key===\"Escape\"&&n.classList.contains(\"is-active\")&&t()});let c;window.addEventListener(\"resize\",function(){clearTimeout(c),c=setTimeout(function(){window.innerWidth>=768&&n.classList.contains(\"is-active\")&&t()},150)})})();"]],"assets":["/_astro/aviso-legal.rKxMkPSd.css","/_astro/index.DwBvJ1Zq.css","/favicon.svg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/_worker.js/_astro/aviso-legal.rKxMkPSd.css","/_worker.js/_astro/index.DwBvJ1Zq.css","/_worker.js/chunks/BaseLayout_BM3Eslie.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_fAmjkM3K.mjs","/_worker.js/chunks/astro-designed-error-pages_C5VpUNFL.mjs","/_worker.js/chunks/astro_CxA7I6qT.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/noop-middleware_DhcAt84I.mjs","/_worker.js/chunks/render-context_DYF8FdmX.mjs","/_worker.js/pages/aviso-legal.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/politica-cookies.astro.mjs","/_worker.js/pages/politica-privacidad.astro.mjs","/_worker.js/chunks/astro/server_0NpeuRv-.mjs","/aviso-legal.html","/politica-cookies.html","/politica-privacidad.html","/index.html"],"buildFormat":"file","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"lu5Pp/cgh/v7OtbAIhcrObl7qmM+fXa28jaQMaFMSeo=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };

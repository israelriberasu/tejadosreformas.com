globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_fAmjkM3K.mjs';
import { manifest } from './manifest_BOc2qbRb.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/aviso-legal.astro.mjs');
const _page1 = () => import('./pages/politica-cookies.astro.mjs');
const _page2 = () => import('./pages/politica-privacidad.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/aviso-legal.astro", _page0],
    ["src/pages/politica-cookies.astro", _page1],
    ["src/pages/politica-privacidad.astro", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

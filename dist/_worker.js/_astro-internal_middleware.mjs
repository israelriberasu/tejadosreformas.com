globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_C5VpUNFL.mjs';
import './chunks/astro/server_0NpeuRv-.mjs';
import { k as sequence } from './chunks/render-context_DYF8FdmX.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };

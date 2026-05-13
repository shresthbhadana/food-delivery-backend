const app = require('./app');
function dumpRouter(router, prefix = '') {
  if (!router || !router.stack) return;
  router.stack.forEach(layer => {
    if (layer.route && layer.route.path) {
      const methods = Object.keys(layer.route.methods || {}).join(',').toUpperCase();
      console.log(`${prefix}${layer.route.path} -> ${methods}`);
    } else if (layer.name === 'router' && layer.handle) {
      console.log(`${prefix}[router] ${layer.regexp ? layer.regexp.toString() : ''}`);
      dumpRouter(layer.handle, prefix + (layer.regexp && layer.regexp.fast_slash ? '' : ''));
    } else {
      console.log(`${prefix}[middleware] ${layer.name}`);
    }
  });
}

console.log('Top-level routes:');
dumpRouter(app.router);

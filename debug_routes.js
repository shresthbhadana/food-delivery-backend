const app = require('./app');

function printRoutes(layer, prefix = '') {
  if (layer.route) {
    const path = prefix + layer.route.path;
    const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
    console.log(`${methods} ${path}`);
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(stackLayer => {
      printRoutes(stackLayer, prefix + (layer.regexp.source === '^\\/?(?=\\/|$)' ? '' : layer.regexp.source));
    });
  }
}

console.log("Registered Routes:");
app._router.stack.forEach(layer => printRoutes(layer));

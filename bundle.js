const esbuild = require('esbuild');

const entryFile = './build/wvp.js';
const outputBundle = './dist/wvp.js';

esbuild.build({
    entryPoints: [entryFile],
    outfile: outputBundle,
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es5',
    format: 'esm',
    sourcemap: false,
    logLevel: 'info',
})

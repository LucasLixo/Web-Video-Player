const esbuild = require('esbuild');

const entryFile = './build/wvp.js';
const outputBundle = './dist/wvp.js';
/* const outputMinified = './dist/wvp.min.js'; */

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
/* esbuild.build({
    entryPoints: [entryFile],
    outfile: outputMinified,
    bundle: true,
    minify: true,
    platform: 'browser',
    target: 'es5',
    format: 'esm',
    sourcemap: false,
    logLevel: 'info',
    minifyIdentifiers: false,
    keepNames: true,
}); */

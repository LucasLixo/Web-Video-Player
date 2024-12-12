const esbuild = require('esbuild');

const entryFile = './build/wvp.js';
const outputBundle = './example/wvp.js';
const outputMinified = './example/wvp.min.js';

esbuild.build({
    entryPoints: [entryFile],
    outfile: outputBundle,
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es5',
    // globalName: 'WVP',
    format: 'esm',
    sourcemap: true,
})
esbuild.build({
    entryPoints: [entryFile],
    outfile: outputMinified,
    bundle: true,
    minify: true,
    platform: 'browser',
    target: 'es5',
    // globalName: 'WVP',
    format: 'esm',
    sourcemap: false,
});
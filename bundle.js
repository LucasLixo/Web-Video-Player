const esbuild = require('esbuild');

const fs = require('fs');
const path = require('path');

const entryFile = './build/wvp.js';
const outputBundle = './dist/wvp.js';
const outputMinified = './dist/wvp.min.js';

esbuild.build({
    entryPoints: [entryFile],
    outfile: outputBundle,
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es5',
    // globalName: 'WVP',
    format: 'esm',
    sourcemap: false, // true,
    logLevel: 'info',
})
/* esbuild.build({
    entryPoints: [entryFile],
    outfile: outputMinified,
    bundle: true,
    minify: true,
    platform: 'browser',
    target: 'es5',
    // globalName: 'WVP',
    format: 'esm',
    sourcemap: false,
    logLevel: 'info',
}); */

const inWvpMin = path.join(__dirname, './dist/wvp.js');

const outWvpMin = path.join(__dirname, './example/wvp.js');

fs.copyFileSync(inWvpMin, outWvpMin);
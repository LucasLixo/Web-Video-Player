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

const inWvpMin = path.join(__dirname, './dist/wvp.min.js');

const outWvpMin = path.join(__dirname, './example/wvp.min.js');

fs.copyFileSync(inWvpMin, outWvpMin);
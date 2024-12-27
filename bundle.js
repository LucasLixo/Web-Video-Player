const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./build/wvp.js'],
    outfile: './dist/wvp.js',
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es5',
    format: 'esm',
    sourcemap: false,
    logLevel: 'info',
});

esbuild.build({
    entryPoints: ['./build/wvp.js'],
    outfile: './debug/wvp.js',
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es5',
    format: 'esm',
    sourcemap: true,
    logLevel: 'info',
});

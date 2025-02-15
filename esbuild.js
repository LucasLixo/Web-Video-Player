const esbuild = require('esbuild');

// Debug
esbuild.build({
    entryPoints: ['./build/wvp.js'],
    outfile: './debug/wvp.js',
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es2015',
    format: 'esm',
    sourcemap: true,
    logLevel: 'info',
    legalComments: 'eof',
});

// Dist
esbuild.build({
    entryPoints: ['./build/wvp.js'],
    outfile: './dist/wvp.js',
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es2015',
    format: 'esm',
    sourcemap: false,
    logLevel: 'info',
    legalComments: 'none',
});

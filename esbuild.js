const esbuild = require('esbuild');

// Debug
esbuild.build({
    entryPoints: ['./build/svp.js'],
    outfile: './debug/svp.js',
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
    entryPoints: ['./build/svp.js'],
    outfile: './dist/svp.js',
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es2015',
    format: 'esm',
    sourcemap: false,
    logLevel: 'info',
    legalComments: 'none',
});

// Dist minify
/* esbuild.build({
    entryPoints: ['./build/svp.js'],
    outfile: './dist/svp.min.js',
    bundle: true,
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: false,
    minifySyntax: false,
    platform: 'browser',
    target: 'es2015',
    format: 'esm',
    sourcemap: false,
    logLevel: 'info',
    legalComments: 'none',
}); */

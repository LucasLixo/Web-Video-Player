const esbuild = require('esbuild');

const inputFile = './assets/scripts/wvp.js';

esbuild.build({
  entryPoints: [inputFile],
  outfile: './assets/scripts/wvp.js',
  minify: false,
  bundle: true,
  platform: 'node',
  target: 'es2016',
})
  .then(() => console.log('🚀 Build concluído com sucesso!'))

esbuild.build({
  entryPoints: [inputFile],
  outfile: './assets/scripts/wvp.min.js',
  minify: true,
  bundle: true,
  platform: 'node',
  target: 'es2016',
})
  .then(() => console.log('🚀 Build concluído com sucesso!'))
  .catch(() => process.exit(1));

const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

async function build() {
  const ctx = await esbuild.context({
    entryPoints: ['./src/server.ts'],
    outfile: 'dist/server.js',
    bundle: true,
    platform: 'node',
    target: 'node20',
    sourcemap: true,
  });

  if (isWatch) {
    await ctx.watch();
    console.log('👀 Build em modo watch...');
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log('✅ Build concluído.');
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
import esbuild from 'rollup-plugin-esbuild'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'default'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    esbuild({
      target: 'es2015',
      minify: true
    })
  ],
  external: ['vue']
}

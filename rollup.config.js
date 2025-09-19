import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    inlineDynamicImports: true,
    plugins: [
      resolve({
        preferBuiltins: true,
        browser: false
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        rootDir: './src'
      })
    ],
    external: [
      '@coral-xyz/anchor',
      '@coral-xyz/borsh',
      '@hash-validator/v2',
      '@solana/web3.js',
      '@solana/spl-token',
      'bn.js',
      'undici',
      'js-sha256',
      'bs58'
    ]
  },
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    inlineDynamicImports: true,
    plugins: [
      resolve({
        preferBuiltins: true,
        browser: false
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false
      })
    ],
    external: [
      '@coral-xyz/anchor',
      '@coral-xyz/borsh',
      '@hash-validator/v2',
      '@solana/web3.js',
      '@solana/spl-token',
      'bn.js',
      'undici',
      'js-sha256',
      'bs58'
    ]
  }
];

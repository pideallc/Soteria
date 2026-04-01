import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/types.ts', 'src/**/index.ts'],
    },
  },
  resolve: {
    alias: {
      '@core': '/src/core',
      '@components': '/src/components',
      '@utils': '/src/utils',
    },
  },
});

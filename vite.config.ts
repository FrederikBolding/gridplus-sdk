// vite.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['lcov']
    },
    globals: true,
    testTimeout: 100000,
    setupFiles: ['./src/client/__test__/__mocks__/setup.ts'],

  },
});

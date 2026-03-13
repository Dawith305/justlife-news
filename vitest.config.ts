import { fileURLToPath } from 'node:url';
import { defineVitestConfig } from '@nuxt/test-utils/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineVitestConfig({
  resolve: {
    alias: {
      '~': root,
      '@': root
    }
  },
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: root,
        domEnvironment: 'happy-dom'
      }
    }
  }
});

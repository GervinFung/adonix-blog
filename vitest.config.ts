import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        watch: false,
        hookTimeout: 100_000,
        include: ['test/index.ts'],
    },
});

import fs from 'fs';
import ci from 'ci-info';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
    if (mode === 'unit') {
        return {
            clearScreen: ci.isCI,
            test: {
                watch: false,
            },
        };
    }

    const timeOut = 300_000;

    return {
        clearScreen: ci.isCI,
        test: {
            watch: false,
            hookTimeout: timeOut,
            testTimeout: timeOut,
            teardownTimeout: timeOut,
            include: ['test/database/mongo/index.ts'],
            env: ci.isCI
                ? undefined
                : fs
                      .readFileSync('.env.testing', {
                          encoding: 'utf-8',
                      })
                      .split('\n')
                      .filter(Boolean)
                      .reduce((prev, keyValuePair) => {
                          const [key, value] = keyValuePair.split('=');
                          return {
                              ...prev,
                              [key]: value,
                          };
                      }, {}),
        },
    };
});

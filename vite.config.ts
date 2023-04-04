import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    allowOnly: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage'
    },
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension
  }
});

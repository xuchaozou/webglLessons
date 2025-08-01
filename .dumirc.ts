import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'webgl',
  },
  resolve: {
    docDirs: ['src', 'docs'],
  },
});

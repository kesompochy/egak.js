import { defineConfig } from 'vite';
import path from 'path';
import vitePluginRaw from 'vite-plugin-raw';

const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'EGAK',
      formats: ['es', 'umd'],
      fileName: (format) => `egak${format === 'umd' ? '.min' : ''}.js`,
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vitePluginRaw({ match: /\.(glsl|vs|fs|vert|frag)$/ })],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});

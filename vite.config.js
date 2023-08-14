import { defineConfig } from "vite";
import path from "path";
import vitePluginRaw from "vite-plugin-raw";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "EGAK",
      fileName: (format) => `egak${format === "umd" ? ".min" : ""}.js`,
    },
  },
  plugins: [vitePluginRaw({ match: /\.(glsl|vs|fs|vert|frag)$/ })],
});

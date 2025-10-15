import type { PluginOption } from 'vite';
import raw from 'vite-plugin-raw';

export type EgakShaderLoaderOptions = {
  match?: RegExp | RegExp[];
  exclude?: RegExp | RegExp[];
};

const defaultPattern = /\.(glsl|vert|frag)$/;

const egakShaders = (options: EgakShaderLoaderOptions = {}): PluginOption =>
  raw({
    match: options.match ?? defaultPattern,
    exclude: options.exclude,
  });

export default egakShaders;

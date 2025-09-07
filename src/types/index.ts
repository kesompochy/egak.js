export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IProgramInfo {
  program: WebGLProgram;
  vbo: WebGLBuffer;
  ibo: WebGLBuffer;
  uniforms: Record<string, WebGLUniformLocation>;
  pointAttrs: () => void;
}

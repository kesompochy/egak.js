export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IProgramInfo {
  program: WebGLProgram;
  vbo: Object;
  ibo: Object;
  uniforms: Object;
  pointAttrs: Function;
}

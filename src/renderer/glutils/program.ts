function createShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('failed to create a shader');
  }
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  return shader;
}

function createLinkedProgram(gl: WebGL2RenderingContext, ...shaders: WebGLShader[]): WebGLProgram {
  const program = gl.createProgram();
  if (!program) {
    throw new Error('failed to create program');
  }

  for (let i = 0, len = shaders.length; i < len; i++) {
    gl.attachShader(program, shaders[i]);
  }
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  return program;
}

function createProgram(gl: WebGL2RenderingContext, vSource: string, fSource: string) {
  const vShader = createShader(gl, gl.VERTEX_SHADER, vSource);
  const fShader = createShader(gl, gl.FRAGMENT_SHADER, fSource);
  const program = createLinkedProgram(gl, vShader, fShader);

  return program;
}

import { IAttribParam } from '../settings';
import { createLinkedVBO, createRectangleIndices } from './buffer';
import { getUniformLocation } from './uniform';

import { attribPrefix, uniformPrefix } from '../settings';

import { IProgramInfo } from '../../types';

export function createProgramInfo(
  gl: WebGL2RenderingContext,
  vss: string,
  fss: string,
  attribParams: Array<IAttribParam>,
  uniNames: Array<string>,
): IProgramInfo {
  const program = createProgram(gl, vss, fss);
  const vbo = createLinkedVBO(gl, program, attribParams as any);
  const ibo = createRectangleIndices(gl);
  const uniforms: Record<string, WebGLUniformLocation> = {} as any;
  for (let i = 0, len = uniNames.length; i < len; i++) {
    const name = uniNames[i];
    uniforms[name] = getUniformLocation(gl, program, uniformPrefix + name);
  }

  const point = () => {
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    for (let i = 0, len = attribParams.length; i < len; i++) {
      const param = attribParams[i];
      gl.vertexAttribPointer(
        gl.getAttribLocation(program, attribPrefix + param.name),
        param.size,
        (gl as any)[param.type],
        false,
        param.stride,
        param.offset,
      );
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  };

  return {
    program: program,
    vbo: vbo,
    ibo: ibo,
    uniforms: uniforms,
    pointAttrs: point,
  };
}

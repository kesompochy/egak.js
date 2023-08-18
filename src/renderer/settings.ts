import spriteVSS from './shader_sources/sprite/vertex.glsl';
import spriteFSS from './shader_sources/sprite/fragment.glsl';
import lineVSS from './shader_sources/polygon/vertex.glsl';
import lineFSS from './shader_sources/polygon/fragment.glsl';
import circleVSS from './shader_sources/circle/vertex.glsl';
import circleFSS from './shader_sources/circle/fragment.glsl';
import rrVSS from './shader_sources/roundedrect/vertex.glsl';
import rrFSS from './shader_sources/roundedrect/fragment.glsl';
import ellipseVSS from './shader_sources/ellipse/vertex.glsl';
import ellipseFSS from './shader_sources/ellipse/fragment.glsl';

import type Graphics from '../graphics/abstract_graphics';
import { Line, Circle, Triangle, Rectangle, RoundedRect } from '../graphics';
import Renderer from './renderer';

export interface IProgramStructure {
  name: string;
  vss: string;
  fss: string;
  attribParams: Array<IAttribParam>;
  uniforms: Array<string>;
}

export interface IAttribParam {
  name: string;
  size: number;
  type: string;
  stride: number;
  offset: number;
}

const positionSize = 2;
const texcoordSize = 2;
const colorSize = 4;
function getFloatBytes(value: number): number {
  return Float32Array.BYTES_PER_ELEMENT * value;
}
export const programInfos: Array<IProgramStructure> = [
  {
    name: 'sprite',
    vss: spriteVSS,
    fss: spriteFSS,
    attribParams: [
      {
        name: 'position',
        size: positionSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + texcoordSize),
        offset: 0,
      },
      {
        name: 'texcoord',
        size: texcoordSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + texcoordSize),
        offset: getFloatBytes(positionSize),
      },
    ],
    uniforms: ['transformation', 'opacity', 'texture'],
  },
  {
    name: 'polygon',
    vss: lineVSS,
    fss: lineFSS,
    attribParams: [
      {
        name: 'position',
        size: positionSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: 0,
      },
      {
        name: 'color',
        size: colorSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: getFloatBytes(positionSize),
      },
    ],
    uniforms: ['transformation', 'opacity'],
  },
  {
    name: 'circle',
    vss: circleVSS,
    fss: circleFSS,
    attribParams: [
      {
        name: 'position',
        size: positionSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: 0,
      },
      {
        name: 'color',
        size: colorSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: getFloatBytes(positionSize),
      },
    ],
    uniforms: [
      'transformation',
      'opacity',
      'radius',
      'center',
      'startAngle',
      'endAngle',
      'clockwize',
    ],
  },
  {
    name: 'roundedrect',
    vss: rrVSS,
    fss: rrFSS,
    attribParams: [
      {
        name: 'position',
        size: positionSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: 0,
      },
      {
        name: 'color',
        size: colorSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: getFloatBytes(positionSize),
      },
    ],
    uniforms: ['transformation', 'opacity', 'radius', 'position', 'width', 'height'],
  },
  {
    name: 'ellipse',
    vss: ellipseVSS,
    fss: ellipseFSS,
    attribParams: [
      {
        name: 'position',
        size: positionSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: 0,
      },
      {
        name: 'color',
        size: colorSize,
        type: 'FLOAT',
        stride: getFloatBytes(positionSize + colorSize),
        offset: getFloatBytes(positionSize),
      },
    ],
    uniforms: ['transformation', 'opacity', 'center', 'width', 'height'],
  },
];

export const drawModes = {
  line: 'LINE_STRIP',
  triangle: 'TRIANGLE_STRIP',
  rectangle: 'TRIANGLES',
  circle: 'TRIANGLES',
  roundedrect: 'TRIANGLES',
  ellipse: 'TRIANGLES',
};
export const getDrawSize = {
  line: (obj: Graphics) => {
    return obj.geometryInfo.length;
  },
  triangle: () => {
    return 3;
  },
  rectangle: () => {
    return 6;
  },
  circle: () => {
    return 6;
  },
  roundedrect: () => {
    return 6;
  },
  ellipse: () => {
    return 6;
  },
};

export const getUniformUploadFunc = {
  polygon: () => {},
  circle: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any) => {
    gl.uniform1f(uniforms['radius'], geometry.radius);
    gl.uniform2f(uniforms['center'], geometry.center.x, geometry.center.y);
    gl.uniform1f(uniforms['startAngle'], geometry.startAngle / (Math.PI * 2));
    gl.uniform1f(uniforms['endAngle'], geometry.endAngle / (Math.PI * 2));
    gl.uniform1f(uniforms['clockwize'], geometry.clockWize);
  },

  roundedrect: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any) => {
    gl.uniform1f(uniforms['radius'], geometry.radius);
    gl.uniform2f(uniforms['position'], geometry.x, geometry.y);
    gl.uniform1f(uniforms['width'], geometry.w);
    gl.uniform1f(uniforms['height'], geometry.h);
  },
  ellipse: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any) => {
    gl.uniform2f(uniforms['center'], geometry.x, geometry.y);
    gl.uniform1f(uniforms['width'], geometry.width);
    gl.uniform1f(uniforms['height'], geometry.height);
  },
};
export const getStrokeUniformOptions = {
  polygon: () => {},
  circle: (
    gl: WebGL2RenderingContext,
    uniforms: Object,
    geometry: any,
    stroke: number,
    strokeWid: number,
  ) => {
    gl.uniform1f(
      uniforms['radius'],
      new Array(geometry.radius, geometry.radius + strokeWid)[stroke],
    );
  },
  roundedrect: (
    gl: WebGL2RenderingContext,
    uniforms: Object,
    geometry: any,
    stroke: number,
    strokeWid: number,
  ) => {
    gl.uniform1f(
      uniforms['radius'],
      new Array(geometry.radius, geometry.radius + strokeWid)[stroke],
    );
    gl.uniform2f(
      uniforms['position'],
      new Array(geometry.x, geometry.x - strokeWid)[stroke],
      new Array(geometry.y, geometry.y - strokeWid)[stroke],
    );
    gl.uniform1f(uniforms['width'], new Array(geometry.w, geometry.w + strokeWid * 2)[stroke]);
    gl.uniform1f(uniforms['height'], new Array(geometry.h, geometry.h + strokeWid * 2)[stroke]);
  },
  ellipse: (
    gl: WebGL2RenderingContext,
    uniforms: Object,
    geometry: any,
    stroke: number,
    strokeWid: number,
  ) => {
    gl.uniform1f(
      uniforms['width'],
      new Array(geometry.width, geometry.width + strokeWid * 2)[stroke],
    );
    gl.uniform1f(
      uniforms['height'],
      new Array(geometry.height, geometry.height + strokeWid * 2)[stroke],
    );
  },
};

const recIndices = [0, 1, 2, 1, 3, 2];
export const getIndices = {
  line: (obj: Graphics): Array<number> => {
    const ary: number[] = [];
    for (let i = 0, len = obj.geometryInfo.length; i < len; i++) {
      ary.push(i);
    }
    return ary;
  },
  triangle: (): Array<number> => {
    return [0, 1, 2];
  },
  rectangle: (): Array<number> => {
    return recIndices;
  },
  circle: (): Array<number> => {
    return recIndices;
  },
  roundedrect: (): Array<number> => {
    return recIndices;
  },
  ellipse: (): Array<number> => {
    return recIndices;
  },
};

export const COLOR_BYTES = 256;

const attribPrefix = 'a_';
const uniformPrefix = 'u_';
export { attribPrefix, uniformPrefix };

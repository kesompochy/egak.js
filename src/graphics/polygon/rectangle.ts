import { ShaderTypes } from '../../display/abstract_display_object';
import Graphics from '../graphics';

import { GraphicsTypes } from '../graphics';

export default class Rectangle extends Graphics {
  readonly shaderType: ShaderTypes = 'polygon';
  readonly graphicsType: GraphicsTypes = 'rectangle';
  geometryInfo: { x: number; y: number; w: number; h: number; colors: number[][] } = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    colors: [],
  };
  constructor(x: number, y: number, w: number, h: number, ...color: number[][]) {
    super();
    this.geometryInfo = {
      x: x,
      y: y,
      w: w,
      h: h,
      colors: color,
    };
  }
  calcVertices(): number[] {
    const { x, y, w, h, colors } = this.geometryInfo;
    const vertices: number[] = [];
    vertices.push(x, y, colors[0][0], colors[0][1], colors[0][2], colors[0][3]);
    vertices.push(x, y + h, colors[1][0], colors[1][1], colors[1][2], colors[1][3]);
    vertices.push(x + w, y, colors[2][0], colors[2][1], colors[2][2], colors[2][3]);
    vertices.push(x + w, y + h, colors[3][0], colors[3][1], colors[3][2], colors[3][3]);
    return vertices;
  }
  calcStrokeVertices(): number[] {
    const { x, y, w, h } = this.geometryInfo;
    const wid = this._strokeWidth;
    const color = this._stroke;
    const vertices: number[] = [];
    vertices.push(x - wid, y - wid, color.r, color.g, color.b, color.a);
    vertices.push(x - wid, y + h + wid, color.r, color.g, color.b, color.a);
    vertices.push(x + w + wid, y - wid, color.r, color.g, color.b, color.a);
    vertices.push(x + w + wid, y + h + wid, color.r, color.g, color.b, color.a);
    return vertices;
  }
}

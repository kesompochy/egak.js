import { ShaderTypes } from '../../display/abstract_display_object';
import Graphics from '../abstract_graphics';

import { GraphicsTypes } from '../abstract_graphics';
import { Color } from '../../types';

interface RectangleGeometry {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface RectangleColor {
  topLeft: Color;
  bottomLeft: Color;
  topRight: Color;
  bottomRight: Color;
}
type RectangleColorProps = RectangleColor | Color;

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
  constructor(geometry: RectangleGeometry, rectangleColor: RectangleColorProps) {
    super();
    let color: RectangleColor;
    if ((rectangleColor as RectangleColor).topLeft?.r !== undefined) {
      color =  {
        topLeft: (rectangleColor as RectangleColor).topLeft,
        bottomLeft: (rectangleColor as RectangleColor).bottomLeft,
        topRight: (rectangleColor as RectangleColor).topRight,
        bottomRight: (rectangleColor as RectangleColor).bottomRight,
      };
    } else {
      color = rectangleColor as RectangleColor;
    }
    
    this.geometryInfo = {
      x: geometry.x,
      y: geometry.y,
      w: geometry.w,
      h: geometry.h,
      colors: [
        [color.topLeft.r, color.topLeft.g, color.topLeft.b, color.topLeft.a],
        [color.bottomLeft.r, color.bottomLeft.g, color.bottomLeft.b, color.bottomLeft.a],
        [color.topRight.r, color.topRight.g, color.topRight.b, color.topRight.a],
        [color.bottomRight.r, color.bottomRight.g, color.bottomRight.b, color.bottomRight.a],
      ],
    };
    this.staticWidth = geometry.w;
    this.staticHeight = geometry.h;
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

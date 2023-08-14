import Graphics from "../graphics";
import { GraphicsTypes } from "../graphics";
import { ShaderTypes } from "../../display/abstract_display_object";
import { Color } from "~/types";
import { defaultColor } from "../../display/abstract_display_object";

export default class Ellipse extends Graphics {
  graphicsType: GraphicsTypes = "ellipse";
  shaderType: ShaderTypes = "ellipse";
  geometryInfo: {
    x: number;
    y: number;
    width: number;
    height: number;
    color: Color;
  } = { x: 0, y: 0, width: 100, height: 50, color: defaultColor };

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color
  ) {
    super();
    this.geometryInfo = {
      x: x,
      y: y,
      width: width,
      height: height,
      color: color,
    };
  }

  calcVertices(): number[] {
    const vertices: number[] = [];
    const { x, y, width, height, color } = this.geometryInfo;
    const halfWid = width * 0.5;
    const halfHei = height * 0.5;
    vertices.push(
      x - halfWid,
      y - halfHei,
      color.r,
      color.g,
      color.b,
      color.a,
      x - halfWid,
      y + halfHei,
      color.r,
      color.g,
      color.b,
      color.a,
      x + halfWid,
      y - halfHei,
      color.r,
      color.g,
      color.b,
      color.a,
      x + halfWid,
      y + halfHei,
      color.r,
      color.g,
      color.b,
      color.a
    );
    return vertices;
  }
  calcStrokeVertices(): number[] {
    const vertices: number[] = [];
    const { x, y, width, height } = this.geometryInfo;
    const halfWid = width * 0.5;
    const halfHei = height * 0.5;
    const color = this._stroke;
    const wid = this._strokeWidth;

    vertices.push(
      x - halfWid - wid,
      y - halfHei - wid,
      color.r,
      color.g,
      color.b,
      color.a,
      x - halfWid - wid,
      y + halfHei + wid,
      color.r,
      color.g,
      color.b,
      color.a,
      x + halfWid + wid,
      y - halfHei - wid,
      color.r,
      color.g,
      color.b,
      color.a,
      x + halfWid + wid,
      y + halfHei + wid,
      color.r,
      color.g,
      color.b,
      color.a
    );
    return vertices;
  }
}

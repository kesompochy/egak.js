type ClockWize = -1 | 1;

import Graphics from "../graphics";
import { Color } from "~/types";
import { GraphicsTypes } from "../graphics";
import {
  ShaderTypes,
  defaultColor,
} from "../../display/abstract_display_object";

export default class Circle extends Graphics {
  readonly graphicsType: GraphicsTypes = "circle";
  readonly shaderType: ShaderTypes = "circle";
  color: Color = { r: 0, g: 0, b: 0, a: 1 };
  startAngle: number = 0;
  endAngle: number = Math.PI * 2;
  clockWize: ClockWize = 1;
  geometryInfo: { center: any; radius: number; color: Color } = {
    center: { x: 0, y: 0 },
    radius: 0,
    color: defaultColor,
  };

  constructor(
    x: number,
    y: number,
    radius: number,
    r: number,
    g: number,
    b: number,
    a: number,
    start?: number,
    end?: number
  ) {
    super();
    this.geometryInfo.radius = radius;
    this.geometryInfo.center = { x: x, y: y };
    this.geometryInfo.color = { r: r, g: g, b: b, a: a };
    this.startAngle = start || 0;
    this.endAngle = end || Math.PI * 2;
  }

  calcVertices(): number[] {
    const vertices: number[] = [];
    const { center, radius, color } = this.geometryInfo;
    const { x, y } = center;
    vertices.push(
      x - radius,
      y - radius,
      color.r,
      color.g,
      color.b,
      color.a,
      x - radius,
      y + radius,
      color.r,
      color.g,
      color.b,
      color.a,
      x + radius,
      y - radius,
      color.r,
      color.g,
      color.b,
      color.a,
      x + radius,
      y + radius,
      color.r,
      color.g,
      color.b,
      color.a
    );
    return vertices;
  }
  calcStrokeVertices(): number[] {
    const vertices: number[] = [];
    const { center, radius } = this.geometryInfo;
    const { x, y } = center;
    const wid = this._strokeWidth;
    const stroke = this._stroke;
    vertices.push(
      x - radius - wid,
      y - radius - wid,
      stroke.r,
      stroke.g,
      stroke.b,
      stroke.a,
      x - radius - wid,
      y + radius + wid,
      stroke.r,
      stroke.g,
      stroke.b,
      stroke.a,
      x + radius + wid,
      y - radius - wid,
      stroke.r,
      stroke.g,
      stroke.b,
      stroke.a,
      x + radius + wid,
      y + radius + wid,
      stroke.r,
      stroke.g,
      stroke.b,
      stroke.a
    );
    return vertices;
  }
}

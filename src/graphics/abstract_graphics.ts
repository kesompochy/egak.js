import Stage from '~/display/stage';

import { defaultColor } from '../display/abstract_display_object';
import { Color } from '../types';

import { RenderingTypes } from '../display/abstract_display_object';

export type GraphicsTypes =
  | 'line'
  | 'rectangle'
  | 'triangle'
  | 'circle'
  | 'roundedrect'
  | 'ellipse';

export default abstract class AbstractGraphics extends Stage {
  abstract readonly graphicsType: GraphicsTypes;
  abstract calcVertices(): number[];
  abstract calcStrokeVertices(): number[];

  abstract geometryInfo: any | undefined; //自由に使える空間
  readonly renderingType: RenderingTypes = 'graphics';
  vertices: number[] = [];
  strokeVertices: number[] = [];
  needsUpdatingVertices: boolean = true;
  needsUpdatingStroke: boolean = false;

  protected _strokeWidth: number = 0;
  protected _stroke: Color = defaultColor;
  get strokeWidth() {
    this.needsUpdatingStroke = true;
    return this._strokeWidth;
  }
  set strokeWidth(value: number) {
    this._strokeWidth = value;
    this.needsUpdatingStroke = true;
  }
  get stroke() {
    this.needsUpdatingStroke = true;
    return this._stroke;
  }
  set stroke(value: Color) {
    this._stroke = value;
    this.needsUpdatingStroke = true;
  }

  getGeometry() {
    this.needsUpdatingVertices = true;
    return this.geometryInfo;
  }
}

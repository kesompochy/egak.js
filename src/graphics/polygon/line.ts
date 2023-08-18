import Graphics from '../abstract_graphics';
import { ShaderTypes } from '../../display/abstract_display_object';
import { GraphicsTypes } from '../abstract_graphics';

export default class Line extends Graphics {
  readonly shaderType: ShaderTypes = 'polygon';
  readonly graphicsType: GraphicsTypes = 'line';
  readonly geometryInfo: number[][] = [];
  constructor(...vertices: number[][]) {
    super();
    this.geometryInfo = vertices;
  }
  calcVertices() {
    const vertices: number[] = [];
    for (let i = 0, len = this.geometryInfo.length; i < len; i++) {
      for (let j = 0; j < 6; j++) {
        vertices.push(this.geometryInfo[i][j]);
      }
    }
    return vertices;
  }
  calcStrokeVertices(): number[] {
    return [];
  }
}

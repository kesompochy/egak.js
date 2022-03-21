import Graphics from '../graphics';
import { ShaderTypes } from '../../display/abstract_display_object';
import { GraphicsTypes } from '../graphics';
export default class Line extends Graphics {
    readonly shaderType: ShaderTypes;
    readonly graphicsType: GraphicsTypes;
    readonly geometryInfo: number[][];
    constructor(...vertices: number[][]);
    calcVertices(): number[];
    calcStrokeVertices(): number[];
}
//# sourceMappingURL=line.d.ts.map
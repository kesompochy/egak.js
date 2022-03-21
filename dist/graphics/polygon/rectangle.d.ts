import { ShaderTypes } from '../../display/abstract_display_object';
import Graphics from '../graphics';
import { GraphicsTypes } from '../graphics';
export default class Rectangle extends Graphics {
    readonly shaderType: ShaderTypes;
    readonly graphicsType: GraphicsTypes;
    geometryInfo: {
        x: number;
        y: number;
        w: number;
        h: number;
        colors: number[][];
    };
    constructor(x: number, y: number, w: number, h: number, ...color: number[][]);
    calcVertices(): number[];
    calcStrokeVertices(): number[];
}
//# sourceMappingURL=rectangle.d.ts.map
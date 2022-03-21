import Graphics from "../graphics";
import { ShaderTypes } from "../../display/abstract_display_object";
import { GraphicsTypes } from '../graphics';
export default class RoundedRect extends Graphics {
    readonly shaderType: ShaderTypes;
    readonly graphicsType: GraphicsTypes;
    geometryInfo: any;
    constructor(x: number, y: number, w: number, h: number, radius: number, ...colors: number[][]);
    calcVertices(): number[];
    calcStrokeVertices(): number[];
}
//# sourceMappingURL=rounded_rect.d.ts.map
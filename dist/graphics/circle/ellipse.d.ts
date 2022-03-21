import Graphics from "../graphics";
import { GraphicsTypes } from "../graphics";
import { ShaderTypes } from "../../display/abstract_display_object";
import { Color } from "../graphics";
export default class Ellipse extends Graphics {
    graphicsType: GraphicsTypes;
    shaderType: ShaderTypes;
    geometryInfo: {
        x: number;
        y: number;
        width: number;
        height: number;
        color: Color;
    };
    constructor(x: number, y: number, width: number, height: number, color: Color);
    calcVertices(): number[];
    calcStrokeVertices(): number[];
}
//# sourceMappingURL=ellipse.d.ts.map
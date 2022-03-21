declare type ClockWize = -1 | 1;
import Graphics from "../graphics";
import { Color, GraphicsTypes } from '../graphics';
import { ShaderTypes } from "../../display/abstract_display_object";
export default class Circle extends Graphics {
    readonly graphicsType: GraphicsTypes;
    readonly shaderType: ShaderTypes;
    color: Color;
    startAngle: number;
    endAngle: number;
    clockWize: ClockWize;
    geometryInfo: {
        center: any;
        radius: number;
        color: Color;
    };
    constructor(x: number, y: number, radius: number, r: number, g: number, b: number, a: number, start?: number, end?: number);
    calcVertices(): number[];
    calcStrokeVertices(): number[];
}
export {};
//# sourceMappingURL=circle.d.ts.map
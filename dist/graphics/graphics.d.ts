import Stage from '../display/stage';
import { Color } from '../display/abstract_display_object';
export { Color };
import { RenderingTypes } from '../display/abstract_display_object';
export declare type GraphicsTypes = 'line' | 'rectangle' | 'triangle' | 'circle' | 'roundedrect' | 'ellipse';
export default abstract class Graphics extends Stage {
    abstract readonly graphicsType: GraphicsTypes;
    abstract calcVertices(): number[];
    abstract calcStrokeVertices(): number[];
    abstract geometryInfo: any | undefined;
    readonly renderingType: RenderingTypes;
    vertices: number[];
    strokeVertices: number[];
    needsUpdatingVertices: boolean;
    needsUpdatingStroke: boolean;
    protected _strokeWidth: number;
    protected _stroke: Color;
    get strokeWidth(): number;
    set strokeWidth(value: number);
    get stroke(): Color;
    set stroke(value: Color);
    getGeometry(): any;
}
//# sourceMappingURL=graphics.d.ts.map
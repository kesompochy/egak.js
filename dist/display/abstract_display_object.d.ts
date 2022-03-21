export declare class TwoDemensionParam {
    _x: number;
    _y: number;
    set x(value: number);
    set y(value: number);
    get x(): number;
    get y(): number;
    set(x: number, y?: number): void;
}
export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}
export declare const defaultColor: Color;
export declare type RenderingTypes = 'sprite' | 'graphics' | '';
export declare type ShaderTypes = 'sprite' | 'polygon' | 'circle' | 'roundedrect' | 'ellipse' | '';
export default abstract class AbstractDisplayObject {
    private _position;
    private _opacity;
    private _scale;
    set opacity(value: number);
    get opacity(): number;
    rotation: number;
    get position(): TwoDemensionParam;
    get scale(): TwoDemensionParam;
    abstract readonly shaderType: ShaderTypes;
    abstract readonly renderingType: RenderingTypes;
}
//# sourceMappingURL=abstract_display_object.d.ts.map
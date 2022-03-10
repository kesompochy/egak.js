import Texture from '../texture/texture'

export class TwoDemensionParam {
    _x: number = 1;
    _y: number = 1;
    set x(value: number){
        this._x = value;
    }
    set y(value: number){
        this._y = value;
    }
    get x(): number{
        return this._x;
    }
    get y(): number{
        return this._y;
    }
    set(x: number, y?: number): void{
        this._x = x;
        this._y = y !== undefined ? y : x;
    }
}

class Position extends TwoDemensionParam {
    constructor(){
        super();
        this._x = 0;
        this._y = 0;
    }
}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export const defaultColor: Color = {
    r: 0, g: 0, b: 0, a: 1
};

export type RenderingTypes = 'sprite' | 'graphics' | '';
export type ShaderTypes = 'sprite' | 'polygon' | 'circle' | 'roundedrect' | 'ellipse' | '';


export default abstract class AbstractDisplayObject {
    texture: Texture | undefined;
    private _position: Position = new Position();
    private _opacity: number = 1;
    private _scale: TwoDemensionParam = new TwoDemensionParam();
    set opacity(value: number){
        this._opacity = Math.min(Math.max(value, 0), 1);
    }
    get opacity(): number{
        return this._opacity;
    }
    rotation: number = 0;
    get position(): TwoDemensionParam{
        return this._position;
    }
    get scale(): TwoDemensionParam{
        return this._scale;
    }
    abstract readonly shaderType: ShaderTypes;
    abstract readonly renderingType: RenderingTypes;
}
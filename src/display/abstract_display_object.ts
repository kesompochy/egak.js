import Texture from '../texture/texture'


export class twoDemensionParam {
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
        this._y = y ? y : x;
    }
}

export default abstract class AbstractDisplayObject {
    texture: Texture | undefined;
    private _position: twoDemensionParam = new twoDemensionParam();
    private _opacity: number = 1;
    private _scale: twoDemensionParam = new twoDemensionParam();
    set opacity(value: number){
        this._opacity = Math.min(Math.max(value, 0), 1);
    }
    get opacity(): number{
        return this._opacity;
    }
    rotation: number = 0;
    get position(): twoDemensionParam{
        return this._position;
    }
    get scale(): twoDemensionParam{
        return this._scale;
    }
}
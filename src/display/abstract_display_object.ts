import Renderer from '../renderer/renderer';
import Texture from '../texture/texture'

interface IPosition{
    x: number;
    y: number;
}

interface IScale{
    x: number;
    y: number;
    set(value: number): void;
}

export default abstract class AbstractDisplayObject {
    texture: Texture | undefined;
    position: IPosition = {x: 0, y: 0};
    private _opacity: number = 1;
    scale: IScale = {x: 1, y: 1, 
        set(value: number){
            this.x = value;
            this.y = value;
        }
    };
    set opacity(value: number){
        this._opacity = Math.min(Math.max(value, 0), 1);
    }
    get opacity(): number{
        return this._opacity;
    }
    rotation: number = 0;
    abstract render(renderer: Renderer): void;
    abstract renderingFunc(renderer: Renderer) : void;
}
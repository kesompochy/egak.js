import Stage from '../display/stage';
import type Graphics from '../graphics/graphics';
import { Sprite } from '../display';
interface IRendererParams {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}
export default class Renderer {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    resolution: number;
    private _screenSize;
    private _projectionMat;
    private _shaders;
    private _renderMethods;
    constructor(params: IRendererParams);
    render(obj: Stage): void;
    renderSprite(sprite: Sprite): void;
    renderGraphics(obj: Graphics): void;
    clear(r: number, g: number, b: number, a?: number): void;
    private _resizeCanvas;
    set width(value: number);
    set height(value: number);
    flush(): void;
}
export {};
//# sourceMappingURL=renderer.d.ts.map
import Renderer from '../renderer/renderer';
import { BaseStage } from '../display/stage';
import { eventType } from '../interaction/interaction';
interface IAppOption {
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement;
    autoStyleCanvas?: boolean;
    autoPreventDefault?: boolean;
}
export interface IResolution {
    x: number;
    y: number;
}
export declare const defaultResolution: IResolution;
export interface IScreenSize {
    width: number;
    height: number;
}
export default class App {
    renderer: Renderer;
    baseStage: BaseStage;
    loader: any;
    private _canvas;
    private _screenSize;
    private _preventTouchScrolling;
    constructor(options?: IAppOption);
    enablePointerEvent(...eventNames: eventType[]): void;
    set width(value: number);
    set height(value: number);
    private get _resolutionX();
    private get _resolutionY();
    render(): void;
    clearScreen(r?: number, g?: number, b?: number, a?: number): void;
    addResource(id: string, src: string, scaleMode?: string): void;
    loadAll(): void;
    get loaded(): boolean;
}
export {};
//# sourceMappingURL=application.d.ts.map
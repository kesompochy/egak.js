import Renderer from '../renderer/renderer';
import Stage from '../display/stage';
import Loader from '../loader/loader';
import Resolution from '../static/resolution';
import InteractionManager from '../interaction/interaction';
import {BaseStage} from '../display/stage';

interface IAppOption {
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement;
    autoStyleCanvas?: boolean;
}

const AppDefaultOption: IAppOption = {
    width: 300,
    height: 150,
    canvas: document.createElement('canvas'),
    autoStyleCanvas: false,
}

export interface IResolution {
    x: number;
    y: number;
}

export const defaultResolution: IResolution = {
    x: 1, y: 1
};

export interface IScreenSize {
    width: number;
    height: number;
}

export default class App {
    renderer: Renderer;
    baseStage: BaseStage;
    loader: any = Loader;
    private _canvas: HTMLCanvasElement;
    private _screenSize: IScreenSize;
    constructor(options?: IAppOption){
        if(!options) options = AppDefaultOption;

        const width = options.width || AppDefaultOption.width!;
        const height = options.height || AppDefaultOption.height!;
        const canvas = options.canvas || AppDefaultOption.canvas!;
        const autoStyleCanvas = options.autoStyleCanvas || AppDefaultOption.autoStyleCanvas!;

        this.baseStage = new BaseStage(width, height);

        this._canvas = canvas;
        if(autoStyleCanvas){
            this._canvas.style.width = `${width}px`;
            this._canvas.style.height = `${height}px`;
        }

        this._screenSize = {width: width, height: height};

        this.renderer = new Renderer({canvas: canvas, width: this._screenSize.width, height: this._screenSize.height});

        Resolution.x = this._resolutionX;
        Resolution.y = this._resolutionY;

        InteractionManager.canvas = canvas;
        InteractionManager.on();
        InteractionManager.screenSize = this._screenSize;
    }

    set width(value: number){
        this._screenSize.width = value;
        this.renderer.width = value;
        Resolution.x = this._resolutionX;
    }
    set height(value: number){
        this._screenSize.height = value;
        this.renderer.height = value;
        Resolution.y = this._resolutionY;
    }

    private get _resolutionX(): number{
        return this.renderer.resolution*this._canvas.width/this._screenSize.width;
    }
    private get _resolutionY(): number{
        return this.renderer.resolution*this._canvas.height/this._screenSize.height;
    }

    render(): void{
        this.renderer.render(this.baseStage);

        this.renderer.flush();
    }
    clearScreen(r: number = 0, g: number = 0, b: number = 0, a?: number): void{
        this.renderer.clear(r, g, b, a);
    }

    addResource(id: string, src: string){
        this.loader.add(id, src);
    }
    loadAll(): void{
        this.loader.loadAll();
    }

    get loaded(): boolean{
        return this.loader.loaded;
    }
}
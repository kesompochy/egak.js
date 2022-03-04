import Renderer from '../renderer/renderer';
import Stage from '../display/stage';
import Loader from '../loader/loader';
import Resolution from '../static/resolution';
import { twoDemensionParam } from '../display/abstract_display_object';

interface IAppOption {
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement;
    autoStyleCanvas?: boolean;
}

const AppDefaultOption = {
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

export default class App {
    renderer: Renderer;
    baseStage: Stage = new Stage();
    loader: Function = Loader;
    private _canvas: HTMLCanvasElement;
    screenSize: {width: number, height: number};
    constructor(options?: IAppOption){
        if(!options) options = AppDefaultOption;

        const width = options.width || AppDefaultOption.width;
        const height = options.height || AppDefaultOption.height;
        const canvas = options.canvas || AppDefaultOption.canvas;
        const autoStyleCanvas = options.autoStyleCanvas || AppDefaultOption.autoStyleCanvas;

        this._canvas = canvas;
        if(autoStyleCanvas){
            this._canvas.style.width = `${width}px`;
            this._canvas.style.height = `${height}px`;
        }

        this.screenSize = {width: width, height: height};

        this.renderer = new Renderer({canvas: canvas, width: this.screenSize.width, height: this.screenSize.height});

        Resolution.x = this._resolutionX;
        Resolution.y = this._resolutionY;
    }

    set width(value: number){
        this.screenSize.width = value;
        this.renderer.width = value;
        Resolution.x = this._resolutionX;
    }
    set height(value: number){
        this.screenSize.height = value;
        this.renderer.height = value;
        Resolution.y = this._resolutionY;
    }

    private get _resolutionX(): number{
        return this._canvas.width/this.screenSize.width*this.renderer.resolution;
    }
    private get _resolutionY(): number{
        return this._canvas.height/this.screenSize.height*this.renderer.resolution;
    }

    render(): void{
        this.renderer.render(this.baseStage);

        this.renderer.flush();
    }
    clearScreen(r: number = 0, g: number = 0, b: number = 0, a?: number): void{
        this.renderer.clear(r, g, b, a);
    }
}
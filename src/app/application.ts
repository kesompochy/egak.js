import Renderer from '../renderer/renderer';
import Stage from '../display/stage';
import Loader from '../loader/loader';
import Resolution from '../static/resolution';

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
    loader: any = Loader;
    canvas: HTMLCanvasElement;
    screenSize: {width: number, height: number};
    constructor(options?: IAppOption){
        options = Object.assign(AppDefaultOption, options);

        const {width, height, canvas, autoStyleCanvas} = options;
        this.canvas = canvas!;

        if(autoStyleCanvas){
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
        }

        this.screenSize = {width: width!, height: height!};

        this.renderer = new Renderer({canvas: canvas, width: this.screenSize.width, height: this.screenSize.height});

        Resolution.x = this.screenSize.width/this.canvas.width*this.renderer.resolution;
        Resolution.y = this.screenSize.height/this.canvas.height*this.renderer.resolution;
    }

    set width(value: number){
        this.screenSize.width = value;
        this.renderer.width = value;
        Resolution.x = this.screenSize.width/this.canvas.width*this.renderer.resolution;
    }
    set height(value: number){
        this.screenSize.height = value;
        this.renderer.height = value;
        Resolution.y = this.screenSize.height/this.canvas.height*this.renderer.resolution;
    }


    render(): void{
        this.renderer.renderStage(this.baseStage);
        this.renderer.flush();
    }
    clearScreen(r: number = 0, g: number = 0, b: number = 0, a?: number): void{
        this.renderer.clear(r, g, b, a);
    }
}
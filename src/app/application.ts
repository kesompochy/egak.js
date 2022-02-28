import Renderer from '../renderer/renderer';
import Container from '../display/container';
import Loader from './loader';


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
    baseContainer: Container = new Container();
    loader: Loader = new Loader();
    canvas: HTMLCanvasElement;
    screenSize: {width: number, height: number};
    resolution: IResolution;
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

        this.resolution = defaultResolution;
        this.resolution.x = this.canvas.width/this.screenSize.width;
        this.resolution.y = this.canvas.height/this.screenSize.height;
    }

    set width(value: number){
        this.screenSize.width = value;
        this.resolution.x = this.canvas.width/this.screenSize.width;
    }
    set height(value: number){
        this.screenSize.height = value;
        this.resolution.y = this.canvas.height/this.screenSize.height;
    }

    loopRender(): void{
        this.renderer.clear(233, 233, 233);
        this.baseContainer.render(this.renderer);
        this.renderer.flush();
        requestAnimationFrame(this.loopRender.bind(this));
    }

    start(): void{
        requestAnimationFrame(this.loopRender.bind(this));
    }
}
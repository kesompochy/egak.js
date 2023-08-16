import Renderer from '../renderer/renderer';
import Loader from '../loader/loader';
import Resolution from '../static/resolution';
import InteractionManager from '../interaction/interaction';
import { BaseStage } from '../display/stage';
import { eventType } from '../interaction/interaction';

interface IAppOption {
  width?: number;
  height?: number;
  screen?: HTMLCanvasElement;
  autoStyleCanvas?: boolean;
  autoPreventDefault?: boolean;
}

const appDefaultOption: IAppOption = {
  width: 300,
  height: 150,
  screen: document.createElement('canvas'),
  autoStyleCanvas: false,
  autoPreventDefault: true,
};

export interface IResolution {
  x: number;
  y: number;
}

export const defaultResolution: IResolution = {
  x: 1,
  y: 1,
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
  private _preventTouchScrolling: boolean;
  constructor(options?: IAppOption) {
    options = Object.assign(appDefaultOption, options);

    const width = options.width!;
    const height = options.height!;

    this.baseStage = new BaseStage(width, height);

    const screen = options.screen!;
    const autoStyleCanvas = options.autoStyleCanvas!;

    this._canvas = screen;
    if (autoStyleCanvas) {
      screen.style.width = `${width}px`;
      screen.style.height = `${height}px`;
    }

    this._screenSize = { width: width, height: height };

    this.renderer = new Renderer({ canvas: screen, width: width, height: height });

    Resolution.x = this._resolutionX;
    Resolution.y = this._resolutionY;

    InteractionManager.screenSize = this._screenSize;

    this._preventTouchScrolling = options.autoPreventDefault!;
  }

  enablePointerEvent(...eventNames: eventType[]) {
    eventNames.forEach((name) => {
      InteractionManager.enableEvent(name, this._canvas, this.baseStage);
    });
    if (!this._preventTouchScrolling) {
      InteractionManager.disablePreventScrolling(this._canvas);
    }
  }

  set width(value: number) {
    this._screenSize.width = value;
    this.renderer.width = value;
    Resolution.x = this._resolutionX;
  }
  set height(value: number) {
    this._screenSize.height = value;
    this.renderer.height = value;
    Resolution.y = this._resolutionY;
  }

  private get _resolutionX(): number {
    return (this.renderer.resolution * this._canvas.width) / this._screenSize.width;
  }
  private get _resolutionY(): number {
    return (this.renderer.resolution * this._canvas.height) / this._screenSize.height;
  }

  render(): void {
    this.renderer.render(this.baseStage);

    this.renderer.flush();
  }
  clearScreen(r: number = 0, g: number = 0, b: number = 0, a?: number): void {
    this.renderer.clear(r, g, b, a);
  }

  addResource(id: string, src: string, scaleMode?: string) {
    this.loader.add(id, src, scaleMode);
  }
  loadAll(): void {
    this.loader.loadAll();
  }

  get loaded(): boolean {
    return this.loader.loaded;
  }
}

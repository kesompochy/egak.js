import { IScreenSize } from '../app/application';
import type Stage from '../display/stage';

export interface IPointerCo {
  x: number;
  y: number;
}

export type eventType = 'pointerdown' | 'pointerup' | 'pointermove' | 'pointerout';

export interface IEvent {
  target: Stage;
  callback: Function;
}

export type EventSet = Set<IEvent>;

export default class InteractionManager {
  static screenSize: IScreenSize = { width: 0, height: 0 };
  private static _canvasSize: { w: number; h: number } = { w: 0, h: 0 };
  private static _canvas: HTMLCanvasElement | undefined;

  private static _getPointerCo(e: PointerEvent): IPointerCo {
    const size = this._canvasSize;
    return {
      x: (e.offsetX * this.screenSize.width) / size.w,
      y: (e.offsetY * this.screenSize.height) / size.h,
    };
  }

  static enableEvent(type: eventType, canvas: HTMLCanvasElement, baseStage: Stage): void {
    this.canvas = canvas;
    canvas.addEventListener(type, (e) => {
      const co = this._getPointerCo(e);
      baseStage.triggerEvent(type, co);
    });
  }
  static set canvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvasSize = this._getCanvasSize(canvas);
    this._resizeObserver = new ResizeObserver(() => {
      this._canvasSize = this._getCanvasSize(canvas);
    });
    this._resizeObserver.observe(document.body);
    canvas.addEventListener('touchstart', this._preventTouchScroll);
  }
  private static _preventTouchScroll(e: Event) {
    e.preventDefault();
  }
  private static _resizeObserver: ResizeObserver | undefined;
  private static _getCanvasSize(canvas: HTMLCanvasElement) {
    return { w: canvas.clientWidth, h: canvas.clientHeight };
  }

  static disablePreventScrolling(canvas: HTMLCanvasElement): void {
    canvas.removeEventListener('touchstart', this._preventTouchScroll);
  }
  static enablePreventScrolling(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('touchstart', this._preventTouchScroll);
  }
}

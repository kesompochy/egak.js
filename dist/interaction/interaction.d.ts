import { IScreenSize } from "../app/application";
import type Stage from '../display/stage';
export interface IPointerCo {
    x: number;
    y: number;
}
export declare type eventType = 'pointerdown' | 'pointerup' | 'pointermove';
export interface IEvent {
    target: Stage;
    callback: Function;
}
export declare type EventSet = Set<IEvent>;
export default class InteractionManager {
    static screenSize: IScreenSize;
    private static _canvasSize;
    private static _canvas;
    private static _getPointerCo;
    static enableEvent(type: eventType, canvas: HTMLCanvasElement, baseStage: Stage): void;
    static set canvas(canvas: HTMLCanvasElement);
    private static _preventTouchScroll;
    private static _resizeObserver;
    private static _getCanvasSize;
    static disablePreventScrolling(canvas: HTMLCanvasElement): void;
    static enablePreventScrolling(canvas: HTMLCanvasElement): void;
}
//# sourceMappingURL=interaction.d.ts.map
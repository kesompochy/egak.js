import { IScreenSize } from "../app/application";
import type Stage from '../display/stage';
import Rectangle from '../display/rectangle';

interface IPointerCo {
    x: number;
    y: number;
}

export enum Events {
    click = 'click'

}

interface IEvent{
    target: Stage;
    callback: Function;
}

type EventArray = Array<IEvent>;

export default class InteractionManager {
    private static _canvas: HTMLCanvasElement | undefined;
    static screenSize: IScreenSize = {width: 0, height: 0};
    private static _canvasSize: {w: number, h: number} = {w: 0, h: 0};

    private static _events: {
        click: EventArray
    } = {
        click: []
    }

    private static _getPointerCo(e: PointerEvent): IPointerCo{
        const rect = this._canvasSize;

        return {x: e.offsetX*this.screenSize.width/rect.w,
                y: e.offsetY*this.screenSize.height/rect.h};
    }
    static on(){
        this._canvas?.addEventListener('click', (e)=>{
            const co = this._getPointerCo(e as PointerEvent);
            this._dispatchEvents(Events.click, co);
        });
    }
    private static _dispatchEvents(type: Events, co: {x: number, y: number}){
        const events = this._events[type];
        for(let i=0, len=events.length;i<len;i++){
            const target = events[i].target;
            const rect: Rectangle = target.getBoundingRect();
            if(rect.detectPointHit(co.x, co.y)){
                events[i].callback();
            }
        }
    }
    static set canvas(canvas: HTMLCanvasElement){
        this._canvas = canvas;
        this._canvasSize = this._getCanvasSize(canvas);
        this._resizeObserver.observe(document.body);
    }
    private static _resizeObserver : ResizeObserver = new ResizeObserver(()=>{
        this._canvasSize = this._getCanvasSize(this._canvas!);
    });
    private static _getCanvasSize(canvas: HTMLCanvasElement){
        return {w: canvas.clientWidth, h: canvas.clientHeight};
    }

    static add(type: string, target: Stage, callback: Function){
        this._events[type].push({
            target: target,
            callback: callback
        });
    }
}
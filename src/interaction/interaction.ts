import { IScreenSize } from "../app/application";
import type Stage from '../display/stage';
import Rectangle from '../display/rectangle';

interface IPointerCo {
    x: number;
    y: number;
}


const events = ['pointerdown', 'pointerup', 'pointermove'] as const;
export {events};
export type EventKind = typeof events[number];

export interface IEvent{
    target: Stage;
    callback: Function;
}

export type EventArray = Array<IEvent>;

export default class InteractionManager {
    private static _canvas: HTMLCanvasElement | undefined;
    static screenSize: IScreenSize = {width: 0, height: 0};
    private static _canvasSize: {w: number, h: number} = {w: 0, h: 0};

    private static _eventsArys: {pointerup: EventArray, 
                                pointerdown: EventArray,
                                pointermove: EventArray,} = {
        pointerup: [],
        pointerdown: [],
        pointermove: [],
    };
    private static _getPointerCo(e: PointerEvent): IPointerCo{
        const rect = this._canvasSize;

        return {x: e.offsetX*this.screenSize.width/rect.w,
                y: e.offsetY*this.screenSize.height/rect.h};
    }
    static on(){
        for(const event of Object.values(events)){
            this._canvas?.addEventListener(event, (e)=>{
                const co = this._getPointerCo(e);
                this._dispatchEvents(event, co);
            });
        }
    }
    private static _dispatchEvents(type: EventKind, co: {x: number, y: number}){
        
        const eventAry = this._eventsArys[type];
        for(let i=0, len=eventAry.length;i<len;i++){
            const event = eventAry[i];
            const target = event.target;
            if(target.isOnStage){
                const rect: Rectangle = target.getBoundingRect();
                if(rect.detectPointHit(co.x, co.y)){
                    event.callback();
                }
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

    static add(type: EventKind, e: IEvent){
        this._eventsArys[type].push({
            target: e.target,
            callback: e.callback
        });
    }
}
import { IScreenSize } from "../app/application";
import Resolution from '../static/resolution';

interface IPointerCo {
    x: number;
    y: number;
}

export default class InteractionManager {
    private static _canvas: HTMLCanvasElement | undefined;
    static screenSize: IScreenSize = {width: 0, height: 0};

    private static _getPointerCo(e: PointerEvent): IPointerCo{
        const rect = this._getCanvasRect(this._canvas!);

        const px = e.clientX;
        const py = e.clientY;

        return {x: (px - rect.x)*this.screenSize.width/rect.w,
                y: (py - rect.y)*this.screenSize.height/rect.h};
    }
    static on(){
        this._canvas?.addEventListener('pointerdown', (e)=>{console.log(this._getPointerCo(e as PointerEvent));});
    }
    static set canvas(canvas: HTMLCanvasElement){
        this._canvas = canvas;
    }
    private static _getCanvasRect(canvas: HTMLCanvasElement){
        const rect = canvas.getBoundingClientRect();
        return {x: rect.x, y: rect.y, w: rect.width, h: rect.height};
    }
}
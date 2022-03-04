import Sprite from './sprite';

import Texture from '../texture/texture';

import { IResolution } from '../app/application';

import Resolution from '../static/resolution';

import { SCALE_MODE } from '../texture/texture';

export class TextStyle  {
    font: string = 'sans-serif';
    fontSize: number = 20;
    fill: string = '0x000000';
}

export default class Text extends Sprite {
    private _text: string = "";
    private _style: TextStyle;
    private _canvas: HTMLCanvasElement = document.createElement('canvas')
    private _resolution: IResolution = Resolution;
    constructor(text?: string, style?: TextStyle){
        super();


        this._text = text || '';
        this._style = style || new TextStyle();
        this._style.font = style?.font || 'sans-serif';
        this._style.fill = style?.fill || '0x000000';
        

        this.drawCanvas();

        const texture = new Texture(this._canvas, SCALE_MODE.LINEAR);
        this.texture = texture;
    }
    drawCanvas(){
        const canvas = this._canvas;
        const cxt = canvas.getContext('2d')!;

        const style = this._style;
        const text = this._text;

        cxt.clearRect(0, 0, canvas.width, canvas.height);

        canvas.width = 2;
        canvas.height = 2;

        cxt.font = `${style.fontSize}px ${style.font}`;
        cxt.textBaseline = 'top';

        const textData = cxt.measureText(text);
        const textWidth = textData.width;
        const textHeight = textData.actualBoundingBoxDescent - textData.actualBoundingBoxAscent;
        canvas.width = textWidth*this._resolution.x;
        canvas.height = textHeight*this._resolution.y;
        
        cxt.scale(this._resolution.x, this._resolution.y);
        cxt.font = `${style.fontSize}px ${style.font}`;
        cxt.textBaseline = 'top';
        cxt.fillStyle = 'rgb(255, 255, 255)'

        cxt.fillText(text, 0, 0);


        this.scale.x = 1/this._resolution.x;
        this.scale.y = 1/this._resolution.y;
    }

    get text(): string{
        return this._text;
    }
    set text(text: string){
        this._text = text;
        this.drawCanvas();
        this.texture!.texture = this._canvas;
    }
}
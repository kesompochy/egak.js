import Sprite from './sprite';

import Texture from '../texture/texture';

import { IResolution } from '../app/application';

import Resolution from '../static/resolution';

import { SCALE_MODE } from '../texture/texture';

export interface ITextStyle  {
    font: string;
    fontSize: number;
    fill: string;
    strokeWidth: number;
    stroke: string;
    shadow: string;
    shadowX: number;
    shadowY: number;
    shadowBlur: number;
};

const defaultTextStyle: ITextStyle = {
    font: 'sans-serif',
    fontSize: 20,
    fill: '#f00',
    strokeWidth: 0,
    stroke: '#000',
    shadow: '',
    shadowX: 1,
    shadowY: 1,
    shadowBlur: 0
};




export default class Text extends Sprite {
    texture: Texture;
    private _text: string = "";
    private _style: ITextStyle;
    private _canvas: HTMLCanvasElement = document.createElement('canvas')
    private _resolution: IResolution = Resolution;
    needsToUpdate: boolean = false;

    constructor(text?: string, style?: ITextStyle){
        super();

        this._text = text || '';
        style = style || defaultTextStyle;
        this._style = style;
        for(let styleName in defaultTextStyle){
            this._style[styleName] = style[styleName] || defaultTextStyle[styleName];
        }
        
        this.texture = new Texture(undefined, SCALE_MODE.LINEAR);
        this.updateCanvasTexture();
    }
    private _drawCanvas(){
        const canvas = this._canvas;
        const cxt = canvas.getContext('2d')!;

        const style = this._style;
        const text = this._text;

        canvas.width = 2;
        canvas.height = 2;

        cxt.font = `${style.fontSize}px ${style.font}`;
        cxt.textBaseline = 'top';

        const textData = cxt.measureText(text);
        const textWidth = textData.width + (style.shadow ? style.shadowX : 0);
        const textHeight = textData.actualBoundingBoxDescent - textData.actualBoundingBoxAscent + (style.shadow ? style.shadowY : 0);
        canvas.width = textWidth*this._resolution.x;
        canvas.height = textHeight*this._resolution.y;

        cxt.scale(this._resolution.x, this._resolution.y);

        cxt.clearRect(0, 0, canvas.width, canvas.height);
        
        cxt.beginPath();
        if(style.shadow){
            cxt.shadowOffsetX = style.shadowX;
            cxt.shadowOffsetY = style.shadowY;
            cxt.shadowBlur = style.shadowBlur;
            cxt.shadowColor = style.shadow;
        }
        cxt.font = `${style.fontSize}px ${style.font}`;
        cxt.textBaseline = 'top';
        cxt.fillStyle = style.fill;
        cxt.fillText(text, 0, 0);
        cxt.closePath();

        cxt.beginPath();
        if(style.strokeWidth){
            cxt.shadowOffsetX = 0;
            cxt.shadowOffsetY = 0;
            cxt.lineWidth = style.strokeWidth;
            cxt.strokeStyle = style.stroke;
            cxt.strokeText(text, 0, 0);
        }

        this.texture.scale.x = 1/this._resolution.x;
        this.texture.scale.y = 1/this._resolution.y;
    }

    get text(): string{
        return this._text;
    }
    set text(text: string){
        this._text = text;
        this.needsToUpdate = true;
    }
    async updateCanvasTexture(){
        this._drawCanvas();
        this.texture.texture = this._canvas;
        this.needsToUpdate = false;
    }

    get style(): ITextStyle{
        this.needsToUpdate = true;
        return this._style;
    }
}
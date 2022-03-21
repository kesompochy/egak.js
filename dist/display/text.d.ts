import Sprite from './sprite';
import Texture from '../texture/texture';
import { Color } from './abstract_display_object';
export interface ITextStyle {
    font?: string;
    fontSize?: number;
    fill?: Color;
    strokeWidth?: number;
    stroke?: Color;
    shadow?: Color;
    shadowX?: number;
    shadowY?: number;
    shadowBlur?: number;
}
export default class Text extends Sprite {
    protected _texture: Texture;
    private _text;
    private _style;
    private _canvas;
    private _resolution;
    needsToUpdate: boolean;
    constructor(text?: string, style?: ITextStyle);
    private _drawCanvas;
    get text(): string;
    set text(text: string);
    updateCanvasTexture(): Promise<void>;
    get style(): ITextStyle;
}
//# sourceMappingURL=text.d.ts.map
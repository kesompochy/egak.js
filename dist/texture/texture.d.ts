export declare type TextureOriginalImage = ImageBitmap | HTMLCanvasElement | HTMLImageElement;
export declare enum SCALE_MODE {
    LINEAR = "LINEAR",
    NEAREST = "NEAREST"
}
import { TwoDemensionParam } from '../display/abstract_display_object';
export default class Texture {
    glTexture: WebGLTexture;
    private _width;
    private _height;
    private _scale;
    scaleMode: SCALE_MODE;
    constructor(img: TextureOriginalImage | undefined, scaleMode?: SCALE_MODE);
    set texture(img: TextureOriginalImage);
    get scale(): TwoDemensionParam;
    get width(): number;
    get height(): number;
}
//# sourceMappingURL=texture.d.ts.map
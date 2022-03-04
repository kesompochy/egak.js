
import Context from '../static/context';
import * as glutils from '../renderer/glutils';

export type TextureOriginalImage = ImageBitmap | HTMLCanvasElement | HTMLImageElement;

export enum SCALE_MODE{
    LINEAR = 'LINEAR', 
    NEAREST = 'NEAREST'
};

import { twoDemensionParam } from '../display/abstract_display_object';

export default class Texture {
    glTexture: WebGLTexture;
    width: number = 0;
    height: number = 0;
    _scale: twoDemensionParam = new twoDemensionParam();
    scaleMode: SCALE_MODE = SCALE_MODE.NEAREST;
    constructor(img: TextureOriginalImage | undefined, scaleMode: SCALE_MODE= SCALE_MODE.NEAREST){
        this.scaleMode = scaleMode;

        const gl = Context.checkGL();
        const texture = glutils.createTexture(gl, scaleMode);

        if(img){
            this.glTexture =  glutils.uploadTexture(gl, texture, img);

            this.width = img.width;
            this.height = img.height;
        } else {
            this.glTexture = texture;
        }
        
    }
    set texture(img: TextureOriginalImage){
        const gl = Context.checkGL();
        this.glTexture = glutils.uploadTexture(gl, this.glTexture!, img);
        this.width = img.width;
        this.height = img.height;
    }

    get scale(): twoDemensionParam{
        return this._scale;
    }
}

import Context from '../static/context';
import * as glutils from '../renderer/glutils';

export type TextureOriginalImage = ImageBitmap | HTMLCanvasElement;

export enum SCALE_MODE{
    LINEAR = 'LINEAR', 
    NEAREST = 'NEAREST'
};

export default class Texture {
    glTexture: WebGLTexture;
    width: number = 1;
    height: number = 1;
    updated: boolean = false;
    scaleMode: SCALE_MODE = SCALE_MODE.NEAREST;
    constructor(originalImage: TextureOriginalImage, scaleMode: SCALE_MODE= SCALE_MODE.NEAREST){
        this.scaleMode = scaleMode;
        this.width = originalImage.width;
        this.height = originalImage.height;

        const gl = Context.checkGL();
        const texture = glutils.createTexture(gl, scaleMode);
        this.glTexture =  glutils.uploadTexture(gl, texture, originalImage);
    }
    set texture(img: TextureOriginalImage){
        const gl = Context.checkGL();
        this.glTexture = glutils.uploadTexture(gl, this.glTexture!, img);
        this.width = img.width;
        this.height = img.height;
    }
}



export default class Texture {
    glTexture: WebGLTexture | undefined;
    originalImage: HTMLCanvasElement | HTMLImageElement;
    width: number = 1;
    height: number = 1;
    updated: boolean = false;
    scaleMode: string = 'LINEAR';
    constructor(originalImage: HTMLImageElement | HTMLCanvasElement, scaleMode: string = 'LINEAR'){
        this.originalImage = originalImage;
        this.scaleMode = scaleMode;
        this.width = originalImage.width;
        this.height = originalImage.height;
    }
}
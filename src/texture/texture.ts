import Context from '../static/context';
import * as glutils from '../renderer/glutils';

export type TextureOriginalImage = ImageBitmap | HTMLCanvasElement | HTMLImageElement;

export enum SCALE_MODE {
  LINEAR = 'LINEAR',
  NEAREST = 'NEAREST',
}

import { TwoDemensionParam } from '../display/abstract_display_object';

export default class Texture {
  glTexture: WebGLTexture;
  private _width: number = 0;
  private _height: number = 0;
  private _scale: TwoDemensionParam = new TwoDemensionParam();
  scaleMode: SCALE_MODE = SCALE_MODE.NEAREST;
  constructor(img: TextureOriginalImage | undefined, scaleMode: SCALE_MODE = SCALE_MODE.NEAREST) {
    this.scaleMode = scaleMode;

    const gl = Context.checkGL();
    const texture = glutils.createTexture(gl, scaleMode);

    if (img) {
      this.glTexture = glutils.uploadTexture(gl, texture, img);

      this._width = img.width;
      this._height = img.height;
    } else {
      this.glTexture = texture;
    }
  }
  set texture(img: TextureOriginalImage) {
    const gl = Context.checkGL();
    this.glTexture = glutils.uploadTexture(gl, this.glTexture!, img);
    this._width = img.width;
    this._height = img.height;
  }

  get scale(): TwoDemensionParam {
    return this._scale;
  }

  get width(): number {
    return this._width;
  }
  get height(): number {
    return this._height;
  }
}

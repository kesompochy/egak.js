import Texture from '../texture/texture';
import Stage from './stage';

import * as m3 from '../matrix';

import { Anchor } from './stage';
class NormalAnchor {
  private _x: number = 0;
  private _y: number = 0;
  private _anchor: Anchor;
  private _texture: Texture | undefined;
  constructor(anchor: Anchor, texture?: Texture) {
    this._anchor = anchor;
    this._texture = texture;
  }
  set(x: number, y?: number) {
    this._x = x;
    this._y = y != undefined ? y : x;

    this._reflectAnchorX();
    this._reflectAnchorY();
  }
  private _reflectAnchorX(): void {
    const texture = this._texture;
    if (texture) this._anchor.x = texture.width * texture.scale.x * this._x;
  }
  private _reflectAnchorY(): void {
    const texture = this._texture;
    if (texture) this._anchor.y = texture.height * texture.scale.y * this._y;
  }
  set x(value: number) {
    this._x = value;
    this._reflectAnchorX();
  }
  get x(): number {
    return this._x;
  }
  set y(value: number) {
    this._y = value;
    this._reflectAnchorY();
  }
  get y(): number {
    return this._y;
  }
  set texture(tex: Texture | undefined) {
    this._texture = tex;
    this._reflectAnchorX();
    this._reflectAnchorY();
  }
}

import { RenderingTypes } from './abstract_display_object';
import Rectangle from '../math';

export default class Sprite extends Stage {
  protected _texture: Texture | undefined;
  readonly shaderType = 'sprite';
  readonly renderingType: RenderingTypes = 'sprite';

  constructor(texture?: Texture) {
    super();
    if (texture) {
      this.texture = texture;
    }
  }

  normalAnchor: NormalAnchor = new NormalAnchor(this.anchor);
  set texture(tex: Texture | undefined) {
    this._texture = tex;
    this.normalAnchor.texture = tex;
  }
  get texture(): Texture | undefined {
    return this._texture;
  }

  protected _calculateTransform(): Array<number> {
    const position = m3.translation(this.position.x, this.position.y);
    const scaling = m3.scaling(this.scale.x, this.scale.y);
    const rotation = m3.rotation(this.rotation);

    const anchor = m3.translation(-this.anchor.x, -this.anchor.y);

    const transform = m3.someMultiply(position, rotation, scaling, anchor);

    return transform;
  }

  protected _getBoundingRect(): Rectangle {
    const parentScale = this.worldScale;
    const parentPos = this.worldPosition;
    let anchor;
    if (this.texture && (this.normalAnchor.x || this.normalAnchor.y)) {
      anchor = {
        x: this.texture.width * this.normalAnchor.x,
        y: this.texture.height * this.normalAnchor.y,
      };
    } else {
      anchor = { x: this.anchor.x, y: this.anchor.y };
    }
    const x = parentPos.x + (this.position.x - anchor.x) * parentScale.x;
    const y = parentPos.y + (this.position.y - anchor.y) * parentScale.y;
    const w =
      (this.texture ? this.texture.width * this.texture.scale.x : this._size.width) *
      this.scale.x *
      parentScale.x;
    const h =
      (this.texture ? this.texture.height * this.texture.scale.y : this._size.height) *
      this.scale.y *
      parentScale.y;

    return new Rectangle(x, y, w, h);
  }
}

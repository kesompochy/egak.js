import Texture from '../texture/texture';
import Stage from './stage';
import { Anchor } from './stage';
declare class NormalAnchor {
    private _x;
    private _y;
    private _anchor;
    private _texture;
    constructor(anchor: Anchor, texture?: Texture);
    set(x: number, y?: number): void;
    private _reflectAnchorX;
    private _reflectAnchorY;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set texture(tex: Texture | undefined);
}
import { RenderingTypes } from './abstract_display_object';
import Rectangle from '../math';
export default class Sprite extends Stage {
    protected _texture: Texture | undefined;
    readonly shaderType = "sprite";
    readonly renderingType: RenderingTypes;
    constructor(texture?: Texture);
    normalAnchor: NormalAnchor;
    set texture(tex: Texture | undefined);
    get texture(): Texture | undefined;
    protected _calculateTransform(): Array<number>;
    protected _getBoundingRect(): Rectangle;
}
export {};
//# sourceMappingURL=sprite.d.ts.map
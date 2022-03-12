import Texture from '../texture/texture';
import Stage from './stage';

import * as m3 from '../matrix';

class NormalAnchor {
    x: number = 0;
    y: number = 0;


    set(x: number, y?: number){
        this.x = x;
        this.y = y ? y : x;
    }
    clear(){
        this.x = this.y = 0;
    }
}

import { RenderingTypes } from './abstract_display_object';
import Rectangle from '../math';

export default class Sprite extends Stage{
    texture: Texture | undefined;
    readonly shaderType  = 'sprite';
    readonly renderingType: RenderingTypes = 'sprite';
    
    constructor(texture?: Texture){
        super();
        if(texture) {
            this.texture = texture;
        }
    }

    normalAnchor: NormalAnchor = new NormalAnchor();


    protected _calculateTransform(): Array<number>{
        const position = m3.translation(this.position.x, this.position.y);
        const scaling = m3.scaling(this.scale.x, this.scale.y);
        const rotation = m3.rotation(this.rotation);

        let anchor;
        if(this.texture && (this.normalAnchor.x || this.normalAnchor.y)){
            anchor = m3.translation(-this.texture.width*this.normalAnchor.x, -this.texture.height*this.normalAnchor.y);
        } else {
            anchor = m3.translation(-this.anchor.x, -this.anchor.y);
        }

        const transform = m3.someMultiply(position, rotation, scaling, anchor);

        return transform;
    }

    protected _getBoundingRect(): Rectangle{
        const parentScale = this.worldScale;
        const parentPos = this.worldPosition;
        let anchor;
        if(this.texture && (this.normalAnchor.x || this.normalAnchor.y)){
            anchor = {x: this.texture.width * this.normalAnchor.x,
                        y: this.texture.height * this.normalAnchor.y};
        } else {
            anchor = {x: this.anchor.x, y: this.anchor.y};
        }
        const x = parentPos.x + (this.position.x - anchor.x)*parentScale.x;
        const y = parentPos.y + (this.position.y - anchor.y)*parentScale.y;
        const w = (this.texture ? this.texture.width*this.texture.scale.x : this._size.width)*this.scale.x * parentScale.x;
        const h = (this.texture ? this.texture.height*this.texture.scale.y : this._size.height)*this.scale.y * parentScale.y;

        return new Rectangle(x, y, w, h);
    }

}
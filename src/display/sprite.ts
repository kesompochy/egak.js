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

}
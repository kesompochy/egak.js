import Texture from '../texture/texture';
import Stage from './stage';

import * as m3 from '../matrix';

interface Rectangle{
    x: number;
    y: number;
    w: number;
    h: number;
}

export default class Sprite extends Stage{
    texture: Texture | undefined;
    
    constructor(texture?: Texture){
        super();
        if(texture) {
            this.texture = texture;
        }
    }

    getBoundingRect(): Rectangle{
        const parentScale = this.worldScale;
        const x = (this.position.x - this.anchor.x)*parentScale.x;
        const y = (this.position.y - this.anchor.y)*parentScale.y;
        const w = (this.texture ? this.texture.width : 0)*this.scale.x * parentScale.x;
        const h = (this.texture ? this.texture.height : 0)*this.scale.y * parentScale.y;

        return {x: x, y: y, w: w, h: h};
    }

}
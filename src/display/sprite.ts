import Texture from '../texture/texture';
import Stage from './stage';



export default class Sprite extends Stage{
    texture: Texture | undefined;
    
    constructor(texture?: Texture){
        super();
        if(texture) {
            this.texture = texture;
        }
    }

}
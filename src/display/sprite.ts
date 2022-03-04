import Texture from '../texture/texture';
import Renderer from '../renderer/renderer';
import Container from './stage';



import * as m3 from '../matrix';

export default class Sprite extends Container{
    texture: Texture | undefined;
    
    transform: Array<number> = m3.identity();
    constructor(texture?: Texture){
        super();
        if(texture) this.texture = texture;
    }
    renderingFunc= (renderer: Renderer)=> {
        renderer.renderSprite(this);
    }

}
import AbstractDisplayObject from './abstract_display_object';
import Renderer from '../renderer/renderer';

import * as m3 from '../matrix';



export interface IAnchor {
    x: number;
    y: number;
}




export default class Container extends AbstractDisplayObject{
    anchor: IAnchor = {x: 0, y: 0};
    transform: Array<number> = m3.identity();
    parentTransform: Array<number> = m3.identity();
    parentOpacity: number = 1;
    parent: Container | undefined = undefined;
    renderingFunc = (renderer: Renderer)=>{};

    children: Array<AbstractDisplayObject> = [];
    render(renderer: Renderer): void{
        this.transform = this.calculateTransform();
        this.parentTransform = this.calculateParentTransform();
        this.parentOpacity = this.calculateParentOpacity();

        this.renderingFunc(renderer);

        const children = this.children;
        for(let i=0, len=children.length;i<len;i++){
            children[i].render(renderer);
        }
    }
    addChild(obj: Container): Container{
        this.children.push(obj);
        obj.parent = this;
        return this;
    }
    calculateTransform(): Array<number>{
        const position = m3.translation(this.position.x, this.position.y);
        const scaling = m3.scaling(this.scale.x, this.scale.y);
        const rotation = m3.rotation(this.rotation);
        const anchor = m3.translation(-this.anchor.x, -this.anchor.y);

        const transform = m3.someMultiply(position, rotation, scaling, anchor);

        return transform;
    }
    calculateParentTransform(): Array<number>{
        if(this.parent) {
            return m3.multiply(this.parent.parentTransform, this.parent.transform);
        } else {
            return m3.identity();
        }
    }
    calculateParentOpacity(): number{
        if(this.parent){
            return this.parent.parentOpacity * this.parent.opacity;
        } else{
            return 1;
        }
    }

    set x(value: number){
        this.position.x = value;
    }
    set y(value: number){
        this.position.y = value;
    }
    get x(): number {
        return this.position.x;
    }
    get y(): number {
        return this.position.y;
    }
}
import AbstractDisplayObject from './abstract_display_object';

import { twoDemensionParam } from './abstract_display_object';

import * as m3 from '../matrix';



export default class Stage extends AbstractDisplayObject{
    anchor: twoDemensionParam = new twoDemensionParam();
    transform: Array<number> = m3.identity();
    parentTransform: Array<number> = m3.identity();
    parentOpacity: number = 1;
    parent: Stage | undefined = undefined;

    children: Array<Stage> = [];
    calcRenderingInfos(): void{
        this.transform = this._calculateTransform();
        this.parentTransform = this._calculateParentTransform();
        this.parentOpacity = this._calculateParentOpacity();
    }
    addChild(obj: Stage): Stage{
        this.children.push(obj);
        obj.parent = this;
        return this;
    }
    private _calculateTransform(): Array<number>{
        const position = m3.translation(this.position.x, this.position.y);
        const scaling = m3.scaling(this.scale.x, this.scale.y);
        const rotation = m3.rotation(this.rotation);
        const anchor = m3.translation(-this.anchor.x, -this.anchor.y);

        const transform = m3.someMultiply(position, rotation, scaling, anchor);

        return transform;
    }
    private _calculateParentTransform(): Array<number>{
        if(this.parent) {
            return m3.multiply(this.parent.parentTransform, this.parent.transform);
        } else {
            return m3.identity();
        }
    }
    private _calculateParentOpacity(): number{
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
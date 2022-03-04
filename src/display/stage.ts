import AbstractDisplayObject from './abstract_display_object';

import { TwoDemensionParam } from './abstract_display_object';

import InteractionManager from '../interaction/interaction';

import * as m3 from '../matrix';

import {Events} from '../interaction/interaction';

class Anchor extends TwoDemensionParam{
    constructor(){
        super();
        this._x = 0;
        this._y = 0;
    }
}

export default class Stage extends AbstractDisplayObject{
    anchor: Anchor = new Anchor();
    transform: Array<number> = m3.identity();
    parentTransform: Array<number> = m3.identity();
    parentOpacity: number = 1;
    parent: Stage | undefined = undefined;

    protected _size : {width: number, height: number} = {width: 0, height: 0};

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
    protected _calculateTransform(): Array<number>{
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

    get worldScale(): {x: number, y: number}{
        if(this.parent){
            const parent = this.parent;
            const worldScale = parent.worldScale;
            return {x: worldScale.x * parent.scale.x, y: worldScale.y * parent.scale.y};
        } else {
            return {x: 1, y: 1};
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

    get width(): number{
        return this._size.width;
    }
    get height(): number{
        return this._size.height;
    }
    set width(value: number){
        this._size.width = value;
    }
    set height(value: number){
        this._size.height = value;
    }

    addEventListener(type: Events, callback: Function){
        InteractionManager.add(type, this, callback);
    }

    detectPointHit(co: {x: number, y: number}): boolean{
        return this.x < co.x && this.x + this.width > co.x
            && this.y < co.y && this.y + this.height > co.y;
    }
}

export class BaseStage extends Stage{
    readonly _size: {width: number, height: number};
    constructor(width: number, height: number){
        super();
        this._size = {width: width, height: height};
    }
}
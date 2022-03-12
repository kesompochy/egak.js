import AbstractDisplayObject from './abstract_display_object';

import Sprite from './sprite';

import { TwoDemensionParam } from './abstract_display_object';

import * as m3 from '../matrix';

import {eventType} from '../interaction/interaction';

import Rectangle from '../math/rectangle';

import {EventSet, IEvent, IPointerCo} from '../interaction/interaction';

export class Anchor extends TwoDemensionParam{
    constructor(){
        super();
        this._x = 0;
        this._y = 0;
    }
}

import { ShaderTypes, RenderingTypes } from './abstract_display_object';
export default class Stage extends AbstractDisplayObject{
    anchor: Anchor = new Anchor();
    transform: Array<number> = m3.identity();
    parentTransform: Array<number> = m3.identity();
    parentOpacity: number = 1;
    parent: Stage | undefined = undefined;

    readonly renderingType: RenderingTypes = '';
    readonly shaderType: ShaderTypes = '';

    private _zIndex: number = 0;
    set zIndex(value: number){
        this._zIndex = value;
        if(this.parent) this.parent.needsToSort = true;
    }
    get zIndex(): number{
        return this._zIndex;
    }

    needsToSort: boolean = false;

    protected _size : {width: number, height: number} = {width: 0, height: 0};
    set staticWidth(value: number){
        this._size.width = value;
    }
    get staticWidth(): number{
        return this._size.width;
    }
    set staticHeight(value: number){
        this._size.height = value;
    }
    get staticHeight(): number{
        return this._size.height;
    }

    protected _eventsSets: {pointerdown: EventSet, pointerup: EventSet, pointermove: EventSet}
                        = {pointerdown: new Set, pointerup: new Set(), pointermove: new Set()};

    children: Array<Stage> = [];
    calcRenderingInfos(): void{
        this.transform = this._calculateTransform();
        this.parentTransform = this._calculateParentTransform();
        this.parentOpacity = this._calculateParentOpacity();
    }
    addChild(obj: Stage): void{
        if(!obj.parent){
            obj.parent = this;
            this.children.push(obj);
        }

    }
    removeChild(obj: Stage): void{
        this.children.splice(this.children.indexOf(obj), 1);
        obj.parent = undefined;
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
    get wholeOpacity(): number{
        return this.opacity * this.parentOpacity;
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
    get worldPosition(): {x: number, y: number}{
        if(this.parent){
            const parent = this.parent;
            const parentWorldPos = parent.worldPosition;
            const parentScale = parent.worldScale;
            return {x: parentWorldPos.x + parent.position.x*parentScale.x, y: parentWorldPos.y + parent.position.y*parentScale.y};
        } else {
            return {x: 0, y: 0};
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

    addEventListener(type: eventType, callback: Function){
        const e: IEvent = {target: this, callback: callback};
        this._eventsSets[type].add(e);
    }
    protected _getBoundingRect(): Rectangle{
        const parentScale = this.worldScale;
        const parentPos = this.worldPosition;
        const x = parentPos.x + (this.position.x - this.anchor.x)*parentScale.x;
        const y = parentPos.y + (this.position.y - this.anchor.y)*parentScale.y;
        const w = this._size.width*this.scale.x * parentScale.x;
        const h = this._size.height*this.scale.y * parentScale.y;

        return new Rectangle(x, y, w, h);
    }
    triggerEvent(type: eventType, co: IPointerCo): void{
        const myRect = this._getBoundingRect();
        if(myRect.detectPointHit(co.x, co.y)){
            const events = this._eventsSets[type];
            events.forEach((event: IEvent)=>{
                event.callback();
            });
        }

        this.propagateEvent(type, co);
    }
    propagateEvent(type: eventType, co: IPointerCo){
        const children = this.children;
        for(let i=0, len=children.length;i<len;i++){
            children[i].triggerEvent(type, co);
        }
    }

    sortChildren(): void{
        this.children.sort((a, b)=>{return a.zIndex - b.zIndex;});
    }
}

export class BaseStage extends Stage{
    readonly _size: {width: number, height: number};
    constructor(width: number, height: number){
        super();
        this._size = {width: width, height: height};
    }
}
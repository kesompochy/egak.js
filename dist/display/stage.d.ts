import AbstractDisplayObject from './abstract_display_object';
import { TwoDemensionParam } from './abstract_display_object';
import { eventType } from '../interaction/interaction';
import Rectangle from '../math/rectangle';
import { EventSet, IPointerCo } from '../interaction/interaction';
export declare class Anchor extends TwoDemensionParam {
    constructor();
}
import { ShaderTypes, RenderingTypes } from './abstract_display_object';
export default class Stage extends AbstractDisplayObject {
    anchor: Anchor;
    transform: Array<number>;
    parentTransform: Array<number>;
    parentOpacity: number;
    parent: Stage | undefined;
    readonly renderingType: RenderingTypes;
    readonly shaderType: ShaderTypes;
    private _zIndex;
    set zIndex(value: number);
    get zIndex(): number;
    needsToSort: boolean;
    protected _size: {
        width: number;
        height: number;
    };
    set staticWidth(value: number);
    get staticWidth(): number;
    set staticHeight(value: number);
    get staticHeight(): number;
    protected _eventsSets: {
        pointerdown: EventSet;
        pointerup: EventSet;
        pointermove: EventSet;
        pointerout: EventSet;
    };
    children: Array<Stage>;
    calcRenderingInfos(): void;
    addChild(obj: Stage): void;
    removeChild(obj: Stage): void;
    protected _calculateTransform(): Array<number>;
    private _calculateParentTransform;
    private _calculateParentOpacity;
    get wholeOpacity(): number;
    get worldScale(): {
        x: number;
        y: number;
    };
    get worldPosition(): {
        x: number;
        y: number;
    };
    set x(value: number);
    set y(value: number);
    get x(): number;
    get y(): number;
    addEventListener(type: eventType, callback: Function): void;
    protected _getBoundingRect(): Rectangle;
    triggerEvent(type: eventType, co: IPointerCo): void;
    propagateEvent(type: eventType, co: IPointerCo): void;
    sortChildren(): void;
}
export declare class BaseStage extends Stage {
    readonly _size: {
        width: number;
        height: number;
    };
    constructor(width: number, height: number);
}
//# sourceMappingURL=stage.d.ts.map
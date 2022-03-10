import Stage from '../display/stage';

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

const defaultColor: Color = {
    r: 0, g: 0, b: 0, a: 1
};

import { RenderingTypes } from '../display/abstract_display_object';

export type GraphicsTypes = 'line' | 'rectangle' | 'triangle' | 'circle' | 'roundedrect';

export default abstract class Graphics extends Stage {
    abstract readonly graphicsType: GraphicsTypes;
    abstract calcVertices(): number[];
    abstract calcStrokeVertices(): number[];
    strokeWidth: number = 0;
    stroke: Color | undefined;
    abstract geometryInfo: any | undefined;//自由に使える空間
    readonly renderingType: RenderingTypes = 'graphics';
    vertices: number[] = [];
    strokeVertices: number[] = [];
    needsUpdatingVertices: boolean = true;

    constructor(){
        super();
    }
}


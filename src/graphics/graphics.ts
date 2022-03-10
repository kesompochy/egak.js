import Stage from '../display/stage';

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

import { RenderingTypes } from '../display/abstract_display_object';

export type GraphicsTypes = 'line' | 'rectangle' | 'triangle' | 'circle' | 'roundedrect';

export default abstract class Graphics extends Stage {
    abstract readonly graphicsType: GraphicsTypes;
    abstract getVertices(): number[];
    abstract getStrokeVertices(): number[];
    strokeWidth: number = 0;
    stroke: Color | undefined;
    geometryInfo: any;
    readonly renderingType: RenderingTypes = 'graphics';
}


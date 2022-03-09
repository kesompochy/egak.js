import Stage from '../display/stage';

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export default abstract class Graphics extends Stage {
    abstract readonly graphicsType: string;
    abstract getVertices(): number[];
    abstract getStrokeVertices(): number[];
    strokeWidth: number = 0;
    stroke: Color | undefined;
    geometryInfo: any;
}


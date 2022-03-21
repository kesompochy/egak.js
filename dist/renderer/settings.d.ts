import type Graphics from '../graphics/graphics';
export interface IProgramStructure {
    name: string;
    vss: string;
    fss: string;
    attribParams: Array<IAttribParam>;
    uniforms: Array<string>;
}
export interface IAttribParam {
    name: string;
    size: number;
    type: string;
    stride: number;
    offset: number;
}
export declare const programInfos: Array<IProgramStructure>;
export declare const drawModes: {
    line: string;
    triangle: string;
    rectangle: string;
    circle: string;
    roundedrect: string;
    ellipse: string;
};
export declare const getDrawSize: {
    line: (obj: Graphics) => any;
    triangle: () => number;
    rectangle: () => number;
    circle: () => number;
    roundedrect: () => number;
    ellipse: () => number;
};
export declare const getUniformUploadFunc: {
    polygon: () => void;
    circle: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any) => void;
    roundedrect: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any) => void;
    ellipse: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any) => void;
};
export declare const getStrokeUniformOptions: {
    polygon: () => void;
    circle: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any, stroke: number, strokeWid: number) => void;
    roundedrect: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any, stroke: number, strokeWid: number) => void;
    ellipse: (gl: WebGL2RenderingContext, uniforms: Object, geometry: any, stroke: number, strokeWid: number) => void;
};
export declare const getIndices: {
    line: (obj: Graphics) => Array<number>;
    triangle: () => Array<number>;
    rectangle: () => Array<number>;
    circle: () => Array<number>;
    roundedrect: () => Array<number>;
    ellipse: () => Array<number>;
};
export declare const COLOR_BYTES = 256;
declare const attribPrefix = "a_";
declare const uniformPrefix = "u_";
export { attribPrefix, uniformPrefix };
//# sourceMappingURL=settings.d.ts.map
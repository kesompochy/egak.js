import { IAttribParam } from '../settings';
export interface IProgramInfo {
    program: WebGLProgram;
    vbo: Object;
    ibo: Object;
    uniforms: Object;
    pointAttrs: Function;
}
export declare function createProgramInfo(gl: WebGL2RenderingContext, vss: string, fss: string, attribParams: Array<IAttribParam>, uniNames: Array<string>): IProgramInfo;
//# sourceMappingURL=program.d.ts.map
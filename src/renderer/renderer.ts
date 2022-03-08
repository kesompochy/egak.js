import Stage from '../display/stage';
import Context from '../static/context';
import type Text from '../display/text';

import spriteVSS from './shader_sources/sprite/vertex.glsl';
import spriteFSS from './shader_sources/sprite/fragment.glsl';
import lineVSS from './shader_sources/line/vertex.glsl';
import lineFSS from './shader_sources/line/fragment.glsl';

import * as glutils from './glutils';

import * as m3 from '../matrix';


interface IRendererParams{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}

interface IProgramInfo{
    program: WebGLProgram;
    vbo: Object;
    ibo: Object;
    uniforms: Object;
    pointAttrs: Function;
}

interface IProgramStructure{
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


const positionSize = 2;
const texcoordSize = 2;
const colorSize = 4;
function getFloatBytes(value: number) : number{
    return Float32Array.BYTES_PER_ELEMENT * value;
}
const programInfos: Array<IProgramStructure> = [
    {   
        name: 'sprite',
        vss: spriteVSS,
        fss: spriteFSS,
        attribParams: [
            {name: 'position', size: positionSize, type: 'FLOAT', stride: getFloatBytes(positionSize+texcoordSize), offset: 0},
            {name: 'texcoord', size: texcoordSize, type: 'FLOAT', stride: getFloatBytes(positionSize+texcoordSize), offset: getFloatBytes(positionSize)}
        ],
        uniforms: ['transformation', 'opacity', 'texture']
    },
    {
        name: 'line',
        vss: lineVSS,
        fss: lineFSS,
        attribParams: [
            {name: 'position', size: positionSize, type: 'FLOAT', stride: getFloatBytes(positionSize+colorSize), offset: 0},
            {name: 'color', size: colorSize, type: 'FLOAT', stride: getFloatBytes(positionSize+colorSize), offset: getFloatBytes(positionSize)}
        ],
        uniforms: ['transformation', 'opacity']
    }
];

const COLOR_BYTES = 256;

const attribPrefix = 'a_';
const uniformPrefix = 'u_';
export {attribPrefix};

export default class Renderer{
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    resolution: number = window.devicePixelRatio || 1;
    private _screenSize: {width: number, height: number};
    private _projectionMat: number[] = [];

    private _programs: Map<string, IProgramInfo> = new Map();

    constructor(params: IRendererParams){

        const {canvas, width, height} = params;

        this.canvas = canvas;

        this._screenSize = {width: width, height: height};
        this.width = width;
        this.height = height;
        
        this.gl = this.canvas.getContext('webgl2')!;
        const gl = this.gl;
        Context.gl = gl;

        this.resizeCanvas();

        //alpha有効化
        glutils.enableAlpha(gl);

        //glの準備
        for(let i=0, len=programInfos.length;i<len;i++){
            const info = programInfos[i];
            this._programs.set(info.name, this._createProgram(
                gl, info.vss, info.fss, info.attribParams, info.uniforms
            ));
        }

    }

    private _createProgram(gl: WebGL2RenderingContext, vss: string, fss: string,
                         attribParams: Array<IAttribParam>, 
                         uniNames: Array<string>): IProgramInfo{
        const program = glutils.createProgram(gl, vss, fss);
        const vbo = glutils.createLinkedVBO(gl, program, attribParams);
        const ibo = glutils.createRectangleIndices(gl);
        const uniforms = {};
        for(let i=0, len=uniNames.length;i<len;i++){
            const name = uniNames[i];
            uniforms[name] = glutils.getUniformLocation(gl, program, uniformPrefix+ name);
        }

        const point = ()=>{
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            for(let i=0, len=attribParams.length;i<len;i++){
                const param = attribParams[i];
                gl.vertexAttribPointer(gl.getAttribLocation(program, attribPrefix + param.name), param.size, gl[param.type], false, param.stride, param.offset);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        };

        return {
            program: program,
            vbo: vbo,
            ibo: ibo,
            uniforms: uniforms,
            pointAttrs: point
        }
    }

    render(obj: Stage): void{
        obj.calcRenderingInfos();

        const texture = obj.texture;
        if(texture){
            this.renderSprite(obj);
        }

        if(obj.vertices){
            this.renderLine(obj);
        }

        if(obj.needsToSort){
            obj.sortChildren();
            obj.needsToSort = false;
        }
        const children = obj.children;
        for(let i=0, len=children.length;i<len;i++){
            this.render(children[i]);
        }
    }

    renderSprite(sprite: Stage): void{
        const texture = sprite.texture;
        if(!texture){
            return;
        }

        if((sprite as Text).needsToUpdate){
            (sprite as Text).updateCanvasTexture();
        }

        const glTexture = texture.glTexture!;

        const gl = this.gl;

        const programInfo = this._programs.get('sprite')!;
        const {program, uniforms, vbo, ibo} = programInfo;

        gl.useProgram(program);

        const textureUnitID = 0;
        gl.uniform1i(uniforms['texture'], textureUnitID);
        gl.activeTexture(gl.TEXTURE0 + textureUnitID);
        gl.bindTexture(gl.TEXTURE_2D, glTexture);

        const textureScaling = m3.scaling(texture.scale.x, texture.scale.y);
        const transformation = m3.someMultiply(this._projectionMat, sprite.parentTransform, sprite.transform, textureScaling);
        gl.uniformMatrix3fv(uniforms['transformation'], false, transformation);


        gl.uniform1f(uniforms['opacity'], sprite.wholeOpacity);


        const vertexBuffer = vbo;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        const textureSize = {w: texture.width, h: texture.height};

        const vertices = [
            0, 0,
            0, 0,
            0, textureSize.h,
            0, 1,
            textureSize.w, 0,
            1, 0,
            textureSize.w, textureSize.h,
            1, 1
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        programInfo.pointAttrs();

        const indexBuffer = ibo;
        const size = 6;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        
    }

    renderLine(line: any): void{
        const gl = this.gl;
        const programInfo = this._programs.get('line')!;
        const {program, uniforms, vbo, ibo} = programInfo;

        gl.useProgram(program);

        const transformation = m3.someMultiply(this._projectionMat, line.parentTransform, line.transform);
        gl.uniformMatrix3fv(uniforms['transformation'], false, transformation);

        gl.uniform1f(uniforms['opacity'], line.wholeOpacity);

        const vertexBuffer = vbo;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        const vertices: number[] = [];
        for(let i=0, len=line.vertices.length;i<len;i++){
            const vertInfos = line.vertices[i];
            vertices.push(vertInfos[0], vertInfos[1], vertInfos[2]/COLOR_BYTES, vertInfos[3]/COLOR_BYTES, vertInfos[4]/COLOR_BYTES, vertInfos[5]);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        programInfo.pointAttrs();

        const size = line.vertices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        const ary: number[] = [];
        for(let i=0;i<size;i++){
            ary.push(i);
        }
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ary), gl.DYNAMIC_DRAW);
        gl.drawElements(gl.LINE_STRIP, size, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    clear(r: number, g: number, b: number, a?: number): void{
        glutils.clearCanvas(this.gl, {r: r, g: g, b: b, a: a});
    }
    resizeCanvas(){
        glutils.resizeCanvas(this.gl, this.resolution);
    }
    set width(value: number){
        this._screenSize.width = value;
        this._projectionMat = m3.projection(value, this._screenSize.height);
    }
    set height(value: number){
        this._screenSize.height = value;
        this._projectionMat = m3.projection(this._screenSize.width, value);
    }
    flush(): void{
        this.gl.flush();
    }


}

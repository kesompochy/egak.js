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

export interface IAttribParam {
    name: string;
    size: number;
    type: number;
    stride: number;
    offset: number;
}



const programElements = {
    sprite: {
        VSS: spriteVSS,
        FSS: spriteFSS,
        attrParams: [
        ],
        uniforms: ['transform', 'opacity', 'texture']
    }
};

const attribPrefix = 'a_';
const uniformPrefix = 'u_';
export {attribPrefix};

export default class Renderer{
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    resolution: number = window.devicePixelRatio || 1;
    private _screenSize: {width: number, height: number};

    private _programs: Map<string, IProgramInfo> = new Map();

    constructor(params: IRendererParams){

        const {canvas, width, height} = params;

        this.canvas = canvas;

        this._screenSize = {width: width!, height: height!};
        
        this.gl = this.canvas.getContext('webgl2')!;
        const gl = this.gl;
        Context.gl = gl;

        this.resizeCanvas();

        //alpha有効化
        glutils.enableAlpha(gl);

        //glの準備
        const positionSize = 2;
        const texCoSize = 2;
        const stride = Float32Array.BYTES_PER_ELEMENT*(positionSize + texCoSize);
        const offset = Float32Array.BYTES_PER_ELEMENT*positionSize;
        this._programs.set('sprite', this._createProgram(gl, spriteVSS, spriteFSS, [
            {name: 'position', size: positionSize, type: gl.FLOAT, stride: stride, offset: 0},
            {name: 'texcoord', size: texCoSize, type: gl.FLOAT, stride: stride, offset: offset} 
        ], ['transformation', 'opacity', 'texture']));

        
        const posSize = 2;
        const colorSize = 4;
        const type = gl.FLOAT;
        const str = Float32Array.BYTES_PER_ELEMENT*(posSize + colorSize);
        const offs = Float32Array.BYTES_PER_ELEMENT*posSize;
        this._programs.set('line', this._createProgram(gl, lineVSS, lineFSS, [
            {name: 'position', size: posSize, type: type, stride: str, offset: 0},
            {name: 'color', size: colorSize, type: type, stride: str, offset: offs}
        ], ['transformation', 'opacity']));

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
                gl.vertexAttribPointer(gl.getAttribLocation(program, attribPrefix + param.name), param.size, param.type, false, param.stride, param.offset);
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
            //this.renderLine(obj);
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
        const program = programInfo.program;
        const uniforms = programInfo.uniforms;
        const vbo = programInfo.vbo;
        const ibo = programInfo.ibo;

        gl.useProgram(program);

        const textureUnitID = 0;
        gl.uniform1i(uniforms['texture'], textureUnitID);
        gl.activeTexture(gl.TEXTURE0 + textureUnitID);
        gl.bindTexture(gl.TEXTURE_2D, glTexture);

        const projection= m3.projection(this._screenSize.width, this._screenSize.height);
        const textureScaling = m3.scaling(texture.scale.x, texture.scale.y);
        const transformation = m3.someMultiply(projection, sprite.parentTransform, sprite.transform, textureScaling);
        gl.uniformMatrix3fv(uniforms['transformation'], false, transformation);

        const opacity = sprite.opacity;
        const worldOpacity = sprite.parentOpacity;
        const wholeOpacity = worldOpacity*opacity;
        gl.uniform1f(uniforms['opacity'], wholeOpacity);


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
        programInfo.pointAttrs();//これどうにかしたい

        const indexBuffer = ibo;
        const size = 6;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        
    }

    renderLine(line: any): void{
        /*
        const gl = this.gl;
        const programInfo = this._programs.get('line')! as ILineProgram;
        gl.useProgram(programInfo.program);

        const projection = m3.projection(this._screenSize.width, this._screenSize.height);
        const transformation = m3.someMultiply(projection, line.parentTransform, line.transform);
        gl.uniformMatrix3fv(programInfo.uniforms.transform, false, transformation);

        const opacity = line.opacity;
        const worldOpacity = line.parentOpacity;
        const wholeOpacity = worldOpacity*opacity;
        gl.uniform1f(programInfo.uniforms.opacity, wholeOpacity);

        const vertexBuffer = programInfo.buffers.vertices;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        const vertices = [

        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        const size = 6;
        gl.drawArrays(gl.LINE_STRIP, 0, vertices.length/size);*/
    }

    clear(r: number, g: number, b: number, a?: number): void{
        glutils.clearCanvas(this.gl, {r: r, g: g, b: b, a: a});
    }
    resizeCanvas(){
        glutils.resizeCanvas(this.gl, this.resolution);
    }
    set width(value: number){
        this._screenSize.width = value;
    }
    set height(value: number){
        this._screenSize.height = value;
    }
    flush(): void{
        this.gl.flush();
    }


}

import Sprite from '../display/sprite';
import Stage from '../display/stage';
import Context from '../static/context';
import Texture from '../texture/texture';

import vShaderSource from './shader_sources/vertex_shader_source.glsl';
import fShaderSource from './shader_sources/fragment_shader_source.glsl';
import * as glutils from './glutils';

import * as m3 from '../matrix';


interface IRendererParams{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}



const uniformPrefix = 'u_';

export default class Renderer{
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    private _textureUniformLocation: WebGLUniformLocation;
    private _indexBuffer: WebGLBuffer;
    private _vertexBuffer: WebGLBuffer;
    resolution: number = window.devicePixelRatio || 1;
    private _screenSize: {width: number, height: number};
    private _program: WebGLProgram;

    private _transformUniformLocation: WebGLUniformLocation;
    private _opacityUniformLocation: WebGLUniformLocation;
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
        const program = glutils.createProgram(gl, vShaderSource, fShaderSource);
        this._program = program;

        this._indexBuffer = glutils.createRectangleIndices(gl);
        this._vertexBuffer = glutils.createLinkedVertexBuffer(gl, program, 'a_position', 'a_texcoord');
    
        this._transformUniformLocation = glutils.getUniformLocation(gl, program, uniformPrefix+'transformation');
        this._opacityUniformLocation = glutils.getUniformLocation(gl, program, uniformPrefix+'opacity');
        
        this._textureUniformLocation = glutils.getUniformLocation(gl, program, uniformPrefix+'texture');
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

    render(obj: Stage): void{
        obj.calcRenderingInfos();

        const texture = obj.texture;
        if(texture){
            this.renderSprite(obj);
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

        const glTexture = texture.glTexture!;

        const gl = this.gl;
        const textureUniformLocation = this._textureUniformLocation;

        gl.useProgram(this._program);

        const textureUnitID = 0;
        gl.uniform1i(textureUniformLocation, textureUnitID);
        gl.activeTexture(gl.TEXTURE0 + textureUnitID);
        gl.bindTexture(gl.TEXTURE_2D, glTexture);

        const projection= m3.projection(this._screenSize.width, this._screenSize.height);
        const textureScaling = m3.scaling(texture.scale.x, texture.scale.y);
        const transformation = m3.someMultiply(projection, sprite.parentTransform, sprite.transform, textureScaling);
        gl.uniformMatrix3fv(this._transformUniformLocation, false, transformation);

        const opacity = sprite.opacity;
        const worldOpacity = sprite.parentOpacity;
        const wholeOpacity = worldOpacity*opacity;
        gl.uniform1f(this._opacityUniformLocation, wholeOpacity);

        const vertexBuffer = this._vertexBuffer;
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
        
        const indexBuffer = this._indexBuffer;
        const size = 6;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}

import Sprite from '../display/sprite';
import Stage from '../display/stage';
import Context from '../static/context';

import vShaderSource from './shader_sources/vertex_shader_source.glsl';
import fShaderSource from './shader_sources/fragment_shader_source.glsl';
import * as glutils from './glutils';

import * as m3 from '../matrix';

import Texture from '../texture/texture';


interface IRendererOptions{
    canvas?: HTMLCanvasElement;
    width?: number;
    height?: number;
}

const defaultOptions: IRendererOptions = {
    canvas: undefined,
    width: 300,
    height: 150
};

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
    constructor(options: IRendererOptions){

        Object.assign(defaultOptions, options);

        const {canvas, width, height} = defaultOptions;


        this.canvas = canvas || document.createElement('canvas');

        this._screenSize = {width: width!, height: height!};
        
        this.gl = this.canvas.getContext('webgl2')!;
        const gl = this.gl;
        Context.gl = gl;

        this.resizeCanvas();

        glutils.enableAlpha(gl);

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

    updateTexture(texture: Texture){
        glutils.uploadTexture(this.gl, texture.glTexture!, texture.originalImage);
        texture.updated = true;
    }

    renderSprite(sprite: Sprite): void{
        const texture = sprite.texture;
        if(!texture || !texture.glTexture || !texture.originalImage){
            return;
        }


        const baseTexture = texture.glTexture!;

        const textureSize = {w: texture.width, h: texture.height};

        const gl = this.gl;
        const textureUniformLocation = this._textureUniformLocation;

        gl.useProgram(this._program);

        const textureUnitID = 0;
        gl.uniform1i(textureUniformLocation, textureUnitID);
        gl.activeTexture(gl.TEXTURE0 + textureUnitID);
        gl.bindTexture(gl.TEXTURE_2D, baseTexture);


        const projection= m3.projection(this._screenSize.width, this._screenSize.height);
        const transformation = m3.someMultiply(projection, sprite.parentTransform, sprite.transform);
        gl.uniformMatrix3fv(this._transformUniformLocation, false, transformation);

        const opacity = sprite.opacity;
        const worldOpacity = sprite.parentOpacity;
        const wholeOpacity = worldOpacity*opacity;
        gl.uniform1f(this._opacityUniformLocation, wholeOpacity);

        const vertexBuffer = this._vertexBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        
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

    renderStage(stage: Stage): void{
        stage.render(this);
    }
}

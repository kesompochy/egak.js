import Stage from '../display/stage';
import Context from '../static/context';
import type Graphics from '../graphics/graphics';
import type Text from '../display/text';

import * as glutils from './glutils';
import * as m3 from '../matrix';

import * as Settings from './settings';
import {getDrawSize, getIndices, drawModes, getUniformUploadFunc, getStrokeUniformOptions} from './settings';
import { Sprite } from '../display';

interface IRendererParams{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}


type Shaders = {
    sprite?: glutils.IProgramInfo;
    polygon?: glutils.IProgramInfo;
    circle?: glutils.IProgramInfo;
}


export default class Renderer{
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    resolution: number = window.devicePixelRatio || 1;
    private _screenSize: {width: number, height: number};
    private _projectionMat: number[] = [];

    private _shaders: Shaders = {};
    private _renderMethods: Object = {sprite: this.renderSprite.bind(this), 
                                    graphics: this.renderGraphics.bind(this)};

    constructor(params: IRendererParams){

        const {canvas, width, height} = params;

        this.canvas = canvas;

        this._screenSize = {width: width, height: height};
        this._projectionMat = m3.projection(width, height);
        
        this.gl = this.canvas.getContext('webgl2')!;
        const gl = this.gl;
        Context.gl = gl;

        this.resizeCanvas();

        //alpha有効化
        glutils.enableAlpha(gl);

        //glの準備
        const programInfos = Settings.programInfos;
        for(let i=0, len=programInfos.length;i<len;i++){
            const info = programInfos[i];
            this._shaders[info.name] = glutils.createProgramInfo(gl, info.vss, info.fss, info.attribParams, info.uniforms);
        }
    }


    render(obj: Stage): void{
        obj.calcRenderingInfos();

        //render for each obj's renderType
        if(obj.renderingType){
            this._renderMethods[obj.renderingType](obj);
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


    renderSprite(sprite: Sprite): void{
        const texture = sprite.texture;
        if(!texture){
            return;
        }

        if((sprite as Text).needsToUpdate){
            (sprite as Text).updateCanvasTexture();
        }

        const glTexture = texture.glTexture!;

        const gl = this.gl;

        const programInfo = this._shaders.sprite!;
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

    renderGraphics(obj: Graphics){
        const programInfo = this._shaders[obj.shaderType]!;
        const {program, uniforms, vbo, ibo} = programInfo;
        const gl = this.gl;

        gl.useProgram(program);

        //common process for graphics
        const transformation = m3.someMultiply(this._projectionMat, obj.parentTransform, obj.transform);
        gl.uniformMatrix3fv(uniforms['transformation'], false, transformation);
        gl.uniform1f(uniforms['opacity'], obj.wholeOpacity);

        const uploadFunc = getUniformUploadFunc[obj.shaderType];
        uploadFunc(gl, uniforms, obj);

        const strokeUniformOptions = getStrokeUniformOptions[obj.shaderType];

        const draw = (vertices: number[], isStroke: number = 0) => {
            strokeUniformOptions(gl, uniforms, obj, isStroke);

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
            programInfo.pointAttrs();
            const size = getDrawSize[obj.graphicsType](obj);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
            const indices = getIndices[obj.graphicsType](obj);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.DYNAMIC_DRAW);
            gl.drawElements(gl[drawModes[obj.graphicsType]], size, gl.UNSIGNED_SHORT, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        if(obj.strokeWidth) draw(obj.getStrokeVertices(), 1);
        draw(obj.getVertices(), 0);
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

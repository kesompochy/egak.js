import Graphics from '../graphics';

import {Color, GraphicsTypes} from '../graphics';

export default class Rectangle extends Graphics{
    readonly graphicsType: GraphicsTypes = 'rectangle';
    geometryInfo: {x: number, y: number, w: number, h: number} = {x: 0, y: 0, w: 0, h: 0};
    colors: number[][] = [];
    stroke: Color = {r: 0, g: 0, b: 0, a: 1};
    strokeWidth: number = 0;
    constructor(x: number, y: number, w: number, h: number, ...color: number[][]){
        super();
        this.geometryInfo.x = x;
        this.geometryInfo.y = y;
        this.geometryInfo.w = w;
        this.geometryInfo.h = h;
        for(let i=0, len=color.length;i<len;i++){
            this.colors.push(color[i]);
        }
    }
    getVertices(): number[]{
        const {x, y, w, h} = this.geometryInfo;
        const color = this.colors;
        const vertices: number[] = [];
        vertices.push(x, y, color[0][0], color[0][1], color[0][2], color[0][3]);
        vertices.push(x, y+h, color[1][0], color[1][1], color[1][2], color[1][3]);
        vertices.push(x+w, y, color[2][0], color[2][1], color[2][2], color[2][3]);
        vertices.push(x+w, y+h, color[3][0], color[3][1], color[3][2], color[3][3]);
        return vertices;
    }
    getStrokeVertices(): number[]{
        const {x, y, w, h} = this.geometryInfo;
        const wid = this.strokeWidth;
        const color = this.stroke;
        const vertices: number[] = [];
        vertices.push(x-wid, y-wid, color.r, color.g, color.b, color.a);
        vertices.push(x-wid, y+h+wid, color.r, color.g, color.b, color.a);
        vertices.push(x+w+wid, y-wid, color.r, color.g, color.b, color.a);
        vertices.push(x+w+wid, y+h+wid, color.r, color.g, color.b, color.a);
        return vertices;  
    }
}
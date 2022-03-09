type ClockWize = -1 | 1;

import Graphics from "../graphics";

import {Color} from '../graphics';

export default class Circle extends Graphics{
    readonly graphicsType: string = 'circle';
    readonly shaderType: string = 'circle';
    radius: number;
    center: {x: number, y: number};
    color: Color = {r: 0, g: 0, b: 0, a: 1};
    startAngle: number = 0;
    endAngle: number = Math.PI*2;
    clockWize: ClockWize = 1;
    geometryInfo: number[][] = []
    constructor(x: number, y: number, radius: number, r: number, g: number, b: number, a: number, start?: number, end?: number){
        super();
        this.radius = radius;
        this.center = {x: x, y: y};
        this.color = {r: r, g: g, b: b, a: a};
        this.startAngle = start || 0;
        this.endAngle = end || Math.PI*2;
    }

    getVertices(): number[] {
        const vertices: number[] = [];
        const {center, radius, color} = this;
        const {x, y} = center;
        vertices.push(x-radius, y-radius, color.r, color.g, color.b, color.a);
        vertices.push(x-radius, y+radius, color.r, color.g, color.b, color.a);
        vertices.push(x+radius, y-radius, color.r, color.g, color.b, color.a);
        vertices.push(x+radius, y+radius, color.r, color.g, color.b, color.a);
        return vertices;
    }
    getStrokeVertices(): number[] {
        const vertices: number[] = [];
        const {center, radius} = this;
        const {x, y} = center;
        const wid = this.strokeWidth;
        const stroke = this.stroke!;
        vertices.push(x-radius-wid, y-radius-wid, stroke.r, stroke.g, stroke.b, stroke.a);
        vertices.push(x-radius-wid, y+radius+wid, stroke.r, stroke.g, stroke.b, stroke.a);
        vertices.push(x+radius+wid, y-radius-wid, stroke.r, stroke.g, stroke.b, stroke.a);
        vertices.push(x+radius+wid, y+radius+wid, stroke.r, stroke.g, stroke.b, stroke.a);
        return vertices;
    }
}
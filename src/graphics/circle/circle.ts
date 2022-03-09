type ClockWize = -1 | 1;

import Graphics from "../graphics";
export default class Circle extends Graphics{
    readonly graphicsType: string = 'circle';
    readonly shaderType: string = 'circle';
    radius: number;
    center: {x: number, y: number};
    startAngle: number = 0;
    endAngle: number = Math.PI*2;
    clockWize: ClockWize = 1;
    constructor(x: number, y: number, radius: number, r: number, g: number, b: number, a: number, start?: number, end?: number){
        super();
        this.vertices.push([x-radius, y-radius, r, g, b, a]);
        this.vertices.push([x-radius, y+radius, r, g, b, a]);
        this.vertices.push([x+radius, y-radius, r, g, b, a]);
        this.vertices.push([x+radius, y+radius, r, g, b, a]);
        this.radius = radius;
        this.center = {x: x, y: y};
        this.startAngle = start || 0;
        this.endAngle = end || Math.PI*2;
    }
}
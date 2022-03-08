import Graphics from "./graphics";
export default class Circle extends Graphics{
    readonly graphicsType: string = 'circle';
    readonly shaderType: string = 'circle';
    radius: number;
    center: {x: number, y: number};
    constructor(x: number, y: number, radius: number, r: number, g: number, b: number, a: number){
        super();
        this.vertices.push([x-radius, y-radius, r, g, b, a]);
        this.vertices.push([x-radius, y+radius, r, g, b, a]);
        this.vertices.push([x+radius, y-radius, r, g, b, a]);
        this.vertices.push([x+radius, y+radius, r, g, b, a]);
        this.radius = radius;
        this.center = {x: x, y: y};
    }
}
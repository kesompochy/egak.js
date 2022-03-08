import Graphics from './graphics';

export default class Rectangle extends Graphics{
    type: string = 'rectangle';
    constructor(x: number, y: number, w: number, h: number, r: number, g: number, b: number, a: number){
        super();
        this.vertices.push([x, y, r, g, b, a]);
        this.vertices.push([x+w, y, r, g, b, a]);
        this.vertices.push([x+w, y+h, r, g, b, a]);
        this.vertices.push([x, y+h, r, g, b, a]);
    }
}
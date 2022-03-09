import Line from './line';

export default class Rectangle extends Line{
    readonly graphicsType: string = 'rectangle';
    constructor(x: number, y: number, w: number, h: number, ...color: number[][]){
        super();
        this.vertices.push([x, y, color[0][0], color[0][1], color[0][2], color[0][3]]);
        this.vertices.push([x, y+h, color[1][0], color[1][1], color[1][2], color[1][3]]);
        this.vertices.push([x+w, y, color[2][0], color[2][1], color[2][2], color[2][3]]);
        this.vertices.push([x+w, y+h, color[3][0], color[3][1], color[3][2], color[3][3]]);
    }
}
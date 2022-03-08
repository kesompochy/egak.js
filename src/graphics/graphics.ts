import Stage from '../display/stage';

export default class Graphics extends Stage {

}

export interface ILineVertic {
    position: {x: number, y: number};
    color: {r: number, g: number, b: number, a: number};
}

export class Line extends Graphics{
    vertices: Array<ILineVertic> = [];
    constructor(...vertices: ILineVertic[]){
        super();
        this.vertices = vertices;
    }
}
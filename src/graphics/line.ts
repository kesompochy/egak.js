import Graphics from './graphics';

export default class Line extends Graphics{
    type = 'line';
    constructor(...vertices: number[][]){
        super();
        this.vertices = vertices || [];
    }
    getVertex(index: number){
        const vertex = this.vertices[index];
        return {
            get x(): number{
                return vertex[0];
            },
            set x(value: number){
                vertex[0] = value;
            },
            get y(): number{
                return vertex[1];
            },
            set y(value: number){
                vertex[1] = value;
            },
            get r(): number{
                return vertex[2];
            },
            set r(value: number){
                vertex[2] = value;
            },
            get g(): number{
                return vertex[3];
            },
            set g(value: number){
                vertex[3] = value;
            },
            get b(): number{
                return vertex[4];
            },
            set b(value: number){
                vertex[4] = value;
            },
            get a(): number{
                return vertex[5];
            },
            set a(value: number){
                vertex[5] = value;
            }
        }
    }
}
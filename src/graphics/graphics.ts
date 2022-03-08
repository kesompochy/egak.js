import Stage from '../display/stage';


export default abstract class Graphics extends Stage {
    abstract readonly type: string;
    vertices: Array<Array<number>> = [];
}


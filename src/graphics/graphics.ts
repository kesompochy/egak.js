import Stage from '../display/stage';


export default abstract class Graphics extends Stage {
    abstract readonly graphicsType: string;
    vertices: Array<Array<number>> = [];
}


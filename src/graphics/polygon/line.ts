import Graphics from '../graphics';

export default class Line extends Graphics{
    readonly shaderType: string = 'polygon'
    readonly graphicsType: string = 'line';
    readonly geometryInfo: number[][] = [];
    constructor(...vertices: number[][]){
        super();
        this.geometryInfo = vertices;
    }
    getVertices(){
        const vertices: number[] = [];
        for(let i=0, len=this.geometryInfo.length;i<len;i++){
            for(let j=0;j<6;j++){
                vertices.push(this.geometryInfo[i][j]);
            }
        }
        return vertices;
    }
    getStrokeVertices(): number[] {
        return [];
    }
}
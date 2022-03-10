import Graphics from "../graphics";
import { ShaderTypes } from "../../display/abstract_display_object";
import {GraphicsTypes} from '../graphics';

export default class RoundedRect extends Graphics{
    readonly shaderType: ShaderTypes = 'roundedrect';
    readonly graphicsType: GraphicsTypes = 'roundedrect';

    geometryInfo: any;

    constructor(x: number, y: number, w: number, h: number, radius: number, ...colors: number[][]){
        super();
        this.geometryInfo = {
            x: x, y: y, w: w, h: h, radius: radius,
            colors: colors
        };
    }

    getVertices(): number[]{
        const {x, y, w, h, colors} = this.geometryInfo;
        const vertices = [
            x, y, colors[0][0], colors[0][1], colors[0][2], colors[0][3],
            x, y+h, colors[1][0], colors[1][1], colors[1][2], colors[1][3],
            x+w, y, colors[2][0], colors[2][1], colors[2][2], colors[2][3],
            x+w, y+h, colors[3][0], colors[3][1], colors[3][2], colors[3][3],
        ];
        return vertices;
    }
    getStrokeVertices(): number[] {
        const {x, y, w, h} = this.geometryInfo;
        const strokeCol = this.stroke!;
        const wid = this.strokeWidth;
        const vertices = [
            x-wid, y-wid, strokeCol.r, strokeCol.g, strokeCol.b, strokeCol.a,
            x-wid, y+h+wid, strokeCol.r, strokeCol.g, strokeCol.b, strokeCol.a,
            x+w+wid, y-wid, strokeCol.r, strokeCol.g, strokeCol.b, strokeCol.a,
            x+w+wid, y+h+wid, strokeCol.r, strokeCol.g, strokeCol.b, strokeCol.a,
        ];
        return vertices;
    }
}
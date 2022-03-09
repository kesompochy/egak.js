import spriteVSS from './shader_sources/sprite/vertex.glsl';
import spriteFSS from './shader_sources/sprite/fragment.glsl';
import lineVSS from './shader_sources/line/vertex.glsl';
import lineFSS from './shader_sources/line/fragment.glsl';
import circleVSS from './shader_sources/circle/vertex.glsl';
import circleFSS from './shader_sources/circle/fragment.glsl';
import type Graphics from '../graphics/graphics';

export interface IProgramStructure{
    name: string;
    vss: string;
    fss: string;
    attribParams: Array<IAttribParam>;
    uniforms: Array<string>;
}

export interface IAttribParam {
    name: string;
    size: number;
    type: string;
    stride: number;
    offset: number;
}


const positionSize = 2;
const texcoordSize = 2;
const colorSize = 4;
function getFloatBytes(value: number) : number{
    return Float32Array.BYTES_PER_ELEMENT * value;
}
export const programInfos: Array<IProgramStructure> = [
    {   
        name: 'sprite',
        vss: spriteVSS,
        fss: spriteFSS,
        attribParams: [
            {name: 'position', size: positionSize, type: 'FLOAT', stride: getFloatBytes(positionSize+texcoordSize), offset: 0},
            {name: 'texcoord', size: texcoordSize, type: 'FLOAT', stride: getFloatBytes(positionSize+texcoordSize), offset: getFloatBytes(positionSize)}
        ],
        uniforms: ['transformation', 'opacity', 'texture']
    },
    {
        name: 'polygon',
        vss: lineVSS,
        fss: lineFSS,
        attribParams: [
            {name: 'position', size: positionSize, type: 'FLOAT', stride: getFloatBytes(positionSize+colorSize), offset: 0},
            {name: 'color', size: colorSize, type: 'FLOAT', stride: getFloatBytes(positionSize+colorSize), offset: getFloatBytes(positionSize)}
        ],
        uniforms: ['transformation', 'opacity']
    },
    {
        name: 'circle',
        vss: circleVSS,
        fss: circleFSS,
        attribParams: [
            {name: 'position', size: positionSize, type: 'FLOAT', stride: getFloatBytes(positionSize+colorSize), offset: 0},
            {name: 'color', size: colorSize, type: 'FLOAT', stride: getFloatBytes(positionSize+colorSize), offset: getFloatBytes(positionSize)}
        ], uniforms: ['transformation', 'opacity', 'radius', 'center', 'startAngle', 'endAngle', 'clockwize']
    }
];

export const drawModes = {
    line: 'LINE_STRIP',
    triangle: 'TRIANGLE_STRIP',
    rectangle: 'TRIANGLES',
    circle: 'TRIANGLES'
}
export const getDrawSize = {
    line: (obj: Graphics) => {
        return obj.vertices!.length;
    },
    triangle: () => {
        return 3;
    },
    rectangle: () => {
        return 6;
    },
    circle: () => {
        return 6;
    }
}

const recIndices = [0, 1, 2, 1, 3, 2];
export const getIndices = {
    line: (obj: Graphics): Array<number>=>{
        const ary: number[] = [];
        for(let i=0, len=obj.vertices.length;i<len;i++){
            ary.push(i);
        }
        return ary;
    },
    triangle: (): Array<number> => {
        return [0, 1, 2];
    },
    rectangle: (): Array<number> => {
        return recIndices;
    },
    circle: (): Array<number> => {
        return recIndices;
    }
}


export const COLOR_BYTES = 256;

const attribPrefix = 'a_';
const uniformPrefix = 'u_';
export {attribPrefix, uniformPrefix};
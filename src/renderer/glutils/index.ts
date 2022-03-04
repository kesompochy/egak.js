import { createProgram } from './program';
import { createLinkedVertexBuffer, createRectangleIndices } from './buffer';
import {createTexture, uploadTexture} from './texture';
import { enableAlpha } from './alpha';
import { clearCanvas, resizeCanvas } from './canvas';
import { getUniformLocation } from './uniform';

export { createProgram, 
        createRectangleIndices, createLinkedVertexBuffer,
        createTexture, uploadTexture, 
        enableAlpha,
        clearCanvas, resizeCanvas, 
        getUniformLocation
};
import { createProgram, createShader, createLinkedProgram } from './program';
import { createLinkedVertexBuffer, createLinkedVBO, createRectangleIndices} from './buffer';
import {createTexture, uploadTexture} from './texture';
import { enableAlpha } from './alpha';
import { clearCanvas, resizeCanvas } from './canvas';
import { getUniformLocation } from './uniform';

export { createProgram, createShader, createLinkedProgram,
        createRectangleIndices, createLinkedVBO, createLinkedVertexBuffer,
        createTexture, uploadTexture, 
        enableAlpha,
        clearCanvas, resizeCanvas, 
        getUniformLocation
};
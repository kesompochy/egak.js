function  createBuffer(gl: WebGL2RenderingContext, type: number, ary: any): WebGLBuffer{
    const buffer = gl.createBuffer()!;
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, ary, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return buffer;
}


import { attribPrefix } from "../settings";


import { IAttribParam } from "../settings";
export function createLinkedVBO(gl: WebGL2RenderingContext, program: WebGLProgram, 
                                attrParams: Array<IAttribParam>){

    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    for(let i=0, len=attrParams.length;i<len;i++){
        const param = attrParams[i];
        const loc = gl.getAttribLocation(program, attribPrefix + param.name);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, param.size, gl[param.type], false, param.stride, param.offset);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;

}

export function createLinkedVertexBuffer(gl: WebGL2RenderingContext, program: WebGLProgram, positionAttribName: string, coordAttribName: string){
    const positionAttribLocation = gl.getAttribLocation(program, positionAttribName);
    const texcoordAttribLocation = gl.getAttribLocation(program, coordAttribName);


    const positionSize = 2;
    const textureSize = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = Float32Array.BYTES_PER_ELEMENT * (positionSize + textureSize);
    const offset = Float32Array.BYTES_PER_ELEMENT * positionSize;

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(texcoordAttribLocation);
    gl.vertexAttribPointer(positionAttribLocation, positionSize, type, normalize, stride, 0);
    gl.vertexAttribPointer(texcoordAttribLocation, textureSize, type, normalize, stride, offset);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vertexBuffer!;
}

export function createRectangleIndices(gl: WebGL2RenderingContext){
    const indices = new Uint16Array(
        [0, 1, 2, 
         1, 3, 2]);
    const indexBuffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices);
    return indexBuffer;
}

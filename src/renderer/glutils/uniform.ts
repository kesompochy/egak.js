export function getUniformLocation(gl: WebGL2RenderingContext, program: WebGLProgram, uniformName: string){
    return gl.getUniformLocation(program, uniformName)!;
}
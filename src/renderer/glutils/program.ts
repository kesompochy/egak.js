export function createShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader{
    const shader = gl.createShader(type);
    if(!shader){
        throw new Error('failed to create a shader');
    }
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    return shader;

    
}


export function createLinkedProgram(gl: WebGL2RenderingContext, ...shaders: WebGLShader[]): WebGLProgram{
    const program = gl.createProgram();
    if(!program){
        throw new Error('failed to create program');
    }

    for(let i=0, len=shaders.length;i<len;i++){
        gl.attachShader(program, shaders[i]);
    }
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    return program;
    
}


export function createProgram(gl: WebGL2RenderingContext, vSource: string, fSource: string){
    const vShader = createShader(gl, gl.VERTEX_SHADER, vSource);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fSource);
    const program = createLinkedProgram(gl, vShader, fShader);

    return program;
}
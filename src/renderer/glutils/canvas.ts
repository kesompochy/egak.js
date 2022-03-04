export function clearCanvas(gl: WebGL2RenderingContext, color: {r: number, g: number, b: number, a?: number}){
    const colorByte = 256;

    const r = color.r/colorByte;
    const g = color.g/colorByte;
    const b = color.b/colorByte;
    const a = color.a === undefined ? 1 : color.a;
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

export function resizeCanvas(gl: WebGL2RenderingContext, resolution: number){
    const canvas = gl.canvas;
    const styleWidth = canvas.clientWidth;
    const styleHeight = canvas.clientHeight;

    canvas.width = styleWidth * resolution;
    canvas.height = styleHeight * resolution;

    gl.viewport(0, 0, canvas.width, canvas.height);
}
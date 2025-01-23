export function enableAlpha(gl: WebGL2RenderingContext, separateAlpha: boolean = true) {
  gl.enable(gl.BLEND);
  if (!separateAlpha) {
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  } else {
    gl.blendFuncSeparate(
      gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,  // RGB
      gl.ONE, gl.ONE_MINUS_SRC_ALPHA         // Alpha
    );
  }
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
}

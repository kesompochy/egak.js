#version 300 es
precision highp float;

in vec4 v_color;


uniform float u_opacity;

const float COLOR_BYTES = 255.;
const float COLOR_BYTES_INVERSE = 1./COLOR_BYTES;

out vec4 outColor;

void main() {
   outColor = v_color * vec4(COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, u_opacity);
}
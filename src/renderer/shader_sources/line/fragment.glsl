#version 300 es
precision highp float;

in vec4 v_color;


uniform float u_opacity;

out vec4 outColor;

void main() {
   outColor = v_color * vec4(1, 1, 1, u_opacity);
}
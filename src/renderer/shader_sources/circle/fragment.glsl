#version 300 es
precision highp float;

in vec4 v_color;
in vec2 v_position;

uniform float u_opacity;
uniform float u_radius;
uniform vec2 u_center;

out vec4 outColor;

void main() {
   
   float dx = v_position.x - u_center.x;
   float dy = v_position.y - u_center.y;

   if(dx*dx + dy*dy < u_radius*u_radius){
      outColor = v_color * vec4(1, 1, 1, u_opacity);
   } else {
      discard;
   }
}
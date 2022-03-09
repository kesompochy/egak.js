#version 300 es
precision highp float;

in vec4 v_color;
in vec2 v_position;

uniform float u_opacity;
uniform float u_radius;
uniform vec2 u_center;
uniform float u_startAngle;
uniform float u_endAngle;
uniform float u_clockwize;

out vec4 outColor;

const float PI  = 3.141592653589793;
const float PI2 = PI * 2.0;

void main() {
   
   float dx = v_position.x - u_center.x;
   float dy = v_position.y - u_center.y;

   float angle = u_clockwize*fract(atan(dy, dx)/PI2 + 1.);

   if((dx*dx + dy*dy < u_radius*u_radius && u_clockwize*angle > u_startAngle && u_clockwize*angle <= u_endAngle)){
      outColor = v_color * vec4(1, 1, 1, u_opacity);
   } else {
      discard;
   }
}
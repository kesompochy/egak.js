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

const float COLOR_BYTES = 255.;
const float COLOR_BYTES_INVERSE = 1./COLOR_BYTES;

void main() {
   
   float dx = v_position.x - u_center.x;
   float dy = v_position.y - u_center.y;
   float angle = u_clockwize*fract(atan(dy, dx)/PI2 + 1.);

   float dist = distance(u_center, v_position)/u_radius;
   float delta = fwidth(dist);
   float alpha = smoothstep(1.-delta, 1., dist);

   if((u_clockwize*angle >= u_startAngle && u_clockwize*angle <= u_endAngle)){
      outColor = mix(v_color*vec4(COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, u_opacity), outColor, alpha);
   } else {
      discard;
   }
}
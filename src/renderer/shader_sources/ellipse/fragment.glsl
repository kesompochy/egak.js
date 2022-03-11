#version 300 es
precision highp float;

in vec4 v_color;
in vec2 v_position;

uniform float u_opacity;

uniform vec2 u_center;
uniform float u_width;
uniform float u_height;

out vec4 outColor;

const float COLOR_BYTES = 255.;
const float COLOR_BYTES_INVERSE = 1./COLOR_BYTES;
const float edge = 1.;

void main() {
   vec4 normalizedColor = v_color * vec4(COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, u_opacity);

   float focus = sqrt(abs(u_width*u_width - u_height*u_height))/2.;
   float dx = v_position.x - u_center.x;
   float dy = v_position.y - u_center.y;

   if(u_width > u_height){
      float dist1 = distance(vec2(focus, 0), vec2(dx, dy));
      float dist2 = distance(vec2(-focus, 0), vec2(dx, dy));

      float dist = (dist1 + dist2)/u_width;
      float delta = fwidth(dist);
      float alpha = smoothstep(edge-delta, edge, dist);

      outColor = mix(normalizedColor, outColor, alpha);


   } else {
      float dist1 = distance(vec2(0, focus), vec2(dx, dy));
      float dist2 = distance(vec2(0, -focus), vec2(dx, dy));

      float dist = (dist1 + dist2)/u_height;
      float delta = fwidth(dist);
      float alpha = smoothstep(edge-delta, edge, dist);

      outColor = mix(normalizedColor, outColor, alpha);

   }
}
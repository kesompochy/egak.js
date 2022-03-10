#version 300 es
precision highp float;

in vec4 v_color;
in vec2 v_position;

uniform float u_opacity;

uniform float u_radius;
uniform vec2 u_position;
uniform float u_width;
uniform float u_height;

const float COLOR_BYTES = 255.;
const float COLOR_BYTES_INVERSE = 1./COLOR_BYTES;



out vec4 outColor;

void main() {
   vec4 normalizedVColor = v_color*vec4(COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, COLOR_BYTES_INVERSE, 1);

   vec2[4] centers = vec2[](
      vec2(u_position.x + u_radius,            u_position.y + u_radius),
      vec2(u_position.x + u_radius,            u_position.y + u_height - u_radius),
      vec2(u_position.x + u_width - u_radius,  u_position.y + u_radius),
      vec2(u_position.x + u_width - u_radius,  u_position.y + u_height - u_radius)
   );

   float[4] distances = float[](
      0., 0., 0., 0.
   );

   float[4] alphas = float[](
      0., 0., 0., 0.
   );
   for(int i = 0; i<4; i++){
      float dist = distance(centers[i], v_position)/u_radius;
      distances[i] = dist;
      float delta = fwidth(dist);
      alphas[i] = smoothstep(1.-delta, 1., dist);
   }

   if(distance(v_position, vec2(u_position.xy)) < u_radius){
      outColor = mix(normalizedVColor *vec4(1, 1, 1, u_opacity), outColor, alphas[0]);
   } else if(distance(v_position, vec2(u_position.x, u_position.y+u_height)) < u_radius){
      outColor = mix(normalizedVColor*vec4(1, 1, 1, u_opacity), outColor, alphas[1]);
   } else if(distance(v_position, vec2(u_position.x+u_width, u_position.y)) < u_radius){
      outColor = mix(normalizedVColor*vec4(1, 1, 1, u_opacity), outColor, alphas[2]);
   } else if(distance(v_position, vec2(u_position.x+u_width, u_position.y+u_height)) < u_radius){
      outColor = mix(normalizedVColor*vec4(1, 1, 1, u_opacity), outColor, alphas[3]);
   } else {
      outColor = normalizedVColor*vec4(1, 1, 1, u_opacity);
   }
}
#version 300 es
 
in vec2 a_position;
in vec2 a_texcoord;
 
uniform mat3 u_transformation;
 
out vec2 v_texcoord;
 
void main() {
   v_texcoord = a_texcoord;

   gl_Position = vec4((u_transformation * vec3(a_position, 1)).xy, 0, 1);
}
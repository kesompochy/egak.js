#version 300 es
 
in vec2 a_position;
in vec4 a_color;
 
uniform mat3 u_transformation;
 
out vec4 v_color;
out vec2 v_position;
 
void main() {
   v_color = a_color;

   gl_Position = vec4((u_transformation * vec3(a_position, 1)).xy, 0, 1);
   v_position = a_position;
}
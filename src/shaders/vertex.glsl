
uniform vec2 viewport;

void main() {
	vec2 pos = vec2(0.0, 0.0);
	pos *= viewport;
	
	gl_Position = vec4(pos, 0.0, 1.0);
}

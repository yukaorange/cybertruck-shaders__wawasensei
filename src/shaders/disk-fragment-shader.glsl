uniform float uAlpha;
uniform float uMultiplier;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

void main() {

  vec3 color = vec3(1.0);

  vec2 mulvUv = mod(vUv * uMultiplier, 1.0);

  float angle = atan(mulvUv.x - 0.5, mulvUv.y - 0.5) / (PI * 2.0);

  float radius = 0.25 + sin(angle * 100.0) * 0.02;

  float distance = distance(mod(mulvUv + uTime, 1.0), vec2(0.5));

  float circle = step(0.01, abs(distance - radius));

  float strength = 1.0 - circle;

  float alpha = min(strength, uAlpha);

  float colorShift = mod(mulvUv.y + uTime, 1.0);

  vec3 mixColor = mix(uColorA, uColorB, colorShift);

  gl_FragColor = vec4(mixColor, alpha);
}
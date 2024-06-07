uniform float uAlpha;
uniform float uMultiplier;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;

varying vec2 vUv;

void main() {

  vec2 mulUv = mod(vUv * uMultiplier, 1.0);

  float strength = step(0.5, mod(mulUv.y + uTime, 1.0));

  vec3 mixColor = mix(uColorA, uColorB, step(0.5, mulUv.y));

  float alpha = min(strength, uAlpha);

  gl_FragColor = vec4(mixColor, alpha);
}
import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';

const BarrelDistortionMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    transparent: true
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  varying vec2 vUv;
  uniform float time;
  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float strength = 0.3;
    uv *= mix(1.0, 1.0 - strength * dot(uv, uv), 0.7);
    vec4 color = vec4(1.0, 1.0, 1.0, 0.2);
    gl_FragColor = color;
  }
  `
);

extend({ BarrelDistortionMaterial });

const BarrelHeader = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.time = clock.getElapsedTime();
  });

  return (
    <mesh>
      <planeGeometry args={[4, 1.5, 32, 32]} />
      <barrelDistortionMaterial ref={ref} />
    </mesh>
  );
};

export default BarrelHeader;

import {
  OrbitControls,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";

import { Cybertruck } from "./Cybertruck";

import { useFrame } from "@react-three/fiber";
import GSAP from "gsap";
import { MutableRefObject, RefObject, useLayoutEffect, useRef } from "react";
import * as THREE from "three";

const shiningRed = new THREE.Color(4.8, 0.1, 0.1);
const shiningWhite = new THREE.Color(1.1, 1.1, 1.1);

export const Experience = (): JSX.Element => {
  const podium = useRef<THREE.Group | null>(null);
  const car = useRef<THREE.Group | null>(null);
  const square = useRef<THREE.Mesh | null>(null);
  const triangle = useRef<THREE.Mesh | null>(null);

  const tl = useRef<GSAPTimeline | null>(null);

  useFrame((_state, delta) => {
    podium.current?.rotation &&
      updateRotation(podium.current.rotation, delta, 2);
    // square.current?.rotation &&
    //   updateRotation(square.current.rotation, delta, 42);
    // triangle.current?.rotation &&
    //   updateRotation(triangle.current.rotation, delta, 64);
  });

  const updateRotation = (
    rotation: THREE.Euler,
    delta: number,
    denominator: number
  ) => {
    rotation.y += delta / denominator;
  };

  useLayoutEffect(() => {
    tl.current = GSAP.timeline();
    // VERTICAL ANIMATION
    tl.current.to(car.current?.position ?? new THREE.Vector3(), {
      duration: 2,
      y: -1.18,
    });
    tl.current.to(
      podium.current?.position ?? new THREE.Vector3(),
      {
        duration: 2,
        y: -1.35,
      },
      0
    );

    tl.current.to(
      car.current?.rotation ?? new THREE.Euler(),
      {
        duration: 2,
        y: Math.PI * 2 - Math.PI / 6,
      },
      0
    );

    tl.current.to(podium.current?.rotation ?? new THREE.Euler(), {
      duration: 1,
      y: Math.PI * 12,
    });

    tl.current.to(
      podium.current?.position ?? new THREE.Vector3(),
      {
        duration: 0.5,
        z: -8,
      },
      1.5
    );

    tl.current.to(
      podium.current?.rotation ?? new THREE.Euler(),
      {
        duration: 1,
        x: Math.PI / 4,
      },
      1.8
    );
  }, []);

  return (
    <>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

      <group ref={car}>
        <Cybertruck />
      </group>
      <group scale={[3, 0.4, 3]} position={[0, -0.2, 0]} ref={podium}>
        <mesh receiveShadow>
          <cylinderGeometry />
          <meshStandardMaterial
            metalness={0.8}
            roughness={0.4}
            color={"#222222"}
          />
        </mesh>

        <mesh
          position={[0, 0.51, 0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.92, 1, 32]} />
          <meshStandardMaterial
            color={shiningRed}
            toneMapped={false}
            roughness={0.75}
          />
        </mesh>
      </group>

      <hemisphereLight intensity={0.5} />

      <ContactShadows
        resolution={1024}
        frames={300}
        position={[0, -1.16, 0]}
        scale={15}
        blur={0.5}
        opacity={1}
        far={20}
      />

      <mesh
        ref={square}
        scale={4}
        position={[4, -1.161, -1.5]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
      >
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshStandardMaterial
          color={shiningWhite}
          toneMapped={false}
          roughness={0.75}
        />
      </mesh>

      <mesh
        ref={triangle}
        scale={4}
        position={[-4, -1.161, -1]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
      >
        <ringGeometry args={[0.9, 1, 3, 1]} />
        <meshStandardMaterial
          color={shiningWhite}
          roughness={0.75}
          toneMapped={true}
        />
      </mesh>

      <Environment resolution={512}>
        {/* Ceiling */}
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 9]}
          scale={[10, 1, 1]}
        />
        {/* Sides */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-50, 2, 0]}
          scale={[100, 2, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[50, 2, 0]}
          scale={[100, 2, 1]}
        />
        {/* Key */}
        <Lightformer
          form="ring"
          color="red"
          intensity={10}
          scale={2}
          position={[10, 5, 10]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>
    </>
  );
};

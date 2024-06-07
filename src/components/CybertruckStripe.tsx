/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/cybertruck.gltf -o src/components/Cybertruck.tsx -r public --types -d 
*/

import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, shaderMaterial } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import stripeVertexShader from "@/shaders/stripe-vertex-shader.glsl";
import stripeFragmentShader from "@/shaders/stripe-fragment-shader.glsl";

import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Logger } from "sass";

type GLTFResult = GLTF & {
  nodes: {
    interior001: THREE.Mesh;
    interior001_1: THREE.Mesh;
    interior001_2: THREE.Mesh;
    interior001_3: THREE.Mesh;
    interior001_4: THREE.Mesh;
    interior001_5: THREE.Mesh;
    interior001_6: THREE.Mesh;
    steer: THREE.Mesh;
    tires001: THREE.Mesh;
    tires001_1: THREE.Mesh;
  };
  materials: {
    lights: THREE.MeshStandardMaterial;
    body: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    glassframes: THREE.MeshStandardMaterial;
    warninglights: THREE.MeshStandardMaterial;
    black: THREE.MeshStandardMaterial;
    shader: THREE.MeshStandardMaterial;
    gray: THREE.MeshStandardMaterial;
    tires: THREE.MeshStandardMaterial;
    rims: THREE.MeshStandardMaterial;
  };
  // animations: GLTFAction[];
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

type StripeShaderMaterial = THREE.Material & {
  uAlpha: number;
  uMultiplier: number;
  uColorA: THREE.Color;
  uColorB: THREE.Color;
  uTime: number;
};

const StripeShaderMaterial = shaderMaterial(
  {
    uAlpha: 0.5,
    uMultiplier: 42,
    uColorA: new THREE.Color(0x000000),
    uColorB: new THREE.Color(0x000000),
    uTime: 0,
  },
  stripeVertexShader,
  stripeFragmentShader
) as unknown as StripeShaderMaterial;

// declaratively
extend({ StripeShaderMaterial });

export const CybertruckStripe = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF("/models/cybertruck.gltf") as GLTFResult;

  const stripeControls = useControls("stripes", {
    alpha: {
      min: 0,
      max: 1,
      value: 0.5,
    },
    multiplier: {
      min: 1,
      max: 140,
      value: 42,
    },
    colorA: {
      value: "#FF0000",
    },
    colorB: {
      value: "#FFF000",
    },
  });

  useEffect(() => {
    materials.lights.toneMapped = false;
    materials.warninglights.toneMapped = false;
    materials.warninglights.color = new THREE.Color(82, 0, 0);
  }, []);

  const ref = useRef<StripeShaderMaterial>();

  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.steer.geometry} material={materials.gray} />

      <mesh geometry={nodes.interior001.geometry} material={materials.lights} />

      <mesh geometry={nodes.interior001_1.geometry} material={materials.body} />

      <mesh
        geometry={nodes.interior001_2.geometry}
        material={materials.glass}
      />

      <mesh
        geometry={nodes.interior001_3.geometry}
        material={materials.glassframes}
      />

      <mesh
        geometry={nodes.interior001_4.geometry}
        material={materials.warninglights}
      />

      <mesh
        geometry={nodes.interior001_5.geometry}
        material={materials.black}
      />

      <mesh geometry={nodes.interior001_6.geometry}>
        <stripeShaderMaterial
          transparent
          uAlpha={stripeControls.alpha}
          uMultiplier={stripeControls.multiplier}
          uColorA={stripeControls.colorA}
          uColorB={stripeControls.colorB}
          ref={ref}
        />
      </mesh>

      <mesh geometry={nodes.tires001.geometry} material={materials.tires} />

      <mesh geometry={nodes.tires001_1.geometry} material={materials.rims} />
    </group>
  );
};

useGLTF.preload("/models/cybertruck.gltf");
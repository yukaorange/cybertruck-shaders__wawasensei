import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components/Experience";
import { Sns } from "@/components/Sns";
import { MenuButton } from "@/components/MenuButton";
import { Loader } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const App = () => {
  return (
    <>
      <Loader />
      <MenuButton />
      <Sns />
      <Canvas shadows camera={{ position: [0, 3, 9], fov: 45 }}>
        <color attach="background" args={["#15151a"]} />
        <Experience />
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={1.42}
            radius={0.72}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default App;

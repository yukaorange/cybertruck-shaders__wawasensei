import { shaderMaterial } from "@react-three/drei";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      stripeShaderMaterial: ReactThreeFiber.Object3DNode<
        ReturnType<typeof StripeShaderMaterial>,
        typeof StripeShaderMaterial
      >;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      diskShaderMaterial: ReactThreeFiber.Object3DNode<
        ReturnType<typeof DiskShaderMaterial>,
        typeof DiskShaderMaterial
      >;
    }
  }
}

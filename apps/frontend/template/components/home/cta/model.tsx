import { animated,useSpring } from "@react-spring/three";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect,useRef } from "react";
import { Mesh } from "three";

export function Model() {
  const mesh = useRef<Mesh>(null);
  const { nodes } = useGLTF("/models/logo.glb") as any;

  const [springs, api] = useSpring(() => ({
    scale: 0,
    config: { mass: 1, tension: 400, friction: 60 },
  }));

  useEffect(() => {
    api.start({ scale: 2.3 });
  }, [api]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.z += delta * 0.5;
      mesh.current.rotation.y += delta * 0.5;
    }
  });

  const materialProps = {
    thickness: 0.7,
    roughness: 0.2,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 2,
    backside: true,
  };

  return (
    <group>
      <animated.mesh
        ref={mesh}
        geometry={nodes.Cube001.geometry}
        scale={springs.scale}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </animated.mesh>
    </group>
  );
}

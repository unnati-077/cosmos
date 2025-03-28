
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

type FloatingTorusProps = {
  position?: [number, number, number];
  radius?: number;
  tubeRadius?: number;
  color?: string;
  wireframe?: boolean;
  speed?: number;
};

export default function FloatingTorus({
  position = [0, 0, 0],
  radius = 1,
  tubeRadius = 0.4,
  color = "#EC4899",
  wireframe = false,
  speed = 1
}: FloatingTorusProps) {
  const meshRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Add rotation animation
      meshRef.current.rotation.x += delta * 0.3 * speed;
      meshRef.current.rotation.y += delta * 0.1 * speed;
      meshRef.current.rotation.z += delta * 0.2 * speed;
      
      // Add floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tubeRadius, 16, 100]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

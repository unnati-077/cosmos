
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useTheme } from '@/components/ThemeProvider';

type FloatingCubeProps = {
  position?: [number, number, number];
  size?: number;
  color?: string;
  wireframe?: boolean;
  speed?: number;
};

export default function FloatingCube({
  position = [0, 0, 0],
  size = 1,
  color = "#4F46E5",
  wireframe = false,
  speed = 1
}: FloatingCubeProps) {
  const meshRef = useRef<Mesh>(null!);
  const { theme } = useTheme();
  
  // Different colors for light/dark mode - improved for light mode visibility
  const lightModeColor = "#4F46E5";
  const darkModeColor = color;
  const activeColor = theme === "light" ? lightModeColor : darkModeColor;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.3 * speed;
      
      // Add floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={activeColor} wireframe={wireframe} />
    </mesh>
  );
}

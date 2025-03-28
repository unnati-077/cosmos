
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useTheme } from '@/components/ThemeProvider';

type FloatingSphereProps = {
  position?: [number, number, number];
  radius?: number;
  color?: string;
  wireframe?: boolean;
  speed?: number;
};

export default function FloatingSphere({
  position = [0, 0, 0],
  radius = 1,
  color = "#38BDF8",
  wireframe = false,
  speed = 1
}: FloatingSphereProps) {
  const meshRef = useRef<Mesh>(null!);
  const { theme } = useTheme();
  
  // Different colors for light/dark mode
  const lightModeColor = "#4F46E5";
  const darkModeColor = color;
  const activeColor = theme === "light" ? lightModeColor : darkModeColor;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Add subtle rotation
      meshRef.current.rotation.x += delta * 0.1 * speed;
      meshRef.current.rotation.y += delta * 0.15 * speed;
      
      // Add floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={activeColor} wireframe={wireframe} />
    </mesh>
  );
}


import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import FloatingCube from './FloatingCube';
import FloatingSphere from './FloatingSphere';
import FloatingTorus from './FloatingTorus';
import { useTheme } from '@/components/ThemeProvider';
import { Group } from 'three';

export default function RotatingObjects() {
  const { theme } = useTheme();
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    /* Main Group that slowly rotates */
    <group ref={groupRef}>
      {/* Original objects with improved positioning */}
      <FloatingCube position={[-2, 0, 0]} size={0.7} color="#4F46E5" />
      <FloatingSphere position={[0, 0, 0]} radius={0.8} color="#38BDF8" />
      <FloatingTorus position={[2, 0, 0]} radius={0.8} color="#EC4899" />

      {/* Additional objects for more complex scene */}
      <FloatingCube 
        position={[-1, 1.5, -2]} 
        size={0.5} 
        color="#FBBF24" 
        wireframe={true}
        speed={0.5} 
      />
      <FloatingSphere 
        position={[1, -1.5, -1]} 
        radius={0.4} 
        color="#4F46E5" 
        wireframe={true}
        speed={0.7} 
      />
      <FloatingTorus 
        position={[1.5, 1, -2]} 
        radius={0.6} 
        tubeRadius={0.2} 
        color="#EC4899" 
        wireframe={true}
        speed={0.6} 
      />
      
      {/* Distorted sphere as a background element */}
      <mesh position={[0, 0, -3]}>
        <sphereGeometry args={[3, 64, 64]} />
        <MeshDistortMaterial
          color={theme === "light" ? "#e0e7ff" : "#1A1B2F"}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.8}
        />
      </mesh>
      
      {/* Small cubes arranged in a circular pattern */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const size = 0.08 + Math.random() * 0.1;
        const speed = 0.3 + Math.random() * 0.7;
        
        return (
          <FloatingCube
            key={i}
            position={[x, (Math.random() - 0.5) * 2, z]}
            size={size}
            color={i % 3 === 0 ? "#4F46E5" : i % 3 === 1 ? "#38BDF8" : "#EC4899"}
            speed={speed}
          />
        );
      })}
    </group>
  );
}

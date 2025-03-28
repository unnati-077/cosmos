
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

type SceneContainerProps = {
  children: React.ReactNode;
  className?: string;
  autoRotate?: boolean;
  cameraPosition?: [number, number, number];
  backgroundColor?: string;
};

export default function SceneContainer({
  children,
  className = "",
  autoRotate = true,
  cameraPosition = [0, 0, 5],
  backgroundColor = "transparent"
}: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        style={{ background: backgroundColor }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        {children}
        <OrbitControls
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

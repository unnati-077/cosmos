
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sparkles } from '@react-three/drei';
import { useTheme } from '@/components/ThemeProvider';

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
  const { theme } = useTheme();
  
  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        style={{ background: backgroundColor }}
        dpr={[1, 2]} // Improved performance on high-DPI screens
        gl={{ antialias: true }}
      >
        {/* Improved lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        
        {/* Particle effects */}
        <Sparkles 
          count={100}
          scale={10}
          size={1}
          speed={0.2}
          opacity={0.5}
          color={theme === "light" ? "#4F46E5" : "#ffffff"}
        />
        
        {/* HDR environment */}
        <Environment preset="sunset" />
        
        {children}
        
        <OrbitControls
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

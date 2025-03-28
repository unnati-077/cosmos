
import SceneContainer from './SceneContainer';
import FloatingCube from './FloatingCube';
import FloatingSphere from './FloatingSphere';
import FloatingTorus from './FloatingTorus';

export default function SpaceScene() {
  return (
    <SceneContainer className="h-[500px]">
      <FloatingCube position={[-2, 0, 0]} size={0.7} color="#4F46E5" />
      <FloatingSphere position={[0, 0, 0]} radius={0.8} color="#38BDF8" />
      <FloatingTorus position={[2, 0, 0]} radius={0.8} color="#EC4899" />
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
    </SceneContainer>
  );
}

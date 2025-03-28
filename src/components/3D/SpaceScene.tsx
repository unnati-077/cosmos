
import SceneContainer from './SceneContainer';
import RotatingObjects from './RotatingObjects';

export default function SpaceScene() {
  return (
    <SceneContainer className="h-[500px]">
      <RotatingObjects />
    </SceneContainer>
  );
}

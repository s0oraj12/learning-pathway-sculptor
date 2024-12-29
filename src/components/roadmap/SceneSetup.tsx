import { OrbitControls, Stars } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export const SceneSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    if (camera) {
      camera.position.z = 15;
      camera.position.y = 5;
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />
    </>
  );
};
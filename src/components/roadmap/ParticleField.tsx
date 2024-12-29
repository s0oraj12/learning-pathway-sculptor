import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField = () => {
  const points = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 500; i++) {
      const radius = 15;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      
      temp.push(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta)
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4a5568"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};
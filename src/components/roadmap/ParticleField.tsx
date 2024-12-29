import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  
  // Create particles using useMemo to prevent recreation on every render
  const particles = useMemo(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(theta);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    return geometry;
  }, []);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.05,
      color: '#ffffff',
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
  }, []);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.x += 0.0001;
      points.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry attach="geometry" {...particles} />
      <pointsMaterial attach="material" {...material} />
    </points>
  );
};
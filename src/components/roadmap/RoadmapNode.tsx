import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Html } from '@react-three/drei';
import { RoadmapNode as RoadmapNodeType } from '../../types/roadmap';
import * as THREE from 'three';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  type: 'start' | 'pattern' | 'subpattern';
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ node, type }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const [springs] = useSpring(() => ({
    from: {
      scale: [0, 0, 0] as [number, number, number],
      position: [0, 0, 0] as [number, number, number],
    },
    to: {
      scale: [1, 1, 1] as [number, number, number],
      position: [node.position.x / 100, -node.position.y / 100, 0] as [number, number, number],
    },
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  const colors = {
    start: '#3B82F6',
    pattern: '#8B5CF6',
    subpattern: '#06B6D4'
  };

  return (
    <animated.mesh
      ref={meshRef}
      position={springs.position as unknown as [number, number, number]}
      scale={springs.scale as unknown as [number, number, number]}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={colors[type]}
        roughness={0.5}
        metalness={0.2}
      />
      <Html distanceFactor={15}>
        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <h3 className="text-sm font-bold">{node.data.label}</h3>
        </div>
      </Html>
    </animated.mesh>
  );
};
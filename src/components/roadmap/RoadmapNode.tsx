import { useRef } from 'react';
import { Html } from '@react-three/drei';
import { RoadmapNode as RoadmapNodeType } from '../../types/roadmap';
import * as THREE from 'three';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  type: 'start' | 'pattern' | 'subpattern';
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ node, type }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const colors = {
    start: '#3B82F6',
    pattern: '#8B5CF6',
    subpattern: '#06B6D4'
  };

  const position = new THREE.Vector3(node.position.x / 100, -node.position.y / 100, 0);

  return (
    <mesh ref={meshRef} position={position}>
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
    </mesh>
  );
};
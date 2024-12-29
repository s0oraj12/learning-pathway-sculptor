import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Html } from '@react-three/drei';
import { Node } from '@xyflow/react';

interface RoadmapNodeProps {
  node: Node;
  type: 'start' | 'pattern' | 'subpattern';
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ node, type }) => {
  const meshRef = useRef();
  const [spring] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [node.position.x / 100, -node.position.y / 100, 0],
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
      position={spring.position}
      scale={spring.scale}
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
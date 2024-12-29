import { Line } from '@react-three/drei';
import { RoadmapEdge as RoadmapEdgeType, RoadmapNode } from '../../types/roadmap';
import * as THREE from 'three';

interface RoadmapEdgeProps {
  edge: RoadmapEdgeType;
  nodes: RoadmapNode[];
}

export const RoadmapEdge: React.FC<RoadmapEdgeProps> = ({ edge, nodes }) => {
  const sourceNode = nodes.find(n => n.id === edge.source);
  const targetNode = nodes.find(n => n.id === edge.target);

  if (!sourceNode || !targetNode) return null;

  const start = new THREE.Vector3(
    sourceNode.position.x / 100,
    -sourceNode.position.y / 100,
    0
  );
  const end = new THREE.Vector3(
    targetNode.position.x / 100,
    -targetNode.position.y / 100,
    0
  );

  return (
    <Line
      points={[start, end]}
      color="#4a5568"
      lineWidth={1}
      opacity={0.3}
      transparent
    />
  );
};
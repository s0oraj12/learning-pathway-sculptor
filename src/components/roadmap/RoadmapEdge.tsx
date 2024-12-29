import { Line } from '@react-three/drei';
import { Edge } from '@xyflow/react';

interface RoadmapEdgeProps {
  edge: Edge;
  nodes: any[];
}

export const RoadmapEdge: React.FC<RoadmapEdgeProps> = ({ edge, nodes }) => {
  const sourceNode = nodes.find(n => n.id === edge.source);
  const targetNode = nodes.find(n => n.id === edge.target);

  if (!sourceNode || !targetNode) return null;

  const start = [sourceNode.position.x / 100, -sourceNode.position.y / 100, 0];
  const end = [targetNode.position.x / 100, -targetNode.position.y / 100, 0];

  return (
    <Line
      points={[start, end]}
      color="#4a5568"
      opacity={0.3}
      transparent
    />
  );
};
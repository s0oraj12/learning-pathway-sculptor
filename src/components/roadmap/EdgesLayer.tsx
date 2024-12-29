import { RoadmapEdge } from './RoadmapEdge';
import { RoadmapEdge as RoadmapEdgeType, RoadmapNode } from '../../types/roadmap';

interface EdgesLayerProps {
  edges: RoadmapEdgeType[];
  nodes: RoadmapNode[];
}

export const EdgesLayer = ({ edges, nodes }: EdgesLayerProps) => {
  return (
    <group>
      {edges.map((edge) => (
        <RoadmapEdge key={edge.id} edge={edge} nodes={nodes} />
      ))}
    </group>
  );
};
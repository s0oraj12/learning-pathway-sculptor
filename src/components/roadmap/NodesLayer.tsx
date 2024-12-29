import { RoadmapNode } from './RoadmapNode';
import { RoadmapNode as RoadmapNodeType } from '../../types/roadmap';

interface NodesLayerProps {
  nodes: RoadmapNodeType[];
}

export const NodesLayer = ({ nodes }: NodesLayerProps) => {
  return (
    <group>
      {nodes.map((node) => (
        <RoadmapNode
          key={node.id}
          node={node}
          type={
            node.className === 'start-node'
              ? 'start'
              : node.className === 'pattern-node'
              ? 'pattern'
              : 'subpattern'
          }
        />
      ))}
    </group>
  );
};
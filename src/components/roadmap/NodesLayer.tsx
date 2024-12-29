import { memo } from 'react';
import RoadmapNode from './RoadmapNode';
import { RoadmapNode as RoadmapNodeType } from '../../types/roadmap';

interface NodesLayerProps {
  nodes: RoadmapNodeType[];
}

const NodesLayer = ({ nodes }: NodesLayerProps) => {
  return (
    <>
      {nodes.map((node) => (
        <RoadmapNode
          key={node.id}
          data={node.data}
          type={
            node.className === 'start-node'
              ? 'start'
              : node.className === 'pattern-node'
              ? 'pattern'
              : 'subpattern'
          }
        />
      ))}
    </>
  );
};

export default memo(NodesLayer);
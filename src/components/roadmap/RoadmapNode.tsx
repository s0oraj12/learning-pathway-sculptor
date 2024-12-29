import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface RoadmapNodeProps {
  data: {
    label: string;
  };
  type: 'start' | 'pattern' | 'subpattern';
}

const RoadmapNode = ({ data, type }: RoadmapNodeProps) => {
  const nodeClass = type === 'start' 
    ? 'start-node' 
    : type === 'pattern' 
      ? 'pattern-node' 
      : 'subpattern-node';

  return (
    <div className={`${nodeClass} px-4 py-2 min-w-[150px]`}>
      <Handle type="target" position={Position.Top} />
      <div className="font-medium">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(RoadmapNode);
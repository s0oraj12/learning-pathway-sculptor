import { memo } from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';

const EdgesLayer = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        ...style,
        strokeWidth: 2,
        stroke: '#4a5568',
      }}
    />
  );
};

export default memo(EdgesLayer);
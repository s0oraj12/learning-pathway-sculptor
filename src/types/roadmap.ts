import { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';

export interface RoadmapNode extends ReactFlowNode {
  className?: string;
}

export interface RoadmapEdge extends ReactFlowEdge {
  animated?: boolean;
}
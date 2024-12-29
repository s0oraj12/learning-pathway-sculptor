import { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';

export interface RoadmapNode extends ReactFlowNode {
  className?: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface RoadmapEdge extends ReactFlowEdge {
  animated?: boolean;
  source: string;
  target: string;
}
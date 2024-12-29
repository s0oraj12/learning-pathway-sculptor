import { useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from './roadmap/initial-elements';

const RoadmapFlowInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border border-gray-700 bg-gray-900/90 backdrop-blur-sm"
      style={{ width: '100%', height: '800px' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls className="bg-gray-800/80 border-gray-700" />
        <MiniMap className="bg-gray-800/80 border-gray-700" />
      </ReactFlow>
    </motion.div>
  );
};

const RoadmapFlow = () => {
  return (
    <ReactFlowProvider>
      <RoadmapFlowInner />
    </ReactFlowProvider>
  );
};

export default RoadmapFlow;
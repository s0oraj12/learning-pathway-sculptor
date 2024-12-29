import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
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
import { SceneSetup } from './roadmap/SceneSetup';
import { ParticleField } from './roadmap/ParticleField';

const RoadmapFlowInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border border-gray-700 bg-gray-900/90 backdrop-blur-sm relative"
      style={{ width: '100%', height: '800px' }}
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <SceneSetup />
          <ParticleField />
        </Canvas>
      </div>

      {/* React Flow Layer */}
      <div className="absolute inset-0 z-10">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-right"
          className="bg-transparent"
        >
          <Background className="bg-transparent" />
          <Controls className="bg-gray-800/80 border-gray-700" />
          <MiniMap className="bg-gray-800/80 border-gray-700" />
        </ReactFlow>
      </div>
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
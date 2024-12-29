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

import { ParticleField } from './roadmap/ParticleField';
import { SceneSetup } from './roadmap/SceneSetup';
import { NodesLayer } from './roadmap/NodesLayer';
import { EdgesLayer } from './roadmap/EdgesLayer';
import { ErrorBoundary } from './roadmap/ErrorBoundary';
import { initialNodes, initialEdges } from './roadmap/initial-elements';

const RoadmapScene = () => {
  return (
    <group>
      <SceneSetup />
      <ParticleField />
      <NodesLayer nodes={initialNodes} />
      <EdgesLayer edges={initialEdges} nodes={initialNodes} />
    </group>
  );
};

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
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
          shadows
          legacy={false}
          flat={true}
          onCreated={({ gl }) => {
            gl.setClearColor('#00000000', 0);
          }}
        >
          <RoadmapScene />
        </Canvas>
      </ErrorBoundary>

      <div className="absolute bottom-4 right-4">
        <Controls className="bg-gray-800/80 border-gray-700" />
        <MiniMap className="bg-gray-800/80 border-gray-700" />
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
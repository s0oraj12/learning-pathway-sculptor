import { useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  // Start Node
  { 
    id: 'start',
    data: { label: 'Level 1: Foundation' },
    position: { x: 500, y: 0 },
    className: 'start-node'
  },

  // Pattern Nodes
  { 
    id: 'p1',
    data: { label: '1. Counting Pattern' },
    position: { x: 250, y: 150 },
    className: 'pattern-node'
  },
  { 
    id: 'p2',
    data: { label: '2. Monotonic Stack/Queue' },
    position: { x: 750, y: 150 },
    className: 'pattern-node'
  },

  // Counting Pattern Branch
  { 
    id: 'c1',
    data: { label: '1A.1 Single Value Counter' },
    position: { x: 0, y: 300 },
    className: 'subpattern-node'
  },
  { 
    id: 'c2',
    data: { label: '1A.2 Conditional Counter' },
    position: { x: 0, y: 450 },
    className: 'subpattern-node'
  },
  { 
    id: 'c3',
    data: { label: '1A.3 Multi-Value Counter' },
    position: { x: 0, y: 600 },
    className: 'subpattern-node'
  },

  // Frequency Branch
  { 
    id: 'f1',
    data: { label: '1B.1 Frequency Map' },
    position: { x: 250, y: 300 },
    className: 'subpattern-node'
  },
  { 
    id: 'f2',
    data: { label: '1B.2 Group Frequency' },
    position: { x: 250, y: 450 },
    className: 'subpattern-node'
  },
  { 
    id: 'f3',
    data: { label: '1B.3 Freq of Frequencies' },
    position: { x: 250, y: 600 },
    className: 'subpattern-node'
  },

  // Window Branch
  { 
    id: 'w1',
    data: { label: '1C.1 Fixed Window' },
    position: { x: 500, y: 300 },
    className: 'subpattern-node'
  },
  { 
    id: 'w2',
    data: { label: '1C.2 Dynamic Window' },
    position: { x: 500, y: 450 },
    className: 'subpattern-node'
  },
  { 
    id: 'w3',
    data: { label: '1C.3 Multi-Condition' },
    position: { x: 500, y: 600 },
    className: 'subpattern-node'
  },

  // Next Greater Branch
  { 
    id: 'n1',
    data: { label: '2A.1 Next Greater Element' },
    position: { x: 750, y: 300 },
    className: 'subpattern-node'
  },
  { 
    id: 'n2',
    data: { label: '2A.2 Previous Greater' },
    position: { x: 750, y: 450 },
    className: 'subpattern-node'
  },
  { 
    id: 'n3',
    data: { label: '2A.3 Circular Array' },
    position: { x: 750, y: 600 },
    className: 'subpattern-node'
  },

  // Window Operations Branch
  { 
    id: 'm1',
    data: { label: '2B.1 Sliding Window Max' },
    position: { x: 1000, y: 300 },
    className: 'subpattern-node'
  },
  { 
    id: 'm2',
    data: { label: '2B.2 Window Difference' },
    position: { x: 1000, y: 450 },
    className: 'subpattern-node'
  },
  { 
    id: 'm3',
    data: { label: '2B.3 Dynamic Window Sum' },
    position: { x: 1000, y: 600 },
    className: 'subpattern-node'
  },
];

const initialEdges: Edge[] = [
  // Pattern Connections
  { id: 'e-start-p1', source: 'start', target: 'p1', animated: true },
  { id: 'e-start-p2', source: 'start', target: 'p2', animated: true },

  // Counting Pattern Paths
  { id: 'e-p1-c1', source: 'p1', target: 'c1' },
  { id: 'e-p1-f1', source: 'p1', target: 'f1' },
  { id: 'e-p1-w1', source: 'p1', target: 'w1' },
  { id: 'e-c1-c2', source: 'c1', target: 'c2' },
  { id: 'e-c2-c3', source: 'c2', target: 'c3' },
  { id: 'e-f1-f2', source: 'f1', target: 'f2' },
  { id: 'e-f2-f3', source: 'f2', target: 'f3' },
  { id: 'e-w1-w2', source: 'w1', target: 'w2' },
  { id: 'e-w2-w3', source: 'w2', target: 'w3' },

  // Monotonic Pattern Paths
  { id: 'e-p2-n1', source: 'p2', target: 'n1' },
  { id: 'e-p2-m1', source: 'p2', target: 'm1' },
  { id: 'e-n1-n2', source: 'n1', target: 'n2' },
  { id: 'e-n2-n3', source: 'n2', target: 'n3' },
  { id: 'e-m1-m2', source: 'm1', target: 'm2' },
  { id: 'e-m2-m3', source: 'm2', target: 'm3' },

  // Cross Pattern Learning
  { id: 'e-w2-m1', source: 'w2', target: 'm1' },
  { id: 'e-f2-n1', source: 'f2', target: 'n1' },

  // Parallel Learning Paths
  { id: 'e-c2-f2', source: 'c2', target: 'f2' },
  { id: 'e-w2-f3', source: 'w2', target: 'f3' },
];

const RoadmapFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800/50 backdrop-blur-sm"
      style={{ width: '100%', height: '800px' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-gray-900/50"
      >
        <Controls className="bg-gray-800/80 border-gray-700" />
        <MiniMap className="bg-gray-800/80 border-gray-700" />
        <Background color="#4a5568" gap={16} size={1} />
      </ReactFlow>
    </motion.div>
  );
};

export default RoadmapFlow;

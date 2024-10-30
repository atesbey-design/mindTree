// useGraphStore.ts

import { create } from 'zustand';
import { Node as ReactFlowNode, Edge as ReactFlowEdge } from 'reactflow';
import { Node, Edge } from '../data/types';
import { initialNodes, initialEdges } from './initialData';

interface GraphState {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
}

export const useGraphStore = create<GraphState>()((set) => ({
  nodes: initialNodes as Node[],
  setNodes: (nodes: Node[]) => set({ nodes }),
  edges: initialEdges as Edge[],
  setEdges: (edges: Edge[]) => set({ edges }),
}));

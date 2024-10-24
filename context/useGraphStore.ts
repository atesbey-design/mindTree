// useGraphStore.ts

import { create } from 'zustand';
import { Node, Edge } from '../data/types';
import { initialNodes, initialEdges } from './initialData';

interface GraphState {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
}

export const useGraphStore = create<GraphState>()((set) => ({
  nodes: initialNodes,
  setNodes: (nodes: Node[]) => set({ nodes }),
  edges: initialEdges,
  setEdges: (edges: Edge[]) => set({ edges }),
}));

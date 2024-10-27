// mindmapSlice.js veya mindmapSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Edge, Node, MindmapData } from '../../data/types';
import { applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node as ReactFlowNode, Edge as ReactFlowEdge } from 'reactflow';

interface MindmapState {
  data: MindmapData | null;
  loading: boolean;
  error: string | null;
}

interface GenerateMindmapParams {
  topic: string;
  educationLevel: string;
  difficulty: string;
}

const initialState: MindmapState = {
  data: null,
  loading: false,
  error: null,
};

export const generateMindmap = createAsyncThunk(
  'mindmap/generate',
  async (params: GenerateMindmapParams) => {
    const response = await fetch('/api/mindmap-generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to generate mindmap');
    }
    console.log("response", response);
    
    const data = await response.json();
    return data as MindmapData;
  }
);

const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    clearMindmap: (state: MindmapState) => {
      state.data = null;
      state.error = null;
    },
    updateNodePosition: (state: MindmapState, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      if (state.data?.nodes) {
        const nodeIndex = state.data.nodes.findIndex((node) => node.id === action.payload.id);
        if (nodeIndex !== -1) {
          state.data.nodes[nodeIndex].position = action.payload.position;
        }
      }
    },
    updateNodeData: (state: MindmapState, action: PayloadAction<{ id: string; data: any }>) => {
      if (state.data?.nodes) {
        const nodeIndex = state.data.nodes.findIndex((node) => node.id === action.payload.id);
        if (nodeIndex !== -1) {
          state.data.nodes[nodeIndex].data = {
            ...state.data.nodes[nodeIndex].data,
            ...action.payload.data,
          };
        }
      }
    },
    setGeneratedData: (state: MindmapState, action: PayloadAction<{ nodes: ReactFlowNode[]; edges: ReactFlowEdge[] }>) => {
      state.data = {
        nodes: action.payload.nodes as Node[],
        edges: action.payload.edges as Edge[],
      };
    },
    nodesChange: (state: MindmapState, action: PayloadAction<NodeChange[]>) => {
      if (state.data) {
        state.data.nodes = applyNodeChanges(action.payload, state.data.nodes) as Node[];
      }
    },
    edgesChange: (state: MindmapState, action: PayloadAction<EdgeChange[]>) => {
      if (state.data) {
        state.data.edges = applyEdgeChanges(action.payload, state.data.edges) as Edge[];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateMindmap.pending, (state: MindmapState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateMindmap.fulfilled, (state: MindmapState, action: PayloadAction<MindmapData>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(generateMindmap.rejected, (state: MindmapState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'An error occurred';
      });
  },
});

export const { clearMindmap, updateNodePosition, updateNodeData, setGeneratedData, nodesChange, edgesChange } = mindmapSlice.actions;
export default mindmapSlice.reducer;

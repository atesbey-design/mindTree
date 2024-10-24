import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Edge, Node, MindmapData } from '../../data/types';
import { applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';

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
        const nodeIndex = state.data.nodes.findIndex((node: any) => node.id === action.payload.id);
        if (nodeIndex !== -1) {
          state.data.nodes[nodeIndex].position = action.payload.position;
        }
      }
    },
    setGeneratedData: (state: MindmapState, action: PayloadAction<{ nodes: Node[]; edges: Edge[] }>) => {
      state.data = {
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
    },
    nodesChange: (state: MindmapState, action: PayloadAction<NodeChange[]>) => {
      if (state.data) {
        state.data.nodes = applyNodeChanges(action.payload, state.data.nodes);
      }
    },
    edgesChange: (state: MindmapState, action: PayloadAction<EdgeChange[]>) => {
      if (state.data) {
        state.data.edges = applyEdgeChanges(action.payload, state.data.edges);
      }
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(generateMindmap.pending, (state: MindmapState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateMindmap.fulfilled, (state: MindmapState, action: any) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(generateMindmap.rejected, (state: MindmapState, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { clearMindmap, updateNodePosition, setGeneratedData, nodesChange, edgesChange } = mindmapSlice.actions;
export default mindmapSlice.reducer;

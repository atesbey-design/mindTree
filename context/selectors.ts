import { createSelector } from 'reselect';

interface RootState {
  mindmap: {
    data: {
      nodes: any[];
      edges: any[];
    };
  };
}

export const selectMindmapData = (state: RootState) => state.mindmap?.data || {};

export const selectNodes = createSelector(
  [selectMindmapData],
  (data) => data.nodes || []
);

export const selectEdges = createSelector(
  [selectMindmapData],
  (data) => data.edges || []
);
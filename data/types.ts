export interface NodeData {
    label: string;
    color: string;
    isLeaf: boolean;
    childLeafIds?: string[];
    content?: Array<{ label: string; completed: boolean }>;
    tricks?: string[];
  }
  
  export interface Node {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: NodeData;
  }
  
  export interface Edge {
    id: string;
    source: string;
    target: string;
    sourceHandle: string;
  }
  
  export interface MindmapData {
    nodes: Node[];
    edges: Edge[];
  }
  
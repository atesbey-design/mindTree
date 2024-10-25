// Import statements
"use client"
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Node,
  Edge,
  Connection,
  addEdge,
  NodeTypes,
  NodeProps,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import Generate from '../components/Generate';
import { setGeneratedData, nodesChange, edgesChange, updateNodeData } from '../store/features/mindmapSlice';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import CustomControls from '@/components/CustomControls';
// Dynamically import ReactFlow components with SSR disabled
const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), { ssr: false });
const Background = dynamic(() => import('reactflow').then((mod) => mod.Background), { ssr: false });
const AskNode = dynamic(() => import('../components/AskNode'), { ssr: false }); 


// Neobrutalism color palette
const colors = {
  background: '#FF6B6B',
  mainNode: '#4169E1', // Royal Blue
  secondary: '#4ECDC4',
  secondaryNode: '#FFD93D', 
  text: '#2C3E50',
  leaf: '#4ECDC4',
  border: '#000000',
  selected: '#FFD93D',
  finished: '#32CD32', // Lime Green
  rootHover: '#3A5FCD',
  branchHover: '#3CB371',
  leafHover: '#3CB371',
};

const interpolateColor = (startColor: string, endColor: string, factor: number): string => {
  const result = startColor.slice(1).match(/.{2}/g)!.map((hex, i) => {
    return Math.round(parseInt(hex, 16) + (parseInt(endColor.slice(1).match(/.{2}/g)![i], 16) - parseInt(hex, 16)) * factor)
      .toString(16)
      .padStart(2, '0');
  });
  return `#${result.join('')}`;
};

// Custom Node Component
const CustomNode: React.FC<NodeProps> = ({ data, id, selected }) => {
  const [nodeData, setNodeData] = useState(data);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const updateIndexedDB = async (updatedNodeData: any) => {
    try {
      const request = indexedDB.open('mindmapDB', 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(['mindmaps'], 'readwrite');
        const store = transaction.objectStore('mindmaps');
        
        const getRequest = store.getAll();
        
        getRequest.onsuccess = () => {
          const mindmaps = getRequest.result;
          if (mindmaps && mindmaps.length > 0) {
            const latestMindmap = mindmaps[mindmaps.length - 1];
            const updatedNodes = latestMindmap.nodes.map((node: any) => 
              node.id === id ? {...node, data: updatedNodeData} : node
            );
            
            latestMindmap.nodes = updatedNodes;
            store.put(latestMindmap);
          }
        };
      };
    } catch (error) {
      console.error('Error updating IndexedDB:', error);
    }
  };

  const handleComplete = () => {
    const updatedContent = nodeData.content.map((item: { completed: boolean }) => ({ ...item, completed: true }));
    const updatedNodeData = { ...nodeData, content: updatedContent, color: "#32CD32"};
    
    setNodeData(updatedNodeData);
    setIsExpanded(false);
    
    dispatch(updateNodeData({ nodeId: id, data: updatedNodeData }));
    updateIndexedDB(updatedNodeData);
    
    if (nodeData.onNodeUpdate) {
      nodeData.onNodeUpdate(id, updatedNodeData);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedContent = nodeData.content.map((item: { completed: boolean }, idx: number) => 
      idx === index ? { ...item, completed: !item.completed } : item
    );
    
    // Check if all items are completed
    const allCompleted = updatedContent.every((item: { completed: boolean }) => item.completed);
    const updatedColor = allCompleted ? "#32CD32" : colors.mainNode;
    
    const updatedNodeData = { ...nodeData, content: updatedContent, color: updatedColor };
    
    setNodeData(updatedNodeData);
    dispatch(updateNodeData({ id: id, data: updatedNodeData }));
    updateIndexedDB(updatedNodeData);
    
    if (nodeData.onNodeUpdate) {
      nodeData.onNodeUpdate(id, updatedNodeData);
    }
  };

  useEffect(() => {
    setNodeData(data);
  }, [data]);

  useEffect(() => {
    if (nodeData.onNodeUpdate) {
      nodeData.onNodeUpdate(id, nodeData);
    }
  }, [nodeData, id]);

  const getHoverColor = () => {
    if (nodeData.isRoot) {
      return "#3A5FCD";
    } else if (nodeData.isLeaf) {
      return "#3CB371";
    } else {
      return "#3CB371";
    }
  };

  const nodeStyle = {
    padding: '20px',
    borderRadius: '10px',
    width: 250,
    fontSize: '16px',
    color: colors.text,
    textAlign: 'center' as const,
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: selected ? "#FFD93D" : "#000000",
    backgroundColor: isHovered ? getHoverColor() : (nodeData.color || colors.mainNode),
    position: 'relative' as const,
    boxShadow: '5px 5px 0px ' + colors.border,
    transition: 'all 0.3s ease',
    display: 'block',
    opacity: 1,
  };

  return (
    <div
      style={nodeStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} />
      <strong>{nodeData.label}</strong>
      {nodeData.isLeaf && (
        <>
          <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}>
            <button onClick={toggleExpand} style={{ marginRight: '5px', cursor: 'pointer', background: colors.secondaryNode, border: '2px solid ' + colors.border, borderRadius: '5px'}}>
              <Image
                src={`/icons/${isExpanded ? 'up' : 'down'}.png`}
                alt={isExpanded ? 'Collapse' : 'Expand'}
                width={20}
                height={20}
              />
            </button>
            <button onClick={handleComplete} style={{ marginRight: '5px', cursor: 'pointer', background: colors.secondaryNode, border: '2px solid ' + colors.border, borderRadius: '5px'}}>
              <Image
                src="/icons/complete.png"
                alt="Complete"
                width={20}
                height={20}
              />
            </button>
            <button onClick={(e) => { 
              e.stopPropagation(); 
              if (typeof (window as any).nodeCallbacks?.onAskClick === 'function') {
                (window as any).nodeCallbacks.onAskClick(id, nodeData);
              }
            }} style={{ marginRight: '5px', cursor: 'pointer', background: colors.secondaryNode, border: '2px solid ' + colors.border, borderRadius: '5px'}}>
              <Image
                src="/icons/ask.png"
                alt="Ask"
                width={20}
                height={20}
              />
            </button>
            <button onClick={(e) => { 
              e.stopPropagation(); 
              if (typeof (window as any).nodeCallbacks?.onEditClick === 'function') {
                (window as any).nodeCallbacks.onEditClick(id, nodeData);
              }
            }} style={{ cursor: 'pointer', background: colors.secondaryNode, border: '2px solid ' + colors.border, borderRadius: '5px'}}>
              <Image
                src="/icons/edit.png"
                alt="Edit"
                width={20}
                height={20}
              />
            </button>
          </div>
        </>
      )}
      {nodeData.content && nodeData.isLeaf && isExpanded && (
        <div style={{ marginTop: '20px', textAlign: 'left', background: colors.background, padding: '10px', borderRadius: '5px', border: '2px solid ' + colors.border }}>
          {nodeData.content.map((item: { label: string; completed: boolean }, index: number) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px',
                padding: '5px',
                borderRadius: '5px',
                boxShadow: '3px 3px 0px ' + colors.border,
                background: colors.mainNode,
              }}
            >
              <input
                type="checkbox"
                id={`checkbox-${id}-${index}`}
                style={{ marginRight: '10px' }}
                checked={item.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`checkbox-${id}-${index}`} style={{ flexGrow: 1, color: colors.text }}>
                {item.label}
              </label>
              {item.completed && <span style={{ color: colors.secondary, marginLeft: '5px' }}>✔️</span>}
            </div>
          ))}
        </div>
      )}

      {nodeData.tricks && nodeData.isLeaf && isExpanded && (
        <div style={{ marginTop: '10px', textAlign: 'left', background: colors.background, padding: '10px', borderRadius: '5px', border: '2px solid ' + colors.border }}>
          <strong>Tips</strong>
          {nodeData.tricks.map((trick: string, idx: number) => (
            <div
              key={idx}
              style={{ marginTop: '5px', padding: '5px', borderRadius: '5px', boxShadow: '3px 3px 0px ' + colors.border, background: colors.secondaryNode }}
            >
              <label style={{ color: colors.text }}>{trick}</label>
            </div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

// Define nodeTypes outside of the component
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

// Main Flowchart Component
const Flowchart: React.FC = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: any) => state.mindmap?.data?.nodes || []);
  const edges = useSelector((state: any) => state.mindmap?.data?.edges || []);
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [showLeafDetailModal, setShowLeafDetailModal] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      dispatch({
        type: 'ADD_EDGE',
        payload: {
          ...params,
          type: 'default',
          markerEnd: { type: MarkerType.ArrowClosed, color: colors.border },
          style: { stroke: colors.border, strokeWidth: 3 },
        },
      }),
    [dispatch]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.data?.isLeaf === false) {
      setSelectedNode(node.id);
      const childIds = node.data?.childLeafIds || [];
      dispatch({
        type: 'TOGGLE_CHILD_NODES',
        payload: { nodeId: node.id, childIds },
      });
    }
  }, [dispatch]);

  const updateParentNodeColor = useCallback((nodeId: string, nodeData: any) => {
    dispatch({
      type: 'UPDATE_PARENT_NODE_COLOR',
      payload: { nodeId, nodeData },
    });
  }, [dispatch]);

  const updateRootNodeColor = useCallback(() => {
    dispatch({
      type: 'UPDATE_ROOT_NODE_COLOR',
    });
  }, [dispatch]);

  const onNodeUpdate = useCallback((nodeId: string, nodeData: any) => {
    dispatch({
      type: 'UPDATE_NODE',
      payload: { nodeId, nodeData },
    });
    updateParentNodeColor(nodeId, nodeData);
    updateRootNodeColor();
  }, [dispatch, updateParentNodeColor, updateRootNodeColor]);

  const updateIndexedDB = useCallback((nodes: Node[], edges: Edge[]) => {
    try {
      const request = indexedDB.open('mindmapDB', 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(['mindmaps'], 'readwrite');
        const store = transaction.objectStore('mindmaps');
        
        const getRequest = store.getAll();
        
        getRequest.onsuccess = () => {
          const mindmaps = getRequest.result;
          if (mindmaps && mindmaps.length > 0) {
            const latestMindmap = mindmaps[mindmaps.length - 1];
            latestMindmap.nodes = nodes;
            latestMindmap.edges = edges;
            store.put(latestMindmap);
          }
        };
      };
    } catch (error) {
      console.error('Error updating IndexedDB:', error);
    }
  }, []);

  useEffect(() => {
    if (!isGenerating) {
      const onNodeUpdateCallback = (id: string, data: any) => onNodeUpdate(id, data);
      const onAskClickCallback = (id: string, data: any) => {
        setSelectedNodeData(data);
        setShowAskModal(true);
      };
      const onEditClickCallback = (id: string, data: any) => {
        setSelectedNodeData(data);
        setShowLeafDetailModal(true);
      };

      const callbacksRef = {
        onNodeUpdate: onNodeUpdateCallback,
        onAskClick: onAskClickCallback,
        onEditClick: onEditClickCallback,
      };

      dispatch({
        type: 'SET_NODE_CALLBACKS',
        payload: {
          onNodeUpdate: 'onNodeUpdate',
          onAskClick: 'onAskClick',
          onEditClick: 'onEditClick',
        },
      });

      (window as any).nodeCallbacks = callbacksRef;
    }
  }, [dispatch, onNodeUpdate, isGenerating]);

  const defaultEdgeOptions = useMemo(() => ({
    type: 'default',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: colors.border },
    style: { stroke: colors.border, strokeWidth: 3, strokeDasharray: '10 5' }
  }), []);

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  const handleGenerateComplete = (generatedNodes: Node[], generatedEdges: Edge[]) => {
    dispatch(setGeneratedData({ nodes: generatedNodes, edges: generatedEdges }));
    setIsGenerating(false);
  };
  
  useEffect(() => {
    const request = indexedDB.open('mindmapDB', 1);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(['mindmaps'], 'readonly');
      const store = transaction.objectStore('mindmaps');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const mindmaps = getAllRequest.result;
        if (mindmaps && mindmaps.length > 0) {
          const latestMindmap = mindmaps[mindmaps.length - 1];
          dispatch(setGeneratedData({ 
            nodes: latestMindmap.nodes, 
            edges: latestMindmap.edges 
          }));
          setIsGenerating(false);
        } else {
          setIsGenerating(true);
        }
      };
    };

    request.onerror = (event) => {
      console.error('Error getting IndexedDB data:', event);
      setIsGenerating(true);
    };
  }, [dispatch]);

  return (
    <div style={{ background: colors.background,
      width: '100vw',
      height: '100vh'
     }}>
      <div style={{ zIndex: 999 }}>
        <Header />
      </div>
      {isGenerating ? (
        <Generate onGenerateComplete={handleGenerateComplete} />
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => {
            dispatch(nodesChange(changes));
            const updatedNodes = changes.reduce((acc, change) => {
              if (change.type === 'position' && change.dragging) {
                return acc.map(node => 
                  node.id === change.id 
                    ? { ...node, position: change.position }
                    : node
                );
              }
              return acc;
            }, nodes);
            localStorage.setItem('nodes', JSON.stringify(updatedNodes));
            updateIndexedDB(updatedNodes, edges);
          }}
          onEdgesChange={(changes) => {
            dispatch(edgesChange(changes));
            localStorage.setItem('edges', JSON.stringify(edges));
            updateIndexedDB(nodes, edges);
          }}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={memoizedNodeTypes}
          fitView
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Background color={colors.border} />
          <CustomControls />
          <Footer />
        </ReactFlow>
      )}
      {showAskModal && selectedNodeData && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#4ECDC4',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1000,
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto',
          boxShadow: '8px 8px 0px #000000',
          border: '5px solid #000000',
        }}>
          <Image
            src="/icons/exit.png"
            alt="Exit"
            width={30}
            height={30}
            onClick={() => setShowAskModal(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
            }}
          />
          <AskNode selectedNode={selectedNodeData} />
        </div>
      )}
      {showLeafDetailModal && selectedNodeData && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#4ECDC4',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1000,
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto',
          boxShadow: '8px 8px 0px #000000',
          border: '5px solid #000000',
        }}>
          <Image
            src="/icons/exit.png"
            alt="Exit"
            width={30}
            height={30}
            onClick={() => setShowLeafDetailModal(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Flowchart;

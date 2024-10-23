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
import AskNode from './askNode';
import Generate from './Generate';
// Dynamically import ReactFlow components with SSR disabled
const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), { ssr: false });
const Background = dynamic(() => import('reactflow').then((mod) => mod.Background), { ssr: false });
const Controls = dynamic(() => import('reactflow').then((mod) => mod.Controls), { ssr: false });
const MiniMap = dynamic(() => import('reactflow').then((mod) => mod.MiniMap), { ssr: true });

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

  const handleComplete = () => {
    const updatedContent = nodeData.content.map((item: { completed: boolean }) => ({ ...item, completed: true }));
    const updatedColor = interpolateColor(colors.mainNode, colors.finished, 1); // Use interpolateColor for complete
    setNodeData({ ...nodeData, content: updatedContent, color: updatedColor });
    setIsExpanded(false);
    if (nodeData.onNodeUpdate) {
      nodeData.onNodeUpdate(id, { ...nodeData, content: updatedContent, color: updatedColor });
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
    const completedCount = updatedContent.filter((item: { completed: boolean }) => item.completed).length;
    const totalCount = updatedContent.length;
    const completionFactor = completedCount / totalCount;
    const updatedColor = interpolateColor(colors.mainNode, colors.finished, completionFactor);
    const updatedNodeData = { ...nodeData, content: updatedContent, color: updatedColor };
    setNodeData(updatedNodeData);
    if (nodeData.onNodeUpdate) {
      nodeData.onNodeUpdate(id, updatedNodeData);
    }
  };

  useEffect(() => {
    if (nodeData.onNodeUpdate) {
      nodeData.onNodeUpdate(id, nodeData);
    }
  }, [nodeData, id]);

  const getHoverColor = () => {
    if (nodeData.isRoot) {
      return colors.rootHover;
    } else if (nodeData.isLeaf) {
      return colors.leafHover;
    } else {
      return colors.branchHover;
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
    borderColor: colors.border,
    backgroundColor: isHovered ? getHoverColor() : (selected ? colors.selected : nodeData.color || colors.mainNode),
    position: 'relative' as const,
    boxShadow: '5px 5px 0px ' + colors.border,
    transition: 'all 0.3s ease',
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
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
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
            <button onClick={(e) => { e.stopPropagation(); nodeData.onAskClick(id, nodeData); }} style={{ marginRight: '5px', cursor: 'pointer', background: colors.secondaryNode, border: '2px solid ' + colors.border, borderRadius: '5px'}}>
              <Image
                src="/icons/ask.png"
                alt="Ask"
                width={20}
                height={20}
              />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nodeData.onEditClick(id, nodeData); }} style={{ cursor: 'pointer', background: colors.secondaryNode, border: '2px solid ' + colors.border, borderRadius: '5px'}}>
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
          <strong>Püf Noktaları</strong>
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [showLeafDetailModal, setShowLeafDetailModal] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'default',
            markerEnd: { type: MarkerType.ArrowClosed, color: colors.border },
            style: { stroke: colors.border, strokeWidth: 3 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.data?.isLeaf === false) {
      setSelectedNode(node.id);
      // Toggle visibility of child nodes
      const childIds = node.data?.childLeafIds || [];
      setNodes((nds) =>
        nds.map((n) => {
          if (childIds.includes(n.id)) {
            return {
              ...n,
              hidden: !n.hidden,
            };
          }
          return n;
        })
      );
    }
  }, [setNodes]);

  const updateParentNodeColor = useCallback((nodeId: string, nodeData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data?.childLeafIds && node.data.childLeafIds.includes(nodeId)) {
          const childNodes = nds.filter((n) => node.data?.childLeafIds?.includes(n.id));
          const totalCompleted = childNodes.reduce((acc, childNode) => {
            if (childNode.data?.isLeaf) {
              const completedCount = childNode.data.content?.filter((item: { completed: boolean }) => item.completed).length || 0;
              const total = childNode.data.content?.length || 0;
              return acc + (total > 0 ? completedCount / total : 0);
            }
            return acc;
          }, 0);
          const completionFactor = childNodes.length > 0 ? totalCompleted / childNodes.length : 0;
          const updatedColor = interpolateColor(colors.secondaryNode, colors.finished, completionFactor);
          return {
            ...node,
            data: {
              ...node.data,
              color: updatedColor,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const updateRootNodeColor = useCallback(() => {
    setNodes((nds) => {
      const rootNode = nds.find(node => node.id === '1');
      if (rootNode) {
        const childNodes = nds.filter(node => rootNode.data?.childLeafIds?.includes(node.id));
        const greenChildNodes = childNodes.filter(node => {
          const color = node.data?.color;
          return color && color !== colors.secondaryNode;
        });
        const greenRatio = childNodes.length > 0 ? greenChildNodes.length / childNodes.length : 0;
        const updatedColor = interpolateColor(colors.mainNode, colors.finished, greenRatio);
        return nds.map(node => {
          if (node.id === '1') {
            return {
              ...node,
              data: {
                ...node.data,
                color: updatedColor,
              },
            };
          }
          return node;
        });
      }
      return nds;
    });
  }, [setNodes]);

  const onNodeUpdate = useCallback((nodeId: string, nodeData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          let color;
          if (nodeId === '1') {
            color = colors.mainNode;
          } else if (nodeData.isLeaf) {
            color = colors.leaf;
          } else {
            color = colors.secondaryNode;
          }
          return {
            ...node,
            data: {
              ...nodeData,
              color: nodeData.color || color,
              onNodeUpdate: (id: string, data: any) => onNodeUpdate(id, data),
              onAskClick: (id: string, data: any) => {
                setSelectedNodeData(data);
                setShowAskModal(true);
              },
              onEditClick: (id: string, data: any) => {
                setSelectedNodeData(data);
                setShowLeafDetailModal(true);
              },
            },
          };
        }
        return node;
      })
    );
    updateParentNodeColor(nodeId, nodeData);
    updateRootNodeColor();
  }, [setNodes, updateParentNodeColor, updateRootNodeColor]);

  useEffect(() => {
    if (!isGenerating) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onNodeUpdate: (id: string, data: any) => onNodeUpdate(id, data),
            onAskClick: (id: string, data: any) => {
              setSelectedNodeData(data);
              setShowAskModal(true);
            },
            onEditClick: (id: string, data: any) => {
              setSelectedNodeData(data);
              setShowLeafDetailModal(true);
            },
          },
        }))
      );
    }
  }, [setNodes, onNodeUpdate, isGenerating]);

  // Memoize the default edge options
  const defaultEdgeOptions = useMemo(() => ({
    type: 'default',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: colors.border },
    style: { stroke: colors.border, strokeWidth: 3, strokeDasharray: '10 5' }
  }), []);

  // Memoize the nodeTypes
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  const handleGenerateComplete = (generatedNodes: Node[], generatedEdges: Edge[]) => {
    const updatedNodes = generatedNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onNodeUpdate: (id: string, data: any) => onNodeUpdate(id, data),
        onAskClick: (id: string, data: any) => {
          setSelectedNodeData(data);
          setShowAskModal(true);
        },
        onEditClick: (id: string, data: any) => {
          setSelectedNodeData(data);
          setShowLeafDetailModal(true);
        },
      },
    }));
    setNodes(updatedNodes);
    setEdges(generatedEdges);
    setIsGenerating(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: colors.background }}>
      {isGenerating ? (
        <Generate onGenerateComplete={handleGenerateComplete} />
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={memoizedNodeTypes}
          fitView
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Background color={colors.border} />
          <Controls />
          <MiniMap style={{ backgroundColor: '#4ECDC4', border: '3px solid #000' }} />
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
            alt="Çıkış"
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
            alt="Çıkış"
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

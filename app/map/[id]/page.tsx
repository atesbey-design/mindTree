'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Node, Edge } from '../../../data/types';

export default function MapPage() {
    
  const { id } = useParams();
  console.log("MapPage", id);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    // Retrieve nodes and edges from localStorage
    const storedNodes = localStorage.getItem('nodes');
    const storedEdges = localStorage.getItem('edges');

    if (storedNodes && storedEdges) {
      setNodes(JSON.parse(storedNodes));
      setEdges(JSON.parse(storedEdges));
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
   
    </div>
  );
}

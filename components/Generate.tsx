'use client';

import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

interface GenerateProps {
  onGenerateComplete: (generatedNodes: Node[], generatedEdges: Edge[]) => void;
}

const Generate: React.FC<GenerateProps> = ({ onGenerateComplete }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [input, setInput] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/mindmap-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: input,
          educationLevel,
          difficulty,
        }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to generate mindmap');
      }

      const data = await response.json();
      setNodes(data.nodes);
      setEdges(data.edges);
      onGenerateComplete(data.nodes, data.edges);
    } catch (error) {
      console.error('Error generating mindmap:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#FF6B6B', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
      }}>
        <select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          style={{ 
            marginBottom: '10px', 
            padding: '10px', 
            fontSize: '16px',
            border: '3px solid #000',
            borderRadius: '0',
            backgroundColor: '#4ECDC4',
            color: '#000',
            boxShadow: '5px 5px 0px #000',
            width: '300px',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px top 50%',
            backgroundSize: '12px auto',
            paddingRight: '30px'
          }}
        >
          <option value="">Eğitim Seviyesi Seçin</option>
          <option value="ilkokul">İlkokul</option>
          <option value="ortaokul">Ortaokul</option>
          <option value="lise">Lise</option>
          <option value="universite">Üniversite</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ 
            marginBottom: '10px', 
            padding: '10px', 
            fontSize: '16px',
            border: '3px solid #000',
            borderRadius: '0',
            backgroundColor: '#4ECDC4',
            color: '#000',
            boxShadow: '5px 5px 0px #000',
            width: '300px',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px top 50%',
            backgroundSize: '12px auto',
            paddingRight: '30px'
          }}
        >
          <option value="">Zorluk Seviyesi Seçin</option>
          <option value="baslangic">Başlangıç</option>
          <option value="orta">Orta</option>
          <option value="ileri">İleri</option>
        </select>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Konunuzu girin"
          style={{ 
            marginBottom: '10px', 
            padding: '10px', 
            fontSize: '16px',
            border: '3px solid #000',
            borderRadius: '0',
            backgroundColor: '#fff',
            color: '#000',
            boxShadow: '5px 5px 0px #000',
            width: '300px',
            transition: 'all 0.1s ease-in-out',
          }}
        />
        <button 
          onClick={handleGenerate} 
          disabled={isLoading}
          style={{ 
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: isLoading ? '#ccc' : '#FFD93D',
            border: '3px solid #000',
            borderRadius: '0',
            color: '#000',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            boxShadow: '5px 5px 0px #000',
            transition: 'all 0.1s ease-in-out',
            width: '150px'
          }}
        >
          {isLoading ? 'Oluşturuluyor...' : 'Oluştur'}
        </button>
      </div>
      <div style={{ flex: 1, border: '3px solid #000', margin: '0 20px 20px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          <Background color="#000" gap={20} />
          <Controls />
          <MiniMap style={{ backgroundColor: '#4ECDC4', border: '3px solid #000' }} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Generate;

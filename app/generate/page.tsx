'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { generateMindmap, setGeneratedData, clearMindmap } from '@/store/features/mindmapSlice';
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';

const Generate: React.FC = () => {
  const [input, setInput] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState('');
  const hasSavedToIndexedDB = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.mindmap);
  const router = useRouter();

  useEffect(() => {
    dispatch(clearMindmap());
  }, [dispatch]);

  useEffect(() => {
    if (data && isGenerating && !hasSavedToIndexedDB.current) {
      const request = indexedDB.open('mindmapDB', 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('mindmaps')) {
          db.createObjectStore('mindmaps', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(['mindmaps'], 'readwrite');
        const store = transaction.objectStore('mindmaps');

        const mindmapData = {
          title: input,
          nodes: data.nodes,
          edges: data.edges,
          educationLevel,
          difficulty,
          date: new Date().toISOString()
        };

        const addRequest = store.add(mindmapData);
        
        addRequest.onsuccess = (event: any) => {
          const id = event.target.result;
          router.push(`/map/${id}`);
          hasSavedToIndexedDB.current = true;
          dispatch(clearMindmap());
        };

        addRequest.onerror = (event: any) => {
          console.error('Veri eklenirken hata oluştu:', event);
        };
      };

      request.onerror = (event) => {
        console.error('IndexedDB açılırken hata oluştu:', event);
      };

      return () => {
        setInput('');
        setEducationLevel('');
        setDifficulty('');
        hasSavedToIndexedDB.current = false;
        setIsGenerating(false);
      };
    }
  }, [data, isGenerating, input, educationLevel, difficulty, router, dispatch]);

  const handleGenerate = () => {
    if (!input || !educationLevel || !difficulty) {
      setError('Lütfen tüm alanları doldurun!');
      return;
    }
    setError('');
    setIsGenerating(true);
    dispatch(generateMindmap({ topic: input, educationLevel, difficulty }));
  };

  const containerStyle: CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#FF6B6B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const formStyle: CSSProperties = {
    backgroundColor: 'white',
    border: '8px solid black',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    transform: 'rotate(1deg)',
    boxShadow: '16px 16px 0 0 rgba(0,0,0,1)'
  };

  const titleStyle: CSSProperties = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: 'black',
    transform: 'rotate(-2deg)',
    textAlign: 'center' as const
  };

  const errorStyle: CSSProperties = {
    backgroundColor: '#FF6B6B',
    color: 'white',
    padding: '20px',
    marginBottom: '30px',
    border: '4px solid black',
    transform: 'rotate(1deg)'
  };

  const errorTextStyle: CSSProperties = {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: 0
  };

  const formFieldsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px'
  };

  const formFieldStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  };

  const labelStyle: CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
    transform: 'rotate(-1deg)'
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    border: '4px solid black',
    fontWeight: 'bold',
    transform: 'rotate(1deg)'
  };

  const buttonStyle: CSSProperties = {
    width: '100%',
    padding: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    backgroundColor: '#9B59B6',
    border: '4px solid black',
    color: 'white',
    cursor: 'pointer',
    transform: 'rotate(-1deg)',
    transition: 'transform 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={titleStyle}>MINDTREE OLUŞTUR</h1>
        
        {error && (
          <div style={errorStyle}>
            <p style={errorTextStyle}>{error}</p>
          </div>
        )}

        <div style={formFieldsStyle}>
          <div style={formFieldStyle}>
            <label htmlFor="educationLevel" style={labelStyle}>
              Eğitim Seviyesi
            </label>
            <select
              id="educationLevel"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              style={{...inputStyle, backgroundColor: '#4ECDC4'}}
            >
              <option value="">Seçin</option>
              <option value="ilkokul">İlkokul</option>
              <option value="ortaokul">Ortaokul</option>
              <option value="lise">Lise</option>
              <option value="universite">Üniversite</option>
            </select>
          </div>

          <div style={formFieldStyle}>
            <label htmlFor="difficulty" style={labelStyle}>
              Zorluk Seviyesi
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{...inputStyle, backgroundColor: '#45B7D9'}}
            >
              <option value="">Seçin</option>
              <option value="baslangic">Başlangıç</option>
              <option value="orta">Orta</option>
              <option value="ileri">İleri</option>
            </select>
          </div>

          <div style={formFieldStyle}>
            <label htmlFor="topic" style={labelStyle}>
              Konu
            </label>
            <input
              id="topic"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Konunuzu girin"
              style={{...inputStyle, backgroundColor: '#FF6B6B'}}
            />
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'OLUŞTURULUYOR...' : 'OLUŞTUR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
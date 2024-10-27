'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { generateMindmap, setGeneratedData, clearMindmap } from '@/store/features/mindmapSlice';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="generate-container">
      <div className="generate-form">
        <h1 className="form-title">MINDTREE OLUŞTUR</h1>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="educationLevel" className="field-label">
              Eğitim Seviyesi
            </label>
            <select
              id="educationLevel"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="field-input education-level"
            >
              <option value="">Seçin</option>
              <option value="ilkokul">İlkokul</option>
              <option value="ortaokul">Ortaokul</option>
              <option value="lise">Lise</option>
              <option value="universite">Üniversite</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="difficulty" className="field-label">
              Zorluk Seviyesi
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="field-input difficulty"
            >
              <option value="">Seçin</option>
              <option value="baslangic">Başlangıç</option>
              <option value="orta">Orta</option>
              <option value="ileri">İleri</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="topic" className="field-label">
              Konu
            </label>
            <input
              id="topic"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Konunuzu girin"
              className="field-input topic"
            />
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="generate-button"
          >
            {loading ? 'OLUŞTURULUYOR...' : 'OLUŞTUR'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .generate-container {
          min-height: 100vh;
          background-color: #FFD700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .generate-form {
          background-color: white;
          border: 8px solid black;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          transform: rotate(1deg);
          box-shadow: 16px 16px 0 0 rgba(0,0,0,1);
        }

        .form-title {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 40px;
          color: black;
          transform: rotate(-2deg);
          text-align: center;
        }

        .error-message {
          background-color: #FF6B6B;
          color: white;
          padding: 20px;
          margin-bottom: 30px;
          border: 4px solid black;
          transform: rotate(1deg);
        }

        .error-message p {
          font-weight: bold;
          font-size: 18px;
          margin: 0;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .field-label {
          font-size: 24px;
          font-weight: bold;
          color: black;
          transform: rotate(-1deg);
        }

        .field-input {
          width: 100%;
          padding: 15px;
          font-size: 18px;
          border: 4px solid black;
          font-weight: bold;
          transform: rotate(1deg);
        }

        .field-input:focus {
          outline: none;
          box-shadow: 8px 8px 0 0 rgba(0,0,0,1);
        }

        .education-level {
          background-color: #4ECDC4;
        }

        .difficulty {
          background-color: #45B7D9;
        }

        .topic {
          background-color: #FF6B6B;
        }

        .generate-button {
          width: 100%;
          padding: 20px;
          font-size: 24px;
          font-weight: bold;
          background-color: #9B59B6;
          border: 4px solid black;
          color: white;
          cursor: pointer;
          transform: rotate(-1deg);
          transition: transform 0.3s ease;
        }

        .generate-button:hover {
          transform: rotate(0deg);
        }

        .generate-button:focus {
          outline: none;
          box-shadow: 8px 8px 0 0 rgba(0,0,0,1);
        }

        .generate-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Generate;
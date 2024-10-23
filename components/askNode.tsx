"use client"
import React, { useState, useEffect } from 'react';


interface AskNodeProps {
  selectedNode: {
    label: string;
    content: { label: string; completed: boolean }[];
    tricks: string[];
  };
}

const AskNode: React.FC<AskNodeProps> = ({ selectedNode }) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputMessage }]);
    setIsLoading(true);
    
    const prompt = `"${selectedNode.label}"  konusunda uzman birisin bu konuda sana sorularn soruları bir öğretmen gibi cevaplamalısın.Cevapların örnekler içermeli ve bu örnekler sayesinde kullanıcı öğrenmeli. Cevaplarında kod vs olmamalı. sasdece bilgi aktarımı olmalı.İngilizce cevap verme.Sorulan soru ${inputMessage} bu soruya cevap verirken kullanıcının bilgi seviyesine göre cevap vermelisin.Sadece soruya cevap ver ek bilgi verme.Asla ama asla kim olduğunu ve ne olduğunu anlatma. Öğretmen olduğunu da söyleme.`;
    
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Ağ yanıtı başarısız oldu');
      }

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.completion }]);
    } catch (error) {
      console.error('Hata:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Üzgünüm, isteğinizi işlerken bir hata oluştu.' }]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  return (
    <div style={{
      backgroundColor: '#4ECDC4', // Changed background color to a different neobrutalism color
    
      padding: '30px',
      maxWidth: '700px',
      margin: '30px auto',
  
      position: 'relative',
    }}>
  
      <h2 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>
        Hakkında sor: {selectedNode.label}
      </h2>
      <div style={{
        backgroundColor: '#FFD93D',
        borderRadius: '15px',
        padding: '20px',
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom: '30px',
        border: '3px solid #000000',
      }}>
        {messages.length === 0 ? (
          <div style={{
            color: '#000000',
            backgroundColor: '#FF6B6B',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '20px',
            fontSize: '22px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '4px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            transform: 'rotate(-2deg)',
          }}>
            Merhaba! {selectedNode.label} hakkında merak ettiklerini sorabilirsin.
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} style={{
              backgroundColor: message.role === 'user' ? '#FF6B6B' : '#4169E1',
              color: '#2C3E50',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '15px',
              boxShadow: '5px 5px 0px #000000',
              fontSize: '18px',
            }}>
              <strong>{message.role === 'user' ? 'Sen: ' : 'MINDMAP: '}</strong>
              {message.content}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Bir soru sor..."
          style={{
            flex: 1,
            padding: '15px',
            borderRadius: '10px',
            border: '3px solid #000000',
            fontSize: '18px',
            backgroundColor: '#FFFFFF',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: '#FF8C00',
            color: '#FFFFFF',
            border: '3px solid #000000',
            borderRadius: '10px',
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '5px 5px 0px #000000',
            fontWeight: 'bold',
          }}
        >
          {isLoading ? 'Düşünüyor...' : 'Sor'}
        </button>
      </form>
    </div>
  );
};

export default AskNode;

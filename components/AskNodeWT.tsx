"use client"
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface AskNodeWTProps {
  selectedNode: {
    label: string;
    content: { label: string; completed: boolean }[];
    tricks: string[];
  };
}

const AskNodeWT: React.FC<AskNodeWTProps> = ({ selectedNode }) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    {
      label: "Konuyu basitçe anlat",
      prompt: `${selectedNode.label} konusunu basit ve anlaşılır şekilde açıklar mısın?`,
      color: '#FF6B6B'
    },
    {
      label: "Örneklerle açıkla", 
      prompt: `${selectedNode.label} konusunu günlük hayattan örneklerle açıklar mısın?`,
      color: '#4169E1'
    },
    {
      label: "Önemli noktaları özetle",
      prompt: `${selectedNode.label} konusundaki en önemli noktaları maddeler halinde özetler misin?`,
      color: '#FFD93D'
    },
    {
      label: "Sık sorulan sorular",
      prompt: `${selectedNode.label} konusuyla ilgili en sık sorulan soruları ve cevaplarını paylaşır mısın?`,
      color: '#95CD41'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputMessage }]);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedNode, inputMessage }),
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

  const handleQuickPrompt = async (prompt: string) => {
    setMessages(prevMessages => [...prevMessages, { role: 'user', content: prompt }]);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedNode, inputMessage: prompt }),
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
    }
  };

  return (
    <div style={{
      padding: '30px', 
      width: '700px',
      height: '800px',
      position: 'relative',
      borderRadius: '15px',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
    }}>
  
      <h2 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>
        Hakkında sor: {selectedNode.label}
      </h2>

      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        {quickPrompts.map((quickPrompt, index) => (
          <button
            key={index}
            onClick={() => handleQuickPrompt(quickPrompt.prompt)}
            disabled={isLoading}
            style={{
              backgroundColor: quickPrompt.color,
              color: '#000000',
              border: '3px solid #000000',
              borderRadius: '8px',
              padding: '12px 20px',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '4px 4px 0px #000000',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              transform: 'translate(-2px, -2px)',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {quickPrompt.label}
          </button>
        ))}
      </div>

      <div style={{
        backgroundColor: '#FFD93D',
        borderRadius: '15px',
        padding: '20px',
        flex: 1,
        overflowY: 'auto',
        marginBottom: '30px',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0px #000000',
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
          }}>
            Merhaba! {selectedNode.label} hakkında merak ettiklerini sorabilirsin.
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} style={{
                backgroundColor: message.role === 'user' ? '#FF6B6B' : '#4169E1',
                color: '#000000',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0px #000000',
                fontSize: '18px',
                lineHeight: '1.6',
                fontFamily: 'Arial, sans-serif',
              }}>
                <strong style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontSize: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {message.role === 'user' ? 'Sen: ' : 'MINDTREE: '}
                </strong>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '2px solid #000000'
                }}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
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
            boxShadow: '4px 4px 0px #000000',
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
            transition: 'transform 0.1s',
          }}
        >
          {isLoading ? 'Düşünüyor...' : 'Sor'}
        </button>
      </form>
    </div>
  );
};

export default AskNodeWT;

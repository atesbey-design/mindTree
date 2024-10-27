'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  date: string;
}

const HistoryPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // SSR kontrolü: window objesi sadece tarayıcıda var
    if (typeof window === 'undefined') return;

    const fetchChats = () => {
      const request = indexedDB.open('mindmapDB', 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(['mindmaps'], 'readonly');
        const store = transaction.objectStore('mindmaps');
        
        const getAllRequest = store.getAll();
        getAllRequest.onsuccess = () => {
          const mindmaps = getAllRequest.result;
          if (mindmaps && mindmaps.length > 0) {
            const formattedChats = mindmaps.map((map: any) => ({
              id: map.id.toString(),
              title: map.title,
              date: new Date(map.date).toLocaleDateString()
            }));
            setChats(formattedChats);
          }
          setIsLoading(false);
        };
      };

      request.onerror = (event: any) => {
        console.error('IndexedDB açılırken hata oluştu:', event);
        setIsLoading(false);
      };
    };

    fetchChats();

    // IndexedDB değişikliklerini dinlemek için event listener ekleme
    const dbChangeHandler = () => {
      fetchChats();
    };

    window.addEventListener('mindmapDBChange', dbChangeHandler);

    return () => {
      window.removeEventListener('mindmapDBChange', dbChangeHandler);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '20px',
        width: '100%',
        minHeight: '100vh',
        background: '#FF6B6B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}>
        <Link href="/generate">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#FF4141',
              color: '#FFFFFF',
              padding: '24px 48px',
              border: '4px solid #000000',
              borderRadius: '50%',
              width: '200px',
              height: '200px',
              boxShadow: '8px 8px 0px #000000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            <Plus size={40} />
            Yeni Sohbet
          </motion.button>
        </Link>
      </div>

      {/* Eğer yükleniyorsa "Loading..." göster */}
      {isLoading ? (
        <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem' }}>Loading...</p>
      ) : (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {chats.map((chat, index) => {
            const angle = (index * 360) / chats.length;
            const radius = 300;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  position: 'absolute',
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <Link href={`/map/${chat.id}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      background: '#FFFFFF',
                      padding: '20px',
                      borderRadius: '16px',
                      border: '3px solid #000000',
                      boxShadow: '6px 6px 0px #000000',
                      width: '150px',
                      cursor: 'pointer'
                    }}
                  >
                    <h2 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '8px',
                      textAlign: 'center'
                    }}>
                      {chat.title}
                    </h2>
                    <time style={{
                      fontSize: '12px',
                      color: '#666666',
                      display: 'block',
                      textAlign: 'center'
                    }}>
                      {chat.date}
                    </time>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPage;

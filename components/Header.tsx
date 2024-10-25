import { useState, useEffect } from 'react'
import { X, MessageSquare } from 'lucide-react'
import Logo from './Logo'

type ChatHistory = {
  id: string
  title: string
  date: string
}

const styles = {
  navbar: {
    position: 'fixed' as const,
    top: '16px',
    left: '16px',
    right: '16px',
    zIndex: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
  },

  title: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: '8px 24px',
    border: '4px solid rgb(0, 0, 0)',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgb(255, 235, 59)',
    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
    padding: '8px 16px',
    border: '4px solid rgb(0, 0, 0)',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  buttonHover: {
    boxShadow: 'none',
    transform: 'translate(3px, 3px)',
  },
  historyContainer: {
    position: 'fixed' as const,
    top: '80px',
    right: '16px',
    width: '256px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '4px solid rgb(0, 0, 0)',
    padding: '16px',
    boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textTransform: 'uppercase' as const,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    border: '2px solid rgb(0, 0, 0)',
    padding: '8px',
    marginBottom: '8px',
    transition: 'background-color 0.3s ease',
  },
  listItemHover: {
    backgroundColor: 'rgb(255, 235, 59)',
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
  listItemDate: {
    fontSize: '14px',
  },
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMindmap, setCurrentMindmap] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  useEffect(() => {
    const request = indexedDB.open('mindmapDB', 1)
    
    request.onsuccess = (event: any) => {
      const db = event.target.result
      const transaction = db.transaction(['mindmaps'], 'readonly')
      const store = transaction.objectStore('mindmaps')
      
      const getRequest = store.getAll()
      
      getRequest.onsuccess = () => {
        const mindmaps = getRequest.result
        if (mindmaps && mindmaps.length > 0) {
          const latestMindmap = mindmaps[mindmaps.length - 1]
          setCurrentMindmap(latestMindmap.title)
          setChatHistory(mindmaps.map((map: any, index: number) => ({
            id: index.toString(),
            title: map.title,
            date: new Date(map.date).toLocaleDateString()
          })))
        }
      }
    }
  }, [])

  return (
    <div style={styles.navbar}>
      <div 
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, { boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', transform: 'none' })}
      >
        <Logo />
       
      </div>

      <div style={styles.title}>
        {currentMindmap || 'MindTree'}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.button}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, { boxShadow: styles.button.boxShadow, transform: 'none' })}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div style={styles.historyContainer}>
          <h2 style={styles.heading}>Chat History</h2>
          <ul style={styles.list}>
            {chatHistory.map((chat) => (
              <li
                key={chat.id}
                style={styles.listItem}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.listItemHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
              >
                <h3 style={styles.listItemTitle}>{chat.title}</h3>
                <p style={styles.listItemDate}>{chat.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
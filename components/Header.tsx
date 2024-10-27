import { useState, useEffect } from 'react'
import { X, MessageSquare, Plus } from 'lucide-react'
import Logo from './Logo'
import { useRouter, useParams } from 'next/navigation'

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
    marginLeft: '8px',
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
    cursor: 'pointer',
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
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  }
}

export default function Header() {
  const router = useRouter()
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [currentMindmap, setCurrentMindmap] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  const fetchMindmapData = () => {
    const request = indexedDB.open('mindmapDB', 1)
    
    request.onsuccess = (event: any) => {
      const db = event.target.result
      const transaction = db.transaction(['mindmaps'], 'readonly')
      const store = transaction.objectStore('mindmaps')
      
      if (params.id) {
        const getRequest = store.get(params.id)
        getRequest.onsuccess = () => {
          const mindmap = getRequest.result
          if (mindmap) {
            setCurrentMindmap(mindmap.title)
          }
        }
      }

      const getAllRequest = store.getAll()
      getAllRequest.onsuccess = () => {
        const mindmaps = getAllRequest.result
        if (mindmaps && mindmaps.length > 0) {
          setChatHistory(mindmaps.map((map: any) => ({
            id: map.id.toString(),
            title: map.title,
            date: new Date(map.date).toLocaleDateString()
          })))
        }
      }
    }
  }

  useEffect(() => {
    fetchMindmapData()

    // Set up event listener for database changes
    const dbChangeHandler = () => {
      fetchMindmapData()
    }

    window.addEventListener('mindmapDBChange', dbChangeHandler)

    return () => {
      window.removeEventListener('mindmapDBChange', dbChangeHandler)
    }
  }, [params.id])

  const handleNewMindmap = () => {
    router.push('/generate')
  }

  const handleMindmapClick = (id: string) => {
    router.push(`/map/${id}`)
  }

  return (
    <div style={styles.navbar}>
      <div>
        <Logo />
      </div>

      <div style={styles.title}>
        {currentMindmap || 'MindTree'}
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={handleNewMindmap}
          style={styles.button}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, { boxShadow: styles.button.boxShadow, transform: 'none' })}
        >
          <Plus size={24} />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={styles.button}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, { boxShadow: styles.button.boxShadow, transform: 'none' })}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {isOpen && (
        <div style={styles.historyContainer}>
          <h2 style={styles.heading}>Chat History</h2>
          <ul style={styles.list}>
            {chatHistory.map((chat) => (
              <li
                key={chat.id}
                style={styles.listItem}
                onClick={() => handleMindmapClick(chat.id)}
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
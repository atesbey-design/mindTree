import { useState } from 'react'
import { X, MessageSquare } from 'lucide-react'

type ChatHistory = {
  id: string
  title: string
  date: string
}

const styles = {
  button: {
    position: 'fixed' as const,
    top: '16px',
    right: '16px',
    zIndex: 50,
    backgroundColor: 'rgb(255, 235, 59)', // Canlı sarı
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
    top: '70px',
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
    backgroundColor: 'rgb(255, 235, 59)', // Canlı sarı
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
  listItemDate: {
    fontSize: '14px',
  },
}

export default function History() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'AI Ethics Discussion', date: '2023-06-15' },
    { id: '2', title: 'Machine Learning Basics', date: '2023-06-14' },
    { id: '3', title: 'Future of Robotics', date: '2023-06-13' },
  ])

  return (
    <div>
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
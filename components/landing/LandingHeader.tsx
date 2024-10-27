"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const LandingHeader = () => {
  const [isHovered, setIsHovered] = useState(false)

  const headerStyle = {
    width: '100%',
    backgroundColor: '#FF6B6B',
    borderBottom: '8px solid black'
  }

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1.5rem 2rem',
  }

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  const logoStyle = {
    fontSize: '2.25rem',
    fontWeight: '900',
    color: 'white',
    letterSpacing: '0.05em',
    textShadow: '4px 4px 0px #000000'
  }

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  }

  const buttonBaseStyle = {
    padding: '0.75rem 1.5rem',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    borderRadius: '0.5rem',
    border: '4px solid black',
    transition: 'all 0.2s ease',
  }

  const startButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#FFD93D',
    color: 'black',
    transform: isHovered ? 'translate(-4px, -4px)' : 'none',
    boxShadow: isHovered ? '8px 8px 0 0 #000' : 'none',
  }

  const aboutButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#4ECDC4',
    color: 'black',
  }

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <nav style={navStyle}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={logoStyle}>
                MindTree
              </span>
            </Link>
          </motion.div>

          <div style={buttonContainerStyle}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="/map"
                style={startButtonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Başla
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="/about"
                style={aboutButtonStyle}
              >
                Hakkında
              </Link>
            </motion.div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default LandingHeader

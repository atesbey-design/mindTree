'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

const styles: { [key: string]: CSSProperties } = {
  container: {
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#FF6B6B',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    backgroundColor: '#FFD93D',
    border: '8px solid black',
    padding: '3rem',
    maxWidth: '60rem',
    width: '100%',
    borderRadius: '20px',
    boxShadow: '15px 15px 0 rgba(0,0,0,0.8)',
    position: 'relative',
    zIndex: 2,
  },
  heading: {
    fontSize: '12rem',
    fontWeight: '900',
    color: 'black',
    marginBottom: '1rem',
    textAlign: 'center',
    textShadow: '8px 8px 0 #4ECDC4',
    letterSpacing: '0.2em',
  },
  subheading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadow: '4px 4px 0 #4ECDC4',
  },
  paragraph: {
    fontSize: '1.5rem',
    marginBottom: '2.5rem',
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  link: {
    display: 'block',
    width: 'fit-content',
    margin: '0 auto',
    backgroundColor: '#4ECDC4',
    color: 'black',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    padding: '1.2rem 3rem',
    border: '5px solid black',
    textDecoration: 'none',
    borderRadius: '15px',
    boxShadow: '8px 8px 0 rgba(0,0,0,0.8)',
    transition: 'all 0.3s ease',
  },
  decorCircle1: {
    position: 'absolute',
    top: '5%',
    left: '10%',
    width: '200px',
    height: '200px',
    backgroundColor: '#4ECDC4',
    border: '8px solid black',
    borderRadius: '50%',
    zIndex: 1,
  },
  decorCircle2: {
    position: 'absolute',
    bottom: '10%',
    right: '15%',
    width: '150px',
    height: '150px',
    backgroundColor: '#FFD93D',
    border: '8px solid black',
    borderRadius: '50%',
    zIndex: 1,
  },
  decorSquare: {
    position: 'absolute',
    top: '20%',
    right: '20%',
    width: '120px',
    height: '120px',
    backgroundColor: '#FF6B6B',
    border: '8px solid black',
    transform: 'rotate(45deg)',
    zIndex: 1,
  }
}

export default function NotFound() {
  return (
    <div style={styles.container}>
      <motion.div 
        style={styles.decorCircle1}
        animate={{
          y: [0, -30, 0],
          rotate: 360,
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          },
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      <motion.div 
        style={styles.decorSquare}
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div 
        style={styles.decorCircle2}
        animate={{
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <div style={styles.content}>
        <motion.h1 
          style={styles.heading}
          animate={{ 
            y: [-20, 0, -20],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        >
          404
        </motion.h1>
        <h2 style={styles.subheading}>
          Sayfa Bulunamadı
        </h2>
        <p style={styles.paragraph}>
          Aradığınız sayfa ya silinmiş ya da hiç var olmamış olabilir.
          Lütfen ana sayfaya dönerek devam edin.
        </p>
        <Link 
          href="/"
          style={styles.link}
          className="home-link"
        >
          ANA SAYFAYA DÖN
        </Link>
      </div>
      <style jsx>{`
        .home-link:hover {
          transform: translate(-4px, -4px);
          box-shadow: 12px 12px 0 rgba(0,0,0,0.8);
        }
      `}</style>
    </div>
  )
}
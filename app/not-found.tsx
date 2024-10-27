'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FACC15',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  content: {
    backgroundColor: 'white',
    border: '8px solid black',
    padding: '2rem',
    maxWidth: '42rem',
    width: '100%',
  },
  heading: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '2rem',
    textTransform: 'uppercase',
  },
  paragraph: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: 'black',
  },
  link: {
    display: 'inline-block',
    backgroundColor: '#3B82F6',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '1rem 2rem',
    border: '4px solid black',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
  },
  shape1: {
    position: 'absolute',
    top: '2.5rem',
    left: '2.5rem',
    width: '5rem',
    height: '5rem',
    backgroundColor: '#22C55E',
    border: '8px solid black',
  },
  shape2: {
    position: 'absolute',
    bottom: '2.5rem',
    right: '2.5rem',
    width: '8rem',
    height: '8rem',
    backgroundColor: '#EC4899',
    border: '8px solid black',
  },
}

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <motion.h1 
          style={styles.heading}
          animate={{ 
            x: [-10, 10, -10],
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          404
        </motion.h1>
        <h2 style={styles.subheading}>
          Sayfa Bulunamadı
        </h2>
        <p style={styles.paragraph}>
          Aradığınız sayfa ya silinmiş ya da hiç var olmamış olabilir.
        </p>
        <Link 
          href="/"
          style={styles.link}
          className="home-link"
        >
          ANA SAYFAYA DÖN
        </Link>
      </div>
      <motion.div 
        style={styles.shape1}
        animate={{
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.div 
        style={styles.shape2}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <style jsx>{`
        .home-link:hover {
          transform: translate(4px, -4px);
          box-shadow: -8px 8px 0 0 rgba(0,0,0,1);
        }
      `}</style>
    </div>
  )
}
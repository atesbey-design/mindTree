'use client'

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Link from 'next/link'

const AboutPage = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#FF6B6B',
    padding: '4rem 2rem',
  }

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#FFD93D',
    padding: '3rem',
    borderRadius: '20px',
    border: '8px solid black',
    boxShadow: '15px 15px 0 rgba(0,0,0,0.8)',
  }

  const headingStyle = {
    fontSize: '3.5rem',
    fontWeight: '900',
    color: 'black',
    textAlign: 'center' as const,
    marginBottom: '2rem',
    textShadow: '4px 4px 0 #4ECDC4',
  }

  const paragraphStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: 'black',
    marginBottom: '1.5rem',
  }

  const teamStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '2rem',
    justifyContent: 'center',
    marginTop: '3rem',
  }

  const memberStyle = {
    backgroundColor: '#4ECDC4',
    padding: '1.5rem',
    borderRadius: '10px',
    border: '4px solid black',
    width: '250px',
    textAlign: 'center' as const,
  }

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#4ECDC4',
    color: 'black',
    padding: '1rem 2rem',
    borderRadius: '10px',
    border: '4px solid black',
    fontWeight: 'bold',
    marginTop: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  return (
    <div style={containerStyle}>
      <motion.div 
        style={contentStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={headingStyle}>MindTree Hakkında</h1>
        
        <p style={paragraphStyle}>
          MindTree, 2024 Neo Butcamp Hackathon etkinliği kapsamında geliştirilmiş yenilikçi bir öğrenme platformudur. 
          Yapay zeka destekli öğrenme yolları ile kullanıcıların kişiselleştirilmiş eğitim deneyimi yaşamasını sağlar.
        </p>

        <p style={paragraphStyle}>
          Projemiz, modern web teknolojileri kullanılarak geliştirilmiş olup, Next.js, TypeScript ve Framer Motion gibi 
          güçlü araçları kullanmaktadır. Kullanıcı deneyimini en üst düzeyde tutmak için özel olarak tasarlanmış 
          arayüzü ve interaktif özellikleriyle öne çıkmaktadır.
        </p>

        <h2 style={{...headingStyle, fontSize: '2.5rem'}}>Takımımız</h2>
        
        <div style={teamStyle}>
          <motion.div 
            style={memberStyle}
            whileHover={{ scale: 1.05 }}
          >
            <h3>Ahmet Yılmaz</h3>
            <p>Frontend Developer</p>
          </motion.div>

          <motion.div 
            style={memberStyle}
            whileHover={{ scale: 1.05 }}
          >
            <h3>Mehmet Demir</h3>
            <p>Backend Developer</p>
          </motion.div>

          <motion.div 
            style={memberStyle}
            whileHover={{ scale: 1.05 }}
          >
            <h3>Ayşe Kaya</h3>
            <p>UI/UX Designer</p>
          </motion.div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link 
            href="https://github.com/yourusername/mindtree"
            target="_blank"
            style={buttonStyle}
          >
            <Github size={24} />
            GitHub'da İncele
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutPage

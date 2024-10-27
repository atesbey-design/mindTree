'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, LineChart, Users } from 'lucide-react'

interface Stat {
  value: string
  label: string
  description: string
  icon: React.ReactNode
}

interface StatsProps {
  stats: Stat[]
  containerVariants: any
  itemVariants: any
  colors: {
    primary: string
  }
}

const Stats: React.FC<StatsProps> = ({ stats, containerVariants, itemVariants, colors }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      style={{
        padding: '100px 20px',
        background: colors.primary,
        border: '3px solid #000000',
        borderTop: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: '#FF4141',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.2,
          zIndex: 1
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: '10px 10px 0px #000000',
              transition: { duration: 0.2 }
            }}
            style={{
              background: '#FFFFFF',
              padding: '40px',
              border: '3px solid #000000',
              borderRadius: '20px',
              boxShadow: '6px 6px 0px #000000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <motion.div 
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              style={{
                background: '#FFD93D',
                padding: '20px',
                borderRadius: '15px',
                border: '3px solid #000000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '4px 4px 0px #000000'
              }}>
              {stat.icon}
            </motion.div>
            <motion.h3 
              whileHover={{ scale: 1.1 }}
              style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: '#4CAF50',
                marginBottom: '5px',
                textShadow: '2px 2px 0px #000000'
              }}>
              {stat.value}
            </motion.h3>
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#000000',
            
            }}>
              {stat.label}
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#666',
              maxWidth: '90%'
            }}>
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Stats

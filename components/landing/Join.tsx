'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Target, LineChart } from 'lucide-react'
import Link from 'next/link'

interface JoinProps {
  containerVariants: any
  itemVariants: any
  colors: {
    accent: string
  }
  buttonMotionStyle: React.CSSProperties
}

const Join: React.FC<JoinProps> = ({ containerVariants, itemVariants, colors, buttonMotionStyle }) => {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null)

  const features = [
    {
      icon: <Brain size={32} />,
      text: "Yapay Zeka Destekli"
    },
    {
      icon: <Target size={32} />,
      text: "Kişiselleştirilmiş"  
    },
    {
      icon: <LineChart size={32} />,
      text: "Gelişim Takibi"
    }
  ]

  return (
    <motion.section
      variants={containerVariants}
      style={{
        padding: '100px 20px',
        background: colors.accent,
        border: '3px solid #000000',
        borderTop: 'none',
        textAlign: 'center',
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

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.h2 
          variants={itemVariants} 
          style={{
            fontSize: '3.5rem',
            marginBottom: '40px',
            textTransform: 'uppercase',
            textShadow: '4px 4px 0px #FF4141',
            fontWeight: 800,
            letterSpacing: '-1px'
          }}
        >
          Eğitim Yolculuğunuzda Yapay Zeka Rehberiniz
        </motion.h2>

        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onHoverStart={() => setHoveredIcon(index)}
              onHoverEnd={() => setHoveredIcon(null)}
              whileHover={{ y: -5 }}
              style={{
                background: hoveredIcon === index ? '#FFD93D' : '#FFFFFF',
                padding: '20px 30px',
                border: '3px solid #000000',
                borderRadius: '12px',
                boxShadow: '6px 6px 0px #000000',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {feature.icon}
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          style={{
            background: '#FFFFFF',
            padding: '30px',
            border: '3px solid #000000',
            borderRadius: '20px',
            boxShadow: '6px 6px 0px #000000',
            marginBottom: '40px',
            textAlign: 'left'
          }}
        >
          <ul style={{
            fontSize: '1.2rem',
            lineHeight: 1.8,
            listStyle: 'none',
            padding: 0
          }}>
            {[
              '✨ Size özel öğrenme planı oluşturur',
              '📚 İhtiyacınız olan kaynakları belirler',
              '🎯 Pratik yapmanız gereken konuları listeler',
              '📊 İlerlemenizi analiz eder',
              '🚀 Başarı için gerekli adımları gösterir',
              '💬 Sürekli geri bildirim sağlar'
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 10 }}
                style={{ marginBottom: '10px' }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <Link href="/generate">
          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '10px 10px 0px #000000'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...buttonMotionStyle,
              fontSize: '1.3rem',
              padding: '20px 40px',
              background: '#FF4141',
              border: '3px solid #000000',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '6px 6px 0px #000000'
            }}
          >
            Öğrenme Yolculuğunuzu Başlatın
            <ArrowRight size={24} style={{ marginLeft: '10px' }} />
          </motion.button>
        </Link>
      </div>
    </motion.section>
  )
}

export default Join

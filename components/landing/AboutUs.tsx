'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, LineChart, Compass, ArrowRight } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

interface AboutUsProps {
  features: Feature[]
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const AboutUs: React.FC<AboutUsProps> = ({ features }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      style={{
        padding: '120px 20px',
        background: '#FFD93D',
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
          left: '-20%',
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

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.h2 
          variants={itemVariants} 
          style={{
            fontSize: '3.5rem',
            textAlign: 'center',
            marginBottom: '80px',
            textTransform: 'uppercase',
            textShadow: '4px 4px 0px #FF4141',
            fontWeight: 800,
            letterSpacing: '-1px'
          }}
        >
          Eğitim Yolculuğunuz Nasıl İlerler?
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          padding: '0 20px'
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: '8px 8px 0px #000000',
                transition: { duration: 0.2 }
              }}
              style={{
                background: '#FFFFFF',
                padding: '40px 30px',
                border: '3px solid #000000',
                borderRadius: '20px',
                boxShadow: '6px 6px 0px #000000',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                style={{ 
                  color: feature.color, 
                  marginBottom: '25px',
                  background: `${feature.color}15`,
                  width: 'fit-content',
                  padding: '12px',
                  borderRadius: '12px'
                }}
              >
                {feature.icon}
              </motion.div>
              
              <h3 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '20px',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${feature.color} 0%, #000000 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {feature.title === 'AI-Powered Analysis' ? 'Yapay Zeka Değerlendirmesi' :
                 feature.title === 'Personalized Roadmap' ? 'Kişiye Özel Eğitim Planı' :
                 feature.title === 'Progress Tracking' ? 'Gelişim Takibi' :
                 feature.title === 'Smart Recommendations' ? 'Akıllı Öğrenme Önerileri' :
                 feature.title}
              </h3>

              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.7,
                color: '#666666',
                marginBottom: '25px'
              }}>
                {feature.description === 'Our AI analyzes your goals, current skills, and learning style to create a tailored development plan.' ? 'Yapay zekamız öğrenme hedefinizi, mevcut bilgi seviyenizi ve öğrenme tarzınızı analiz ederek size özel bir eğitim planı oluşturur.' :
                 feature.description === 'Get a clear, step-by-step roadmap showing exactly what you need to learn and practice.' ? 'Seçtiğiniz konuda hangi alt başlıkları öğrenmeniz gerektiğini ve nasıl pratik yapmanız gerektiğini gösteren detaylı bir yol haritası alın.' :
                 feature.description === 'Track your progress with detailed analytics and milestone achievements.' ? 'Öğrenme sürecinizi, tamamladığınız konuları ve başarılarınızı detaylı analizlerle takip edin.' :
                 feature.description === 'Receive intelligent suggestions for resources, exercises, and next steps based on your progress.' ? 'İlerlemenize göre size özel eğitim kaynakları, alıştırmalar ve bir sonraki adımlar için yapay zeka destekli öneriler alın.' :
                 feature.description}
              </p>

             
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default AboutUs

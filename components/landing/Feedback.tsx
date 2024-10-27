'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Star, Target, Brain, LineChart } from 'lucide-react'

interface Testimonial {
  rating: number
  comment: string
  name: string
  role: string
  achievement: string
}

interface FeedbackProps {
  testimonials: Testimonial[]
  containerVariants: any
  itemVariants: any
  colors: {
    accent: string
  }
}

const Feedback: React.FC<FeedbackProps> = ({ testimonials, containerVariants, itemVariants, colors }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      style={{
        padding: '100px 20px',
        background: '#FFFFFF',
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
          background: '#FFD93D',
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
            marginBottom: '60px',
            textTransform: 'uppercase',
            textShadow: '4px 4px 0px #FFD93D',
            fontWeight: 800,
            letterSpacing: '-1px'
          }}
        >
          Başarı Hikayeleri
        </motion.h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: '10px 10px 0px #000000',
                transition: { duration: 0.2 }
              }}
              style={{
                background: '#F8F8F8',
                padding: '40px',
                border: '3px solid #000000',
                borderRadius: '20px',
                boxShadow: '6px 6px 0px #000000',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <motion.div 
                style={{
                  display: 'flex',
                  marginBottom: '20px',
                  gap: '12px',
                  background: '#FFD93D',
                  padding: '15px',
                  borderRadius: '12px',
                  border: '2px solid #000000',
                  width: 'fit-content'
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <Target size={24} />
                <LineChart size={24} />
                <Brain size={24} />
              </motion.div>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: 1.6,
                marginBottom: '20px',
                fontStyle: 'italic',
                color: '#333'
              }}>
                "{testimonial.comment}"
              </p>
              <motion.div 
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                style={{
                  padding: '15px',
                  background: '#FFD93D',
                  border: '2px solid #000000',
                  marginBottom: '20px',
                  borderRadius: '12px',
                  boxShadow: '4px 4px 0px #000000'
                }}
              >
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 700
                }}>
                  Başarı: {testimonial.achievement}
                </p>
              </motion.div>
              <div>
                <h4 style={{ 
                  fontSize: '1.4rem', 
                  marginBottom: '5px',
                  fontWeight: 700,
                  color: '#000'
                }}>
                  {testimonial.name}
                </h4>
                <p style={{ 
                  color: '#666666',
                  fontSize: '1.1rem'
                }}>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Feedback

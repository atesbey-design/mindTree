'use client'
import React, { useState, useEffect } from 'react'
import { Trees, Users, BarChart, ArrowRight, Menu, X, Zap, Book, Target } from 'lucide-react'

const colors = {
  background: '#E8ECEE',
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFD93D',
  text: '#1A1A1A',
}

export default function EnhancedHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      fontFamily: '"Roboto Mono", monospace',
      backgroundColor: colors.background,
      color: colors.text,
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: colors.primary,
        padding: '20px',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        borderBottom: `4px solid ${colors.text}`,
        transform: `translateY(-${Math.min(scrollPosition, 50)}px)`,
        transition: 'transform 0.3s ease-out',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>MindTree</h1>
          <nav style={{ display: isMenuOpen ? 'flex' : 'none', flexDirection: 'column', position: 'absolute', top: '100%', right: 0, backgroundColor: colors.primary, padding: '20px', border: `4px solid ${colors.text}`, borderTop: 'none' }}>
            {['Home', 'About', 'Features', 'Login'].map((item) => (
              <a key={item} href="#" style={{...linkStyle, marginBottom: '10px'}}>{item}</a>
            ))}
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        backgroundColor: colors.secondary,
        padding: '150px 20px 50px',
        borderBottom: `4px solid ${colors.text}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: 1.2 }}>Grow Your Mind,<br />Branch by Branch</h2>
            <p style={{ fontSize: '1.5rem', marginBottom: '30px', maxWidth: '600px' }}>MindTree: Where knowledge takes root and ideas flourish. Track your learning journey with our innovative tree structure.</p>
            <button style={buttonStyle}>
              Start Growing
              <ArrowRight style={{ marginLeft: '10px' }} />
            </button>
          </div>
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <Trees size={300} style={{ filter: 'drop-shadow(5px 5px 0 rgba(0,0,0,0.5))' }} />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-20px', left: 0, width: '100%', height: '40px', backgroundColor: colors.accent, transform: 'skew(0, -2deg)' }}></div>
      </section>

      {/* Features Section */}
      <section style={{
        backgroundColor: colors.accent,
        padding: '80px 20px',
        borderBottom: `4px solid ${colors.text}`,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>Why Choose MindTree?</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            {[
              { icon: <Zap size={50} />, title: 'Dynamic Learning', description: 'Adapt your learning path as you grow' },
              { icon: <Book size={50} />, title: 'Visual Progress', description: 'See your knowledge bloom before your eyes' },
              { icon: <Target size={50} />, title: 'Goal-Oriented', description: 'Set and achieve milestones with ease' },
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: colors.primary,
                padding: '30px',
                borderRadius: '10px',
                border: `4px solid ${colors.text}`,
                boxShadow: `8px 8px 0 ${colors.text}`,
                flex: '1 1 300px',
                maxWidth: '350px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {feature.icon}
                <h3 style={{ fontSize: '1.8rem', margin: '20px 0' }}>{feature.title}</h3>
                <p style={{ fontSize: '1.2rem' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section style={{
        backgroundColor: colors.secondary,
        padding: '80px 20px',
        borderBottom: `4px solid ${colors.text}`,
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>About MindTree</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>
            <div style={{ flex: '1 1 500px' }}>
              <p style={{ fontSize: '1.4rem', lineHeight: 1.6, marginBottom: '20px' }}>
                MindTree is more than just a learning platform – it's a journey of growth and discovery. We've reimagined the way you learn, turning abstract concepts into a vibrant, living tree of knowledge.
              </p>
              <p style={{ fontSize: '1.4rem', lineHeight: 1.6 }}>
                With each topic mastered, watch as your tree flourishes, branches reaching ever higher. It's not just about accumulating information; it's about nurturing a deep-rooted understanding that will last a lifetime.
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '300px',
                height: '300px',
                backgroundColor: colors.primary,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `4px solid ${colors.text}`,
                boxShadow: `12px 12px 0 ${colors.text}`,
                transform: 'rotate(-5deg)',
              }}>
                <Trees size={200} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(45deg, ${colors.accent} 25%, transparent 25%, transparent 75%, ${colors.accent} 75%, ${colors.accent}), linear-gradient(45deg, ${colors.accent} 25%, transparent 25%, transparent 75%, ${colors.accent} 75%, ${colors.accent})`, backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px', opacity: 0.1 }}></div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: colors.primary,
        padding: '80px 20px',
        borderBottom: `4px solid ${colors.text}`,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>Our Growing Forest</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            {[
              { icon: <Users size={50} />, value: '10,000+', label: 'Active Learners' },
              { icon: <Trees size={50} />, value: '50,000+', label: 'Knowledge Trees Grown' },
              { icon: <BarChart size={50} />, value: '500,000+', label: 'Skills Mastered' },
            ].map((stat, index) => (
              <div key={index} style={{
                backgroundColor: colors.accent,
                padding: '30px',
                borderRadius: '10px',
                border: `4px solid ${colors.text}`,
                boxShadow: `8px 8px 0 ${colors.text}`,
                flex: '1 1 250px',
                maxWidth: '300px',
                textAlign: 'center',
                transform: `rotate(${Math.random() * 6 - 3}deg)`,
              }}>
                {stat.icon}
                <h3 style={{ fontSize: '2.5rem', margin: '20px 0' }}>{stat.value}</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: colors.secondary,
        padding: '80px 20px',
        textAlign: 'center',
        borderBottom: `4px solid ${colors.text}`,
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Ready to Grow Your Knowledge?</h2>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px' }}>Join MindTree today and start cultivating your personal forest of wisdom!</p>
        <button style={{...buttonStyle, fontSize: '1.5rem', padding: '20px 40px'}}>
          Get Started Now
          <ArrowRight size={24} style={{ marginLeft: '10px' }} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: colors.accent,
        padding: '40px 20px',
        borderTop: `4px solid ${colors.text}`,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>&copy; 2024 MindTree. All rights reserved.</p>
          <nav>
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <a key={item} href="#" style={{...linkStyle, marginLeft: '20px'}}>{item}</a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}

const linkStyle = {
  color: colors.text,
  fontSize: '1.2rem',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'transform 0.3s ease',
}

const buttonStyle = {
  backgroundColor: colors.text,
  color: colors.background,
  border: 'none',
  padding: '15px 30px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  boxShadow: `8px 8px 0 ${colors.accent}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
}
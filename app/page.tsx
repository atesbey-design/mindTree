'use client'
import React from 'react'
import { Brain, Target, Sparkles, BookOpen, Rocket, LineChart } from 'lucide-react'
import Hero from '../components/landing/Hero'
import AboutUs from '../components/landing/AboutUs'
import Stats from '../components/landing/Stats'
import Feedback from '../components/landing/Feedback'
import Join from '../components/landing/Join'
import LandingHeader from '../components/landing/LandingHeader'
const colors = {
  background: '#FFFFFF',
  primary: '#FF4141',
  secondary: '#000000',
  accent: '#FFD93D',
  text: '#000000',
  
  gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)'

}

const features = [
  {
    icon: <Brain size={50} />,
    title: 'Kişiye Özel Öğrenme Yolu',
    description: 'Yapay zeka, öğrenme tarzınızı ve hedeflerinizi analiz ederek size özel bir eğitim planı oluşturur.',
    color: '#FF4141'
  },
  {
    icon: <BookOpen size={50} />,
    title: 'Kapsamlı Kaynak Önerileri',
    description: 'Hedeflerinize uygun kitaplar, kurslar, videolar ve pratik egzersizler ile öğrenme sürecinizi destekler.',
    color: '#000000'
  },
  {
    icon: <LineChart size={50} />,
    title: 'Detaylı İlerleme Analizi',
    description: 'Öğrenme sürecinizi grafikler ve raporlarla takip edin, güçlü ve geliştirmeniz gereken yönlerinizi keşfedin.',
    color: '#FFD93D'
  }
]

const stats = [
  { 
    value: '100+', 
    label: 'Oluşturulan Treeler',
    description: 'Oluşturulan öğrenme treeleri',
    icon: <Rocket size={24} />
  },
  { 
    value: '10+', 
    label: 'Aktif MindTree Kullanıcıları',
    description: 'Hedeflerine ulaşan öğrenci',
    icon: <Target size={24} />
  },
  { 
    value: '95%', 
    label: 'Bitirme Oranı',
    description: 'Hedef tamamlama oranı',
    icon: <LineChart size={24} />
  },
 
]

const testimonials = [
  {
    name: 'Ayşe Yılmaz',
    role: 'Dil Öğrencisi',
    comment: 'MindTree ile İngilizce öğrenme yolculuğum çok daha verimli hale geldi. Yapay zeka, eksik olduğum konuları tespit edip özel alıştırmalar sunuyor.',
    rating: 5,
    achievement: 'IELTS sınavında 7.5 band score elde etti'
  },
  {
    name: 'Mehmet Kaya',
    role: 'Yazılım Öğrencisi',
    comment: 'Programlama öğrenirken MindTree bana tam ihtiyacım olan yönlendirmeleri yaptı. Öğrenme yolculuğum çok daha sistematik ve etkili.',
    rating: 5,
    achievement: 'Junior Developer pozisyonuna kabul edildi'
  },
  {
    name: 'Zeynep Demir',
    role: 'Profesyonel Gelişim',
    comment: 'İş yönetimi becerilerimi geliştirmek için kullandığım MindTree, teorik bilgiyi pratiğe dökmemde büyük fayda sağladı.',
    rating: 4,
    achievement: 'Departman yöneticiliğine yükseldi'
  }
]

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
}

const buttonMotionStyle = {
  background: colors.primary,
  padding: '20px 40px',
  fontSize: '1.4rem',
  border: '3px solid #000000',
  boxShadow: '6px 6px 0px #000000',
  color: '#FFFFFF',
  borderRadius: '0px',
  fontWeight: '900',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px'
}

export default function HomePage() {
  return (
    <div style={{
      fontFamily: '"Space Mono", monospace',
      backgroundColor: colors.background,
      color: colors.text,
      overflowX: 'hidden'
    }}>
      <LandingHeader />
      <Hero />
      <AboutUs features={features} />
      <Stats stats={stats} containerVariants={containerVariants} itemVariants={itemVariants} colors={colors} />
      <Feedback testimonials={testimonials} containerVariants={containerVariants} itemVariants={itemVariants} colors={colors} />
      <Join containerVariants={containerVariants} itemVariants={itemVariants} colors={colors} buttonMotionStyle={buttonMotionStyle} />
    </div>
  )
}
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  LineChart,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";

const HeroText: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <motion.div
      style={{
        flex: 1,
        color: "#000000", 
        textAlign: "left",
        maxWidth: "650px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "#FFD93D",
          padding: "8px 16px",
          borderRadius: "50px",
          marginBottom: "20px",
          border: "2px solid #000",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <Sparkles size={20} />
        <span style={{ fontWeight: 600 }}>Yapay Zeka Destekli Öğrenme</span>
      </motion.div>

      <h1
        style={{
          fontSize: "4.5rem",
          lineHeight: 1.1,
          marginBottom: "30px",
          fontWeight: 900,
          background: "linear-gradient(135deg, #FF4141 0%, #FFD93D 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: "none",
          letterSpacing: "-2px",
        }}
      >
        Geleceğin Öğrenme
        <br />
        <span
          style={{
            position: "relative",
            display: "inline-block",
            WebkitTextFillColor: "#000",
          }}
        >
          Platformu
          <svg
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "0",
              width: "100%",
              height: "15px",
              zIndex: -1,
            }}
          >
            <path
              d="M0,0 Q50,15 100,0"
              stroke="#FF4141"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              width="100%"
            />
          </svg>
        </span>
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {[
          { icon: <Brain size={24} />, text: "AI Destekli" },
          { icon: <Target size={24} />, text: "Kişiselleştirilmiş" },
        ].map((item, i) => (
          <motion.div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: hoveredItem === i ? "#FFD93D" : "#fff",
              border: "2px solid #000",
              boxShadow: "4px 4px 0 #000",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onHoverStart={() => setHoveredItem(i)}
            onHoverEnd={() => setHoveredItem(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
            <span style={{ fontWeight: 600 }}>{item.text}</span>
          </motion.div>
        ))}
      </div>

      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "40px",
          lineHeight: 1.7,
          color: "#666",
        }}
      >
        Yapay zeka destekli öğrenme asistanınız ile hedeflerinize daha hızlı
        ulaşın. Kişiselleştirilmiş öğrenme deneyimi ve gerçek zamanlı geri
        bildirimlerle başarıya giden yolda size rehberlik ediyoruz.
      </p>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link href="/generate">
          <motion.button
            style={{
              fontSize: "1.1rem",
              padding: "16px 32px",
              background: "#FF4141",
              color: "#FFFFFF",
              border: "3px solid #000000",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "6px 6px 0px #000000",
            }}
            whileHover={{
              transform: "translate(-4px, -4px)",
              boxShadow: "10px 10px 0px #000000",
            }}
            whileTap={{
              transform: "translate(2px, 2px)",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            Hemen Başla
            <ArrowRight size={20} />
          </motion.button>
        </Link>

     
      </div>
    </motion.div>
  );
};

const HeroImage: React.FC = () => {
  const [draggedItems, setDraggedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  return (
    <motion.div
      style={{
        flex: 1,
        position: "relative",
        minHeight: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Image
        src="/hero-nobg.png"
        alt="Hero Image"
        objectFit="contain"
        width={2000}
        height={2000}
        priority
        style={{
          zIndex: 999,
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-20%",
          width: "800px",
          height: "800px",
          background: "#FFD93D",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.5,
          zIndex: 1,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {[...Array(6)].map((_, i) => {
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const springConfig = { damping: 20, stiffness: 400 };
        const springX = useSpring(x, springConfig);
        const springY = useSpring(y, springConfig);
        const randomBgColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        return (
          <motion.div
            key={i}
            drag
            dragSnapToOrigin
            style={{
              position: "absolute",
              padding: "15px 25px",
              background: draggedItems[i] ? randomBgColor : "#fff",
              borderRadius: "15px",
              border: "2px solid #000",
              boxShadow: "4px 4px 0 #000",
              zIndex: 3,
              x: springX,
              y: springY,
              cursor: "grab",
              ...getFloatingElementPosition(i),
            }}
            onDragStart={() => setDraggedItems({ ...draggedItems, [i]: true })}
            onDragEnd={() => setDraggedItems({ ...draggedItems, [i]: false })}
            animate={{
              y: draggedItems[i] ? 0 : [0, -15, 0],
              rotate: draggedItems[i] ? 0 : [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            whileDrag={{
              scale: 1.1,
              boxShadow: "8px 8px 0 #000",
            }}
          >
            {getFloatingElementContent(i)}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const getFloatingElementPosition = (index: number) => {
  const positions = [
    { top: "10%", left: "-10%" },
    { top: "0%", right: "15%" },
    { bottom: "0%", right: "-20%" },
    { top: "60%", left: "-15%" },

    { top: "35%", left: "105%" },
    { bottom: "-10%", left: "5%" },
  ];
  return positions[index];
};

const getFloatingElementContent = (index: number) => {
  const contents = [
    <div key={0} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Brain size={20} color="#FF4141" />
      <span>AI Powered</span>
    </div>,
    <div key={1} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Target size={20} color="#FFD93D" />
      <span>Hedef Odaklı</span>
    </div>,
    <div key={2} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Sparkles size={20} color="#FF4141" />
      <span>Kişisel Plan</span>
    </div>,
    <div key={3} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <LineChart size={20} color="#FFD93D" />
      <span>İlerleme Takibi</span>
    </div>,
    <div key={4} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <BookOpen size={20} color="#FF4141" />
      <span>Zengin İçerik</span>
    </div>,
    <div key={5} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Rocket size={20} color="#FFD93D" />
      <span>Hızlı Gelişim</span>
    </div>,
  ];
  return contents[index % contents.length];
};

const Hero: React.FC = () => {
  return (
    <section
      style={{
        background: "#FFFFFF",
        minHeight: "80vh",
        padding: "80px 40px",
        position: "relative",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        borderBottom: "3px solid #000000",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <HeroText />
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;

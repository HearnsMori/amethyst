"use client";

import React, { useState, useEffect, CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// --- Types ---
type Stage = 'initial' | 'warping' | 'revealed';

export default function EternalAmethyst3D() {
  const [stage, setStage] = useState<Stage>('initial');
  
  // Mouse tracking for 3D Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const startSequence = () => {
    setStage('warping');
    setTimeout(() => {
      setStage('revealed');
    }, 4500);
  };

  // --- Styles Object ---
  const styles: Record<string, CSSProperties> = {
    canvas: {
      width: '100vw',
      height: '100vh',
      backgroundColor: '#05000a',
      perspective: '1200px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
    },
    world: {
      width: '100%',
      height: '100%',
      position: 'relative',
      transformStyle: 'preserve-3d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    prismStack: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '80px', // Better spacing between cubes
      transformStyle: 'preserve-3d',
    },
    prism: {
      width: '140px',
      height: '140px',
      transformStyle: 'preserve-3d',
      cursor: 'pointer',
      position: 'relative',
    },
    prismFace: {
      position: 'absolute',
      width: '140px',
      height: '140px',
      background: 'rgba(217, 70, 239, 0.1)',
      border: '2px solid #ff49db',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '0 0 10px #ff49db',
      boxShadow: 'inset 0 0 30px rgba(217, 70, 239, 0.3)',
      backfaceVisibility: 'visible',
    },
    letterContainer: {
      width: 'min(90vw, 420px)',
      padding: '40px',
      background: 'rgba(20, 0, 40, 0.9)',
      border: '1px solid #9b59b6',
      borderRadius: '24px',
      boxShadow: '0 0 60px rgba(155, 89, 182, 0.5)',
      backdropFilter: 'blur(25px)',
      transformStyle: 'preserve-3d',
      textAlign: 'center',
    },
    neonRing: {
      position: 'absolute',
      width: '800px',
      height: '800px',
      borderRadius: '50%',
      border: '2px solid #7000ff',
      boxShadow: '0 0 50px #7000ff, inset 0 0 50px #7000ff',
      opacity: stage === 'warping' ? 0.8 : 0.2,
      transform: 'rotateX(80deg)',
      transition: 'all 0.5s ease',
    }
  };

  return (
    <div style={styles.canvas}>
      {/* Dynamic Starfield */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            translateZ: [-2000, 1500],
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: stage === 'warping' ? 0.4 : 6, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5 
          }}
          style={{
            position: 'absolute',
            width: stage === 'warping' ? '1px' : '2px',
            height: stage === 'warping' ? '200px' : '2px',
            background: i % 2 === 0 ? '#ff00ff' : '#9b59b6',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div style={{ ...styles.world, rotateX, rotateY }}>
        <div style={styles.neonRing} />

        <AnimatePresence mode="wait">
          {stage === 'initial' && (
            <motion.div 
              key="stack"
              style={styles.prismStack}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
            >
              {/* Top Mini Cube */}
              <motion.div
                style={styles.prism}
                animate={{ rotateY: 360, rotateX: 45 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.1 }}
                onClick={startSequence}
              >
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'translateZ(40px)' }}>Tanya</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateY(180deg) translateZ(40px)' }}>Sayo</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateY(90deg) translateZ(40px)' }}>Lang</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateY(-90deg) translateZ(40px)' }}>Ako</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateX(90deg) translateZ(40px)' }}>💜</div>
              </motion.div>

              {/* Main Middle Cube */}
              <motion.div
                style={styles.prism}
                animate={{ rotateY: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.2 }}
                onClick={startSequence}
              >
                <div style={{ ...styles.prismFace, transform: 'translateZ(70px)', fontSize: '18px' }}>Click Here</div>
                <div style={{ ...styles.prismFace, transform: 'rotateY(180deg) translateZ(70px)' }}>Click Here</div>
                <div style={{ ...styles.prismFace, transform: 'rotateY(90deg) translateZ(70px)' }}>💜 Amethyst</div>
                <div style={{ ...styles.prismFace, transform: 'rotateY(-90deg) translateZ(70px)' }}>💜 Tanya</div>
                <div style={{ ...styles.prismFace, transform: 'rotateX(90deg) translateZ(70px)' }}>Love</div>
                <div style={{ ...styles.prismFace, transform: 'rotateX(-90deg) translateZ(70px)' }}>Always</div>
              </motion.div>

              {/* Bottom Mini Cube */}
              <motion.div
                style={styles.prism}
                animate={{ rotateY: 360, rotateZ: 45 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.1 }}
                onClick={startSequence}
              >
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'translateZ(40px)' }}>I</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateY(180deg) translateZ(40px)' }}>Love</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateY(90deg) translateZ(40px)' }}>You</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateY(-90deg) translateZ(40px)' }}>Amethyst</div>
                <div style={{ ...styles.prismFace, width: '80px', height: '80px', transform: 'rotateX(90deg) translateZ(40px)' }}>💜</div>
              </motion.div>
            </motion.div>
          )}

          {stage === 'warping' && (
            <motion.div
              key="warp-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ position: 'absolute', textAlign: 'center', zIndex: 100 }}
            >
              <h2 style={{ letterSpacing: '10px', color: '#ff49db', textShadow: '0 0 20px #ff49db', lineHeight: '2' }}>
                I LOVE YOU SO MUCH...<br/>PLEASE WAIT...
              </h2>
            </motion.div>
          )}

          {stage === 'revealed' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.3, translateZ: -1000, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, translateZ: 200, rotateX: 0 }}
              transition={{ duration: 11, type: 'spring', bounce: 0.4 }}
              style={styles.letterContainer}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h2 style={{ color: '#ff49db', marginBottom: '25px', letterSpacing: '2px', fontSize: '1.6rem' }}>
                  My Dearest Amethyst
                </h2>
                <div style={{ fontSize: '0.73rem', lineHeight: '1.8', color: '#eee', textAlign: 'justify' }}>
                  <p>You don&apos;t have to be perfect love. Just be you lang.</p>
                  <p>I am here not for anything or reason. I unconditionally love you. I am here to understand you, 
                    <span style={{ color: '#d946ef', fontWeight: 'bold' }}> Amethyst.</span>
                  </p>
                  <p style={{ marginTop: '10px' }}>At sa pinakamahirap mong araw, I am on your side. Take your time. I am not here to own you or to rush you, I like who you are becoming.</p>
                </div>
                
                <motion.div 
                  animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ marginTop: '30px', fontSize: '3rem', filter: 'drop-shadow(0 0 15px #ff49db)' }}
                >
                  💜
                </motion.div>

                <button
                  onClick={() => setStage('initial')}
                  style={{
                    marginTop: '30px',
                    background: 'rgba(112, 0, 255, 0.2)',
                    border: '1px solid #7000ff',
                    color: '#fff',
                    padding: '12px 28px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s'
                  }}
                >
                  REPLAY JOURNEY
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Finishing Glow */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, transparent 10%, rgba(5, 0, 10, 0.95) 100%)'
      }} />
    </div>
  );
}


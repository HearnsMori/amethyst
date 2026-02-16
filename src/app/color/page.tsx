"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

export default function EternalAmethyst3D() {
  const [stage, setStage] = useState('initial'); // 'initial', 'warping', 'revealed'
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
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
    }, 4500); // 4.5 seconds of "Traveling"
  };

  const styles = {
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
    prism: {
      width: '160px',
      height: '160px',
      transformStyle: 'preserve-3d',
      cursor: 'pointer',
    },
    prisms: {
      width: '160px',
      height: '160px',
      transformStyle: 'preserve-3d',
      cursor: 'pointer',
    },
    prismFace: {
      position: 'absolute',
      width: '160px',
      height: '160px',
      background: 'rgba(217, 70, 239, 0.1)',
      border: '2px solid #ff49db',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      textShadow: '0 0 10px #ff49db',
      boxShadow: 'inset 0 0 30px rgba(217, 70, 239, 0.3), 0 0 20px rgba(217, 70, 239, 0.2)',
    },
    prismsFace: {
      position: 'absolute',
      width: '60px',
      height: '60px',
      background: 'rgba(117, 10, 137, 0.1)',
      border: '2px solid #ff49db',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      textShadow: '0 0 10px #ff49db',
      boxShadow: 'inset 0 0 30px rgba(217, 70, 239, 0.3), 0 0 20px rgba(217, 70, 239, 0.2)',
    },
    letterContainer: {
      width: '380px',
      padding: '40px',
      background: 'rgba(20, 0, 40, 0.85)',
      border: '1px solid #9b59b6',
      borderRadius: '24px',
      boxShadow: '0 0 60px rgba(155, 89, 182, 0.5)',
      backdropFilter: 'blur(20px)',
      transformStyle: 'preserve-3d',
      textAlign: 'center',
    },
    neonRing: {
      position: 'absolute',
      width: '700px',
      height: '700px',
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
      {/* Dynamic Warp Starfield */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            translateZ: [-2000, 1500],
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: stage === 'warping' ? 0.4 : 5, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5 
          }}
          style={{
            position: 'absolute',
            width: stage === 'warping' ? '1px' : '2px',
            height: stage === 'warping' ? '150px' : '2px',
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
            <div>
            <motion.div
              key="prisms1"
              style={styles.prisms}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotateY: 360, rotateX: 250, rotateZ: 140 }}
              exit={{ scale: 0, rotateZ: 180, filter: 'brightness(3) blur(10px)' }}
              whileHover={{ scale: 1.1 }}
              onClick={startSequence}
              transition={{ rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { type: 'spring' } }}
            >
              <div style={{ ...styles.prismsFace, transform: 'translateZ(80px)' }}>Tanya</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateY(180deg) translateZ(80px)' }}>Sayo</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateY(90deg) translateZ(80px)' }}>Lang</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateY(-90deg) translateZ(80px)' }}>Ako</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateX(90deg) translateZ(80px)' }}>💜</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateX(-90deg) translateZ(80px)' }}>💜</div>
            </motion.div>
            <br/>
            <br/>
            <motion.div
              key="prism"
              style={styles.prism}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotateY: 360 }}
              exit={{ scale: 0, rotateZ: 180, filter: 'brightness(3) blur(10px)' }}
              whileHover={{ scale: 1.1 }}
              onClick={startSequence}
              transition={{ rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { type: 'spring' } }}
            >
              <div style={{ ...styles.prismFace, transform: 'translateZ(80px)' }}>Click Here</div>
              <div style={{ ...styles.prismFace, transform: 'rotateY(180deg) translateZ(80px)' }}>Click Here</div>
              <div style={{ ...styles.prismFace, transform: 'rotateY(90deg) translateZ(80px)' }}>Click Here</div>
              <div style={{ ...styles.prismFace, transform: 'rotateY(-90deg) translateZ(80px)' }}>Click Here</div>
              <div style={{ ...styles.prismFace, transform: 'rotateX(90deg) translateZ(80px)' }}>💜 Amethyst</div>
              <div style={{ ...styles.prismFace, transform: 'rotateX(-90deg) translateZ(80px)' }}>💜 Tanya </div>
            </motion.div>
            <br/>
            <br/>
            <motion.div
              key="prisms2"
              style={styles.prisms}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotateY: 360, rotateX: 250, rotateZ: 140 }}
              exit={{ scale: 0, rotateZ: 180, filter: 'brightness(3) blur(10px)' }}
              whileHover={{ scale: 1.1 }}
              onClick={startSequence}
              transition={{ rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { type: 'spring' } }}
            >
              <div style={{ ...styles.prismsFace, transform: 'translateZ(80px)' }}>I</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateY(180deg) translateZ(80px)' }}>Love</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateY(90deg) translateZ(80px)' }}>You</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateY(-90deg) translateZ(80px)' }}>Amethyst</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateX(90deg) translateZ(80px)' }}>💜</div>
              <div style={{ ...styles.prismsFace, transform: 'rotateX(-90deg) translateZ(80px)' }}>💜</div>
            </motion.div>
            </div>
          )}

          {stage === 'warping' && (
            <motion.div
              key="warp-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ position: 'absolute', textAlign: 'center' }}
            >
              <h2 style={{ letterSpacing: '12px', color: '#ff49db', textShadow: '0 0 20px #ff49db' }}>
                I LOVE YOU SO MUCH...
                    PLEASE WAIT...
              </h2>
            </motion.div>
          )}

          {stage === 'revealed' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.3, translateZ: -1000, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, translateZ: 150, rotateX: 0 }}
              transition={{ duration: 1.5, type: 'spring', damping: 200 }}
              style={styles.letterContainer}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h2 style={{ color: '#ff49db', marginBottom: '25px', letterSpacing: '3px', fontSize: '1.5rem' }}>
                  My Dearest Amethyst
                </h2>
                <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#fff', fontWeight: '300' }}>
                  You don't have to be perfect love.
                    Just be you lng.
                    I am here not for anything or reason. I unconditionally love you.
                    I am here to understand you,
                  <span style={{ color: '#d946ef', fontWeight: 'bold' }}> Amethyst.</span>, 
                  At sa pinakamahirap mong araw, I am on your side.
                  Take your time. I am not here to own you or to rush you, I like who you are becoming.
                </p>
                
                <motion.div 
                  animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ marginTop: '30px', fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px #ff49db)' }}
                >
                  💜
                </motion.div>

                <button
                  onClick={() => setStage('initial')}
                  style={{
                    marginTop: '30px',
                    background: 'transparent',
                    border: '1px solid #7000ff',
                    color: '#7000ff',
                    padding: '10px 24px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
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
        background: 'radial-gradient(circle at center, transparent 20%, rgba(5, 0, 10, 0.9) 100%)'
      }} />
    </div>
  );
}


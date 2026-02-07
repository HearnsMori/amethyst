"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const petalsImages = [
  "/rose-petal1.png",
  "/rose-petal2.png",
  "/rose-petal3.png",
];

type ImgPhysics = {
  left: number;
  drift: number;
  rotate: number;
  delay: number;
  duration: number;
};

function RoseDayPage() {

  // 👉 adjust only this
  const TOTAL_IMAGES = 5;
  const EXT = "png";
  

  const images = useMemo(() => {
    return Array.from({ length: TOTAL_IMAGES }, (_, i) => `/${i + 1}.${EXT}`);
  }, []);

  const [physics, setPhysics] = useState<ImgPhysics[]>([]);

  // ✅ generate randomness only on client
  useEffect(() => {
    const data: ImgPhysics[] = images.map((_, i) => ({
      left: 0+(Math.random() * 60),
      drift: Math.random() > 0.5 ? 1 : -1,
      rotate: Math.random() * 40 - 20,
      delay: i * 0.6,
      duration: 10 + Math.random() * 6,
    }));

    setPhysics(data);
  }, [images]);

  return (
    <div
      style={{
        color: "black",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#ff9a9e 0%,#fad0c4 40%,#fbc2eb 100%)",
        position: "relative",
        padding: "20px",
        fontFamily: "serif",
        boxSizing: "border-box",
        justifyContent: "left",
        alignItems: "left",
      }}
    >
      {/* 🌸 Album */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0
        }}
      >
        {physics.map((p, i) => (
          <motion.img
            key={i}
            src={images[i]}
            initial={{
              y: "110vh",
              opacity: 0,
              rotate: p.rotate
            }}
            animate={{
              x: p.drift * 250,
              y: ["110vh", "40vh", "70vh", "100vh"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeOut"
            }}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              width: "140px",
              borderRadius: "14px",
              boxShadow: "0 10px 28px rgba(0,0,0,0.25)"
            }}
          />
        ))}
      </div>

      {/* 💌 Letter */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "20px",
          padding: "30px",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "relative",
          zIndex: 2,
          whiteSpace: "pre-line",
          lineHeight: 1.8
        }}
      >
        <h1 style={{ textAlign: "center", color: "#d6336c" }}>
          🌹 Amethyst
        </h1>
Mark my words, I will always love you.
 <br/><br/>I wanna be the one who'll understand and stay with you forever, I will do my best always to make you feel loved even at the smallest thing I could.
 <br/><br/>I want you to feel emotionally safe with me  not pressured to be perfect, not forced to be strong all the time, just free to be your real self. You don't have to hide your heavy days or pretend everything is okay.
 <br/><br/>Loving you means giving you a space where your feelings are welcome, even the complicated ones. You never have to explain why something hurts before you're ready. I want to listen without judgment, to understand you little by little, and to make sure you feel seen, not just when you're happy, but also when you're struggling.
 <br/><br/>You don't have to carry everything alone anymore. Even if I can't fix every problem, I promise to stay beside you while you face them. I am not to control your life or force your growth, I am your calm presence you can lean on, someone who supports you while you grow into the person you're becoming.
 <br/><br/>The love I want to give you is consistent; a reminder that you are valued, appreciated, and deeply loved just for being you.
 <br/><br/>Amethyst mahal na mahal kita more than words can express, more than stars at night, and more than numbers could count. I love you :&gt;.


      </div>
    </div>
  );
}

export default function UltimateValentinePage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showLetter, setShowLetter] = useState(false);

  // Client-only randomized data
  const [petalsData, setPetalsData] = useState<
    { xOffset: number; size: number; rotation: number; speed: number; img: string }[]
  >([]);
  const [backgroundHeartsData, setBackgroundHeartsData] = useState<
    { x: number; yOffset: number; size: number }[]
  >([]);
  const [sparklesData, setSparklesData] = useState<
    { x: number; y: number; size: number }[]
  >([]);

  const [clickHearts, setClickHearts] = useState<
    { x: number; y: number; id: number; rotation: number }[]
  >([]);

  // Initialize client-side data
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    // Petals
    setPetalsData(
      Array.from({ length: 30 }, () => ({
        xOffset: Math.random() * 100 - 50,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * 360,
        speed: Math.random() * 5 + 5,
        img: petalsImages[Math.floor(Math.random() * petalsImages.length)],
      }))
    );

    // Background hearts
    setBackgroundHeartsData(
      Array.from({ length: 15 }, () => ({
        x: Math.random() * window.innerWidth,
        yOffset: Math.random() * 100 - 50,
        size: 20 + Math.random() * 30,
      }))
    );

    // Sparkles
    setSparklesData(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
      }))
    );

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  // Handle click hearts
  const handleClick = (e: React.MouseEvent) => {
    const newHeart = { x: e.clientX, y: e.clientY, id: Date.now(), rotation: Math.random() * 360 };
    setClickHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        color: "white",
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at top, #ffc0cb, #ff1a4d)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
        cursor: "pointer",

        WebkitTapHighlightColor: "transparent", // 🔥 removes blue tap flash
        outline: "none",
        userSelect: "none",
      }}
    >
        {/*Show letter*/
        showLetter && 
           <RoseDayPage/>
        }
    {!showLetter && <>
      {/* Sparkles */}
      {sparklesData.map((s, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Background floating hearts */}
      {backgroundHeartsData.map((heart, idx) => (
        <motion.div
          key={idx}
          animate={{
            y: ["-20%", "120%"],
            x: [`${heart.yOffset}px`, `${heart.yOffset}px`],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: heart.x,
            top: "-10%",
            width: heart.size,
            height: heart.size,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(255,0,80,0.5)"
            style={{ width: "100%", height: "100%" }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Central Rose + Text */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, type: "spring", stiffness: 120 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#ff1a4d", textShadow: "2px 2px 12px rgba(0,0,0,0.4)" }}>
          Happy Rose Day 🌹
        </h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textShadow: "1px 1px 8px rgba(0,0,0,0.3)" }}>
          I always love you, Amethyst
        </p>
        <motion.img
          src="/valentine-rose.png"
          alt="Valentine Rose"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
          transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
          style={{ width: "16rem", maxWidth: "80vw", boxShadow: "0 0 50px rgba(255,0,80,0.7)", borderRadius: "50%" }}
        />
      </motion.div>

      {/* Floating petals */}
      <AnimatePresence>
        {petalsData.map((p, idx) => (
          <motion.img
            key={idx}
            src={p.img}
            style={{
              position: "absolute",
              right: "0vw",
              borderSizing: "border-box",
              width: p.size,
              height: p.size,
              left: `${Math.random()*98}vw`,
              top: mousePos.y - Math.random() * 200 - 100,
              pointerEvents: "none",
            }}
            animate={{
              y: windowSize.height + 50,
              rotate: p.rotation,
              opacity: [0, 1, 0],
            }}
            transition={{ duration: p.speed, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </AnimatePresence>

      {/* Click hearts */}
      {clickHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{ scale: 1.5, opacity: 0, rotate: heart.rotation }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: heart.x - 16,
            top: heart.y - 16,
            width: 32,
            height: 32,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" style={{ width: "100%", height: "100%" }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Pulsing Heart Bottom */}
      <motion.div
      style={{
        margin: 0,
        padding: 0,
        background: "#00000000",
        width: "100vw",
        boxSizing: "border-box",
        position: "absolute",
        bottom: "4rem",
        }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={{ delay: 0.73, duration: 2, ease: "easeInOut" }}
          >
      <motion.div
        onClick={(e)=>{
            setShowLetter(true);
        }}
        animate={{scale: [1, 1.5, 1], rotate: [0, 5, 0] }}
        transition={{ delay: 0.73, repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ position: "relative",}}
      >
       <div> Click Here!</div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" style={{ width: "5rem", height: "5rem" }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
      </motion.div>
      </>
        }
    </div>
  );
}

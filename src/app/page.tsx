"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Infinity as InfinityIcon, CheckCircle2, Heart, Camera, Rocket, Music, Cat, MapPin, Sparkles, Footprints, Star, Map } from 'lucide-react';
type Music = {
    title: string;
    youtubeId: string;
};

const musicList: Music[] = [
    {
        title: "SZA - Snooze",
        youtubeId: "LDY_XyxBu8A",
    },
    {
        title: "SZA - Nobody Gets Me",
        youtubeId: "NNd_ufPG3x4",
    },
    {
        title: "Drake & Yebba - Heartbreak",
        youtubeId: "9rlW2rUzyn0",
    },
];

export default function Amethyst() {
    const [currentMusic, setCurrentMusic] = useState<Music>(musicList[0]);

    const [activeTab, setActiveTab] = useState('home');
    const [catPets, setCatPets] = useState(0);
    const [lastPetIdx, setLastPetIdx] = useState<number | null>(null);


    const [timeSince, setTimeSince] = useState({ d: 0, h: 0, m: 0, s: 0 });

    // Birthdays for age calculation
    const herAge = new Date().getFullYear() - 2007;
    const myAge = new Date().getFullYear() - 2005;
    const futureGoals = [
        { emoji: "🏊‍♀️", text: "To swim together" },
        { emoji: "🍷", text: "To date together" },
        { emoji: "🏄‍♀️", text: "Surfing" },
        { emoji: "🫂", text: "To Hug & Cuddle each other" },
        { emoji: "🏠", text: "To own a house together" },
        { emoji: "💋", text: "To Smooch (especially the nose!)" },
        { emoji: "📚", text: "To grow & learn together" }, // Beneficial for a "Smart" standard
        { emoji: "✈️", text: "To travel to new places" },
        { emoji: "♾️", text: "To have fun & be forever" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            const start = new Date('2025-12-01T00:00:00');
            const diff = new Date().getTime() - start.getTime();

            setTimeSince({
                d: Math.floor(diff / (1000 * 60 * 60 * 24)),
                h: Math.floor((diff / (1000 * 60 * 60)) % 24),
                m: Math.floor((diff / 1000 / 60) % 60),
                s: Math.floor((diff / 1000) % 60)
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const styles = {
        footer: {
            position: 'fixed' as 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(26, 11, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '12px 15px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column' as 'column',
            gap: '8px',
            boxShadow: '0 -10px 25px rgba(0,0,0,0.5)'
        },
        memoryCard: {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '15px',
            marginBottom: '25px',
            border: '1px dashed rgba(168, 85, 247, 0.5)',
        },
        imagePlaceholder: {
            width: '100%',
            height: '200px',
            backgroundColor: '#2D1B4D',
            borderRadius: '15px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '2px solid #4c1d95'
        },
        goalList: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            gap: '12px',
        },
        goalItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '15px',
            background: 'rgba(147, 51, 234, 0.1)',
            padding: '10px 15px',
            borderRadius: '15px',
        },
        topRow: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: '#a855f7',
            textTransform: 'uppercase' as 'uppercase',
            letterSpacing: '1px',
            fontWeight: 'bold'
        },
        clockRow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            color: 'white',
        },
        timeUnit: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            alignItems: 'center',
            minWidth: '35px'
        },
        number: {
            fontSize: '18px',
            fontWeight: '900',
            fontFamily: 'monospace',
            lineHeight: '1'
        },
        label: {
            fontSize: '8px',
            opacity: 0.6,
            marginTop: '2px'
        },
        divider: {
            opacity: 0.3,
            fontSize: '14px',
            marginTop: '-10px'
        },
        container: {
            minHeight: '100vh',
            backgroundColor: '#1a0b2e',
            color: '#f3e8ff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            paddingBottom: '100px',
            position: 'relative' as 'relative',
            overflowX: 'hidden' as 'hidden',
        },
        header: {
            padding: '50px 20px 20px',
            textAlign: 'center' as 'center',
            position: 'relative' as 'relative',
            zIndex: 10,
        },
        nav: {
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            margin: '20px 0',
            position: 'relative' as 'relative',
            zIndex: 20, // High z-index to ensure clicks register
        },
        navBtn: (isActive: boolean) => ({
            padding: '18px',
            borderRadius: '24px',
            border: 'none',
            backgroundColor: isActive ? '#9333ea' : 'rgba(75, 48, 115, 0.6)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: isActive ? '0 0 20px rgba(147, 51, 234, 0.6)' : 'none',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto' as 'auto',
        }),
        main: {
            position: 'relative' as 'relative',
            zIndex: 15,
            maxWidth: '500px',
            margin: '0 auto',
        },
        card: {
            backgroundColor: 'rgba(75, 48, 115, 0.4)',
            borderRadius: '32px',
            padding: '28px',
            margin: '0 20px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        },
        catGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            padding: '0 20px',
        },
        catItem: {
            height: '90px',
            backgroundColor: 'rgba(147, 51, 234, 0.3)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column' as 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            position: 'relative' as 'relative',
            pointerEvents: 'auto' as 'auto',
        },
        step: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '15px',
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
        }
    };

    const handlePet = (i: number) => {
        setCatPets(p => p + 1);
        setLastPetIdx(i);
        setTimeout(() => setLastPetIdx(null), 600);
    };

    return (
        <div style={styles.container}>
        {/* Visual background elements - set to pointer-events none */}
        <div style={{
            position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: '400px', height: '400px', backgroundColor: 'rgba(147, 51, 234, 0.2)',
            filter: 'blur(100px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
        }} />

        <header style={styles.header}>
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
        <Sparkles size={32} style={{ color: '#c084fc', marginBottom: '10px' }} />
        </motion.div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0' }}>My One Amethyst</h1>
        <p style={{ color: '#a855f7', fontWeight: 500 }}>I made this for you ✨</p>
            </header>

        <nav style={styles.nav}>
        {[
            { id: 'home', icon: <Heart size={22}/> },
                { id: 'cats', icon: <Cat size={22}/> },
                { id: 'map', icon: <Music size={22}/> },
                { id: 'future', icon: <Star size={22}/> }
        ].map(tab => (
            <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)}
            style={styles.navBtn(activeTab === tab.id)}
            >
            {tab.icon}
            </button>
        ))}
        </nav>

        <div style={styles.main}>
        <AnimatePresence mode="wait">

        {activeTab === 'home' && (
            <motion.div 
            key="home" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={styles.card}
            >
            <h3 style={{ color: '#d8b4fe', fontSize: '20px' }}>Dearest Amethyst</h3>
            <p style={{ lineHeight: '1.7', fontSize: '16px', color: '#e9d5ff' }}>
            <br/>I wanted to do this because, I wanted to put to the digital world how much genuine I am to you. My feelings for you will always remain the same. I've been thinking about everything I’ve learned about you since we started chatting on December 1st, and it just makes me realize how much I value what we have.
                    I love how loveable you are, whether you're playing the guitar, doing nail extensions, or your passion in Arnis, including the story you told me on your  Volleyball. I love that you’re the responsible oldest sibling, and how much you care for cats and animals.
                        <br/><br/>I’m really looking forward to our future together. I can’t wait for the day we finally get to go surfing or just live in and hug each other without having to worry about the time. Soon, I'll always be here to give you those nose smooches you love and those foot massages after a long day (I've even know your shoe size, 39-40 hehe).
                            Most of all, I just want us to be close with your legs resting on my lap while we just exist together. Please accept this gift. It comes from a place of love and a desire to make you smile. You deserve me, and I hope we can share our favourite  Strawberry Yogurt or some Dan Eric’s ice cream soon and just talk.

                                <br/><br/>I’m here, and I’m not going anywhere.
                                    Amethyst,
                <br/>Hearns Mori
            </p>
            </motion.div>
        )}

        {activeTab === 'cats' && (
            <motion.div key="cats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ paddingBottom: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: '0' }}>Your 12+ Cats</h3>
            <p style={{ fontSize: '14px', color: '#a855f7' }}>Taps: {catPets}</p>
            </div>
            <div style={styles.catGrid}>
            {[...Array(12)].map((_, i) => (
                <motion.div 
                key={i} 
                whileTap={{ scale: 0.8 }} 
                onClick={() => handlePet(i)}
                style={styles.catItem}
                >
                <Cat size={28} color={lastPetIdx === i ? '#f472b6' : '#d8b4fe'} />
                {lastPetIdx === i && (
                    <motion.span 
                    initial={{ opacity: 0, y: 0 }} 
                    animate={{ opacity: 1, y: -20 }} 
                    style={{ position: 'absolute', fontSize: '10px', fontWeight: 'bold' }}
                    >
                    Meow!
                    </motion.span>
                )}
                </motion.div>
            ))}
            </div>
            </motion.div>
        )}

        {activeTab === 'map' && (
            <motion.div key="map" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={styles.card}>

            {/* Header */}
            <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
                fontSize: "2rem",
                marginBottom: "20px",
                textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
            }}
            >
            Amethyst
            </motion.h1>

            {/* Music Player */}
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backdropFilter: "blur(10px)",
            }}
            >
            <h2 style={{ marginBottom: "15px" }}>{currentMusic.title}</h2>
            <div
            style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%", // 16:9 aspect ratio
                marginBottom: "15px",
            }}
            >
            <iframe
            key={currentMusic.youtubeId}
            src={`https://www.youtube.com/embed/${currentMusic.youtubeId}?autoplay=0&modestbranding=1`}
                title={currentMusic.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "15px",
                border: "none",
            }}
            />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {musicList.map((music) => (
                <button
                key={music.youtubeId}
                onClick={() => setCurrentMusic(music)}
                style={{
                    padding: "10px 15px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor:
                        currentMusic.youtubeId === music.youtubeId
                            ? "#fff"
                            : "rgba(255,255,255,0.3)",
                            color:
                                currentMusic.youtubeId === music.youtubeId ? "#7B2FF7" : "#fff",
                            cursor: "pointer",
                            fontWeight: "bold",
                }}
                >
                {music.title.split(" - ")[1]}
                </button>
            ))}
            </div>
            </motion.div>

            {/* Footer */}
            <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
                marginTop: "auto",
                padding: "20px",
                fontSize: "0.8rem",
                textAlign: "center",
            }}
            >
            Made with 💜 for Amethyst
                </motion.footer>
            </motion.div>
        )}

        {activeTab === 'future' && (
            <motion.div key="future" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={styles.card}>
            <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            >
            {/* PAST: MEMORY */}
            <div style={{ marginBottom: '30px' }}>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d8b4fe', margin: '0 0 15px 0' }}>
            <Camera size={20} /> Our Beginning
            </h3>
            <div style={styles.memoryCard}>
            <span style={{ fontSize: '12px', color: '#a855f7', fontWeight: 'bold' }}>DECEMBER 1, 2025</span>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>First conversation on Instagram...</p>
            <div style={styles.imagePlaceholder}>
            {/* Make sure 1.png is in your /public folder */}
            <img 
            src="/firstchatinig.png" 
            alt="First Conversation" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            onError={(e) => { e.currentTarget.style.display = 'none' }} // Fallback if image missing
            />
            <div style={{ position: 'absolute', opacity: 0.2 }}><Star size={40}/></div>
            </div>
            </div>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d8b4fe', margin: '0 0 15px 0' }}>
            <Camera size={20} /> Other Memory (Soon - Would be put in more secured login-based web app)
            </h3>
            <div style={styles.memoryCard}>
            <div style={styles.imagePlaceholder}>
            {/* Make sure 1.png is in your /public folder */}
            <img 
            src="/1.png" 
            alt="First Conversation" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            onError={(e) => { e.currentTarget.style.display = 'none' }} // Fallback if image missing
            />
            <div style={{ position: 'absolute', opacity: 0.2 }}><Star size={40}/></div>
            </div>
            </div>
            </div>

            {/* FUTURE: GOALS */}
            <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d8b4fe', margin: '0 0 15px 0' }}>
            <Rocket size={20} /> Our Future Goals
            </h3>
            <div style={styles.goalList}>
            {futureGoals.map((goal, index) => (
                <motion.div 
                key={index}
                whileHover={{ x: 5, backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                style={styles.goalItem}
                >
                <span style={{ fontSize: '20px' }}>{goal.emoji}</span>
                <span style={{ flex: 1 }}>{goal.text}</span>
                <CheckCircle2 size={14} color="#a855f7" opacity={0.5} />
                </motion.div>
            ))}
            </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <InfinityIcon size={24} color="#f472b6" />
            <p style={{ fontSize: '12px', color: '#a855f7', marginTop: '5px' }}>And everything in between.</p>
            </div>
            </motion.div>
            </motion.div>
        )}

        </AnimatePresence>
        </div>

        <footer style={{
            position: 'fixed', bottom: 0, width: '100%', padding: '25px',
            textAlign: 'center', background: 'linear-gradient(transparent, #1a0b2e 70%)',
            zIndex: 100, pointerEvents: 'none'
        }}>
        <div style={{ fontSize: '12px', color: '#a855f7', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <Footprints size={14} /> Size 39-40 | Always yours
        </div>
        <br/><br/>
        </footer>
        <footer style={styles.footer}>
        {/* Ages & Birthdays Header */}
        <div style={styles.topRow}>
        <span>Me (Aug 19): {myAge} yrs</span>
        <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        >
        <Heart size={12} fill="#a855f7" />
        </motion.div>
        <span>Her (Sept 16): {herAge} yrs</span>
        </div>

        {/* The Live Counter */}
        <div style={styles.clockRow}>
        <div style={styles.timeUnit}>
        <span style={styles.number}>{timeSince.d}</span>
        <span style={styles.label}>DAYS</span>
        </div>
        <span style={styles.divider}>:</span>
        <div style={styles.timeUnit}>
        <span style={styles.number}>{timeSince.h}</span>
        <span style={styles.label}>HRS</span>
        </div>
        <span style={styles.divider}>:</span>
        <div style={styles.timeUnit}>
        <span style={styles.number}>{timeSince.m}</span>
        <span style={styles.label}>MINS</span>
        </div>
        <span style={styles.divider}>:</span>
        <div style={styles.timeUnit}>
        <span style={{...styles.number, color: '#d8b4fe'}}>{timeSince.s}</span>
        <span style={styles.label}>SECS</span>
        </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '9px', opacity: 0.5, marginTop: '2px' }}>
        SINCE DEC 1 • TO MANY MORE YEARS FOR US
            </div>
        </footer>

        </div>
    );
}


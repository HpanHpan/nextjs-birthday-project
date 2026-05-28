'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PHOTOS = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg'];

function useConfetti() {
  useEffect(() => {
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#f7b2c1','#e8c5e8','#f9d4c2','#c5d5e8','#fde8d0'] });
      setTimeout(() => confetti({ particleCount: 80, spread: 60, origin: { y: 0.4 }, colors: ['#f7b2c1','#c5d5e8','#fde8d0'] }), 600);
    });
  }, []);
}

function useBackgroundAudio() {
  const audioRef = useRef(null);
  useEffect(() => {
    // Create the Audio object once and play immediately.
    // The browser will allow this because the user already interacted
    // with the page (tapped the video / skip button) before reaching this scene.
    const audio = new Audio('/audio.mp3');
    audio.loop = false;
    audio.volume = 1;
    audioRef.current = audio;
    audio.play().catch(() => {
      // Autoplay blocked in some environments — silently ignore.
    });
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);
}

export default function SceneFinal() {
  useConfetti();
  useBackgroundAudio();
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center px-4 py-20"
      style={{ background: 'linear-gradient(160deg,#fdf8f3,#fceef6,#f3effe)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
    >
      <motion.div className="flex gap-6 text-3xl mb-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        {'🌸 🎉 💕 🎀 ✨'.split(' ').map((e, i) => (
          <motion.span key={i} animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}>
            {e}
          </motion.span>
        ))}
      </motion.div>

      <motion.h1
        className="font-playfair text-5xl font-bold text-center mb-4"
        style={{ background: 'linear-gradient(135deg,#e0799a,#c77dba)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        Happy Birthday! 🎂
      </motion.h1>

      <motion.p className="font-playfair italic text-lg text-center mb-12"
        style={{ color: '#b07090', maxWidth: 400 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        "May this year be your most beautiful one yet."
      </motion.p>

      {/* Fixed Cake Section */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="flex flex-col items-center mb-14"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80 }}
        >
          {/* Candles */}
          <div className="flex gap-3 mb-0 items-end">
            {['#e07a9a','#c077c0','#e0a070','#a090e0','#70c0e0'].map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flicker" style={{
                  width: 10, height: 18,
                  background: 'radial-gradient(ellipse at 50% 80%,#ffeb99,#ffb347,#ff6b35,transparent)',
                  borderRadius: '50% 50% 40% 40%/60% 60% 40% 40%',
                  filter: 'drop-shadow(0 0 4px rgba(255,140,50,0.8))',
                  marginBottom: -2,
                }} />
                <div style={{
                  width: 14, height: 40,
                  background: `linear-gradient(180deg,${c}dd,${c}88)`,
                  borderRadius: '4px 4px 3px 3px',
                  boxShadow: `0 0 8px ${c}55`,
                }} />
              </div>
            ))}
          </div>

          {/* Cake Tiers */}
          <div style={{
            width: 160, height: 50,
            background: 'linear-gradient(135deg,#f9c4d8,#f5a8cc)',
            borderRadius: '10px 10px 0 0',
            border: '2px solid rgba(240,160,190,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 -4px 20px rgba(240,130,180,0.2)',
          }}>
            <span className="font-playfair italic text-xs text-white drop-shadow">Happy Birthday 🌸</span>
          </div>

          <div style={{
            width: 220, height: 66,
            background: 'linear-gradient(135deg,#f7aac8,#f08ab8)',
            borderRadius: '4px 4px 16px 16px',
            border: '2px solid rgba(240,140,180,0.4)',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 28px rgba(240,100,160,0.2)',
          }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute', width: 8, height: 2, borderRadius: 2,
                background: ['#fff','#fde8f0','#ffeaa8','#c5f0ff'][i % 4],
                left: `${8 + i * 8}%`, top: `${20 + (i % 4) * 18}%`,
                transform: `rotate(${i * 30}deg)`,
              }} />
            ))}
          </div>

          <div style={{
            width: 240, height: 14, marginTop: 4,
            background: 'radial-gradient(ellipse,rgba(240,100,160,0.15) 0%,transparent 70%)',
          }} />
        </motion.div>
      </motion.div>

      {/* Rest of the component (photos + closing) */}
      <motion.p className="font-playfair italic text-xl text-center mb-6"
        style={{ color: '#c077a0' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Our beautiful memories 🌸
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        maxWidth: 480, width: '100%',
        marginBottom: 48,
      }}>
        {PHOTOS.map((src, i) => (
          <motion.div
            key={i}
            style={{
              aspectRatio: '1',
              borderRadius: 16,
              overflow: 'hidden',
              border: '3px solid white',
              boxShadow: '0 4px 20px rgba(180,100,140,0.15)',
              transform: `rotate(${[-2,2,-1,3,-2,1][i]}deg)`,
              position: 'relative',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
          >
            <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <p className="font-playfair italic text-2xl mb-2" style={{ color: '#e07a9a' }}>
          I love you to the moon and back 🌙
        </p>
        <p className="text-sm" style={{ color: '#c4a0b0', letterSpacing: '0.15em' }}>
          — Made with all my love ✦ {new Date().getFullYear()}
        </p>
      </motion.div>
    </motion.div>
  );
}
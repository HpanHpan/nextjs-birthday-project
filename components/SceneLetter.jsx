'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ✏️ CUSTOMIZE YOUR LETTER HERE
const LINES = [
  "My dearest,",
  "",
  "Today is all about you —",
  "your smile, your laugh,",
  "the way you light up every room.",
  "",
  "I wanted to give you something",
  "that felt as special as you are.",
  "",
  "Every moment with you",
  "is one I treasure forever.",
  "",
  "Happy Birthday, my love.",
  "Here's to you — always. 🌸",
  "",
  "— With all my love 💕",
];

export default function SceneLetter({ onNext }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = LINES.map((_, i) =>
      setTimeout(() => setVisible(v => Math.max(v, i + 1)), 400 + i * 260)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const allVisible = visible >= LINES.length;

  useEffect(() => {
    if (allVisible) {
      const timer = setTimeout(() => {
        onNext();
      }, 3500); // 3.5s read time for the final line, then go next automatically
      return () => clearTimeout(timer);
    }
  }, [allVisible, onNext]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(160deg,#fdf8f3,#fceef6,#f3effe)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.p className="text-xs uppercase tracking-widest mb-2"
        style={{ color: '#c4a0b0' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        Your Letter 💌
      </motion.p>

      <motion.h2 className="font-playfair text-3xl font-bold text-center mb-8"
        style={{ color: '#3d2035' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}>
        Written just for you
      </motion.h2>

      {/* Letter card */}
      <motion.div
        style={{
          background: 'rgba(255,252,248,0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: 24,
          border: '1.5px solid rgba(220,170,190,0.3)',
          boxShadow: '0 20px 80px rgba(180,100,140,0.1)',
          padding: 'clamp(24px,5vw,48px)',
          maxWidth: 520, width: '100%',
        }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24, opacity: 0.4 }}>
          <span style={{ fontSize: 16, letterSpacing: 10, color: '#e0a0b8' }}>✦ ✦ ✦</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {LINES.map((line, i) => (
            <AnimatePresence key={i}>
              {i < visible && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  style={{
                    fontFamily: line.startsWith('—') ? "'Playfair Display',serif" : "'Lato',sans-serif",
                    fontStyle: line.startsWith('—') ? 'italic' : 'normal',
                    fontSize: line === '' ? 0 : 15,
                    lineHeight: line === '' ? 1 : 1.8,
                    color: line.startsWith('—') ? '#b07090' : '#5a3045',
                    margin: 0,
                    minHeight: line === '' ? 12 : 'auto',
                  }}
                >
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {allVisible && (
          <motion.div style={{ textAlign: 'center', marginTop: 24, opacity: 0.4 }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.4 }}>
            <span style={{ fontSize: 16, letterSpacing: 10, color: '#e0a0b8' }}>✦ ✦ ✦</span>
          </motion.div>
        )}
      </motion.div>

      {allVisible && (
        <motion.p
          className="mt-10 text-xs text-rose-400/90 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Unlocking your surprise... 🎂
        </motion.p>
      )}
    </motion.div>
  );
}
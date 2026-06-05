'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneEnvelope({ onNext }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setOpened(true);
    }, 1200); // Start opening after 1.2s

    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (opened) {
      const transitionTimer = setTimeout(() => {
        onNext();
      }, 2800); // 2.8s delay to show the open letter animation, then go next
      return () => clearTimeout(transitionTimer);
    }
  }, [opened, onNext]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg,#fdf8f3,#fceef6,#f3effe)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.p className="text-xs uppercase tracking-widest mb-2"
        style={{ color: '#c4a0b0' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        A letter for you 💌
      </motion.p>

      <motion.h2 className="font-playfair text-4xl font-bold text-center mb-10"
        style={{ color: '#3d2035' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring' }}>
        Your Envelope Arrived
      </motion.h2>

      {/* Envelope SVG */}
      <motion.div
        className="select-none"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
          {/* Body */}
          <rect x="10" y="50" width="260" height="140" rx="10" fill="#FDEEF4" stroke="#E8B4C8" strokeWidth="1.5" />

          {/* Flap */}
          <motion.path
            d="M10 60 L140 120 L270 60 L270 52 Q270 50 268 50 L12 50 Q10 50 10 52 Z"
            fill="#FAD5E5"
            stroke="#E8B4C8"
            strokeWidth="1.5"
            animate={opened ? { rotateX: -170 } : { rotateX: 0 }}
            style={{ transformOrigin: 'top center' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Fold lines */}
          <path d="M10 188 L140 118 L270 188" stroke="#E8B4C8" strokeWidth="1" opacity="0.4" fill="none" />

          {/* Wax seal */}
          <motion.g animate={opened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
            <circle cx="140" cy="130" r="22" fill="#C9748A" />
            <path
              d="M140 138 C140 138 130 132 130 126 C130 122 133 120 136.5 120 C138 120 139.5 120.8 140 122 C140.5 120.8 142 120 143.5 120 C147 120 150 122 150 126 C150 132 140 138 140 138Z"
              fill="#FDEEF4" opacity="0.9"
            />
          </motion.g>
        </svg>

        {/* Letter peeking out */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: 30 }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -50, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="bg-white rounded border border-rose-200 shadow-xl flex items-center justify-center"
                style={{ width: 160, height: 100 }}>
                <span className="text-3xl">💌</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="mt-8 text-xs" style={{ color: '#d4b0c0', letterSpacing: '0.15em' }}>
        {opened ? '✨ Opening...' : 'Receiving letter...'}
      </p>
    </motion.div>
  );
}
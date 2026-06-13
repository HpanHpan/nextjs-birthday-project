'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BOOK_SPREADS as SPREADS } from '@/config';

export default function SceneBook({ onNext }) {
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page < SPREADS.length - 1) {
        setFlipping(true);
        setTimeout(() => {
          setPage(p => p + 1);
          setFlipping(false);
        }, 500);
      } else {
        onNext();
      }
    }, 4000); // 4 seconds view time

    return () => clearTimeout(timer);
  }, [page, onNext]);

  const isLast = page === SPREADS.length - 1;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg,#fef9f3,#fdeef5,#f5eefe)' }}
      initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.p className="text-xs uppercase tracking-widest mb-2"
        style={{ color: '#c4a0b0' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        Our Story 📖
      </motion.p>

      <motion.h2 className="font-playfair text-3xl font-bold text-center mb-8"
        style={{ color: '#3d2035' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}>
        The Memory Book
      </motion.h2>

      {/* Book */}
      <motion.div
        animate={flipping ? { rotateY: [0, -15, 0] } : { rotateY: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(180,100,140,0.2)',
          maxWidth: '90vw', width: 640,
        }}
      >
        {/* Left page */}
        <div style={{
          flex: 1, background: '#fffaf8',
          borderRight: '2px solid rgba(220,160,190,0.3)',
          padding: 12, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', minHeight: 300,
        }}>
          <div style={{ width: '100%', aspectRatio: '1', position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
            <Image
              src={SPREADS[page].left}
              alt="" fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="font-playfair italic text-xs mt-3" style={{ color: '#b07090' }}>
            Page {page * 2 + 1}
          </p>
        </div>

        {/* Right page */}
        <div style={{
          flex: 1, background: '#fff8fc',
          padding: 12, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: '100%', aspectRatio: '1', position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
            <Image
              src={SPREADS[page].right}
              alt="" fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="font-playfair italic text-xs mt-3 text-center" style={{ color: '#b07090' }}>
            {SPREADS[page].caption}
          </p>
        </div>
      </motion.div>

      {/* Page indicator */}
      <div className="flex gap-2 mt-6">
        {SPREADS.map((_, i) => (
          <div key={i} style={{
            width: i === page ? 24 : 8, height: 8, borderRadius: 100,
            background: i <= page ? 'linear-gradient(90deg,#e07a9a,#c077c0)' : 'rgba(200,160,180,0.3)',
            transition: 'all 0.4s',
          }} />
        ))}
      </div>

      <div className="mt-8 h-10 flex items-center justify-center">
        <p className="text-xs text-rose-400/90 tracking-wider">
          {page === SPREADS.length - 1 ? "Opening envelope... 💌" : "Turning page... 📖"}
        </p>
      </div>
    </motion.div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CANDLES = ['#e07a9a', '#c077c0', '#e0a070', '#a090e0', '#70c0e0'];

function Flame({ blown }) {
  return (
    <AnimatePresence>
      {!blown && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ exit: { duration: 0.5 } }}
          className="flicker"
          style={{
            width: 12, height: 22,
            background: 'radial-gradient(ellipse at 50% 80%,#ffeb99 0%,#ffb347 40%,#ff6b35 80%,transparent 100%)',
            borderRadius: '50% 50% 40% 40%/60% 60% 40% 40%',
            filter: 'drop-shadow(0 0 5px rgba(255,140,50,0.8))',
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default function SceneCake({ onNext }) {
  const [blown, setBlown] = useState(CANDLES.map(() => false));
  const allOut = blown.every(Boolean);

  useEffect(() => {
    if (allOut) {
      const timer = setTimeout(() => {
        onNext();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [allOut, onNext]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg,#fdf4ef,#fce8f0,#f0ecfc)' }}
      initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.p
        className="text-xs uppercase tracking-widest mb-2"
        style={{ color: '#c4a0b0' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
      >
        Make a Wish 🎂
      </motion.p>

      <motion.h2
        className="font-playfair text-4xl font-bold text-center mb-2"
        style={{ color: '#3d2035' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        Happy Birthday! 🕯️
      </motion.h2>

      <p className="text-sm text-center mb-10" style={{ color: '#b0899c' }}>
        Tap each candle to blow it out
      </p>

      {/* Cake */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 90 }}
      >
        {/* Candles */}
        <div className="flex gap-4 items-end mb-0">
          {CANDLES.map((color, i) => (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer select-none"
              onClick={() => setBlown(p => p.map((v, idx) => idx === i ? true : v))}
            >
              <div style={{ height: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Flame blown={blown[i]} />
              </div>
              <div style={{
                width: 16, height: 48,
                background: blown[i] ? '#d0c0c8' : `linear-gradient(180deg,${color}dd,${color}88)`,
                borderRadius: '4px 4px 3px 3px',
                boxShadow: blown[i] ? 'none' : `0 0 10px ${color}66`,
                transition: 'background 0.5s, box-shadow 0.5s',
              }} />
            </div>
          ))}
        </div>

        {/* Top tier */}
        <div style={{
          width: 180, height: 52,
          background: 'linear-gradient(135deg,#fde8f0,#f5d8ee)',
          borderRadius: '10px 10px 0 0',
          border: '1.5px solid rgba(220,160,190,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="font-playfair italic text-xs" style={{ color: '#c08098' }}>
            Happy Birthday
          </span>
        </div>

        {/* Bottom tier */}
        <div style={{
          width: 240, height: 64,
          background: 'linear-gradient(135deg,#f5e8f8,#ead8f5)',
          borderRadius: '4px 4px 14px 14px',
          border: '1.5px solid rgba(190,150,220,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Sprinkles */}
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 7, height: 2, borderRadius: 2,
              background: ['#f7b2c1','#e8c5e8','#f9d4c2','#c5d5e8'][i % 4],
              left: `${10 + i * 9}%`, top: `${25 + (i % 3) * 22}%`,
              transform: `rotate(${i * 28}deg)`,
            }} />
          ))}
        </div>

        {/* Plate shadow */}
        <div style={{
          width: 260, height: 14, marginTop: 4,
          background: 'radial-gradient(ellipse,rgba(180,100,140,0.12) 0%,transparent 70%)',
        }} />
      </motion.div>

      <AnimatePresence>
        {allOut && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <p className="font-playfair text-xl mb-1" style={{ color: '#c077a0' }}>✨ Wish Made!</p>
            <p className="text-xs text-rose-400/90 tracking-wider">Opening your Memory Book... 📖</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!allOut && (
        <p className="mt-6 text-xs" style={{ color: '#d4b0c0', letterSpacing: '0.12em' }}>
          {blown.filter(Boolean).length}/{CANDLES.length} candles out
        </p>
      )}
    </motion.div>
  );
}

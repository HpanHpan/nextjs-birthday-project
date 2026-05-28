'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SceneQR({ onNext }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8"
      style={{ background: 'linear-gradient(160deg, #fdf2f8, #fce8e8, #f5e6f5)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Title */}
      <motion.p
        className="font-playfair italic text-3xl md:text-4xl text-center mb-4 text-rose-600 px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Something special is waiting...
      </motion.p>

      <motion.p
        className="text-center mb-6 text-gray-500 text-sm max-w-xs md:max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Turn up your volume &amp; watch to the end 🌸
      </motion.p>

      {/* Video */}
      <motion.div
        className="mb-8 rounded-3xl overflow-hidden shadow-2xl w-full max-w-[480px] relative"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <video
          ref={videoRef}
          src="/video.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          className="w-full rounded-3xl"
          style={{ maxHeight: '360px', objectFit: 'cover' }}
          onEnded={onNext}
        />
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 z-10 flex items-center justify-center"
          style={{ width: 40, height: 40 }}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Skip hint */}
      <motion.button
        type="button"
        onClick={onNext}
        className="mt-6 text-xs text-rose-400/70 hover:text-rose-400 tracking-wider transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Skip → open birthday experience
      </motion.button>
    </motion.div>
  );
}
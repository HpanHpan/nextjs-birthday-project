'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SceneQR from '@/components/SceneQR';
import SceneCake from '@/components/SceneCake';
import SceneBook from '@/components/SceneBook';
import SceneEnvelope from '@/components/SceneEnvelope';
import SceneLetter from '@/components/SceneLetter';
import SceneFinal from '@/components/SceneFinal';

export default function Home() {
  const [scene, setScene] = useState(0);
  const next = () => setScene((s) => s + 1);

  return (
    <div className="min-h-screen relative">
      {/* Scene dots */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === scene ? 28 : 8,
              height: 8,
              background: i <= scene
                ? 'linear-gradient(90deg,#e07a9a,#c077c0)'
                : 'rgba(200,160,180,0.3)',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {scene === 0 && <SceneQR key="qr" onNext={next} />}
        {scene === 1 && <SceneCake key="cake" onNext={next} />}
        {scene === 2 && <SceneBook key="book" onNext={next} />}
        {scene === 3 && <SceneEnvelope key="envelope" onNext={next} />}
        {scene === 4 && <SceneLetter key="letter" onNext={next} />}
        {scene === 5 && <SceneFinal key="final" />}
      </AnimatePresence>
    </div>
  );
}
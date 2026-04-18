'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Stagger helper for child animations
const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar 0 → 100 over ~1.8s
    const start = performance.now();
    const duration = 1800;
    let raf: number;

    const tick = (now: number) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // Small hold at 100% before exit
        setTimeout(() => setLoading(false), 260);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#060A18] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none"
        >

          {/* ── Ambient glow blobs ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#003B8E]/18 blur-[140px] pointer-events-none" />
          <div className="absolute top-1/4 right-1/5 w-[300px] h-[300px] rounded-full bg-[#0072CE]/12 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/5 w-[220px] h-[220px] rounded-full bg-[#F5A623]/08 blur-[90px] pointer-events-none" />

          {/* ── Subtle grid lines ── */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* ── Main center content ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Eyebrow label */}
            <motion.div
              {...stagger(0.1)}
              className="flex items-center gap-3 mb-10"
            >
              <span className="w-6 h-px bg-[#F5A623]/60" />
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-white/30">
                Est. 2010 — Colombo, Sri Lanka
              </span>
              <span className="w-6 h-px bg-[#F5A623]/60" />
            </motion.div>

            {/* DOK wordmark — giant serif with clip-in reveal */}
            <div className="overflow-hidden mb-1">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif leading-none tracking-[-0.03em] text-white select-none"
                style={{ fontSize: 'clamp(6rem, 22vw, 18rem)', fontWeight: 700 }}
              >
                DOK
              </motion.div>
            </div>

            {/* Gold accent line under DOK */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="w-full h-[2px] bg-gradient-to-r from-[#F5A623] via-[#F5A623]/60 to-transparent mb-4"
            />

            {/* SOLUTIONS LANKA */}
            <div className="overflow-hidden mb-12">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(0.55rem,2vw,1rem)] tracking-[0.55em] font-semibold text-white/40 uppercase"
              >
                Solutions Lanka
              </motion.p>
            </div>

            {/* Tagline */}
            <motion.p
              {...stagger(0.85)}
              className="text-white/20 text-[11px] tracking-[0.25em] uppercase font-medium text-center"
            >
              Journey Towards A Smart Era
            </motion.p>
          </div>

          {/* ── Progress bar + percentage ── */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[220px] z-10">
            {/* Track */}
            <div className="h-px bg-white/08 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#003B8E] to-[#F5A623]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-medium">
                Loading
              </span>
              <span className="text-[9px] tracking-widest text-white/30 font-mono tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* ── Corner branding ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-12 right-10 text-right z-10"
          >
            <p className="text-[8px] font-semibold tracking-[0.3em] uppercase text-white/15">
              Part of the Abans Group
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-12 left-10 z-10"
          >
            <p className="text-[8px] font-semibold tracking-[0.3em] uppercase text-white/15">
              ISO 9001 · ISO 27001 · ISO 45001
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

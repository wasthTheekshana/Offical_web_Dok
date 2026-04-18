'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { val: '14+', label: 'Years of Excellence' },
  { val: '96',  label: 'Professionals' },
  { val: '3',   label: 'ISO Certified' },
  { val: '60+', label: 'Enterprise Clients' },
];

export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY   = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity= useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#080C1A] overflow-hidden flex flex-col"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '150px' }}
      />

      {/* Radial gradient blobs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#003B8E]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-[#F5A623]/08 rounded-full blur-[100px] pointer-events-none" />

      {/* Top navigation eyebrow */}
      <div className="relative z-10 pt-36 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="w-8 h-px bg-[#F5A623]" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#F5A623]">
            Our Story
          </span>
        </motion.div>
      </div>

      {/* Main content grid */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-16 max-w-[1440px] mx-auto w-full pb-24">
        <motion.div style={{ y: textY, opacity }}>
          {/* Giant headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3.5rem,10vw,10rem)] text-white leading-[0.9] tracking-tight font-bold"
            >
              Built on
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] tracking-tight font-bold"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)', color: 'transparent' }}
            >
              Trust &amp;
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3.5rem,10vw,10rem)] text-[#F5A623] leading-[0.9] tracking-tight font-bold"
            >
              Excellence.
            </motion.h1>
          </div>

          {/* Description column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 max-w-lg"
          >
            <p className="text-white/45 font-light text-lg leading-relaxed">
              14+ years of relentless dedication to secure, intelligent document 
              management — backed by the Abans Group, powered by Sri Lanka's 
              finest professionals.
            </p>
          </motion.div>
        </motion.div>

        {/* Floating stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-16 right-6 lg:right-16 flex flex-col gap-3 sm:flex-row sm:gap-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center px-6 py-4 rounded-2xl bg-white/05 border border-white/10 backdrop-blur-sm min-w-[100px]"
            >
              <span className="font-serif text-3xl font-bold text-white">{s.val}</span>
              <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/40 mt-1 text-center">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase text-white/30">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

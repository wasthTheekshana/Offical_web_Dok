'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TeamMember } from './TeamCard';

const AUTOPLAY_MS = 4000;
const CARD_W = 280;
const CARD_GAP = 16;

export default function TeamCarousel({ members }: { members: TeamMember[] }) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((idx: number) => {
    setActive((idx + members.length) % members.length);
  }, [members.length]);

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => go(active + 1), AUTOPLAY_MS);
  }, [active, go]);

  useEffect(() => {
    if (members.length <= 1) return;
    resetTimer();
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [active, members.length, resetTimer]);

  if (!members.length) return null;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Card track */}
      <div className="flex items-stretch justify-center gap-4 px-4 py-2">
        {members.map((m, i) => {
          const isActive = i === active;
          const offset = i - active;
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          return (
            <motion.div
              key={m.id}
              onClick={() => { if (!isActive) { go(i); } }}
              animate={{
                scale: isActive ? 1 : 0.92,
                opacity: Math.abs(offset) === 2 ? 0.45 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex-shrink-0 rounded-[1.75rem] overflow-hidden cursor-pointer select-none
                ${isActive ? 'w-[280px]' : 'w-[240px]'}`}
              style={{ height: 420 }}
            >
              {isActive ? (
                /* ── Active card: bio on dark background ── */
                <div className="w-full h-full bg-[#1A2550] flex flex-col justify-between p-8 relative overflow-hidden">
                  {/* Subtle grid */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10">
                    {/* Logo mark */}
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                      <span className="font-serif text-white text-sm font-bold">D</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-serif text-2xl text-white leading-tight mb-1">{m.name}</h3>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-6">{m.role}</p>
                        {m.bio && (
                          <p className="text-white/55 text-xs leading-relaxed line-clamp-6">{m.bio}</p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Counter */}
                  <div className="relative z-10 text-white/20 text-[11px] font-mono tracking-widest">
                    {String(active + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}
                  </div>
                </div>
              ) : (
                /* ── Inactive card: photo ── */
                <div className="w-full h-full relative">
                  {m.photo_url ? (
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1a2550] flex items-center justify-center font-serif text-6xl text-white/20">
                      {m.name[0]}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-serif text-lg text-white leading-tight">{m.name}</p>
                    <p className="text-[10px] tracking-widest uppercase text-white/50 mt-0.5">{m.role}</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      {members.length > 1 && (
        <>
          <button
            onClick={() => go(active - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(active + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      {members.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-6">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

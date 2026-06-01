'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TeamMember } from './TeamCard';

const AUTOPLAY_MS = 5000;

export default function TeamCarousel({ members }: { members: TeamMember[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const prev = () => go((index - 1 + members.length) % members.length);
  const next = useCallback(() => go((index + 1) % members.length), [go, index, members.length]);

  useEffect(() => {
    if (members.length <= 1) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, next, members.length]);

  if (!members.length) return null;

  const m = members[index];

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Card */}
      <div className="overflow-hidden rounded-[2rem]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={m.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-brand-beige rounded-[2rem] overflow-hidden"
          >
            {/* Photo */}
            <div className="relative h-72 overflow-hidden">
              {m.photo_url ? (
                <img
                  src={m.photo_url}
                  alt={m.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-brand-beige flex items-center justify-center font-serif text-7xl text-brand-navy/20">
                  {m.name[0]}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" />
              {/* Bio overlay */}
              {m.bio && (
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/80 text-xs leading-relaxed">{m.bio}</p>
                </div>
              )}
            </div>

            {/* Name / role */}
            <div className="p-5 flex items-center justify-between">
              <div>
                <div className="font-serif text-lg text-brand-navy">{m.role}</div>
                <div className="text-[11px] tracking-widest uppercase text-brand-navy/40 mt-0.5">{m.name}</div>
              </div>
              <div className="text-xs font-semibold tracking-widest uppercase text-brand-navy/30">
                {String(index + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {members.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full bg-white border border-brand-navy/10 flex items-center justify-center text-brand-navy shadow-sm hover:bg-brand-navy hover:text-white transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full bg-white border border-brand-navy/10 flex items-center justify-center text-brand-navy shadow-sm hover:bg-brand-navy hover:text-white transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {members.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 h-2 bg-brand-navy'
                  : 'w-2 h-2 bg-brand-navy/20 hover:bg-brand-navy/40'
              }`}
              aria-label={`Go to member ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

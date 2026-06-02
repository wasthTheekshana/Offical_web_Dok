'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TeamMember } from './TeamCard';

const AUTOPLAY_MS = 4000;

export default function TeamCarousel({ members }: { members: TeamMember[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((idx: number) => {
    setActive((idx + members.length) % members.length);
  }, [members.length]);

  useEffect(() => {
    if (members.length <= 1) return;
    timer.current = setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [active, go, members.length]);

  if (!members.length) return null;

  // Show up to 4 cards; deduplicate when team is small
  const visibleOffsets = members.length === 1 ? [0]
    : members.length === 2 ? [-1, 0]
    : members.length === 3 ? [-1, 0, 1]
    : [-1, 0, 1, 2];

  const seen = new Set<number>();
  const visible = visibleOffsets.reduce<{ member: TeamMember; offset: number }[]>((acc, offset) => {
    const idx = (active + offset + members.length) % members.length;
    if (!seen.has(idx)) { seen.add(idx); acc.push({ member: members[idx], offset }); }
    return acc;
  }, []);

  return (
    <div className="relative w-full">
      {/* Card row */}
      <div className="flex items-stretch justify-center gap-4 px-12 py-2">
        {visible.map(({ member: m, offset }) => {
          const isActive = offset === 0;
          const isHovered = hovered === m.id;

          return (
            <motion.div
              key={`${m.id}-${offset}`}
              animate={{
                scale: isActive ? 1 : 0.93,
                opacity: offset === -1 || offset === 2 ? 0.5 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex-shrink-0 rounded-[1.75rem] overflow-hidden ${isActive ? 'w-[270px]' : 'w-[230px]'}`}
              style={{ height: 420 }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Photo — always shown */}
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

              {/* Default name overlay — shown when NOT hovered */}
              <motion.div
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none"
              >
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-serif text-lg text-white leading-tight">{m.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-white/50 mt-0.5">{m.role}</p>
                </div>
              </motion.div>

              {/* Hover overlay — dark blue bio card */}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#1A2550] flex flex-col justify-between p-7 pointer-events-none"
              >
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-5">
                    <span className="font-serif text-white text-sm font-bold">D</span>
                  </div>
                  <h3 className="font-serif text-xl text-white leading-tight mb-1">{m.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">{m.role}</p>
                  {m.bio && (
                    <p className="text-white/55 text-xs leading-relaxed line-clamp-6">{m.bio}</p>
                  )}
                </div>
                <div className="relative z-10 text-white/20 text-[10px] font-mono tracking-widest">
                  {String(active + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Arrows */}
      {members.length > 1 && (
        <>
          <button
            onClick={() => go(active - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(active + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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

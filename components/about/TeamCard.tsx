'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export type TeamMember = { id: string; name: string; role: string; bio: string; photo_url: string };

export default function TeamCard({ member, i }: { member: TeamMember; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  }
  function handleLeave() { x.set(0); y.set(0); setHovered(false); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX: rotX, rotateY: rotY }}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        className="group relative rounded-[2rem] overflow-hidden bg-brand-beige cursor-pointer"
      >
        <div className="relative h-[380px] overflow-hidden">
          <img
            src={member.photo_url}
            alt={member.role}
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-white/75 text-xs leading-relaxed">{member.bio}</p>
          </div>
        </div>
        <div className="p-6 flex items-start justify-between">
          <div>
            <div className="font-serif text-xl text-brand-navy">{member.role}</div>
            <div className="text-[11px] tracking-widest uppercase text-brand-navy/40 mt-1">{member.name}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-navy/08 flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all duration-300 text-brand-navy">
            <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.5 8h11M9.5 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

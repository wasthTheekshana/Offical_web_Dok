'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const team = [
  {
    role: 'Chief Executive Officer',
    name: 'CEO, DOK Solutions Lanka',
    tag: 'Strategy & Vision',
    bio: 'A visionary leader with 20+ years in information management and enterprise technology. Drives DOK Solutions\' strategic growth and digital transformation agenda.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=720&fit=crop&crop=face&auto=format&q=80',
  },
  {
    role: 'Chief Operating Officer',
    name: 'COO, DOK Solutions Lanka',
    tag: 'Operations & Logistics',
    bio: 'Operations expert with deep expertise in warehouse logistics, process optimisation, and quality management. Oversees all three DOK warehouse facilities.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=720&fit=crop&crop=face&auto=format&q=80',
  },
  {
    role: 'Chief Technology Officer',
    name: 'CTO, DOK Solutions Lanka',
    tag: 'Technology & Innovation',
    bio: 'Technology architect behind auraDOCS. Leads product development, cybersecurity strategy, and digital innovation across DOK\'s client portfolio.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=720&fit=crop&crop=face&auto=format&q=80',
  },
  {
    role: 'Head of Business Development',
    name: 'BD Head, DOK Solutions Lanka',
    tag: 'Sales & Partnerships',
    bio: 'Drives client acquisition and strategic partnerships across banking, insurance, and corporate sectors. 15+ years of enterprise sales experience.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=720&fit=crop&crop=face&auto=format&q=80',
  },
];

function TeamCard({ member, i }: { member: typeof team[0]; i: number }) {
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
  function handleLeave() {
    x.set(0); y.set(0); setHovered(false);
  }

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
        {/* Image */}
        <div className="relative h-[380px] overflow-hidden">
          <img
            src={member.img}
            alt={member.role}
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Role tag — visible on hover */}
          <div className="absolute top-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/70 bg-white/12 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              {member.tag}
            </span>
          </div>

          {/* Bio on hover overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-white/75 text-xs leading-relaxed">{member.bio}</p>
          </div>
        </div>

        {/* Name row */}
        <div className="p-6 flex items-start justify-between">
          <div>
            <div className="font-serif text-xl text-brand-navy">{member.role}</div>
            <div className="text-[11px] tracking-widest uppercase text-brand-navy/40 mt-1">{member.tag}</div>
          </div>
          {/* Arrow icon */}
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

export default function AboutTeam() {
  return (
    <section className="bg-white py-28 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-brand-navy/30" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-navy/40">The People Behind DOK</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl lg:text-6xl text-brand-navy leading-tight"
          >
            Our Leadership<br />
            <span className="text-brand-navy/25">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-xs text-brand-navy/50 font-light text-sm leading-relaxed"
          >
            Seasoned professionals who turned a bold vision into Sri Lanka's most trusted document management enterprise.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {team.map((m, i) => <TeamCard key={m.role} member={m} i={i} />)}
        </div>
      </div>
    </section>
  );
}

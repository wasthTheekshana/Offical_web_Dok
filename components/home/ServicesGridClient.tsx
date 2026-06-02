'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

type Service = { id: string; slug: string; title: string; hero_image_url: string; display_order: number };

export default function ServicesGridClient({ services }: { services: Service[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 280, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 280, damping: 25 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  return (
    <section
      className="bg-brand-navy py-24 px-6 lg:px-12 relative overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/40 block mb-4">What We Do</span>
          <div className="flex justify-between items-end">
            <p className="text-white/30 font-sans text-sm max-w-xs">Comprehensive document lifecycle management from capture to archive.</p>
            <Link href="/services" className="text-brand-gold text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
              Book a Discovery Call ↗
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          {services.map((svc, i) => (
            <Link
              key={svc.id}
              href={`/services/${svc.slug}`}
              className="group flex items-baseline gap-4 border-t border-white/10 py-8 hover:border-white/30 transition-colors duration-300"
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <span className="text-white/30 font-sans text-xs tracking-widest w-10 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight transition-colors duration-400 ${activeIdx === i ? 'text-white' : 'text-white/50'}`}>
                {svc.title}
              </span>
              <span className="ml-auto text-white/30 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">↗</span>
            </Link>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>

      <AnimatePresence>
        {activeIdx !== null && services[activeIdx]?.hero_image_url && (
          <motion.div
            key={activeIdx}
            className="fixed pointer-events-none z-50 w-56 h-40 rounded-3xl overflow-hidden shadow-2xl"
            style={{ left: springX, top: springY, translateX: '-50%', translateY: '-120%' }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={services[activeIdx].hero_image_url} alt={services[activeIdx].title} className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

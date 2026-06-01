'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type T = { id: string; name: string; role: string; quote: string; photo_url: string };

const AUTO_INTERVAL = 4000;

export default function TestimonialsClient({
  testimonials,
  label,
  title,
}: {
  testimonials: T[];
  label: string;
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const n = testimonials.length;

  const prev = () => setActive(p => (p - 1 + n) % n);
  const next = () => setActive(p => (p + 1) % n);

  useEffect(() => {
    if (paused || n <= 1) return;
    timer.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer.current);
  }, [active, paused, n]);

  if (!n) return null;

  const t = testimonials[active];

  return (
    <section
      className="bg-brand-cream py-24 px-6 lg:px-12 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto">

        <div className="grid lg:grid-cols-[1fr_auto] items-end mb-12">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40 block mb-4">{label}</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-brand-navy leading-tight">{title}</h2>
          </div>

          <div className="flex items-center gap-3 mt-6 lg:mt-0">
            <div className="flex gap-2 mr-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 h-2 bg-brand-navy' : 'w-2 h-2 bg-brand-navy/20 hover:bg-brand-navy/40'}`} />
              ))}
            </div>
            <button onClick={() => { clearInterval(timer.current); prev(); }}
              className="w-12 h-12 rounded-full border border-brand-navy/20 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-all">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => { clearInterval(timer.current); next(); }}
              className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy hover:opacity-80 transition-opacity">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="hidden md:block w-40 lg:w-52 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img key={`left-${active}`} src={testimonials[(active - 1 + n) % n].photo_url}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="w-full h-full object-cover grayscale opacity-40" />
          </div>
          <div className="hidden lg:block w-40 lg:w-52 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img key={`center-${active}`} src={t.photo_url}
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="w-full h-full object-cover" />
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key={active}
              initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 bg-white rounded-4xl p-8 lg:p-12 flex flex-col justify-between shadow-sm h-[480px]">
              <div>
                {t.photo_url && (
                  <div className="w-10 h-10 rounded-full overflow-hidden mb-6">
                    <img src={t.photo_url} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="font-serif text-xl lg:text-2xl text-brand-navy leading-snug mb-6">
                  <span className="text-brand-gold font-semibold">DOK Solutions</span>{' '}
                  {t.quote}
                </p>
              </div>
              <div>
                <div className="font-semibold text-brand-navy text-base">{t.name}</div>
                <div className="text-[10px] tracking-widest uppercase text-brand-navy/40 mt-1">{t.role}</div>
                <div className="mt-5 h-px bg-brand-navy/08 rounded-full overflow-hidden">
                  <motion.div key={`bar-${active}`} className="h-full bg-brand-gold rounded-full"
                    initial={{ width: '0%' }} animate={{ width: paused ? undefined : '100%' }}
                    transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="hidden lg:block w-40 lg:w-52 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img key={`right-${active}`} src={testimonials[(active + 1) % n].photo_url}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="w-full h-full object-cover grayscale opacity-40" />
          </div>
          <div className="hidden xl:block w-40 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img key={`farright-${active}`} src={testimonials[(active + 2) % n].photo_url}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="w-full h-full object-cover grayscale opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

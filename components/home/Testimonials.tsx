'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  { quote: "DOK Solutions helped me transform our entire document infrastructure into a sanctuary of efficiency.", name: 'Priya S.', role: 'CFO, Leading Insurance Co.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&auto=format&q=80' },
  { quote: "auraDOCS gave us complete visibility. Implementation was seamless beyond expectations.", name: 'Roshan M.', role: 'IT Director, Commercial Bank', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&auto=format&q=80' },
  { quote: "Their BPO team elevated our back-office operations like nothing else. Quality is outstanding.", name: 'Dilani W.', role: 'COO, Corporate Conglomerate', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&auto=format&q=80' },
];

const AUTO_INTERVAL = 4000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const n = testimonials.length;

  const prev = () => setActive(p => (p - 1 + n) % n);
  const next = () => setActive(p => (p + 1) % n);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer.current);
  }, [active, paused]); // re-arm on each change so manual clicks reset the timer

  return (
    <section
      className="bg-brand-cream py-24 px-6 lg:px-12 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Header row — unchanged */}
        <div className="grid lg:grid-cols-[1fr_auto] items-end mb-12">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40 block mb-4">
              Loved and trusted 100+ Clients
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-brand-navy leading-tight">
              What Our Happy<br />Clients Say
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-6 lg:mt-0">
            {/* Progress dots */}
            <div className="flex gap-2 mr-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-5 h-2 bg-brand-navy'
                      : 'w-2 h-2 bg-brand-navy/20 hover:bg-brand-navy/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => { clearInterval(timer.current); prev(); }}
              className="w-12 h-12 rounded-full border border-brand-navy/20 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => { clearInterval(timer.current); next(); }}
              className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy hover:opacity-80 transition-opacity"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Card Row — original portrait + card layout, unchanged */}
        <div className="flex gap-4 items-stretch">

          {/* Left portrait image */}
          <div className="hidden md:block w-40 lg:w-52 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img
              key={`left-${active}`}
              src={testimonials[(active - 1 + n) % n].img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover grayscale opacity-40"
            />
          </div>

          {/* Active portrait */}
          <div className="hidden lg:block w-40 lg:w-52 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img
              key={`center-${active}`}
              src={testimonials[active].img}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Testimonial card — animates on change */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 bg-white rounded-4xl p-8 lg:p-12 flex flex-col justify-between shadow-sm h-[480px]"
            >
              <div>
                {/* Small avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden mb-6">
                  <img src={testimonials[active].img} className="w-full h-full object-cover" />
                </div>
                <p className="font-serif text-xl lg:text-2xl text-brand-navy leading-snug mb-6">
                  <span className="text-brand-gold font-semibold">DOK Solutions</span>{' '}
                  {testimonials[active].quote}
                </p>
                <p className="text-xs lg:text-sm text-brand-navy/50 font-light leading-relaxed">
                  "I've worked with many providers across different sectors, but DOK has that rare combination of scale with a personal service touch. Their record retrieval speed is simply unmatched in Sri Lanka."
                </p>
              </div>
              <div>
                <div className="font-semibold text-brand-navy text-base">{testimonials[active].name}</div>
                <div className="text-[10px] tracking-widest uppercase text-brand-navy/40 mt-1">{testimonials[active].role}</div>

                {/* Auto-play progress bar */}
                <div className="mt-5 h-px bg-brand-navy/08 rounded-full overflow-hidden">
                  <motion.div
                    key={`bar-${active}`}
                    className="h-full bg-brand-gold rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: paused ? undefined : '100%' }}
                    transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right portrait image */}
          <div className="hidden lg:block w-40 lg:w-52 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img
              key={`right-${active}`}
              src={testimonials[(active + 1) % n].img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover grayscale opacity-40"
            />
          </div>

          {/* Far right */}
          <div className="hidden xl:block w-40 flex-shrink-0 rounded-3xl overflow-hidden h-[480px]">
            <motion.img
              key={`farright-${active}`}
              src={testimonials[(active + 2) % n].img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover grayscale opacity-20"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

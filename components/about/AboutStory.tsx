'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="bg-brand-cream py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Section tag */}
        <div className="flex items-center gap-3 mb-20">
          <div className="w-8 h-px bg-brand-navy/30" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-navy/40">
            Who We Are
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — pull quote + body */}
          <div>
            <motion.blockquote
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl lg:text-5xl text-brand-navy leading-[1.18] mb-10 tracking-tight"
            >
              "Changing how organisations handle their most{' '}
              <em className="not-italic text-brand-gold">valuable asset</em>
              {' '}— their information."
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-5"
            >
              <p className="text-brand-navy/60 font-light text-base leading-relaxed">
                DOK Solutions Lanka was born in 2010 as a member of the Abans Group — one of Sri Lanka's most respected conglomerates. We started with 15 professionals and a singular purpose: to revolutionise how businesses manage, secure, and leverage their document assets.
              </p>
              <p className="text-brand-navy/60 font-light text-base leading-relaxed">
                Today, with 96 professionals across three purpose-built climate-controlled warehouses and our proprietary auraDOCS platform, we stand as Sri Lanka's most trusted document management and BPO partner.
              </p>
            </motion.div>

            {/* Divider with metric */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ transformOrigin: 'left' }}
              className="mt-10 pt-10 border-t border-brand-navy/10 flex items-center gap-8"
            >
              {[
                { n: '21%', l: 'Revenue CAGR' },
                { n: '60+', l: 'Enterprise Clients' },
                { n: '2010', l: 'Founded' },
              ].map(item => (
                <div key={item.n}>
                  <div className="font-serif text-3xl font-bold text-brand-navy">{item.n}</div>
                  <div className="text-[10px] uppercase tracking-widest text-brand-navy/40 mt-0.5">{item.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — image with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2.5rem] overflow-hidden h-[520px] lg:h-[640px] bg-brand-beige"
          >
            <motion.img
              style={{ y: imgY }}
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&h=1100&fit=crop&auto=format&q=80"
              alt="DOK Solutions team at work"
              className="w-full h-[120%] object-cover -mt-[10%]"
            />
            {/* Caption chip */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-xs font-semibold text-brand-navy tracking-wide">96 Professionals — Colombo, Sri Lanka</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

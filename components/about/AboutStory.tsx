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
                DOK Solutions Lanka (Pvt) Ltd was established in 2010 as a fully owned subsidiary of AB Securitas (Pvt) Ltd and a member of the Abans Group — one of Sri Lanka's most respected conglomerates. We started with a single document archiving warehouse and a vision to provide secure, reliable, and efficient records management solutions.
              </p>
              <p className="text-brand-navy/60 font-light text-base leading-relaxed">
                Today, with over 200 dedicated employees across three state-of-the-art archiving warehouses, we stand as Sri Lanka's most trusted document management and BPO partner — serving more than 200 elite corporate clients across banking, insurance, healthcare, government, and beyond.
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
                { n: '200+', l: 'Employees' },
                { n: '200+', l: 'Elite Clients' },
                { n: '2010', l: 'Founded' },
              ].map(item => (
                <div key={item.l}>
                  <div className="font-serif text-3xl font-bold text-brand-navy">{item.n}</div>
                  <div className="text-[10px] uppercase tracking-widest text-brand-navy/40 mt-0.5">{item.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — stacked images */}
          <div className="flex flex-col gap-4">
            {/* Main team photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[2.5rem] overflow-hidden h-[380px] lg:h-[460px] bg-brand-beige"
            >
              <motion.img
                style={{ y: imgY }}
                src="/images/team-all.jpg"
                alt="DOK Solutions full team"
                className="w-full h-[120%] object-cover object-top -mt-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-semibold text-brand-navy tracking-wide">200+ Professionals — Colombo, Sri Lanka</span>
              </div>
            </motion.div>

            {/* Building photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[2rem] overflow-hidden h-44 bg-brand-beige"
            >
              <img
                src="/images/building.jpg"
                alt="DOK Solutions headquarters"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/50 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-white text-xs font-semibold tracking-wide">Our Headquarters — Kirula Road, Colombo 05</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

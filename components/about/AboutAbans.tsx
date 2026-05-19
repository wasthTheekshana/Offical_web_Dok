'use client';

import { motion } from 'framer-motion';

export default function AboutAbans() {
  return (
    <section className="bg-[#080C1A] py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Top eyebrow */}
        <div className="flex items-center gap-3 mb-20">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/30">Our Heritage</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left — image mosaic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden h-[400px] lg:h-[520px]">
              <img
                src="/images/building.jpg"
                alt="DOK Solutions Headquarters"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#080C1A]/60 to-transparent" />
            </div>

            {/* Floating stat chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-2 lg:right-8 bg-[#F5A623] text-[#080C1A] rounded-2xl px-6 py-5 shadow-2xl"
            >
              <div className="font-serif text-4xl font-bold leading-none">50+</div>
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase mt-1 opacity-70">Years of Heritage</div>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl lg:text-6xl text-white leading-[1.1] mb-8"
            >
              Proudly Part of<br />
              <span className="text-[#F5A623]">AB Securitas (Pvt) Ltd</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.75 }}
              className="text-white/45 font-light text-base leading-relaxed mb-10"
            >
              DOK Solutions Lanka is a fully owned subsidiary of AB Securitas (Pvt) Ltd —
              one of Sri Lanka's most trusted and established holding companies. This heritage
              provides us with the financial stability, governance standards, and institutional
              credibility that our enterprise clients rely on for long-term partnerships.
            </motion.p>

            {/* Row of mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10"
            >
              {[
                { n: '60+',  l: 'Subsidiaries' },
                { n: '5K+',  l: 'Group Employees' },
                { n: 'AAA',  l: 'Credit Rating' },
              ].map(s => (
                <div key={s.l}>
                  <div className="font-serif text-3xl font-bold text-white">{s.n}</div>
                  <div className="text-[10px] tracking-widest uppercase text-white/30 mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

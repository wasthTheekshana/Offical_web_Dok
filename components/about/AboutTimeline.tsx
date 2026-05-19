'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  { year: '2010', tag: 'Foundation',       desc: 'Founded within AB Securitas with 15 professionals. First Colombo warehouse operational.',        img: '/images/warehouse-forklift.jpg' },
  { year: '2014', tag: 'ISO 9001',         desc: 'ISO 9001 Quality Management Certification achieved. Digitising services launched.',              img: '/images/scanning.jpg' },
  { year: '2016', tag: 'auraDOCS Born',    desc: 'Proprietary DMS platform auraDOCS developed and deployed to first enterprise client.',            img: '/images/scanning-team.png' },
  { year: '2018', tag: 'Dual Certified',   desc: 'ISO 27001 (Information Security) and ISO 45001 (H&S) certifications. Second warehouse.',         img: '/images/warehouse-shelves.png' },
  { year: '2022', tag: 'GPTW® Certified', desc: 'First Great Place to Work® certification. Third climate-controlled warehouse opened.',             img: '/images/warehouse-main.jpg' },
  { year: '2024', tag: 'Triple GPTW®',    desc: '3rd consecutive GPTW® certification. 200+ professionals. 21% revenue CAGR milestone.',            img: '/images/team-all.jpg' },
];

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#0A0E1F] py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/30">Our Milestones</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl lg:text-7xl text-white mb-20 leading-tight"
        >
          14+ Years<br />
          <span className="text-white/30 font-serif">of Growth</span>
        </motion.h2>

        {/* Timeline items — staggered zigzag layout */}
        <div ref={containerRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#003B8E] via-[#0072CE]/50 to-transparent hidden lg:block -translate-x-1/2" />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                  className={`relative flex flex-col lg:flex-row items-center gap-0 py-12 lg:py-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content card */}
                  <div className={`flex-1 lg:py-16 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="group/card bg-white/03 border border-white/08 rounded-3xl p-8 hover:bg-white/06 hover:border-white/15 transition-all duration-500">
                      {/* Year + tag */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-serif text-5xl font-bold text-[#F5A623]/60">{m.year}</span>
                        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/25 bg-white/05 px-3 py-1 rounded-full">
                          {m.tag}
                        </span>
                      </div>
                      <p className="text-white/55 font-light text-base leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Centre dot */}
                  <div className="hidden lg:flex items-center justify-center w-16 h-16 flex-shrink-0 z-10">
                    <div className="w-4 h-4 rounded-full bg-[#003B8E] border-4 border-[#F5A623] shadow-[0_0_20px_rgba(245,166,35,0.4)]" />
                  </div>

                  {/* Image */}
                  <div className="flex-1 lg:py-8">
                    <div className={`relative overflow-hidden rounded-2xl h-48 lg:h-64 ${isEven ? 'lg:ml-0' : 'lg:mr-0'}`}>
                      <img
                        src={m.img}
                        alt={m.tag}
                        className="w-full h-full object-cover opacity-60 hover:opacity-80 hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1F]/70 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

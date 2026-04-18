'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Lock, Shield, Star, Building2, Award } from 'lucide-react';

const certs = [
  { Icon: CheckCircle, name: 'ISO 9001:2015',            year: '2014', col: 'text-[#003B8E]', bg: 'bg-[#003B8E]/06' },
  { Icon: Lock,        name: 'ISO 27001',                 year: '2018', col: 'text-[#0072CE]', bg: 'bg-[#0072CE]/06' },
  { Icon: Shield,      name: 'ISO 45001',                 year: '2018', col: 'text-[#003B8E]', bg: 'bg-[#003B8E]/06' },
  { Icon: Star,        name: 'GPTW® 2022',               year: '2022', col: 'text-[#F5A623]', bg: 'bg-[#F5A623]/08' },
  { Icon: Star,        name: 'GPTW® 2023',               year: '2023', col: 'text-[#F5A623]', bg: 'bg-[#F5A623]/08' },
  { Icon: Star,        name: 'GPTW® 2024',               year: '2024', col: 'text-[#F5A623]', bg: 'bg-[#F5A623]/08' },
  { Icon: Building2,   name: 'BOI Approval',             year: '2015', col: 'text-[#003B8E]', bg: 'bg-[#003B8E]/06' },
  { Icon: Award,       name: 'OHSAH Certified',          year: '2019', col: 'text-[#0072CE]', bg: 'bg-[#0072CE]/06' },
];

export default function AboutCertifications() {
  return (
    <section className="bg-brand-beige py-28 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-brand-navy/30" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-navy/40">Recognition & Standards</span>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-24 lg:items-start mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl lg:text-6xl text-brand-navy leading-tight mb-8 lg:mb-0"
          >
            Awards &amp;<br />Certifications
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-brand-navy/55 font-light text-lg leading-relaxed self-end"
          >
            International recognition that validates our unwavering commitment to quality, 
            security, and workplace excellence — built through over a decade of disciplined practice.
          </motion.p>
        </div>

        {/* Certifications list — editorial row layout */}
        <div className="flex flex-col divide-y divide-brand-navy/08">
          {certs.map((c, i) => {
            const { Icon } = c;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-6 py-6 hover:bg-white/60 px-4 -mx-4 rounded-2xl transition-colors duration-300 cursor-default"
              >
                {/* Year */}
                <div className="w-16 shrink-0 text-brand-navy/30 font-serif text-lg font-semibold">{c.year}</div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={c.col} />
                </div>

                {/* Name */}
                <div className="flex-1 font-serif text-xl text-brand-navy group-hover:text-brand-navy/90 transition-colors">
                  {c.name}
                </div>

                {/* Arrow on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-brand-navy/30">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16" strokeWidth="1.5">
                    <path d="M4 10h12M12 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

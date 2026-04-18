'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Gem } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const values = [
  'Integrity — We do what we say, always',
  'Team Work — Stronger together as one DOK family',
  'Customer First — Every decision starts with the client',
  'Security — Protecting information as if it were our own',
  'Versatility — Adapting to every challenge with agility',
  'Innovation — Continuous improvement in all we do',
];

const cards = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To be the most trusted and innovative document management and BPO partner in Sri Lanka — delivering measurable efficiency gains for every client through secure, intelligent, and scalable solutions.',
    color: '#003B8E',
    bg: 'from-[#003B8E] to-[#0072CE]',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To lead Sri Lanka\'s journey towards a Smart Era by transforming how businesses create, manage, and utilise their information assets — making every organisation more agile, secure, and competitive.',
    color: '#0072CE',
    bg: 'from-[#0072CE] to-[#003B8E]',
  },
];

export default function MVVCards() {
  return (
    <section className="py-28 bg-gradient-to-br from-[#0A0F2E] to-[#001850] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs><pattern id="mvv-d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#mvv-d)"/>
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0072CE]/08 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          label="What Drives Us"
          title="Mission, Vision & Values"
          highlight="Vision"
          dark
          className="mb-16"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mission */}
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl bg-gradient-to-br ${c.bg} p-8 overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/05 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-4">{c.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{c.text}</p>
              </motion.div>
            );
          })}

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-white/12 bg-white/04 backdrop-blur-sm p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#F5A623]/15 border border-[#F5A623]/30 flex items-center justify-center mb-5">
              <Gem size={26} className="text-[#F5A623]" />
            </div>
            <h3 className="text-xl font-black text-white mb-5">Our Values</h3>
            <ul className="flex flex-col gap-3">
              {values.map(v => (
                <li key={v} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] flex-shrink-0 mt-1.5" />
                  {v}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';

const events = [
  { year: '2010', title: 'Foundation', desc: 'Founded as DOK Solutions Lanka within the Abans Group. Starting team of 15 employees. First warehouse operational in Colombo.' },
  { year: '2012', title: 'First Banking Client', desc: 'Acquired first major banking client. Expanded warehouse capacity by 200%. Team grew to 35 professionals.' },
  { year: '2014', title: 'Digitizing Launched', desc: 'Launched Document Digitizing services. Invested in high-speed scanning technology. ISO 9001 certification achieved.' },
  { year: '2016', title: 'auraDOCS Born', desc: 'auraDOCS Document Management System developed and launched. First enterprise DMS deployment for a major insurer.' },
  { year: '2018', title: 'Dual ISO Certified', desc: 'ISO 27001 (Information Security) and ISO 45001 (Health & Safety) certifications. Second warehouse commissioned.' },
  { year: '2020', title: 'BPO Expansion', desc: 'BPO division expanded. 60+ clients across banking, insurance, healthcare, and government sectors.' },
  { year: '2022', title: 'Great Place to Work® #1', desc: 'First Great Place to Work® certification. Third warehouse opened. auraDOCS cloud deployment launched.' },
  { year: '2023', title: 'Great Place to Work® #2', desc: 'Second consecutive Great Place to Work®. auraDOCS 2.0 with cloud capabilities launched to enterprise clients.' },
  { year: '2024', title: 'Triple Certified', desc: 'Third Great Place to Work® certification. 96-person team. 21% revenue CAGR milestone reached.' },
  { year: '2025', title: 'Smart Era Begins', desc: 'auraDOCS 3.0 with AI-powered features. Expanding into new industry verticals and international markets.' },
];

export default function AboutTimeline() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          label="Our Journey"
          title="14+ Years of Growth"
          highlight="Growth"
          subtitle="From a 15-person team in 2010 to Sri Lanka's leading document management company — every milestone shaped by our people and clients."
          className="mb-20"
        />

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#003B8E] via-[#0072CE] to-[#F5A623] -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-8">
            {events.map((e, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={e.year} className={`md:flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1"
                  >
                    <div className="bg-[#F8FAFF] border border-[#E8EDF5] rounded-2xl p-6 hover:shadow-card hover:border-[#003B8E]/15 transition-all group">
                      <div className="text-xs font-black uppercase tracking-widest text-[#F5A623] mb-2">{e.year}</div>
                      <h3 className="text-lg font-bold text-[#1A1A2E] mb-2 group-hover:text-[#003B8E] transition-colors">{e.title}</h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">{e.desc}</p>
                    </div>
                  </motion.div>

                  {/* Centre dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-[#003B8E] to-[#0072CE] items-center justify-center flex-shrink-0 z-10 shadow-glow-blue"
                  >
                    <span className="text-white text-[9px] font-black">{e.year.slice(2)}</span>
                  </motion.div>

                  {/* Spacer on opposite side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Award, Lock, Shield, Star, Building2, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const awards = [
  { icon: CheckCircle, title: 'ISO 9001:2015',             desc: 'Quality Management System certification — ensuring consistent, high-quality service delivery.',         year: '2014', color: '#003B8E' },
  { icon: Lock,        title: 'ISO 27001',                  desc: 'Information Security Management — protecting client data to the highest international standards.',       year: '2018', color: '#0072CE' },
  { icon: Shield,      title: 'ISO 45001',                  desc: 'Occupational Health & Safety Management — keeping our team safe and our operations compliant.',         year: '2018', color: '#003B8E' },
  { icon: Star,        title: 'Great Place to Work® 2022',  desc: 'First certification — recognising DOK Solutions as an outstanding employer of choice in Sri Lanka.',    year: '2022', color: '#F5A623' },
  { icon: Star,        title: 'Great Place to Work® 2023',  desc: 'Second consecutive certification — reinforcing our commitment to exceptional workplace culture.',       year: '2023', color: '#F5A623' },
  { icon: Star,        title: 'Great Place to Work® 2024',  desc: 'Third consecutive certification — demonstrating sustained excellence in people management.',           year: '2024', color: '#F5A623' },
  { icon: Building2,   title: 'BOI Approved Enterprise',    desc: 'Board of Investment approved status — reflecting DOK\'s strategic importance to Sri Lanka\'s economy.', year: '2015', color: '#003B8E' },
  { icon: Award,       title: 'OHSAH Certified',            desc: 'Occupational Health & Safety Assessors certified — global recognition of our safety standards.',       year: '2019', color: '#0072CE' },
];

export default function AwardsGrid() {
  return (
    <section className="py-28 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Recognition & Standards"
          title="Awards & Certifications"
          highlight="Certifications"
          subtitle="International recognition that validates our commitment to quality, security, and workplace excellence."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl border border-[#E8EDF5] p-6 hover:shadow-card hover:border-transparent transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${a.color}12`, border: `1px solid ${a.color}22` }}
                >
                  <Icon size={22} style={{ color: a.color }} />
                </div>
                <div className="text-[10px] font-bold text-[#64748B] mb-2">Since {a.year}</div>
                <h3 className="font-bold text-[#1A1A2E] text-sm mb-2 leading-tight">{a.title}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

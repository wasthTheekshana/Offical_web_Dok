'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Star, Heart, TrendingUp, Users } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const culture = [
  { icon: Star,       title: 'Great Workplace',        desc: '3× certified Great Place to Work®. A culture of respect, growth, and recognition where every voice matters.' },
  { icon: Heart,      title: 'Generous Benefits',      desc: 'Competitive salary, health insurance, performance bonuses, and the full Alguns Group employee benefit ecosystem.' },
  { icon: TrendingUp, title: 'Learning & Development', desc: 'Regular training programs, professional certification support, and clear career advancement pathways.' },
  { icon: Users,      title: 'Meaningful Work',        desc: 'Help Sri Lanka\'s most important institutions manage information securely and intelligently.' },
];

const jobs = [
  { title: 'Document Management Executive', dept: 'Operations', type: 'Full Time', location: 'Colombo', color: '#003B8E', desc: 'Manage day-to-day document handling, client file requests, and warehouse inventory for a portfolio of corporate clients.' },
  { title: 'Software Developer — auraDOCS', dept: 'Technology',  type: 'Full Time', location: 'Colombo', color: '#0072CE', desc: 'Build and improve DOK\'s proprietary auraDOCS platform. Full-stack role with strong focus on document workflow systems.' },
  { title: 'BPO Data Entry Specialist',     dept: 'BPO Ops',     type: 'Full Time', location: 'Colombo', color: '#003B8E', desc: 'High-accuracy data entry and form processing for banking and insurance clients. Comprehensive training provided.' },
  { title: 'Business Development Executive',dept: 'Sales',       type: 'Full Time', location: 'Colombo', color: '#F5A623', desc: 'Identify and develop new corporate clients across banking, insurance, healthcare, and government.' },
];

export default function CareersClient() {
  return (
    <>
      <PageHero
        label="We're Hiring"
        title="Join Our Journey Towards A Smart Era"
        subtitle="Be part of a Great Place to Work® certified team, backed by the Alguns Group. Build a meaningful career at DOK Solutions Lanka."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
      />

      {/* Culture */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Life at DOK" title="Why Work With Us?" highlight="With Us?" className="mb-16" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {culture.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                  className="p-7 rounded-3xl border border-[#E8EDF5] bg-[#F8FAFF] hover:bg-white hover:shadow-card-hover hover:border-transparent transition-shadow transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#003B8E]/08 border border-[#003B8E]/15 flex items-center justify-center mb-5">
                    <Icon size={26} className="text-[#003B8E]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] mb-3">{c.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-28 bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader label="Open Positions" title="Current Openings" highlight="Openings" className="mb-14" />
          <div className="flex flex-col gap-4">
            {jobs.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                className="bg-white rounded-2xl border border-[#E8EDF5] p-7 hover:shadow-card hover:border-transparent transition-shadow transition-colors duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: j.color, background: `${j.color}12` }}>{j.dept}</span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-[#64748B]"><Clock size={10} />{j.type}</span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-[#64748B]"><MapPin size={10} />{j.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A2E] mb-2 group-hover:text-[#003B8E] transition-colors duration-200">{j.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{j.desc}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${j.color}, ${j.color}CC)` }}
                  >
                    Apply Now <ArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

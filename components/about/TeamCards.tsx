'use client';

import { motion } from 'framer-motion';

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
import SectionHeader from '@/components/shared/SectionHeader';

const team = [
  {
    initials: 'CE',
    role: 'Chief Executive Officer',
    name: 'CEO, DOK Solutions Lanka',
    bio: 'A visionary leader with 20+ years in information management and enterprise technology. Drives DOK Solutions\' strategic growth and digital transformation agenda.',
    color: '#003B8E',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face&auto=format&q=80',
  },
  {
    initials: 'CO',
    role: 'Chief Operating Officer',
    name: 'COO, DOK Solutions Lanka',
    bio: 'Operations expert with deep expertise in warehouse logistics, process optimisation, and quality management. Oversees all three DOK warehouse facilities.',
    color: '#0072CE',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face&auto=format&q=80',
  },
  {
    initials: 'CT',
    role: 'Chief Technology Officer',
    name: 'CTO, DOK Solutions Lanka',
    bio: 'Technology architect behind auraDOCS. Leads product development, cybersecurity strategy, and digital innovation across DOK\'s client portfolio.',
    color: '#003B8E',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face&auto=format&q=80',
  },
  {
    initials: 'BD',
    role: 'Head of Business Development',
    name: 'BD Head, DOK Solutions Lanka',
    bio: 'Drives client acquisition and strategic partnerships across banking, insurance, and corporate sectors. 15+ years of enterprise sales experience in Sri Lanka.',
    color: '#0072CE',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face&auto=format&q=80',
  },
];

export default function TeamCards() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="The People Behind DOK"
          title="Our Leadership Team"
          highlight="Leadership Team"
          subtitle="Experienced professionals leading Sri Lanka's document management revolution."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.role}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl overflow-hidden border border-[#E8EDF5] hover:border-transparent hover:shadow-card-hover transition-all duration-500"
            >
              {/* Photo */}
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gradient-to-br from-[#003B8E]/10 to-[#0072CE]/10">
                <img
                  src={m.img}
                  alt={m.role}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent" />

                {/* LinkedIn btn */}
                <motion.a
                  href="#"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <LinkedinIcon />
                </motion.a>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 bg-white">
                <div
                  className="text-[10px] font-black uppercase tracking-widest mb-1"
                  style={{ color: m.color }}
                >
                  {m.role}
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-3 text-sm">{m.name}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{m.bio}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${m.color}, ${m.color}66)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

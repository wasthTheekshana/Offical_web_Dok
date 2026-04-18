'use client';

import { motion } from 'framer-motion';
import { Building2, TrendingUp, Shield } from 'lucide-react';

export default function AbansBanner() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A0F2E] to-[#001850] p-12 lg:p-16"
        >
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F5A623]/06 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0072CE]/08 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-pill mb-5 inline-flex">Our Heritage</span>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5">
                Proudly Part of the<br />
                <span className="text-grad-gold">Abans Group</span>
              </h2>
              <p className="text-white/65 leading-relaxed mb-6">
                DOK Solutions Lanka is part of the Alguns Group — one of Sri Lanka&apos;s largest and most trusted conglomerates with over 50 years of business excellence. This heritage gives DOK Solutions the financial stability, governance standards, and corporate credibility that our clients rely on.
              </p>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <span className="w-12 h-px bg-[#F5A623]" />
                <span className="font-semibold">50+ Years | Alguns Group Heritage</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Building2,   label: 'Conglomerate Strength',    desc: 'Part of one of Sri Lanka\'s largest business groups with diverse industry presence.' },
                { icon: TrendingUp,  label: 'Financial Stability',       desc: 'Backed by a stable, profitable parent company ensuring long-term service continuity.' },
                { icon: Shield,      label: 'Corporate Governance',      desc: 'Highest standards of transparency, ethics, and regulatory compliance.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-4 p-5 rounded-2xl bg-white/05 border border-white/10 hover:bg-white/08 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#F5A623]/15 border border-[#F5A623]/25 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#F5A623]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm mb-1">{label}</div>
                    <div className="text-white/55 text-xs leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';

const reasons = [
  { num: '01', title: 'Bank-Grade Security', desc: 'ISO 27001 certified. 24/7 CCTV, biometrics, fire suppression.' },
  { num: '02', title: 'Triple ISO Certified', desc: 'ISO 9001 · 27001 · 45001 — Quality, Security & Safety.' },
  { num: '03', title: 'Instant Retrieval', desc: 'Same-day physical delivery. Instant digital access via auraDOCS.' },
  { num: '04', title: 'Award-Winning Team', desc: '3× consecutive Great Place to Work® certified.' },
  { num: '05', title: 'Abans Group Heritage', desc: 'Backed by SL\'s most trusted conglomerate. 14 years strong.' },
  { num: '06', title: 'Consistent Growth', desc: '21% revenue CAGR—proof of trust and innovation.' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-cream py-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40 block mb-4">Competitive Edge</span>
          <h2 className="font-serif text-5xl lg:text-6xl text-brand-navy">Why Choose DOK?</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group bg-brand-beige rounded-4xl p-8 hover:bg-brand-navy transition-colors duration-500 cursor-default"
            >
              <div className="font-serif text-5xl text-brand-beige group-hover:text-brand-gold transition-colors duration-500 mb-6">
                {r.num}
              </div>
              <h3 className="font-semibold text-lg text-brand-navy group-hover:text-white transition-colors duration-500 mb-3">{r.title}</h3>
              <p className="text-sm font-light text-brand-navy/60 group-hover:text-white/60 transition-colors duration-500 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

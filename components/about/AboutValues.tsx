'use client';

import { motion, Variants } from 'framer-motion';

const values = [
  { num: '01', title: 'Integrity',                desc: 'We conduct our business with honesty, transparency, and accountability, ensuring the highest ethical standards in every interaction.',                                                         accent: '#003B8E' },
  { num: '02', title: 'Security & Confidentiality', desc: 'We are committed to protecting the information entrusted to us through secure processes, advanced technologies, and strict confidentiality practices.',                                      accent: '#0072CE' },
  { num: '03', title: 'Customer Commitment',      desc: 'We strive to understand and exceed customer expectations by delivering reliable, responsive, and value-driven solutions.',                                                                      accent: '#003B8E' },
  { num: '04', title: 'Operational Excellence',   desc: 'We pursue excellence in every aspect of our operations through continuous improvement, efficiency, accuracy, and quality service delivery.',                                                    accent: '#F5A623' },
  { num: '05', title: 'Innovation',               desc: 'We embrace technology and innovative thinking to develop smarter, future-ready information management and business process solutions.',                                                         accent: '#0072CE' },
  { num: '06', title: 'People Empowerment',       desc: 'We value our employees as our greatest asset and foster a culture of teamwork, respect, learning, and professional growth.',                                                                   accent: '#003B8E' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutValues() {
  return (
    <section className="bg-brand-cream py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-brand-navy/30" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-navy/40">
            What Drives Us
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 items-start mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl lg:text-6xl text-brand-navy mb-8 lg:mb-0 leading-tight"
          >
            Our Core<br />Values
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-brand-navy/55 font-light text-lg leading-relaxed self-end"
          >
            Six principles that have guided every decision, every client relationship,
            and every achievement since 2010 — forming the foundation of
            DOK's culture and our commitment to operational excellence.
          </motion.p>
        </div>

        {/* Values grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-navy/10"
        >
          {values.map((v) => (
            <motion.div
              key={v.num}
              variants={item}
              className="bg-brand-cream p-8 lg:p-10 group hover:bg-brand-beige transition-colors duration-500 relative overflow-hidden cursor-default"
            >
              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: v.accent }}
              />

              <div className="flex items-start justify-between mb-8">
                <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-navy/20">{v.num}</span>
                <div
                  className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: v.accent + '20', border: `1.5px solid ${v.accent}40` }}
                />
              </div>

              <h3 className="font-serif text-2xl text-brand-navy mb-4 group-hover:text-brand-navy transition-colors">
                {v.title}
              </h3>
              <p className="text-brand-navy/50 text-sm leading-relaxed font-light">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

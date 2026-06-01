'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import CTABanner from '@/components/home/CTABanner';

type Service = {
  num: string; title: string; tag: string; tagColor: string;
  desc: string; features: string[]; img: string; href: string;
};

/* ────────── Hero ────────── */
function Hero({ count }: { count: number }) {
  return (
    <section className="bg-[#080C1A] min-h-[55vh] flex flex-col justify-end pt-36 pb-16 px-6 lg:px-16 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#003B8E]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#F5A623]/06 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-white/20" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/30">Capabilities</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(3.5rem,9vw,8rem)] text-white leading-[0.92] tracking-tight"
              >
                Our Services
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-white/40 font-light text-lg mt-6 max-w-xl"
            >
              End-to-end information management — from physical archiving and digitization to data entry, workflow automation, and insurance policy management.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex-shrink-0 bg-white/05 border border-white/10 rounded-2xl px-6 py-4 text-center"
          >
            <div className="font-serif text-5xl text-[#F5A623] font-bold">{count}</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-white/30 mt-1">Core Services</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────── Per-card ────────── */
function ServiceCard({ svc, i }: { svc: Service; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const isEven = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="grid lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden bg-brand-beige group"
    >
      {/* Text */}
      <div className={`p-10 lg:p-16 flex flex-col justify-between ${isEven ? '' : 'lg:order-2'}`}>
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-serif text-[4.5rem] leading-none font-bold text-brand-gold/25">{svc.num}</span>
            <span
              className="text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{ color: svc.tagColor, background: svc.tagColor + '15' }}
            >
              {svc.tag}
            </span>
          </div>

          <h2 className="font-serif text-4xl lg:text-5xl text-brand-navy mb-6 leading-tight">{svc.title}</h2>
          <p className="text-brand-navy/55 font-light leading-relaxed mb-8">{svc.desc}</p>

          <div className="flex flex-wrap gap-2">
            {svc.features.map(f => (
              <span key={f} className="text-[10px] font-semibold tracking-wide text-brand-navy/60 bg-brand-navy/06 border border-brand-navy/10 px-3 py-1.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={svc.href}
          className="mt-10 group/btn inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-brand-navy border border-brand-navy/20 px-7 py-3.5 rounded-full hover:bg-brand-navy hover:text-white hover:border-transparent transition-all duration-300 w-fit"
        >
          Explore Service
          <span className="w-5 h-5 rounded-full bg-brand-navy/10 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors text-[10px]">↗</span>
        </Link>
      </div>

      {/* Image */}
      <div className={`relative h-80 lg:h-auto overflow-hidden ${isEven ? '' : 'lg:order-1'}`}>
        {svc.img && (
          <motion.img
            style={{ y: imgY }}
            src={svc.img}
            alt={svc.title}
            className="absolute inset-0 w-full h-[115%] object-cover -top-[7.5%] group-hover:scale-[1.03] transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/08 transition-colors duration-500" />
      </div>
    </motion.div>
  );
}

/* ────────── Page ────────── */
export default function ServicesClient({ services }: { services: Service[] }) {
  return (
    <div className="overflow-x-hidden">
      <Hero count={services.length} />
      <div className="h-1 bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
      <section className="bg-brand-cream py-20 px-6 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {services.map((svc, i) => <ServiceCard key={svc.href} svc={svc} i={i} />)}
        </div>
      </section>
      <CTABanner />
    </div>
  );
}

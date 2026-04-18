'use client';

import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="bg-brand-navy py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-gold/60 block mb-6">Ready to Evolve?</span>
          <h2 className="font-serif text-5xl lg:text-7xl xl:text-8xl text-white leading-[1.0]">
            Start Your<br/>Smart Move
          </h2>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-6">
          <p className="text-white/40 font-light max-w-sm text-base leading-relaxed">
            Transition your legacy document systems into a streamlined, high-efficiency digital infrastructure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-navy font-bold text-xs tracking-widest uppercase px-8 py-5 rounded-full hover:bg-white transition-colors duration-300"
          >
            Contact Sales ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSnapshot() {
  return (
    <section className="bg-brand-beige py-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >

          {/* Left: Vision statement */}
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/40 block mb-8">About DOK Solutions</span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-brand-navy leading-[1.15] mb-8">
              Sri Lanka's Most Trusted Document Management Partner
            </h2>
            <p className="text-brand-navy/60 font-light leading-relaxed mb-6">
              Founded in 2010 as a member of the iconic Abans Group, DOK Solutions Lanka has grown from a 15-person team to a 96-member powerhouse managing over 100 million records.
            </p>
            <p className="text-brand-navy/60 font-light leading-relaxed mb-12">
              We combine world-class secure warehouse facilities with cutting-edge digital technology — auraDOCS — to drive your organisation's journey toward a smart, efficient era.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-brand-navy border border-brand-navy/20 px-6 py-3 rounded-full hover:bg-brand-navy hover:text-white transition-all duration-300"
            >
              Discover Our Story ↗
            </Link>
          </div>

          {/* Right: Image with pill labels */}
          <div className="relative">
            <div className="rounded-4xl overflow-hidden h-[60vh]">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=700&fit=crop"
                alt="DOK Office"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating stat pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-3xl px-6 py-4 shadow-lg"
            >
              <div className="font-serif text-3xl font-bold text-brand-navy">14+</div>
              <div className="text-[10px] font-semibold tracking-widest uppercase text-brand-gold mt-1">Years of Excellence</div>
            </motion.div>

            {/* Floating badge top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 right-6 bg-brand-gold rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg"
            >
              <span className="font-serif text-xl font-bold text-brand-navy">3×</span>
              <span className="text-[7px] font-bold uppercase tracking-widest text-brand-navy/70 text-center leading-tight">Great Place<br/>to Work</span>
            </motion.div>

          </div>

        </motion.div>

        {/* Values Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {['Integrity', 'Team Work', 'Security', 'Client First'].map(val => (
            <div
              key={val}
              className="bg-white rounded-3xl px-6 py-8 text-center text-xs font-bold tracking-widest uppercase text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 cursor-default"
            >
              {val}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

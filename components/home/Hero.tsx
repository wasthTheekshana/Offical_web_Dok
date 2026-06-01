'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function Hero({ imgs = {} }: { imgs?: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="min-h-screen bg-brand-cream pt-24 pb-12 px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-between items-center mb-12"
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/50">
            Est. 2010 — Colombo, Sri Lanka
          </span>
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-navy/50">
            Scroll to explore ↓
          </span>
        </motion.div>

        {/* Main Two-Column Layout */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-stretch">

          {/* LEFT: Large hero image with rounded corners */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ y }}
            className="relative rounded-4xl overflow-hidden h-[60vh] lg:h-[80vh] bg-brand-beige"
          >
            <img
              src={imgs['hero'] || '/hero-warehouse.png'}
              alt="DOK Solutions Facility"
              className="w-full h-full object-cover"
            />
            {/* Overlay caption like Screenshot 1 */}
            <div className="absolute top-6 left-6 right-6">
              <p className="text-white/90 text-xs font-light max-w-[260px] leading-relaxed">
                We provide comprehensive document management services through the development, design and implementation phases of enterprise projects.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Content stacked */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >

            {/* Two stacked rounded images like screenshot 1 top-right */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="rounded-3xl overflow-hidden bg-brand-beige h-48 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=500&h=400&fit=crop"
                  alt="Document Processing"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden bg-brand-beige h-48 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&h=400&fit=crop"
                  alt="Modern Office"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Vision Statement */}
            <div className="bg-brand-beige rounded-4xl p-8 lg:p-10 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-navy/50 block mb-6">Our Vision</span>
                <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-brand-navy leading-[1.15]">
                  Our vision is to be the highest value provider of intelligent document services and technical expertise.
                </h1>
              </div>

              <div className="flex gap-4 mt-8">
                <Link
                  href="/services"
                  className="text-xs font-bold tracking-widest uppercase bg-brand-navy text-white px-6 py-3 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
                >
                  Our Services
                </Link>
                <Link
                  href="/about"
                  className="text-xs font-bold tracking-widest uppercase border border-brand-navy/30 text-brand-navy px-6 py-3 rounded-full hover:bg-brand-navy hover:text-white transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

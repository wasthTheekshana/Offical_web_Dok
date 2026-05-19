'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { value: '200+', label: 'Professionals' },
  { value: '15+',  label: 'Years in Business' },
  { value: '3',    label: 'Active Warehouses' },
  { value: '200+', label: 'Elite Clients' },
];

export default function Stats() {
  return (
    <section className="bg-[#1A1A2E] py-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Top numbers like the "Sky Hal" card screenshot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="flex flex-col"
            >
              <div className="font-serif text-5xl lg:text-7xl font-light text-white mb-2 tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image cards row — like Screenshot 3 rounded cards */}
        <div className="grid lg:grid-cols-3 gap-4 mt-16">

          {/* Large Left Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1 rounded-4xl overflow-hidden h-[50vh] relative bg-brand-navy"
          >
            <img src="/images/warehouse-forklift.jpg" className="w-full h-full object-cover opacity-80" />
            <div className="absolute bottom-6 left-6">
              <div className="flex gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded-full">ISO 27001</span>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-brand-gold/90 text-brand-navy px-3 py-1.5 rounded-full">Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Center Tall Card - like the Architecture card in screenshot 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-4xl overflow-hidden relative bg-brand-beige group"
          >
            <img src="/images/scanning.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-serif text-2xl text-white mb-2">Document Digitizing</h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                High-speed bulk scanning transforms paper records into searchable digital assets with full audit trails.
              </p>
            </div>
            <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-navy font-bold text-sm">↗</button>
          </motion.div>

          {/* Right tall card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-4xl overflow-hidden h-[50vh] relative group"
          >
            <img src="/images/building.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <div className="text-xs font-semibold tracking-wider uppercase text-white/60">Business Center</div>
              <p className="text-white/50 text-xs max-w-[180px] mt-1 leading-relaxed">Modern facilities designed with client-first security and efficiency in mind.</p>
            </div>
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white font-bold">↗</button>
          </motion.div>

        </div>

        {/* Bottom list rows — click to expand with image */}
        <BottomAccordion />

      </div>
    </section>
  );
}

const serviceRows = [
  {
    name: 'Physical Archive Hub',
    cat: 'Core Service',
    status: 'Active',
    area: '3 Warehouses',
    href: '/services/physical-archiving',
    img: '/images/warehouse-main.jpg',
    desc: 'Three climate-controlled, access-controlled warehouse facilities in Colombo with bar-coded storage and same-day retrieval — handling millions of documents for Sri Lanka\'s top banks and insurers.',
  },
  {
    name: 'auraDOCS Platform',
    cat: 'SaaS Product',
    status: 'Live',
    area: 'Cloud Hosted',
    href: '/services/auradocs',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&h=500&fit=crop&auto=format&q=80',
    desc: 'Our proprietary cloud-native Document Management System — intelligent OCR, automated workflows, predictive search, and enterprise-grade security. Deployed across 60+ organisations.',
  },
  {
    name: 'Data Entry Services',
    cat: 'Managed Service',
    status: 'Active',
    area: 'Colombo 05',
    href: '/services/data-entry',
    img: '/images/data-entry.jpg',
    desc: 'Dedicated data entry teams delivering high-accuracy data capture, form processing, and document data extraction — backed by multi-level QC procedures and ISO 27001-certified security.',
  },
];

function BottomAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-8 flex flex-col gap-1">
      {serviceRows.map((row, i) => {
        const isOpen = open === i;
        return (
          <div key={row.name} className="rounded-2xl overflow-hidden border border-white/0 hover:border-white/10 transition-colors duration-300">
            {/* Row header — always visible */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 px-4 hover:bg-white/05 transition-colors group cursor-pointer"
            >
              <span className="font-serif text-lg text-white text-left">{row.name}</span>
              <div className="flex items-center gap-10">
                <div className="hidden md:flex gap-12 text-[10px] font-semibold tracking-widest uppercase text-white/30">
                  <span>Category: {row.cat}</span>
                  <span>Status: {row.status}</span>
                  <span>Scale: {row.area}</span>
                </div>
                {/* Toggle icon */}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors flex-shrink-0 ${
                    isOpen
                      ? 'bg-brand-gold text-brand-navy'
                      : 'bg-white/10 text-white/50 group-hover:bg-white/20'
                  }`}
                >
                  ↗
                </motion.span>
              </div>
            </button>

            {/* Expandable image + description panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="relative h-64 mx-4 mb-4 rounded-3xl overflow-hidden">
                    {/* Image */}
                    <motion.img
                      src={row.img}
                      alt={row.name}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                    {/* Content overlaid on image */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8"
                    >
                      <div className="flex items-end justify-between">
                        <div className="max-w-lg">
                          <div className="flex gap-2 mb-3">
                            <span className="text-[9px] font-bold tracking-[0.25em] uppercase bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/20">
                              {row.cat}
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.25em] uppercase bg-brand-gold/90 text-brand-navy px-2.5 py-1 rounded-full">
                              {row.status}
                            </span>
                          </div>
                          <h3 className="font-serif text-2xl text-white mb-2">{row.name}</h3>
                          <p className="text-white/65 text-sm leading-relaxed font-light max-w-md">
                            {row.desc}
                          </p>
                        </div>
                        <Link
                          href={row.href}
                          onClick={e => e.stopPropagation()}
                          className="flex-shrink-0 ml-6 px-5 py-2.5 bg-brand-gold text-brand-navy text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-200"
                        >
                          View Service →
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

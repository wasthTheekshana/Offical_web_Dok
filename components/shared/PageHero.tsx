'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Crumb { label: string; href?: string; }

interface PageHeroProps {
  label: string;
  title: string;
  subtitle: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

export default function PageHero({ label, title, subtitle, crumbs, children }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0F2E] via-[#003B8E] to-[#0A1A4E] pt-28 pb-20 hero-clip">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#0072CE]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#F5A623]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <span className="label-pill">{label}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/65 text-lg max-w-2xl mx-auto mb-8"
        >
          {subtitle}
        </motion.p>

        {/* Breadcrumb */}
        {crumbs && (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2 text-sm text-white/45"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={12} className="text-white/25" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-[#F5A623] transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-white/70 font-semibold">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {children}
      </div>
    </section>
  );
}

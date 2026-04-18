'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  highlight?: string;   // word to colour in brand blue
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;       // true = on dark background (white text)
  className?: string;
}

export default function SectionHeader({
  label, title, highlight, subtitle, align = 'center', dark = false, className = ''
}: SectionHeaderProps) {
  const titleParts = highlight
    ? title.split(new RegExp(`(${highlight})`, 'i'))
    : [title];

  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="label-pill">{label}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'text-4xl lg:text-5xl font-black leading-tight mb-4',
          dark ? 'text-white' : 'text-[#1A1A2E]'
        )}
      >
        {titleParts.map((part, i) =>
          part.toLowerCase() === (highlight || '').toLowerCase() ? (
            <span key={i} className="text-grad">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            'text-base lg:text-lg leading-relaxed',
            align === 'center' && 'max-w-2xl mx-auto',
            dark ? 'text-white/65' : 'text-[#64748B]'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

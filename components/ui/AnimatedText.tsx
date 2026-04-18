'use client';

import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  mode?: 'words' | 'chars' | 'lines';
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.045, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AnimatedText({ text, className = '', once = true, delay = 0, mode = 'words' }: AnimatedTextProps) {
  const tokens = mode === 'chars' ? text.split('') : text.split(' ');

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          custom={i + delay / 0.045}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: mode !== 'chars' ? '0.3em' : undefined }}
        >
          {token === ' ' ? '\u00A0' : token}
        </motion.span>
      ))}
    </motion.span>
  );
}

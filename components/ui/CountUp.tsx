'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ end, suffix = '', prefix = '', duration = 2000, className = '' }: CountUpProps) {
  const ref        = useRef<HTMLSpanElement>(null);
  const isInView   = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const fps   = 60;
    const steps = Math.ceil((duration / 1000) * fps);
    let cur = 0;

    const timer = setInterval(() => {
      cur++;
      const progress = cur / steps;
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setVal(Math.floor(eased * end));
      if (cur >= steps) { setVal(end); clearInterval(timer); }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{val}{suffix}
    </span>
  );
}

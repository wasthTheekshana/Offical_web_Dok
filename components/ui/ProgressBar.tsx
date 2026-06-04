'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const done = useRef(false);

  useEffect(() => {
    // New navigation started
    done.current = false;
    setProgress(0);
    setVisible(true);

    // Quickly advance to 85% then stall — completes when page renders
    let p = 0;
    timer.current = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 85) { p = 85; clearInterval(timer.current); }
      setProgress(p);
    }, 120);

    return () => clearInterval(timer.current);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Page finished rendering — race to 100 then hide
    if (done.current) return;
    done.current = true;
    clearInterval(timer.current);
    setProgress(100);
    const t = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(t);
  });

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[200] h-[2px] bg-brand-gold transition-all duration-200 ease-out"
      style={{ width: `${progress}%`, opacity: progress >= 100 ? 0 : 1 }}
    />
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // dot snaps instantly via CSS left/top
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      if (!visible) setVisible(true);
    };

    const animate = () => {
      // Ring follows with smooth 12% ease — subtle, not laggy
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest('a, button, [role="button"], [data-cursor]');
      setHovered(isInteractive);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Sharp inner dot — snaps to mouse position */}
      <div
        ref={dotRef}
        className={`cur-dot ${visible ? 'cur-dot--on' : ''} ${hovered ? 'cur-dot--hover' : ''}`}
      />
      {/* Soft outer ring — follows with ease */}
      <div
        ref={ringRef}
        className={`cur-ring ${visible ? 'cur-ring--on' : ''} ${hovered ? 'cur-ring--hover' : ''}`}
      />
    </>
  );
}

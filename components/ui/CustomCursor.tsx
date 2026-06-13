'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show custom cursor on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;
    let isVisible = false;
    let isHovered = false;

    function setVisible(v: boolean) {
      if (v === isVisible) return;
      isVisible = v;
      dot.classList.toggle('cur-dot--on', v);
      ring.classList.toggle('cur-ring--on', v);
    }

    function setHovered(h: boolean) {
      if (h === isHovered) return;
      isHovered = h;
      dot.classList.toggle('cur-dot--hover', h);
      ring.classList.toggle('cur-ring--hover', h);
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!el.closest('a, button, [role="button"], [data-cursor]'));
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => setVisible(false));
    document.documentElement.addEventListener('mouseenter', () => setVisible(true));
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}

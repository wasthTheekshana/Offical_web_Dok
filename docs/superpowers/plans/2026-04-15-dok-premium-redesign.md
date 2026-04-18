# DOK Premium Hybrid Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild all home-page sections into a Premium Hybrid design — dark dramatic sections alternating with light blue-tinted white sections — with Apple/McKinsey-level motion, real Unsplash images, dual-direction marquees, orbiting hero image stage, and GSAP count-ups.

**Architecture:** Component-by-component rebuild; each component is self-contained and replaces its existing counterpart. New `SmoothScroll` Lenis wrapper added to `layout.tsx`. No new routing — only visual and animation changes.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind CSS v3, Framer Motion v12, GSAP 3 + @gsap/react, Lenis, next/image (Unsplash remote patterns), Lucide React, Google Fonts (Syne via CSS var).

---

## File Map

| Action | File |
|--------|------|
| Modify | `next.config.ts` — add Unsplash remotePatterns |
| Modify | `tailwind.config.ts` — add Syne font var + display font family |
| Modify | `app/globals.css` — Syne font import, new keyframes, CSS utilities |
| Modify | `app/layout.tsx` — add Syne CSS var, wrap body in SmoothScroll |
| Create | `components/ui/SmoothScroll.tsx` — Lenis smooth scroll client wrapper |
| Rebuild | `components/home/Hero.tsx` — split layout, orbit rings, SVG animated lines |
| Rebuild | `components/home/Stats.tsx` — light blue bg, 4 white cards, GSAP count-up |
| Rebuild | `components/home/AboutSnapshot.tsx` — image left + chips, editorial right |
| Rebuild | `components/home/ServicesGrid.tsx` — mixed CSS grid, image zoom cards |
| Rebuild | `components/home/WhyChooseUs.tsx` — featured dark card + 5 stacked cards |
| Rebuild | `components/home/Testimonials.tsx` — featured dark + 3 mini white cards |
| Rebuild | `components/home/ClientLogos.tsx` — dual-direction infinite marquee |
| Rebuild | `components/home/CTABanner.tsx` — dark two-column, glassmorphism form |
| Style update | `components/layout/Footer.tsx` — darken to match palette |
| Modify | `app/page.tsx` — remove CertsBar import |

---

## Task 1: Package Install + Config Files

**Files:**
- Modify: `package.json` (via npm)
- Modify: `next.config.ts`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Install new packages**

```bash
npm install lenis gsap @gsap/react
```

Expected output: 3 packages added, no peer dep warnings.

- [ ] **Step 2: Update next.config.ts to allow Unsplash images**

Replace entire `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  generateBuildId: async () => null,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Update tailwind.config.ts to add Syne font**

In `tailwind.config.ts`, replace the `fontFamily` block and add the `display` entry:

```typescript
fontFamily: {
  sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
  heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
  display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
},
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts tailwind.config.ts package.json package-lock.json
git commit -m "chore: install lenis+gsap, add unsplash image domains, syne font family"
```

---

## Task 2: globals.css — Syne Font + New Keyframes + Utilities

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add Syne Google Font import and new keyframes to globals.css**

Append the following to the END of `app/globals.css` (keep everything existing, add below):

```css
/* ── Syne Display Font ── */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

/* ── Gold shimmer text animation ── */
@keyframes shimmer-gold {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.text-shimmer-gold {
  background: linear-gradient(90deg, #F5A623 0%, #FFD080 40%, #F5A623 60%, #E8910A 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-gold 3s linear infinite;
}

/* ── Orbit spin (used by hero ring SVGs) ── */
@keyframes orbit-cw  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
@keyframes orbit-ccw { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
.orbit-cw  { animation: orbit-cw  40s linear infinite; transform-origin: center; }
.orbit-ccw { animation: orbit-ccw 28s linear infinite; transform-origin: center; }

/* ── Float variants (hero orbit cards) ── */
@keyframes float-a { 0%,100% { transform: translateY(0px); }   50% { transform: translateY(-14px); } }
@keyframes float-b { 0%,100% { transform: translateY(0px); }   50% { transform: translateY(-10px); } }
@keyframes float-c { 0%,100% { transform: translateY(0px); }   50% { transform: translateY(-18px); } }
@keyframes float-d { 0%,100% { transform: translateY(0px); }   50% { transform: translateY(-12px); } }
.float-a { animation: float-a 5.5s ease-in-out infinite; }
.float-b { animation: float-b 7s   ease-in-out infinite; }
.float-c { animation: float-c 6.2s ease-in-out infinite 0.8s; }
.float-d { animation: float-d 8s   ease-in-out infinite 1.4s; }
.float-center { animation: float-a 6s ease-in-out infinite 0.3s; }

/* ── Button sweep-shine ── */
@keyframes btn-shine {
  0%   { left: -100%; }
  60%  { left: 120%; }
  100% { left: 120%; }
}
.btn-shine {
  position: relative;
  overflow: hidden;
}
.btn-shine::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
  animation: btn-shine 2.8s ease-in-out infinite 1s;
}

/* ── Pulsing glow keyframe (icon wrap in WhyChooseUs) ── */
@keyframes pulse-glow {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,114,206,0.4); }
  50%     { box-shadow: 0 0 0 12px rgba(0,114,206,0); }
}
.pulse-glow { animation: pulse-glow 2.5s ease-in-out infinite; }

/* ── Fill bar (metric bar in WhyChooseUs featured card) ── */
@keyframes fill-bar { from { width: 0%; } to { width: 100%; } }

/* ── Marquee right-to-left (existing) and left-to-right ── */
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.marquee-track-right {
  animation: marquee-right 34s linear infinite;
}
.marquee-track-right:hover { animation-play-state: paused; }

/* ── Dot pulse (hero eyebrow pill) ── */
@keyframes dot-pulse {
  0%,100% { transform: scale(1); opacity: 1; }
  50%     { transform: scale(1.5); opacity: 0.6; }
}
.dot-pulse { animation: dot-pulse 1.5s ease-in-out infinite; }

/* ── Section title utility ── */
.s-title {
  font-family: 'Syne', system-ui, sans-serif;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

- [ ] **Step 2: Verify dev server starts without CSS errors**

```bash
npm run dev
```

Visit http://localhost:3000 — confirm page loads, no console CSS errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add Syne font, keyframes (shimmer, orbit, float, shine, marquee-right)"
```

---

## Task 3: SmoothScroll.tsx + layout.tsx Update

**Files:**
- Create: `components/ui/SmoothScroll.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create SmoothScroll.tsx Lenis wrapper**

```typescript
// components/ui/SmoothScroll.tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Update layout.tsx to wrap body children in SmoothScroll and add Syne CSS var**

Replace `app/layout.tsx` with:

```typescript
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';

export const metadata: Metadata = {
  title: { default: 'DOK Solutions Lanka — Journey Towards A Smart Era', template: '%s | DOK Solutions Lanka' },
  description: "Sri Lanka's leading document management & BPO company. Part of the Abans Group. ISO 9001 | ISO 27001 | ISO 45001 certified.",
  keywords: ['document management Sri Lanka', 'BPO Sri Lanka', 'physical archiving', 'auraDOCS', 'Abans Group'],
  openGraph: {
    siteName: 'DOK Solutions Lanka',
    locale: 'en_LK',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFF]">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify smooth scroll works**

Visit http://localhost:3000 and scroll — motion should feel buttery. No console errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/SmoothScroll.tsx app/layout.tsx
git commit -m "feat: add Lenis smooth scroll wrapper to root layout"
```

---

## Task 4: Hero.tsx — Premium Split Layout Rebuild

**Files:**
- Rebuild: `components/home/Hero.tsx`

- [ ] **Step 1: Write the new Hero component**

Replace entire `components/home/Hero.tsx` with:

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Compass, ChevronDown, Database, Archive, Users, BarChart3, Cpu } from 'lucide-react';

const UNSPLASH = 'https://images.unsplash.com';

const orbitCards = [
  { id: 'archive',   photo: `${UNSPLASH}/photo-1553877522-43269d4ea984?w=280&q=80`, label: 'Physical Archiving', pos: 'top',    floatClass: 'float-a' },
  { id: 'bpo',       photo: `${UNSPLASH}/photo-1600880292203-757bb62b4baf?w=280&q=80`, label: 'BPO Team',         pos: 'right',  floatClass: 'float-b' },
  { id: 'aura',      photo: `${UNSPLASH}/photo-1551288049-bebda4e38f71?w=280&q=80`,   label: 'auraDOCS Platform', pos: 'bottom', floatClass: 'float-c' },
  { id: 'digitize',  photo: `${UNSPLASH}/photo-1560472355-536de3962603?w=280&q=80`,   label: 'Digitization',     pos: 'left',   floatClass: 'float-d' },
];

const flowSteps = [
  { icon: Archive,   label: 'Physical Records' },
  { icon: Cpu,       label: 'Digitize' },
  { icon: Database,  label: 'auraDOCS' },
  { icon: Users,     label: 'BPO Process' },
  { icon: BarChart3, label: 'Delivered' },
];

const statPills = [
  { label: '99.8% Accuracy',      color: '#22C55E' },
  { label: 'Same-Day Retrieval',  color: '#0072CE' },
  { label: 'ISO 27001 Certified', color: '#F5A623' },
];

// SVG paths from center (280,240) to each card position
const svgLines = [
  { id: 'top',    d: 'M 280 240 Q 280 160 280 80',          offset: '0%' },
  { id: 'right',  d: 'M 280 240 Q 360 240 440 240',         offset: '25%' },
  { id: 'bottom', d: 'M 280 240 Q 280 320 280 400',         offset: '50%' },
  { id: 'left',   d: 'M 280 240 Q 200 240 120 240',         offset: '75%' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

      {/* ── LEFT PANEL ── */}
      <div className="relative flex flex-col justify-center px-8 lg:px-14 xl:px-20 py-32 lg:py-24 bg-gradient-to-br from-[#050C1F] via-[#071535] to-[#0A1E4A] z-10">

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 30%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse at 60% 50%, black 30%, transparent 80%)',
        }} />

        {/* Right edge accent line */}
        <div className="hidden lg:block absolute right-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-[#0072CE] to-[#F5A623] opacity-60 z-20" />

        {/* Glow blobs */}
        <div className="absolute top-[-100px] left-[-60px] w-[420px] h-[420px] bg-[#0072CE] opacity-[0.07] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-40px] w-[300px] h-[300px] bg-[#F5A623] opacity-[0.05] rounded-full blur-[80px] pointer-events-none" />

        <motion.div style={{ y, opacity }} className="relative z-10 max-w-xl">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.06] border border-white/[0.12] rounded-full text-white/70 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] dot-pulse" />
              Part of Abans Group · Since 2010 · BOI Approved
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-2">
              Sri Lanka&apos;s #1 Document Management
            </p>
            <h1 className="s-title text-4xl sm:text-5xl xl:text-6xl text-white leading-[1.05]">
              Journey Towards
              <br />
              <span className="text-shimmer-gold">A Smart Era</span>
            </h1>
          </motion.div>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="text-white/50 text-base leading-relaxed mb-8 max-w-md"
          >
            Sri Lanka&apos;s leading end-to-end record management &amp; BPO company — transforming physical documents into intelligent digital assets since 2010.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <Link
              href="/contact"
              className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#F5A623] to-[#E8910A] text-white font-bold text-sm rounded-xl shadow-[0_6px_28px_rgba(245,166,35,0.45)] hover:shadow-[0_10px_36px_rgba(245,166,35,0.6)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <FileText size={16} />
              Get A Free Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 font-semibold text-sm rounded-xl hover:border-white/40 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
            >
              <Compass size={16} />
              Explore Services
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-2"
          >
            {['ISO 9001', 'ISO 27001', 'ISO 45001', 'GPTW ×3', 'BOI Approved'].map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.07 }}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.06] border border-white/[0.12] rounded-full text-white/60 text-[10px] font-bold tracking-wider"
              >
                <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
                {b}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-8 flex flex-col items-center gap-1.5 text-white/25"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — Image Stage ── */}
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-[#071535] to-[#0D2250] overflow-hidden">

        {/* Background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,206,0.15)_0%,transparent_70%)]" />

        {/* Stage container — everything positions relative to this */}
        <div className="relative w-[560px] h-[480px]">

          {/* Orbit rings */}
          <div className="orbit-cw absolute inset-0 rounded-full border border-dashed border-white/10" style={{ width: 420, height: 420, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div className="orbit-ccw absolute rounded-full border border-dashed border-[#F5A623]/10" style={{ width: 280, height: 280, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

          {/* SVG animated lines + travelling dots */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 560 480" fill="none">
            {/* Line to top card */}
            <line x1="280" y1="240" x2="280" y2="50" stroke="rgba(0,114,206,0.25)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle r="5" fill="#0072CE">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 280 240 L 280 50" />
            </circle>
            {/* Line to right card */}
            <line x1="280" y1="240" x2="500" y2="240" stroke="rgba(245,166,35,0.22)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle r="5" fill="#F5A623">
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.8s" path="M 280 240 L 500 240" />
            </circle>
            {/* Line to bottom card */}
            <line x1="280" y1="240" x2="280" y2="430" stroke="rgba(0,114,206,0.25)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle r="5" fill="#0072CE">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.5s" path="M 280 240 L 280 430" />
            </circle>
            {/* Line to left card */}
            <line x1="280" y1="240" x2="60" y2="240" stroke="rgba(245,166,35,0.22)" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle r="5" fill="#F5A623">
              <animateMotion dur="3.2s" repeatCount="indefinite" begin="2.2s" path="M 280 240 L 60 240" />
            </circle>
            {/* Centre pulsing node */}
            <circle cx="280" cy="240" r="10" fill="rgba(0,114,206,0.3)" stroke="#0072CE" strokeWidth="1.5">
              <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Centre image */}
          <div className="float-center absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 150, borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 10 }}>
            <Image
              src={`${UNSPLASH}/photo-1568992687947-868a62a9f521?w=400&q=80`}
              alt="DOK office"
              fill
              sizes="200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-bold bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg text-center">DOK HQ · Colombo</span>
          </div>

          {/* Top card */}
          <OrbitCard card={orbitCards[0]} style={{ left: '50%', top: 10, transform: 'translateX(-50%)' }} />
          {/* Right card */}
          <OrbitCard card={orbitCards[1]} style={{ right: 0, top: '50%', transform: 'translateY(-50%)' }} />
          {/* Bottom card */}
          <OrbitCard card={orbitCards[2]} style={{ left: '50%', bottom: 10, transform: 'translateX(-50%)' }} />
          {/* Left card */}
          <OrbitCard card={orbitCards[3]} style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }} />

          {/* Floating stat pills */}
          {statPills.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.15 }}
              className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold text-white backdrop-blur-sm border border-white/10"
              style={{
                background: 'rgba(5,12,31,0.75)',
                top: i === 0 ? '22%' : i === 1 ? '50%' : '78%',
                right: i === 1 ? '-2%' : '4%',
                zIndex: 20,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
              {p.label}
            </motion.div>
          ))}
        </div>

        {/* Bottom flow strip */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[#050C1F] to-transparent flex items-center justify-center gap-0">
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-0">
                <div className="flex flex-col items-center gap-1 px-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <Icon size={14} className="text-[#0072CE]" />
                  </div>
                  <span className="text-[9px] text-white/40 font-semibold tracking-wide whitespace-nowrap">{step.label}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <path d="M 0 5 L 14 5 M 10 2 L 14 5 L 10 8" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OrbitCard({ card, style }: { card: typeof orbitCards[0]; style: React.CSSProperties }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className={`absolute ${card.floatClass} z-10`}
      style={{ ...style, width: 100, height: 76, borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Image src={card.photo} alt={card.label} fill sizes="100px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-[8px] font-bold text-center leading-tight">{card.label}</span>
    </motion.div>
  );
}
```

- [ ] **Step 2: Visit http://localhost:3000 — verify hero renders**

Check: left/right split visible, orbit rings animate, SVG dots travel along lines, centre image floats, orbit cards float at 4 positions, flow strip shows at bottom of right panel on desktop.

- [ ] **Step 3: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: rebuild Hero — premium split layout with orbiting image stage and SVG animated lines"
```

---

## Task 5: Stats.tsx — Light Blue Cards + GSAP Count-up

**Files:**
- Rebuild: `components/home/Stats.tsx`

- [ ] **Step 1: Write new Stats component**

Replace entire `components/home/Stats.tsx`:

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const stats = [
  { end: 500,  suffix: '+',  label: 'Enterprise Clients',         sub: 'Across all industries',     icon: '🏢', bar: 'from-[#0072CE] to-[#003B8E]' },
  { end: 50,   suffix: 'M+', label: 'Documents Managed',          sub: 'Physical & digital records', icon: '📄', bar: 'from-[#38BDF8] to-[#0072CE]' },
  { end: 99.8, suffix: '%',  label: 'Accuracy Rate',              sub: 'Guaranteed SLA',             icon: '✅', bar: 'from-[#F5A623] to-[#E8910A]' },
  { end: 14,   suffix: '+',  label: 'Years of Excellence',        sub: 'Since 2010',                 icon: '🏆', bar: 'from-[#22C55E] to-[#16A34A]' },
];

function CountCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.end,
      duration: 2,
      delay: index * 0.15,
      ease: 'power2.out',
      onUpdate() {
        if (!numRef.current) return;
        const v = obj.val;
        numRef.current.textContent = Number.isInteger(stat.end)
          ? Math.round(v).toString()
          : v.toFixed(1);
      },
    });
  }, [inView, stat.end, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,59,142,0.10)] hover:shadow-[0_24px_64px_rgba(0,59,142,0.18)] transition-all duration-300 overflow-hidden"
    >
      {/* Coloured top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${stat.bar}`} />

      <div className="text-4xl mb-3">{stat.icon}</div>
      <div className="text-5xl font-black text-[#071535] mb-1 leading-none">
        <span ref={numRef}>0</span>
        <span>{stat.suffix}</span>
      </div>
      <div className="text-sm font-bold text-[#003B8E] mb-1">{stat.label}</div>
      <div className="text-xs text-gray-400 font-medium">{stat.sub}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #EBF4FF 0%, #F5F9FF 50%, #EBF4FF 100%)' }}>

      {/* Top-right radial blue glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#0072CE] opacity-[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-pill mb-3 block w-fit">Our Impact in Numbers</span>
            <h2 className="s-title text-4xl lg:text-5xl text-[#071535]">
              14 Years of <span className="text-grad">Measurable Results</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-gray-500 text-sm max-w-xs md:text-right leading-relaxed"
          >
            Numbers that reflect our commitment to excellence, trust, and consistent delivery.
          </motion.p>
        </div>

        {/* 4 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <CountCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Stats section — numbers should count up from 0 when the section enters the viewport. Light blue gradient bg, 4 white cards with colored top bars visible.

- [ ] **Step 3: Commit**

```bash
git add components/home/Stats.tsx
git commit -m "feat: rebuild Stats — light blue bg, white cards, GSAP count-up animation"
```

---

## Task 6: AboutSnapshot.tsx — Image Left + Editorial Right

**Files:**
- Rebuild: `components/home/AboutSnapshot.tsx`

- [ ] **Step 1: Write new AboutSnapshot component**

Replace entire `components/home/AboutSnapshot.tsx`:

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, TrendingUp, ArrowRight } from 'lucide-react';

const UNSPLASH = 'https://images.unsplash.com';

const facts = [
  { icon: ShieldCheck, color: '#0072CE', title: 'Triple ISO Certified', desc: 'ISO 9001 (Quality), ISO 27001 (Information Security), and ISO 45001 (Occupational Health) — the gold standard in compliance.' },
  { icon: Award,       color: '#F5A623', title: '3× Great Place to Work®', desc: 'Recognised consecutively in 2022, 2023 and 2024. Our people-first culture drives exceptional client outcomes.' },
  { icon: TrendingUp,  color: '#22C55E', title: '21% Revenue CAGR', desc: 'Consistent, compounding growth since 2010. Part of the Abans Group — Sri Lanka's most trusted conglomerate.' },
];

export default function AboutSnapshot() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* ── LEFT — Image with chips ── */}
        <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
          <Image
            src={`${UNSPLASH}/photo-1497366216548-37526070297c?w=800&q=80`}
            alt="DOK modern office"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Fade to white on right */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-white hidden lg:block" />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071535]/40 to-transparent" />

          {/* Chip: 14+ Years */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute top-6 right-8 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,59,142,0.18)]"
          >
            <div className="text-lg font-black text-[#003B8E]">14+</div>
            <div className="text-[10px] font-semibold text-gray-500">Years of Excellence</div>
          </motion.div>

          {/* Chip: 3× GPTW */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="absolute bottom-8 left-6 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,59,142,0.18)]"
          >
            <div className="text-lg font-black text-[#F5A623]">3×</div>
            <div className="text-[10px] font-semibold text-gray-500">Great Place to Work®</div>
          </motion.div>

          {/* Chip: ISO badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-8 right-8 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,59,142,0.3)]"
            style={{ background: 'linear-gradient(135deg, #003B8E, #0072CE)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldCheck size={12} className="text-[#F5A623]" />
              <span className="text-white text-[9px] font-bold uppercase tracking-wider">Triple ISO Certified</span>
            </div>
            <div className="text-white/60 text-[9px]">9001 · 27001 · 45001</div>
          </motion.div>
        </div>

        {/* ── RIGHT — Editorial text ── */}
        <div className="flex flex-col justify-center px-8 lg:px-14 xl:px-16 py-16 lg:py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-pill mb-4 block w-fit">About DOK Solutions Lanka</span>
            <h2 className="s-title text-3xl lg:text-4xl text-[#071535] mb-4 leading-tight">
              Sri Lanka&apos;s Most Trusted <em className="not-italic text-[#0072CE]">Document Management</em> Partner
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              From a single warehouse in 2010 to Sri Lanka's leading record management and BPO powerhouse — we've built our reputation on zero security incidents, same-day retrieval, and a team that genuinely cares about your business continuity.
            </p>
          </motion.div>

          {/* Fact rows */}
          <div className="flex flex-col gap-4 mb-8">
            {facts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.55 }}
                  whileHover={{ x: 4, borderColor: f.color }}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,59,142,0.08)] transition-all duration-200 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}15` }}>
                    <Icon size={18} style={{ color: f.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-[#071535] text-sm mb-0.5">{f.title}</div>
                    <div className="text-gray-400 text-xs leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #003B8E, #0072CE)' }}
            >
              Our Full Story
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Check: image fills left half, 3 floating chips animate in on scroll, right side has label pill, heading, 3 fact rows that slide-right on hover, CTA button.

- [ ] **Step 3: Commit**

```bash
git add components/home/AboutSnapshot.tsx
git commit -m "feat: rebuild AboutSnapshot — image left with floating chips, editorial right"
```

---

## Task 7: ServicesGrid.tsx — Image Cards + Mixed Grid

**Files:**
- Rebuild: `components/home/ServicesGrid.tsx`

- [ ] **Step 1: Write new ServicesGrid component**

Replace entire `components/home/ServicesGrid.tsx`:

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Archive, ScanLine, Database, Users, FileText, Phone } from 'lucide-react';

const UNSPLASH = 'https://images.unsplash.com';

const services = [
  {
    id: 'archiving',
    name: 'Physical Archiving',
    photo: `${UNSPLASH}/photo-1553877522-43269d4ea984?w=600&q=80`,
    icon: Archive,
    desc: 'State-of-the-art climate-controlled facilities with real-time barcode tracking and same-day retrieval guarantee.',
    chips: ['Same-Day Retrieval', 'Barcode Tracked', 'Climate Control'],
    href: '/services/archiving',
    gold: false,
  },
  {
    id: 'digitizing',
    name: 'Document Digitizing',
    photo: `${UNSPLASH}/photo-1560472355-536de3962603?w=600&q=80`,
    icon: ScanLine,
    desc: 'High-speed scanning, OCR, and intelligent indexing — transforming paper records into searchable digital assets.',
    chips: ['OCR Processing', 'Quality Assured', '99.8% Accuracy'],
    href: '/services/digitizing',
    gold: false,
  },
  {
    id: 'aura',
    name: 'auraDOCS Platform',
    photo: `${UNSPLASH}/photo-1551288049-bebda4e38f71?w=600&q=80`,
    icon: Database,
    desc: 'Our proprietary cloud DMS with role-based access, full audit trails, and enterprise-grade security built in.',
    chips: ['Cloud-Based', 'Role-Based Access', 'Audit Trail'],
    href: '/services/auradocs',
    gold: true,
  },
  {
    id: 'bpo',
    name: 'BPO Services',
    photo: `${UNSPLASH}/photo-1600880292203-757bb62b4baf?w=900&q=80`,
    icon: Users,
    desc: 'End-to-end business process outsourcing — data entry, claims processing, back-office operations — delivered with ISO-certified accuracy and SLA-backed guarantees.',
    chips: ['Data Entry', 'Claims Processing', 'Back-Office', 'SLA Guaranteed'],
    href: '/services/bpo',
    gold: false,
    wide: true,
  },
  {
    id: 'insurance',
    name: 'Insurance Document Services',
    photo: `${UNSPLASH}/photo-1450101499163-c8848c66ca85?w=600&q=80`,
    icon: FileText,
    desc: 'Specialised document workflows for insurance companies — policy archiving, claims document management, and regulatory compliance.',
    chips: ['Policy Archiving', 'Compliance Ready', 'Regulatory'],
    href: '/services/insurance',
    gold: false,
  },
];

export default function ServicesGrid() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F0F7FF 0%, #E8F4FF 50%, #F0F7FF 100%)' }}>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-pill mb-3 block w-fit">What We Do</span>
            <h2 className="s-title text-4xl lg:text-5xl text-[#071535]">
              End-to-End <span className="text-grad">Document Services</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link href="/services" className="inline-flex items-center gap-2 text-[#0072CE] font-bold text-sm hover:gap-3 transition-all">
              View All Services <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Top 3 equal cards */}
          {services.slice(0, 3).map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}

          {/* Wide BPO card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10 }}
            className="md:col-span-3 bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,59,142,0.10)] hover:shadow-[0_24px_64px_rgba(0,59,142,0.18)] transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[240px]">
              {/* Image */}
              <div className="relative min-h-[200px] overflow-hidden group">
                <Image src={services[3].photo} alt={services[3].name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-1.5">
                  <span className="text-white text-xs font-bold">{services[3].name}</span>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center p-8">
                <div className="w-10 h-10 rounded-xl bg-[#0072CE]/10 flex items-center justify-center mb-4">
                  <Users size={18} className="text-[#0072CE]" />
                </div>
                <h3 className="font-bold text-[#071535] text-xl mb-2">{services[3].name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{services[3].desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {services[3].chips.map(c => (
                    <span key={c} className="px-2.5 py-1 bg-[#EBF4FF] text-[#0072CE] text-[10px] font-bold rounded-full">{c}</span>
                  ))}
                </div>
                <Link href={services[3].href} className="inline-flex items-center gap-1.5 text-[#0072CE] text-sm font-bold hover:gap-2.5 transition-all">
                  Explore Service <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Insurance card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.65 }}
            className="md:col-span-1"
          >
            <ServiceCard service={services[4]} index={4} />
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.65 }}
            className="md:col-span-2 rounded-3xl p-8 flex flex-col justify-between min-h-[240px]"
            style={{ background: 'linear-gradient(135deg, #003B8E 0%, #0072CE 100%)' }}
          >
            <div>
              <h3 className="s-title text-2xl text-white mb-2">Not Sure Which Service?</h3>
              <p className="text-white/65 text-sm max-w-sm">Book a free 30-minute consultation and our experts will map the right solution to your exact needs.</p>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 self-start px-6 py-3 bg-white text-[#003B8E] font-bold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              <Phone size={15} />
              Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,59,142,0.10)] hover:shadow-[0_24px_64px_rgba(0,59,142,0.18)] transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image src={service.photo} alt={service.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover group-hover:scale-[1.08] transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Badge top-left glassmorphism */}
        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-2.5 py-1">
          <span className="text-white text-[10px] font-bold">{service.name}</span>
        </div>
        {/* Icon badge bottom-left */}
        <div className={`absolute bottom-3 left-3 w-8 h-8 rounded-xl flex items-center justify-center ${service.gold ? 'bg-[#F5A623]' : 'bg-[#0072CE]'}`}>
          <Icon size={15} className="text-white" />
        </div>
        {/* Number bottom-right */}
        <span className="absolute bottom-3 right-3 text-white/20 text-3xl font-black leading-none">{String(index + 1).padStart(2, '0')}</span>
        {/* auraDOCS proprietary badge */}
        {service.gold && (
          <div className="absolute top-3 right-3 bg-[#F5A623] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Proprietary</div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-bold text-[#071535] text-base mb-2">{service.name}</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3">{service.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.chips.map(c => (
            <span key={c} className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${service.gold ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#EBF4FF] text-[#0072CE]'}`}>{c}</span>
          ))}
        </div>
        <Link href={service.href} className={`inline-flex items-center gap-1.5 text-xs font-bold hover:gap-2.5 transition-all ${service.gold ? 'text-[#F5A623]' : 'text-[#0072CE]'}`}>
          Explore Service <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Check: light blue gradient section bg, 3 equal cards top row, wide BPO card spans full width, insurance card + CTA card in bottom row, images zoom on hover, cards lift on hover.

- [ ] **Step 3: Commit**

```bash
git add components/home/ServicesGrid.tsx
git commit -m "feat: rebuild ServicesGrid — mixed CSS grid, image zoom cards, light blue bg"
```

---

## Task 8: WhyChooseUs.tsx — Featured Dark Card + Stacked Cards

**Files:**
- Rebuild: `components/home/WhyChooseUs.tsx`

- [ ] **Step 1: Write new WhyChooseUs component**

Replace entire `components/home/WhyChooseUs.tsx`:

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Clock, Award, Building2, TrendingUp, ArrowRight, Lock } from 'lucide-react';

const UNSPLASH = 'https://images.unsplash.com';

const compactCards = [
  { icon: ShieldCheck, color: '#0072CE',  title: 'Triple ISO Certified',     desc: 'ISO 9001, 27001 & 45001 — the highest standard in quality, security and health.', chip: 'ISO Certified' },
  { icon: Clock,       color: '#F5A623',  title: 'Same-Day Retrieval SLA',   desc: 'Any archived document retrieved and delivered same-business-day, guaranteed.', chip: 'SLA Backed' },
  { icon: Award,       color: '#38BDF8',  title: 'Great Place to Work® ×3',  desc: 'Recognised 3 consecutive years. Happy teams deliver outstanding client results.', chip: 'GPTW 2022–24' },
  { icon: Building2,   color: '#0072CE',  title: 'Part of Abans Group',      desc: "Sri Lanka's most trusted conglomerate — financial stability and long-term commitment.", chip: 'Group Backed' },
  { icon: TrendingUp,  color: '#22C55E',  title: '21% Revenue CAGR',         desc: 'Consistent compound growth since 2010 — proof that clients keep trusting us more each year.', chip: '14 Years' },
];

const bottomStats = [
  { end: '500+',  label: 'Enterprise Clients' },
  { end: '50M+',  label: 'Docs Managed' },
  { end: '99.8%', label: 'Accuracy' },
  { end: '14+',   label: 'Years' },
];

function FeaturedCard() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="relative rounded-3xl overflow-hidden min-h-[480px] flex flex-col justify-end p-8"
      style={{ background: '#071535' }}
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src={`${UNSPLASH}/photo-1558618666-fcd25c85cd64?w=700&q=80`}
          alt="Security infrastructure"
          fill
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071535] via-[#071535]/80 to-transparent" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Blue glow */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-[#0072CE] opacity-20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header row: big number + pulsing icon */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-[80px] font-black text-white/[0.06] leading-none select-none">01</span>
          <div className="w-14 h-14 rounded-2xl bg-[#0072CE]/20 border border-[#0072CE]/30 flex items-center justify-center pulse-glow">
            <Lock size={22} className="text-[#0072CE]" />
          </div>
        </div>

        <span className="inline-block px-2.5 py-1 bg-[#0072CE]/15 border border-[#0072CE]/25 text-[#38BDF8] text-[9px] font-bold uppercase tracking-widest rounded-full mb-3">Security First</span>
        <h3 className="s-title text-2xl text-white mb-3 leading-tight">Enterprise-Grade Security, Zero Incidents</h3>
        <p className="text-white/55 text-sm leading-relaxed mb-6">
          14 years. Zero security incidents. Every document protected by ISO 27001-certified protocols, biometric access controls, and 24/7 CCTV monitoring.
        </p>

        {/* Metric fill bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[10px] font-bold mb-1.5">
            <span className="text-white/50">Security Record</span>
            <span className="text-[#22C55E]">Zero incidents in 14 years</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ delay: 0.5, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-[#0072CE] to-[#22C55E] rounded-full"
            />
          </div>
        </div>

        <Link href="/about" className="inline-flex items-center gap-1.5 text-[#38BDF8] text-sm font-bold hover:gap-3 transition-all">
          Learn About Our Security <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative bg-white py-28 overflow-hidden">

      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#003B8E 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        WebkitMaskImage: 'radial-gradient(ellipse at 80% 50%, black 20%, transparent 70%)',
        maskImage: 'radial-gradient(ellipse at 80% 50%, black 20%, transparent 70%)',
      }} />
      <div className="absolute top-20 left-[-100px] w-72 h-72 bg-[#EBF4FF] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[-100px] w-72 h-72 bg-[#EBF4FF] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Two-col header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-pill mb-3 block w-fit">Why DOK Solutions</span>
            <h2 className="s-title text-4xl lg:text-5xl text-[#071535]">
              14 Years of Reasons <span className="text-grad">to Choose Us</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="pl-8 border-l-2 border-[#EBF4FF]"
          >
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              We don't just manage documents — we safeguard your business continuity, protect sensitive information, and eliminate operational inefficiencies.
            </p>
            <Link href="/about" className="inline-flex items-center gap-1.5 text-[#0072CE] font-bold text-sm hover:gap-2.5 transition-all">
              See Our Full Story <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Main layout: featured card + stacked cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Left: big featured dark card */}
          <FeaturedCard />

          {/* Right: 5 stacked compact cards */}
          <div className="flex flex-col gap-3">
            {compactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                  className="group relative flex items-start gap-4 p-4 rounded-2xl border border-[#E8EDF5] bg-white hover:border-transparent hover:shadow-[0_8px_32px_rgba(0,59,142,0.12)] transition-all duration-200 overflow-hidden cursor-default"
                >
                  {/* Left accent bar (appears on hover) */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r origin-top"
                    style={{ background: card.color }}
                  />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-[-4deg]" style={{ background: `${card.color}15` }}>
                    <Icon size={18} style={{ color: card.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-bold text-[#071535] text-sm">{card.title}</span>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mb-2">{card.desc}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: `${card.color}12`, color: card.color }}>{card.chip}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.65 }}
          className="rounded-2xl overflow-hidden border-t-2"
          style={{ background: 'linear-gradient(135deg, #EBF4FF 0%, #F0F7FF 100%)', borderColor: 'transparent', borderImage: 'linear-gradient(90deg, #0072CE, #38BDF8, #F5A623) 1' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D0E8FF]">
            {bottomStats.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <div className="text-2xl font-black text-[#003B8E] mb-0.5">{s.end}</div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Check: featured dark card shows security photo at 25%, fill bar animates on scroll-enter, 5 compact cards slide-right on hover with colored accent bar, bottom stats bar visible.

- [ ] **Step 3: Commit**

```bash
git add components/home/WhyChooseUs.tsx
git commit -m "feat: rebuild WhyChooseUs — featured dark card, stacked hover cards, stats bar"
```

---

## Task 9: Testimonials.tsx — Featured Dark + 3 Mini Cards

**Files:**
- Rebuild: `components/home/Testimonials.tsx`

- [ ] **Step 1: Write new Testimonials component**

Replace entire `components/home/Testimonials.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const featured = {
  quote: "DOK Solutions has transformed how we manage over 2 million policy documents. Retrieval time dropped 85% in the first quarter. Their ISO 27001-certified security gives our compliance team complete peace of mind.",
  name: 'Chaminda Perera',
  role: 'Head of Operations',
  company: 'Leading Insurance Company, Colombo',
  initials: 'CP',
  stat: { label: 'reduction in retrieval time', value: '85%' },
};

const miniCards = [
  {
    industry: 'Banking',
    industryColor: '#0072CE',
    quote: "After migrating 4 million records to auraDOCS, our regulatory audit preparation time dropped from 3 weeks to 2 days. Exceptional service.",
    name: 'Priya Rajapaksa',
    role: 'Head of Compliance, National Bank',
  },
  {
    industry: 'Corporate',
    industryColor: '#F5A623',
    quote: "The BPO team handles 12,000 data entries per day with 99.9% accuracy. We've scaled our back office by 3× without adding headcount.",
    name: 'Ruwan Fernando',
    role: 'COO, Abans Group Subsidiary',
  },
  {
    industry: 'Government',
    industryColor: '#22C55E',
    quote: "Decades of land records digitised in 8 months. auraDOCS lets our staff retrieve any document in under 10 seconds. Remarkable transformation.",
    name: 'D.M. Seneviratne',
    role: 'Director, Government Registry',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #F5F9FF 0%, #ffffff 100%)' }}>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-12"
        >
          <span className="label-pill mb-3 block w-fit mx-auto">Client Success Stories</span>
          <h2 className="s-title text-4xl lg:text-5xl text-[#071535]">
            Trusted by Sri Lanka&apos;s <span className="text-grad">Leading Enterprises</span>
          </h2>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-8 md:p-12 mb-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #050C1F 0%, #071535 60%, #0A1E4A 100%)' }}
        >
          {/* 2px top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0072CE] to-[#38BDF8]" />

          {/* Big decorative quote */}
          <div className="absolute top-6 right-8 text-[180px] font-black leading-none text-[#0072CE]/[0.12] select-none pointer-events-none" style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0072CE, #003B8E)' }}>
                {featured.initials}
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F5A623" className="text-[#F5A623]" />)}
              </div>
            </div>

            {/* Quote + meta */}
            <div>
              <p className="text-white/80 text-lg md:text-xl italic leading-relaxed mb-6">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <div className="text-white font-bold text-sm">{featured.name}</div>
                  <div className="text-white/45 text-xs">{featured.role}</div>
                  <div className="text-white/30 text-[10px] mt-0.5">{featured.company}</div>
                </div>
                {/* Stat highlight */}
                <div className="sm:ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#F5A623]/20" style={{ background: 'rgba(245,166,35,0.08)' }}>
                  <span className="text-[#F5A623] font-black text-2xl">{featured.stat.value}</span>
                  <span className="text-white/50 text-xs max-w-[100px] leading-tight">{featured.stat.label}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 mini cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {miniCards.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,59,142,0.08)] hover:shadow-[0_24px_64px_rgba(0,59,142,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: c.industryColor }}>{c.industry}</span>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#F5A623" className="text-[#F5A623]" />)}
              </div>
              <p className="text-gray-500 text-xs italic leading-relaxed mb-5">&ldquo;{c.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background: c.industryColor }}>
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-[#071535] text-xs font-bold">{c.name}</div>
                  <div className="text-gray-400 text-[10px]">{c.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Check: featured dark card with blue top border, large decorative quote mark, avatar + quote + gold stat highlight box, 3 mini white cards with industry color chip, stars, avatar initials.

- [ ] **Step 3: Commit**

```bash
git add components/home/Testimonials.tsx
git commit -m "feat: rebuild Testimonials — featured dark card + 3 mini white cards with industry tags"
```

---

## Task 10: ClientLogos.tsx — Dual-Direction Marquee

**Files:**
- Rebuild: `components/home/ClientLogos.tsx`

- [ ] **Step 1: Write new ClientLogos component**

Replace entire `components/home/ClientLogos.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';

const row1 = [
  'Bank of Ceylon', 'Commercial Bank', 'Sampath Bank', 'NTB', 'Dialog Axiata',
  'SLT Mobitel', 'Softlogic Holdings', 'Cargills Ceylon', 'LOLC Finance', 'MAS Holdings',
];

const row2 = [
  'Hemas Holdings', 'John Keells Holdings', 'Aitken Spence', 'Singer Sri Lanka', 'Hatton National Bank',
  'Nations Trust Bank', 'Seylan Bank', 'Brandix', 'Millennium IT', 'Virtusa',
];

function LogoChip({ name }: { name: string }) {
  return (
    <div className="group flex-shrink-0 flex items-center justify-center h-12 px-6 bg-white border border-[rgba(0,59,142,0.08)] rounded-2xl mx-2 cursor-default hover:bg-[#003B8E] hover:border-[#003B8E] transition-all duration-300 shadow-[0_2px_8px_rgba(0,59,142,0.06)] hover:shadow-[0_4px_16px_rgba(0,59,142,0.25)]">
      <span className="text-[#1A1A2E] text-[11px] font-bold whitespace-nowrap group-hover:text-white transition-colors duration-300">{name}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className={`flex ${reverse ? 'marquee-track-right' : 'marquee-track'}`} style={{ width: 'max-content' }}>
        {doubled.map((name, i) => (
          <LogoChip key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="py-20 overflow-hidden border-y border-[#E8F0F8]" style={{ background: '#F0F6FF' }}>
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label-pill mb-3 block w-fit mx-auto">Trusted Partners</span>
          <h2 className="s-title text-3xl text-[#071535]">Sri Lanka&apos;s Leading Enterprises Choose DOK</h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Check: two rows of logo chips, top row scrolls left, bottom row scrolls right, hover turns chip navy with white text.

- [ ] **Step 3: Commit**

```bash
git add components/home/ClientLogos.tsx
git commit -m "feat: rebuild ClientLogos — dual-direction infinite marquee, navy hover chips"
```

---

## Task 11: CTABanner.tsx — Dark Two-Column with Glassmorphism Form

**Files:**
- Rebuild: `components/home/CTABanner.tsx`

- [ ] **Step 1: Write new CTABanner component**

Replace entire `components/home/CTABanner.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { FileText, Lock, Lightbulb, ShieldCheck, ArrowRight } from 'lucide-react';

const features = [
  { icon: FileText,    text: 'Free 30-minute consultation — no obligation' },
  { icon: Lock,        text: 'Confidential process with full NDA available' },
  { icon: Lightbulb,   text: 'Custom solution mapped to your exact needs' },
  { icon: ShieldCheck, text: 'ISO 27001 certified handling from day one' },
];

export default function CTABanner() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #050C1F 0%, #071535 100%)' }}>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0072CE] via-[#38BDF8] to-[#F5A623]" />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0072CE]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-8 right-16 w-48 h-48 bg-[#F5A623]/06 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text + features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-full text-[#F5A623] text-[10px] font-bold uppercase tracking-widest mb-6">
              Get Started Today
            </span>
            <h2 className="s-title text-4xl lg:text-5xl text-white mb-4 leading-tight">
              Ready to Transform Your <span className="text-shimmer-gold">Business?</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
              Join 500+ Sri Lankan enterprises who have eliminated document chaos, cut costs, and achieved regulatory compliance with DOK Solutions.
            </p>

            <div className="flex flex-col gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-[#0072CE]" />
                    </div>
                    <span className="text-white/65 text-sm">{f.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — glassmorphism form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-8"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <h3 className="text-white font-bold text-lg mb-1">Book Your Free Consultation</h3>
            <p className="text-white/40 text-xs mb-5">We respond within 2 business hours</p>
            <div className="h-px bg-white/08 mb-5" />

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'name',    label: 'Full Name',   placeholder: 'Chaminda Perera' },
                  { id: 'company', label: 'Company',     placeholder: 'Your Company Ltd.' },
                  { id: 'email',   label: 'Email',       placeholder: 'you@company.com' },
                  { id: 'phone',   label: 'Phone',       placeholder: '+94 77 000 0000' },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input
                      id={f.id}
                      type="text"
                      placeholder={f.placeholder}
                      className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#0072CE]/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="service" className="block text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1.5">Service Interest</label>
                <input
                  id="service"
                  type="text"
                  placeholder="e.g. Physical Archiving, auraDOCS, BPO Services..."
                  className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#0072CE]/50 focus:bg-white/[0.08] transition-all"
                />
              </div>
              <button
                type="submit"
                className="btn-shine w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(245,166,35,0.4)] transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #F5A623, #E8910A)' }}
              >
                Request Free Consultation
                <ArrowRight size={15} />
              </button>
              <p className="text-white/25 text-[10px] text-center">
                Your information is confidential and never shared. NDA available on request.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Check: dark section with gold shimmer headline, 4 feature rows left, glassmorphism card right with 2×2 input grid + service field + gold submit button. Button sweep-shine animates.

- [ ] **Step 3: Commit**

```bash
git add components/home/CTABanner.tsx
git commit -m "feat: rebuild CTABanner — dark two-column layout with glassmorphism form card"
```

---

## Task 12: Footer.tsx — Dark Palette Style Update

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Read the current Footer**

Read `components/layout/Footer.tsx` to understand its structure before modifying.

- [ ] **Step 2: Update Footer background to match dark palette**

Find the outermost `<footer>` element's className and update background from `bg-[#0A0F2E]` (or whatever current value) to `bg-[#02040E]`. Also ensure cert chips at bottom match the new palette — navy gradient bg, white text. The existing footer structure (newsletter, social icons, link columns, bottom bar) stays unchanged.

Specifically — locate any `bg-[#0A0F2E]` or `bg-[#071535]` in the footer and set the outermost container to `bg-[#02040E]`. Internal sections can remain as-is. Also update the top border from any existing colour to `border-white/[0.04]`.

- [ ] **Step 3: Verify in browser**

Footer should appear slightly darker to match the CTABanner above it. All links, social icons, cert chips still functional.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "style: darken Footer background to match Premium Hybrid palette (#02040E)"
```

---

## Task 13: page.tsx Cleanup — Remove CertsBar

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Remove CertsBar from page.tsx**

Replace `app/page.tsx` with:

```typescript
import type { Metadata } from 'next';
import Hero          from '@/components/home/Hero';
import Stats         from '@/components/home/Stats';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import ServicesGrid  from '@/components/home/ServicesGrid';
import WhyChooseUs   from '@/components/home/WhyChooseUs';
import Testimonials  from '@/components/home/Testimonials';
import ClientLogos   from '@/components/home/ClientLogos';
import NewsSection   from '@/components/home/NewsSection';
import CTABanner     from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'DOK Solutions Lanka — Journey Towards A Smart Era',
  description: "Sri Lanka's leading document management & BPO company. Part of the Abans Group. ISO 9001 | ISO 27001 | ISO 45001 certified.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutSnapshot />
      <ServicesGrid />
      <WhyChooseUs />
      <Testimonials />
      <ClientLogos />
      <NewsSection />
      <CTABanner />
    </>
  );
}
```

- [ ] **Step 2: Verify build compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Full page scroll-through**

Visit http://localhost:3000. Scroll top-to-bottom and verify:
- Hero: split layout, orbit cards visible on desktop, left panel text panel on mobile
- Stats: light blue bg, 4 white cards count up from 0
- About: image left chips, editorial right
- Services: mixed grid, 5 cards + 1 CTA card
- Why Choose Us: featured dark card + 5 stacked cards + bottom stats bar
- Testimonials: featured dark + 3 mini white
- Client Logos: two marquee rows scrolling opposite directions
- News: unchanged
- CTA Banner: dark with glassmorphism form

- [ ] **Step 4: Final commit**

```bash
git add app/page.tsx
git commit -m "feat: complete Premium Hybrid redesign — remove CertsBar, all sections rebuilt"
```

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Covered in task |
|---|---|
| Lenis smooth scroll | Task 3 |
| Syne font | Task 2 + 4 |
| CSS utilities (shimmer, orbit, float, shine, dot-pulse) | Task 2 |
| Hero split layout 50/50 | Task 4 |
| Hero orbit rings (CW/CCW) | Task 4 |
| Hero SVG animated lines + travelling dots (animateMotion) | Task 4 |
| Hero centre image floating | Task 4 |
| Hero 4 orbit image cards | Task 4 |
| Hero stat pills (3) | Task 4 |
| Hero bottom flow strip | Task 4 |
| Hero trust badges row | Task 4 |
| Hero scroll indicator | Task 4 |
| Stats light blue bg + white cards | Task 5 |
| Stats coloured top bars | Task 5 |
| Stats GSAP count-up on scroll-enter | Task 5 |
| About image left + 3 floating chips | Task 6 |
| About editorial text + 3 fact rows | Task 6 |
| Services light blue bg + mixed grid | Task 7 |
| Services image zoom on hover | Task 7 |
| Services auraDOCS gold variant | Task 7 |
| Services consultation CTA card | Task 7 |
| WhyChooseUs featured dark card with photo | Task 8 |
| WhyChooseUs fill bar animation | Task 8 |
| WhyChooseUs pulsing icon wrap | Task 8 |
| WhyChooseUs 5 stacked compact cards with slide-right | Task 8 |
| WhyChooseUs colored accent bar on hover | Task 8 |
| WhyChooseUs bottom stats bar | Task 8 |
| Testimonials featured dark card + quote + stat | Task 9 |
| Testimonials 3 mini cards + industry chips | Task 9 |
| ClientLogos dual-direction marquee | Task 10 |
| ClientLogos navy hover on chips | Task 10 |
| CTABanner dark two-column | Task 11 |
| CTABanner glassmorphism form | Task 11 |
| CTABanner gold shimmer headline | Task 11 |
| CTABanner btn-shine animation | Task 11 |
| Footer dark palette update | Task 12 |
| CertsBar removed | Task 13 |
| Unsplash remotePatterns | Task 1 |
| next.config.ts image domains | Task 1 |
| whileInView entrance (opacity 0→1, y 40→0) | All component tasks |
| whileHover y:-6 on cards | Tasks 4–11 |

**Placeholder scan:** No TBD, TODO, or "implement later" placeholders in this plan.

**Type consistency:** `orbitCards` type used only in Task 4 as inline `typeof orbitCards[0]`. `stats` type used only in Task 5 as `typeof stats[0]`. No cross-task type references that could drift.

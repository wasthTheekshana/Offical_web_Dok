'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'News',     href: '/news' },
  { label: 'Careers',  href: '/careers' },
];

/* ── helper: detect if we are on a dark hero page so nav text starts white ── */
// Only routes whose first-visible section is a dark/navy background
const DARK_HERO_PATHS = ['/about', '/news', '/careers', '/services'];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open,     setOpen]       = useState(false);
  const pathname                  = usePathname();

  const startsOnDark = DARK_HERO_PATHS.some(p =>
    p === '/' ? pathname === '/' : pathname.startsWith(p)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  /* colour logic */
  const isDark    = startsOnDark && !scrolled;   // transparent over dark hero
  const textColor = isDark ? 'text-white/80'     : 'text-brand-navy/70';
  const textHover = isDark ? 'hover:text-white'  : 'hover:text-brand-navy';
  const activeCol = isDark ? 'text-white'        : 'text-brand-navy';
  const logoCol   = isDark ? 'text-white'        : 'text-brand-navy';
  const subCol    = isDark ? 'text-white/40'     : 'text-brand-gold';

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 px-6 lg:px-10'
            : 'py-7 px-6 lg:px-14'
        }`}
      >
        {/* scrolled frosted inner pill */}
        <div className={`max-w-[1440px] mx-auto transition-all duration-500 ${
          scrolled
            ? 'bg-brand-cream/92 backdrop-blur-xl shadow-[0_2px_28px_rgba(0,0,0,0.1)] rounded-2xl px-6 py-3'
            : ''
        }`}>

          <div className="flex items-center justify-between">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-end gap-2.5 group flex-shrink-0">
              {/* wordmark */}
              <div className="flex flex-col leading-none">
                <span className={`font-serif text-[2.1rem] font-bold tracking-tight leading-none transition-colors duration-300 ${logoCol}`}>
                  DOK
                </span>
                <span className={`text-[9px] font-sans font-semibold tracking-[0.28em] uppercase mt-0.5 transition-colors duration-300 ${subCol}`}>
                  Solutions Lanka
                </span>
              </div>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <div className="hidden lg:flex items-center gap-9">
              {navLinks.map(link => {
                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative group text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive ? activeCol : `${textColor} ${textHover}`
                    }`}
                  >
                    {link.label}
                    {/* animated underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand-gold rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* ── CTA GROUP ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className={`text-[13px] font-semibold tracking-wide transition-colors duration-200 ${textColor} ${textHover}`}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="text-[13px] font-bold bg-brand-navy text-white px-6 py-2.5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 shadow-sm"
              >
                Start Project →
              </Link>
            </div>

            {/* ── MOBILE TOGGLE ── */}
            <button
              onClick={() => setOpen(p => !p)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full transition-all duration-300 ${
                open
                  ? 'bg-brand-navy'
                  : isDark ? 'bg-white/15 backdrop-blur-sm' : 'bg-brand-navy/08'
              }`}
            >
              <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${open ? 'w-4 bg-white rotate-45 translate-y-[6.5px]' : isDark ? 'w-5 bg-white' : 'w-5 bg-brand-navy'}`} />
              <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${open ? 'w-4 bg-white opacity-0' : isDark ? 'w-4 bg-white' : 'w-4 bg-brand-navy'}`} />
              <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${open ? 'w-4 bg-white -rotate-45 -translate-y-[6.5px]' : isDark ? 'w-5 bg-white' : 'w-5 bg-brand-navy'}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── FULL-SCREEN MOBILE MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080C1A] flex flex-col overflow-hidden"
          >
            {/* close button in corner */}
            <div className="flex items-center justify-between px-6 pt-7">
              <Link href="/" onClick={() => setOpen(false)} className="flex flex-col leading-none">
                <span className="font-serif text-[2rem] font-bold text-white tracking-tight">DOK</span>
                <span className="text-[9px] font-semibold tracking-[0.28em] uppercase text-white/30 mt-0.5">Solutions Lanka</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              >
                ✕
              </button>
            </div>

            {/* nav links — big serif */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-4 border-b border-white/08"
                  >
                    <span className="font-serif text-5xl text-white/85 group-hover:text-white transition-colors duration-200">
                      {link.label}
                    </span>
                    <span className="text-white/20 group-hover:text-brand-gold transition-colors duration-200 text-xl">↗</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="px-8 pb-10 flex flex-col gap-4"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full text-center text-sm font-bold bg-brand-gold text-[#080C1A] py-4 rounded-full tracking-wide"
              >
                Start a Project →
              </Link>
              <p className="text-center text-white/25 text-xs tracking-widest uppercase">
                DOK Solutions Lanka — Antes Group
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

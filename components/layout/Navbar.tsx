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

const DARK_HERO_PATHS = ['/about', '/news', '/careers', '/services'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  const startsOnDark = DARK_HERO_PATHS.some(p =>
    p === '/' ? pathname === '/' : pathname.startsWith(p)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // At top of dark page → transparent bar, white text
  // Scrolled (any page) → solid white pill, navy text
  const atDarkTop = startsOnDark && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 px-6 lg:px-10' : 'py-6 px-6 lg:px-14'
        }`}
      >
        <div className={`max-w-[1440px] mx-auto transition-all duration-500 ${
          scrolled
            ? 'bg-white rounded-2xl px-6 py-3 shadow-[0_4px_32px_rgba(0,59,142,0.12)]'
            : ''
        }`}>
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none flex-shrink-0">
              <span className={`font-serif text-[2rem] font-bold tracking-tight leading-none transition-colors duration-300 ${
                atDarkTop ? 'text-white' : 'text-brand-navy'
              }`}>
                DOK
              </span>
              <span className={`text-[9px] font-semibold tracking-[0.28em] uppercase mt-0.5 transition-colors duration-300 ${
                atDarkTop ? 'text-white/50' : 'text-brand-gold'
              }`}>
                Solutions Lanka
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-9">
              {navLinks.map(link => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative group text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive
                        ? atDarkTop ? 'text-white' : 'text-brand-navy'
                        : atDarkTop
                          ? 'text-white/70 hover:text-white'
                          : 'text-brand-navy/65 hover:text-brand-navy'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand-gold rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className={`text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                  atDarkTop ? 'text-white/70 hover:text-white' : 'text-brand-navy/65 hover:text-brand-navy'
                }`}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className={`text-[13px] font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
                  atDarkTop
                    ? 'bg-white text-brand-navy hover:bg-brand-gold'
                    : 'bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy'
                }`}
              >
                Start Project →
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(p => !p)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full transition-all duration-300 ${
                open
                  ? 'bg-brand-navy'
                  : atDarkTop ? 'bg-white/15' : 'bg-brand-navy/08'
              }`}
            >
              {[0, 1, 2].map(idx => (
                <span
                  key={idx}
                  className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                    open
                      ? idx === 0 ? 'w-4 bg-white rotate-45 translate-y-[6.5px]'
                        : idx === 1 ? 'w-4 bg-white opacity-0'
                        : 'w-4 bg-white -rotate-45 -translate-y-[6.5px]'
                      : atDarkTop
                        ? idx === 1 ? 'w-4 bg-white' : 'w-5 bg-white'
                        : idx === 1 ? 'w-4 bg-brand-navy' : 'w-5 bg-brand-navy'
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080C1A] flex flex-col overflow-hidden"
          >
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
                DOK Solutions Lanka — AB Securitas (Pvt) Ltd
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-navy/10 text-brand-navy">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Top big typographic row */}
        <div className="py-20 border-b border-brand-navy/10">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-7xl lg:text-9xl font-bold text-brand-navy tracking-tight hover:text-brand-gold transition-colors duration-500">DOK</span>
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-brand-gold mt-2">Solutions Lanka</span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 border-b border-brand-navy/10">
          <div>
            <p className="font-light text-sm text-brand-navy/60 max-w-xs">
              Sri Lanka's leading end-to-end Record Management & BPO infrastructure. Part of the iconic Abans Group.
            </p>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-brand-gold mb-6">Services</div>
            <ul className="flex flex-col gap-3 font-light text-sm">
              <li><Link href="/services/physical-archiving" className="text-brand-navy/60 hover:text-brand-navy transition-colors">Physical Archiving</Link></li>
              <li><Link href="/services/document-digitizing" className="text-brand-navy/60 hover:text-brand-navy transition-colors">Document Digitizing</Link></li>
              <li><Link href="/services/auradocs" className="text-brand-navy/60 hover:text-brand-navy transition-colors">DMS & auraDOCS</Link></li>
              <li><Link href="/services/bpo" className="text-brand-navy/60 hover:text-brand-navy transition-colors">BPO Services</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-brand-gold mb-6">Company</div>
            <ul className="flex flex-col gap-3 font-light text-sm">
              <li><Link href="/about" className="text-brand-navy/60 hover:text-brand-navy transition-colors">About Us</Link></li>
              <li><Link href="/news" className="text-brand-navy/60 hover:text-brand-navy transition-colors">News & Events</Link></li>
              <li><Link href="/careers" className="text-brand-navy/60 hover:text-brand-navy transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-brand-navy/60 hover:text-brand-navy transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-brand-gold mb-6">Contact</div>
            <div className="flex flex-col gap-3 font-light text-sm text-brand-navy/60">
              <span>141, Kirula Road, Colombo 05</span>
              <span>+94 117 717 777</span>
              <a href="mailto:enquiries@doksolutions.net" className="hover:text-brand-navy transition-colors">enquiries@doksolutions.net</a>
            </div>
            <div className="mt-8">
              <div className="flex w-full border-b border-brand-navy/20">
                <input type="email" placeholder="Your email" className="flex-1 bg-transparent py-3 text-sm font-light placeholder:text-brand-navy/30 outline-none" />
                <button className="text-[10px] font-bold tracking-widest uppercase text-brand-gold hover:opacity-70 transition-opacity px-2">Go →</button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row justify-between text-[10px] font-semibold tracking-widest uppercase text-brand-navy/30">
          <span>&copy; {new Date().getFullYear()} DOK Solutions Lanka. All Rights Reserved.</span>
          <span className="mt-2 md:mt-0 text-brand-gold">Premium · Secure · Innovative</span>
        </div>
      </div>
    </footer>
  );
}

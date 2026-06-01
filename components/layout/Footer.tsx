import Link from 'next/link';
import { query } from '@/lib/db';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const services = [
  { label: 'Physical Archiving',    href: '/services/physical-archiving' },
  { label: 'Document Digitizing',   href: '/services/document-digitizing' },
  { label: 'Data Entry Services',   href: '/services/data-entry' },
  { label: 'DMS & auraDOCS',        href: '/services/auradocs' },
  { label: 'Insurance Policy Mgmt', href: '/services/insurance' },
];

const company = [
  { label: 'About Us',      href: '/about' },
  { label: 'News & Events', href: '/news' },
  { label: 'Careers',       href: '/careers' },
  { label: 'Contact',       href: '/contact' },
];

const certs = ['ISO 9001', 'ISO 27001', 'ISO 45001', 'GPTW® 2024'];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-brand-navy/60 hover:text-brand-navy transition-colors duration-300 text-base font-medium"
      >
        <ArrowRight
          size={13}
          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-gold flex-shrink-0"
        />
        <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
      </Link>
    </li>
  );
}

export default async function Footer() {
  const contactRows = await query<{ key: string; value: string }>('SELECT key, value FROM contact_details');
  const contact: Record<string, string> = {};
  contactRows.forEach(r => { contact[r.key] = r.value; });

  return (
    <footer className="bg-white text-brand-navy">

      {/* ── Top CTA strip — navy accent ── */}
      <div className="bg-brand-navy">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-[0.35em] font-semibold mb-2">Ready to get started?</p>
            <p className="font-serif text-2xl lg:text-4xl text-white leading-tight">
              Let's transform your<br className="hidden lg:block" /> document operations.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-navy font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 flex-shrink-0 shadow-lg"
          >
            Book a Discovery Call
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b-2 border-brand-navy/08">

        {/* Brand column */}
        <div className="lg:col-span-1">
          <Link href="/" className="block mb-6">
            <span className="font-serif text-7xl font-bold text-brand-navy leading-none tracking-tight hover:text-brand-gold transition-colors duration-500">
              DOK
            </span>
            <span className="block text-[11px] font-bold tracking-[0.4em] uppercase text-brand-gold mt-1">
              Solutions Lanka
            </span>
          </Link>
          <p className="text-brand-navy/55 text-sm font-light leading-relaxed mb-8 max-w-xs">
            Sri Lanka's most trusted end-to-end information management company. A fully owned subsidiary of AB Securitas (Pvt) Ltd.
          </p>
          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/dok-solutions-lanka"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border-2 border-brand-navy/15 flex items-center justify-center text-brand-navy/50 hover:border-brand-navy hover:text-brand-navy hover:bg-brand-navy/05 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/doksolutionslanka"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border-2 border-brand-navy/15 flex items-center justify-center text-brand-navy/50 hover:border-brand-navy hover:text-brand-navy hover:bg-brand-navy/05 transition-all duration-300"
              aria-label="Facebook"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href={`mailto:${contact.email ?? 'enquiries@doksolutions.net'}`}
              className="w-11 h-11 rounded-full border-2 border-brand-navy/15 flex items-center justify-center text-brand-navy/50 hover:border-brand-navy hover:text-brand-navy hover:bg-brand-navy/05 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="text-[11px] font-black tracking-[0.35em] uppercase text-brand-gold mb-7 pb-3 border-b border-brand-navy/10">Services</div>
          <ul className="flex flex-col gap-5">
            {services.map(s => <NavLink key={s.href} {...s} />)}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div className="text-[11px] font-black tracking-[0.35em] uppercase text-brand-gold mb-7 pb-3 border-b border-brand-navy/10">Company</div>
          <ul className="flex flex-col gap-5">
            {company.map(s => <NavLink key={s.href} {...s} />)}
          </ul>
        </div>

        {/* Contact + newsletter */}
        <div>
          <div className="text-[11px] font-black tracking-[0.35em] uppercase text-brand-gold mb-7 pb-3 border-b border-brand-navy/10">Get In Touch</div>
          <div className="flex flex-col gap-5 mb-8">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contact.address ?? '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-brand-navy/60 hover:text-brand-navy transition-colors duration-300 text-base font-medium group"
            >
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-gold" />
              {contact.address || '141, Kirula Road, Colombo 05'}
            </a>
            <a
              href={`tel:${(contact.phone ?? '').replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-brand-navy/60 hover:text-brand-navy transition-colors duration-300 text-base font-medium"
            >
              <Phone size={16} className="flex-shrink-0 text-brand-gold" />
              {contact.phone || '+94 117 717 777'}
            </a>
            <a
              href={`mailto:${contact.email ?? 'enquiries@doksolutions.net'}`}
              className="flex items-center gap-3 text-brand-navy/60 hover:text-brand-navy transition-colors duration-300 text-base font-medium"
            >
              <Mail size={16} className="flex-shrink-0 text-brand-gold" />
              {contact.email || 'enquiries@doksolutions.net'}
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-navy/40 font-bold mb-3">Stay Updated</p>
            <div className="flex rounded-xl overflow-hidden border-2 border-brand-navy/15 hover:border-brand-navy/40 transition-colors duration-300 focus-within:border-brand-navy/50">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-brand-navy placeholder:text-brand-navy/35 outline-none min-w-0"
              />
              <button className="bg-brand-gold hover:bg-brand-navy transition-colors duration-300 px-4 flex items-center justify-center flex-shrink-0 group">
                <ArrowRight size={15} className="text-white group-hover:text-brand-gold transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-brand-navy/35">
          &copy; {new Date().getFullYear()} DOK Solutions Lanka (Pvt) Ltd. All Rights Reserved.
        </span>

        {/* Cert badges */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {certs.map(c => (
            <span
              key={c}
              className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border-2 border-brand-navy/15 text-brand-navy/50 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 cursor-default"
            >
              {c}
            </span>
          ))}
        </div>

        <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
          Premium · Secure · Innovative
        </span>
      </div>
    </footer>
  );
}

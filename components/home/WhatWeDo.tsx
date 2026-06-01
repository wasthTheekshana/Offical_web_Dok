import { query } from '@/lib/db';

const STAGES = [
  { step: '01', title: 'Capture',     desc: 'Collect physical and digital documents from any source — onsite, offsite, or scanned.' },
  { step: '02', title: 'Digitise',    desc: 'High-speed scanning, OCR recognition, and metadata indexing for instant searchability.' },
  { step: '03', title: 'Classify',    desc: 'Intelligent categorisation and tagging aligned to your naming conventions and compliance requirements.' },
  { step: '04', title: 'Store',       desc: 'Secure climate-controlled warehouses or cloud repositories with role-based access controls.' },
  { step: '05', title: 'Retrieve',    desc: 'Same-day physical delivery or instant digital access via auraDOCS anytime, anywhere.' },
  { step: '06', title: 'Archive',     desc: 'Long-term preservation with audit trails, retention scheduling, and certified destruction.' },
];

type ContentRow = { key: string; value: string };

export default async function WhatWeDo() {
  const rows = await query<ContentRow>(
    "SELECT key, value FROM site_content WHERE key LIKE 'whatwedo%'"
  );
  const c: Record<string, string> = {};
  rows.forEach(r => { c[r.key] = r.value; });

  const title    = c['whatwedo_title']    || 'What We Do';
  const subtitle = c['whatwedo_subtitle'] || 'Comprehensive document lifecycle management from capture to archive.';
  const body     = c['whatwedo_body']     || '';

  return (
    <section className="bg-white py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-brand-navy/30" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-navy/40">Our Services</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl text-brand-navy leading-tight">{title}</h2>
          </div>
          <div>
            <p className="text-brand-navy/70 text-lg font-light leading-relaxed mb-4">{subtitle}</p>
            {body && <p className="text-brand-navy/45 text-sm font-light leading-relaxed">{body}</p>}
          </div>
        </div>

        {/* Lifecycle stages grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-navy/08 rounded-3xl overflow-hidden">
          {STAGES.map(s => (
            <div key={s.step} className="bg-white p-8 lg:p-10 group hover:bg-brand-navy transition-colors duration-500">
              <div className="font-serif text-5xl font-bold text-brand-gold/30 group-hover:text-brand-gold/50 transition-colors mb-6 leading-none">
                {s.step}
              </div>
              <h3 className="font-serif text-xl text-brand-navy group-hover:text-white transition-colors mb-3">
                {s.title}
              </h3>
              <p className="text-brand-navy/50 group-hover:text-white/60 transition-colors text-sm font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

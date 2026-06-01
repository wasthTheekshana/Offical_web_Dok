import Link from 'next/link';
import { query } from '@/lib/db';

type Service = { id: string; slug: string; title: string; description: string; hero_image_url: string; features: string[] };
type ContentRow = { key: string; value: string };

export default async function WhatWeDo() {
  const [services, contentRows] = await Promise.all([
    query<Service>('SELECT id, slug, title, description, hero_image_url, features FROM services WHERE published = true ORDER BY display_order, title'),
    query<ContentRow>("SELECT key, value FROM site_content WHERE key LIKE 'whatwedo%'"),
  ]);

  const c: Record<string, string> = {};
  contentRows.forEach(r => { c[r.key] = r.value; });

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

        {/* Services grid with hover image reveal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-navy/08 rounded-3xl overflow-hidden">
          {services.map((s, i) => {
            const features: string[] = Array.isArray(s.features) ? s.features : [];
            return (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="relative group overflow-hidden bg-white min-h-[280px] p-8 lg:p-10 flex flex-col justify-between"
              >
                {/* Background image — revealed on hover */}
                {s.hero_image_url && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <img
                      src={s.hero_image_url}
                      alt=""
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-navy/75" />
                  </div>
                )}

                {/* No image fallback — navy bg on hover */}
                {!s.hero_image_url && (
                  <div className="absolute inset-0 bg-brand-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div className="font-serif text-5xl font-bold text-brand-gold/30 group-hover:text-brand-gold/60 transition-colors mb-6 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-xl text-brand-navy group-hover:text-white transition-colors duration-300 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-brand-navy/50 group-hover:text-white/65 transition-colors duration-300 text-sm font-light leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>

                {/* Features tags — shown on hover */}
                {features.length > 0 && (
                  <div className="relative z-10 flex flex-wrap gap-1.5 mt-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {features.slice(0, 3).map(f => (
                      <span key={f} className="text-[9px] font-semibold tracking-wide uppercase text-white/70 border border-white/20 px-2 py-1 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

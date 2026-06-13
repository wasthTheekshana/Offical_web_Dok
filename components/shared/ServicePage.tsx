import { CheckCircle, LucideIcon } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CTABanner from '@/components/home/CTABanner';
import { safeJsonLd } from '@/lib/json-ld';

const BASE = process.env.NEXTAUTH_URL || 'https://doksolutions.lk';

interface Step    { step: string; title: string; desc: string; }
interface Feature { title: string; desc: string; }
interface Stat    { value: string; label: string; }

interface ServicePageProps {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle: string;
  heroImg: string;
  color: string;
  intro: string;
  features: Feature[];
  steps?: Step[];
  industries?: string[];
  badge?: string;
  stats?: Stat[];
  whyTitle?: string;
  whyBody?: string;
  whyImg?: string;
}

export default function ServicePage({
  label, title, subtitle, heroImg, color, intro, features, steps, industries, badge, stats, whyTitle, whyBody, whyImg,
}: ServicePageProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
      { '@type': 'ListItem', position: 3, name: title,      item: `${BASE}/services` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: subtitle,
    provider: {
      '@type': 'Organization',
      name: 'DOK Solutions Lanka (Pvt) Ltd',
      url: BASE,
    },
    areaServed: { '@type': 'Country', name: 'Sri Lanka' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceSchema) }} />

      <PageHero
        label={label}
        title={title}
        subtitle={subtitle}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: title }]}
      />

      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[55vh] overflow-hidden">
        <img src={heroImg} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2E]/70 to-transparent" />
        {badge && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#F5A623] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
            {badge}
          </div>
        )}
      </div>

      {/* Stats band */}
      {stats && stats.length > 0 && (
        <section className="bg-[#003B8E] py-14">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10 text-center">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5A623] mb-1">{s.value}</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-[0.2em]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-base sm:text-lg lg:text-xl text-[#64748B] leading-relaxed">{intro}</p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="label-pill">Key Features</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1A2E] mt-4">What We Deliver</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-[#E8EDF5] p-5 sm:p-6 md:p-7 hover:shadow-card hover:border-transparent transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                  <CheckCircle size={20} style={{ color }} />
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{f.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DOK section — optional image + text split */}
      {whyTitle && whyBody && whyImg && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden h-64 sm:h-80 md:h-[420px]">
                <img src={whyImg} alt={whyTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#003B8E]/20 to-transparent" />
              </div>
              <div>
                <span className="label-pill mb-6 inline-flex">Why DOK</span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#1A1A2E] mb-6 leading-tight">{whyTitle}</h2>
                <p className="text-[#64748B] text-base leading-relaxed">{whyBody}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process steps */}
      {steps && steps.length > 0 && (
        <section className="py-20 bg-[#F8FAFF]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="label-pill">Our Process</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1A2E] mt-4">How It Works</h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-[#003B8E] to-[#F5A623] hidden md:block" />
              <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
                {steps.map((s) => (
                  <div key={s.step} className="flex gap-4 sm:gap-6 md:gap-8 items-start">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-xs sm:text-sm z-10"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                    >
                      {s.step}
                    </div>
                    <div className="flex-1 pb-8 border-b border-[#E8EDF5] last:border-0">
                      <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">{s.title}</h3>
                      <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Industries */}
      {industries && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="label-pill mb-5 inline-flex">Industries We Serve</span>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {industries.map(ind => (
                <span key={ind} className="px-3 py-2 sm:px-5 sm:py-2.5 bg-[#F8FAFF] border border-[#E8EDF5] rounded-full text-xs sm:text-sm font-semibold text-[#1A1A2E] hover:border-[#003B8E]/25 hover:shadow-sm transition-all">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner service={title} />
    </>
  );
}

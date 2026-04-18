import type { Metadata } from 'next';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = { title: 'Latest News' };

const news = [
  { cat: 'Company News', date: 'March 2025',    color: '#003B8E', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&auto=format&q=80', title: 'DOK Solutions Achieves Great Place to Work® Certification for the Third Consecutive Year', body: 'We are proud to announce that DOK Solutions Lanka has been certified as a Great Place to Work® for 2024 — the third consecutive year. This achievement reflects our unwavering commitment to building an exceptional workplace.' },
  { cat: 'Technology',   date: 'February 2025', color: '#0072CE', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&auto=format&q=80', title: 'auraDOCS 3.0 Launches: AI-Powered Document Intelligence for Sri Lankan Enterprises', body: 'Our flagship DMS platform receives a major upgrade with intelligent OCR, automated workflows, predictive search capabilities, and new REST API integrations for seamless enterprise connectivity.' },
  { cat: 'Events',       date: 'January 2025',  color: '#F5A623', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&auto=format&q=80', title: 'DOK Solutions Expands Third Warehouse Facility — Increasing Capacity by 40%', body: 'To meet growing client demand, DOK Solutions has commissioned a third state-of-the-art warehouse facility in Colombo, bringing total storage capacity to an all-time high.' },
  { cat: 'Company News', date: 'December 2024', color: '#003B8E', img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop&auto=format&q=80', title: 'DOK Solutions Celebrates 14 Years of Excellence in Document Management', body: 'Marking 14 years since our founding within the Alguns Group, DOK Solutions reflects on a journey from a 15-person startup to Sri Lanka\'s leading document management company with 96+ professionals.' },
  { cat: 'Technology',   date: 'November 2024', color: '#0072CE', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&auto=format&q=80', title: 'New Mobile Application for auraDOCS Enables Document Access from Anywhere', body: 'The auraDOCS mobile application is now available for iOS and Android, enabling secure document access, approvals, and workflow management from any device, anywhere in the world.' },
  { cat: 'Events',       date: 'October 2024',  color: '#F5A623', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop&auto=format&q=80', title: 'DOK Solutions Participates in Sri Lanka Digital Economy Summit 2024', body: 'DOK Solutions presented auraDOCS and our digital transformation services at the Sri Lanka Digital Economy Summit, demonstrating how document intelligence drives enterprise efficiency.' },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        label="Stay Informed"
        title="Latest News"
        subtitle="Company updates, technology announcements, and milestones from DOK Solutions Lanka."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <section className="py-28 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <article key={i} className="group bg-white rounded-3xl overflow-hidden border border-[#E8EDF5] hover:border-transparent hover:shadow-card-hover transition-all duration-400">
                <div className="relative overflow-hidden h-52">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1.5 rounded-full" style={{ background: `${n.color}CC` }}>
                    <Tag size={9} /> {n.cat}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-[#94A3B8] text-xs mb-3"><Calendar size={11} />{n.date}</div>
                  <h3 className="font-bold text-[#1A1A2E] text-base leading-snug mb-3 group-hover:text-[#003B8E] transition-colors line-clamp-2">{n.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-5 line-clamp-3">{n.body}</p>
                  <button className="flex items-center gap-1.5 text-sm font-bold transition-colors" style={{ color: n.color }}>
                    Read More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

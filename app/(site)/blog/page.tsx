import type { Metadata } from 'next';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = { title: 'Blog' };

const posts = [
  { cat: 'Document Management', read: '5 min', date: 'April 2025', color: '#003B8E', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=480&fit=crop&auto=format&q=80', title: '5 Reasons Your Business Needs a Document Management System in 2025', excerpt: 'As digital transformation accelerates across Sri Lanka\'s corporate sector, organisations that rely on paper-based processes face growing risks — from compliance failures to operational inefficiency. Here\'s why a DMS is no longer optional.' },
  { cat: 'BPO Insights',        read: '4 min', date: 'March 2025',  color: '#0072CE', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&h=480&fit=crop&auto=format&q=80', title: 'How BPO Transforms Back-Office Operations for Sri Lankan Banks', excerpt: 'Sri Lanka\'s banking sector processes millions of documents annually. Discover how business process outsourcing is helping banks reduce costs, improve accuracy, and focus their teams on higher-value activities.' },
  { cat: 'Technology',          read: '6 min', date: 'March 2025',  color: '#F5A623', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&h=480&fit=crop&auto=format&q=80', title: 'auraDOCS vs Generic DMS: Why Purpose-Built Beats Off-the-Shelf', excerpt: 'Choosing a document management system is a long-term decision. Generic platforms offer breadth but often lack depth — especially for Sri Lankan regulatory requirements, multi-language support, and local workflow needs.' },
  { cat: 'Security',            read: '5 min', date: 'February 2025',color: '#003B8E', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&h=480&fit=crop&auto=format&q=80', title: 'Document Security: What ISO 27001 Means for Your Business Partners', excerpt: 'When you share sensitive business documents with a vendor, their security posture becomes your risk. We break down what ISO 27001 certification means in practice and what questions to ask any document management partner.' },
  { cat: 'Insurance',           read: '4 min', date: 'January 2025', color: '#0072CE', img: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=700&h=480&fit=crop&auto=format&q=80', title: 'Digitizing Insurance Policies: A Step-by-Step Guide for Sri Lankan Insurers', excerpt: 'Sri Lanka\'s insurance sector is in the midst of a digital transformation. This practical guide walks through the process of digitizing your entire policy archive — from planning and scanning to indexing and retrieval.' },
  { cat: 'Workplace',           read: '3 min', date: 'January 2025', color: '#F5A623', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=480&fit=crop&auto=format&q=80', title: 'Building a Great Place to Work: Lessons from DOK Solutions\' Three-Year Journey', excerpt: 'Three consecutive Great Place to Work® certifications don\'t happen by accident. We share the people strategies, leadership principles, and cultural investments that earned this recognition.' },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Insights & Perspectives"
        title="The DOK Blog"
        subtitle="Thought leadership on document management, digital transformation, BPO, and workplace excellence."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="py-28 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          <div className="mb-12 group">
            <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-[#E8EDF5] bg-white hover:shadow-card-hover hover:border-transparent transition-all">
              <div className="relative h-72 lg:h-auto overflow-hidden">
                <img src={posts[0].img} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
                <span className="absolute top-5 left-5 text-[10px] font-black uppercase tracking-widest text-white px-3 py-1.5 rounded-full" style={{ background: posts[0].color }}>
                  Featured
                </span>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: posts[0].color, background: `${posts[0].color}12` }}>{posts[0].cat}</span>
                  <span className="flex items-center gap-1 text-[#94A3B8] text-xs"><Clock size={10} />{posts[0].read} read</span>
                  <span className="flex items-center gap-1 text-[#94A3B8] text-xs"><Calendar size={10} />{posts[0].date}</span>
                </div>
                <h2 className="text-2xl font-black text-[#1A1A2E] mb-4 leading-snug group-hover:text-[#003B8E] transition-colors">{posts[0].title}</h2>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">{posts[0].excerpt}</p>
                <button className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: posts[0].color }}>
                  Read Article <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((p, i) => (
              <article key={i} className="group bg-white rounded-3xl overflow-hidden border border-[#E8EDF5] hover:border-transparent hover:shadow-card-hover transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: p.color, background: `${p.color}12` }}>{p.cat}</span>
                    <span className="flex items-center gap-1 text-[#94A3B8] text-[10px]"><Clock size={9} />{p.read}</span>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-sm leading-snug mb-3 group-hover:text-[#003B8E] transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-[#64748B] text-xs leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                  <button className="flex items-center gap-1.5 text-xs font-bold" style={{ color: p.color }}>
                    Read More <ArrowRight size={12} />
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

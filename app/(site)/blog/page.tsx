import type { Metadata } from 'next';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CTABanner from '@/components/home/CTABanner';
import { cachedQuery } from '@/lib/db';
import { safeJsonLd } from '@/lib/json-ld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Thought leadership on document management, BPO, digital transformation, and workplace excellence from DOK Solutions Lanka — Sri Lanka\'s leading records management company.',
  openGraph: {
    title: 'Blog & Insights — DOK Solutions Lanka',
    description: 'Practical guides, industry insights, and expert perspectives on document management, digitization, BPO, and auraDOCS from the DOK Solutions team.',
  },
};

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string;
  category: string;
  published_at: string;
}

const FALLBACK_POSTS = [
  { id: '1', slug: 'dms-2025', category: 'Document Management', cover_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=480&fit=crop&auto=format&q=80', title: '5 Reasons Your Business Needs a Document Management System in 2025', excerpt: "As digital transformation accelerates across Sri Lanka's corporate sector, organisations that rely on paper-based processes face growing risks — from compliance failures to operational inefficiency. Here's why a DMS is no longer optional.", published_at: '2025-04-01', color: '#003B8E', read: '5 min' },
  { id: '2', slug: 'bpo-banking', category: 'BPO Insights', cover_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&h=480&fit=crop&auto=format&q=80', title: 'How BPO Transforms Back-Office Operations for Sri Lankan Banks', excerpt: "Sri Lanka's banking sector processes millions of documents annually. Discover how business process outsourcing is helping banks reduce costs, improve accuracy, and focus their teams on higher-value activities.", published_at: '2025-03-01', color: '#0072CE', read: '4 min' },
  { id: '3', slug: 'auradocs-vs-generic', category: 'Technology', cover_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&h=480&fit=crop&auto=format&q=80', title: 'auraDOCS vs Generic DMS: Why Purpose-Built Beats Off-the-Shelf', excerpt: 'Choosing a document management system is a long-term decision. Generic platforms offer breadth but often lack depth — especially for Sri Lankan regulatory requirements, multi-language support, and local workflow needs.', published_at: '2025-03-15', color: '#F5A623', read: '6 min' },
  { id: '4', slug: 'iso27001-security', category: 'Security', cover_url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&h=480&fit=crop&auto=format&q=80', title: 'Document Security: What ISO 27001 Means for Your Business Partners', excerpt: 'When you share sensitive business documents with a vendor, their security posture becomes your risk. We break down what ISO 27001 certification means in practice and what questions to ask any document management partner.', published_at: '2025-02-01', color: '#003B8E', read: '5 min' },
  { id: '5', slug: 'insurance-digitizing', category: 'Insurance', cover_url: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=700&h=480&fit=crop&auto=format&q=80', title: 'Digitizing Insurance Policies: A Step-by-Step Guide for Sri Lankan Insurers', excerpt: "Sri Lanka's insurance sector is in the midst of a digital transformation. This practical guide walks through the process of digitizing your entire policy archive — from planning and scanning to indexing and retrieval.", published_at: '2025-01-15', color: '#0072CE', read: '4 min' },
  { id: '6', slug: 'great-place-to-work', category: 'Workplace', cover_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=480&fit=crop&auto=format&q=80', title: "Building a Great Place to Work: Lessons from DOK Solutions' Three-Year Journey", excerpt: "Three consecutive Great Place to Work® certifications don't happen by accident. We share the people strategies, leadership principles, and cultural investments that earned this recognition.", published_at: '2025-01-05', color: '#F5A623', read: '3 min' },
];

const CAT_COLORS: Record<string, string> = {
  'Document Management': '#003B8E',
  'BPO Insights': '#0072CE',
  Technology: '#F5A623',
  Security: '#003B8E',
  Insurance: '#0072CE',
  Workplace: '#F5A623',
  Insight: '#003B8E',
};

function estimateReadTime(text: string) {
  const words = text.split(/\s+/).length;
  return `${Math.max(2, Math.ceil(words / 200))} min`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-LK', { month: 'long', year: 'numeric' });
}

export default async function BlogPage() {
  let dbPosts: BlogPost[] = [];
  try {
    dbPosts = await cachedQuery<BlogPost>(
      'SELECT id, slug, title, excerpt, cover_url, category, published_at FROM blog_posts WHERE published = true ORDER BY published_at DESC',
      [],
      ['blog'],
    );
  } catch {
    // fall through to hardcoded
  }

  const hasPosts = dbPosts.length > 0;

  const posts = hasPosts
    ? dbPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        cover_url: p.cover_url || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=480&fit=crop&auto=format&q=80',
        category: p.category || 'Insight',
        color: CAT_COLORS[p.category] ?? '#003B8E',
        read: estimateReadTime(p.excerpt || p.title),
        date: formatDate(p.published_at),
      }))
    : FALLBACK_POSTS.map(p => ({ ...p, date: formatDate(p.published_at), cover_url: p.cover_url }));

  const BASE = process.env.NEXTAUTH_URL || 'https://doksolutions.lk';
  const articleListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'DOK Solutions Lanka Blog',
    url: `${BASE}/blog`,
    itemListElement: posts.slice(0, 6).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${BASE}/blog/${p.slug}`,
    })),
  };

  const [featured, ...rest] = posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleListSchema) }}
      />

      <PageHero
        label="Insights & Perspectives"
        title="The DOK Blog"
        subtitle="Thought leadership on document management, digital transformation, BPO, and workplace excellence."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="py-28 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Featured post */}
          {featured && (
            <div className="mb-12 group">
              <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-[#E8EDF5] bg-white hover:shadow-card-hover hover:border-transparent transition-all">
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  <img src={featured.cover_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-5 left-5 text-[10px] font-black uppercase tracking-widest text-white px-3 py-1.5 rounded-full" style={{ background: featured.color }}>
                    Featured
                  </span>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: featured.color, background: `${featured.color}12` }}>{featured.category}</span>
                    <span className="flex items-center gap-1 text-[#94A3B8] text-xs"><Clock size={10} />{featured.read} read</span>
                    <span className="flex items-center gap-1 text-[#94A3B8] text-xs"><Calendar size={10} />{featured.date}</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#1A1A2E] mb-4 leading-snug group-hover:text-[#003B8E] transition-colors">{featured.title}</h2>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: featured.color }}>
                    Read Article <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <article key={p.id} className="group bg-white rounded-3xl overflow-hidden border border-[#E8EDF5] hover:border-transparent hover:shadow-card-hover transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: p.color, background: `${p.color}12` }}>{p.category}</span>
                    <span className="flex items-center gap-1 text-[#94A3B8] text-[10px]"><Clock size={9} />{p.read}</span>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-sm leading-snug mb-3 group-hover:text-[#003B8E] transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-[#64748B] text-xs leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                  <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: p.color }}>
                    Read More <ArrowRight size={12} />
                  </span>
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
